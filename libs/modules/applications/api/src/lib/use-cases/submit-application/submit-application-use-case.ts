import { Fail, Ok, IUseCase, Result, IResult, ID } from 'types-ddd';
import {
  AnyApplication,
  ApplicationFee,
  ApplicationFeeSchema,
  ApplicationRepositoryTrait,
  PendingApplication,
  SubmissionDate,
  SubmissionDateSchema,
} from '../../domain';
import { z } from 'zod';

export const SubmitApplicationInputSchema = z.object({
  applicationId: z.string().uuid(),
  date: SubmissionDateSchema,
  fee: ApplicationFeeSchema,
});

export type SubmitApplicationInput = z.infer<
  typeof SubmitApplicationInputSchema
>;

export interface SubmitApplicationDeps {
  applicationRepo: ApplicationRepositoryTrait;
}

export class SubmitApplicationUseCase
  implements IUseCase<SubmitApplicationInput, Result>
{
  constructor(private readonly deps: SubmitApplicationDeps) {}

  async execute(data: SubmitApplicationInput): Promise<Result> {
    let applicationResult: IResult<AnyApplication>;
    const appId = ID.create(data.applicationId);

    try {
      applicationResult = await this.deps.applicationRepo.getById(appId);
      if (applicationResult.isFail()) return Fail(applicationResult.error());
    } catch (error) {
      return Fail(
        (error as Error).message ??
          `Couldn't get application with id ${data.applicationId}`
      );
    }

    const application = applicationResult.value();
    if (!(application instanceof PendingApplication)) {
      return Fail(`Application is already submitted`);
    }

    const feeResult = ApplicationFee.create(data.fee);
    if (feeResult.isFail()) return Fail(feeResult.error());

    const submissionDateResult = SubmissionDate.create(data.date);

    if (submissionDateResult.isFail()) {
      return Fail(submissionDateResult.error());
    }

    const submittedApplicationResult = application.withSubmission({
      fee: feeResult.value(),
      submissionDate: submissionDateResult.value(),
    });

    if (submittedApplicationResult.isFail()) {
      return Fail(submittedApplicationResult.error());
    }
    const submittedApplication = submittedApplicationResult.value();

    try {
      const saveResult = await this.deps.applicationRepo.save(
        submittedApplication
      );
      if (saveResult.isFail()) return Fail(saveResult.error());
    } catch (error) {
      return Fail((error as Error).message ?? `Couldn't save Application`);
    }

    console.log(JSON.stringify(submittedApplication.toObject(), null, 2));
    return Ok();
  }
}
