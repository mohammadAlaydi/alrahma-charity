"use client";

import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CampaignHeader } from "@/features/projects/components/CampaignHeader";

export default function MarketingHomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CampaignHeader />

      <Container className="py-10">
        <Card className="p-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            مرحباً بك في الرحمة
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            هذا مشروع الواجهة الأمامية جاهز للربط مع الـ API.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button>الذهاب إلى لوحة التحكم</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">تسجيل الدخول</Button>
            </Link>
          </div>
        </Card>
      </Container>

      {/* WhatsApp Icon - Positioned in the side gutter as per Figma (x=1752, y=975 on 1920px canvas) */}
      {/* Centered relative to 1920px width to match design placement exactly */}
      <div className="absolute top-[975px] inset-x-0 z-10 hidden xl:flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[1920px] h-0">
          <a
            href="https://wa.me/905357829980"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[1752px] pointer-events-auto transition-all hover:scale-110"
            aria-label="تواصل معنا على واتساب"
          >
            <Image
              src="/figma/whatsapp.svg"
              alt="واتساب"
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
