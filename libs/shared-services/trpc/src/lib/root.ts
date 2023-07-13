import { createTRPCRouter, publicProcedure, userProcedure, SignedInAuthObject, SignedOutAuthObject } from './trpc';
import { createTRPCNext } from '@trpc/next';
import { exampleRouter } from './routes/example';
import { createTRPCModuleRouter } from '@visalytics/modules/applications/api';

export const applicationsRouter = createTRPCModuleRouter(
  createTRPCRouter,
  publicProcedure,
  userProcedure
);

export type { SignedInAuthObject, SignedOutAuthObject }

export const appRouter = createTRPCRouter({
  applications: applicationsRouter,
  example: exampleRouter
});

export type AppRouter = typeof appRouter;

export type API  = ReturnType<typeof createTRPCNext<AppRouter>>