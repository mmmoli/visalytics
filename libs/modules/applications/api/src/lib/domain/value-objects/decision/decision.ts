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
  static override isValidProps(props: DecisionProps): boolean {
    return DecisionSchema.safeParse(props).success;
  }

  public static override create(props: DecisionProps): IResult<Decision> {
    if (!this.isValidProps(props)) {
      return Fail('Could not create Decision');
    }

    return Ok(new Decision(props));
  }
}
