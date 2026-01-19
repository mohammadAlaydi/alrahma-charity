"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal/Modal";

export default function PaymentMethodsPage() {
    const [activeModal, setActiveModal] = useState<'add' | 'update' | null>(null);

    return (
        <div className="space-y-6">
            <div className="text-center md:text-right mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">طرق الدفع المحفوظة الخاصة بك</h1>
                <p className="text-zinc-500 mt-2">
                    قم بتحديث أو إدارة بطاقاتك في أي وقت. لن تنقطع تبرعاتك أبدًا.
                </p>
            </div>

            <div className="space-y-4">
                {/* Visa Card */}
                <div className="flex flex-col md:flex-row items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                        {/* Card Icon */}
                        <div className="h-10 w-16 bg-blue-700 rounded text-white flex items-center justify-center font-bold italic text-sm">
                            VISA
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1 text-center md:text-right">
                            <span className="font-semibold text-zinc-900">Visa تنتهي بـ 4589</span>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-xs text-zinc-500">Expires 12/26</span>
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                    فعال
                                </span>
                                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                                    افتراضي
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9"
                                onClick={() => setActiveModal('update')}
                            >
                                تحديث
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mastercard */}
                <div className="flex flex-col md:flex-row items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                        <div className="h-10 w-16 flex items-center justify-center">
                            {/* Simple Mastercard Circles simulation using divs */}
                            <div className="relative flex items-center justify-center">
                                <div className="h-8 w-8 rounded-full bg-red-500/80 -mr-3 z-10"></div>
                                <div className="h-8 w-8 rounded-full bg-yellow-500/80 z-0"></div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1 text-center md:text-right">
                            <span className="font-semibold text-zinc-900">بطاقة ماستركارد تنتهي بالرقم 8899</span>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-xs text-zinc-500">Expires 12/26</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                            <Button variant="ghost" size="sm" className="h-9 text-zinc-500 hover:text-zinc-900">
                                تعيين كافتراضي
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-rose-600">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Button */}
            <button
                onClick={() => setActiveModal('add')}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
                <Plus className="h-5 w-5" />
                إضافة طريقة دفع جديدة
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-8">
                <span className="h-4 w-4 rounded-full border border-zinc-300 flex items-center justify-center">🛡️</span>
                يتم تشفير كافة معلومات الدفع بالكامل وتخزينها بشكل آمن من قبل شريك الدفع لدينا.
            </div>

            <Modal open={!!activeModal} onClose={() => setActiveModal(null)}>
                <div className="bg-white rounded-3xl p-6 md:p-8 w-full shadow-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-zinc-900">
                            {activeModal === 'add' ? 'أدخل معلومات البطاقة' : 'تحديث معلومات البطاقة'}
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 text-right block">الاسم</label>
                            <Input
                                placeholder="اسم صاحب البطاقة"
                                className="text-right h-12 bg-white border-zinc-200"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-900 text-right block mb-2">معلومات البطاقة</label>
                            <Input
                                placeholder="1234 1234 1234 1234"
                                className="text-right h-12 bg-white border-zinc-200 mb-3"
                                dir="ltr"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="MM/YY"
                                    className="text-center h-12 bg-white border-zinc-200"
                                    dir="ltr"
                                />
                                <Input
                                    placeholder="CVV"
                                    className="text-center h-12 bg-white border-zinc-200"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-base font-bold mt-4"
                            onClick={() => setActiveModal(null)}
                        >
                            {activeModal === 'add' ? 'حفظ' : 'حفظ التغييرات'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
