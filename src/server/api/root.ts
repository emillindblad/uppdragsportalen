import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { uppdragrouter } from "./routers/uppdragrouter";

/**
* This is the primary router for your server.
*
* All routers added in /api/routers should be manually added here
*/
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    uppdrag: uppdragrouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
