"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  HandHeart,
  HeartHandshake,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

function TopPillButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn("flex items-center gap-[5px] text-[16px] leading-[20px] text-white", className)}
    >
      {children}
    </button>
  );
}

export function MainMailBar() {
  return (
    <div className="w-full bg-[#007F5E]">
      <Container className="flex h-[50px] items-center justify-between">
        {/* Left: currency, language, social */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-[10px]">
            <TopPillButton>
              <Image
                src="/emojis/weui_arrow-outlined.svg"
                alt=""
                width={18}
                height={9}
                className="h-[9px] w-[18px] rotate-90"
              />
              <span>دولار أمريكي (USD)</span>
            </TopPillButton>
            <TopPillButton>
              <Image
                src="/emojis/weui_arrow-outlined.svg"
                alt=""
                width={18}
                height={9}
                className="h-[9px] w-[18px] rotate-90"
              />
              <span>الانجليزيه</span>
              <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
            </TopPillButton>
          </div>
        </div>

        {/* Middle: promoter */}
        <div className="flex items-center gap-[10px]">
          <span className="text-[16px] leading-[20px] text-white">
            هل أنت مستعد لمساعدتهم؟ لنصبح متطوعين
          </span>
          <HeartHandshake className="h-6 w-6 text-white" strokeWidth={1.5} />
        </div>

        {/* Right: support links */}
        <div className="flex items-center gap-10">
          <Link href="#" className="text-[16px] leading-[24px] text-white">
            السياسة والخصوصية
          </Link>
          <Link
            href="#"
            className="flex items-center gap-[5px] text-[16px] leading-[24px] text-white"
          >
            <span>كيف تتبرع؟</span>
            <HandHeart className="h-6 w-6 text-white" strokeWidth={1.5} />
          </Link>
        </div>
      </Container>
    </div>
  );
}
