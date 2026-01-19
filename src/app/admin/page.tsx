"use client";

import { StatCard } from "@/components/admin/StatCard";
import { AdminChartsSection } from "@/components/admin/AdminChartsSection";
import { Users, FolderOpen, DollarSign } from "lucide-react";

import { RecentActivity } from "@/components/admin/RecentActivity";

import { motion } from "framer-motion";


// ...

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

// ...

export default function AdminDashboardPage() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login');
        },
    });

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#122F2A]" />
            </div>
        );
    }

    // Role check
    const user = session?.user as any;
    if (user?.role !== "ADMIN" && user?.role !== "admin" && !user?.isAdmin) {
        redirect('/dashboard');
    }

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full flex-1 w-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">أداء لوحة القيادة</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">لوحة التحكم / نظرة عامة</p>
                </div>
            </div>

            {/* Stats Grid
                RTL Order (Right to Left): 1. Orphans, 2. Projects, 3. Campaigns, 4. Sponsorships, 5. Donations
            */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {/* 1. Orphans (الأيتام) - RIGHTMOST */}
                <StatCard
                    title="الأيتام"
                    value="1,248"
                    subtext="10% من الشهر الماضي"
                    trend="up"
                    trendValue="10%"
                    icon={Users}
                />

                {/* 2. Projects (المشاريع) */}
                <StatCard
                    title="المشاريع"
                    value="34"
                    subtext="8 نشطة حاليا"
                    icon={FolderOpen}
                />

                {/* 3. Donations (التبرعات) - LEFTMOST */}
                <StatCard
                    title="التبرعات"
                    value="$142.5k"
                    subtext="المجموع الشهري"
                    icon={DollarSign}
                />
            </motion.div>

            {/* Charts Section: Grows to fill available space */}
            {/* Delay 0.3s */}
            <AdminChartsSection className="flex-1" delay={0.3} />

            {/* Suggested Feature: Recent Activity: Compact at bottom */}
            {/* Delay 0.5s */}
            <RecentActivity delay={0.5} />
        </div>
    );
}
