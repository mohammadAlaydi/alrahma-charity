"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLoginModal } from "@/contexts/LoginContext";

export function AuthParamHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { openLoginModal, openSignUpModal, openForgotPasswordModal } = useLoginModal();
    const processedRef = useRef(false);

    useEffect(() => {
        const authParam = searchParams.get("auth");

        if (authParam && !processedRef.current) {
            // Prevent double firing in strict mode or re-renders
            processedRef.current = true;

            if (authParam === "login") {
                openLoginModal();
            } else if (authParam === "signup") {
                openSignUpModal();
            } else if (authParam === "forgot-password") {
                openForgotPasswordModal();
            }

            // Clean up URL
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("auth");
            const newUrl = `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ""}`;

            // Use replace to avoid adding to history stack
            router.replace(newUrl, { scroll: false });

            // Reset ref after a short delay if needed, but for "on load" logic usually once is enough per navigation
            // For page navigations that don't unmount this component, we might want to reset if params change. 
            // But dependencies include searchParams, so effect runs again. 
            // Just need to handle the specific param presence.

            // Actually, removing the param triggers a re-render/effect with authParam=null, 
            // so processedRef isn't strictly needed for "once per param existence", 
            // but executing the modal opening AND route replace together is good.
        } else if (!authParam) {
            processedRef.current = false; // Reset if param is gone so it can trigger again if re-added
        }
    }, [searchParams, openLoginModal, openSignUpModal, router, pathname]);

    return null;
}
