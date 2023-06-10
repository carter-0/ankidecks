import { GPTTokens } from 'gpt-tokens'
import { NextApiRequest, NextApiResponse } from "next";
import {calcTokens} from "@/lib/helper";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input } = JSON.parse(req.body) as { input: string };

    const tokens = calcTokens(input);

    return res.status(200).json({ success: true, tokens: Math.round(tokens) });
}