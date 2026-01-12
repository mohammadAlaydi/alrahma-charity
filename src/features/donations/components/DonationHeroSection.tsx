"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";
import { cn } from "@/lib/cn";

const PRESET_AMOUNTS = [10, 50, 100, 200];

export function DonationHeroSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setSelectedAmount(0);
    }
  };

  const handleSubmit = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0) {
      console.log("Donating:", { amount, name, email });
      // TODO: Implement actual donation logic
    }
  };

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden" dir="rtl">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Main background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/Rectangle 11.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#007F5E]/90 via-[#007F5E]/75 to-[#007F5E]/60" />
          </div>
          
          {/* Secondary image overlay - positioned on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[45%] opacity-25 md:opacity-30">
            <Image
              src="/images/unsplash_Xz5kTUYAu9A1.png"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#007F5E]/50" />
          </div>
        </div>
      </div>

      <Container className="relative z-10 py-12 md:py-20 lg:py-[100px] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between w-full">
          {/* Left Content - Text and CTA */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[55%] lg:max-w-[600px] text-white">
            {/* Heart Icon and Subtitle */}
            <div className="flex items-center gap-[5px]">
              <div className="relative h-6 w-6 md:h-8 md:w-8 shrink-0">
                <Image
                  src="/images/hart2 1.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-[16px] md:text-[20px] font-normal leading-[1.5] text-white">
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
            </div>

            {/* Main Title */}
            <h1 className="font-alexandria text-[32px] md:text-[48px] lg:text-[58px] font-bold leading-[1.2] text-white">
              <span className="text-white">كن سببا في </span>
              <span className="text-[#DFD383]">ابتسامة شخص ما</span>
            </h1>

            {/* Description */}
            <p className="font-alexandria text-[16px] md:text-[18px] font-normal leading-[1.6] text-white/90 max-w-[500px]">
              في جمعية الرحمة والإحسان، نعمل على تحسين جودة حياة الأسر المتضررة في غزة من خلال
              تدخلات إنسانية عاجلة ومشاريع تنموية مستدامة. تبرعك اليوم يصنع الفرق.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleSubmit}
              className="flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] bg-white text-[#007F5E] transition-all hover:bg-[#DFD383] hover:text-[#007F5E] w-fit mt-4"
            >
              <div className="relative h-6 w-6 shrink-0">
                <Image
                  src="/figma/mingcute_love-fill.svg"
                  alt=""
                  fill
                  className="object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1234%) hue-rotate(130deg) brightness(95%) contrast(87%)' }}
                />
              </div>
              <span className="font-alexandria text-[16px] font-semibold leading-[1.5] text-nowrap">
                تبرع الآن
              </span>
            </button>
          </div>

          {/* Right Content - Donation Form Card */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-[45%] lg:max-w-[555px]">
            {/* Card Title */}
            <div className="flex flex-col gap-[24px] items-center w-full">
              <p className="font-alexandria text-[20px] md:text-[24px] font-bold leading-[1.5] text-white text-center">
                كم تريد التبرع اليوم
              </p>

              {/* Form Card */}
              <div className="rounded-[20px] border border-white/20 bg-white/95 backdrop-blur-sm pl-4 md:pl-[32px] pr-0 py-4 md:py-[16px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] font-alexandria w-full">
                <div className="flex flex-col gap-[24px] px-[16px]">
                  {/* Amount Selection */}
                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      حدد المبلغ
                    </p>
                    <div className="flex items-center justify-between w-full gap-2 flex-wrap">
                      {PRESET_AMOUNTS.map((amount) => {
                        const isActive = selectedAmount === amount && !customAmount;
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            className={cn(
                              "flex h-[60px] items-center justify-center px-[16px] rounded-[20px] w-[calc(50%-4px)] md:w-[100px] border transition-all",
                              isActive
                                ? "border-[#007F5E] bg-[#007F5E]/10"
                                : "border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[#007F5E]/5"
                            )}
                          >
                            <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                              {amount} $
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      مبلغ مخصص
                    </p>
                    <AmountInput
                      placeholder="أدخل القيمة"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="h-[60px] w-full rounded-[20px]"
                    />
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      الاسم
                    </p>
                    <div className="h-[60px] w-full rounded-[20px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
                      <input
                        type="text"
                        placeholder="اسم المستخدم"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        dir="rtl"
                        className="h-full w-full bg-transparent px-4 text-right font-alexandria text-sm font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-[16px]">
                    <p className="font-alexandria text-right text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.70)] tracking-[-0.18px]">
                      البريد الإلكتروني
                    </p>
                    <div className="h-[60px] w-full rounded-[20px] border border-[#0D0D0D]/20 focus-within:border-[#007F5E] transition-colors overflow-hidden">
                      <input
                        type="email"
                        placeholder="ادخل البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        dir="rtl"
                        className="h-full w-full bg-transparent px-4 text-right font-alexandria text-sm font-light text-[#0D0D0D]/70 outline-none placeholder:opacity-[0.85] placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-0">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex gap-[10px] w-full items-center justify-center px-[32px] py-[16px] rounded-[35px] bg-[#007F5E] text-white transition-colors hover:bg-[#007F5E]/90"
                    >
                      <div className="relative h-6 w-6 shrink-0">
                        <Image src="/figma/mingcute_love-fill.svg" alt="" fill className="object-contain" />
                      </div>
                      <span className="font-alexandria text-[16px] font-semibold leading-[1.5] text-nowrap text-white">
                        متابعة
                      </span>
                    </button>

                    <p className="font-alexandria text-center text-[16px] mt-2 font-normal leading-[1.6] text-[#6155F5] w-full">
                      <span className="underline decoration-solid [text-underline-position:from-font]">تسجيل الدخول</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

