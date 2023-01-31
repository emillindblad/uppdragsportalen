import { createTRPCRouter, publicProcedure } from "../trpc";

export const uppdragrouter = createTRPCRouter({
    getUppdrag: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.uppdrag.findMany({take: 2})
    })

});
