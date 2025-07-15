import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wild Buds Botanics - Premium Plant Collection',
  description: 'Discover our curated collection of premium plants, flowers, and botanical accessories for your home and garden.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnnouncementBar />
        {children}
      </body>
    </html>
  );
}