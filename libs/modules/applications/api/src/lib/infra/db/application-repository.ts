import { IResult, Ok, UID } from 'types-ddd';
import {
  AnyApplication,
  ApplicationRepositoryTrait,
  Nation,
  PendingApplication,
} from '../../domain';

export class ApplicationRepository implements ApplicationRepositoryTrait {
  async getById(_applicationId: UID): Promise<IResult<AnyApplication>> {
    const fromNation = Nation.create({ code: 'AD' }).value();
    const toNation = Nation.create({ code: 'EE' }).value();

    const applicationResult = PendingApplication.create({
      fromNation,
      toNation,
      travelDate: new Date(),
    });

    return applicationResult;
  }

  async save(_application: AnyApplication): Promise<IResult<void>> {
    return Ok();
  }
}
