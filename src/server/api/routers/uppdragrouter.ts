import { UppdragStatus } from "@prisma/client";
import { z } from "zod";
import { uppdragCreateSchema } from "../../../pages/uppdrag/newuppdrag";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({
    getByYear: protectedProcedure
    .input(z.object({ year: z.number()}))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { year: input.year }
        });
    }),

    getByNollKThisYear: protectedProcedure
    .input(z.object({ year: z.number()}))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: {nollk: ctx.session.user.nollk, year: input.year}
        });
    }),

    getByNollK: protectedProcedure
    .input(z.object({}))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { nollk: ctx.session.user.nollk }
        });
    }),

    getAllbyStatus: protectedProcedure
    .input(z.object({ status: z.nativeEnum(UppdragStatus) }))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { status: input.status}
        });
    }),

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany();
    }),

    getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findUnique({
            where: { id: input.id },
            include: { author: true }
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
                author: {
                    connect: {
                        id: ctx.session.user.id
                    }
                },
                title: input.title,
                place: input.place,
                time: input.time,
                participants: input.participants,
                desc: input.desc,
                motivation: input.motivation,
                private: input.private,
                status: input.status
            }
        });
    }),

    update: protectedProcedure
    .input(uppdragCreateSchema.and(z.object({ id: z.string() })))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.uppdrag.update({
            where: {
                id: input.id
            },
            data: {
                year: input.year,
                nollk: input.nollk,
                author: {
                    connect: {
                        id: ctx.session.user.id
                    }
                },
                title: input.title,
                place: input.place,
                time: input.time,
                participants: input.participants,
                desc: input.desc,
                motivation: input.motivation,
                private: input.private,
                status: input.status
            }
        });
    }),

});
