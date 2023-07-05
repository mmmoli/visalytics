import * as impl from '../instances';
import { ApplicationsTRPCController } from '../trpc/applications-trpc-controller';

export const applicationsTRPCController = new ApplicationsTRPCController({
  createApplicationUseCase: impl.createApplicationUseCase,
});
