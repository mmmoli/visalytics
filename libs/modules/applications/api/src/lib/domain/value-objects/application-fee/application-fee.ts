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
  public static override create(
    props: ApplicationFeeProps
  ): IResult<ApplicationFee> {
    const result = ApplicationFeeSchema.safeParse(props);
    if (!result.success) {
      return Fail(
        result.error.issues[0]?.message ?? 'Could not create ApplicationFee'
      );
    }

    return Ok(new ApplicationFee(result.data));
  }
}
