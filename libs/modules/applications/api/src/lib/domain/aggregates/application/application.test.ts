import { describe, it, expect } from 'vitest';
import {
  DecidedApplication,
  Application,
  SubmittedApplication,
  PendingApplication,
} from './application';

import {
  ApplicationFee,
  Decision,
  Nation,
  SubmissionDate,
} from '../../value-objects';

describe.concurrent('Agg: Application', () => {
  const fromNation = Nation.createFromCode('GBR').value();
  const toNation = Nation.createFromCode('ITA').value();

  it('Can be created', async () => {
    const applicationResult = Application.create({
      fromNation,
      toNation,
    });
    expect(applicationResult.isOk()).toBeTruthy();
  });

  it('Can be submitted', async () => {
    const applicationResult = PendingApplication.create({
      fromNation,
      toNation,
    });
    expect(applicationResult.isOk()).toBeTruthy();
    const application = applicationResult.value();

    const submittedApplicationResult = application.withSubmission({
      fee: ApplicationFee.create({ amount: 22.33, currency: 'EUR' }).value(),
      submissionDate: SubmissionDate.create(new Date(19, 4, 4)).value(),
    });

    expect(submittedApplicationResult.isOk()).toBeTruthy();
    const submittedApplication = submittedApplicationResult.value();
    expect(submittedApplication instanceof SubmittedApplication).toBeTruthy();
  });

  it('Can have an decision', async () => {
    const decision = Decision.create({
      outcome: 'GRANTED',
      durationInDays: 30,
      receivedOn: new Date(2029, 4, 4),
    }).value();

    const applicationResult = SubmittedApplication.create({
      fee: ApplicationFee.create({ amount: 22.33, currency: 'EUR' }).value(),
      submissionDate: SubmissionDate.create(new Date(19, 4, 4)).value(),
      fromNation,
      toNation,
    });
    expect(applicationResult.isOk()).toBeTruthy();
    const application = applicationResult.value();

    const decidedApplicationResult = application.withDecision({
      decision,
    });

    expect(decidedApplicationResult.isOk()).toBeTruthy();
    const decidedApplication = decidedApplicationResult.value();
    expect(decidedApplication instanceof DecidedApplication).toBeTruthy();
  });
});
