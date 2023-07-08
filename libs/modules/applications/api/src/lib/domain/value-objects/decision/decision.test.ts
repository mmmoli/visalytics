import { describe, it, expect } from 'vitest';
import { Decision } from './decision';

describe.concurrent('VO: Decision', () => {
  it('Has GRANTED outcome', async () => {
    const decisionResult = Decision.create({
      outcome: 'GRANTED',
      durationInDays: 30,
      receivedOn: new Date(2019, 4, 4),
    });
    expect(decisionResult.isOk()).toBe(true);
  });

  it('Has DENIED outcome', async () => {
    const decisionResult = Decision.create({
      outcome: 'DENIED',
      receivedOn: new Date(2019, 4, 4),
    });
    expect(decisionResult.isOk()).toBe(true);
  });

  it('Errors if receviedOn is in the future', async () => {
    const decisionResult = Decision.create({
      outcome: 'DENIED',
      receivedOn: new Date(),
    });
    expect(decisionResult.isFail()).toBe(true);
  });

  it('Errors if durationInDays too small', async () => {
    const decisionResult = Decision.create({
      outcome: 'GRANTED',
      receivedOn: new Date(2019, 4, 4),
      durationInDays: -3,
    });
    expect(decisionResult.isFail()).toBe(true);
  });

  it('Errors if durationInDays too small', async () => {
    const decisionResult = Decision.create({
      outcome: 'GRANTED',
      receivedOn: new Date(2019, 4, 4),
      durationInDays: 0,
    });
    expect(decisionResult.isFail()).toBe(true);
  });
});
