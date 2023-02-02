import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../server/api/root";
import { createTRPCContext } from "../../server/api/trpc";

const apiTestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ctx = await createTRPCContext({req, res });
    const caller = appRouter.createCaller(ctx);
    console.log(req.query)
    console.log(req.method)

    try {
        const { id } = req.query;
        const user = await caller.example.hello({
            text: "Hii"
        })
        res.status(200).json(user)
    } catch (cause) {
        if (cause instanceof TRPCError) {
            const httpCode = getHTTPStatusCodeFromError(cause);
            return res.status(httpCode).json(cause);
        }
        console.log(cause);
        res.status(500).json({ message: "Internal server error" })
    }
};

export default apiTestHandler;

