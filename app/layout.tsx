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
    default: "Ifa Boru Special Boarding Secondary School Haramaya",
    template: "%s | Ifa Boru Boarding School",
  },
  description:
    "Ifa Boru Special Boarding Secondary School Haramaya — Excellence in Education, Character, and Community since 1998.",
  keywords: [
    "Ifa Boru",
    "boarding school",
    "secondary school",
    "Haramaya",
    "Ethiopia",
    "education",
    "Oromia",
  ],
  authors: [{ name: "Ifa Boru Boarding School" }],
  creator: "Ifa Boru Boarding School",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Ifa Boru Special Boarding Secondary School",
    title: "Ifa Boru Special Boarding Secondary School Haramaya",
    description:
      "Excellence in Education, Character, and Community — Haramaya, Ethiopia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifa Boru Special Boarding Secondary School Haramaya",
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
