import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userrouter = createTRPCRouter({
    getAdmins: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { nollk: "MK" }
        });
    }),

    getUserStatus: protectedProcedure
    .query(({ ctx }) => {
        return ctx.session.user.isAdmin;
    }),

});
