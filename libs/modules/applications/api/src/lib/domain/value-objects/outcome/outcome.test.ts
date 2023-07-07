import { describe, it, expect } from 'vitest';
import { Outcome } from './outcome';

describe.concurrent('VO: Outcome', () => {
  it('Can be created', async () => {
    const outcomeResult = Outcome.create({
      durationInMonths: 12,
    });
    expect(outcomeResult.isOk()).toBeTruthy();

    const outcome = outcomeResult.value();
    expect(outcome.get('label')).toBe('GRANTED');
  });

  it('can be granted', async () => {
    const outcome = Outcome.granted({
      durationInMonths: 12,
    }).value();
    expect(outcome.isGranted()).toBe(true);
    expect(outcome.isDenied()).toBe(false);
  });

  it('can be denied', async () => {
    const outcome = Outcome.denied().value();
    expect(outcome.isGranted()).toBe(false);
    expect(outcome.isDenied()).toBe(true);
  });
});
