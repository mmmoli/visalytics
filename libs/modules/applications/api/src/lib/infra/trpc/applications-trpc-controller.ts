import { AnyRootConfig, TRPCError } from '@trpc/server';
import {
  createApplicationUseCase,
  // submitApplicationUseCase,
} from '../instances';
import type { BaseProcedure, RouterFactory } from '@visalytics/interfaces';
import {
  CreateApplicationInputSchema,
  // SubmitApplicationInputSchema,
} from '../../use-cases';

export function createTRPCModuleRouter<
  TConfig extends AnyRootConfig,
  TRouterFactory extends RouterFactory<TConfig>,
  TBaseProcedure extends BaseProcedure<TConfig>,
  TAuthProcedure extends BaseProcedure<TConfig>
>(
  createRouter: TRouterFactory,
  baseProcedure: TBaseProcedure,
  authProcedure: TAuthProcedure
) {
  return createRouter({
    list: authProcedure.query(async () => {
      return [
        {
          id: '1',
          name: 'UK to FRA',
          outcome: 'GRANTED',
        },
        {
          id: '2',
          name: 'UK to ESP',
          outcome: 'DENIED',
        },
      ];
    }),
    createApplication: authProcedure
      .input(CreateApplicationInputSchema)
      .mutation(async (opts) => {
        const result = await createApplicationUseCase.execute(opts.input);
        if (result.isFail()) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: result.error(),
          });
        }
        return result.value();
      }),
    // submitApplication: authProcedure
    //   .input(SubmitApplicationInputSchema)
    //   .mutation(async (opts) => {
    //     const result = await submitApplicationUseCase.execute(opts.input);
    //     if (result.isFail()) {
    //       throw new TRPCError({
    //         code: 'BAD_REQUEST',
    //         message: result.error(),
    //       });
    //     }
    //     return result.value();
    //   }),
  });
}
