"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/cn";

import { AuthCard } from "../_components/AuthCard";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { addToast } from "@/store/slices/notificationsSlice";
import { useAppDispatch } from "@/store/hooks";
import { loginSchema, type LoginValues } from "@/schemas/auth";

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

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const email = watch("email");
  const password = watch("password");
  const hasInputs = Boolean(email && password);

  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    const callbackUrl = "/dashboard";
    
    const res = await signIn("credentials", {
      redirect: true,
      callbackUrl: callbackUrl,
      email: values.email,
      password: values.password,
    });

    // If redirect is true, signIn will handle the redirect
    // If there's an error, it won't redirect
    if (res?.error) {
      dispatch(addToast({ type: "error", message: "بيانات الدخول غير صحيحة" }));
    }
  });

  return (
    <AuthCard
      title="تسجيل الدخول"
      titleClassName="text-[24px] font-medium leading-[24px]"
      subtitle={
        <span className="font-regular text-[18px] leading-[20px] text-[#333333]">
          ليس لديك حساب؟{" "}
          <Link
            href="/signup"
            className="font-regular text-[18px] leading-[20px] text-[#6155f5] hover:underline"
          >
            سجل الآن
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Phone/Email field */}
        <div className="space-y-1">
          <div className="flex items-center justify-end">
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
          {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>
    </AuthCard>
  );
}
