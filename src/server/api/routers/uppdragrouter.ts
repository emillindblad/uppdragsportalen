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

    //addUppdrag: publicProcedure.query(({ ctx }) => {
    //return ctx.prisma.uppdrag.create({
    //data: undefined
    //})
    //})

});
