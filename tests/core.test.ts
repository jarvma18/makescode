import { describe, it, expect } from 'vitest';
import { greetAgent } from '../src/core/index.js';

describe('core', () => {
  it('greets the agent', () => {
    expect(greetAgent('Test')).toBe('Agent Test initialized.');
  });
});
