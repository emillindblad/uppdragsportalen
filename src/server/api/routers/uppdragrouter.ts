import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({
    getCurrentYearUppdrag: publicProcedure
    .input(z.object({ year: z.number() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { year: input.year }
        });
    }),

    getAllUppdrag: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany();
    }),

    getOneUppdrag: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findUnique({
            where: { id: input.id }
        });
    }),

    //addUppdrag: publicProcedure.query(({ ctx }) => {
    //return ctx.prisma.uppdrag.create({
    //data: undefined
    //})
    //})

});
