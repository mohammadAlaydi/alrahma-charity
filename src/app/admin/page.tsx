"use client";

import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/admin/StatCard";
import { AdminChartsSection } from "@/components/admin/AdminChartsSection";
import { Users, FolderOpen, DollarSign, Heart, Loader2 } from "lucide-react";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    getDashboardStats,
    formatCurrency,
    formatNumber,
} from "@/services/api/admin";

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Fetch dashboard stats from API
    const {
        data: dashboardData,
        isLoading: isLoadingStats,
        error: statsError,
    } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: getDashboardStats,
        enabled: status === "authenticated",
        staleTime: 60 * 1000, // 1 minute
        refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            console.log("Admin page: User not authenticated, redirecting to login");
            router.push("/?auth=login&callbackUrl=/admin");
            return;
        }

        if (status === "authenticated" && session?.user) {
            const user = session.user as any;
            const isAdmin =
                user?.role === "admin" || user?.role === "ADMIN" || user?.isAdmin;

            console.log(
                "Admin page: User authenticated. Role:",
                user?.role,
                "isAdmin:",
                user?.isAdmin,
            );

            if (!isAdmin) {
                console.log("Admin page: User is not admin, redirecting to dashboard");
                router.push("/dashboard");
            }
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#122F2A]" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#122F2A]" />
            </div>
        );
    }

    // Role check
    const user = session?.user as any;
    const isAdmin =
        user?.role === "admin" || user?.role === "ADMIN" || user?.isAdmin;

    if (!isAdmin) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#122F2A]" />
            </div>
        );
    }

    // Use real data or defaults
    const overview = dashboardData?.overview || {
        activeOrphans: 0,
        activeProjects: 0,
        totalDonations: 0,
        activeCampaigns: 0,
        totalUsers: 0,
    };

    const financial = dashboardData?.financial || {
        thisMonthAmount: 0,
        revenueGrowth: 0,
        currency: "SAR",
    };

    // Calculate trends
    const orphanTrend = overview.activeOrphans > 0 ? "up" : undefined;
    const donationsTrend = financial.revenueGrowth >= 0 ? "up" : "down";

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full flex-1 w-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">
                        أداء لوحة القيادة
                    </h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">
                        لوحة التحكم / نظرة عامة
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                {/* 1. Orphans (الأيتام) */}
                <StatCard
                    title="الأيتام"
                    value={
                        isLoadingStats ? "..." : formatNumber(overview.activeOrphans)
                    }
                    subtext="يتيم مسجل في النظام"
                    trend={orphanTrend}
                    icon={Heart}
                />

                {/* 2. Projects (المشاريع) */}
                <StatCard
                    title="المشاريع"
                    value={
                        isLoadingStats ? "..." : formatNumber(overview.activeProjects)
                    }
                    subtext="مشروع نشط حالياً"
                    icon={FolderOpen}
                />

                {/* 3. Users (المستخدمين) */}
                <StatCard
                    title="المستخدمين"
                    value={isLoadingStats ? "..." : formatNumber(overview.totalUsers)}
                    subtext="مستخدم مسجل"
                    icon={Users}
                />

                {/* 4. Donations (التبرعات) */}
                <StatCard
                    title="التبرعات الشهرية"
                    value={
                        isLoadingStats
                            ? "..."
                            : formatCurrency(financial.thisMonthAmount, financial.currency)
                    }
                    subtext={`${financial.revenueGrowth >= 0 ? "+" : ""}${financial.revenueGrowth}% عن الشهر الماضي`}
                    trend={donationsTrend}
                    trendValue={`${Math.abs(financial.revenueGrowth)}%`}
                    icon={DollarSign}
                />
            </motion.div>

            {/* Charts Section */}
            <AdminChartsSection className="flex-1" delay={0.3} />

            {/* Recent Activity */}
            <RecentActivity
                delay={0.5}
                activities={dashboardData?.recentActivity}
                isLoading={isLoadingStats}
            />
        </div>
    );
}
