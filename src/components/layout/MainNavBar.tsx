"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { useAppSelector } from "@/store/hooks";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { MobileMenu } from "./MobileNavigation";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المشاريع", href: "/projects" },
  { label: "زكاه", href: "/zakat" },
  { label: "الكفالات", href: "#" },
  { label: "الصدقات", href: "/sadaqah" },
  { label: "معرض الاعمال", href: "#" },
  { label: "المدونة", href: "#" },
];

function DonateButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn("flex h-[35px] md:h-[48px] w-[100px] md:w-[130px] items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E]", className)}
    >
      <span className="btn-donate-text text-xs md:text-sm flex items-center justify-center text-white">
        تبرع الان
      </span>
      <Image src="/emojis/line-md_arrow-up.svg" alt="" width={20} height={18} className="h-4 w-4 md:h-[20px] md:w-[18px]" />
    </button>
  );
}

export function MainNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const favoritesCount = Object.keys(favorites).filter((id) => favorites[id]).length;

  return (
    <div className="w-full bg-white border-0 !border-b-0 shadow-none border-t-0">
      <Container className="flex h-[60px] md:h-[95px] items-center justify-between">
        {/* Mobile Header: Menu (Right) / Logo (Center) / Share (Left) - In RTL this matches Figma */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Menu Button */}
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 transition-opacity active:opacity-50"
          >
            <div className="w-6 h-6 relative">
              <Image src="/figma/jam_menu.svg" alt="القائمة" fill className="object-contain" />
            </div>
          </button>

          {/* Logo - Bigger */}
          <div className="relative h-[50px] w-[45px]">
            <Image src="/Logo.png" alt="Alrahma" fill className="object-cover" priority />
          </div>

          {/* Share Button (using back icon SVG) */}
          <button 
            type="button" 
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: 'جمعية الرحمة والإحسان',
                  text: 'تبرعك اليوم يصنع أثرًا لا يُنسى',
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="p-2 transition-opacity active:opacity-50"
          >
            <div className="w-6 h-6 relative">
              <Image src="/figma/icon-park-outline_back.svg" alt="مشاركة" fill className="object-contain" />
            </div>
          </button>
        </div>

        {/* Desktop Header Content (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* right : Logo */}
          <div className="relative h-[95px] w-[85px]">
            <Image src="/Logo.png" alt="Alrahma" fill className="object-cover" priority />
          </div>

          {/* Center: Menu */}
          <nav className="flex h-[40px] items-center gap-[24px]">
            {navItems.map((item) => {
              const isActive =
                item.href !== "#" &&
                (item.href === "/sadaqah"
                  ? pathname?.startsWith("/sadaqah")
                  : pathname === item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "navbar-item relative flex h-[40px] items-center pb-1 transition-colors hover:text-[#007F5E]",
                    isActive && "navbar-item-active",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#007F5E]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* left: Actions */}
          <div className="flex items-center gap-[20px]">
            {/* Favorites Button */}
            <button type="button" className="relative flex items-center justify-center transition-opacity hover:opacity-80" style={{ height: '44px', width: '44px' }}>
              <div className="relative" style={{ width: '42px', height: '42px' }}>
                <Image src="/emojis/Heart Button.svg" alt="المفضلة" fill className="object-contain" />
              </div>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#007F5E] text-xs font-semibold text-white">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </button>
            {/* Profile Button */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="relative flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ height: '44px', width: '44px' }}
            >
              <div 
                className="relative flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '37px',
                  border: '1px solid #E9E9F2',
                  background: '#FFF'
                }}
              >
                <div className="relative" style={{ width: '28px', height: '28px' }}>
                  <Image src="/figma/profile icon.svg" alt="الملف الشخصي" fill className="object-contain" />
                </div>
              </div>
            </button>
            <DonateButton />
          </div>
        </div>
      </Container>
      
      <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}
