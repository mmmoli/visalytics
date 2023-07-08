import { IResult, Ok, ValueObject, Fail } from 'types-ddd';
import { z } from 'zod';

export const SubmissionDateSchema = z.date().max(new Date(), {
  message: `Submission Date cannot be in the future.`,
});

export type SubmissionDateProps = z.infer<typeof SubmissionDateSchema>;

export class SubmissionDate extends ValueObject<SubmissionDateProps> {
  private constructor(props: SubmissionDateProps) {
    super(props);
  }

  public static override create(
    props: SubmissionDateProps
  ): IResult<SubmissionDate> {
    const result = SubmissionDateSchema.safeParse(props);
    if (!result.success) {
      return Fail(
        result.error.issues[0]?.message ?? 'Could not create SubmissionDate'
      );
    }

    return Ok(new SubmissionDate(result.data));
  }
}
