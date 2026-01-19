"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed

import { useState } from "react";
import { AdminFormDrawer, AdminInput, AdminSelect, AdminTextArea } from "@/components/admin/AdminComponents";
import { Plus, Trash2, Pencil, Eye, CheckCircle2, AlertCircle, XCircle, ChevronRight, ChevronLeft, Filter, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/modal/Modal";
import { ConfirmationModal } from "@/components/ui/modal/ConfirmationModal";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { get, del } from "@/services/http";

// CRUD Operations
async function fetchDonations() {
    const data = await get<{ success: boolean, data: any[] }>('/donations');
    return data;
}

async function deleteDonation(id: string) {
    const data = await del(`/donations/${id}`);
    return data;
}

const ITEMS_PER_PAGE = 8; // Adjust per page count as needed, 8 fits well usually

export default function DonationsPage() {
    const [viewingDonation, setViewingDonation] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [donationToDelete, setDonationToDelete] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { data: apiResponse, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: fetchDonations,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteDonation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donations'] });
        },
    });

    const handleDelete = (id: string) => {
        setDonationToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (donationToDelete) {
            deleteMutation.mutate(donationToDelete);
        }
    };

    const donations = apiResponse?.data || [];

    const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDonations = donations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleView = (donation: any) => {
        setViewingDonation(donation);
    };

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full relative flex-1 w-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة التبرعات</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">إدارة وتتبع ومراجعة جميع المساهمات الواردة.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-12 border-[#EBEBEB] hover:bg-gray-50 text-[#122F2A] px-4 rounded-xl gap-2">
                        <Upload className="h-5 w-5" />
                        <span>استيراد</span>
                    </Button>
                    <Button variant="outline" className="h-12 border-[#EBEBEB] hover:bg-gray-50 text-[#122F2A] px-4 rounded-xl gap-2">
                        <Download className="h-5 w-5" />
                        <span>تصدير</span>
                    </Button>
                </div>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] gap-4">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">المتبرع</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">التصنيف</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60 text-center">القيمة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60 text-center">طريقة الدفع</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60 text-center">تاريخ التبرع</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60 text-center">حالة</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60 text-center">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {currentDonations.map((donation: any) => (
                        <div key={donation._id} className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors gap-4">
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>
                            <div className="col-span-2">
                                <p className="font-bold text-[#122F2A] text-sm truncate" title={donation.donor.name}>{donation.donor.name}</p>
                                <p className="text-[#122F2A]/40 text-xs mt-0.5 truncate" title={donation.donor.email}>{donation.donor.email}</p>
                            </div>
                            <div className="col-span-1">
                                <span className="text-sm text-[#122F2A]">{donation.category}</span>
                            </div>
                            <div className="col-span-2 text-center">
                                <p className="font-bold text-[#122F2A] text-sm">${donation.amount}</p>
                                <p className="text-xs text-[#122F2A]/40">{donation.currency}</p>
                            </div>
                            <div className="col-span-2 flex justify-center">
                                {donation.paymentMethod.type === 'paypal' ? (
                                    <div className="text-[#003087] font-bold text-xs">PayPal</div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-8 bg-red-500/10 rounded px-1 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60 -mr-1 mix-blend-multiply"></div>
                                            <div className="w-2 h-2 rounded-full bg-orange-400/60 mix-blend-multiply"></div>
                                        </div>
                                        <span className="text-xs font-mono text-[#122F2A]/60">****{donation.paymentMethod.last4}</span>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2 text-center">
                                <p className="text-sm text-[#122F2A]">{donation.date}</p>
                                <p className="text-xs text-[#122F2A]/40">{donation.time}</p>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <span className={cn(
                                    "inline-flex items-center justify-center min-w-[80px] px-2.5 py-1 rounded-full text-[10px] font-bold",
                                    donation.status === 'success' && "bg-[#E7F6EC] text-[#036B3D]",
                                    donation.status === 'pending' && "bg-[#FFF8EB] text-[#B54708]",
                                    donation.status === 'failed' && "bg-[#FEF3F2] text-[#B42318]",
                                )}>
                                    {donation.status === 'success' && "ناجح"}
                                    {donation.status === 'pending' && "قيد الانتظار"}
                                    {donation.status === 'failed' && "فشل"}
                                </span>
                            </div>
                            <div className="col-span-1 flex items-center justify-center gap-2 text-[#122F2A]/40">
                                <button
                                    onClick={() => handleView(donation)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(donation._id)} className="hover:text-[#122F2A] transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="text-sm text-[#122F2A]/60">
                    عرض {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, donations.length)} من {donations.length}
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

            {/* View Details Modal */}
            <Modal
                open={!!viewingDonation}
                onClose={() => setViewingDonation(null)}
                className="max-w-xl"
            >
                {/* ... existing modal content ... */}
                <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-xl w-full flex flex-col font-cairo overflow-hidden relative">
                    {viewingDonation && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-4">
                                <h2 className="text-xl font-bold text-[#122F2A]">تفاصيل التبرع</h2>
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold",
                                    viewingDonation.status === 'success' && "bg-[#E7F6EC] text-[#036B3D]",
                                    viewingDonation.status === 'pending' && "bg-[#FFF8EB] text-[#B54708]",
                                    viewingDonation.status === 'failed' && "bg-[#FEF3F2] text-[#B42318]",
                                )}>
                                    {viewingDonation.status === 'success' && "ناجح"}
                                    {viewingDonation.status === 'pending' && "قيد الانتظار"}
                                    {viewingDonation.status === 'failed' && "فشل"}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <span className="text-sm text-[#122F2A]/60">المبلغ</span>
                                    <span className="text-lg font-bold text-[#122F2A]">${viewingDonation.amount} <span className="text-xs font-normal">{viewingDonation.currency}</span></span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">المتبرع</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">{viewingDonation.donor.name}</p>
                                        <p className="text-xs text-[#122F2A]/40">{viewingDonation.donor.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">طريقة الدفع</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">
                                            {viewingDonation.paymentMethod.type === 'paypal' ? 'PayPal' : `Mastercard **** ${viewingDonation.paymentMethod.last4}`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">التصنيف</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">{viewingDonation.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">النوع</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">
                                            {viewingDonation.type === 'recurring' ? 'متكرر' : 'مرة واحدة'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">التاريخ</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">{viewingDonation.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#122F2A]/60 mb-1">الوقت</p>
                                        <p className="text-sm font-semibold text-[#122F2A]">{viewingDonation.time}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-[#122F2A]/60 mb-1">أرقام المعاملات</p>
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-[10px] text-[#122F2A]/40">Donation ID</p>
                                                <p className="text-xs font-mono text-[#122F2A]">{viewingDonation.donationId}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#122F2A]/40">Transaction ID</p>
                                                <p className="text-xs font-mono text-[#122F2A]">{viewingDonation.transactionId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setDonationToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="حذف التبرع"
                message="هل أنت متأكد من حذف هذا التبرع؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                cancelText="إلغاء"
                isDestructive
            />
        </div>
    );
}
