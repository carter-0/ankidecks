import {prisma} from "@/lib/db";
import {GPTTokens} from "gpt-tokens";
export const getUserTokens = async (userId: string) => {
    let user = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    }) as User

    if (!user) {
        user = await prisma.user.create({
            data: {
                userId: userId,
            }
        }) as User
    }

    return user.tokenAllowance - user.tokensUsed
}

export const calcTokens = (source: string, response?: string) => {
    if (response) {
        const gptTokenEstimate = new GPTTokens({
            model: 'gpt-3.5-turbo',
            messages: [
                { 'role': 'system', 'content': 'You are a flashcard maker.' },
                { 'role': 'user', 'content': `Given the following data, make flashcards for me. You should follow these rules when making them:
- There will be data for you to transform into flashcards
- The final answer must always be a JSON list with the following structure:
    [
        {
            "type": "basic",
            "question": "What is the capital of France?",
            "answer": "Paris"
        }
    ]
- Nothing other than valid JSON is allowed in your response
- Phrase your flashcards as questions

data: ${source}` },
                { 'role': 'assistant', 'content': response },
            ],
        })

        return gptTokenEstimate.usedTokens
    }

    const gptTokenEstimate = new GPTTokens({
        model: 'gpt-3.5-turbo',
        messages: [
            { 'role': 'system', 'content': 'You are a flashcard maker.' },
            { 'role': 'user', 'content': `Given the following data, make flashcards for me. You should follow these rules when making them:
- There will be data for you to transform into flashcards
- The final answer must always be a JSON list with the following structure:
    [
        {
            "type": "basic",
            "question": "What is the capital of France?",
            "answer": "Paris"
        }
    ]
- Nothing other than valid JSON is allowed in your response
- Phrase your flashcards as questions

data: ${source}` },
        ],
    })

    return gptTokenEstimate.usedTokens * 2
}