"use client";

import { usePathname } from "next/navigation";
import { PageDecorations } from "@/components/ui/PageDecorations";

export function ConditionalPageDecorations() {
    const pathname = usePathname();

    // Hide decorations on auth pages and dashboard pages
    const isAuthPage = pathname?.startsWith("/signup");
    const isAppPage =
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/profile") ||
        pathname?.startsWith("/settings");

    if (isAuthPage || isAppPage) {
        return null;
    }

    // Check if we are on the Home page - we might want different positioning or no banners
    const isHome = pathname === "/";

    return <PageDecorations top={isHome ? 600 : 850} />;
}
