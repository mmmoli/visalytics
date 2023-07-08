import { createTRPCRouter, publicProcedure } from '../trpc';
import { createTRPCModuleRouter } from '@visalytics/modules/applications/api';

export const applicationsRouter = createTRPCModuleRouter(
  createTRPCRouter,
  publicProcedure
);
