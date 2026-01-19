"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Admin Page Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white rounded-3xl border border-red-100 m-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ ما!</h2>
            <p className="text-zinc-600 mb-6 max-w-md">Invalid content or runtime error encountered.</p>
            <pre className="bg-red-50 p-4 rounded-lg text-left text-xs text-red-800 mb-8 max-w-full overflow-auto dir-ltr">
                {error.message}
            </pre>
            <Button onClick={() => reset()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                إعادة المحاولة
            </Button>
        </div>
    );
}
