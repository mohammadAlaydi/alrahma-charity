"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function ConditionalFooter() {
  const pathname = usePathname();
  // Hide footer on auth pages (they use AuthCard full-screen layout)
  const isAuthPage = pathname?.startsWith("/signup");

  const isAdminPage = pathname?.startsWith("/admin");

  if (isAuthPage || isAdminPage) {
    return null;
  }

  return <SiteFooter />;
}
