"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function ConditionalFooter() {
  const pathname = usePathname();
  // Hide footer on auth pages (they use AuthCard full-screen layout)
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  if (isAuthPage) {
    return null;
  }

  return <SiteFooter />;
}
