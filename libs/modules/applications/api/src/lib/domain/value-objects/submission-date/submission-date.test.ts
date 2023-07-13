import { describe, it, expect } from 'vitest';
import { SubmissionDate } from './submission-date';

describe.concurrent('VO: SubmissionDate', () => {
  it('Can be created', async () => {
    const submissionDateResult = SubmissionDate.create(new Date(2019, 4, 4));
    expect(submissionDateResult.isOk()).toBe(true);
  });
});
