import { createTRPCRouter, publicProcedure } from '../trpc';
import { applicationsTRPCController as controller } from '@visalytics/modules/applications/api';

export const applicationsRouter = createTRPCRouter({
  createApplication: publicProcedure.mutation(
    (opts) => controller.createApplication
  ),
  listApplications: publicProcedure.query(
    (opts) => controller.listApplications
  ),
});
