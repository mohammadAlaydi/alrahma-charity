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
      <Container className="flex h-[50px] items-center justify-between">
        {/* Right: support links */}
        <div className="flex items-center gap-10">
          <Link href="#" className="topbar-text flex items-center gap-[5px]">
            <span>كيف تتبرع؟</span>
            <HandHeart className="h-6 w-6 text-white" strokeWidth={1.5} />
          </Link>
          <Link href="#" className="topbar-text">
            السياسة والخصوصية
          </Link>
        </div>

        {/* Middle: promoter */}
        <div className="flex items-center gap-[10px]">
          <Image src="/emojis/give hart 1.png" alt="" width={24} height={24} className="h-6 w-6" />
          <span className="topbar-promo">هل أنت مستعد لمساعدتهم؟ لنصبح متطوعين</span>
        </div>

        {/* Left: currency, language, social */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-[10px]">
            {/* Language Dropdown */}
            <Dropdown
              button={
                <TopPillButton>
                  <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                  <span>الانجليزيه</span>
                  <Image
                    src="/emojis/weui_arrow-outlined.svg"
                    alt=""
                    width={18}
                    height={9}
                    className="h-[9px] w-[18px]"
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
                    width={18}
                    height={9}
                    className="h-[9px] w-[18px]"
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
