"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthCard } from "../_components/AuthCard";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { addToast } from "@/store/slices/notificationsSlice";
import { useAppDispatch } from "@/store/hooks";
import { signupSchema, type SignupValues } from "@/schemas/auth";

function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="flex h-6 items-center gap-1.5">
      <span className="text-[22px] leading-[22px] text-[#666666]/80">
        {visible ? "إخفاء" : "إظهار"}
      </span>
      {visible ? (
        <EyeOff className="h-6 w-6 shrink-0 text-[#666666]/80" strokeWidth={1} />
      ) : (
        <Eye className="h-6 w-6 shrink-0 text-[#666666]/80" strokeWidth={1} />
      )}
    </button>
  );
}

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit(async () => {
    // Placeholder: call backend register endpoint then sign in.
    dispatch(addToast({ type: "success", message: "تم إنشاء الحساب (تجريبي)" }));
  });

  return (
    <AuthCard
      title="إنشاء حساب"
      titleClassName="text-[24px] font-medium leading-[24px]"
      subtitle={
        <span className="font-regular text-[18px] leading-[20px] text-[#333333]">
          هل لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="font-regular text-[18px] leading-[20px] text-[#6155f5] hover:underline"
          >
            سجّل الدخول
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span></span>
            <label htmlFor="email" className="text-[20px] leading-[20px] text-[#666666]">
              اسم المستخدم
            </label>
          </div>
          <TextInput id="email" error={Boolean(errors.email)} {...register("email")} />
          {errors.email?.message && (
            <p className="text-[17px] leading-[17px] text-[#EE1D52]">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <PasswordToggle
                visible={passwordVisible}
                onToggle={() => setPasswordVisible((v) => !v)}
              />
              <label htmlFor="password" className="text-[20px] leading-[20px] text-[#666666]">
                كلمة المرور
              </label>
            </div>
            <TextInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              error={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-[17px] leading-[17px] text-[#EE1D52]">{errors.password.message}</p>
            )}
          </div>
          <Link
            href="#"
            className="block text-[20px] leading-[20px] text-[#111111] hover:underline"
          >
            نسيت كلمة المرور الخاصة بك
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant={undefined}
          className="h-16 w-full rounded-[40px] !bg-[rgba(0,0,0,0.25)] text-[22px] leading-[22px] !text-[#FFFFFF] hover:!bg-[rgba(0,0,0,0.35)] disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
        </Button>
      </form>
    </AuthCard>
  );
}
