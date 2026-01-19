"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Eye, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed
import { Modal } from "@/components/ui/modal/Modal";
import { ConfirmationModal } from "@/components/ui/modal/ConfirmationModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get, del } from "@/services/http";

// CRUD Operations
async function fetchArticles() {
    const data = await get<{ success: boolean, data: any[] }>('/blog');
    return data;
}

async function deleteArticle(id: string) {
    const data = await del(`/blog/${id}`);
    return data;
}

const ITEMS_PER_PAGE = 8;

export default function BlogPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: apiResponse, isLoading } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: fetchArticles,
    });

    const articles = apiResponse?.data || [];

    const deleteMutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
        },
    });

    const handleDelete = (id: string) => {
        setPostToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            deleteMutation.mutate(postToDelete);
        }
    };

    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full relative flex-1 w-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">المدونة</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">لوحة التحكم / إدارة المدونة</p>
                </div>
                <Link href="/admin/blog/add">
                    <Button
                        className="bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl px-6 py-2 h-12 gap-2 font-bold"
                    >
                        <Plus className="h-5 w-5" />
                        إضافة مقالة
                    </Button>
                </Link>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">

                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">عنوان المقالة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">التصنيف</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">حالة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">المشاهدات</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {currentArticles.map((article: any) => (
                        <div key={article._id} className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors">
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>
                            <div className="col-span-3">
                                <p className="font-bold text-[#122F2A] text-sm">{article.title}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[#122F2A]/60 text-sm">{article.category}</span>
                            </div>
                            <div className="col-span-2">
                                <span className={`font-medium text-sm flex items-center gap-1.5 ${article.status === 'تم النشر' ? 'text-[#007F5E]' : 'text-[#F2C94C]'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${article.status === 'تم النشر' ? 'bg-[#007F5E]' : 'bg-[#F2C94C]'}`}></span>
                                    {article.status}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[#122F2A] font-bold text-sm block">{article.views}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-3 text-[#122F2A]/40">
                                <button onClick={() => handleDelete(article._id)} className="hover:text-[#122F2A] transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <Link
                                    href={`/admin/blog/edit/${article.slug}`}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={`/admin/blog/view/${article._id}`}
                                    className="hover:text-[#122F2A] transition-colors"
                                    title="عرض التفاصيل"
                                >
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="text-sm text-[#122F2A]/60">
                    عرض {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, articles.length)} من {articles.length}
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

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setPostToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="حذف المقال"
                message="هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                cancelText="إلغاء"
                isDestructive
            />
        </div>
    );
}
