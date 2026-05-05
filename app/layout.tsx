// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AIChat from '@/app/components/AIChat';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'BridalEcon — Bride Price Economics Explorer',
  description: 'A data-driven exploration of bride price practices around the world.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[hsl(var(--surface))] text-[hsl(var(--text-primary))] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main id="main-content" className="min-h-[calc(100dvh-4rem)]">
            {children}
          </main>
          <AIChat />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
