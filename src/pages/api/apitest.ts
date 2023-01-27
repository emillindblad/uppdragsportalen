import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(res.req);
    res.status(418).json({ name: 'John Doe' });
}
