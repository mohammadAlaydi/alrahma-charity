"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { Modal } from "@/components/ui/modal/Modal";
import { AmountInput } from "@/components/ui/AmountInput";
import { cn } from "@/lib/cn";

const PRESET_AMOUNTS = [10, 50, 100, 200];

interface DonationFormDialogProps {
  open: boolean;
  onClose: () => void;
  projectTitle?: string;
  hideHeader?: boolean;
}

export function DonationFormDialog({ open, onClose, projectTitle, hideHeader = false }: DonationFormDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setSelectedAmount(0);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-full rounded-[16px] bg-white px-[50px] py-5 font-alexandria" dir="rtl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-[20px] top-[20px] flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Project Title */}
        {projectTitle && (
          <div className="mb-3 flex items-center justify-center">
            <p className="font-alexandria text-lg md:text-xl font-semibold leading-normal text-black text-center">
              {projectTitle}
            </p>
          </div>
        )}

        {/* Description paragraph when header is hidden */}
        {hideHeader && (
          <div className="mb-3 flex items-center justify-center">
            <p className="font-alexandria text-center text-[16px] font-normal leading-[200%] text-[#4F4F52] capitalize">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>
          </div>
        )}

        {/* Header */}
        {!hideHeader && (
          <div className="mb-3 flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <div className="relative h-5 w-5 md:h-6 md:w-6 shrink-0">
                <Image src="/figma/donation-svgrepo-com (1) 1.svg" alt="" fill className="object-contain" />
              </div>
              <p className="font-alexandria text-lg md:text-xl font-normal leading-normal text-[#232325]">
                كم تريد التبرع اليوم
              </p>
            </div>
            <p className="font-alexandria text-center text-s font-normal leading-relaxed text-[#4F4F52]">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>
          </div>
        )}


        {/* Form Card */}
        <div className="rounded-[16px] border border-black/10 bg-white p-5 shadow-[0px_5px_12px_rgba(0,127,94,0.07)] md:p-6 font-alexandria">
          <div className="flex flex-col gap-[18px]">
            {/* Amount Selection */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                حدد المبلغ
              </p>
              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
                {PRESET_AMOUNTS.map((amount) => {
                  const isActive = selectedAmount === amount && !customAmount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={cn(
                        "flex h-[50px] w-full items-center justify-center rounded-[16px] border transition-all sm:w-[110px]",
                        isActive
                          ? "border-[#007F5E] bg-[#007F5E]/10"
                          : "border-[#0D0D0D]/20 hover:border-[#007F5E] hover:bg-[#007F5E]/5"
                      )}
                    >
                      <p className="font-alexandria text-base font-normal leading-normal text-[#0D0D0D]/70">
                        {amount} $
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                مبلغ مخصص
              </p>
              <AmountInput
                placeholder="أدخل القيمة"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="h-[50px] w-full rounded-[16px]"
              />
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                الاسم
              </p>
              <div className="h-[50px] w-full rounded-[16px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  dir="rtl"
                  className="h-full w-full bg-transparent px-4 text-right font-alexandria text-sm font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                البريد الإلكتروني
              </p>
              <div className="h-[50px] w-full rounded-[16px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
                <input
                  type="email"
                  placeholder="ادخل البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="rtl"
                  className="h-full w-full bg-transparent px-4 text-right font-alexandria text-sm font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-col gap-3">
              <button
                type="button"
                className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[28px] bg-[#007F5E] text-white transition-colors hover:bg-[#007F5E]/90"
              >
                <span className="font-alexandria text-[16px] font-semibold leading-normal">
                  متابعة
                </span>
                <div className="relative h-7 w-7">
                  <Image src="/figma/mingcute_love-fill.svg" alt="" fill className="object-contain" />
                </div>
              </button>

              <button
                type="button"
                className="font-alexandria text-center text-sm font-normal leading-relaxed text-[#6155F5] underline decoration-solid [text-underline-position:from-font]"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

