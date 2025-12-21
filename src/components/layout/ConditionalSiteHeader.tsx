"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";

export function ConditionalSiteHeader() {
  const pathname = usePathname();
  // Hide header on auth pages and app pages (they use AppShell)
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");
  const isAppPage =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/profile") ||
    pathname?.startsWith("/settings");

  if (isAuthPage || isAppPage) {
    return null;
  }

  return <SiteHeader />;
}
