import { z } from "zod";
import { uppdragCreateSchema } from "../../../pages/uppdrag/newuppdrag";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({
    getByYear: protectedProcedure
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

    create: protectedProcedure
    .input(uppdragCreateSchema)
    .mutation(({ ctx, input }) => {
        return ctx.prisma.uppdrag.create({
            data: {
                year: input.year,
                nollk: input.nollk,
                title: input.title,
                place: input.place,
                time: input.time,
                participants: input.participants,
                desc: input.desc,
                motivation: input.motivation,
                private: input.private
            }
        });
    })

});
