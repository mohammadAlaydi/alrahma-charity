"use client";

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function BlogViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const { data } = await axios.get(`/api/blog?id=${id}`);
            return data.data;
        },
        enabled: !!id
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007F5E]"></div>
            </div>
        );
    }

    if (isError || !post) {
        return (
            <div className="p-8 text-center text-zinc-500 font-cairo">
                <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
                <Link href="/admin/blog">
                    <Button variant="outline">العودة للمدونة</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen font-cairo bg-white/50">
            {/* Header & Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-sm text-zinc-500">
                <Link href="/admin/blog" className="hover:text-[#2D9F75] transition-colors">المدونة</Link>
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                <span className="text-[#122F2A] font-bold">معاينة: {post.title}</span>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-[30px] border border-[#EBEBEB] shadow-sm overflow-hidden animate-fadeIn">

                {/* 1. Cover Image */}
                {post.image && (
                    <div className="relative w-full h-[500px]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* 2. Blog Title & Metadata */}
                <div className="px-10 pt-10 pb-6">
                    <h1 className="text-4xl font-extrabold text-[#122F2A] leading-tight mb-4 text-right">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-zinc-500 mb-8 border-b border-[#F1F1F1] pb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#E8F5F1] flex items-center justify-center text-[#2D9F75]">
                                <User className="h-4 w-4" />
                            </div>
                            <span>{post.author || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span>{post.date ? new Date(post.date).toLocaleDateString('ar-EG') : 'غير محدد'}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.status === 'تم النشر' ? 'bg-[#007F5E]/10 text-[#007F5E]' : 'bg-[#F2C94C]/10 text-[#F2C94C]'}`}>
                            {post.status}
                        </span>
                    </div>
                </div>

                {/* 3. Blog Content */}
                <div
                    className="prose prose-lg max-w-none text-[#122F2A] leading-relaxed px-10 mb-12 font-cairo text-right dir-rtl"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />

                {/* 4. Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="px-10 pb-10 pt-6 border-t border-[#F1F1F1] mx-10 mt-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-[#2D9F75]" />
                            <h3 className="font-bold text-[#122F2A]">العلامات:</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-[#F8F9FA] text-[#122F2A] rounded-full text-sm font-medium hover:bg-[#E8F5F1] transition-colors cursor-default border border-[#EBEBEB]"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
