import { UppdragStatus } from "@prisma/client";
import { z } from "zod";
import { uppdragCreateSchema } from "../../../pages/uppdrag/newuppdrag";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({

     /**
    * Gets an array of assignments by year
    */
    getByYear: protectedProcedure
    .input(z.object({ year: z.number()}))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { year: input.year, private: false, status: 'APPROVED' }
        });
    }),


     /**
    * Gets an array of assignments with a specific year and the logged-in nollk
    */
    getByNollKThisYear: protectedProcedure
    .input(z.object({ year: z.number()}))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: {nollk: ctx.session.user.nollk, year: input.year}
        });
    }),

     /**
    * Gets an array of assignments belonging to the logged-in nollk
    */

    getByNollK: protectedProcedure
    .input(z.object({}))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { nollk: ctx.session.user.nollk }
        });
    }),

    /**
    * Gets an array of assignments by status
    */
    getAllbyStatus: protectedProcedure
    .input(z.object({ status: z.nativeEnum(UppdragStatus) }))
    .query(({ctx, input }) => {
        return ctx.prisma.uppdrag.findMany({
            where: { status: input.status}
        });
    }),

    /**
    * Gets an array of all available assignments
    */
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany();
    }),

    /**
    * Gets an assignment by its Id
    */
    getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.uppdrag.findUnique({
            where: { id: input.id },
            include: { author: true }
        });
    }),

    /**
    * Deletes an assignment based on its Id
    */
    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.uppdrag.delete({
            where: { id: input.id }
        })
    }),

    /**
    * Creates an assignment, where the author becomes the logged-in user
    */
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

    /**
    * Updates an assignment (e.g. if the creator edits it)
    */
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
