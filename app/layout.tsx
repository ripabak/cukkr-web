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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://cukkr.com"),
  title: "Cukkr — Barbershop Management Platform",
  description: "The management system for modern barbershops. Digital walk-in queue, appointment booking, team management, and business insights — built around the Asia way.",
  openGraph: {
    title: "Cukkr — Barbershop Management Platform",
    description: "The management system for modern barbershops. Digital walk-in queue, appointment booking, team management, and business insights.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/cukkr-logo-trans.png",
        width: 512,
        height: 512,
        alt: "Cukkr logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cukkr — Barbershop Management Platform",
    description: "The management system for modern barbershops.",
    images: ["/cukkr-logo-trans.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png" },
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
