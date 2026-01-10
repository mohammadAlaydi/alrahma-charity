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
          <div className="flex flex-col gap-6">
             {/* Header */}
             <div className="flex items-center justify-center gap-2.5 w-full">
               <p className="font-alexandria text-lg md:text-[18px] font-bold text-[#232325]">
                 كم تريد التبرع اليوم
               </p>
               <div className="relative h-8 w-8">
                 <Image 
                   src="/emojis/hand_healtcare.svg" 
                   alt="" 
                   fill 
                   className="object-contain" 
                   style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(1000%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                 />
               </div>
             </div>

            <p className="font-alexandria text-sm text-[#4f4f52] text-center leading-[2] px-4">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>

            {/* Inner Form Card - Responsive design matching Zakat page */}
            <div className="w-full bg-white rounded-[20px] border border-[rgba(0,0,0,0.1)] pl-[32px] pr-0 py-[16px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] font-alexandria relative z-10 md:max-w-[592px] md:mx-auto md:h-[618px] md:flex md:flex-col md:justify-between">
              <div className="flex flex-col gap-[24px] px-[16px]">
                {/* Project Title (if provided) */}
                {projectTitle && (
                  <p className="font-alexandria text-[24px] font-bold leading-[1.5] text-[#007F5E] text-center">
                    {projectTitle}
                  </p>
                )}

                 {/* Amount Selection */}
                 <div className="flex flex-col gap-[16px]">
                   <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                     حدد المبلغ
                   </p>
                   <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-3 md:gap-0 w-full">
                     {PRESET_AMOUNTS.map((amount) => {
                       const isActive = selectedAmount === amount && !customAmount;
                       return (
                         <button
                           key={amount}
                           type="button"
                           onClick={() => handleAmountSelect(amount)}
                           className={cn(
                             "flex h-[60px] items-center justify-center px-[16px] rounded-[20px] w-full md:w-[100px] border transition-all",
                             isActive
                               ? "border-[#007F5E] bg-[#007F5E]/10"
                               : "border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[#007F5E]/5"
                           )}
                         >
                           <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
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
                    className="h-[60px] w-full rounded-[20px]"
                  />
                </div>

                {/* Inputs Group */}
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      الاسم
                    </p>
                    <div className="h-[60px] w-full rounded-[20px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
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

                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      البريد الإلكتروني
                    </p>
                    <div className="h-[60px] w-full rounded-[20px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
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
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-0 px-[16px]">
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

                <p className="font-alexandria text-center text-[16px] font-normal leading-[1.6] text-[#6155F5] w-full mt-4">
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
