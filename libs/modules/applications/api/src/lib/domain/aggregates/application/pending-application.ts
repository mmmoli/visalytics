import { Aggregate, IResult, Fail, UID, Ok } from 'types-ddd';
import { Nation } from '../../value-objects';
import {
  ApplicationSubmissionProps,
  SubmittedApplication,
} from './submitted-application';

export interface ApplicationProps {
  id?: UID;
  fromNation: Nation;
  toNation: Nation;
}

export class PendingApplication extends Aggregate<ApplicationProps> {
  static override create(props: ApplicationProps): IResult<PendingApplication> {
    if (props.fromNation.isEqual(props.toNation)) {
      return Fail(`The nations cannot be the same`);
    }

    return Ok(new PendingApplication(props));
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
