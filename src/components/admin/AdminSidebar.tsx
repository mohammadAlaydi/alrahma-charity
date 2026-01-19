"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { cn } from "@/lib/cn";
import {
    LayoutDashboard,
    Users,
    FolderOpen,
    FileText, // Blog
    Search,
    Settings,
    LogOut,
    User,
    ScrollText,
    Heart
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
    {
        title: "لمحة عامة", // General Overview
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "المستخدمين", // Users
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "الأيتام", // Orphans
        href: "/admin/orphans",
        icon: User, // Changed to User singular or specialized icon if available, or keep generic Users but sidebar uses icon component.
    },
    {
        title: "المشاريع", // Projects
        href: "/admin/projects",
        icon: FolderOpen,
    },
    {
        title: "التبرعات", // Donations
        href: "/admin/donations",
        icon: Heart,
    },

    {
        title: "المدونة", // Blog
        href: "/admin/blog",
        icon: FileText,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <aside className="w-64 flex-shrink-0 bg-transparent min-h-screen flex flex-col border-none">
            {/* User Profile / Search Section */}
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-6">
                    {/* User Profile (Right Side in RTL) */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 relative rounded-full overflow-hidden border border-white/50">
                            {/* Placeholder Avatar */}
                            <div className="bg-zinc-300 w-full h-full flex items-center justify-center text-zinc-500">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-[#122F2A] text-sm">
                                {mounted ? (user?.fullName || user?.name || 'Admin') : 'Admin'}
                            </div>
                            <div className="text-xs text-[#122F2A]/70">
                                {mounted ? (user?.role || 'Super Admin') : 'Super Admin'}
                            </div>
                        </div>
                    </div>

                    {/* Logout Button (Left Side in RTL) */}
                    <button onClick={handleLogout} className="text-[#122F2A] hover:bg-black/5 p-1 rounded">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                            <path d="M1.25 15L1.25 9C1.25 3.57 3.57 1.25 9 1.25L15 1.25C20.43 1.25 22.75 3.57 22.75 9L22.75 15C22.75 20.43 20.43 22.75 15 22.75L9 22.75C3.57 22.75 1.25 20.43 1.25 15ZM21.25 9C21.25 4.39 19.61 2.75 15 2.75L9 2.75C4.39 2.75 2.75 4.39 2.75 9L2.75 15C2.75 19.61 4.39 21.25 9 21.25L15 21.25C19.61 21.25 21.25 19.61 21.25 15L21.25 9Z" fill="currentColor" />
                            <path d="M8.73999 11.9995C8.73999 11.8095 8.80999 11.6195 8.95999 11.4695L11.96 8.46945C12.25 8.17945 12.73 8.17945 13.02 8.46945C13.31 8.75945 13.31 9.23945 13.02 9.52945L10.55 11.9995L13.02 14.4695C13.31 14.7595 13.31 15.2395 13.02 15.5295C12.73 15.8195 12.25 15.8195 11.96 15.5295L8.95999 12.5295C8.80999 12.3795 8.73999 12.1895 8.73999 11.9995Z" fill="currentColor" />
                            <path d="M8.73999 12C8.73999 11.59 9.07999 11.25 9.48999 11.25L17.49 11.25C17.9 11.25 18.24 11.59 18.24 12C18.24 12.41 17.9 12.75 17.49 12.75L9.48999 12.75C9.06999 12.75 8.73999 12.41 8.73999 12Z" fill="currentColor" />
                            <path d="M5.76997 12.0004C5.76997 9.89043 6.10996 7.77044 6.77996 5.76044C6.90996 5.37044 7.33996 5.16043 7.72996 5.29043C8.11996 5.42043 8.33996 5.84043 8.19996 6.24043C6.95996 9.96043 6.95996 14.0504 8.19996 17.7704C8.32996 18.1604 8.11996 18.5904 7.72996 18.7204C7.33996 18.8504 6.90996 18.6404 6.77996 18.2504C6.09996 16.2304 5.76997 14.1104 5.76997 12.0004Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#122F2A]/50" />
                    <input
                        type="text"
                        placeholder="بحث"
                        className="w-full bg-[#F8F6F1] border-none rounded-full h-10 pr-9 pl-4 text-sm focus:ring-1 focus:ring-[#007F5E] placeholder-[#122F2A]/40 text-[#122F2A]"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    // Exact match for root admin, startsWith for others
                    const isActive = item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname?.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-medium transition-all",
                                isActive
                                    ? "bg-[#007F5E] text-white shadow-sm"
                                    : "text-[#122F2A] hover:bg-[#E4DEBD]/50"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-[#122F2A]")} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logo Area if needed, or just bottom spacing */}
            <div className="p-6">
                {/* Potentially Logo here */}
            </div>
        </aside>
    );
}
