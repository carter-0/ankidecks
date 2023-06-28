import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import {sendRabbitMQMessage} from "@/lib/rabbitmq";
import {getVariationTokenEstimate} from "@/lib/publicHelper";

export default async function handler(req: any, res: any) {
    const {userId} = getAuth(req);
    const {deckId} = req.query;
    const {onlyGenerateFirstField} = JSON.parse(req.body);

    if (!deckId) {
        return res.status(400).json({success: false, message: "Missing deckId"});
    }

    if (!userId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    let firstField = false;

    if (onlyGenerateFirstField === true) {
        firstField = true;
    }

    const deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        },
        select: {
            user: true,
            name: true,
            _count: {
                select: {
                    cards: true
                }
            }
        }
    }) as any;

    if (!deck || deck.user !== userId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    const user = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    }) as User;

    console.log(deck._count.cards)
    console.log(getVariationTokenEstimate(deck._count.cards))
    console.log(user.tokenAllowance)

    if (getVariationTokenEstimate(deck._count.cards) > (user.tokenAllowance - user.tokensUsed)) {
        return res.status(402).json({success: false, message: "Too many tokens"});
    }

    const task = await prisma.task.create({
        data: {
            userId: userId,
            type: 'VARIATION',
            title: `Generating variation of ${deck.name}`,
            deck: {
                connect: {
                    id: deckId
                }
            },
            status: 'PENDING',
            startedAt: new Date()
        }
    }) as Task;

    await sendRabbitMQMessage({
        type: 'VARIATION',
        deckId: `${deckId}`,
        taskId: `${task.id}`,
        firstField: firstField,
    })

    return res.status(200).json({success: true});
}