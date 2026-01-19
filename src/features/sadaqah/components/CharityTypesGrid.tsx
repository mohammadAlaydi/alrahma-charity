"use client";

import { useState } from "react";
import Image from "next/image";
import { AmountInput } from "@/components/ui/AmountInput";

type DonationType = {
  id: string;
  title: string;
  iconSrc: string;
};

const DONATION_TYPES: DonationType[] = [
  { id: "aqiqah", title: "عقائق", iconSrc: "/orphan.svg" },
  { id: "nadhr", title: "النذر", iconSrc: "/heart.svg" },
  { id: "purification", title: "تطهير مال وأسهم", iconSrc: "/all-campanes.svg" },
  { id: "water", title: "سقيا الماء", iconSrc: "/globe.svg" },
  { id: "sadaqah-jariyah", title: "صدقة جارية", iconSrc: "/heart.svg" },
  { id: "clothe", title: "كسوة مسكين", iconSrc: "/human 1.svg" },
  { id: "relieve", title: "تفريج كربة", iconSrc: "/heart.svg" },
  { id: "pay-harm", title: "دفع بلاء", iconSrc: "/medical.svg" },
  { id: "debtors", title: "الغارمين", iconSrc: "/file.svg" },
  { id: "expiation", title: "كفارة يمين", iconSrc: "/heart.svg" },
  { id: "feed", title: "إطعام مسكين", iconSrc: "/education.svg" },
];

export function CharityTypesGrid() {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<Record<string, string>>({});

  const handleAmountChange = (id: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (id: string, value: string) => {
    setCountries((prev) => ({ ...prev, [id]: value }));
  };

  const handleDonate = (id: string) => {
    const amount = amounts[id] || "";
    const country = countries[id] || "فلسطين";
    console.log("Donating:", { type: id, amount, country });
    // TODO: Implement actual donation logic
  };

  return (
    <div dir="rtl" className="w-full">
      <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-6">
        {DONATION_TYPES.map((type) => (
          <div
            key={type.id}
            className="flex h-[445px] w-[300px] flex-col items-center rounded-[20px] border border-[rgba(13,13,13,0.1)] bg-white p-5"
          >
            {/* Icon container - 102x102, positioned at top with 20px margin */}
            <div className="mb-[22px] flex h-[102px] w-[102px] items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={type.iconSrc}
                  alt=""
                  width={102}
                  height={102}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Content container - 260px width */}
            <div className="flex w-[260px] flex-col gap-6">
              {/* Title */}
              <div className="flex w-full flex-col items-end">
                <p className="w-full text-right text-[16px] font-normal leading-[1.875] text-[#0D0D0D] font-alexandria">
                  {type.title}
                </p>
              </div>

              {/* Amount input section */}
              <div className="flex w-full flex-col items-end gap-[10px]">
                <p className="w-full text-right text-[16px] font-normal leading-[1.6875] text-[#0D0D0D] font-alexandria">
                  ادخل قيمة الصدقة
                </p>
                <div className="w-full">
                  <AmountInput
                    placeholder="ادخل قيمة الصدقة"
                    value={amounts[type.id] || ""}
                    onChange={(e) => handleAmountChange(type.id, e.target.value)}
                    className="h-[44px] w-full"
                  />
                </div>
              </div>

              {/* Country dropdown section */}
              <div className="flex w-full flex-col items-end gap-[10px]">
                <p className="w-full text-right text-[16px] font-normal leading-[1.6875] text-[#0D0D0D] font-alexandria">
                  الدولة
                </p>
                <div className="flex h-[44px] w-full items-center justify-between rounded-[20px] border border-[rgba(13,13,13,0.2)] px-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/iconamoon_arrow-up-2.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rotate-180"
                    />
                  </div>
                  <select
                    value={countries[type.id] || "فلسطين"}
                    onChange={(e) => handleCountryChange(type.id, e.target.value)}
                    className="flex-1 bg-transparent text-right text-[16px] font-normal leading-[1.5] text-[rgba(13,13,13,0.7)] outline-none font-alexandria"
                    dir="rtl"
                  >
                    <option value="فلسطين">فلسطين</option>
                    <option value="سوريا">سوريا</option>
                    <option value="اليمن">اليمن</option>
                    <option value="لبنان">لبنان</option>
                  </select>
                </div>
              </div>

              {/* Donate button - positioned at bottom */}
              <button
                type="button"
                onClick={() => handleDonate(type.id)}
                className="mt-auto flex h-[56px] w-[184px] items-center justify-center gap-2 rounded-[20px] bg-[#007F5E] transition-colors hover:bg-[#056A4F]"
              >
                <Image
                  src="/figma/mingcute-love-fill.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-[16px] font-normal leading-[1.5] text-white font-alexandria">
                  ادفع زكاتك
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
