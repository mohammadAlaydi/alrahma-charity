"use client";

import { useState } from "react";
import { AdminFormDrawer, AdminInput, AdminSelect, AdminImageUpload, AdminTextArea } from "@/components/admin/AdminComponents";
import { Plus, Calendar as CalendarIcon, Trash2, Pencil, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/modal/Modal";
import Image from "next/image";

// Mock Data
const campaigns = [
    {
        id: 1,
        name: "مبادرة المياه النظيفة",
        subtitle: "بنية تحتية",
        type: "حملة طبية",
        target: "20,000",
        collected: "12,500",
        progress: 65,
        status: "نشيط",
        description: "حملة تهدف إلى توفير مياه شرب نظيفة وآمنة للمجتمعات المحرومة التي تعاني من شح المياه، من خلال حفر الآبار وبناء محطات تحلية صغيرة.",
        startDate: "01/01/2024",
        endDate: "31/12/2024",
        image: "https://images.unsplash.com/photo-1541913299-b5f12e792d8e?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "مبادرة المياه النظيفة",
        subtitle: "بنية تحتية",
        type: "حملة طبية",
        target: "20,000",
        collected: "19,500",
        progress: 96,
        status: "تنتهي قريبا",
        description: "حملة تهدف إلى توفير مياه شرب نظيفة وآمنة للمجتمعات المحرومة التي تعاني من شح المياه، من خلال حفر الآبار وبناء محطات تحلية صغيرة.",
        startDate: "01/01/2024",
        endDate: "01/02/2024",
        image: "https://images.unsplash.com/photo-1541913299-b5f12e792d8e?q=80&w=200&auto=format&fit=crop"
    }
];

export default function CampaignsPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<any>(null);
    const [viewingCampaign, setViewingCampaign] = useState<any>(null);

    const handleAdd = () => {
        setEditingCampaign(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (campaign: any) => {
        setEditingCampaign(campaign);
        setIsSheetOpen(true);
    };

    const handleView = (campaign: any) => {
        setViewingCampaign(campaign);
    };

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full relative flex-1 w-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة الحملات</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">لوحة التحكم / إدارة الحملات</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#007F5E] hover:bg-[#006e51] gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة حملة
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">اسم الحملة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">نوع الحملة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">المجمعة / الهدف</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">تقدم</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">حالة</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors">
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>
                            <div className="col-span-3">
                                <p className="font-bold text-[#122F2A] text-sm">{campaign.name}</p>
                                <p className="text-[#122F2A]/40 text-xs mt-0.5">{campaign.subtitle}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[#122F2A]/60 text-sm">{campaign.type}</p>
                            </div>
                            <div className="col-span-2">
                                <p dir="ltr" className="font-bold text-[#122F2A] text-sm text-right">${campaign.target} / <span className="text-[#122F2A]/40">${campaign.collected}k</span></p>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1.5 justify-center">
                                <div className="flex items-center justify-between text-xs w-[60%]">
                                    <span className="font-bold text-[#122F2A]">{campaign.collected}</span>
                                    <span className="text-[#122F2A]/40">{campaign.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden w-[60%]">
                                    <div className="h-full bg-[#007F5E] rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <span className={`font-medium text-sm flex items-center gap-1.5 ${campaign.status === 'نشيط' ? 'text-[#007F5E]' : 'text-[#F2C94C]'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'نشيط' ? 'bg-[#007F5E]' : 'bg-[#F2C94C]'}`}></span>
                                    {campaign.status}
                                </span>
                            </div>
                            <div className="col-span-1 flex items-center gap-3 text-[#122F2A]/40">
                                <button className="hover:text-[#122F2A] transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleEdit(campaign)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleView(campaign)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Campaign Drawer */}
            <AdminFormDrawer
                title={editingCampaign ? "تعديل الحملة" : "حملة جديدة"}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            >
                <div className="space-y-5" key={editingCampaign ? editingCampaign.id : 'new'}>
                    <AdminInput
                        label="اسم الحملة"
                        placeholder="اكتب اسم الحملة"
                        defaultValue={editingCampaign?.name}
                    />

                    <AdminTextArea
                        label="الوصف"
                        placeholder=""
                        rows={4}
                        defaultValue={editingCampaign?.description}
                    />

                    <AdminImageUpload label="صورة" />

                    <div className="grid grid-cols-2 gap-4">
                        <AdminInput
                            label="المبلغ المستهدف ($)"
                            placeholder="المبلغ المستهدف ($)"
                            defaultValue={editingCampaign?.target}
                        />

                        <AdminSelect
                            label="نوع الحملة"
                            placeholder="اختار نوع الحملة"
                            options={["الحملات الطبية", "إغاثة عاجلة", "بنية تحتية"]}
                            defaultValue={editingCampaign?.type}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#122F2A] text-right">تاريخ البدء</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="mm/dd/yyyy"
                                    defaultValue={editingCampaign?.startDate}
                                    className="w-full h-11 rounded-lg border border-[#EBEBEB] bg-white text-right px-4 pr-10 focus:ring-1 focus:ring-[#007F5E] focus:border-[#007F5E] outline-none placeholder:text-zinc-400 text-sm"
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#122F2A] text-right">تاريخ الانتهاء</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="mm/dd/yyyy"
                                    defaultValue={editingCampaign?.endDate}
                                    className="w-full h-11 rounded-lg border border-[#EBEBEB] bg-white text-right px-4 pr-10 focus:ring-1 focus:ring-[#007F5E] focus:border-[#007F5E] outline-none placeholder:text-zinc-400 text-sm"
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminFormDrawer>

            {/* View Details Modal */}
            <Modal
                open={!!viewingCampaign}
                onClose={() => setViewingCampaign(null)}
                className="max-w-4xl"
            >
                <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-xl w-full flex flex-col font-cairo overflow-hidden relative">
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                        style={{
                            backgroundImage: 'url("/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                    />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-[#F2F2F2] pb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setViewingCampaign(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-6 w-6 text-gray-500" />
                                </button>
                                <h2 className="text-2xl font-bold text-[#122F2A]">تفاصيل الحملة</h2>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${viewingCampaign?.status === 'نشيط' ? 'bg-[#007F5E]/10 text-[#007F5E]' : 'bg-[#F2C94C]/10 text-[#F2C94C]'}`}>
                                    {viewingCampaign?.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Right Side: Image */}
                            <div className="col-span-1">
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
                                    {viewingCampaign && (
                                        <Image
                                            src={viewingCampaign.image}
                                            alt={viewingCampaign.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Left Side: Details */}
                            <div className="col-span-2 space-y-6 text-right">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">اسم الحملة</h3>
                                        <p className="text-xl font-bold text-[#122F2A]">{viewingCampaign?.name}</p>
                                        <p className="text-sm text-[#122F2A]/60">{viewingCampaign?.subtitle}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">نوع الحملة</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingCampaign?.type}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">المبلغ المستهدف</h3>
                                        <p dir="ltr" className="text-lg font-bold text-[#122F2A] text-right">${viewingCampaign?.target}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">المبلغ المجمع</h3>
                                        <p dir="ltr" className="text-lg font-bold text-[#122F2A] text-right">${viewingCampaign?.collected}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ البدء</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingCampaign?.startDate}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ الانتهاء</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingCampaign?.endDate}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-2">التقدم</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-3 bg-[#EBEBEB] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#007F5E] rounded-full transition-all duration-500"
                                                    style={{ width: viewingCampaign ? `${viewingCampaign.progress}%` : '0%' }}
                                                ></div>
                                            </div>
                                            <span className="font-bold text-[#122F2A]">{viewingCampaign?.progress}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-[#F2F2F2] pt-6">
                                    <h3 className="text-sm font-medium text-[#122F2A]/60 mb-2">الوصف</h3>
                                    <p className="text-[#122F2A]/80 leading-relaxed">
                                        {viewingCampaign?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
