"use client";

import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Modal } from "@/components/ui/modal/Modal";
import { TextInput } from "@/components/ui/TextInput";
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/notificationsSlice";
import { signupSchema, type SignupValues } from "@/schemas/auth";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="flex h-6 items-center gap-1.5 font-alexandria">
      {visible ? (
        <EyeOff className="h-5 w-5 shrink-0 text-[#666666]/80" strokeWidth={1} />
      ) : (
        <Eye className="h-5 w-5 shrink-0 text-[#666666]/80" strokeWidth={1} />
      )}
      <span className="text-[18px] leading-[18px] font-normal text-[#666666]/80 font-alexandria">
        {visible ? "إخفاء" : "إظهار"}
      </span>
    </button>
  );
}

export function SignUpModal({ open, onClose, onSwitchToLogin }: SignUpModalProps) {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit(async (values) => {
    // Placeholder: call backend register endpoint then sign in.
    dispatch(addToast({ type: "success", message: "تم إنشاء الحساب بنجاح" }));
    onClose();
    // Optionally redirect or refresh
    window.location.reload();
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-full max-w-[480px] mx-auto rounded-[24px] bg-[#FAFAFA] p-8 md:p-10 font-alexandria overflow-hidden" dir="rtl">
        {/* Decorative Background Image */}
        <div className="absolute top-0 right-[-30px] w-[110px] h-[110px] pointer-events-none opacity-[1] overflow-hidden rotate-[180deg]">
          <Image 
            src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 9.png" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] pointer-events-none opacity-[1] overflow-hidden">
          <Image 
            src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 9.png" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors font-alexandria"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="relative mb-8 flex flex-col items-center gap-4 z-10">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <Image 
              src="/figma/Logo.png" 
              alt="Alrahma" 
              width={80} 
              height={80} 
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#333333] font-alexandria">إنشاء حساب</h2>
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-6 z-10 font-alexandria">
          <div className="space-y-2">
            <label className="text-base font-medium text-[#666] font-alexandria">اسم المستخدم</label>
            <TextInput
              type="text"
              error={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-[#EE1D52] font-alexandria">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-[#666] font-alexandria">كلمة المرور</label>
              <PasswordToggle
                visible={passwordVisible}
                onToggle={() => setPasswordVisible(!passwordVisible)}
              />
            </div>
            <TextInput
              type={passwordVisible ? "text" : "password"}
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-[#EE1D52] font-alexandria">{errors.password.message}</p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[56px] rounded-[40px] bg-[rgba(17,17,17,0.25)] hover:bg-[rgba(17,17,17,0.35)] text-white text-lg font-semibold font-alexandria transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          >
            {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>

          <div className="relative my-8 text-center before:absolute before:inset-0 before:top-1/2 before:h-px before:bg-gray-200">
            <span className="relative bg-[#FAFAFA] px-4 text-sm text-gray-400 font-semibold font-alexandria">أو سجل باستخدام</span>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-alexandria"
            >
              <Image src="/figma/Social media logo.svg" alt="Google" width={24} height={24} />
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-alexandria"
            >
              <Image src="/figma/Social media logo facebook.svg" alt="Facebook" width={24} height={24} />
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-alexandria"
            >
              <Image src="/figma/ic_round-apple.svg" alt="Apple" width={24} height={24} />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#666666] font-alexandria">
              هل لديك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onSwitchToLogin) {
                    onSwitchToLogin();
                  }
                }}
                className="text-[#6155f5] hover:underline font-semibold font-alexandria"
              >
                سجّل الدخول
              </button>
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
}
