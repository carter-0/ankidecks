import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

async function get(req: NextApiRequest, res: NextApiResponse, userId: string) {
    // const { deckId } = req.query as { deckId: string }
    //
    // if (!deckId) {
    //     res.status(400).json({ success: false, error: "Missing deckId" });
    //     return;
    // }
    //
    // let deck = await prisma.deck.findUnique({
    //     where: {
    //         id: deckId
    //     }
    // }) as Deck | null
    //
    // if (!deck) {
    //     res.status(404).json({ success: false, error: "Deck not found" });
    //     return;
    // }
    //
    // if (deck.user !== userId) {
    //     res.status(401).json({ success: false, error: "Unauthorized" });
    //     return;
    // }
    //
    // res.status(200).json({success: true, deck: deck});
}

async function post(req: NextApiRequest, res: NextApiResponse, userId: string) {

}

async function del(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const { deckId, cardId } = req.query as { deckId: string, cardId: string }

    if (!deckId || !cardId) {
        res.status(400).json({ success: false, error: "Missing deckId or cardId" });
        return;
    }

    let deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        }
    }) as Deck | null

    if (!deck) {
        res.status(404).json({ success: false, error: "Deck not found" });
        return;
    }

    if (deck.user !== userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    await prisma.card.delete({
        where: {
            id: cardId
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