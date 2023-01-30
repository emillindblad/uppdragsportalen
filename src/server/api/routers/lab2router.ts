import { createTRPCRouter, publicProcedure } from "../trpc";

export const lab2router = createTRPCRouter({
    getTasks: publicProcedure.query( () => {
        return {
            task: "your mom",
        }
    })

});
