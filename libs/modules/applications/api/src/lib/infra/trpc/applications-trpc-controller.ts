import { AnyRootConfig, TRPCError } from '@trpc/server';
import {
  createApplicationUseCase,
  // submitApplicationUseCase,
} from '../instances';
import type { BaseProcedure, RouterFactory } from '@visalytics/interfaces';
import {
  CreateApplicationInputSchema,
  SubmitApplicationInputSchema,
} from '../../use-cases';
import { z } from 'zod';
import { IUseCase } from 'types-ddd';

export const controller = {
  createApplication: createApplicationUseCase.execute,
  // submitApplication: submitApplicationUseCase.execute,
};

// export interface ThingDeps {
//   useCase: IUseCase<unknown, unknown>;
//   input: z.AnyZodObject;
//   output?: z.AnyZodObject;
// }

// class Thing {
//   constructor(public readonly deps: ThingDeps) {}

//   procedure() {
//     return baseProcedure.input(this.deps.input).mutation(async (opts) => {
//       const result = await controller.createApplication(opts.input);
//       if (result.isFail()) {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: result.error(),
//         });
//       }
//       return result.value();
//     });
//   }
// }

/*********
 * Something
 * const thing = new Thing({ useCase: createApplicationUseCase }).procedure();
 *
 * createApplication: new Thing({ useCase: createApplicationUseCase }).procedure()
 * ************/

export function createTRPCModuleRouter<
  TConfig extends AnyRootConfig,
  TRouterFactory extends RouterFactory<TConfig>,
  TBaseProcedure extends BaseProcedure<TConfig>
>(createRouter: TRouterFactory, baseProcedure: TBaseProcedure) {
  return createRouter({
    list: baseProcedure.query(async () => {
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
    // submitApplication: baseProcedure
    //   .input(SubmitApplicationInputSchema)
    //   .mutation(async (opts) => {
    //     const result = await controller.submitApplication(opts.input);
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
