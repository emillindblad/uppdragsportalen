import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "info@mk.chs.chalmers.se" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {

                if (credentials == null ) {
                    return null
                }

                const userData = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userData) {
                    throw new Error("Ingen användare med den eposten finns i systemet. Skapa ett konto först.")
                }

                if (!userData.accepted) {
                    throw new Error("Användaren har inte blivit accepterad in i systemet av MK. Kontakta MK så löser vi det.")
                }

                const isValidPass = bcrypt.compareSync(
                    credentials.password,
                    userData.password
                );

                if (!isValidPass) {
                    throw new Error("Uppgifterna stämmer inte.")
                }

                return {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    nollk: userData.nollk,
                    year: userData.year,
                    isAdmin: userData.nollk === "MK"
                };

            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if (token && session.user) {
                session.user.image = null;
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.nollk = token.nollk as string;
                session.user.year = token.year as number;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.nollk = user.nollk;
                token.year = user.year;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions);
