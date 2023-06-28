import { NextApiRequest, NextApiResponse } from "next";
import {calcTokens} from "@/lib/helper";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input, type } = JSON.parse(req.body) as { input: string | number, type?: string };
    let tokens: number;

    if (type) {
        if (type === 'variation') {
            // In this case, input is the number of cards present in the deck of which a variation will be generated.
            // To simplify this code, I'm just assuming each card will use about 100 tokens. This *could* be abused later on, but it's fine for now.
            tokens = (input as number * 100);
        } else {
            tokens = calcTokens(input as string);
        }
    } else {
        tokens = calcTokens(input as string);
    }

    return res.status(200).json({ success: true, tokens: Math.round(tokens) });
}