"use client";

import { useState } from "react";
import Image from "next/image";
import { ZakatCard } from "./ZakatCard";
import { type Country } from "@/components/ui/country-dropdown";
import { Container } from "@/components/ui/Container";
import { DonationFormDialog } from "@/features/projects/components/DonationFormDialog";

const ZAKAT_TYPES = [
  { id: "fitr", title: "زكاة الفطر", icon: "/figma/food-donation-svgrepo-com 1.svg" },
  { id: "mal", title: "زكاة المال", icon: "/figma/money-zakah.svg" },
  { id: "trade", title: "زكاة التجارة", icon: "/figma/business-graphic-svgrepo-com 1.svg" },
  { id: "property", title: "زكاة العقارات", icon: "/figma/shelter-svgrepo-com 1.svg" },
  { id: "crops", title: "زكاة الزرع", icon: "/figma/sprout-svgrepo-com 1.svg" },
  { id: "animals", title: "زكاة الأنعام", icon: "/figma/camel-shape-svgrepo-com 1.svg" },
  { id: "stocks", title: "زكاة الأسهم", icon: "/figma/stock-earnings-svgrepo-com 1.svg" },
  { id: "gold", title: "زكاة الذهب والفضة", icon: "/figma/gold-bar-svgrepo-com 1.svg" },
];

export function ZakatPageContent() {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<Record<string, Country | null>>({});
  const [selectedZakatType, setSelectedZakatType] = useState<{ id: string; title: string } | null>(null);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);

  const handlePay = (typeId: string, title: string) => {
    setSelectedZakatType({ id: typeId, title });
    setIsDonationDialogOpen(true);
  };

  const handleAmountChange = (id: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (id: string, country: Country) => {
    setCountries((prev) => ({ ...prev, [id]: country }));
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Hero Section - Figma: x=320, y=100, width=1280 */}
      <section className="w-full pt-[100px] pb-[91px]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-0">
          <div className="relative flex flex-col gap-6 lg:flex-row-reverse lg:items-start lg:gap-0">
            {/* Image - Left side in RTL (603px wide in Figma) - Aligned to top right */}
            <div className="relative h-[432.47px] w-full lg:w-[603px] lg:shrink-0">
              <Image 
                src="/figma/zakah-pic.png" 
                alt="Zakat" 
                fill 
                className="object-contain"
                style={{ objectPosition: 'top right' }}
              />
            </div>

            {/* Content - Right side in RTL (733px wide in Figma at x=547) - Pulled closer with negative margin */}
            <div className="relative w-full lg:w-[677px] lg:shrink-0 lg:-ml-12 flex flex-col gap-[24px]">
              {/* Text Content (866px wide container in Figma) */}
              <div className="flex flex-col gap-[8px] items-start">
                {/* Heading with icon */}
                <div className="flex items-center gap-[5px]">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/figma/hugeicons-healthcare.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-[16px] leading-[1.5] text-[#007F5E] text-nowrap">
                    زكاتك حياة… تصل لمستحقيها
                  </p>
                </div>
                <h2 className="text-right text-[30px] leading-[1.6] font-bold text-[#0D0D0D] font-alexandria w-full">
                  <span>الزكاة هي البركة </span>
                  <span className="text-[#007F5E]">والطهارة والنماء والصلاح</span>
                </h2>
                {/* Paragraph - 742.323px wide in Figma */}
                <p className="text-right text-[16px] leading-[1.6] font-normal text-[rgba(13,13,13,0.7)] font-alexandria w-full max-w-[742px]">
                  واصطلاحاً هو مقدار معلوم في مالٍ معلوم لطائفة معلومة. وقد حددت الشريعة السمحاء القدر المعتبر لوجوب الزكاة، فلا تجب في أقل منه، وهو يختلف باختلاف أنواع الأموال التي تجب فيها الزكاة. وحكم الزكاة أنها الركن الثالث من أركان الإسلام الخمسة، فهي واجبة على كل مسلم بلغ ماله النصاب. وقد فُرضت الزكاة لأنها أنها تُصلح أحوال المجتمع ماديًا ومعنويًا، وتطهر النفوس من الشح والبخل. ومن أنكر وجوبها خرج عن الإسلام ويستتاب
                </p>
              </div>

              {/* Calculator Promo Section (866px wide container) */}
              <div className="flex flex-col gap-[16px] items-start">
                <h3 className="font-alexandria text-[24px] font-bold leading-[1.6] text-[#0D0D0D]">حاسبة الزكاة</h3>
                <p className="font-alexandria text-[16px] leading-[1.6] text-[rgba(13,13,13,0.7)] w-full max-w-[742px] text-right">
                  قم باضافة أصولك النقدية وغير النقدية لحساب زكاة المال المترتب عليك دفعها
                </p>
                <div className="flex flex-wrap gap-[16px]">
                  <button className="flex h-[56px] w-[186px] items-center justify-center gap-[10px] rounded-[20px] bg-[#007F5E] px-[32px] py-[16px] text-white transition-colors hover:bg-[#00664b]">
                    <span className="font-alexandria text-[16px] font-semibold">إضافة أصل</span>
                    <Image src="/figma/mingcute_love-fill.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  </button>
                  <button className="flex h-[56px] w-[275px] items-center justify-center gap-[10px] rounded-[20px] border border-[#007F5E] bg-white px-[32px] py-[16px] transition-colors hover:bg-[#007F5E]/5">
                    <span className="font-alexandria text-[16px] font-semibold text-[#007F5E]">إدخال مبلغ الزكاة يدوياً</span>
                    <Image src="/figma/mingcute_love-fill-green.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section - Figma: x=320, y=623.47, width=1280 */}
      <section className="w-full bg-white pb-20">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-0">
          {/* Cards Stack - 30px gap between cards */}
          <div className="flex flex-col gap-[30px]">
            {ZAKAT_TYPES.map((type) => (
              <ZakatCard
                key={type.id}
                title={type.title}
                iconSrc={type.icon}
                amount={amounts[type.id] || ""}
                onAmountChange={(val) => handleAmountChange(type.id, val)}
                onCountryChange={(country) => handleCountryChange(type.id, country)}
                onPay={() => handlePay(type.id, type.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Dialog */}
      <DonationFormDialog
        open={isDonationDialogOpen}
        onClose={() => setIsDonationDialogOpen(false)}
        projectTitle={selectedZakatType?.title}
        hideHeader={true}
      />
    </div>
  );
}
