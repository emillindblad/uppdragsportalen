import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getLogin(req: NextApiRequest, res: NextApiResponse) {
    const loginInfo = true;
    console.log(req)
    res.json(loginInfo)
}