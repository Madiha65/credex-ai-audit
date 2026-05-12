import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your AI Spend Audit',
      html: `
        <div>
          <h1>Your audit is ready</h1>
          <p>Thanks for using AI Spend Auditor.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}