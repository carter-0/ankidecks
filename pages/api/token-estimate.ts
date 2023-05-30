import { GPTTokens } from 'gpt-tokens'
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input } = JSON.parse(req.body) as { input: string };

    const gptTokens = new GPTTokens({
        model: 'gpt-3.5-turbo',
        messages: [
            { 'role': 'system', 'content': 'You are a helpful assistant' },
            { 'role': 'user', 'content': input },
        ],
    })

    return res.status(200).json({ success: true, tokens: Math.round(gptTokens.usedTokens * 2.5) });
}