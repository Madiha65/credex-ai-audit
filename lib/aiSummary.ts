type AuditItem = {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  projectedSpend: number;
  savings: number;
  reason: string;
};

export async function generateSummary(
  audit: AuditItem[]
) {
  try {
    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':
            process.env.ANTHROPIC_API_KEY!,
          'anthropic-version':
            '2023-06-01',
        },

        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',

          max_tokens: 200,

          messages: [
            {
              role: 'user',

              content: `Generate a short AI spend optimization summary for this audit:

${JSON.stringify(audit)}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return data.content[0].text;
  } catch (error) {
    console.error(error);

    return 'Your team has opportunities to optimize AI tooling costs while maintaining productivity.';
  }
}