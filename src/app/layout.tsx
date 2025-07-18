import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "赤神の学習メモ",
  description: "Next.js、React、TypeScriptを使った学習記録サイト",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  openGraph: {
    title: "赤神の学習メモ",
    description: "Next.js、React、TypeScriptを使った学習記録サイト",
    type: "website",
    locale: "ja_JP",
    siteName: "赤神の学習メモ",
  },
  twitter: {
    card: "summary_large_image",
    title: "赤神の学習メモ",
    description: "Next.js、React、TypeScriptを使った学習記録サイト",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
