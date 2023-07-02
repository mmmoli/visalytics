import { publicProcedure, router } from '@visalytics/shared-services/trpc';
import { ApplicationsTRPCRouterFactory } from '@visalytics/modules/applications/api';

const params = {
  router,
  publicProcedure,
};

export const appRouter = router({
  applications: new ApplicationsTRPCRouterFactory(params).build(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
