import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const { email, password } = req.body;
        console.log(req.body)
        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: email,
        //     },
        // });
        const user = {
            id: 1,
            name: "John Doe",
            email: "dab@dab.se",
            password: "1234"
        }
        if (user) {
            if (user.password == password) {
                console.log("User found");
                res.status(200).json(user);
            } else {
                res.status(418).json({ error: "Wrong password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }
}