import { Aggregate, IResult, Fail, Ok } from 'types-ddd';
import { ApplicationFee, SubmissionDate } from '../../value-objects';
import { ApplicationProps, PendingApplication } from './pending-application';
import {
  ApplicationDecisionProps,
  DecidedApplication,
} from './decided-application';

export type ApplicationSubmissionProps = {
  fee: ApplicationFee;
  submissionDate: SubmissionDate;
};

export type SubmittedApplicationProps = ApplicationProps &
  ApplicationSubmissionProps;

export class SubmittedApplication extends Aggregate<SubmittedApplicationProps> {
  static override create(
    props: SubmittedApplicationProps
  ): IResult<SubmittedApplication> {
    const appResult = PendingApplication.create(props);

    if (appResult.isFail()) {
      return Fail(appResult.error());
    }

    return Ok(new SubmittedApplication(props));
  }

  withDecision(props: ApplicationDecisionProps): IResult<DecidedApplication> {
    return DecidedApplication.create({
      ...this.props,
      ...props,
    });
  }
}
