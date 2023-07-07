import { createApplicationUseCase } from '../instances';


export const controller = {
  createApplication: createApplicationUseCase.execute,
};
