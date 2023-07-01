import { exampleRouter } from "@visalytics/server/api/routers/example";
import { createTRPCRouter } from "@visalytics/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
