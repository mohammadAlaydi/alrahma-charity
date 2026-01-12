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
      <div className="relative w-[95%] mx-auto sm:w-full sm:max-w-[600px] md:max-w-[692px] rounded-[20px] bg-white px-4 md:px-[50px] py-5 md:py-[20px] font-alexandria shadow-xl" dir="rtl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 md:left-[20px] top-[20px] z-20 flex size-[32px] items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
        >
          <X className="size-6" />
        </button>

        <div className="relative z-10 flex flex-col gap-[20px] items-end">
          {/* Title */}
          {projectTitle && (
            <div className="flex gap-[10px] items-center justify-center w-full">
              <p className="font-alexandria text-[24px] font-semibold leading-[1.5] text-[#122F2A] text-right">
                {projectTitle}
              </p>
            </div>
          )}

          {/* Subtitle */}
          <p className="font-alexandria text-[16px] font-normal leading-[2] text-[#4F4F52] text-center w-full">
            جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
          </p>

          {/* Inner Form Card - Responsive design matching Zakat page */}
          <div className="w-full bg-white rounded-[20px] border border-[rgba(0,0,0,0.1)] border-solid flex items-center justify-center pl-4 md:pl-[32px] pr-0 py-[16px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] font-alexandria relative z-10 max-w-[592px] mx-auto">
            <div className="flex flex-col gap-[24px] grow items-end px-[16px] py-0 w-full">

                 {/* Amount Selection */}
                 <div className="flex flex-col gap-[16px] items-end w-full">
                   <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                     حدد المبلغ
                   </p>
                   <div className="flex items-center justify-between w-full gap-0 flex-wrap md:flex-nowrap">
                     {PRESET_AMOUNTS.map((amount) => {
                       const isActive = selectedAmount === amount && !customAmount;
                       return (
                         <button
                           key={amount}
                           type="button"
                           onClick={() => handleAmountSelect(amount)}
                           className={cn(
                             "flex h-[60px] items-center justify-center rounded-[20px] w-[calc(50%-4px)] md:w-[115px] border border-solid transition-all mb-2 md:mb-0",
                             isActive
                               ? "border-[rgba(13,13,13,0.2)]"
                               : "border-[rgba(13,13,13,0.2)]"
                           )}
                         >
                           {isActive ? (
                             <div className="bg-[rgba(0,127,94,0.1)] border border-[#007F5E] border-solid flex h-[57px] items-center justify-center rounded-[20px] w-[calc(100%-4px)] md:w-[110px]">
                               <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                 $ {amount}
                               </p>
                             </div>
                           ) : (
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
                  <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                    مبلغ مخصص
                  </p>
                  <AmountInput
                    placeholder="أدخل القيمة"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="h-[60px] w-full rounded-[20px]"
                  />
                </div>

                {/* Name Input */}
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      الاسم
                    </p>
                  </div>
                  <div className="flex h-[60px] items-center justify-end w-full rounded-[20px]">
                    <div className="basis-0 flex gap-[10px] grow h-full items-center justify-end min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
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
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] text-right w-full">
                      البريد الإلكتروني
                    </p>
                  </div>
                  <div className="flex h-[60px] items-center justify-end w-full rounded-[20px]">
                    <div className="basis-0 flex gap-[10px] grow h-full items-center justify-end min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
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

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-[32px] py-[16px] rounded-[35px] w-full"
                >
                  <div className="relative shrink-0 size-[24px]">
                    <Image
                      src="/figma/mingcute_love-fill.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  </div>
                  <p className="font-alexandria text-[16px] font-semibold leading-[1.5] text-white text-nowrap">
                    متابعة
                  </p>
                </button>

                {/* Login Link */}
                <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-[#6155F5] text-[rgba(13,13,13,0.7)] text-center w-full">
                  <span>ت</span>
                  <span className="underline decoration-solid [text-underline-position:from-font]">سجيل الدخول</span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
