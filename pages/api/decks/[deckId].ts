import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

async function get(req, res, userId) {
    const { deckId } = req.query

    if (!deckId) {
        res.status(400).json({ success: false, error: "Missing deckId" });
        return;
    }

    let deck: Deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        }
    })

    if (deck.user !== userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    res.status(200).json({success: true, deck: deck});
}

async function post(req, res, userId) {
    const { deckId } = req.query

    res.end(`Deck: ${deckId}`)
}

async function del(req, res, userId) {
    const { deckId } = req.query

    if (!deckId) {
        res.status(400).json({ success: false, error: "Missing deckId" });
        return;
    }

    let deck: Deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        }
    })

    if (deck.user !== userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    await prisma.deck.delete({
        where: {
            id: deckId
        }
    })

    res.status(200).json({ success: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    switch (req.method) {
        case "GET":
            return await get(req, res, userId)
        case "POST":
            return await post(req, res, userId)
        case "DELETE":
            return await del(req, res, userId)
    }
}