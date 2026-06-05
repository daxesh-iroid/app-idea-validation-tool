import './globals.css';

export const metadata = {
  title: {
    default: 'Free App Idea Validation Tool | iRoid Solutions',
    template: '%s | iRoid Solutions',
  },
  description:
    'Validate your app idea before spending money on development. Check clarity, market risk, MVP feasibility, monetization fit, and development complexity.',
  keywords: [
    'app idea validation',
    'startup idea checker',
    'MVP feasibility',
    'app development cost',
    'startup validation tool',
  ],
  authors: [{ name: 'iRoid Solutions' }],
  creator: 'iRoid Solutions',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'iRoid Solutions',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free App Idea Validation Tool',
    description: 'Check if your app idea is ready for MVP development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
