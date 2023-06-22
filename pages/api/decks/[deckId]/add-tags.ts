import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import {sendRabbitMQMessage} from "@/lib/rabbitmq";

export default async function handler(req: any, res: any) {
    const {userId} = getAuth(req);
    const {deckId} = req.query;
    const {customTags, customTagsList} = JSON.parse(req.body);

    if (!deckId) {
        return res.status(400).json({success: false, message: "Missing deckId"});
    }

    if (!userId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    let newTags: string[] = [];

    if (customTags && customTagsList && customTagsList.length > 0) {
        customTags.forEach((tag: string) => {
            if (!tag.includes(" ")) {
                newTags.push(tag);
            }
        })
    }

    const deck = await prisma.deck.findUnique({
        where: {
            id: deckId
        }
    }) as Deck;

    if (!deck || deck.user !== userId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    const task = await prisma.task.create({
        data: {
            userId: userId,
            type: 'ADD_TAGS',
            title: `Adding tags to ${deck.name}`,
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
        type: 'ADD_TAGS',
        deckId: `${deckId}`,
        tags: newTags,
        taskId: task.id
    })

    return res.status(200).json({success: true});
}