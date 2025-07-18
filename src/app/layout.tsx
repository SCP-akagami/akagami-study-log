import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "学習記録 - 日々の学びを記録するサイト",
  description: "個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。",
  openGraph: {
    title: "学習記録 - 日々の学びを記録するサイト",
    description: "個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。",
    type: 'website',
    images: [
      {
        url: '/api/og?title=学習記録&subtitle=日々の学びを記録するサイト&type=home',
        width: 1200,
        height: 630,
        alt: '学習記録 - 日々の学びを記録するサイト',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "学習記録 - 日々の学びを記録するサイト",
    description: "個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。",
    images: ['/api/og?title=学習記録&subtitle=日々の学びを記録するサイト&type=home'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
