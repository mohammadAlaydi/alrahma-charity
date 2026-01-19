"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";

export function ConditionalSiteHeader() {
  const pathname = usePathname();
  // Hide header on auth pages and app pages (they use AppShell)
  const isAuthPage = pathname?.startsWith("/signup");


  const isAdminPage = pathname?.startsWith("/admin");

  if (isAuthPage || isAdminPage) {
    return null;
  }

  return <SiteHeader />;
}
