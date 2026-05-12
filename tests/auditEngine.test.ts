import { describe, expect, it } from 'vitest';
import { runAudit } from '../lib/auditEngine';

describe('audit engine', () => {
  it('downgrades ChatGPT Team for small teams', () => {
    const result = runAudit([
      {
        tool: 'chatgpt',
        plan: 'team',
        monthlySpend: 60,
        seats: 2,
        useCase: 'coding',
      },
    ]);

    expect(result[0].recommendedAction).toBe('plus');
  });

  it('calculates savings correctly', () => {
    const result = runAudit([
      {
        tool: 'cursor',
        plan: 'business',
        monthlySpend: 120,
        seats: 2,
        useCase: 'coding',
      },
    ]);

    expect(result[0].savings).toBeGreaterThan(0);
  });
});