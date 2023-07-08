import { AnyRootConfig } from '@trpc/server';
import { createApplicationUseCase } from '../instances';
import type { BaseProcedure, RouterFactory } from '@visalytics/interfaces';
import { z } from 'zod';

export const controller = {
  createApplication: createApplicationUseCase.execute,
};

export function createTRPCModuleRouter<
  TConfig extends AnyRootConfig,
  TRouterFactory extends RouterFactory<TConfig>,
  TBaseProcedure extends BaseProcedure<TConfig>
>(createRouter: TRouterFactory, baseProcedure: TBaseProcedure) {
  return createRouter({
    createApplication: baseProcedure
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
}
