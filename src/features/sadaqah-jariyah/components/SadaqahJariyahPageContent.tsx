"use client";

import { useState } from "react";
import Image from "next/image";
import { AmountInput } from "@/components/ui/AmountInput";

type DonationChipId =
  | "water"
  | "aqiqah"
  | "nadhr"
  | "purification"
  | "sadaqah-jariyah"
  | "relieve"
  | "clothe"
  | "pay-harm"
  | "debtors"
  | "expiation"
  | "feed";

type DonationChip = { id: DonationChipId; label: string; gridArea: string };

// Chips in RTL grid order: grid-area row/col (in RTL, col 1 = rightmost, col 4 = leftmost)
const CHIPS: DonationChip[] = [
  { id: "purification", label: " تطهير مال وأسهم", gridArea: "1/1" },
  { id: "nadhr", label: "النذر", gridArea: "1/2" },
  { id: "aqiqah", label: "عقائق", gridArea: "1/3" },
  { id: "water", label: "سقيا الماء", gridArea: "1/4" },
  { id: "clothe", label: "كسوة مسكين", gridArea: "2/1" },
  { id: "sadaqah-jariyah", label: "صدقة جارية", gridArea: "2/2" },
  { id: "relieve", label: "تفريج كربة", gridArea: "2/3" },
  { id: "pay-harm", label: "دفع بلاء", gridArea: "2/4" },
  { id: "debtors", label: "الغارمين", gridArea: "3/1" },
  { id: "expiation", label: "كفارة يمين", gridArea: "3/2" },
  { id: "feed", label: "إطعام مسكين", gridArea: "3/3" },
];

// Amounts: 10, 50, 100, 200 from right to left (first in array = rightmost in RTL)
const PRESET_AMOUNTS = [10, 50, 100, 200];

export function SadaqahJariyahPageContent() {
  const [selectedChip, setSelectedChip] = useState<DonationChipId>("purification");
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0) {
      console.log("Donating:", { chip: selectedChip, amount });
      // TODO: Implement actual donation logic
    }
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 xl:px-[320px] 2xl:px-[400px] pt-8 pb-10 md:pt-[100px] md:pb-[100px]" dir="rtl">
      <div className="flex flex-col xl:flex-row w-full items-start justify-between gap-8">
        {/* Right content column - appears on the RIGHT in RTL layout (first child) */}
        <div className="flex w-full xl:max-w-[736px] flex-col items-start gap-[24px]">
          <div className="flex w-full xl:w-[575px] max-w-[583px] flex-col items-start gap-[8px]">
            {/* Subtitle + icon - RTL: right-aligned, icon first so it appears on the right */}
          <div className="flex w-full items-center justify-start gap-[5px] self-start">
            <span aria-hidden="true" className="relative h-6 w-6 shrink-0 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path d="M4.66663 16.3334H7.46079C7.80379 16.3334 8.14213 16.4104 8.44896 16.5597L10.8313 17.7124C11.1381 17.8605 11.4765 17.9375 11.8206 17.9375H13.0363C14.2123 17.9375 15.1666 18.8604 15.1666 19.999C15.1666 20.0457 15.1351 20.0854 15.0896 20.0982L12.1251 20.9184C11.5932 21.0653 11.026 21.0139 10.5291 20.7737L7.98229 19.5417M9.79529 2.97736C11.515 1.91102 13.0176 2.34036 13.9195 3.02519C14.2893 3.30519 14.4748 3.44519 14.5833 3.44519C14.6918 3.44519 14.8773 3.30519 15.2471 3.02519C16.149 2.34036 17.6505 1.91102 19.3713 2.97736C21.63 4.37736 22.141 8.99269 16.933 12.887C15.9401 13.629 15.4443 14 14.5833 14C13.7223 14 13.2265 13.629 12.2348 12.887C7.02563 8.99269 7.53663 4.37619 9.79529 2.97736Z" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.1666 19.25L20.5251 17.6039C20.9916 17.4607 21.4914 17.4686 21.9532 17.6264C22.4149 17.7841 22.8151 18.0837 23.0965 18.4824C23.527 19.0774 23.352 19.9314 22.7243 20.293L13.9568 25.3529C13.6826 25.5115 13.3791 25.6126 13.0646 25.6501C12.7501 25.6876 12.4312 25.6607 12.1275 25.571L4.66663 23.3567" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className="font-alexandria text-[16px] leading-normal text-[#007F5E] text-nowrap text-right font-normal">
              صدقة اليوم… أمان لغدهم
            </p>
          </div>

          {/* Title - RTL: right-aligned */}
          <p className="w-full text-right text-[30px] font-bold leading-normal text-[#0D0D0D] text-nowrap font-alexandria">
            <span>{`الصدقة الجارية `}</span>
            <span className="text-[#007F5E]">هي</span>
          </p>

          {/* Paragraph - right-aligned */}
          <p className="w-full text-right text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] font-alexandria">
            الصدقة التي يستمر ثوابها حتى عند الموت وهو ما يسعى له الكثير من المسلمين بإقامة مشروع
            صدقة جارية حتى تكون شفيعة له عند الله وتكون في ميزان حسناته ويستمر ثوابها حتى بعد
            الموت. وقد أكد الرسول صلى الله عليه وسلم على فضل الصدقة الجارية في السنة النبوية
            الشريفة فهناك حديث عن أبي هريرة رضي الله عنه قال رسول الله صلى الله عليه وسلم
            <br />
            (إذا مات الإنسان أنقطع عمله إلا من ثلاث، صدقة جارية، أو علم ينتفع به أو ولد صالح يدعو
            له).
          </p>
        </div>

        {/* Hadith image */}
        <div className="relative w-full max-w-[583px] overflow-hidden" style={{ height: "auto", aspectRatio: "583.49/338.32" }}>
          <Image src="/hadeeth.png" alt="" fill className="object-contain" priority />
        </div>

        {/* Quote section */}
        <div className="flex w-full xl:w-[575px] max-w-[583px] flex-col items-start gap-[8px] leading-normal">
          {/* RTL: right-aligned */}
          <p className="w-full text-right text-[20px] font-medium leading-normal text-[#0D0D0D] text-nowrap font-alexandria">
            ازرع خيرًا اليوم… يحصد أجره غدًا
          </p>
          {/* right-aligned */}
          <p className="w-full text-right text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] font-alexandria">
            في حديث رواه أنس بن مالك رضي الله عنه- عن رسول الله صلى الله عليه وسلم أنه قال:
            <br />
            (سبع يجري للعبد أجرهن وهو في قبره بعد موته: من علم علما؛ أو كرى نهرا، أو حفر بئرا، أو
            غرس نخلا، أو بنى مسجدا، أو ورث مصحفا، أو ترك ولدا يستغفر له بعد موته). وكل منا في أمس
            الحاجة إلى هذا ثواب هذه الأعمال والتي نسأل الله العظيم أن يجعلها في ميزان حسنات من
            فقدناهم ويتقبل منا.
          </p>
        </div>

        {/* RTL: right-aligned */}
        <div className="w-full max-w-[583px] flex flex-col items-start gap-[24px]">
          <p className="w-full text-right text-[20px] font-medium leading-normal text-[#0D0D0D] text-nowrap font-alexandria">
            كم تريد التبرع اليوم
          </p>

          {/* Chips grid - RTL: fill from right to left */}
          <div className="inline-grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[8px] auto-rows-auto" style={{ direction: "rtl" }}>
            {CHIPS.map((chip) => {
              const isActive = selectedChip === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedChip(chip.id)}
                  className={[
                    "flex items-center justify-center rounded-[20px] border transition-all cursor-pointer min-h-[44px] px-3 py-2",
                    isActive
                      ? "border-[#007F5E] bg-[#007F5E] hover:bg-[#056A4F] hover:border-[#056A4F]"
                      : "border-black bg-white text-[#122F2A] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                  ].join(" ")}
                  style={{ gridArea: chip.gridArea }}
                >
                  <p className={[
                    "text-center text-[14px] sm:text-[16px] leading-normal font-alexandria break-words",
                    isActive ? "text-white font-medium" : "text-[#122F2A] font-medium"
                  ].join(" ")}>
                    {chip.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

          {/* Amount + custom amount + CTA */}
          <div className="flex w-full max-w-[583px] flex-col items-start gap-[24px]">
            <div className="flex w-full flex-col items-start gap-[16px]">
              {/* Amount label */}
              <div className="flex w-full flex-col items-start">
                <p className="w-full text-right text-[18px] font-normal tracking-[-0.18px] text-[rgba(13,13,13,0.7)] font-alexandria">
                  حدد المبلغ
                </p>
              </div>

              {/* Presets row - RTL: 10, 50, 100, 200 from right to left (normal flex in RTL) */}
              <div className="flex items-center justify-between w-full" dir="rtl">
                {PRESET_AMOUNTS.map((amount) => {
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
                        "flex items-center justify-center rounded-[20px] transition-all cursor-pointer px-[16px] py-[20px] w-[115px]",
                        isActive
                          ? "h-[57px] border border-[#007F5E] bg-[rgba(0,127,94,0.10)]"
                          : "h-[60px] border border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                      ].join(" ")}
                    >
                      <p className="text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap font-alexandria">
                        $ {amount}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount label */}
              <div className="flex w-full flex-col items-start">
                <p className="w-full text-right text-[18px] font-normal tracking-[-0.18px] text-[rgba(13,13,13,0.7)] font-alexandria">
                  مبلغ مخصص
                </p>
              </div>

              {/* Custom amount input */}
              <AmountInput
                placeholder="أدخل القيمة"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedAmount(0);
                }}
                className="h-[60px]"
              />
            </div>

            {/* CTA button - original style, positioned under input on the left */}
            <button
              type="button"
              onClick={handleDonate}
              className="flex items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E] px-8 py-4 transition-colors hover:bg-[#056A4F] focus-visible:ring-2 focus-visible:ring-[#007F5E]/40 focus-visible:outline-none cursor-pointer self-start"
            >

              <span className="text-[16px] font-bold leading-normal text-white text-nowrap font-alexandria">
                تبرع الأن
              </span>
              <Image
                src="/double hearts.svg"
                alt="تبرع"
                width={22}
                height={23}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Left image - appears on the LEFT in RTL layout (second child) - Hidden on smaller screens */}
        <div className="hidden xl:block relative h-[1070.72px] w-full xl:w-[696.51px] shrink-0 bg-transparent rounded-[352.749px] overflow-hidden">
          <div className="absolute inset-0 rounded-[352.749px] overflow-hidden" style={{ mixBlendMode: "hard-light" }}>
            <Image
              src="/sadaqah-jarya1.png"
              alt=""
              fill
              className="object-contain"
              sizes="696.51px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
