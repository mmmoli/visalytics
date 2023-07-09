import { Fail, Ok, IUseCase, Result, IResult } from 'types-ddd';
import {
  Nation,
  DecisionSchema,
  SubmissionDateSchema,
  ApplicationFeeSchema,
  ApplicationFee,
  SubmissionDate,
  Decision,
  SubmittedApplication,
  PendingApplication,
  DecidedApplication,
  CountryCode,
  CountryCodeSchema,
} from '../../domain';
import { z } from 'zod';

export const CreateApplicationInputSchema = z.object({
  fromNationCode: CountryCodeSchema,
  toNationCode: CountryCodeSchema,
  submission: z
    .object({
      date: SubmissionDateSchema,
      fee: ApplicationFeeSchema,
    })
    .optional(),
  decision: DecisionSchema.optional(),
});

export type CreateApplicationInput = z.infer<
  typeof CreateApplicationInputSchema
>;

export class CreateApplicationUseCase
  implements IUseCase<CreateApplicationInput, Result>
{
  async execute(data: CreateApplicationInput): Promise<Result> {
    let applicationResult: IResult<
      PendingApplication | SubmittedApplication | DecidedApplication
    >;

    const fromNationResult = Nation.create({
      code: data.fromNationCode as CountryCode,
    });
    if (fromNationResult.isFail()) return Fail(fromNationResult.error());

    // To Nation
    const toNationResult = Nation.create({
      code: data.toNationCode as CountryCode,
    });
    if (toNationResult.isFail()) return Fail(toNationResult.error());

    applicationResult = PendingApplication.create({
      fromNation: fromNationResult.value(),
      toNation: toNationResult.value(),
    });

    if (applicationResult.isFail()) return Fail(applicationResult.error());

    if (data.submission) {
      const feeResult = ApplicationFee.create(data.submission.fee);
      if (feeResult.isFail()) return Fail(feeResult.error());

      const submissionDateResult = SubmissionDate.create(data.submission.date);

      if (submissionDateResult.isFail()) {
        return Fail(submissionDateResult.error());
      }

      applicationResult = (applicationResult.value() as PendingApplication).withSubmission({
        fee: feeResult.value(),
        submissionDate: submissionDateResult.value(),
      });

      if (applicationResult.isFail()) {
        return Fail(applicationResult.error());
      }
    } else if (data.decision) {
      return Fail(
        `Cannot create an Application with a decision without it being submited.`
      );
    }

    if (data.submission && data.decision) {
      const decisionResult = Decision.create(data.decision);
      if (decisionResult.isFail()) {
        return Fail(decisionResult.error());
      }
      const decision = decisionResult.value();
      applicationResult = (
        applicationResult.value() as SubmittedApplication
      ).withDecision({
        decision,
      });

      if (applicationResult.isFail()) {
        return Fail(applicationResult.error());
      }
    }

    const application = applicationResult.value();

    console.log(JSON.stringify(application.toObject(), null, 2));
    return Ok();
  }
}
