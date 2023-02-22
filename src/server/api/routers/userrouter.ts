import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hashPw } from "../../hash";

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
    updateNameEmail: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.user.update({
            where: { id: input.id },
            data: {
                name: input.name,
                email: input.email
            }
        });
    }),
    
    updateAllInfo: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const hashedPassword = await hashPw(input.password)
        return ctx.prisma.user.update({
            where: { id: input.id },
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
            }
        });
    }),
});


