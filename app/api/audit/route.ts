import { NextResponse } from 'next/server';
import { runAudit } from '@/lib/auditEngine';

export async function POST(req: Request) {
  const body = await req.json();

  const result = runAudit(body.tools);

  return NextResponse.json(result);
}