"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";
import { CountryDropdown, type Country } from "@/components/ui/country-dropdown";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type DonationType = {
  id: string;
  title: string;
  iconSrc: string;
  isHighlighted?: boolean;
};

const DONATION_TYPES: DonationType[] = [
  { id: "water", title: "سقيا الماء", iconSrc: "/globe.svg", isHighlighted: true },
  { id: "purification", title: "تطهير مال وأسهم", iconSrc: "/all-campanes.svg" },
  { id: "nadhr", title: "النذر", iconSrc: "/heart.svg" },
  { id: "aqiqah", title: "عقائق", iconSrc: "/orphan.svg" },
  { id: "relieve", title: "تفريج كربة", iconSrc: "/heart.svg" },
  { id: "pay-harm", title: "دفع بلاء", iconSrc: "/medical.svg" },
  { id: "clothe", title: "كسوة مسكين", iconSrc: "/human 1.svg" },
  { id: "sadaqah-jariyah", title: "صدقة جارية", iconSrc: "/heart.svg" },
  { id: "expiation", title: "كفارة يمين", iconSrc: "/heart.svg" },
  { id: "feed", title: "إطعام مسكين", iconSrc: "/education.svg" },
  { id: "debtors", title: "الغارمين", iconSrc: "/file.svg" },
];

export function SadaqahPageContent() {
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "credit">("credit");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  return (
    <main dir="rtl" className="relative bg-white">
      {/* Background image with opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]">
          {/* Placeholder for background image - replace with actual image */}
          <div className="w-full h-full bg-gray-200" />
        </div>
      </div>

      <div className="relative px-[320px] py-[100px]">
        {/* Intro section */}
        <section className="mb-[79px]">
          <div className="mx-auto flex w-full max-w-[971px] flex-col items-center gap-[8px] text-center">
            <div className="flex items-center justify-center gap-[5px]">
              <p className="text-[16px] leading-normal text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                صدقة اليوم… أمان لغدهم
              </p>
              <span aria-hidden="true" className="relative h-6 w-6 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
            </div>

            <p className="font-alexandria text-[30px] font-bold leading-[1.6] text-[#0D0D0D] text-nowrap">
              <span>{`الصدقات… `}</span>
              <span className="text-[#007F5E]">أجر</span> <span className="text-[#007F5E]">يمتد ولا ينقطع</span>
            </p>

            <p className="w-full text-center text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] font-alexandria">
              الصدقات هي كل عمل خير ينتفع به صاحبه في حياته ويمتدُ نفعهُ إلى ما بعد الموت. وقد دلت
              الكثير من نصوص القرآن الكريم والسنة النبوية على مشروعيتها والحث على القيام بها. وتدرج
              مؤسسة الخير العديد من المشاريع الخيرية ضمن مشاريع الصدقة الجارية تسهيلاً على المحسنين
              الكرام لزيادة الأجر وحتى ينتفع بها ذوو الحاجة، مثل مشاريع حفر الآبار وبناء المدارس
              والمساجد وتعليم الأطفال وطلبة العلم والمشاريع المدرة للدخل للأسر المتعففة
            </p>
          </div>
        </section>

        {/* Main content: Two-column layout */}
        <section className="grid grid-cols-[715px_555px] gap-[10px] items-start justify-end w-full max-w-[1280px] mx-auto">
          {/* Left: Grid of donation type cards - 2 columns */}
          <div className="grid grid-cols-2 gap-4 items-start justify-end">
            {DONATION_TYPES.map((type) => (
              <div
                key={type.id}
                className={[
                  "group bg-white flex items-center justify-end px-8 py-4 rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] w-[348px] transition-all duration-300 cursor-pointer",
                  type.isHighlighted && "shadow-[0px_19px_29px_0px_rgba(0,127,94,0.14)]",
                  "hover:shadow-[0px_8px_24px_0px_rgba(0,127,94,0.15)] hover:scale-[1.02] hover:-translate-y-1",
                ].join(" ")}
              >
                <div className="flex gap-4 items-center justify-end">
                  <div className="flex flex-col items-start">
                    <p className="font-alexandria text-[20px] font-bold leading-[1.5] text-[#122F2A] text-nowrap text-right">
                      {type.title}
                    </p>
                  </div>
                  <div className="bg-[rgba(223,211,131,0.2)] flex flex-col items-center justify-center overflow-hidden px-0 py-[9px] rounded-[53px] w-20 h-20 transition-all duration-300 group-hover:bg-[rgba(223,211,131,0.3)]">
                    <div className="relative w-10 h-10">
                      <Image
                        src={type.iconSrc}
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Donation form card */}
          <div className="flex items-start justify-end rounded-[20px] w-[555px]">
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-8 py-4 w-full">
              <div className="flex flex-col gap-6 items-center px-4 py-0">
                {/* Title */}
                <p className="font-alexandria text-[24px] font-bold leading-[1.5] text-[#007F5E] text-center text-nowrap">
                  سقيا الماء
                </p>

                {/* Amount selection */}
                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      حدد المبلغ
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full" dir="rtl">
                    {[...PRESET_AMOUNTS].reverse().map((amount) => {
                      const isActive = selectedAmount === amount && !customAmount;
                      return (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={[
                            "flex items-center justify-center rounded-[20px] transition-all",
                            isActive
                              ? "h-[57px] w-[106px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                              : "h-[60px] w-[110px] border border-[rgba(13,13,13,0.2)] px-4 hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                          ].join(" ")}
                        >
                          <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                            $ {amount}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom amount */}
                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      مبلغ مخصص
                    </p>
                  </div>
                  <AmountInput
                    placeholder="أدخل القيمة"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setSelectedAmount(0);
                    }}
                    className="h-[60px] w-full"
                  />
                </div>

                {/* Payment method */}
                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      أخنر طريقة الدفع
                    </p>
                  </div>
                  <div className="flex gap-4 h-[60px] items-center justify-start rounded-[20px] w-full" dir="rtl">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit")}
                      className={[
                        "flex gap-[10px] h-full items-center justify-center px-4 transition-all",
                        paymentMethod === "credit"
                          ? "text-[#007F5E]"
                          : "text-[rgba(13,13,13,0.7)] opacity-[0.67]",
                      ].join(" ")}
                    >
                      <p className="font-alexandria text-[16px] font-medium leading-normal text-nowrap">
                        بطاقة إئتمان
                      </p>
                      <div className="h-[17px] w-[17px] shrink-0 relative flex items-center justify-center">
                        {/* Circle SVG with filled green circle when selected */}
                        <Image
                          src="/circle-option.svg"
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px]"
                        />
                        {paymentMethod === "credit" && (
                          <div className="absolute h-[9px] w-[9px] rounded-full bg-[#007F5E]" />
                        )}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={[
                        "flex gap-[10px] h-full items-center justify-center px-4 transition-all",
                        paymentMethod === "paypal"
                          ? "text-[#007F5E]"
                          : "text-[rgba(13,13,13,0.7)] opacity-[0.67]",
                      ].join(" ")}
                    >
                      <p className="font-alexandria text-[16px] font-medium leading-normal text-nowrap">
                        PayPal
                      </p>
                      <div className="h-[17px] w-[17px] shrink-0 relative flex items-center justify-center">
                        {/* Circle SVG with filled green circle when selected */}
                        <Image
                          src="/circle-option.svg"
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px]"
                        />
                        {paymentMethod === "paypal" && (
                          <div className="absolute h-[9px] w-[9px] rounded-full bg-[#007F5E]" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Country selector */}
                <div className="flex gap-4 h-[81px] items-center justify-start w-full" dir="rtl">
                  <p className="font-alexandria text-[18px] font-medium leading-normal text-[#122F2A] text-center text-nowrap">
                    الدولة
                  </p>
                  <div className="flex-1">
                    <CountryDropdown
                      onChange={handleCountryChange}
                      defaultValue={selectedCountry?.name || "Palestine"}
                      placeholder="اختر الدولة"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Donate button */}
                <button
                  type="button"
                  className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full"
                >
                 
                  <p className="font-alexandria text-[16px] font-normal leading-normal text-white text-nowrap">
                    ادفع الصدقة
                  </p>
                  <Image
                    src="/figma/mingcute-love-fill.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>

                {/* Security text */}
                <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                  معاملة مشفرة آمنة بتقنية SSL
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
