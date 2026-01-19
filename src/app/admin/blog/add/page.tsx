"use client";

import { useRouter } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/notificationsSlice";
import { post } from "@/services/http";

async function createPost(data: any) {
    const response = await post('/blog', data);
    // @ts-ignore
    return response.data; // Adjust based on actual return if needed, currently post returns T
}

export default function AddBlogPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
            dispatch(addToast({
                type: 'success',
                title: 'تم بنجاح',
                message: "تم نشر المقال بنجاح"
            }));
            router.push('/admin/blog');
        },
        onError: () => {
            dispatch(addToast({
                type: 'error',
                title: 'خطأ',
                message: "حدث خطأ أثناء النشر"
            }));
        }
    });

    return (
        <BlogEditor
            onBack={() => router.push('/admin/blog')}
            onSave={(data) => {
                // Ensure data is formatted correctly
                // If title is missing, show error?
                // For now just submit
                createMutation.mutate(data);
            }}
            isSaving={createMutation.isPending}
        />
    );
}
