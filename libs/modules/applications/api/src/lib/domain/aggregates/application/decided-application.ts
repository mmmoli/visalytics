import { Aggregate, IResult, Fail, Ok } from 'types-ddd';
import { Decision } from '../../value-objects';
import {
  SubmittedApplication,
  SubmittedApplicationProps,
} from './submitted-application';

export type ApplicationDecisionProps = {
  decision: Decision;
};

export type DecidedApplicationProps = SubmittedApplicationProps &
  ApplicationDecisionProps;

export class DecidedApplication extends Aggregate<DecidedApplicationProps> {
  static override create(
    props: DecidedApplicationProps
  ): IResult<DecidedApplication> {
    const appResult = SubmittedApplication.create(props);

    if (appResult.isFail()) {
      return Fail(appResult.error());
    }

    return Ok(new DecidedApplication(props));
  }
}
