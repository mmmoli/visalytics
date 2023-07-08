import { AnyRootConfig, TRPCError } from '@trpc/server';
import { createApplicationUseCase } from '../instances';
import type { BaseProcedure, RouterFactory } from '@visalytics/interfaces';
import { z } from 'zod';
import { CreateApplicationInputSchema } from '../../use-cases';

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
      .input(CreateApplicationInputSchema)
      .mutation(async (opts) => {
        const result = await controller.createApplication(opts.input);
        if (result.isFail()) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: result.error(),
          });
        }
        return result.value();
      }),
  });
}
