"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserImage } from "@/store/slices/authSlice";
import { cn } from "@/lib/cn";
import {
    User,
    CreditCard,
    Settings,
    Heart,
    Users,
    LogOut,
    HelpCircle,
    LayoutDashboard,
    Repeat,
    Camera,
} from "lucide-react";

const sidebarItems = [
    {
        title: "المعلومات الشخصية", // Personal Info
        href: "/dashboard",
        icon: User,
    },
    {
        title: "إعدادات الحساب", // Account Settings
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "التبرعات", // Donations
        href: "/dashboard/donations",
        icon: Heart,
    },

    {
        title: "الكفالات", // Sponsorships
        href: "/dashboard/sponsorships",
        icon: Users,
    },
    {
        title: "طرق الدفع المحفوظة", // Saved Payment Methods
        href: "/dashboard/payment-methods",
        icon: CreditCard,
    },
];

const secondaryItems = [
    {
        title: "طلبات الدعم والمساعدة", // Support Requests
        href: "/dashboard/support",
        icon: HelpCircle,
    },
    {
        title: "تسجيل الخروج", // Logout
        href: "/logout", // In a real app, this would likely be a button action
        icon: LogOut,
        variant: "destructive",
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const profileImage = user?.image || "/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg";
    const userName = user?.name || "مستخدم";
    const userEmail = user?.email || "";
    const fileInputRef = useRef<HTMLInputElement>(null);

    // No need to fetch here, AuthInitializer handles it globally. 
    // We just rely on Redux state which is now persistent.

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            // Optimistically update
            dispatch(updateUserImage(imageUrl));

            // Convert and save
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                dispatch(updateUserImage(base64String)); // Update with base64
                try {
                    await fetch('/api/user/image', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: base64String })
                    });
                } catch (error) {
                    console.error("Failed to save image", error);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl border border-zinc-200/50 shadow-sm p-6 space-y-8">
                {/* User Profile Summary */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-sm flex items-center justify-center bg-white relative">
                            {user?.image ? (
                                <Image src={user.image} alt="Profile" fill className="object-cover rounded-full" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-emerald-600 font-bold text-4xl">
                                    {userName.charAt(0).toLowerCase()}
                                </div>
                            )}
                        </div>
                        {/* Camera Icon Overlay */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#007F5E] text-white shadow-md ring-[3px] ring-white hover:bg-emerald-700 cursor-pointer transition-colors z-10"
                        >
                            <span className="sr-only">Change avatar</span>
                            <Camera className="h-4 w-4" />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900">{userName}</h2>
                    <p className="text-sm text-zinc-500">{userEmail}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    <div className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        معلومات الحساب
                    </div>
                    <div className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                                        isActive
                                            ? "text-emerald-600 bg-[#E8F3F1]"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-emerald-600" : "text-zinc-400")} />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="my-6 border-t border-zinc-100" />

                    <div className="space-y-1">
                        <div className="space-y-1">
                            {secondaryItems.map((item) => {
                                if (item.title === "تسجيل الخروج") {
                                    return (
                                        <button
                                            key={item.href}
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className={cn(
                                                "w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                                                item.variant === 'destructive'
                                                    ? "text-rose-600 hover:bg-rose-50"
                                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                            )}
                                        >
                                            <item.icon className={cn("h-4 w-4", item.variant === 'destructive' ? "text-rose-500" : "text-zinc-400")} />
                                            {item.title}
                                        </button>
                                    );
                                }
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                                            item.variant === 'destructive'
                                                ? "text-rose-600 hover:bg-rose-50"
                                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                        )}
                                    >
                                        <item.icon className={cn("h-4 w-4", item.variant === 'destructive' ? "text-rose-500" : "text-zinc-400")} />
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>
        </aside >
    );
}
