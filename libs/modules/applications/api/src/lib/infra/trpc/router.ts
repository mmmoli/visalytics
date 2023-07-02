import { z } from 'zod';
import type {
  TRPCPublicProcedure,
  TRPCRouter,
} from '@visalytics/shared-services/trpc';
import { TRPCRouterFactoryTrait } from '@visalytics/traits';

type Application = {
  id: string;
  name: string;
};
const useCases = {
  createApplication: (input: unknown) => {
    console.log('createApplication', input);
  },

  deleteApplication: (input: unknown) => {
    console.log('deleteApplication', input);
  },

  listApplications: () => {
    return [
      {
        id: '1',
        name: 'Application 1',
      },
      {
        id: '2',
        name: 'Application 1',
      },
      {
        id: '3',
        name: 'Application 1',
      },
    ] as Application[];
  },
};

export type TRPCApplicationsControllerDeps = {
  router: TRPCRouter;
  publicProcedure: TRPCPublicProcedure;
};


export class ApplicationsTRPCRouterFactory implements TRPCRouterFactoryTrait {
  constructor(private deps: TRPCApplicationsControllerDeps) {}
  build() {
    return this.deps.router({
      createApplication: this.deps.publicProcedure
        .input(
          z.object({
            name: z.string(),
          })
        )
        .mutation(({ input }) => useCases.createApplication(input)),

      deleteApplication: this.deps.publicProcedure
        .input(
          z.object({
            applicationId: z.string(),
          })
        )
        .mutation(({ input }) => useCases.deleteApplication(input)),

      listApplications: this.deps.publicProcedure.query(() =>
        useCases.listApplications()
      ),
    });
  }
}
