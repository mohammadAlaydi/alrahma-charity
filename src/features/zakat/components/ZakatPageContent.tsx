"use client";

import { useState } from "react";
import Image from "next/image";
import { ZakatCard } from "./ZakatCard";
import { type Country } from "@/components/ui/country-dropdown";
import { Container } from "@/components/ui/Container";

const ZAKAT_TYPES = [
  { id: "fitr", title: "زكاة الفطر", icon: "/food.png" },
  { id: "mal", title: "زكاة المال", icon: "/money-frow.png" },
  { id: "property", title: "زكاة العقارات", icon: "/alms-svgrepo-com 3.png" },
  { id: "animals", title: "زكاة الأنعام", icon: "/goat.png" },
  { id: "gold", title: "زكاة الذهب والفضة", icon: "/alms-svgrepo-com 3.png" },
  { id: "stocks", title: "زكاة الأسهم", icon: "/money-frow.png" },
  { id: "crops", title: "زكاة الزرع", icon: "/alms-svgrepo-com 3.png" },
];

export function ZakatPageContent() {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<Record<string, Country | null>>({});

  const handlePay = (typeId: string, title: string) => {
    // TODO: Implement payment logic
    console.log("Pay Zakat:", { typeId, title, amount: amounts[typeId], country: countries[typeId] });
  };

  const handleAmountChange = (id: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (id: string, country: Country) => {
    setCountries((prev) => ({ ...prev, [id]: country }));
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Intro Section - Similar to AboutSection layout */}
      <section className="w-full pt-8 pb-24">
        <Container>
          <div className="relative flex flex-col gap-[91px] lg:flex-row-reverse lg:items-start">
            {/* Image - appears on left visually in RTL, can expand beyond container */}
            <div className="relative w-full lg:absolute lg:left-0 lg:top-0 lg:h-[432px] lg:w-[603px] lg:max-w-none">
              <div className="relative h-[432px] w-full overflow-hidden rounded-[20px]">
                <Image 
                  src="/zakah-image.jpg" 
                  alt="Zakat" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content - appears on right visually in RTL */}
            <div className="relative w-full space-y-8 lg:ml-auto lg:w-[733px] lg:shrink-0 lg:z-10">
              {/* Heading with icon */}
              <div className="space-y-2">
                <div className="flex items-center gap-[5px]">
                  <Image
                    src="/figma/hugeicons-healthcare.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <h3 className="text-right text-[16px] leading-[24px] font-normal text-[#007F5E] font-alexandria">
                    زكاتك حياة… تصل لمستحقيها
                  </h3>
                </div>
                <h2 className="text-right text-[32px] leading-[48px] font-bold text-[#122F2A] font-alexandria">
                  الزكاة هي البركة والطهارة والنماء والصلاح
                </h2>
              </div>

              {/* Paragraph */}
              <p className="text-right text-[16px] leading-[30px] font-normal text-[#0D0D0D]/70 font-alexandria">
                واصطلاحاً هو مقدار معلوم في مالٍ معلوم لطائفة معلومة. وقد حددت الشريعة السمحاء القدر المعتبر لوجوب الزكاة، فلا تجب في أقل منه، وهو يختلف باختلاف أنواع الأموال التي تجب فيها الزكاة. وحكم الزكاة أنها الركن الثالث من أركان الإسلام الخمسة، فهي واجبة على كل مسلم بلغ ماله النصاب. وقد فُرضت الزكاة لأنها أنها تُصلح أحوال المجتمع ماديًا ومعنويًا، وتطهر النفوس من الشح والبخل. ومن أنكر وجوبها خرج عن الإسلام ويستتاب.
              </p>

              {/* Calculator Promo Section */}
              <div className="space-y-4 pt-4  border-gray-100">
                <h3 className="font-alexandria text-[24px] font-semibold text-[#122F2A]">حاسبة الزكاة</h3>
                <p className="font-alexandria text-[16px] leading-[26px] text-[rgba(13,13,13,0.7)]">
                  قم باضافة أصولك النقدية وغير النقدية لحساب زكاة المال المترتب عليك دفعها
                </p>
                <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-[14px] bg-[#007F5E] px-6 py-3 text-white transition-colors hover:bg-[#00664b]">
                    <span className="font-alexandria">إضافة أصل</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-[14px] border border-[#007F5E] px-6 py-3 transition-colors hover:bg-[#007F5E]/5">
                    <span className="font-alexandria text-[#007F5E]">إدخال مبلغ الزكاة يدوياً</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cards Section */}
      <section className="w-full bg-white pb-20">
        <Container>
          {/* Cards Grid */}
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
        </Container>
      </section>

    </div>
  );
}
