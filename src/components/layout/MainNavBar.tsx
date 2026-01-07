"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { useAppSelector } from "@/store/hooks";
import { LoginModal } from "@/features/auth/components/LoginModal";

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const favoritesCount = Object.keys(favorites).filter((id) => favorites[id]).length;

  return (
    <div className="w-full bg-white border-b border-gray-100 md:border-none">
      <Container className="flex h-[60px] md:h-[90px] items-center justify-between">
        {/* Mobile: Menu Icon (Left in design, but we are RTL so it's on the right in visual, but design says left) */}
        {/* Let's follow Figma: Left (Menu), Right (Logo) for mobile */}
        <div className="flex md:hidden items-center">
          <button type="button" className="p-2">
            <Menu className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* right : Logo */}
        <div className="relative h-[40px] w-[35px] md:h-[85px] md:w-[85px]">
          <Image src="/Logo.png" alt="Alrahma" fill className="object-contain" priority />
        </div>

        {/* Center: Menu - hidden on mobile */}
        <nav className="hidden h-[40px] items-center gap-[24px] lg:flex">
          {navItems.map((item) => {
            // For sadaqah, check if pathname starts with /sadaqah (includes /sadaqah/sadaqah-jariyah)
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

        {/* left: Donate + Profile - Donate hidden on mobile, Profile shown or both hidden? */}
        {/* Figma shows only Menu and Logo on mobile. Let's hide these for now or keep them small */}
        <div className="hidden md:flex items-center gap-[20px]">
          {/* Favorites Button with Counter */}
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
      </Container>
      <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}
