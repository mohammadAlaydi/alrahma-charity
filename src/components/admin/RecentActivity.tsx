"use client";

import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { useState } from "react";
import { cn } from "@/lib/cn";
import {
    User,
    CreditCard,
    Heart,
    Calendar,
    ChevronRight,
    ChevronLeft,
    X,
    Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal/Modal";
import type { RecentActivityItem } from "@/services/api/admin";

// Helper to map API activity to UI structure
const mapActivityApiToUI = (apiActivity: RecentActivityItem) => {
    const icon = CreditCard;
    const color = "text-green-600";
    const bg = "bg-green-100";

    // Format amount with currency
    const formattedAmount = apiActivity.amount
        ? new Intl.NumberFormat("ar-SA", {
            style: "currency",
            currency: apiActivity.currency || "SAR",
            maximumFractionDigits: 0,
        }).format(apiActivity.amount)
        : null;

    return {
        id: apiActivity.id,
        user: apiActivity.userName || "متبرع مجهول",
        action: "تبرع بمبلغ",
        target: apiActivity.campaignTitle || "تبرع عام",
        amount: formattedAmount,
        time: formatDistanceToNow(new Date(apiActivity.createdAt), {
            addSuffix: true,
            locale: ar,
        }),
        icon: icon,
        color: color,
        bg: bg,
    };
};

interface RecentActivityProps {
    className?: string;
    delay?: number;
    activities?: RecentActivityItem[];
    isLoading?: boolean;
}

const ITEMS_PER_PAGE = 12;

export function RecentActivity({
    className,
    delay = 0,
    activities: propActivities,
    isLoading = false,
}: RecentActivityProps) {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const activities = (propActivities || []).map(mapActivityApiToUI);

    const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentActivities = activities.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className={cn(
                "bg-white rounded-[30px] p-4 border border-[#EBEBEB] shadow-sm mt-4 flex flex-col min-h-0",
                className,
            )}
        >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold text-[#122F2A]">النشاطات الأخيرة</h3>
                <button
                    onClick={() => setOpen(true)}
                    className="text-xs text-[#007F5E] hover:underline"
                >
                    عرض الكل
                </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-[#122F2A]/40" />
                    </div>
                ) : activities.length === 0 ? (
                    <div className="text-center py-8 text-[#122F2A]/40 text-sm">
                        لا توجد نشاطات حتى الآن
                    </div>
                ) : (
                    activities
                        .slice(0, 3)
                        .map((activity) => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))
                )}
            </div>

            {/* Full Activity Log Modal */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="max-w-4xl h-[80vh] flex flex-col"
            >
                <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-xl w-full flex flex-col h-full font-cairo overflow-hidden relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 flex-shrink-0">
                        <div>
                            <h1 className="text-2xl font-bold text-[#122F2A]">
                                سجل النشاطات
                            </h1>
                            <p className="text-[#122F2A]/60 text-sm mt-1">
                                عرض جميع نشاطات النظام
                            </p>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        {activities.length === 0 ? (
                            <div className="text-center py-16 text-[#122F2A]/40">
                                لا توجد نشاطات حتى الآن
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {currentActivities.map((activity) => (
                                    <ActivityItem key={activity.id} activity={activity} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {activities.length > 0 && (
                        <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between flex-shrink-0">
                            <p className="text-sm text-gray-500">
                                عرض {startIndex + 1}-
                                {Math.min(startIndex + ITEMS_PER_PAGE, activities.length)} من{" "}
                                {activities.length} نتيجة
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-[#EBEBEB] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#122F2A]"
                                >
                                    <ChevronRight className="h-4 w-4" />{" "}
                                    {/* RTL: Right is previous */}
                                </button>

                                <span className="text-sm font-medium text-[#122F2A]">
                                    صفحة {currentPage} من {totalPages}
                                </span>

                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-[#EBEBEB] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#122F2A]"
                                >
                                    <ChevronLeft className="h-4 w-4" /> {/* RTL: Left is next */}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </motion.div>
    );
}

export function ActivityItem({ activity }: { activity: any }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F6F1] transition-colors border border-transparent hover:border-[#EBEBEB]">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        activity.bg,
                        activity.color,
                    )}
                >
                    <activity.icon className="h-5 w-5" />
                </div>

                <div className="text-right">
                    <p className="font-bold text-[#122F2A] text-xs">
                        {activity.user}{" "}
                        <span className="font-normal text-[#122F2A]/60">
                            - {activity.action}
                        </span>
                    </p>
                    <p className="text-[10px] text-[#122F2A]/50 mt-0.5">
                        {activity.target}
                    </p>
                </div>
            </div>

            <div className="text-left">
                {activity.amount && (
                    <span className="block font-bold text-[#007F5E] text-xs mb-0.5">
                        {activity.amount}
                    </span>
                )}
                <span className="text-[10px] text-[#122F2A]/40">{activity.time}</span>
            </div>
        </div>
    );
}
