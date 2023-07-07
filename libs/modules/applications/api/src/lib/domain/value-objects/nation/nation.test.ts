import { describe, it, expect } from 'vitest';
import { Nation } from './nation';

// The two tests marked with concurrent will be run in parallel
describe.concurrent('VO: Nation', () => {
  it('Can be created', async () => {
    const nationCode = 'GBR';
    const nation = Nation.createFromCode(nationCode).value();
    expect(nation).toBeTruthy();
  });

  it('Unrecognised country code', async () => {
    const nationCode = 'JFO';
    const nationResult = Nation.createFromCode(nationCode);
    expect(nationResult.isFail()).toBeTruthy();
  });
});
