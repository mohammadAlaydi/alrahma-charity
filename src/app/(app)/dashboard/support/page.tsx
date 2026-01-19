"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    return (
        <div className="h-full min-h-[600px] w-full flex items-center justify-center relative bg-[#F9FAFB] overflow-hidden rounded-3xl">
            {/* Background Image - User Request */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'url("/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
                {/* Logo/Icon if needed */}
                <div className="mb-4">
                    {/* The image shows a large watermark logo behind the text, handled by bg pattern? Or a central icon.
                         Actually, the image shows a large logo: "Rahma" with symbol.
                         Let's assume the background handles it or we add a central logo.
                      */}
                </div>

                <h1 className="text-3xl font-bold text-zinc-900">هل تحتاج إلى مساعدة؟</h1>

                <p className="text-zinc-500 text-lg">
                    تواصل معنا عن طريق
                </p>

                <Link
                    href="https://wa.me/905357829980"
                    target="_blank"
                    className="flex items-center gap-2 text-emerald-600 font-bold text-xl hover:text-emerald-700 transition-colors bg-white/50 px-6 py-3 rounded-full backdrop-blur-sm border border-emerald-100/50 shadow-sm"
                >
                    <span dir="ltr">00905357829980</span>
                    <div className="bg-emerald-600 text-white p-1 rounded-full">
                        {/* WhatsApp Icon usually simple phone or message */}
                        <MessageCircle className="h-5 w-5 fill-current" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
