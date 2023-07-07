import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { controller } from '@visalytics/modules/applications/api';

export const applicationsRouter = createTRPCRouter({
  createApplication: publicProcedure
    .input(
      z.object({
        fee: z.object({
          value: z.number().positive(),
          currency: z.enum([`BRL`, `USD`, `EUR`, `JPY`]),
        }),
        fromNationCode: z.string(),
        toNationCode: z.string(),
      })
    )
    .mutation((opts) => controller.createApplication(opts.input)),
});
