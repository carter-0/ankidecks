import { get_encoding } from "@dqbd/tiktoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input } = JSON.parse(req.body) as { input: string };
    const encoding = get_encoding("cl100k_base");
    const tokens = encoding.encode(input);
    encoding.free();
    return res.status(200).json({ success: true, tokens: tokens });
}