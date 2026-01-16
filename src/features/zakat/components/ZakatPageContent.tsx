"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ZakatCard } from "./ZakatCard";
import { type Country } from "@/components/ui/country-dropdown";
import { Container } from "@/components/ui/Container";
import { DonationModal } from "@/features/projects/components/DonationModal";
import { DonationSuccessModal } from "@/features/projects/components/DonationSuccessModal";
import { AmountInput } from "@/components/ui/AmountInput";
import { cn } from "@/lib/cn";
import { useLoginModal } from "@/contexts/LoginContext";

const PRESET_AMOUNTS = [10, 50, 100, 200];

const ZAKAT_TYPES = [
  { id: "fitr", title: "زكاة الفطر", icon: "/figma/food-donation-svgrepo-com 1.svg" },
  { id: "mal", title: "زكاة المال", icon: "/figma/money-zakah.svg" },
  { id: "trade", title: "زكاة التجارة", icon: "/figma/business-graphic-svgrepo-com 1.svg" },
  { id: "property", title: "زكاة العقارات", icon: "/figma/shelter-svgrepo-com 1.svg" },
  { id: "crops", title: "زكاة الزرع", icon: "/figma/sprout-svgrepo-com 1.svg" },
  { id: "animals", title: "زكاة الأنعام", icon: "/figma/camel-shape-svgrepo-com 1.svg" },
  { id: "stocks", title: "زكاة الأسهم", icon: "/figma/stock-earnings-svgrepo-com 1.svg" },
  { id: "gold", title: "زكاة الذهب والفضة", icon: "/figma/gold-bar-svgrepo-com 1.svg" },
];

export function ZakatPageContent() {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<Record<string, Country | null>>({});
  const [selectedZakatType, setSelectedZakatType] = useState<{ id: string; title: string; icon: string } | null>(ZAKAT_TYPES[0]);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { openLoginModal } = useLoginModal();
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // States for mobile donation form
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePay = (typeId: string, title: string) => {
    const type = ZAKAT_TYPES.find(t => t.id === typeId);
    setSelectedZakatType(type || { id: typeId, title, icon: "" });
    setIsDonationDialogOpen(true);
  };

  const handleTypeSelect = (type: { id: string; title: string; icon: string }) => {
    setSelectedZakatType(type);
    setIsTypeDropdownOpen(false);
  };

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

  const handleAmountChange = (id: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (id: string, country: Country) => {
    setCountries((prev) => ({ ...prev, [id]: country }));
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Hero Section - Figma: x=320, y=100, width=1280 */}
      <section className="w-full pt-[32px] md:pt-[100px] pb-[91px]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-0">
          <div className="relative flex flex-col gap-6 lg:flex-row-reverse lg:items-start lg:gap-0">
            {/* Image - Left side in RTL (603px wide in Figma) - Aligned to top right */}
            <div className="hidden md:block relative h-[432.47px] w-full lg:w-[603px] lg:shrink-0">
              <Image
                src="/figma/zakah-pic.png"
                alt="Zakat"
                fill
                className="object-contain"
                style={{ objectPosition: 'top right' }}
              />
            </div>

            {/* Content - Right side in RTL (733px wide in Figma at x=547) - Pulled closer with negative margin */}
            <div className="relative w-full lg:w-[677px] lg:shrink-0 lg:-ml-12 flex flex-col gap-[24px]">
              {/* Text Content (866px wide container in Figma) */}
              <div className="flex flex-col gap-[8px] items-start">
                {/* Heading with icon */}
                <div className="flex items-center gap-[5px]">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                      style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(75%) saturate(1032%) hue-rotate(128deg) brightness(91%) contrast(101%)' }}
                    />
                  </div>
                  <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-[16px] leading-[1.5] text-[#007F5E] text-nowrap">
                    زكاتك حياة… تصل لمستحقيها
                  </p>
                </div>
                <h2 className="text-right text-[30px] leading-[1.6] font-bold text-[#0D0D0D] font-alexandria w-full">
                  <span>الزكاة هي البركة </span>
                  <span className="text-[#007F5E]">والطهارة والنماء والصلاح</span>
                </h2>
                {/* Paragraph - 742.323px wide in Figma */}
                <p className="text-right text-[16px] leading-[1.6] font-normal text-[rgba(13,13,13,0.7)] font-alexandria w-full max-w-[742px]">
                  واصطلاحاً هو مقدار معلوم في مالٍ معلوم لطائفة معلومة. وقد حددت الشريعة السمحاء القدر المعتبر لوجوب الزكاة، فلا تجب في أقل منه، وهو يختلف باختلاف أنواع الأموال التي تجب فيها الزكاة. وحكم الزكاة أنها الركن الثالث من أركان الإسلام الخمسة، فهي واجبة على كل مسلم بلغ ماله النصاب. وقد فُرضت الزكاة لأنها أنها تُصلح أحوال المجتمع ماديًا ومعنويًا، وتطهر النفوس من الشح والبخل. ومن أنكر وجوبها خرج عن الإسلام ويستتاب
                </p>
              </div>

              {/* Calculator Promo Section (866px wide container) */}
              <div className="flex flex-col gap-[16px] items-start">
                <h3 className="font-alexandria text-[24px] font-bold leading-[1.6] text-[#0D0D0D]">حاسبة الزكاة</h3>
                <p className="font-alexandria text-[16px] leading-[1.6] text-[rgba(13,13,13,0.7)] w-full max-w-[742px] text-right">
                  قم باضافة أصولك النقدية وغير النقدية لحساب زكاة المال المترتب عليك دفعها
                </p>
                <div className="flex flex-wrap gap-[16px]">
                  <button className="flex h-[56px] w-[190px] items-center justify-center gap-[10px] rounded-[20px] bg-[#007F5E] px-[32px] py-[16px] text-white transition-colors hover:bg-[#00664b]">
                    <span className="font-alexandria text-[16px] font-semibold">احسب الزكاه</span>
                    <Image src="/figma/mingcute_love-fill.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  </button>
                  <button className="flex h-[56px] w-[270px] items-center justify-center gap-[10px] rounded-[20px] border border-[#007F5E] bg-white px-[32px] py-[16px] transition-colors hover:bg-[#007F5E]/5">
                    <span className="font-alexandria text-[16px] font-semibold text-[#007F5E]">إدخال مبلغ الزكاة يدوياً</span>
                    <Image src="/figma/mingcute_love-fill-green.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section - Figma: x=320, y=623.47, width=1280 */}
      <section className="w-full bg-white pb-20">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-0">
          {/* Desktop View: Cards Stack - 30px gap between cards */}
          <div className="hidden xl:flex flex-col gap-[30px]">
            {ZAKAT_TYPES.map((type) => (
              <ZakatCard
                key={type.id}
                title={type.title}
                iconSrc={type.icon}
                amount={amounts[type.id] || ""}
                onAmountChange={(val) => handleAmountChange(type.id, val)}
                onCountryChange={(country) => handleCountryChange(type.id, country)}
                onPay={() => handlePay(type.id, type.title)}
              />
            ))}
          </div>

          {/* Mobile View: Dropdown + Inline Form */}
          <div className="xl:hidden flex flex-col items-center gap-6 w-full max-w-[555px] mx-auto">
            {/* Type Selector Dropdown */}
            <div className="relative w-full z-20">
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="flex bg-white items-center justify-between w-full p-4 rounded-[20px] shadow-[0px_2px_29px_0px_rgba(0,127,94,0.14)] mb-2 group transition-all"
                dir="rtl"
              >
                <div className="flex items-center gap-4">
                  {selectedZakatType && (
                    <Image src={selectedZakatType.icon} alt="" width={60} height={60} />
                  )}
                  <p className="font-alexandria text-[20px] font-semibold leading-[1.5] text-[#122F2A] text-right">
                    {selectedZakatType?.title || "اختر نوع الزكاة"}
                  </p>
                </div>
                <div className="p-2 flex items-center justify-center">
                  <div className={["transition-transform duration-300", isTypeDropdownOpen ? "rotate-180" : "rotate-0"].join(" ")}>
                    <Image
                      src="/emojis/weui_arrow-outlined.svg"
                      alt=""
                      width={18}
                      height={9}
                      style={{ filter: 'brightness(0)' }}
                    />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isTypeDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-[400px] overflow-y-auto">
                    {ZAKAT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type)}
                        className={[
                          "flex items-center justify-between w-full p-4 transition-colors border-b border-gray-50 last:border-none",
                          selectedZakatType?.id === type.id ? "bg-[rgba(0,127,94,0.05)]" : "hover:bg-gray-50"
                        ].join(" ")}
                        dir="rtl"
                      >
                        <div className="flex items-center gap-4">
                          <Image src={type.icon} alt="" width={50} height={50} />
                          <p className="font-alexandria text-[18px] font-semibold leading-[1.5] text-[#122F2A] text-right">{type.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inline Donation Form (visible when a type is selected or default) */}
            {selectedZakatType && (
              <div className="w-full flex flex-col gap-[20px] items-end px-4 md:px-[50px] py-[20px] relative">
                {/* Close Button - Top Left */}
                <button
                  type="button"
                  className="absolute left-4 md:left-[20px] top-[20px] size-[32px] flex items-center justify-center z-10 text-[#0D0D0D] hover:opacity-70 transition-opacity"
                  onClick={() => setSelectedZakatType(null)}
                >
                  <X className="size-6" />
                </button>

                {/* Title */}
                <div className="flex gap-[10px] items-center justify-center w-full">
                  <p className="font-alexandria text-[24px] font-semibold leading-[1.5] text-[#122F2A] text-right">
                    {selectedZakatType.title}
                  </p>
                </div>

                {/* Subtitle */}
                <p className="font-alexandria text-[16px] font-normal leading-[2] text-[#4F4F52] text-center w-full">
                  جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                </p>

                {/* Form Card */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid flex items-center justify-center pl-4 md:pl-[32px] pr-0 py-[16px] rounded-[20px] shadow-[0px_5px_12px_rgba(0,127,94,0.07)] w-full max-w-[592px]">
                  <div className="flex flex-col gap-[24px] grow items-end px-[16px] py-0 w-full">
                    {/* Amount Selection */}
                    <div className="flex flex-col gap-[16px] items-end w-full">
                      <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                        حدد المبلغ
                      </p>
                      <div className="flex items-center justify-between w-full gap-0 flex-wrap md:flex-nowrap">
                        {PRESET_AMOUNTS.map((amount) => {
                          const isActive = selectedAmount === amount && !customAmount;
                          return (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handleAmountSelect(amount)}
                              className={cn(
                                "flex h-[60px] items-center justify-center rounded-[20px] w-[calc(50%-4px)] md:w-[115px] border border-solid transition-all mb-2 md:mb-0",
                                isActive
                                  ? "border-[rgba(13,13,13,0.2)]"
                                  : "border-[rgba(13,13,13,0.2)]"
                              )}
                            >
                              {isActive ? (
                                <div className="bg-[rgba(0,127,94,0.1)] border border-[#007F5E] border-solid flex h-[57px] items-center justify-center rounded-[20px] w-[calc(100%-4px)] md:w-[110px]">
                                  <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                    $ {amount}
                                  </p>
                                </div>
                              ) : (
                                <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                  $ {amount}
                                </p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
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
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <div className="flex flex-col items-end w-full">
                        <p className="font-alexandria text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                          الاسم
                        </p>
                      </div>
                      <div className="flex h-[60px] items-center justify-end w-full rounded-[20px]">
                        <div className="basis-0 flex gap-[10px] grow h-full items-center justify-end min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                          <input
                            type="text"
                            placeholder="اسم المستخدم"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            dir="rtl"
                            className="flex flex-col h-full items-center justify-center pl-[16px] pr-[32px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <div className="flex flex-col items-end w-full">
                        <p className="font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] text-right w-full">
                          البريد الإلكتروني
                        </p>
                      </div>
                      <div className="flex h-[60px] items-center justify-end w-full rounded-[20px]">
                        <div className="basis-0 flex gap-[10px] grow h-full items-center justify-end min-h-px min-w-px rounded-[20px] border border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E] transition-colors">
                          <input
                            type="email"
                            placeholder="ادخل البريد الإلكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            dir="rtl"
                            className="flex flex-col h-full items-center justify-center pl-[16px] pr-[32px] py-0 shrink-0 grow bg-transparent font-alexandria font-light leading-normal text-[16px] text-[rgba(13,13,13,0.7)] outline-none placeholder:opacity-[0.67] placeholder:text-nowrap"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button
                      type="button"
                      className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-[32px] py-[16px] rounded-[35px] w-full"
                    >
                      <div className="relative shrink-0 size-[24px]">
                        <Image
                          src="/figma/mingcute_love-fill.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="size-6"
                        />
                      </div>
                      <p className="font-alexandria text-[16px] font-semibold leading-[1.5] text-white text-nowrap">
                        متابعة
                      </p>
                    </button>

                    {/* Login Link */}
                    <button
                      type="button"
                      onClick={openLoginModal}
                      className="font-alexandria text-[16px] font-normal leading-[1.6] text-[#6155F5] text-[rgba(13,13,13,0.7)] text-center w-full cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <span>ت</span>
                      <span className="underline decoration-solid [text-underline-position:from-font]">سجيل الدخول</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Donation Dialog */}
      <DonationModal
        open={isDonationDialogOpen}
        onClose={() => setIsDonationDialogOpen(false)}
        onSuccess={() => setIsSuccessModalOpen(true)}
        projectTitle={selectedZakatType?.title}
      />
      <DonationSuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
