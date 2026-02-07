import type { Metadata } from 'next';
import RootLayout from './layout.client';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aqua Luxe - Premium Aquatic Fashion',
  description: 'Experience the finest aquatic-inspired luxury fashion collection with premium products and seamless shopping experience.',
  keywords: ['luxury fashion', 'aquatic', 'premium products', 'e-commerce'],
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0891b2" />
        <link rel="icon" href="/data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>" />
        <link rel="canonical" href="https://aqualuxe.com" />
        <meta property="og:title" content="Aqua Luxe - Premium Aquatic Fashion" />
        <meta property="og:description" content="Experience the finest aquatic-inspired luxury fashion collection" />
        <meta property="og:type" content="website" />
      </head>
      <body className="bg-gradient-to-b from-ocean-50 via-white to-ocean-50">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
