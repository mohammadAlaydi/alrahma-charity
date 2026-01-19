"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { z } from "zod";
import { cn } from "@/lib/cn";

import { Modal } from "@/components/ui/modal/Modal";
import { TextInput } from "@/components/ui/TextInput";

interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
    onBack: () => void;
}

const forgotPasswordSchema = z.object({
    email: z.string().email("البريد الإلكتروني غير صحيح"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordModal({ open, onClose, onBack }: ForgotPasswordModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

    const email = watch("email");
    const hasInputs = Boolean(email);

    const onSubmit = handleSubmit(async (values) => {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
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

                {/* Back Button (Top Left) */}
                <button
                    onClick={onBack}
                    className="absolute left-6 top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors font-alexandria"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Close Button (Top Right - Optional if needed, but usually redundant with back in modal flows, keeping for consistency if desired or remove) */}
                {/* Using standard X for closing the whole flow */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors font-alexandria"
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
                        <h2 className="text-xl font-semibold text-[#333333] font-alexandria">
                            {isSubmitted ? "تم الإرسال بنجاح" : "نسيت كلمة المرور؟"}
                        </h2>
                        {!isSubmitted && (
                            <p className="mt-2 text-sm text-[#666666]">
                                أدخل بريدك الإلكتروني وسنرسل لك رابطًا لتعيين كلمة مرور جديدة.
                            </p>
                        )}
                    </div>
                </div>

                {isSubmitted ? (
                    <div className="text-center space-y-8 z-10 relative">
                        <p className="text-[#333333]">لقد أرسلنا رابط تعيين كلمة المرور إلى بريدك الإلكتروني.</p>
                        <button
                            onClick={onBack}
                            className="text-[#6155f5] hover:underline font-semibold"
                        >
                            العودة لتسجيل الدخول
                        </button>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="relative space-y-6 z-10 font-alexandria">
                        <div className="space-y-2">
                            <label className="text-base font-medium text-[#666] font-alexandria">البريد الإلكتروني</label>
                            <TextInput
                                type="text"
                                error={!!errors.email}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-[#EE1D52] font-alexandria">{errors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full h-[56px] rounded-[40px] text-white text-lg font-semibold font-alexandria transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                                hasInputs
                                    ? "bg-[#007F5E] hover:bg-[#005F4A]"
                                    : "bg-[rgba(17,17,17,0.25)] hover:bg-[rgba(17,17,17,0.35)]"
                            )}
                        >
                            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
}
