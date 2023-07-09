import { describe, it, expect } from 'vitest';
import { Nation } from '../../value-objects';
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
});
