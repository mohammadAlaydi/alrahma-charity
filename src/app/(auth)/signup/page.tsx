"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/cn";

import { AuthCard } from "../_components/AuthCard";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
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

import { useRouter } from "next/navigation";
import { useLoginModal } from "@/contexts/LoginContext";

export default function SignupPage() {
  const router = useRouter();
  const { openLoginModal } = useLoginModal();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const email = watch("email");
  const password = watch("password");
  const hasInputs = Boolean(email && password);

  const onSubmit = handleSubmit(async (values) => {
    try {
      // 1. Register User
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      dispatch(addToast({ type: "success", message: "تم إنشاء الحساب بنجاح" }));

      // 2. Auto Login
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (loginRes?.error) {
        dispatch(addToast({ type: "error", message: "فشل تسجيل الدخول التلقائي" }));
      } else {
        // Redirect logic handled by session or manual push
        router.push("/dashboard");
        router.refresh();
      }

    } catch (error: any) {
      dispatch(addToast({ type: "error", message: error.message }));
    }
  });

  return (
    <AuthCard
      title="إنشاء حساب"
      titleClassName="text-[24px] font-medium leading-[24px]"
      subtitle={
        <span className="font-regular text-[18px] leading-[20px] text-[#333333]">
          هل لديك حساب بالفعل؟{" "}
          <button
            type="button"
            onClick={() => {
              router.push('/');
              setTimeout(() => openLoginModal(), 100);
            }}
            className="font-regular text-[18px] leading-[20px] text-[#6155f5] hover:underline"
          >
            سجّل الدخول
          </button>
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
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant={undefined}
          className={cn(
            "h-16 w-full rounded-[40px] text-[22px] leading-[22px] !text-[#FFFFFF] disabled:opacity-50 transition-colors",
            hasInputs
              ? "!bg-[#007F5E] hover:!bg-[#005F4A]"
              : "!bg-[rgba(0,0,0,0.25)] hover:!bg-[rgba(0,0,0,0.35)]"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
        </Button>
      </form>
    </AuthCard>
  );
}
