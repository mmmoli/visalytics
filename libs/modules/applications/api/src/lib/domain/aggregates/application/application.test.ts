import { describe, it, expect } from 'vitest';
import { Application } from './application';
import { CurrencyValueObject, DateValueObject } from 'types-ddd';
import { Nation } from '../../value-objects';

describe.concurrent('Agg: Application', () => {
  it('Can be created', async () => {
    const when = new Date();
    const submittedOn = DateValueObject.create(when).value();
    const feePaid = CurrencyValueObject.create({
      value: 28.56,
      currency: 'USD',
    }).value();
    const fromNation = Nation.createFromCode('GBR').value();
    const toNation = Nation.createFromCode('ITA').value();

    const applicationResult = Application.create({
      feePaid,
      fromNation,
      submittedOn,
      toNation,
    });
    expect(applicationResult.isOk()).toBeTruthy();
  });
});
