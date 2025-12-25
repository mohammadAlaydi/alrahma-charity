"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserCircle2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المشاريع", href: "/projects" },
  { label: "زكاه", href: "#" },
  { label: "الكفالات", href: "#" },
  { label: "الصدقات", href: "#" },
  { label: "معرض الاعمال", href: "#" },
  { label: "المدونة", href: "#" },
];

function DonateButton() {
  return (
    <button
      type="button"
      className="flex h-[58px] w-[159px] items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E]"
    >
      <span className="btn-donate-text flex h-[26px] w-[65px] items-center justify-center">
        تبرع الان
      </span>
      <Image src="/emojis/line-md_arrow-up.svg" alt="" width={20} height={20} className="h-5 w-5" />
    </button>
  );
}

export function MainNavBar() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white">
      <Container className="flex h-[111px] items-center justify-between">
        {/* right : Logo */}
        <div className="relative h-[95px] w-[85px]">
          <Image src="/Logo.png" alt="Alrahma" fill className="object-contain" priority />
        </div>

        {/* Center: Menu */}
        <nav className="hidden h-[50px] items-center gap-[30px] lg:flex">
          {navItems.map((item) => {
            const isActive = item.href !== "#" && pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "navbar-item relative flex h-[50px] items-center pb-2 transition-colors hover:text-[#007F5E]",
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

        {/* left: Donate + Profile */}
        <div className="flex items-center gap-[22px]">
          <button type="button" className="flex h-8 w-8 items-center justify-center">
            <UserCircle2 className="h-8 w-8 text-black" strokeWidth={1.5} />
          </button>
          <DonateButton />
        </div>
      </Container>
    </div>
  );
}
