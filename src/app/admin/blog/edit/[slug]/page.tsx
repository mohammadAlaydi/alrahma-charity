"use client";

import { useRouter, useParams } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/notificationsSlice";
import { get, put } from "@/services/http";

async function fetchPostBySlug(slug: string) {
    const data = await get<{ success: boolean, data: any }>(`/blog?slug=${slug}`);
    return data.data;
}

async function updatePost({ id, data }: { id: string, data: any }) {
    const response = await put<{ success: boolean, data: any }, any>(`/blog/${id}`, data);
    return response.data;
}

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { data: post, isLoading } = useQuery({
        queryKey: ['blog-post', slug],
        queryFn: () => fetchPostBySlug(slug),
        enabled: !!slug,
    });

    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
            queryClient.invalidateQueries({ queryKey: ['blog-post', slug] });
            dispatch(addToast({
                type: 'success',
                title: 'تم بنجاح',
                message: "تم تحديث المقال بنجاح"
            }));
            router.push('/admin/blog');
        },
        onError: () => {
            dispatch(addToast({
                type: 'error',
                title: 'خطأ',
                message: "حدث خطأ أثناء التحديث"
            }));
        }
    });

    if (isLoading) return <div className="p-8">جاري التحميل...</div>;
    // Assuming if not found API returns null/404, need handling. 
    // Ideally check if post exists.

    return (
        <BlogEditor
            initialData={post}
            onBack={() => router.push('/admin/blog')}
            onSave={(data) => {
                if (post?._id) {
                    updateMutation.mutate({ id: post._id, data });
                }
            }}
            isSaving={updateMutation.isPending}
        />
    );
}
