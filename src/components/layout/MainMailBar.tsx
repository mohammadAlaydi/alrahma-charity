"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, HandHeart } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown/Dropdown";
import { cn } from "@/lib/cn";

function TopPillButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={cn("topbar-text flex items-center gap-[5px]", className)}>
      {children}
    </button>
  );
}

export function MainMailBar() {
  return (
    <div className="w-full bg-[#007F5E]">
      <Container className="flex h-auto min-h-[36px] md:h-[42px] items-center justify-between py-1.5 md:py-0">
        {/* Right: support links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="topbar-text flex items-center gap-[5px]">
            <span>كيف تتبرع؟</span>
            <HandHeart className="h-5 w-5 text-white" strokeWidth={1.5} />
          </Link>
          <Link href="#" className="topbar-text">
            السياسة والخصوصية
          </Link>
        </div>

        {/* Middle: promoter - centered on mobile */}
        <div className="flex w-full md:w-auto items-center justify-center gap-[10px]">
          <Image src="/emojis/give hart 1.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
          <span className="topbar-promo">هل أنت مستعد لمساعدتهم؟ لنصبح متطوعين</span>
        </div>

        {/* Left: currency, language, social - hidden on mobile */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-[10px]">
            {/* Language Dropdown */}
            <Dropdown
              button={
                <TopPillButton>
                  <Globe className="h-5 w-5 text-white" strokeWidth={1.5} />
                  <span>الانجليزيه</span>
                  <Image
                    src="/emojis/weui_arrow-outlined.svg"
                    alt=""
                    width={16}
                    height={8}
                    className="h-[8px] w-[16px]"
                  />
                </TopPillButton>
              }
              align="start"
            >
              <DropdownItem onClick={() => console.log("English selected")}>
                الانجليزيه
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Arabic selected")}>العربية</DropdownItem>
              <DropdownItem onClick={() => console.log("Turkish selected")}>التركية</DropdownItem>
            </Dropdown>

            {/* Currency Dropdown */}
            <Dropdown
              button={
                <TopPillButton>
                  <span>(USD)</span>
                  <span>دولار أمريكي</span>
                  <Image
                    src="/emojis/weui_arrow-outlined.svg"
                    alt=""
                    width={16}
                    height={8}
                    className="h-[8px] w-[16px]"
                  />
                </TopPillButton>
              }
              align="start"
            >
              <DropdownItem onClick={() => console.log("USD selected")}>
                دولار أمريكي (USD)
              </DropdownItem>
              <DropdownItem onClick={() => console.log("EUR selected")}>يورو (EUR)</DropdownItem>
              <DropdownItem onClick={() => console.log("GBP selected")}>
                جنيه إسترليني (GBP)
              </DropdownItem>
              <DropdownItem onClick={() => console.log("TRY selected")}>
                ليرة تركية (TRY)
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </Container>
    </div>
  );
}
