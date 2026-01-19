import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
    title: "Admin Dashboard - Alrahma",
    description: "Administrative Panel",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#DFD38366] flex text-right" dir="rtl">
            {/* Sidebar on Right (RTL) */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-[10px] pr-0 flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}
