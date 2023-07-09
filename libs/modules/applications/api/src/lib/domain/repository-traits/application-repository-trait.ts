import { IResult, UID } from 'types-ddd';
import { AnyApplication } from '../aggregates';

export interface ApplicationRepositoryTrait {
  getById(applicationId: UID): Promise<IResult<AnyApplication>>;
  save(application: AnyApplication): Promise<IResult<void>>;
}
