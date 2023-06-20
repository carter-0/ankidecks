import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default;

const bucket = 'ankidecks';

const s3 = new S3Client({
    endpoint: `https://6c7add82567c8755e3f0022bfd49e5e0.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY
    },
    region: 'auto'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);

    // if (!userId) {
    //     res.status(401).json({ success: false, error: "Unauthorized" });
    //     return;
    // }

    const deck = await prisma.deck.findUnique({
        where: {
            id: req.query.deckId as string
        },
        include: {
            cards: true
        }
    }) as Deck | null

    if (!deck) {
        res.status(404).json({ success: false, error: "Deck not found" });
        return;
    }

    if (deck.user !== userId && deck.public !== true) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    if (deck.imported === true) {
        try {
            const getObjectParams = {
                Bucket: bucket,
                Key: deck.key
            };

            let signedUrl = await getSignedUrl(s3, new GetObjectCommand(getObjectParams));
            signedUrl = signedUrl.replace("https://ankidecks.6c7add82567c8755e3f0022bfd49e5e0.r2.cloudflarestorage.com", "https://r2.ankidecks.app")

            console.log(signedUrl)

            // Download the S3 object using the signed URL
            const download = await fetch(signedUrl);
            const objectData = await download.arrayBuffer();

            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.anki');
            res.setHeader('Content-Disposition', `attachment; filename=${deck.name}.apkg`);

            // Send object data in the response
            res.status(200).send(Buffer.from(new Uint8Array(objectData)));
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching file from S3' });
            res.end();
            return;
        }
    }

    const apkg = new AnkiExport(deck.name);

    deck.cards.forEach((card) => {
        if (card.type !== 'CLOZE') {
            apkg.addCard(card.front, card.back);
        }
    })

    apkg
        .save()
        .then((zip: BinaryData) => {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader(`Content-Disposition`, `attachment; filename=${deck.name}.apkg`);
            res.write(zip, 'binary');
            res.end();
            // fs.writeFileSync('./output.apkg', zip, 'binary');
            // console.log(`Package has been generated: output.pkg`);
        })
        .catch((err: Error) => console.log(err.stack || err));
}