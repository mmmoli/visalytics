import { describe, it, expect } from 'vitest';
import {
  ApplicationFee,
  Decision,
  Nation,
  SubmissionDate,
} from '../../value-objects';
import { DecidedApplication } from './decided-application';
import { SubmittedApplication } from './submitted-application';

describe.concurrent('Agg: SubmittedApplication', () => {
  const fromNation = Nation.create({ code: 'AD' }).value();
  const toNation = Nation.create({ code: 'EE' }).value();
  const fee = ApplicationFee.create({ amount: 22.33, currency: 'EUR' }).value();
  const submissionDate = SubmissionDate.create(new Date()).value();

  it('Can be created', async () => {
    const applicationResult = SubmittedApplication.create({
      fromNation,
      toNation,
      fee,
      submissionDate,
    });
    expect(applicationResult.isOk()).toBeTruthy();
  });

  it.only('Can be decided', async () => {
    const applicationResult = SubmittedApplication.create({
      fromNation,
      toNation,
      fee,
      submissionDate,
    });
    expect(applicationResult.isOk()).toBeTruthy();
    const application = applicationResult.value();

    const decidedApplicationResult = application.withDecision({
      decision: Decision.create({
        outcome: 'DENIED',
        receivedOn: new Date(),
      }).value(),
    });

    expect(decidedApplicationResult.isOk()).toBeTruthy();
    const decidedApplication = decidedApplicationResult.value();
    expect(decidedApplication instanceof DecidedApplication).toBeTruthy();
  });
});
