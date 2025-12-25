import type { Metadata } from "next";
import { Cairo, Alexandria, Molle, Playpen_Sans } from "next/font/google";

import "../../styles/globals.css";
import { Providers } from "./providers";
import { ConditionalSiteHeader } from "@/components/layout/ConditionalSiteHeader";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Prevents flash of unstyled text
});

const molle = Molle({
  variable: "--font-molle",
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  variable: "--font-playpen-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Alrahma",
  description: "Alrahma web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${alexandria.variable} ${molle.variable} ${playpenSans.variable} font-alexandria antialiased`}
      >
        <Providers>
          <ConditionalSiteHeader />
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
