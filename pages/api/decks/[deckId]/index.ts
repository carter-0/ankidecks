import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

async function get(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const { deckId } = req.query as { deckId: string }
    const { includeCards } = req.query as { includeCards: string }

    if (!deckId) {
        res.status(400).json({ success: false, error: "Missing deckId" });
        return;
    }

    let deck: Deck | null;

    if (includeCards == "true") {
        deck = await prisma.deck.findUnique({
            where: {
                id: deckId
            },
            include: {
                cards: true
            }
        }) as Deck | null
    } else {
        deck = await prisma.deck.findUnique({
            where: {
                id: deckId
            }
        }) as Deck | null
    }

    if (!deck) {
        res.status(404).json({ success: false, error: "Deck not found" });
        return;
    }

    if (deck.user !== userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }

    res.status(200).json({success: true, deck: deck});
}

async function post(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const { name, public: pub } = JSON.parse(req.body) as { name: string, public: boolean }

    if (typeof pub !== "boolean") {
        res.status(400).json({ success: false, error: "Missing or invalid public" });
        return;
    }

    if (!name) {
        res.status(400).json({ success: false, error: "Missing name" });
        return;
    }

    if (name.length > 100 || name.length < 1) {
        res.status(400).json({ success: false, error: "Name too long / short (1 < name < 100)" });
        return;
    }

    const deckId = await prisma.deck.create({
        data: {
            name: name,
            user: userId,
            public: pub
        }
    }).then(deck => deck.id)

    res.status(200).json({ success: true, deckId: deckId });
}

async function del(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const { deckId } = req.query as { deckId: string }

    if (!deckId) {
        res.status(400).json({ success: false, error: "Missing deckId" });
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
        console.log("USER IS NOT AUTH'D")
        console.log(userId)
        console.log(req)
        console.log(getAuth(req))
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