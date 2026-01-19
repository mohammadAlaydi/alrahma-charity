"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function DashboardPageHeader() {
    return (
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
                    className="object-contain"
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
                            className="object-contain"
                        />
                    </div>
                    <div className="absolute right-[-0.5px] top-[120.53px] h-[222.52px] w-[222.52px]">
                        <Image
                            src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            <Container>
                <div className="relative z-10 text-center">
                    <p className="text-[#B4BB5F] mb-2 font-medium text-lg">تعديل إعدادات ومعلومات الحساب</p>
                    <h1 className="text-4xl md:text-[40px] md:leading-[70px] font-extrabold md:font-semibold text-black tracking-tight">المعلومات الشخصية</h1>
                </div>
            </Container>
        </div>
    );
}
