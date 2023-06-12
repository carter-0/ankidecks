import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default;

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

    const apkg = new AnkiExport(deck.name);

    deck.cards.forEach(card => {
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