"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";
import { CountryDropdown, type Country } from "@/components/ui/country-dropdown";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type FilterCategory = {
  id: string;
  title: string;
  iconSrc: string;
};

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "projects", title: "مشاريعنا للأيتام", iconSrc: "/all-campanes.svg" },
  { id: "orphan", title: "كفالة يتيم", iconSrc: "/orphan.svg" },
  { id: "educational", title: "كفالة تعليمية", iconSrc: "/education.svg" },
  { id: "humanitarian", title: "الكفالات الانسانية", iconSrc: "/human 1.svg" },
  { id: "medical", title: "الكفالات الطبية", iconSrc: "/medical.svg" },
];

type OrphanCard = {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  remainingAmount: number;
  monthlyAmount: number;
  progress: number;
};

// Mock data - replace with API call
const MOCK_ORPHANS: OrphanCard[] = [
  {
    id: "1",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
  {
    id: "2",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
  {
    id: "3",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
  {
    id: "4",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
  {
    id: "5",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
  {
    id: "6",
    name: "يامن طفل يتيم من غزّة",
    age: 4,
    imageUrl: "/sadaqah-jarya.jpg",
    remainingAmount: 100,
    monthlyAmount: 100,
    progress: 76,
  },
];

export function OrphanSponsorshipPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("orphan");
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0) {
      console.log("Donating:", { category: selectedCategory, amount, country: selectedCountry });
      // TODO: Implement actual donation logic
    }
  };

  const totalPages = Math.ceil(MOCK_ORPHANS.length / itemsPerPage);
  const paginatedOrphans = MOCK_ORPHANS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section dir="rtl" className="relative">
      {/* Background decorative elements for mobile */}
      <div className="absolute left-[-62.44px] top-[114px] hidden md:block pointer-events-none z-0">
        <div className="absolute flex h-[131.201px] items-center justify-center left-[-62.44px] top-[188.54px] w-[130.484px]">
          <div className="flex-none rotate-[302.279deg]">
            <div className="h-[93.696px] opacity-[0.15] relative w-[96px]">
              <Image
                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 9.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[89.318px] items-center justify-center left-[calc(75%+53.51px)] top-[114px] w-[89.202px]">
          <div className="flex-none rotate-[281.231deg]">
            <div className="h-[75.852px] opacity-[0.15] relative rounded-bl-[3px] rounded-br-[32px] rounded-tl-[32px] rounded-tr-[3px] w-[76px]">
              <Image
                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
                alt=""
                fill
                className="object-contain rounded-bl-[3px] rounded-br-[32px] rounded-tl-[32px] rounded-tr-[3px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background image with opacity for desktop */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image
            src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Container className="relative pt-8 pb-10 md:pt-[100px] md:pb-[100px]">
        {/* Donation Card and Image Section */}
        <section className="mb-[60px] md:mb-[100px]">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-[30px] items-start justify-center w-full">
            
            {/* Right Side: Image - Desktop only */}
            <div className="hidden xl:flex w-full xl:w-[630.22px] order-1">
              <div className="relative w-full h-[678px] rounded-[20px] overflow-hidden">
                <Image
                  src="/images/kafalah.png"
                  alt="كفالة الايتام"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Left Side: Donation Form Card */}
            <div className="flex flex-col items-center gap-6 w-full xl:w-[617.78px] order-2">
              {/* Mobile: Header section */}
              <div className="flex flex-col items-start gap-2 w-full md:max-w-[350px] self-start lg:self-center xl:self-start">
                <div className="flex items-center justify-center gap-[5px]">
                  <p className="font-alexandria text-sm md:text-[16px] leading-normal text-[#007F5E] text-nowrap">
                    كفالة تُحيي الأمل
                  </p>
                  <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 overflow-hidden">
                    <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
                  </span>
                </div>
                <p className="font-alexandria text-xl md:text-[30px] font-bold md:leading-[1.6] text-[#0D0D0D] text-left">
                  كن سببًا في سعادة يتيم
                </p>
              </div>

              {/* Donation Form Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-4 md:px-8 py-6 md:py-4 w-full relative z-10 max-w-[617.78px]">
                {/* Background texture for mobile */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-[20px] md:hidden">
                  <Image
                    src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png"
                    alt=""
                    fill
                    className="object-cover rounded-[20px]"
                  />
                </div>

                <div className="flex flex-col gap-6 items-center w-full relative z-10">
                  {/* Mobile: Section title */}
                  <div className="flex items-center justify-center gap-[10px] w-full md:hidden mb-2">
                    <p className="font-alexandria text-[20px] font-bold leading-normal text-[#232325] text-right">
                      كم تريد التبرع اليوم
                    </p>
                    <div className="relative h-8 w-8">
                      <Image
                        src="/emojis/hand_healtcare.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Mobile: Description */}
                  <p className="font-alexandria text-sm text-[#4f4f52] text-center leading-[2] px-4 md:hidden mb-4">
                    جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                  </p>

                  {/* Amount selection */}
                  <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex flex-col items-end w-full">
                      <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                        حدد المبلغ
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center sm:gap-4 gap-3 w-full" dir="rtl">
                      {[...PRESET_AMOUNTS].reverse().map((amount) => {
                        const isActive = selectedAmount === amount && !customAmount;
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                            }}
                            className={[
                              "flex items-center justify-center rounded-[20px] transition-all w-full sm:w-[115px]",
                              isActive
                                ? "h-12 sm:h-[60px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                                : "h-12 sm:h-[60px] border border-[rgba(13,13,13,0.2)] px-4 hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                            ].join(" ")}
                          >
                            <p className="font-alexandria text-sm md:text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                              $ {amount}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom amount */}
                  <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex flex-col items-end w-full">
                      <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                        مبلغ مخصص
                      </p>
                    </div>
                    <AmountInput
                      placeholder="أدخل القيمة"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value) setSelectedAmount(0);
                      }}
                      className="h-12 sm:h-[60px] w-full"
                    />
                  </div>

                  {/* Country selector */}
                  <div className="flex gap-4 h-auto sm:h-[81px] items-center justify-start w-full" dir="rtl">
                    <p className="font-alexandria text-base md:text-[18px] font-medium leading-[1.5] text-[#122F2A] text-center text-nowrap">
                      الدولة
                    </p>
                    <div className="flex-1">
                      <CountryDropdown
                        onChange={handleCountryChange}
                        defaultValue={selectedCountry?.name || "Palestine"}
                        placeholder="فلسطين"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Donate button */}
                  <button
                    type="button"
                    onClick={handleDonate}
                    className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full"
                  >
                    <Image
                      src="/figma/mingcute-love-fill.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <p className="font-alexandria text-sm md:text-[16px] font-semibold leading-[1.5] text-white text-nowrap">
                      تبرع الان
                    </p>
                  </button>

                  {/* Security text */}
                  <p className="font-alexandria text-xs sm:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                    معاملة مشفرة آمنة بتقنية SSL
                  </p>
                </div>
              </div>

              {/* Supporting text - Desktop only */}
              <p className="hidden md:block text-xs sm:text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-center font-alexandria max-w-[617.78px]">
                بدعمك المستمر، نوفّر لليتيم احتياجاته الأساسية ونمنحه مستقبلًا أكثر أمانًا
              </p>
            </div>

            {/* Mobile: Image below form */}
            <div className="flex xl:hidden w-full order-1">
              <div className="relative w-full h-[455px] rounded-[20px] overflow-hidden">
                <Image
                  src="/images/kafalah.png"
                  alt="كفالة الايتام"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-[48px] md:mb-[73px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            {/* Filter categories - Scrollable on Mobile */}
            <div className="flex overflow-x-auto no-scrollbar items-center justify-start gap-4 md:gap-4 flex-1 w-full py-2 md:py-0 order-1 md:order-1 pr-0" >
              {FILTER_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={[
                      "flex flex-col items-center justify-center gap-[5px] pl-[5px] pr-0 py-[10px] md:py-0 transition-all min-h-[73px] min-w-[90px] md:min-w-[132px] shrink-0",
                      isActive
                        ? "border-b-2 border-[#007F5E] text-[#007F5E]"
                        : "text-[#122F2A] hover:text-[#007F5E]",
                    ].join(" ")}
                  >
                    <Image
                      src={category.iconSrc}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-center whitespace-nowrap">
                      {category.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Filter icon - Desktop only */}
            <div className="hidden md:flex items-center justify-center w-[29.96px] h-[32px] order-2">
              <Image
                src="/mage_filter-fill.svg"
                alt="Filter"
                width={34}
                height={34}
                className="w-[34px] h-[34px]"
              />
            </div>
          </div>
        </section>

        {/* Orphan Cards Grid */}
        <section className="mb-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
            {paginatedOrphans.map((orphan) => (
              <div
                key={orphan.id}
                className="bg-white border border-[rgba(13,13,13,0.3)] rounded-[20px] overflow-hidden hover:shadow-[0px_8px_24px_0px_rgba(0,127,94,0.15)] transition-shadow"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image */}
                  <div className="relative w-full sm:w-[257.56px] h-[257.56px] sm:h-auto bg-[#d9d9d9] shrink-0 order-1 sm:order-1">
                    <Image
                      src={orphan.imageUrl}
                      alt={orphan.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-4 md:p-6 flex-1 order-2 sm:order-2">
                    <div className="w-full">
                      <h3 className="font-alexandria text-base md:text-[18px] font-medium leading-normal text-[#122F2A] mb-4">
                        {orphan.name}
                      </h3>

                      {/* Progress bar section */}
                      <div className="mb-4">
                        {/* Age - positioned at top left */}
                        <div className="flex items-center justify-start mb-2">
                          <p className="font-alexandria text-[16px] font-medium leading-[38px] text-[#122F2A]">
                            العمر : {orphan.age} سنوات
                          </p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-[rgba(217,217,217,0.4)] rounded-[10px] overflow-hidden mb-2">
                          <div
                            className="h-full bg-[#007F5E] rounded-[10px] transition-all"
                            style={{ width: `${orphan.progress}%` }}
                          />
                        </div>

                        {/* Amount info */}
                        <div className="flex items-center justify-between">
                          <p className="font-alexandria text-[16px] font-semibold text-[#0d0d0d]">
                            $ {orphan.remainingAmount}
                          </p>
                          <p className="font-alexandria text-[16px] font-normal text-[rgba(13,13,13,0.7)]">
                            المتبقي لتأمينها شهرياً
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Donate button */}
                    <button
                      type="button"
                      className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[20px] w-full sm:w-[160px] self-start mt-4 sm:mt-auto"
                    >
                      <Image
                        src="/figma/mingcute-love-fill.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <p className="font-alexandria text-[16px] font-semibold leading-[1.5] text-white text-nowrap">
                        تبرع الان
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="flex items-center justify-center gap-[10px] mb-10" dir="rtl">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
              className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border transition ${
                currentPage === 1
                  ? "border-[#D4D4D4] bg-white text-[#474747] opacity-60 cursor-not-allowed"
                  : "border-[#007F5E] bg-[#007F5E] text-white hover:bg-[#006B4E]"
              }`}
            >
              <Image
                src="/iconamoon_arrow-up-2.svg"
                alt="السابق"
                width={21}
                height={21}
                className="h-[21px] w-[21px]"
              />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border text-[15px] font-medium transition ${
                  page === currentPage
                    ? "border-[#007F5E] bg-[#007F5E] text-white"
                    : "border-[#D4D4D4] bg-white text-[#474747] hover:border-[#007F5E] hover:text-[#007F5E]"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="الصفحة التالية"
              className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border transition ${
                currentPage === totalPages
                  ? "border-[#D4D4D4] bg-white text-[#474747] opacity-60 cursor-not-allowed"
                  : "border-[#007F5E] bg-[#007F5E] text-white hover:bg-[#006B4E]"
              }`}
            >
              <Image
                src="/iconamoon_arrow-up-2.svg"
                alt="التالي"
                width={21}
                height={21}
                className="h-[21px] w-[21px] rotate-180"
              />
            </button>
          </section>
        )}
      </Container>

      {/* Bottom CTA Section */}
      <section className="relative py-10 md:py-[100px] bg-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-[5px]">
              <p className="font-alexandria text-xs sm:text-[16px] leading-[1.5] text-[#007F5E] text-nowrap">
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
              <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 shrink-0 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
            </div>
            <p className="font-alexandria text-xl md:text-[32px] font-bold leading-[1.5] text-[#122F2A] text-center max-w-[496px]">
              كن سببا في ابتسامة شخص ما
            </p>
          </div>
        </Container>
      </section>
    </section>
  );
}

