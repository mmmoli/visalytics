import { describe, it, expect } from 'vitest';
import { ApplicationFee, Nation, SubmissionDate } from '../../value-objects';
import { PendingApplication } from './pending-application';
import { SubmittedApplication } from './submitted-application';

describe.concurrent('Agg: PendingApplication', () => {
  const fromNation = Nation.create({ code: 'AD' }).value();
  const toNation = Nation.create({ code: 'EE' }).value();

  it('Can be created', async () => {
    const applicationResult = PendingApplication.create({
      fromNation,
      toNation,
      travelDate: new Date(),
    });
    expect(applicationResult.isOk()).toBeTruthy();
  });

  it('Can be submitted', async () => {
    const applicationResult = PendingApplication.create({
      fromNation,
      toNation,
      travelDate: new Date(),
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

  it('cannot create application with the same nations', async () => {
    const applicationResult = PendingApplication.create({
      fromNation,
      toNation: fromNation,
      travelDate: new Date(),
    });
    expect(applicationResult.isFail()).toBeTruthy();
  });
});
