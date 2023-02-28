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
        newUser: "/register",
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
                    console.log("credentials null")
                    return null
                }

                const userData = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userData) {
                    return null
                }

                const isValidPass = bcrypt.compareSync(
                    credentials.password,
                    userData.password
                );

                if (!isValidPass) {
                    console.log("passwords dont match")
                    return null;
                }

                return {
                    name: userData.name,
                    email: userData.email,
                    id: userData.id,
                    isAdmin: userData.nollk === "MK"
                };

            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions);
