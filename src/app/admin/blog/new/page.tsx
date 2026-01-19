"use client";

import { Button } from "@/components/ui/Button";
import {
    Image as ImageIcon,
    Bold, Italic, Underline,
    AlignLeft, AlignCenter, AlignRight,
    Link as LinkIcon, List, MoreVertical,
    Calendar
} from "lucide-react";

export default function BlogEditorPage() {
    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
            {/* Main Editor Area (Right side in RTL) */}
            <div className="flex-1 bg-white rounded-[20px] p-8 shadow-sm overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[#122F2A]">مساحة عمل المحرر</h1>
                </div>

                <div className="space-y-6">
                    {/* Title Input */}
                    <input
                        type="text"
                        placeholder="اضف عنوان المقال ...."
                        className="w-full text-3xl font-bold text-[#122F2A] placeholder-[#122F2A]/30 border-none focus:ring-0 p-0"
                    />

                    {/* Editor Toolbar */}
                    <div className="flex items-center gap-1 border-y border-[#EBEBEB] py-2">
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><Bold className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><Italic className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><Underline className="h-4 w-4" /></button>
                        <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><AlignRight className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><AlignCenter className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><AlignLeft className="h-4 w-4" /></button>
                        <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                        <button className="p-2 hover:bg-zinc-100 rounded text-zinc-500"><LinkIcon className="h-4 w-4" /></button>
                    </div>

                    {/* Cover Image Placeholder */}
                    <div className="border-2 border-dashed border-[#EBEBEB] rounded-xl h-48 flex flex-col items-center justify-center text-[#007F5E] cursor-pointer hover:bg-[#007F5E]/5 transition-colors">
                        <ImageIcon className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">إضافة صورة الغلاف</span>
                    </div>

                    {/* Content Area Placeholder */}
                    <div className="h-[200px] text-[#122F2A]/80 text-lg leading-relaxed space-y-4">
                        <p>ما هي معايير اختيار أفضل الجمعيات الخيرية لمساعدة أهل غزة؟</p>
                        <p className="text-base text-zinc-500">يعتقد الكثير من الناس أن التبرع لأي جهة خيرية يعني بالضرورة أن الأموال ستصل إلى المحتاجين. لكن الواقع يظهر أن هناك تفاوتاً كبيراً في كفاءة وموثوقية الجمعيات...</p>
                    </div>
                </div>
            </div>

            {/* Status Bar / Sidebar (Left side in RTL) */}
            <div className="w-full md:w-[320px] flex-shrink-0 bg-white rounded-[20px] p-6 shadow-sm overflow-y-auto h-full">
                <h2 className="text-lg font-bold text-[#122F2A] mb-6">شريط الحالة</h2>

                <div className="flex gap-2 mb-8">
                    <Button className="flex-1 bg-[#007F5E] hover:bg-[#006e51] text-white">نشر</Button>
                    <Button variant="outline" className="flex-1 border-[#EBEBEB] text-[#122F2A] hover:bg-zinc-50">مسودة</Button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#122F2A] mb-2">التنظيم</label>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-zinc-400 mb-1 block">مؤلف</label>
                                <select className="w-full rounded-lg border-[#EBEBEB] text-sm text-[#122F2A] focus:border-[#007F5E] focus:ring-[#007F5E]">
                                    <option>ASSEM MOH.</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 mb-1 block">فئة</label>
                                <select className="w-full rounded-lg border-[#EBEBEB] text-sm text-[#122F2A] focus:border-[#007F5E] focus:ring-[#007F5E]">
                                    <option>تبرعات</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#122F2A] mb-2">العلامات</label>
                        <div className="flex flex-wrap gap-2 p-2 border border-[#EBEBEB] rounded-lg min-h-[40px]">
                            <span className="bg-[#F8F6F1] text-[#122F2A] px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                مجتمع <span className="cursor-pointer hover:text-red-500">×</span>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#122F2A] mb-2">تاريخ</label>
                        <div className="relative">
                            <input type="date" className="w-full rounded-lg border-[#EBEBEB] text-sm text-[#122F2A] focus:border-[#007F5E] focus:ring-[#007F5E]" defaultValue="2023-10-01" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#EBEBEB]">
                        <h3 className="font-medium text-[#122F2A] mb-4">إعدادات تحسين محركات البحث</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-zinc-400 mb-1 block">URL SLUG</label>
                                <input type="text" className="w-full rounded-lg border-[#EBEBEB] text-xs text-[#122F2A]" defaultValue="BUILDING-SUSTAINABLE-COMMUNITIES" />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 mb-1 block">وصف ميتا</label>
                                <textarea className="w-full rounded-lg border-[#EBEBEB] text-xs text-[#122F2A] h-24 resize-none" defaultValue="يعتقد الكثير من الناس أن التبرع لأي جهة خيرية يعني بالضرورة..." />
                                <div className="text-[10px] text-zinc-400 text-left mt-1">142/160</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
