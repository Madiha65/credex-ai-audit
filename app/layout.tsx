import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Spend Audit',
  description: 'Save money on AI tooling.',

  openGraph: {
    title: 'AI Spend Audit',
    description: 'See how much your company can save.',
    url: 'https://yourdomain.com',
    siteName: 'AI Spend Audit',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Spend Audit',
    description: 'See how much your company can save.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}