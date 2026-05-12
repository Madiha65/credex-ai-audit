import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const resendApiKey =
      process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        {
          error: 'Missing RESEND_API_KEY',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: body.email,
      subject: 'Your AI Spend Audit',
      html: `
        <h1>Audit Generated</h1>
        <p>Your audit is ready.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to send email',
      },
      { status: 500 }
    );
  }
}