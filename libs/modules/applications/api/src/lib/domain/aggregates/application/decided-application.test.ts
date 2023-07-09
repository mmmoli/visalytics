import { describe, it, expect } from 'vitest';
import { ApplicationFee, Nation, SubmissionDate } from '../../value-objects';
import { PendingApplication } from './pending-application';

describe.concurrent('Agg: PendingApplication', () => {
  const fromNation = Nation.create({ code: 'AD' }).value();
  const toNation = Nation.create({ code: 'EE' }).value();

  it('Can be created', async () => {
    const applicationResult = PendingApplication.create({
      fromNation,
      toNation,
    });
    expect(applicationResult.isOk()).toBeTruthy();
  });

  it.only('Can be submitted', async () => {
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

    // const submittedApplication = submittedApplicationResult.value();
    // expect(submittedApplication instanceof SubmittedApplication).toBeTruthy();
  });

  // it('Can have an decision', async () => {
  //   const decision = Decision.create({
  //     outcome: 'GRANTED',
  //     durationInDays: 30,
  //     receivedOn: new Date(2029, 4, 4),
  //   }).value();

  //   const applicationResult = SubmittedApplication.create({
  //     fee: ApplicationFee.create({ amount: 22.33, currency: 'EUR' }).value(),
  //     submissionDate: SubmissionDate.create(new Date(19, 4, 4)).value(),
  //     fromNation,
  //     toNation,
  //   });
  //   expect(applicationResult.isOk()).toBeTruthy();
  //   const application = applicationResult.value();

  //   const decidedApplicationResult = application.withDecision({
  //     decision,
  //   });

  //   expect(decidedApplicationResult.isOk()).toBeTruthy();
  //   const decidedApplication = decidedApplicationResult.value();
  //   expect(decidedApplication instanceof DecidedApplication).toBeTruthy();
  // });

  // it('cannot create application with the same nations', async () => {
  //   expect(true).toBe(false);
  // });
});
