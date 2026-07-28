import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Haramaya Ifa Boru Special Boarding Secondary School",
    template: "%s | Haramaya Ifa Boru Boarding School",
  },
  description:
    "Haramaya Ifa Boru Special Boarding Secondary School — Excellence in Education, Character, and Community since 2014 EC.",
  keywords: [
    "Haramaya Ifa Boru",
    "Ifa Boru",
    "boarding school",
    "secondary school",
    "Haramaya",
    "Ethiopia",
    "education",
    "Oromia",
  ],
  authors: [{ name: "Haramaya Ifa Boru Boarding School" }],
  creator: "Haramaya Ifa Boru Boarding School",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Haramaya Ifa Boru Special Boarding Secondary School",
    title: "Haramaya Ifa Boru Special Boarding Secondary School",
    description:
      "Excellence in Education, Character, and Community — Haramaya, Ethiopia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haramaya Ifa Boru Special Boarding Secondary School",
    description: "Excellence in Education, Character, and Community",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
