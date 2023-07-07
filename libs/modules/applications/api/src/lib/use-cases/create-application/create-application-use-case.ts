import {
  Fail,
  Ok,
  IUseCase,
  Result,
  DateValueObject,
  CurrencyValueObject,
} from 'types-ddd';
import { Application, Decision, Nation, Outcome } from '../../domain';

export type CreateApplicationInput = {
  fee: {
    value: number;
    currency: `BRL` | `USD` | `EUR` | `JPY`;
  };
  fromNationCode: string;
  toNationCode: string;
};

export class CreateApplicationUseCase
  implements IUseCase<CreateApplicationInput, Result>
{
  async execute(data: CreateApplicationInput): Promise<Result> {
    const submissionDate = new Date(2019, 3, 24);
    const submittedOn = DateValueObject.create(submissionDate).value();

    // Fee Paid
    const feePaidResult = CurrencyValueObject.create(data.fee);
    if (feePaidResult.isFail()) return Fail(feePaidResult.error());
    const feePaid = feePaidResult.value();

    // Decision
    const decisionDate = new Date(2019, 4, 15);
    const durationInMonths = 6;
    const decisionResult = Decision.create({
      outcome: Outcome.granted({
        durationInMonths,
      }).value(),
      receivedOn: DateValueObject.create(decisionDate).value(),
    });
    if (decisionResult.isFail()) return Fail(decisionResult.error());
    const decision = decisionResult.value();

    // From Nation
    const fromNationResult = Nation.createFromCode(data.fromNationCode);
    if (fromNationResult.isFail()) return Fail(fromNationResult.error());
    const fromNation = fromNationResult.value();

    // To Nation
    const toNationResult = Nation.createFromCode(data.toNationCode);
    if (toNationResult.isFail()) return Fail(toNationResult.error());
    const toNation = toNationResult.value();

    // Create Application
    const applicationResult = Application.create({
      decision,
      feePaid,
      fromNation,
      submittedOn,
      toNation,
    });

    if (applicationResult.isFail()) {
      return Fail('Application could not be created');
    }

    const application = applicationResult.value();

    console.log(JSON.stringify(application.toObject(), null, 2));

    return Ok();
  }
}
