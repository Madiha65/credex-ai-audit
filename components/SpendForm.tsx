'use client';

import { useEffect, useState } from 'react';

export default function SpendForm({ onSubmit }: any  ) {
  const [form, setForm] = useState({
    tool: 'chatgpt',
    plan: 'team',
    monthlySpend: 120,
    seats: 2,
    useCase: 'coding',
  });

  useEffect(() => {
    const saved = localStorage.getItem('audit-form');
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('audit-form', JSON.stringify(form));
  }, [form]);

  return (
    <div className="space-y-4 rounded-2xl p-6 audit-card">
      <input
        className="w-full p-3 rounded-xl input-style"
        value={form.monthlySpend}
        type="number"
        onChange={(e) =>
          setForm({ ...form, monthlySpend: Number(e.target.value) })
        }
      />

      <button
        onClick={() => onSubmit(form)}
        className="primary-button text-white px-4 py-3 rounded-xl w-full font-semibold"
      >
        Generate Audit
      </button>
    </div>
  );
}