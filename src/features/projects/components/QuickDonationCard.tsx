"use client";

import { useState } from "react";
import Image from "next/image";
import { AmountInput } from "@/components/ui/AmountInput";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type QuickDonationCardProps = {
  onDonate?: (amount: number) => void;
};

export function QuickDonationCard({ onDonate }: QuickDonationCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0 && onDonate) {
      onDonate(amount);
    }
  };

  return (
    <div className="w-full max-w-[448px] mx-auto" dir="rtl">
      <div className="relative w-full overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-white shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)]">
        {/* Content */}
        <div className="relative flex flex-col gap-6 items-end px-8 py-4">
          {/* Amount selection */}
          <div className="flex flex-col gap-4 items-end w-full">
            <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start w-full tracking-[-0.18px]">
              حدد المبلغ
            </p>
            <div className="flex items-center justify-between w-full">
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
                      "flex items-center justify-center rounded-[20px] transition-all w-[115px] h-[60px]",
                      isActive
                        ? "border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                        : "border border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                    ].join(" ")}
                  >
                    <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)]">
                      $ {amount}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom amount */}
          <div className="flex flex-col gap-4 items-start w-full">
            <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start w-full tracking-[-0.18px]">
              مبلغ مخصص
            </p>
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

          {/* Country selection */}
          <div className="flex gap-4 h-[81px] items-center justify-end w-full">
            <div className="basis-0 border-[0.5px] border-[rgba(0,0,0,0.2)] flex grow h-[54px] items-center justify-between px-5 py-2.5 rounded-[10px]">
              <div className="flex items-center justify-center rotate-180">
                <div className="relative size-6">
                  <Image
                    src="/figma/iconamoon_arrow-up-2-fill.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <p className="font-alexandria text-[16px] font-normal leading-[1.5] text-[rgba(13,13,13,0.7)] text-center">
                  فلسطين
                </p>
                <div className="h-6 w-[34px] relative">
                  <Image
                    src="/figma/Flag_of_Palestine 1.svg"
                    alt=""
                    width={34}
                    height={24}
                  />
                </div>
              </div>
            </div>
            <p className="font-alexandria text-[18px] font-medium leading-[1.5] text-[#122f2a] text-center">
              الدولة
            </p>
          </div>

          {/* Donate button */}
          <button
            type="button"
            onClick={handleDonate}
            className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full hover:bg-[#005F4A] transition-colors"
          >
            <Image
              src="/figma/mingcute_love-fill.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <p className="font-alexandria text-[16px] font-semibold leading-[1.5] text-white">
              تبرع الان
            </p>
          </button>

          {/* Security text */}
          <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-center text-[rgba(13,13,13,0.7)] w-full">
            معاملة مشفرة آمنة بتقنية SSL
          </p>
        </div>
      </div>
    </div>
  );
}
