import { ValueObject, IResult, Ok } from 'types-ddd';

export type OutcomeLabel = 'GRANTED' | 'DENIED';

export interface OutcomeProps {
  durationInMonths?: number;
  label: OutcomeLabel;
}

export class Outcome extends ValueObject<OutcomeProps> {
  private constructor(props: OutcomeProps) {
    super(props);
  }

  public static override create(
    props: Required<NonNullable<Pick<OutcomeProps, 'durationInMonths'>>>
  ): IResult<Outcome> {
    if (props.durationInMonths > 0) return Outcome.granted(props);
    return Outcome.denied();
  }

  public static granted(
    props: Required<NonNullable<Pick<OutcomeProps, 'durationInMonths'>>>
  ): IResult<Outcome> {
    return Ok(
      new Outcome({
        durationInMonths: props.durationInMonths,
        label: 'GRANTED',
      })
    );
  }

  public static denied(): IResult<Outcome> {
    return Ok(
      new Outcome({
        label: 'DENIED',
      })
    );
  }

  public isGranted(): boolean {
    return !!this.props.durationInMonths && this.props.durationInMonths > 0;
  }

  public isDenied(): boolean {
    return this.props.durationInMonths === undefined;
  }
}
