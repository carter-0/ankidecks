import {getAuth} from "@clerk/nextjs/server";

import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import multer from "multer";

import {sendRabbitMQMessage} from "@/lib/rabbitmq";
import crypto from "crypto";

const bucket = 'ankidecks';

const s3 = new S3Client({
    endpoint: `https://6c7add82567c8755e3f0022bfd49e5e0.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY
    },
    region: 'auto',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: any, res: any) {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({message: "Unauthorized"});
    }

    await new Promise(resolve => {
        const mw = multer().any()
        mw(req, res, resolve)
    })

    const file = req.files[0];

    if (file.buffer.byteLength > 100 * 1024 * 1024) {
        return res.status(400).json({message: "This deck is currently too large for us to process :("});
    }

    let id = String(crypto.randomBytes(20).toString('hex'))

    const params = {
        Bucket: bucket,
        Key: `${userId}/${id}.apkg`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    await sendRabbitMQMessage({
        userId: userId,
        type: 'UPLOAD_DECK',
        key: `${userId}/${id}.apkg`,
    })

    return res.status(200).json({message: "Successfully uploaded file"});
}