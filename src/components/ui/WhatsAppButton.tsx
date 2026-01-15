"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

interface WhatsAppButtonProps {
    className?: string;
    phone?: string;
    top?: string | number;
    variant?: "layout" | "header";
}

export function WhatsAppButton({
    className,
    phone = "905357829980",
    top = "975px",
    variant = "layout"
}: WhatsAppButtonProps) {
    if (variant === "header") {
        return (
            <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex items-center justify-center transition-all hover:scale-110",
                    "lg:hidden", // Hide on large screens as the layout variant takes over
                    className
                )}
                aria-label="تواصل معنا على واتساب"
            >
                <Image
                    src="/figma/whatsapp.svg"
                    alt="واتساب"
                    width={48}
                    height={48}
                    className="h-7 w-7 md:h-10 md:w-10 drop-shadow-md"
                />
            </a>
        );
    }

    return (
        <div
            className={cn(
                "absolute inset-x-0 z-50 hidden lg:flex justify-center pointer-events-none",
                className
            )}
            style={{ top: typeof top === 'number' ? `${top}px` : top }}
        >
            <div className="relative w-full max-w-7xl h-0 px-4">
                <a
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 xl:right-[-70px] 2xl:right-[-400px] pointer-events-auto transition-all hover:scale-110"
                    aria-label="تواصل معنا على واتساب"
                >
                    <Image
                        src="/figma/whatsapp.svg"
                        alt="واتساب"
                        width={64}
                        height={64}
                        className="h-14 w-14 md:h-16 md:w-16 drop-shadow-xl"
                    />
                </a>
            </div>
        </div>
    );
}
