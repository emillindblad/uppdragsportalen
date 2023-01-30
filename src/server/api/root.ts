import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { lab2router } from "./routers/lab2router";

/**
* This is the primary router for your server.
*
* All routers added in /api/routers should be manually added here
*/
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    lab2: lab2router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
