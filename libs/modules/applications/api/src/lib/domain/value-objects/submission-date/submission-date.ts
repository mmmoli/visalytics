import { IResult, Ok, ValueObject, Fail } from 'types-ddd';
import { z } from 'zod';

export const SubmissionDateSchema = z.date();

export type SubmissionDateProps = z.infer<typeof SubmissionDateSchema>;

export class SubmissionDate extends ValueObject<SubmissionDateProps> {
  static override isValidProps(props: SubmissionDateProps): boolean {
    return SubmissionDateSchema.safeParse(props).success;
  }

  public static override create(
    props: SubmissionDateProps
  ): IResult<SubmissionDate> {
    if (!this.isValidProps(props)) {
      return Fail('Could not create SubmissionDate');
    }

    return Ok(new SubmissionDate(props));
  }
}
