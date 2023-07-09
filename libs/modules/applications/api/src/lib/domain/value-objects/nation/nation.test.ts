import { describe, it, expect } from 'vitest';
import { Nation } from './nation';

// The two tests marked with concurrent will be run in parallel
describe.concurrent('VO: Nation', () => {
  it('Can be created', async () => {
    const nationResult = Nation.create({
      code: 'GB',
    });
    expect(nationResult.isOk()).toBeTruthy();
  });

  it('has a name', async () => {
    const name = Nation.create({
      code: 'IN',
    }).value().name;
    expect(name).toBe('India');
  });

  it('has a different name', async () => {
    const name = Nation.create({
      code: 'IT',
    }).value().name;
    expect(name).toBe('Italy');
  });

  it('has an emoji', async () => {
    const emoji = Nation.create({
      code: 'FR',
    }).value().emoji;
    expect(emoji).toBe('🇫🇷');
  });

  it('has a different emoji', async () => {
    const emoji = Nation.create({
      code: 'US',
    }).value().emoji;
    expect(emoji).toBe('🇺🇸');
  });
});
