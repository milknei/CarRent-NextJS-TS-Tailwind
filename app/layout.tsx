import './globals.css';
import type { Metadata } from 'next';


import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'Car Rent',
  description: 'Discover the best cars in your area',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
