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

    getAllUppdrag: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany();
    }),

    getUppdragFromId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findUnique({
            where: { id: input.id }
        });
    }),

    demoRemoveUppdrag: protectedProcedure
    .input(z.object({ nollk: z.string() }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.uppdrag.deleteMany({
            where: { nollk: input.nollk }
        })
    })


    //addUppdrag: publicProcedure.query(({ ctx }) => {
    //return ctx.prisma.uppdrag.create({
    //data: undefined
    //})
    //})

});
