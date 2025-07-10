// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });


export const metadata = {
  title: 'Bridal Economics Explorer',
  description: 'Visualizing bride price data globally',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebas.className} bg-black text-white`}>

        <Navbar />
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
