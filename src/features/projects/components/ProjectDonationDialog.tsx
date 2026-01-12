"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { Modal } from "@/components/ui/modal/Modal";
import { AmountInput } from "@/components/ui/AmountInput";
import { cn } from "@/lib/cn";

const PRESET_AMOUNTS = [10, 50, 100, 200];

interface ProjectDonationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectTitle?: string;
}

export function ProjectDonationDialog({ 
  open, 
  onClose, 
  onSuccess,
  projectTitle
}: ProjectDonationDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
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

  const handleSubmit = () => {
    // Simulate donation process
    setTimeout(() => {
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    }, 500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-[95%] mx-auto sm:w-full sm:max-w-[692px] rounded-[20px] bg-white px-4 sm:px-[50px] py-5 sm:py-[20px] font-alexandria shadow-xl" dir="rtl">
        {/* Close Button - positioned at top-left (left in RTL) */}
        <button
          onClick={onClose}
          className="absolute left-[20px] top-[20px] z-20 flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative z-10 flex flex-col gap-[20px] items-center">
          {/* Header with icon */}
          <div className="flex items-center justify-center gap-[10px] w-full flex-wrap">
            <div className="relative h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] shrink-0">
              <Image 
                src="/figma/donation-svgrepo-com (1) 1.svg" 
                alt="" 
                fill 
                className="object-contain" 
              />
            </div>
            <p className="font-alexandria text-[18px] sm:text-[20px] font-normal leading-[1.5] text-[#232325] text-start">
              كم تريد التبرع اليوم
            </p>
          </div>

          {/* Subtitle */}
          <p className="font-alexandria text-[16px] font-normal leading-[2] text-[#4f4f52] text-center capitalize">
            جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
          </p>

          {/* Inner Form Card - matching Figma dimensions */}
          <div className="w-full bg-white rounded-[20px] border border-[rgba(0,0,0,0.1)] pl-4 sm:pl-[32px] pr-0 py-4 sm:py-[16px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] font-alexandria relative z-10 max-w-[592px] overflow-hidden">
            <div className="flex flex-col gap-4 sm:gap-[24px] px-2 sm:px-[16px] pb-2">
              {/* Amount Selection */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                    حدد المبلغ
                  </p>
                </div>
                <div className="flex items-center justify-between w-full flex-wrap gap-2 sm:gap-0">
                  {PRESET_AMOUNTS.map((amount) => {
                    const isActive = selectedAmount === amount && !customAmount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={cn(
                          "flex h-[60px] items-center justify-center px-[16px] rounded-[20px] w-full sm:w-[115px] border transition-all relative",
                          isActive
                            ? "border-[rgba(13,13,13,0.2)]"
                            : "border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]"
                        )}
                      >
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-[57px] w-[calc(100%-5px)] sm:w-[110px] items-center justify-center rounded-[20px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]">
                              <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                $ {amount}
                              </p>
                            </div>
                          </div>
                        )}
                        {!isActive && (
                          <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                            $ {amount}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                    مبلغ مخصص
                  </p>
                </div>
                <div className="flex h-[60px] items-center justify-start w-full rounded-[20px]">
                  <AmountInput
                    placeholder="أدخل القيمة"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="h-full w-full rounded-[20px]"
                  />
                </div>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                    الاسم
                  </p>
                </div>
                <div className="flex h-[60px] items-center justify-start w-full rounded-[20px]">
                  <div className="basis-0 flex gap-[10px] grow h-full items-center justify-start min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                    <input
                      type="text"
                      placeholder="اسم المستخدم"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      dir="rtl"
                      className="flex flex-col h-full items-center justify-center pl-[16px] pr-[32px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] text-start w-full">
                    البريد الإلكتروني
                  </p>
                </div>
                <div className="flex h-[60px] items-center justify-start w-full rounded-[20px]">
                  <div className="basis-0 flex gap-[10px] grow h-full items-center justify-start min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                    <input
                      type="email"
                      placeholder="ادخل البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="rtl"
                      className="flex flex-col h-full items-center justify-center pl-[16px] pr-[32px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-0 items-start w-full">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex gap-[10px] w-full items-center justify-center px-[32px] py-[16px] rounded-[35px] bg-[#007F5E] text-white transition-colors hover:bg-[#007F5E]/90"
                >
                  <div className="relative h-6 w-6 shrink-0">
                    <Image src="/figma/mingcute_love-fill.svg" alt="" fill className="object-contain" />
                  </div>
                  <span className="font-alexandria text-[16px] font-semibold leading-[1.5] text-nowrap text-white">
                    متابعة
                  </span>
                </button>

                <p className="font-alexandria text-center text-[16px] font-normal leading-[1.6] text-[#6155F5] w-full mt-4 mb-0">
                  <span>ت</span>
                  <span className="underline decoration-solid [text-underline-position:from-font]">سجيل الدخول</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

