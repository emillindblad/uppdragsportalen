import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hashPw } from "../../hash";


/**
 * This is the router for the user API.
 * "protectedProcedure" means that you need to be logged in to use the procedure.
 * "publicProcedure" means that you don't need to be logged in to use the procedure.
 */
export const userrouter = createTRPCRouter({

    /**
     * Gets a user by their id.
     */
    getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input.id }
        });
    }),

    /**
     * Gets a users nollk by their id.
     */
    getUserNollk: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input.id },
            select: { nollk: true }
        });
    }),

    /**
     * Updates only the email and name of a user.
     */
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

    /**
     * Updates email, name and password of a user.
    */
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

    /**
     * Gets the status of a logged-in user.
     * Returns true if the user is an admin, false otherwise.
     */
    getUserStatus: protectedProcedure
        .query(({ ctx }) => {
            return ctx.session.user.isAdmin;
        }),

    /**
     * Registers a new user.
     */ 
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

    /**
     * Gets all users that are pending acceptance, i.e. users that have registered themselves but not been approved by MK.
     */
    getAllUsersPendingAccept: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { accepted: false }
        });
    }),

    /**
     * Accepts a user by id.
     */
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

    /**
     * Deletes a user by id.
     */
    deleteUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.delete({
                where: { id: input.id }
            });
    }),

    /**
     * Gets all users that are accepted, i.e. users that have been approved by MK.
     * Does not include MK.
     */
    getAllAcceptedUsers: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { accepted: true, nollk: {not: "MK"}},
        });
    }),

});
