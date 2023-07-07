import {
  Aggregate,
  UID,
  DateValueObject,
  CurrencyValueObject,
  IResult,
  Result,
} from 'types-ddd';
import { Decision, Nation } from '../../value-objects';

export interface ApplicationProps {
  id?: UID;
  decision?: Decision;
  submittedOn: DateValueObject;
  feePaid: CurrencyValueObject;
  fromNation: Nation;
  toNation: Nation;
}

export class Application extends Aggregate<ApplicationProps> {
  static override create(props: ApplicationProps): IResult<Application> {
    const application = new Application(props);
    return Result.Ok<Application>(application);
  }
}
