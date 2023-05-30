import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const chat = new ChatOpenAI({ temperature: 0.9 });

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
    const { deckId, maximumCards, document } = req.query as { deckId: string, maximumCards: string, document: string }

    if (!deckId) {
        res.status(400).json({ success: false, error: "Missing deckId" });
        return;
    }

    if (maximumCards == null || maximumCards == undefined) {
        res.status(400).json({ success: false, error: "Missing maximumCards" });
        return;
    }

    if (!document) {
        res.status(400).json({ success: false, error: "Missing document" });
        return;
    }

    const response = await chat.call([
        new HumanChatMessage(
            `Given the following data, formulate flashcards that would be most beneficial when revised by the user with the goal of learning.
You should follow ALL the following rules when generating an answer:
- There will be CONTEXT for you to follow.
- The final answer must always be a JSON list with the following structure:
    [
        {
            "type": "basic",
            "question": "What is the capital of France?",
            "answer": "Paris"
        },
        {
            "type": "cloze",
            "question": "The capital of Spain is {{c1::Madrid}}",
        }
    ]
- Your primary goal is to generate flashcards.
- The CONTEXT is a plain text document that contains the data intended to be made into flashcards.
- Phrase Your Flashcards As Questions
- Follow the Minimum Information Principle (Don't make the answers too complex to remember)
- Use Cloze Deletions when appropriate
- Use enumeration over lists.
- Be Concise

CONTEXT: ${document}`
        )
    ]);

    const answer = response.text;

    res.status(200).json({success: true, answer: answer});
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