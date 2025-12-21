import type { Metadata } from "next";
import { Cairo, Alexandria } from "next/font/google";

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
    <html lang="ar" dir="ltr">
      <body className={`${cairo.variable} ${alexandria.variable} antialiased`}>
        <Providers>
          <ConditionalSiteHeader />
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
