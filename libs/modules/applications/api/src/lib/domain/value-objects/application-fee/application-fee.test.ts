import { describe, it, expect } from 'vitest';
import { ApplicationFee } from './application-fee';

describe.concurrent('VO: ApplicationFee', () => {
  it('Can be created', async () => {
    const feeResult = ApplicationFee.create({
      amount: 22.33,
      currency: 'EUR',
    });
    expect(feeResult.isOk()).toBe(true);
  });

  it('Errors if durationInDays too small', async () => {
    const feeResult = ApplicationFee.create({
      amount: -23,
      currency: 'EUR',
    });
    expect(feeResult.isFail()).toBe(true);
  });
});
