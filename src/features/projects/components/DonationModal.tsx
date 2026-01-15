"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { Modal } from "@/components/ui/modal/Modal";
import { useLoginModal } from "@/contexts/LoginContext";
import { AmountSelector } from "@/features/donations/components/AmountSelector";

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectTitle?: string;
  titleIcon?: string;
  hideHeader?: boolean;
  isProject?: boolean;
}

export function DonationModal({
  open,
  onClose,
  onSuccess,
  projectTitle,
  titleIcon,
  hideHeader = false,
  isProject = false
}: DonationModalProps) {
  const { openLoginModal } = useLoginModal();
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
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
      <div className="relative w-[90%] mx-auto sm:w-full sm:max-w-[560px] md:max-w-[580px] max-h-[70vh] sm:max-h-[80vh] md:max-h-[85vh] rounded-[20px] bg-white font-alexandria shadow-xl overflow-hidden flex flex-col" dir="rtl">
        {/* Close Button - Fixed at top */}
        <div className="relative flex-shrink-0 px-4 md:px-[35px] pt-4 md:pt-[16px] pb-2">
          <button
            onClick={onClose}
            className="absolute left-4 md:left-[18px] top-4 md:top-[16px] z-20 flex size-[28px] items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-[35px] pb-4 md:pb-[16px]">
          <div className="relative z-10 flex flex-col gap-[16px] items-start">
            {!hideHeader && (
              <>
                {/* Project Header with icon */}
                {isProject && (
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
                )}

                {/* Title */}
                {projectTitle && (
                  <div className="flex gap-[10px] items-center justify-center w-full">
                    {titleIcon && (
                      <div className="relative h-[28px] w-[28px] shrink-0">
                        <Image
                          src={titleIcon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="font-alexandria text-[22px] font-semibold leading-[1.5] text-[#122F2A]">
                      {projectTitle}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Subtitle */}
            <p className="font-alexandria text-[15px] font-normal leading-[1.8] text-[#4F4F52] text-center w-full">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>

            {/* Inner Form Card - Responsive design matching Zakat page */}
            <div className="w-full bg-white rounded-[18px] border border-[rgba(0,0,0,0.1)] border-solid flex items-center justify-center pl-4 md:pl-[28px] pr-0 py-[12px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] font-alexandria relative z-10 max-w-[592px] mx-auto">
              <div className="flex flex-col gap-[20px] grow items-start px-[14px] py-0 w-full">

                <AmountSelector
                  selectedAmount={selectedAmount}
                  customAmount={customAmount}
                  onAmountSelect={handleAmountSelect}
                  onCustomAmountChange={handleCustomAmountChange}
                />

                {/* Name Input */}
                <div className="flex flex-col gap-[14px] items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                      الاسم
                    </p>
                  </div>
                  <div className="flex h-[54px] items-center justify-start w-full rounded-[18px]">
                    <div className="basis-0 flex gap-[10px] grow h-full items-center justify-start min-h-px min-w-px rounded-[18px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                      <input
                        type="text"
                        placeholder="اسم المستخدم"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        dir="rtl"
                        className="flex flex-col h-full items-center justify-center pl-[14px] pr-[28px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[15px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-[14px] items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="font-alexandria font-light leading-normal text-[15px] text-[rgba(13,13,13,0.7)] text-start w-full">
                      البريد الإلكتروني
                    </p>
                  </div>
                  <div className="flex h-[54px] items-center justify-start w-full rounded-[18px]">
                    <div className="basis-0 flex gap-[10px] grow h-full items-center justify-start min-h-px min-w-px rounded-[18px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                      <input
                        type="email"
                        placeholder="ادخل البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        dir="rtl"
                        className="flex flex-col h-full items-center justify-center pl-[14px] pr-[28px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[15px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                      />
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#007F5E] flex gap-[8px] items-center justify-center px-[28px] py-[14px] rounded-[32px] w-full"
                >
                  <div className="relative shrink-0 size-[22px]">
                    <Image
                      src="/figma/mingcute_love-fill.svg"
                      alt=""
                      width={22}
                      height={22}
                      className="size-[22px]"
                    />
                  </div>
                  <p className="font-alexandria text-[15px] font-semibold leading-[1.5] text-white text-nowrap">
                    متابعة
                  </p>
                </button>

                {/* Login Link */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openLoginModal();
                  }}
                  className="font-alexandria text-[15px] font-normal leading-[1.6] text-[#6155F5] text-[rgba(13,13,13,0.7)] text-center w-full cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span>ت</span>
                  <span className="underline decoration-solid [text-underline-position:from-font]">سجيل الدخول</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
