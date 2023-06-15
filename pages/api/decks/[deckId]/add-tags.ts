import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import {sendRabbitMQMessage} from "@/lib/rabbitmq";

export default async function handler(req: any, res: any) {
    const {userId} = getAuth(req);
    const {deckId} = req.query;
    const {tags} = JSON.parse(req.body);

    if (!deckId) {
        return res.status(400).json({message: "Missing deckId"});
    }

    if (!userId) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        }
    }) as Deck;

    if (!deck || deck.user !== userId) {
        return res.status(401).json({message: "Unauthorized"});
    }

    await sendRabbitMQMessage({
        type: 'ADD_TAGS',
        deckId: `${deckId}`,
    })
}