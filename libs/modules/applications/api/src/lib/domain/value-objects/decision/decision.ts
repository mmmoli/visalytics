import { IResult, Ok, ValueObject, DateValueObject } from 'types-ddd';
import { Outcome } from '../outcome/outcome';

export interface DecisionProps {
  receivedOn: DateValueObject;
  outcome: Outcome;
}

export class Decision extends ValueObject<DecisionProps> {
  private constructor(props: DecisionProps) {
    super(props);
  }

  public static override create(props: DecisionProps): IResult<Decision> {
    return Ok(new Decision(props));
  }
}
