import { Modal } from './Modal';
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    isDestructive = false
}: ConfirmationModalProps) {
    return (
        <Modal open={isOpen} onClose={onClose} title={title}>
            <div className="relative w-full max-w-[480px] mx-auto rounded-[24px] bg-[#FAFAFA] p-8 md:p-10 font-alexandria overflow-hidden" dir="rtl">
                {/* Decorative Background Image - Top Right */}
                <div className="absolute top-0 right-[-30px] w-[110px] h-[110px] pointer-events-none opacity-[1] overflow-hidden rotate-[180deg]">
                    <Image
                        src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 9.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
                {/* Decorative Background Image - Bottom Left */}
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
                <div className="relative mb-6 flex flex-col items-center gap-4 z-10">
                    <div className="relative h-20 w-20 flex items-center justify-center">
                        <Image
                            src="/figma/Logo.png"
                            alt="Alrahma"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-[#333333] font-alexandria">
                        {title}
                    </h2>
                    <p className="text-base text-[#666666] font-alexandria leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="relative z-10 flex flex-col gap-3">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={cn(
                            "w-full h-[56px] rounded-[40px] text-white text-lg font-semibold font-alexandria transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                            isDestructive
                                ? "bg-[#EE1D52] hover:bg-[#d41948]"
                                : "bg-[#007F5E] hover:bg-[#005F4A]"
                        )}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full h-[56px] rounded-[40px] border border-gray-200 bg-white text-[#666666] text-lg font-semibold font-alexandria hover:bg-gray-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
