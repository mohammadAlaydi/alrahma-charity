"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserCircle2, Menu } from "lucide-react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

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
      className={cn("flex h-[40px] md:h-[48px] w-[110px] md:w-[140px] items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E]", className)}
    >
      <span className="btn-donate-text text-xs md:text-sm flex items-center justify-center text-white">
        تبرع الان
      </span>
      <Image src="/emojis/line-md_arrow-up.svg" alt="" width={18} height={18} className="h-4 w-4 md:h-[18px] md:w-[18px]" />
    </button>
  );
}

export function MainNavBar() {
  const pathname = usePathname();

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
        <div className="relative h-[40px] w-[35px] md:h-[75px] md:w-[67px]">
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
          <button type="button" className="flex h-7 w-7 items-center justify-center">
            <UserCircle2 className="h-7 w-7 text-black" strokeWidth={1.5} />
          </button>
          <DonateButton />
        </div>
      </Container>
    </div>
  );
}
