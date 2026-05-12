'use client';

import { useState } from 'react';

import SpendForm from '@/components/SpendForm';

type FormDataType = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  useCase: string;
};

type AuditResult = {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  projectedSpend: number;
  savings: number;
  reason: string;
};

export default function Home() {
  const [result, setResult] =
    useState<AuditResult[]>([]);

  async function handleAudit(
    form: FormDataType
  ) {
    const res = await fetch('/api/audit', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        tools: [form],
      }),
    });

    const data: AuditResult[] =
      await res.json();

    setResult(data);
  }

  return (
    <main className="max-w-5xl mx-auto p-10 min-h-screen">
      <h1 className="text-5xl font-bold mb-6">
        AI Spend Auditor
      </h1>

      <p className="text-gray-500 mb-10">
        Find wasted AI subscription spend
        in under 60 seconds.
      </p>

      <SpendForm onSubmit={handleAudit} />

      <div className="mt-10 space-y-4">
        {result.map((item) => (
          <div
            key={item.tool}
            className="audit-card rounded-2xl p-5 shadow-xl"
          >
            <h2 className="text-2xl font-semibold capitalize">
              {item.tool}
            </h2>

            <p>
              Current Spend: $
              {item.currentSpend}
            </p>

            <p>
              Recommendation:{' '}
              {item.recommendedAction}
            </p>

            <p>
              Monthly Savings: $
              {item.savings}
            </p>

            <p>{item.reason}</p>
          </div>
        ))}
      </div>
    </main>
  );
}