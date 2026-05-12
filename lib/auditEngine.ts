import { pricing } from './pricing';

export type ToolInput = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  useCase: string;
};

export type AuditResult = {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  projectedSpend: number;
  savings: number;
  reason: string;
};

export function runAudit(tools: ToolInput[]): AuditResult[] {
  return tools.map((item) => {
    let recommendation = item.plan;
    let projectedSpend = item.monthlySpend;
    let reason = 'Current setup looks optimal.';

    if (item.tool === 'chatgpt') {
      if (item.seats <= 2 && item.plan === 'team') {
        recommendation = 'plus';
        projectedSpend = pricing.chatgpt.plus * item.seats;
        reason =
          'Small teams usually do not need collaboration features included in Team.';
      }
    }

    if (item.tool === 'cursor') {
      if (item.seats < 3 && item.plan === 'business') {
        recommendation = 'pro';
        projectedSpend = pricing.cursor.pro * item.seats;
        reason =
          'Business tier is typically inefficient for small engineering teams.';
      }
    }

    const savings = item.monthlySpend - projectedSpend;

    return {
      tool: item.tool,
      currentSpend: item.monthlySpend,
      recommendedAction: recommendation,
      projectedSpend,
      savings,
      reason,
    };
  });
}