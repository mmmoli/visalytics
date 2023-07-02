import { ApplicationsTRPCRouterFactory } from '@visalytics/modules/applications/api';
import { router, publicProcedure } from './trpc';

const params = {
  router,
  publicProcedure,
};

export const appRouter = router({
  applications: new ApplicationsTRPCRouterFactory(params).build(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
