import { Fail, Ok, IUseCase, Result } from 'types-ddd';
import {
  Nation,
  DecisionSchema,
  SubmissionDateSchema,
  ApplicationFeeSchema,
  AnyApplication,
  ApplicationFee,
  SubmissionDate,
  Application,
  Decision,
  SubmittedApplication,
} from '../../domain';
import { z } from 'zod';

export const CreateApplicationInputSchema = z.object({
  fromNationCode: z.string(),
  toNationCode: z.string(),
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
    let application: AnyApplication;
    // From Nation
    const fromNationResult = Nation.create(data.fromNationCode);
    if (fromNationResult.isFail()) return Fail(fromNationResult.error());
    const fromNation = fromNationResult.value();

    // To Nation
    const toNationResult = Nation.create(data.toNationCode);
    if (toNationResult.isFail()) return Fail(toNationResult.error());
    const toNation = toNationResult.value();

    const ApplicationResult = Application.create({
      fromNation,
      toNation,
    });

    if (ApplicationResult.isFail()) return Fail(ApplicationResult.error());
    application = ApplicationResult.value();

    if (data.submission) {
      const feeResult = ApplicationFee.create(data.submission.fee);
      if (feeResult.isFail()) return Fail(feeResult.error());
      const fee = feeResult.value();

      const submissionDateResult = SubmissionDate.create(data.submission.date);
      if (submissionDateResult.isFail())
        return Fail(submissionDateResult.error());
      const submissionDate = submissionDateResult.value();

      const SubmittedApplicationResult = application.withSubmission({
        fee,
        submissionDate,
      });
      if (SubmittedApplicationResult.isFail())
        return Fail(SubmittedApplicationResult.error());
      application = SubmittedApplicationResult.value();
    } else if (data.decision) {
      return Fail(
        `Cannot create an Application with a decision without it being submited.`
      );
    }

    if (data.submission && data.decision) {
      const decisionResult = Decision.create(data.decision);
      if (decisionResult.isFail()) return Fail(decisionResult.error());
      const decision = decisionResult.value();
      const decidedApplicationResult = (
        application as SubmittedApplication
      ).withDecision({
        decision,
      });
      if (decidedApplicationResult.isFail())
        return Fail(decidedApplicationResult.error());
      application = decidedApplicationResult.value();
    }

    console.log(JSON.stringify(application.toObject(), null, 2));
    return Ok();
  }
}
