// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "sonner"; // ⬅️ ADD THIS


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wild Buds Botanics - Premium Plant Collection",
  description:
    "Discover our curated collection of premium plants, flowers, and botanical accessories for your home and garden.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AnnouncementBar />

          {/* ⬅️ TOASTER MUST BE INSIDE BODY */}
           <Toaster
            richColors
            position="top-center"
          />

          {children}
        </ReduxProvider>
        {/* 💳 Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
