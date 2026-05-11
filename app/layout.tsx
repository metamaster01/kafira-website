import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Kafira – Handcrafted Travel Experiences',
  description: 'Kafira curates unforgettable journeys across India and beyond. Explore handcrafted tour packages, luxury getaways, adventure trips and more.',
  keywords: 'travel packages India, tour operator, Rajasthan tours, Kerala backwaters, Himalayas, honeymoon packages, adventure travel India',
  openGraph: {
    title: 'Kafira – Where Your Story Begins',
    description: 'Handcrafted journeys across India and beyond. Every trip, a memory worth keeping.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
