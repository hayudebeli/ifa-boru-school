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
    "Ifa Boru School",
    "Haramaya Ifa Boru Special Boarding Secondary School",
    "boarding school",
    "secondary school",
    "Haramaya",
    "Ethiopia",
    "education",
    "Oromia",
  ],

  authors: [
    {
      name: "Haramaya Ifa Boru Special Boarding Secondary School",
    },
  ],

  creator: "Haramaya Ifa Boru Special Boarding Secondary School",

  metadataBase: new URL("https://haramayaifaboruschool.xyz"),

  alternates: {
    canonical: "https://haramayaifaboruschool.xyz",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haramayaifaboruschool.xyz",
    siteName: "Haramaya Ifa Boru Special Boarding Secondary School",
    title: "Haramaya Ifa Boru Special Boarding Secondary School",
    description:
      "Excellence in Education, Character, and Community — Haramaya, Ethiopia",
  },

  twitter: {
    card: "summary_large_image",
    title: "Haramaya Ifa Boru Special Boarding Secondary School",
    description:
      "Excellence in Education, Character, and Community — Haramaya, Ethiopia",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
