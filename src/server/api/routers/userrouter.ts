import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userrouter = createTRPCRouter({
    getAdmins: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { nollk: "MK" }
        });
    }),
    getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input.id }
        });
    }),
});
