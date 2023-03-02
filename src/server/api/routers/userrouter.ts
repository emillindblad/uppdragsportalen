import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hashPw } from "../../hash";

export const userrouter = createTRPCRouter({
    getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input.id }
        });
    }),

    getUserNollk: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input.id },
            select: { nollk: true }
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

    getUserStatus: protectedProcedure
        .query(({ ctx }) => {
            return ctx.session.user.isAdmin;
        }),

    registerNewUser: publicProcedure
        .input(z.object({ name: z.string(), email: z.string(), password: z.string(), nollk: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const hashedPassword = await hashPw(input.password)
            return ctx.prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                    nollk: input.nollk,
                    year: new Date().getFullYear(),
                }
            });
        }),

    getAllUsersPendingAccept: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { accepted: false }
        });
    }),

    acceptUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.update({
                where: { id: input.id },
                data: {
                    accepted: true
                }
            });
    }),

    deleteUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.delete({
                where: { id: input.id }
            });
    }),

    getAllAcceptedUsers: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { accepted: true, nollk: {not: "MK"}},
        });
    }),

});
