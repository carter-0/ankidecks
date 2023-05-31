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
    const { deckId } = req.query as { deckId: string }
    const { maximumCards, source } = JSON.parse(req.body) as { maximumCards: string, source: string }

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

    if (maximumCards == null || maximumCards == undefined) {
        res.status(400).json({ success: false, error: "Missing maximumCards" });
        return;
    }

    if (!source) {
        res.status(400).json({ success: false, error: "Missing document" });
        return;
    }

    const response = await chat.call([
        new SystemChatMessage("You are a flashcard maker."),
        new HumanChatMessage(
            `Given the following data, make flashcards for me. You should follow these rules when making them:
- There will be data for you to transform into flashcards
- The final answer must always be a JSON list with the following structure:
    [
        {
            "type": "basic",
            "question": "What is the capital of France?",
            "answer": "Paris"
        }
    ]
- Phrase your flashcards as questions

data: ${source}`
        )
    ]);

    const answer = JSON.parse(response.text);
    console.log(answer)

    for (const card of answer) {
        card.type = card.type.toUpperCase() as 'CLOZE' | 'BASIC';

        if (card.type == 'CLOZE') {
            await prisma.card.create({
                data: {
                    deckId: deckId,
                    front: card.question,
                    type: card.type,
                }
            })
        } else if (card.type == 'BASIC') {
            await prisma.card.create({
                data: {
                    deckId: deckId,
                    front: card.question,
                    back: card.answer,
                    type: card.type,
                }
            })
        }
    }

    res.status(200).json({success: true, deckId: deckId});
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