import { CreateApplicationUseCase } from '../../use-cases';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ApplicationsTRPCControllerDeps = {
  createApplicationUseCase: CreateApplicationUseCase;
};

type Application = {
  id: string;
  name: string;
};

export class ApplicationsTRPCController {
  constructor(private deps: ApplicationsTRPCControllerDeps) {}

  createApplication() {
    return this.deps.createApplicationUseCase.execute();
  }

  listApplications() {
    const applications: Application[] = [
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
    ];
    return applications;
  }
}
