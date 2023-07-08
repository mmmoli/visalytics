import { IResult, Ok, ValueObject, Fail } from 'types-ddd';
import { z } from 'zod';

export const DecisionReceivedOnSchema = z.date().max(new Date(), {
  message: `Decision cannot be received in the future.`,
});

export const DecisionSchema = z.discriminatedUnion('outcome', [
  z.object({
    outcome: z.literal('GRANTED'),
    durationInDays: z.number().min(1, {
      message: `Duration in days must be at least 1 day.`,
    }),
    receivedOn: DecisionReceivedOnSchema,
  }),
  z.object({
    outcome: z.literal('DENIED'),
    receivedOn: DecisionReceivedOnSchema,
  }),
]);

export type DecisionProps = z.infer<typeof DecisionSchema>;

export class Decision extends ValueObject<DecisionProps> {
  private constructor(props: DecisionProps) {
    super(props);
  }

  public static override create(props: DecisionProps): IResult<Decision> {
    const result = DecisionSchema.safeParse(props);
    if (!result.success) {
      return Fail(
        result.error.issues[0]?.message ?? 'Could not create Decision'
      );
    }

    return Ok(new Decision(result.data));
  }
}
