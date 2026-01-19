"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Heart, Info, Edit } from "lucide-react";

export default function SponsorshipsPage() {
    return (
        <div className="space-y-8">


            <div className="text-center md:text-right mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">إدارة كفالتك</h1>
                <p className="text-zinc-500 mt-2">لطفاً يغير الحياة. أظهر كفالتك في أي وقت بسهولة</p>
            </div>

            <div className="overflow-hidden border border-emerald-100 rounded-xl">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-64 bg-zinc-100 flex-shrink-0 relative h-64 md:h-auto">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                            {/* Placeholder for Child Image */}
                            <div className="h-full w-full bg-zinc-200 flex items-center justify-center">
                                <span role="img" aria-label="child" className="text-4xl">👦</span>
                            </div>
                        </div>
                        {/* Heart Icon Overlay */}
                        <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-sm text-emerald-600">
                            <Heart className="h-5 w-5 fill-emerald-600" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8 space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-emerald-600 font-bold text-lg">❤ معلومات الطفل المكفول</span>
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                        نشط
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900">خالد أحمد</h2>
                                <div className="text-sm text-zinc-500 font-mono mt-1">الرقم المرجعي: SP-2024-4821</div>
                                <p className="text-sm text-zinc-600 mt-1">الطفل الذي تدعمه بكرمك</p>
                            </div>

                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Edit className="h-4 w-4" />
                                تعديل المبلغ
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                                    <Calendar className="h-3.5 w-3.5" />
                                    العمر
                                </div>
                                <div className="font-semibold text-zinc-900">8 سنوات</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                                    <MapPin className="h-3.5 w-3.5" />
                                    الدولة
                                </div>
                                <div className="font-semibold text-zinc-900">فلسطين</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                                    <Heart className="h-3.5 w-3.5" />
                                    النوع
                                </div>
                                <div className="font-semibold text-zinc-900">كفالة كاملة</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                                    <Calendar className="h-3.5 w-3.5" />
                                    تاريخ البدء
                                </div>
                                <div className="font-semibold text-zinc-900">15 يناير 2024</div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-100">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-zinc-900">
                                    $ 50.00 <span className="text-sm font-normal text-zinc-500">USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Impact Summary Box */}
                <div className="bg-emerald-600 rounded-xl p-6 text-white md:col-span-3 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-emerald-600/20">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-100">
                            <Heart className="h-5 w-5 fill-emerald-100" />
                            <span>تأثيرك حتى الآن</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">أنت تصنع فرقاً حقيقياً</h3>
                        <p className="text-emerald-100 opacity-90">لقد دعم كرمك 12 عائلة حتى الآن. شكراً لكونك سبباً للأمل.</p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold">$600</div>
                            <div className="text-xs opacity-75">إجمالي التبرعات</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">12</div>
                            <div className="text-xs opacity-75">حالات التبرعات</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
