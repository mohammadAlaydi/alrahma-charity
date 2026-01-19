"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function CompleteProfileModal() {
    const [open, setOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user as any);

    useEffect(() => {
        // Determine if profile is incomplete
        // Checks: phone, country, birthDate. Name and email are usually present from signup/login.
        if (user) {
            const isProfileIncomplete = !user.phone || !user.country || !user.birthDate;
            if (isProfileIncomplete) {
                setOpen(true);
            }
        }
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="w-full max-w-[480px] mx-auto rounded-[24px] bg-white p-8 md:p-10 font-alexandria text-center" dir="rtl">
                <h2 className="text-2xl font-bold text-[#333333] mb-4">أكمل ملفك الشخصي</h2>
                <p className="text-gray-600 mb-8">
                    أهلاً بك! يرجى إكمال بيانات ملفك الشخصي (الاسم الكامل، تاريخ الميلاد، الدولة، ورقم الهاتف) للاستفادة من كافة مميزات المنصة.
                </p>
                <Button
                    onClick={handleClose}
                    className="w-full h-[56px] rounded-[40px] bg-[#007F5E] hover:bg-[#005F4A] text-white text-lg font-semibold"
                >
                    حسنًا، سأكملها الآن
                </Button>
            </div>
        </Modal>
    );
}
