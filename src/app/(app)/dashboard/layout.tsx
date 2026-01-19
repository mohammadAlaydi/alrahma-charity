"use client";


import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Container } from "@/components/ui/Container";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full py-8 min-h-screen bg-[#F9FAFB]">
            <DashboardPageHeader />
            <Container>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    {/* Sidebar - In RTL, first element appears on the Right */}
                    <DashboardSidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white rounded-3xl border border-zinc-200/50 shadow-sm p-6 md:p-8 min-h-[600px]">
                            {children}
                        </div>
                    </main>
                </div>
            </Container>
        </div>
    );
}
