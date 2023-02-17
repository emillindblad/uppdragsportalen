import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({
    getCurrentYearUppdrag: protectedProcedure
    .input(z.object({ year: z.number() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { year: input.year }
        });
    }),

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany();
    }),

    getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findUnique({
            where: { id: input.id }
        });
    }),

    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.uppdrag.delete({
            where: { id: input.id }
        })
    }),



    //addUppdrag: publicProcedure.query(({ ctx }) => {
    //return ctx.prisma.uppdrag.create({
    //data: undefined
    //})
    //})

});
