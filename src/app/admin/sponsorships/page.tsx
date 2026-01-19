"use client";

import { useState } from "react";
import { AdminFormDrawer, AdminInput, AdminSelect, AdminImageUpload } from "@/components/admin/AdminComponents";
import { Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/modal/Modal";
import Link from "next/link";
import Image from "next/image";

// Mock Data matching the screenshot
const sponsorships = [
    {
        id: 1,
        orphanName: "خالد احمد",
        sponsorName: "احمد خالد",
        amount: "50",
        currency: "$",
        frequency: "شهريا",
        startDate: "Jan 12, 2024",
        status: "نشيط",
        image: "/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg" // Placeholder image
    },
    // Adding a few more for better visualization
    {
        id: 2,
        orphanName: "سارة محمد",
        sponsorName: "فاطمة علي",
        amount: "50",
        currency: "$",
        frequency: "شهريا",
        startDate: "Jan 15, 2024",
        status: "نشيط",
        image: "/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg"
    },
    {
        id: 3,
        orphanName: "عمر يوسف",
        sponsorName: "محمد حسن",
        amount: "50",
        currency: "$",
        frequency: "شهريا",
        startDate: "Jan 20, 2024",
        status: "نشيط",
        image: "/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg"
    }
];

export default function SponsorshipsPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<typeof sponsorships[0] | null>(null);
    const [viewingItem, setViewingItem] = useState<typeof sponsorships[0] | null>(null);

    const handleEdit = (item: typeof sponsorships[0]) => {
        setEditingItem(item);
        setIsSheetOpen(true);
    };

    const handleCreate = () => {
        setEditingItem(null);
        setIsSheetOpen(true);
    };

    const handleCloseSheet = () => {
        setIsSheetOpen(false);
        setTimeout(() => setEditingItem(null), 300); // Clear after animation
    };

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full relative flex-1 w-full flex flex-col font-cairo">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة الرعاية</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">تتبع الدعم الشهري المتكرر</p>
                </div>
                <Button onClick={handleCreate} className="bg-[#007F5E] hover:bg-[#006e51] gap-2 rounded-xl h-11 px-6 font-bold">
                    <Plus className="h-5 w-5" />
                    إضافة الرعاية
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">اسم اليتيم</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">الراعي</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">المبلغ الشهري</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">تاريخ البدء</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">الحالة</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {sponsorships.map((item) => (
                        <div key={item.id} className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors">
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>
                            <div className="col-span-3">
                                <p className="font-bold text-[#122F2A] text-sm">{item.orphanName}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[#122F2A]/60 text-sm">{item.sponsorName}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="font-bold text-[#122F2A] text-sm dir-ltr">{item.currency}{item.amount}.00</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[#122F2A]/60 text-sm dir-ltr">{item.startDate}</span>
                            </div>
                            <div className="col-span-1">
                                <span className="font-medium text-sm flex items-center gap-1.5 text-[#007F5E]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#007F5E]"></span>
                                    {item.status}
                                </span>
                            </div>
                            <div className="col-span-1 flex items-center gap-3 text-[#122F2A]/40">
                                <button className="hover:text-[#122F2A] transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleEdit(item)} className="hover:text-[#122F2A] transition-colors">
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button onClick={() => setViewingItem(item)} className="hover:text-[#122F2A] transition-colors">
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registration/Edit Drawer */}
            <AdminFormDrawer
                title={editingItem ? "تعديل الرعاية" : "تسجيلات الرعاية"}
                isOpen={isSheetOpen}
                onClose={handleCloseSheet}
            >
                <div className="space-y-6" key={editingItem?.id || 'new'}>
                    <AdminInput
                        label="يتيم"
                        placeholder="اكتب اسم اليتيم"
                        defaultValue={editingItem?.orphanName}
                    />

                    <AdminInput
                        label="اسم الراعي"
                        placeholder="اكتب اسم الراعي"
                        defaultValue={editingItem?.sponsorName}
                    />

                    <AdminImageUpload label="صورة" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#122F2A] text-right">المبلغ</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full h-12 rounded-xl border border-[#EBEBEB] bg-white text-right px-4 focus:ring-1 focus:ring-[#007F5E] outline-none placeholder:text-zinc-400"
                                    placeholder="0"
                                    defaultValue={editingItem?.amount}
                                />
                                <div className="absolute top-0 left-0 h-full w-10 flex flex-col border-r border-[#EBEBEB]">
                                    <button className="flex-1 hover:bg-zinc-50 rounded-tl-xl flex items-center justify-center text-[10px] text-zinc-500">▲</button>
                                    <button className="flex-1 hover:bg-zinc-50 rounded-bl-xl flex items-center justify-center text-[10px] text-zinc-500">▼</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#122F2A] text-right">تكرار</label>
                            {/* Custom Select styling to match standard input look */}
                            <div className="relative">
                                <select
                                    className="w-full h-12 rounded-xl border border-[#EBEBEB] bg-white px-4 text-right text-sm outline-none focus:ring-1 focus:ring-[#007F5E] appearance-none text-[#122F2A]"
                                    defaultValue={editingItem?.frequency}
                                >
                                    <option>شهريا</option>
                                    <option>سنويا</option>
                                </select>
                                <div className="absolute text-zinc-400 left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminFormDrawer>

            {/* View Popup (Modal) */}
            <Modal
                open={!!viewingItem}
                onClose={() => setViewingItem(null)}
                className="bg-white rounded-[30px] overflow-hidden max-w-md w-full"
            >
                {viewingItem && (
                    <div className="font-cairo">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#F2F2F2]">
                            <h3 className="text-xl font-bold text-[#122F2A]">تفاصيل الرعاية</h3>
                            <button onClick={() => setViewingItem(null)} className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                                <X className="h-4 w-4 text-zinc-500" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#EBEBEB]">
                                    <Image
                                        src={viewingItem.image}
                                        alt={viewingItem.orphanName}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h4 className="text-lg font-bold text-[#122F2A]">{viewingItem.orphanName}</h4>
                                <span className="text-[#007F5E] bg-[#007F5E]/10 px-3 py-1 rounded-full text-xs font-bold mt-2">{viewingItem.status}</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-[#F9F9F9]">
                                    <span className="text-[#122F2A]/60 text-sm">الراعي</span>
                                    <span className="font-bold text-[#122F2A]">{viewingItem.sponsorName}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-[#F9F9F9]">
                                    <span className="text-[#122F2A]/60 text-sm">المبلغ</span>
                                    <span className="font-bold text-[#122F2A] dir-ltr">{viewingItem.currency}{viewingItem.amount}.00</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-[#F9F9F9]">
                                    <span className="text-[#122F2A]/60 text-sm">التكرار</span>
                                    <span className="font-bold text-[#122F2A]">{viewingItem.frequency}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-[#F9F9F9]">
                                    <span className="text-[#122F2A]/60 text-sm">تاريخ البدء</span>
                                    <span className="font-bold text-[#122F2A] dir-ltr">{viewingItem.startDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
