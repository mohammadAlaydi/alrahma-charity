"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Modal } from "@/components/ui/modal/Modal";

interface DonationSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function DonationSuccessModal({ open, onClose }: DonationSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-[95%] mx-auto sm:w-full sm:max-w-[600px] md:max-w-[692px] rounded-[20px] bg-white px-4 md:px-[50px] py-10 md:py-[40px] font-alexandria shadow-xl transition-all duration-300" dir="rtl">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[20px]">
          <Image 
            src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png" 
            alt="" 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center py-2">
          {/* Logo */}
          <div className="relative mb-8 h-14 w-28 md:h-[80px] md:w-[160px]">
            <Image 
              src="/Logo.png" 
              alt="Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Success Title */}
          <h2 className="mb-6 font-alexandria text-xl sm:text-2xl md:text-[32px] font-bold text-[#122F2A]">
            تم التبرع بنجاح
          </h2>

          {/* Illustration */}
          <div className="relative mb-8 h-[200px] w-full sm:h-[260px] md:h-[320px]">
            <Image 
              src="/images/carry hart0 2.png" 
              alt="Donation Success" 
              fill 
              className="object-contain scale-110" 
            />
          </div>

          {/* Thank You Message */}
          <p className="font-alexandria text-lg sm:text-xl md:text-[24px] font-medium text-[#232325]">
            شكرا علي تبرعك
          </p>
        </div>
      </div>
    </Modal>
  );
}

