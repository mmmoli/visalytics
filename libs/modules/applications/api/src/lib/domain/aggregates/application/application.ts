import { Aggregate, UID, IResult, Result } from 'types-ddd';
import {
  ApplicationFee,
  Decision,
  Nation,
  SubmissionDate,
} from '../../value-objects';

export type AnyApplication =
  | PendingApplication
  | SubmittedApplication
  | DecidedApplication;

/********/

export interface ApplicationProps {
  id?: UID;
  fromNation: Nation;
  toNation: Nation;
}

export class Application extends Aggregate<ApplicationProps> {
  static override create(props: ApplicationProps): IResult<PendingApplication> {
    const application = new PendingApplication(props);
    return Result.Ok<PendingApplication>(application);
  }
}

export class PendingApplication extends Aggregate<ApplicationProps> {
  static override create(props: ApplicationProps): IResult<PendingApplication> {
    const application = new PendingApplication(props);
    return Result.Ok<PendingApplication>(application);
  }

  withSubmission(
    props: ApplicationSubmissionProps
  ): IResult<SubmittedApplication> {
    return SubmittedApplication.create({
      ...this.props,
      ...props,
    });
  }
}

/********/

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
    const application = new SubmittedApplication(props);
    return Result.Ok<SubmittedApplication>(application);
  }

  withDecision(props: ApplicationDecisionProps): IResult<DecidedApplication> {
    return DecidedApplication.create({
      ...this.props,
      ...props,
    });
  }
}

/********/

export type ApplicationDecisionProps = {
  decision: Decision;
};

export type DecidedApplicationProps = SubmittedApplicationProps &
  ApplicationDecisionProps;

export class DecidedApplication extends Aggregate<DecidedApplicationProps> {
  static override create(
    props: DecidedApplicationProps
  ): IResult<DecidedApplication> {
    const application = new DecidedApplication(props);
    return Result.Ok<DecidedApplication>(application);
  }
}
