import { IResult, Ok, ValueObject, Fail } from 'types-ddd';
import { z } from 'zod';

export const ApplicationFeeSchema = z.object({
  amount: z.number().positive({
    message: `Fee amount must be more than 0`,
  }),
  currency: z.enum([`GBP`, `USD`, `EUR`, `JPY`]),
});

export type ApplicationFeeProps = z.infer<typeof ApplicationFeeSchema>;

export class ApplicationFee extends ValueObject<ApplicationFeeProps> {
  static override isValidProps(props: ApplicationFeeProps): boolean {
    return ApplicationFeeSchema.safeParse(props).success;
  }

  public static override create(
    props: ApplicationFeeProps
  ): IResult<ApplicationFee> {
    if (!this.isValidProps(props))
      return Fail('Could not create ApplicationFee');
    return Ok(new ApplicationFee(props));
  }
}
