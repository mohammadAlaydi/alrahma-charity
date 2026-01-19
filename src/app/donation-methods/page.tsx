"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Home, Plus, BadgeHelp, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type AccordionItem = {
    title: string;
    content?: React.ReactNode;
    icon?: React.ReactNode;
};

export default function DonationMethodsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open second item (Checks) as per screenshot

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accordionItems: AccordionItem[] = [
        {
            title: "للتبرع عبر حسابنا البنكي في أمريكا",
            content: (
                <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB] text-[#122F2A]/80">
                    <p>تفاصيل الحساب البنكي في أمريكا ستظهر هنا.</p>
                </div>
            )
        },
        {
            title: "للتبرع من أمريكا عبر الشيكات المصرفية",
            content: (
                <div className="p-6 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB] text-[#122F2A] text-right">
                    <p className="font-medium mb-3">يرجى إرسال الشيكات المصرفية التي تريد التبرع بها إلى العنوان البريدي التالي، مع إرفاق بريدك الإلكتروني أو العنوان الخاص بك بالكامل ليتم إرسال رسالة شكر لك ووصل التبرع إليك:</p>
                    <p dir="ltr" className="font-semibold text-lg text-right">12207 Cypress pt Alpharetta GA 30005</p>
                </div>
            )
        },
        {
            title: "للدفع بواسطة زيل Zelle",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل Zelle</div>
        },
        {
            title: "للدفع عبر سويش أو الحساب البنكي من السويد",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل السويد</div>
        },
        {
            title: "للتبرع من كندا",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل كندا</div>
        },
        {
            title: "للتبرع عبر الحساب البنكي من ألمانيا",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل ألمانيا</div>
        },
        {
            title: "للتبرع عبر الحساب البنكي من فلسطين (الداخل)",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل فلسطين</div>
        },
        {
            title: "للدفع عبر خدمة Apple",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">Apple Pay</div>
        },
        {
            title: "للدفع عبر خدمة Google؟",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">Google Pay</div>
        },
        {
            title: "للتبرع من تركيا",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل تركيا</div>
        },
        {
            title: "كيف يمكننا التبرع من داخل سوريا ؟",
            content: <div className="p-4 bg-[#F8F6F1] rounded-b-xl border-x border-b border-[#EBEBEB]">تفاصيل سوريا</div>
        },
    ];

    return (
        <main className="w-full py-8 min-h-screen bg-white font-cairo" dir="rtl">
            {/* Header Section - Dashboard Style */}
            <div className="relative py-8 md:py-12 text-center md:text-right mb-8 overflow-hidden md:overflow-visible">
                {/* Decoration Left */}
                <div
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 mt-10 z-0 pointer-events-none"
                    style={{ width: '346.12px', height: '346.12px' }}
                >
                    <Image
                        src="/images/Group 1000009427.png"
                        alt=""
                        fill
                        className="object-contain opacity-50 md:opacity-100"
                    />
                </div>

                {/* Decoration Right */}
                <div
                    className="absolute right-[-80px] top-[60%] -translate-y-1/2 mt-10 z-0 pointer-events-none"
                    style={{ width: '350.69px', height: '360.33px' }}
                >
                    <div className="relative h-full w-full">
                        <div className="absolute right-[60px] top-0 h-[222.52px] w-[222.52px]">
                            <Image
                                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 17.png"
                                alt=""
                                fill
                                className="object-contain opacity-50 md:opacity-100"
                            />
                        </div>
                        <div className="absolute right-[-0.5px] top-[120.53px] h-[222.52px] w-[222.52px]">
                            <Image
                                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
                                alt=""
                                fill
                                className="object-contain opacity-50 md:opacity-100"
                            />
                        </div>
                    </div>
                </div>

                <Container>
                    <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-[#B4BB5F] font-medium mb-3">
                            <Image src="/images/game-icons_space-needle.svg" alt="" width={20} height={20} className="opacity-80" />
                            <span>تبرعك اليوم يصنع أثراً لا ينسى</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">طرق الدفع والتبرع</h1>
                        <div className="flex items-center justify-center gap-2 text-sm text-[#122F2A]/60 font-medium">
                            <Link href="/" className="hover:text-[#122F2A] transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                الرئيسية
                            </Link>
                            <span>&lt;</span>
                            <span className="text-[#B4BB5F]">طرق الدفع والتبرع</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Content Section */}
            <Container className="max-w-7xl">
                <div className="flex items-center gap-3 mb-8">
                    <Image
                        src="/images/game-icons_space-needle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="text-[#007F5E]"
                    />
                    <h2 className="text-xl md:text-2xl font-bold text-[#122F2A]">جميع الطرق المتاحة لاجراء عملية الدفع والتبرع</h2>
                </div>

                <div className="space-y-4">
                    {accordionItems.map((item, index) => (
                        <div key={index} className="overflow-hidden">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 md:p-5 text-right font-bold transition-all duration-200",
                                    openIndex === index
                                        ? "bg-[#F8F6F1] rounded-t-xl text-[#122F2A]"
                                        : "bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-xl text-[#122F2A]"
                                )}
                            >
                                <span className="text-base md:text-lg">{item.title}</span>
                                <div className={cn(
                                    "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200",
                                    openIndex === index ? "border-[#122F2A] bg-transparent" : "border-[#122F2A]/30"
                                )}>
                                    <Plus className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        openIndex === index ? "rotate-45" : "rotate-0"
                                    )} />
                                </div>
                            </button>

                            <div className={cn(
                                "grid transition-[grid-template-rows] duration-200 ease-out",
                                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            )}>
                                <div className="overflow-hidden">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ / Support Section */}
                <div className="mt-16 bg-white border border-[#EBEBEB] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#E6F2EF] rounded-full text-[#007F5Ehidden] md:block hidden">
                            <BadgeHelp className="w-8 h-8 text-[#007F5E]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BadgeHelp className="w-6 h-6 text-[#007F5E] md:hidden" />
                                <h3 className="text-xl font-bold text-[#122F2A]">هل لديك أسئلة أخرى؟</h3>
                            </div>
                            <p className="text-[#122F2A]/60">إن كنت لا تجد الإجابة التي تبحث عنها؟ تواصل مع فريقنا الجديد</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#EBEBEB] rounded-full text-[#122F2A] font-medium hover:bg-gray-50 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span>تواصل معنا عبر الدردشة</span>
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#007F5E] text-white rounded-full font-medium hover:bg-[#00664b] transition-colors shadow-lg shadow-[#007F5E]/20">
                            <span>تواصل مع الدعم</span>
                        </button>
                    </div>
                </div>
            </Container>
        </main>
    );
}
