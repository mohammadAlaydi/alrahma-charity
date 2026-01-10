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
  onSuccess?: () => void;
  projectTitle?: string;
  hideHeader?: boolean;
}

export function DonationFormDialog({ 
  open, 
  onClose, 
  onSuccess,
  projectTitle, 
  hideHeader = false 
}: DonationFormDialogProps) {
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
      <div className="relative w-[95%] mx-auto sm:w-full sm:max-w-[600px] md:max-w-[692px] rounded-[20px] bg-white px-4 md:px-[50px] py-5 md:py-[20px] font-alexandria shadow-xl" dir="rtl">
        {/* Background Texture - subtle */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-[20px]">
          <Image src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png" alt="" fill className="object-cover" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative z-10 flex flex-col">
          {/* Project Title */}
          {projectTitle && (
            <div className="flex items-center justify-center h-[36px]">
              <p className="font-alexandria text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-tight text-[#122F2A] text-center">
                {projectTitle}
              </p>
            </div>
          )}

          <div className="mt-[20px] flex flex-col gap-[20px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 h-[32px] justify-center">
              <div className="flex items-center justify-center gap-2">
                <p className="font-alexandria text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-normal text-[#232325]">
                  كم تريد التبرع اليوم
                </p>
                <div className="relative h-6 w-6 sm:h-8 sm:w-8 shrink-0">
                  <Image src="/figma/donation-svgrepo-com (1) 1.svg" alt="" fill className="object-contain" />
                </div>
              </div>
            </div>

            <p className="font-alexandria text-center text-sm sm:text-base md:text-[16px] font-normal h-[32px] flex items-center justify-center text-[#4F4F52] whitespace-nowrap">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>

            {/* Inner Form Card */}
            <div className="w-full md:w-[592px] md:h-[618px] rounded-[20px] border border-black/5 bg-white p-5 md:px-[32px] md:py-[16px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] mx-auto flex flex-col justify-between">
              <div className="flex flex-col gap-6 md:gap-[24px]">
                {/* Amount Selection */}
                <div className="flex flex-col gap-3">
                  <p className="font-alexandria text-right text-base md:text-[18px] font-normal text-[#0D0D0D]/70 tracking-[-0.18px]">
                    حدد المبلغ
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {PRESET_AMOUNTS.map((amount) => {
                      const isActive = selectedAmount === amount && !customAmount;
                      return (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={cn(
                            "flex h-[50px] md:h-[60px] items-center justify-center rounded-[16px] border transition-all",
                            isActive
                              ? "border-[#007F5E] bg-[#007F5E]/10 text-[#007F5E]"
                              : "border-[#0D0D0D]/10 bg-transparent text-[#0D0D0D]/70 hover:border-[#007F5E]/50"
                          )}
                        >
                          <span className="font-medium text-base md:text-[16px]">$ {amount}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="flex flex-col gap-3">
                  <p className="font-alexandria text-right text-base md:text-[18px] font-normal text-[#0D0D0D]/70 tracking-[-0.18px]">
                    مبلغ مخصص
                  </p>
                  <AmountInput
                    placeholder="أدخل القيمة"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="h-[55px] md:h-[60px] w-full rounded-[16px] border-[#0D0D0D]/10"
                  />
                </div>

                {/* Inputs Group */}
                <div className="flex flex-col gap-4 md:gap-[16px]">
                  <div className="flex flex-col gap-2">
                    <p className="font-alexandria text-right text-base md:text-[18px] font-normal text-[#0D0D0D]/70 tracking-[-0.18px]">
                      الاسم
                    </p>
                    <input
                      type="text"
                      placeholder="اسم المستخدم"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-[55px] md:h-[60px] w-full rounded-[16px] border border-[#0D0D0D]/10 px-4 text-right font-alexandria text-sm md:text-base font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal focus:border-[#007F5E] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-alexandria text-right text-base md:text-[18px] font-normal text-[#0D0D0D]/70 tracking-[-0.18px]">
                      البريد الإلكتروني
                    </p>
                    <input
                      type="email"
                      placeholder="ادخل البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[55px] md:h-[60px] w-full rounded-[16px] border border-[#0D0D0D]/10 px-4 text-right font-alexandria text-sm md:text-base font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal focus:border-[#007F5E] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex h-[55px] md:h-[56px] w-full items-center justify-center gap-3 rounded-[35px] bg-[#007F5E] text-white shadow-lg shadow-[#007F5E]/20 transition-all hover:bg-[#007F5E]/90 active:scale-[0.98]"
                >
                  <span className="font-alexandria text-lg font-semibold">
                    متابعة
                  </span>
                  <div className="relative h-6 w-6">
                    <Image src="/figma/mingcute_love-fill.svg" alt="" fill className="object-contain brightness-0 invert" />
                  </div>
                </button>

                <button
                  type="button"
                  className="font-alexandria text-center text-base md:text-[16px] font-normal text-[#6155F5] underline underline-offset-4"
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
