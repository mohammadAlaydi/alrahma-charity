"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Globe } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "الرئيسية", href: "/", icon: "/figma/mynaui_home.svg" },
  { label: "من نحن", href: "/about", icon: "/figma/donation-svgrepo-com 1.svg" },
  { label: "المشاريع", href: "/projects", icon: "/figma/octicon_project-24.svg" },
  { label: "زكاه", href: "/zakat", icon: "/figma/hugeicons_charity.svg" },
  { label: "الكفالات", href: "/kafalah", icon: "/figma/streamline-freehand-color_donation-charity-donate-heart-flower.svg" },
  { label: "الصدقات", href: "/sadaqah", icon: "/figma/bx_donate-blood.svg" },
  { label: "معرض الاعمال", href: "#", icon: "/figma/iconoir_cinema-old.svg" },
  { label: "المدونة", href: "#", icon: "/figma/mdi_blog-outline.svg" },
  { label: "التواصل معنا", href: "#", icon: "/figma/healthicons_contact-support-outline.svg" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-[90%] max-w-[400px] bg-white shadow-2xl overflow-y-auto"
            dir="rtl"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <Image src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png" alt="" fill className="object-cover" />
            </div>

            <div className="flex flex-col h-full p-6 relative z-10">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100/50 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Language and Currency */}
              <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-xl text-[13px] text-gray-800 bg-white shadow-sm">
                  <ChevronLeft size={14} className="text-gray-400 rotate-90" />
                  <span className="font-medium">دولار أمريكي (USD)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-xl text-[13px] text-gray-800 bg-white shadow-sm">
                  <ChevronLeft size={14} className="text-gray-400 rotate-90" />
                  <span className="font-medium">العربية</span>
                  <div className="relative w-4 h-4">
                    <Image src="/figma/tabler_search.svg" alt="" fill className="object-contain opacity-60" />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 rounded-[20px] transition-all duration-300",
                        isActive 
                          ? "bg-[#007F5E]/10 text-[#007F5E] shadow-sm" 
                          : "text-[#0d0d0d] hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-6 h-6">
                          <Image 
                            src={item.icon} 
                            alt="" 
                            fill 
                            className={cn(
                              "object-contain transition-all",
                              isActive ? "brightness-0 saturate-100 invert-[34%] sepia-[75%] saturate-[1032%] hue-rotate-[128deg] brightness-[91%] contrast-[101%]" : "opacity-70"
                            )}
                          />
                        </div>
                        <span className="font-medium text-[16px]">{item.label}</span>
                      </div>
                      <div className={cn(
                        "flex items-center justify-center transition-transform",
                        isActive ? "text-[#007F5E] rotate-0" : "text-gray-300 rotate-0"
                      )}>
                        <ChevronLeft size={20} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function MobileBottomBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bottomItems = [
    { label: "الرئيسية", href: "/", icon: "/figma/mynaui_home.svg" },
    { label: "تبرع", href: "/donate", icon: "/figma/bx_donate-blood.svg" },
    { label: "تسجيل الدخول", href: "/login", icon: "/figma/profile icon.svg" },
    { label: "القائمة", action: () => setIsMenuOpen(true), icon: "/figma/jam_menu.svg" },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] pointer-events-none">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-[10px] rounded-t-[20px] shadow-[0px_-8px_25px_-1px_rgba(0,127,94,0.15)] border-t border-white flex items-center justify-between px-4 pt-4 pb-8 pointer-events-auto" dir="rtl">
          {bottomItems.map((item) => {
            const isActive = item.href ? (item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)) : false;
            const content = (
              <div className="flex flex-col items-center gap-1 min-w-[64px]">
                <div className="relative w-6 h-6">
                  <Image 
                    src={item.icon} 
                    alt="" 
                    fill 
                    className={cn(
                      "object-contain transition-all duration-200",
                      isActive ? "brightness-0" : "opacity-40 grayscale"
                    )}
                  />
                </div>
                <span className={cn(
                  "text-[12px] font-medium transition-colors",
                  isActive ? "text-black" : "text-[#737378]"
                )}>
                  {item.label}
                </span>
              </div>
            );

            if (item.href) {
              return (
                <Link key={item.label} href={item.href} className="flex-1">
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.label} onClick={item.action} className="flex-1 cursor-pointer">
                {content}
              </button>
            );
          })}
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

