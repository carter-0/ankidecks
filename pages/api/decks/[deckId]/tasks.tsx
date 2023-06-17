import { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const {deckId} = req.query;

    const deck = await prisma.deck.findUnique({
        where: {
            id: deckId as string
        },
        include: {
            tasks: true
        }
    }) as Deck;

    if (!deck) {
        return res.status(404).json({message: 'Not found'});
    }

    if (deck.user != userId) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    return res.status(200).json(deck.tasks)
}