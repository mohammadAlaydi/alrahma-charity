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
  { id: "medical", title: "الكفالات الطبية", iconSrc: "/medical.svg" },
  { id: "humanitarian", title: "الكفالات الانسانية", iconSrc: "/human 1.svg" },
  { id: "educational", title: "كفالة تعليمية", iconSrc: "/education.svg" },
  { id: "orphan", title: "كفالة يتيم", iconSrc: "/orphan.svg" },
  { id: "projects", title: "مشاريعنا للأيتام", iconSrc: "/all-campanes.svg" },
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
    <main dir="rtl" className="relative bg-white">
      {/* Background image with opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]">
          {/* Placeholder for background image - replace with actual image */}
          <div className="w-full h-full bg-gray-200" />
        </div>
      </div>

      <Container className="relative py-10 md:py-[100px]">
        {/* Donation Card and Image Section */}
        <section className="mb-[60px] md:mb-[100px]">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-[30px] items-start justify-center w-full">
            
            {/* Left Side: Donation Form Card */}
            <div className="flex flex-col items-center gap-6 w-full xl:w-1/2 order-1">
              <div className="flex flex-col items-end gap-2 w-full max-w-[350px] self-end lg:self-center xl:self-end">
                <div className="flex items-center justify-center gap-[5px]">
                  <p className="text-sm md:text-[16px] leading-normal text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                    كفالة تُحيي الأمل
                  </p>
                  <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 overflow-hidden">
                    <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
                  </span>
                </div>
                <p className="font-alexandria text-xl md:text-[30px] font-bold md:leading-[1.6] text-[#0D0D0D] text-right">
                  كن سببًا في سعادة يتيم
                </p>
              </div>

              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-6 md:px-8 py-6 md:py-4 w-full relative z-10 max-w-[552px]">
                <div className="flex flex-col gap-6 items-center w-full">
                  {/* Amount selection */}
                  <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex flex-col items-end w-full">
                      <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                        حدد المبلغ
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-3 w-full" dir="rtl">
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
                              "flex items-center justify-center rounded-[20px] transition-all w-full sm:flex-1",
                              isActive
                                ? "h-12 sm:h-[57px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
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
                  <div className="flex gap-4 h-auto sm:h-[81px] items-center justify-end w-full" dir="rtl">
                    <p className="font-alexandria text-base md:text-[18px] font-medium leading-normal text-[#122F2A] text-right text-nowrap">
                      الدولة
                    </p>
                    <div className="flex-1">
                      <CountryDropdown
                        onChange={handleCountryChange}
                        defaultValue={selectedCountry?.name || "Palestine"}
                        placeholder="اختر الدولة"
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
                    <p className="font-alexandria text-sm md:text-[16px] font-bold leading-normal text-white text-nowrap">
                      تبرع الان
                    </p>
                    <Image
                      src="/figma/mingcute-love-fill.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </button>

                  {/* Security text */}
                  <p className="font-alexandria text-xs sm:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                    معاملة مشفرة آمنة بتقنية SSL
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-center font-alexandria max-w-[400px]">
                بدعمك المستمر، نوفّر لليتيم احتياجاته الأساسية ونمنحه مستقبلًا أكثر أمانًا
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="flex w-full xl:w-1/2 order-2">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[678px] rounded-[20px] overflow-hidden">
                <Image
                  src="/sadaqah-jarya.jpg"
                  alt="غزة"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gaza text overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="font-alexandria text-[50px] sm:text-[80px] md:text-[154px] font-bold text-white/30">
                    غـــــــــــــزة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-[48px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            {/* Filter icon - Hidden on very small screens */}
            <div className="hidden sm:flex items-center justify-center w-[30px] h-[32px]">
              <Image
                src="/mage_filter-fill.svg"
                alt="Filter"
                width={34}
                height={34}
                className="w-[34px] h-[34px]"
              />
            </div>

            {/* Filter categories - Scrollable on Mobile */}
            <div className="flex overflow-x-auto no-scrollbar items-center justify-start md:justify-center gap-4 md:gap-6 flex-1 w-full py-2">
              {FILTER_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={[
                      "flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-[10px] transition-all min-h-[73px] min-w-[120px]",
                      isActive
                        ? "bg-[#007F5E] text-white shadow-[0px_5px_12px_0px_rgba(0,127,94,0.2)]"
                        : "bg-white text-[#122F2A] hover:bg-gray-50 border border-gray-200",
                    ].join(" ")}
                  >
                    <Image
                      src={category.iconSrc}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <p className="font-alexandria text-xs md:text-sm font-medium leading-normal text-center whitespace-nowrap">
                      {category.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Orphan Cards Grid */}
        <section className="mb-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {paginatedOrphans.map((orphan) => (
              <div
                key={orphan.id}
                className="bg-white rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] overflow-hidden hover:shadow-[0px_8px_24px_0px_rgba(0,127,94,0.15)] transition-shadow"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image */}
                  <div className="relative w-full sm:w-[200px] md:w-[257.56px] h-[200px] sm:h-auto bg-gray-200 shrink-0">
                    <Image
                      src={orphan.imageUrl}
                      alt={orphan.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 flex-1">
                    <div className="w-full">
                      <h3 className="font-alexandria text-base md:text-lg lg:text-[20px] font-bold leading-normal text-[#122F2A] mb-4">
                        {orphan.name}
                      </h3>

                      {/* Progress bar section */}
                      <div className="mb-4">
                        {/* Age - positioned at top right */}
                        <div className="flex items-center justify-end mb-4">
                          <p className="font-alexandria text-xs md:text-sm text-[rgba(13,13,13,0.7)]">
                            العمر : {orphan.age} سنوات
                          </p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-[#007F5E] rounded-full transition-all"
                            style={{ width: `${orphan.progress}%` }}
                          />
                        </div>

                        {/* Amount info */}
                        <div className="flex items-center justify-between">
                          <p className="font-alexandria text-xs text-[rgba(13,13,13,0.7)]">
                            $ {orphan.remainingAmount}
                          </p>
                          <p className="font-alexandria text-xs text-[rgba(13,13,13,0.7)]">
                            المتبقي لتأمينها شهرياً
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Donate button */}
                    <button
                      type="button"
                      className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-6 py-2 rounded-[35px] w-full sm:w-[140px] self-end mt-4 sm:mt-auto"
                    >
                      <Image
                        src="/figma/mingcute-love-fill.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      <p className="font-alexandria text-sm font-normal leading-normal text-white text-nowrap">
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
          <section className="flex items-center justify-center gap-2 mb-10" dir="rtl">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                currentPage === 1
                  ? "border-[#D4D4D4] bg-white text-[#474747] opacity-60 cursor-not-allowed"
                  : "border-[#007F5E] bg-[#007F5E] text-white hover:bg-[#006B4E]"
              }`}
            >
              <Image
                src="/iconamoon_arrow-up-2.svg"
                alt="السابق"
                width={18}
                height={18}
                className="h-4 w-4"
              />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition ${
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
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                currentPage === totalPages
                  ? "border-[#D4D4D4] bg-white text-[#474747] opacity-60 cursor-not-allowed"
                  : "border-[#007F5E] bg-[#007F5E] text-white hover:bg-[#006B4E]"
              }`}
            >
              <Image
                src="/iconamoon_arrow-up-2.svg"
                alt="التالي"
                width={18}
                height={18}
                className="h-4 w-4 rotate-180"
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
              <p className="text-xs sm:text-[16px] leading-[1.5] text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
              <span aria-hidden="true" className="relative h-5 w-5 shrink-0 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
            </div>
            <p className="font-['Cairo',var(--font-cairo),sans-serif] text-xl md:text-[32px] font-bold leading-[1.5] text-[#122F2A] text-center max-w-[496px]">
              كن سببا في ابتسامة شخص ما
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

