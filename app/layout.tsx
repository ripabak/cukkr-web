import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLanguage } from "@/src/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguage();
  const title = lang === "id"
    ? "Cukkr — Platform Manajemen Barbershop"
    : "Cukkr — Barbershop Management Platform";
  const description = lang === "id"
    ? "Sistem manajemen untuk barbershop modern. Antrean walk-in digital, booking appointment, manajemen tim, dan insight bisnis — dibangun sesuai budaya Asia."
    : "The management system for modern barbershops. Digital walk-in queue, appointment booking, team management, and business insights — built around the Asia way.";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://cukkr.com"),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
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
      title,
      description,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLanguage();

  return (
    <html
      lang={lang}
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
