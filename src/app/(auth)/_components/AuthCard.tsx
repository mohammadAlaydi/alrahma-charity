"use client";

import Image from "next/image";

import { cn } from "@/lib/cn";

export function AuthCard({
  title,
  subtitle,
  children,
  titleClassName,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  titleClassName?: string;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Backdrop images with overlay and blur */}
      <div className="pointer-events-none absolute inset-0">
        {/* Full background - Backdrop.png */}
        <Image src="/Backdrop.png" alt="" fill className="object-cover" priority />
        {/* Centered logo background image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full max-w-[1400px]">
            <Image
              src="/logo-backgroud-signin.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* White overlay and blur */}
        <div className="absolute inset-0 bg-white/25 backdrop-blur-[9.4px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-4 py-10">
        {/* Main card container - matches Figma: 1352x685, rounded 20px */}
        <div className="relative w-full max-w-[1352px] overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_0_7.3px_rgba(0,127,94,0.15)]">
          {/* Decorative right panel - background image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block">
            <Image src="/sign-in-picture.png" alt="" fill className="object-cover" priority />
          </div>

          {/* Form panel - matches Figma: 554x598, rounded 24px, positioned left */}
          <div className={cn("relative p-[48px_53px] md:w-[45%]", "md:mr-auto")}>
            <div className="mx-auto max-w-[528px]">
              {/* Logo and title section */}
              <div className="mb-10 flex flex-col items-center gap-16">
                {/* Logo - 98x98 circle */}
                <div className="relative h-[98px] w-[98px] overflow-hidden rounded-full">
                  <Image src="/Logo.png" alt="Alrahma" fill className="object-cover" priority />
                </div>
                {/* Title and subtitle */}
                <div className="flex flex-col items-center gap-2">
                  <h1
                    className={cn(
                      "text-[29px] leading-[29px] font-normal text-[#333333]",
                      titleClassName,
                    )}
                  >
                    {title}
                  </h1>
                  {subtitle ? (
                    <div className="text-[20px] leading-[20px] text-[#333333]">{subtitle}</div>
                  ) : null}
                </div>
              </div>

              {/* Form content */}
              <div className="space-y-10">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
