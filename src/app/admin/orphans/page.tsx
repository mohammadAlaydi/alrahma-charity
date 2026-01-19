"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed

import { useState, useEffect } from "react";
import { AdminFormDrawer, AdminInput, AdminSelect, AdminImageUpload, AdminTextArea } from "@/components/admin/AdminComponents";
import { Plus, Eye, Pencil, Trash2, Search, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Modal } from "@/components/ui/modal/Modal";
import { ConfirmationModal } from "@/components/ui/modal/ConfirmationModal";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import Image from "next/image";
import { get, post, put, del } from "@/services/http";

// CRUD Operations
async function fetchOrphans() {
    const data = await get<{ success: boolean, data: any[] }>('/orphans');
    return data;
}

async function createOrphan(orphan: any) {
    const data = await post('/orphans', orphan);
    return data;
}

async function updateOrphan({ id, data }: { id: string; data: any }) {
    const response = await put(`/orphans/${id}`, data);
    return response;
}

async function deleteOrphan(id: string) {
    const data = await del(`/orphans/${id}`);
    return data;
}

const ITEMS_PER_PAGE = 8;

export default function OrphansPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingOrphan, setEditingOrphan] = useState<any>(null);
    const [viewingOrphan, setViewingOrphan] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [orphanToDelete, setOrphanToDelete] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        country: "فلسطين",
        type: "الرعاية الكاملة",
        status: "نشيط",
        story: "",
        avatar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=150&auto=format&fit=crop"
    });

    const queryClient = useQueryClient();

    const { data: apiResponse, isLoading } = useQuery({
        queryKey: ['orphans'],
        queryFn: fetchOrphans,
    });

    // Sync form data with editingOrphan
    useEffect(() => {
        if (editingOrphan) {
            setFormData({
                name: editingOrphan.name || "",
                age: editingOrphan.age || "",
                country: editingOrphan.country || "",
                status: editingOrphan.status || "نشيط",
                type: editingOrphan.type || "الرعاية الكاملة",
                story: editingOrphan.story || "",
                // Use empty string if avatar is missing/empty, do NOT fallback to unsplash
                avatar: (editingOrphan.avatar && editingOrphan.avatar !== 'null' && editingOrphan.avatar !== 'undefined') ? editingOrphan.avatar : ""
            });
        } else {
            // Reset form
            setFormData({
                name: "",
                age: "",
                country: "",
                status: "",
                type: "",
                story: "",
                avatar: ""
            });
        }
    }, [editingOrphan]);

    const createMutation = useMutation({
        mutationFn: createOrphan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orphans'] });
            setIsSheetOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateOrphan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orphans'] });
            setIsSheetOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOrphan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orphans'] });
        },
    });



    const orphans = apiResponse?.data || [];

    const totalPages = Math.ceil(orphans.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentOrphans = orphans.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleAdd = () => {
        setEditingOrphan(null);
        setFormData({
            name: "",
            age: "",
            country: "فلسطين",
            type: "",
            status: "",
            story: "",
            avatar: "" // Start empty
        });
        setIsSheetOpen(true);
    };

    const handleEdit = (orphan: any) => {
        setEditingOrphan(orphan);
        setFormData({
            name: orphan.name,
            age: orphan.age || "", // Ensure string
            country: orphan.country || "فلسطين",
            type: orphan.type || "الرعاية الكاملة",
            status: orphan.status || "نشيط",
            story: orphan.story || "",
            avatar: (orphan.avatar && orphan.avatar !== 'null' && orphan.avatar !== 'undefined') ? orphan.avatar : ""
        });
        setIsSheetOpen(true);
    };

    const handleDelete = (id: string) => {
        setOrphanToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (orphanToDelete) {
            deleteMutation.mutate(orphanToDelete);
        }
    };

    const handleSubmit = () => {
        const dataToSubmit = {
            ...formData,
        };

        if (editingOrphan) {
            updateMutation.mutate({ id: editingOrphan._id, data: dataToSubmit });
        } else {
            createMutation.mutate(dataToSubmit);
        }
    };

    const handleView = (orphan: any) => {
        setViewingOrphan(orphan);
    };

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full flex-1 w-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة الأيتام</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">إدارة ملفات تعريف المستفيدين وحالتهم</p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl px-6 py-2 h-12 gap-2 font-bold"
                >
                    <Plus className="h-5 w-5" />
                    إضافة يتيم
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">الاسم / الهوية</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">العمر / البلد</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">نوع الرعاية</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">حالة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {currentOrphans.map((orphan: any, i: number) => (
                        <div
                            key={orphan._id}
                            className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors"
                        >
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>

                            {/* Name / ID */}
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#EBEBEB]">
                                    {orphan.avatar ? (
                                        <Image
                                            src={orphan.avatar}
                                            alt={orphan.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#007F5E]/10 flex items-center justify-center text-[#007F5E] font-bold text-lg">
                                            {orphan.name.charAt(0).toLowerCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-[#122F2A] text-sm">{orphan.name}</p>
                                    <p className="text-[#122F2A]/40 text-xs mt-0.5" dir="rtl">الرقم المرجعي: {orphan.refId}</p>
                                </div>
                            </div>

                            {/* Age / Country */}
                            <div className="col-span-2">
                                <p className="font-bold text-[#122F2A] text-sm">{orphan.age}</p>
                                <p className="text-[#122F2A]/40 text-xs mt-0.5">{orphan.country}</p>
                            </div>

                            {/* Sponsorship Type - New Column */}
                            <div className="col-span-2">
                                <p className="font-medium text-[#122F2A] text-sm">{orphan.type}</p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                <span className="text-[#007F5E] font-medium text-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#007F5E]"></span>
                                    {orphan.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 flex items-center gap-3 text-[#122F2A]/40">
                                <button onClick={() => handleDelete(orphan._id)} className="hover:text-[#122F2A] transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleEdit(orphan)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleView(orphan)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="text-sm text-[#122F2A]/60">
                    عرض {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, orphans.length)} من {orphans.length}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="h-9 w-9 p-0 border-[#EBEBEB] text-[#122F2A] hover:bg-gray-50"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-[#122F2A]">
                        صفحة {currentPage} من {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="h-9 w-9 p-0 border-[#EBEBEB] text-[#122F2A] hover:bg-gray-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Orphan Drawer */}
            <AdminFormDrawer
                title={editingOrphan ? "تعديل بيانات اليتيم" : "إضافة يتيم جديد"}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            >
                <div className="space-y-5">
                    {/* Full Name */}
                    <AdminInput
                        label="الاسم الكامل"
                        placeholder="اكتب الاسم الكامل"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    {/* Age & Country */}
                    <div className="grid grid-cols-2 gap-4">
                        <AdminInput
                            label="العمر"
                            placeholder="اكتب العمر"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <AdminSelect
                            label="الدولة"
                            placeholder="اختر الدولة"
                            options={["-", "فلسطين", "الأردن", "سوريا", "لبنان"]}
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>

                    {/* Image */}
                    <AdminImageUpload
                        label="صورة اليتيم"
                        value={formData.avatar}
                        onChange={(val) => setFormData({ ...formData, avatar: val })}
                    />

                    {/* Description */}
                    <AdminTextArea // Description field
                        label="الوصف / القصة"
                        rows={4}
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    />

                    {/* Sponsorship Type */}
                    <AdminSelect
                        label="نوع الرعاية"
                        placeholder="اختر نوع الرعاية"
                        options={["-", "الرعاية الكاملة", "كفالة جزئية", "كفالة تعليمية"]}
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />

                    {/* Status */}
                    <AdminSelect
                        label="الحالة"
                        placeholder="اختر الحالة"
                        options={["نشيط", "قائمة الانتظار", "مكفول"]}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="w-full h-12 text-md font-bold bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl mt-4"
                    >
                        {createMutation.isPending || updateMutation.isPending ? "جاري الحفظ..." : "حفظ"}
                    </Button>
                </div>
            </AdminFormDrawer>

            {/* View Details Modal */}
            <Modal
                open={!!viewingOrphan}
                onClose={() => setViewingOrphan(null)}
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
                                    onClick={() => setViewingOrphan(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-6 w-6 text-gray-500" />
                                </button>
                                <h2 className="text-2xl font-bold text-[#122F2A]">تفاصيل اليتيم</h2>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-[#007F5E]/10 text-[#007F5E] px-4 py-1.5 rounded-full text-sm font-bold">
                                    {viewingOrphan?.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Right Side: Image */}
                            <div className="col-span-1">
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
                                    {viewingOrphan && (
                                        viewingOrphan.avatar ? (
                                            <Image
                                                src={viewingOrphan.avatar}
                                                alt={viewingOrphan.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#007F5E]/10 flex items-center justify-center text-[#007F5E] font-bold text-5xl">
                                                {viewingOrphan.name.charAt(0).toLowerCase()}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Left Side: Details */}
                            <div className="col-span-2 space-y-6 text-right">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الاسم الكامل</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingOrphan?.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الرقم المرجعي</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingOrphan?.refId}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">العمر</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingOrphan?.age}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الدولة</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingOrphan?.country}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">نوع الرعاية</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">الرعاية الكاملة</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ الانضمام</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">01/01/2024</p>
                                    </div>
                                </div>

                                <div className="border-t border-[#F2F2F2] pt-6">
                                    <h3 className="text-sm font-medium text-[#122F2A]/60 mb-2">نبذة عن اليتيم</h3>
                                    <p className="text-[#122F2A]/80 leading-relaxed">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. هذا اليتيم بحاجة ماسة إلى الرعاية والدعم لمواصلة تعليمه وحياته الكريمة.
                                        يتميز بالتفوق الدراسي وحب التعلم.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setOrphanToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="حذف اليتيم"
                message="هل أنت متأكد من حذف هذا اليتيم؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                cancelText="إلغاء"
                isDestructive
            />
        </div>
    );
}
