import { createTRPCRouter } from './trpc';
import { applicationsRouter } from './routes/applications';
import { createTRPCNext } from '@trpc/next';
import { exampleRouter } from './routes/example';

export const appRouter = createTRPCRouter({
  applications: applicationsRouter,
  example: exampleRouter
});

export type AppRouter = typeof appRouter;

export type API  = ReturnType<typeof createTRPCNext<AppRouter>>