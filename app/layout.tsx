
// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { Roboto } from 'next/font/google';

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-roboto',
});


export const metadata = {
  title: 'Bridal Economics Explorer',
  description: 'Visualizing bride price data globally',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans bg-black text-lilac-200`}>

        <Navbar />
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
