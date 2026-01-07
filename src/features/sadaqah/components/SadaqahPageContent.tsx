"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";
import { CountryDropdown, type Country } from "@/components/ui/country-dropdown";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type DonationType = {
  id: string;
  title: string;
  iconSrc: string;
  isHighlighted?: boolean;
};

const DONATION_TYPES: DonationType[] = [
  { id: "water", title: "سقيا الماء", iconSrc: "/water.png", isHighlighted: true },
  { id: "purification", title: "تطهير مال وأسهم", iconSrc: "/step.png" },
  { id: "nadhr", title: "النذر", iconSrc: "/hands.png" },
  { id: "aqiqah", title: "عقائق", iconSrc: "/goat.png" },
  { id: "relieve", title: "تفريج كربة", iconSrc: "/sad.png" },
  { id: "pay-harm", title: "دفع بلاء", iconSrc: "/money-frow.png" },
  { id: "clothe", title: "كسوة مسكين", iconSrc: "/clothes.png" },
  { id: "sadaqah-jariyah", title: "صدقة جارية", iconSrc: "/sadaqah-jaryah.png" },
  { id: "expiation", title: "كفارة يمين", iconSrc: "/judge.png" },
  { id: "feed", title: "إطعام مسكين", iconSrc: "/food.png" },
  { id: "debtors", title: "الغارمين", iconSrc: "/alms-svgrepo-com 3.png" },
];

export function SadaqahPageContent() {
  const [selectedType, setSelectedType] = useState<DonationType>(DONATION_TYPES[0]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "credit">("credit");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  const handleTypeSelect = (type: DonationType) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
  };

  return (
    <section dir="rtl" className="">
      {/* Background image with opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]">
          {/* Placeholder for background image - replace with actual image */}
          <div className="w-full h-full bg-gray-200" />
        </div>
      </div>

      <Container className="relative pt-8 pb-10 md:pb-[100px]">
        {/* Intro section */}
        <section className="mb-[40px] md:mb-[79px]">
          <div className="mx-auto flex w-full max-w-[971px] flex-col items-center gap-[8px] text-center">
            <div className="flex items-center justify-center gap-[5px]">
            <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 shrink-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6">
                  <path d="M4.66663 16.3334H7.46079C7.80379 16.3334 8.14213 16.4104 8.44896 16.5597L10.8313 17.7124C11.1381 17.8605 11.4765 17.9375 11.8206 17.9375H13.0363C14.2123 17.9375 15.1666 18.8604 15.1666 19.999C15.1666 20.0457 15.1351 20.0854 15.0896 20.0982L12.1251 20.9184C11.5932 21.0653 11.026 21.0139 10.5291 20.7737L7.98229 19.5417M9.79529 2.97736C11.515 1.91102 13.0176 2.34036 13.9195 3.02519C14.2893 3.30519 14.4748 3.44519 14.5833 3.44519C14.6918 3.44519 14.8773 3.30519 15.2471 3.02519C16.149 2.34036 17.6505 1.91102 19.3713 2.97736C21.63 4.37736 22.141 8.99269 16.933 12.887C15.9401 13.629 15.4443 14 14.5833 14C13.7223 14 13.2265 13.629 12.2348 12.887C7.02563 8.99269 7.53663 4.37619 9.79529 2.97736Z" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.1666 19.25L20.5251 17.6039C20.9916 17.4607 21.4914 17.4686 21.9532 17.6264C22.4149 17.7841 22.8151 18.0837 23.0965 18.4824C23.527 19.0774 23.352 19.9314 22.7243 20.293L13.9568 25.3529C13.6826 25.5115 13.3791 25.6126 13.0646 25.6501C12.7501 25.6876 12.4312 25.6607 12.1275 25.571L4.66663 23.3567" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <p className="text-sm md:text-[16px] leading-normal text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
              صدقة اليوم… أمان لغدهم
              </p>

            </div>

            <p className="font-alexandria text-xl md:text-[30px] font-bold md:leading-[1.6] text-[#0D0D0D]">
              <span>{`الصدقات… `}</span>
              <span className="text-[#007F5E]">أجر يمتد ولا ينقطع</span>
            </p>

            <p className="w-full text-center text-sm md:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] font-alexandria">
              الصدقات هي كل عمل خير ينتفع به صاحبه في حياته ويمتدُ نفعهُ إلى ما بعد الموت. وقد دلت
              الكثير من نصوص القرآن الكريم والسنة النبوية على مشروعيتها والحث على القيام بها. وتدرج
              مؤسسة الخير العديد من المشاريع الخيرية ضمن مشاريع الصدقة الجارية تسهيلاً على المحسنين
              الكرام لزيادة الأجر وحتى ينتفع بها ذوو الحاجة، مثل مشاريع حفر الآبار وبناء المدارس
              والمساجد وتعليم الأطفال وطلبة العلم والمشاريع المدرة للدخل للأسر المتعففة
            </p>
          </div>
        </section>

        {/* Main content: Two-column layout on desktop, single column on mobile */}
        <section className="flex flex-col xl:grid xl:grid-cols-[minmax(0,1.3fr)_555px] gap-10 items-start justify-center w-full">
          
          {/* Left Side: Grid of donation type cards - Visible only on Desktop */}
          <div className="hidden xl:grid xl:grid-cols-2 gap-4 items-start w-full order-2 xl:order-1">
            {DONATION_TYPES.map((type) => {
              const isActive = selectedType.id === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className={[
                    "group bg-white flex items-center justify-start px-6 md:px-8 py-4 rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] w-full h-[112px] transition-all duration-300 cursor-pointer",
                    isActive 
                      ? "shadow-[0px_19px_29px_0px_rgba(0,127,94,0.14)] ring-2 ring-[#007F5E]" 
                      : "hover:shadow-[0px_8px_24px_0px_rgba(0,127,94,0.15)] hover:scale-[1.02] hover:-translate-y-1",
                  ].join(" ")}
                >
                  <div className="flex gap-4 items-center justify-start w-full min-w-0">
                    <Image
                      src={type.iconSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="shrink-0"
                    />
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <p className="font-alexandria text-lg md:text-[20px] font-bold leading-normal text-[#122F2A] text-right wrap-break-word">
                        {type.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Donation form card - Dropdown ONLY on Mobile */}
          <div className="flex flex-col items-center gap-6 w-full xl:w-[555px] order-1 xl:order-2">
            
            {/* Type Selector Dropdown - Visible ONLY on Mobile */}
            <div className="relative w-full z-20 xl:hidden">
              <button 
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="flex bg-white items-center justify-between w-full p-4 rounded-[20px] shadow-[0px_2px_29px_0px_rgba(0,127,94,0.14)] mb-2 group transition-all"
                dir="rtl"
              >
                <div className="flex items-center gap-4">
                  <Image src={selectedType.iconSrc} alt="" width={40} height={40} />
                  <p className="font-alexandria text-[18px] font-bold text-[#122F2A]">{selectedType.title}</p>
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
                    {DONATION_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type)}
                        className={[
                          "flex items-center justify-between w-full p-4 transition-colors border-b border-gray-50 last:border-none",
                          selectedType.id === type.id ? "bg-[rgba(0,127,94,0.05)]" : "hover:bg-gray-50"
                        ].join(" ")}
                        dir="rtl"
                      >
                         <div className="flex items-center gap-4">
                           <Image src={type.iconSrc} alt="" width={24} height={24} />
                           <p className="font-alexandria text-base font-medium text-[#122F2A]">{type.title}</p>
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* "How much?" Title - Visible ONLY on Mobile/iPhone */}
            <div className="flex xl:hidden items-center justify-center gap-2.5 w-full mb-2">
               <p className="font-alexandria text-lg md:text-[18px] font-bold text-[#232325]">كم تريد التبرع اليوم</p>
               <Image src="/figma/hugeicons-healthcare.svg" alt="" width={32} height={32} />
            </div>
            
            <p className="xl:hidden font-alexandria text-sm text-[#4f4f52] text-center leading-[2] mb-2 px-4 max-w-[400px]">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>

            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-6 md:px-8 py-6 md:py-4 w-full relative z-10">
              <div className="flex flex-col gap-6 items-center w-full">
                {/* Desktop Title - Visible only on Desktop */}
                <p className="hidden xl:block font-alexandria text-[24px] font-bold leading-[1.5] text-[#007F5E] text-center text-nowrap">
                  {selectedType.title}
                </p>

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

                {/* Payment method - Hidden on Mobile per Figma 1390:40674 */}
                <div className="hidden lg:flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      أخنر طريقة الدفع
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:h-[60px] items-center justify-start rounded-[20px] w-full" dir="rtl">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit")}
                      className={[
                        "flex gap-[10px] h-full items-center justify-center px-4 transition-all w-full md:w-auto",
                        paymentMethod === "credit"
                          ? "text-[#007F5E]"
                          : "text-[rgba(13,13,13,0.7)] opacity-[0.67]",
                      ].join(" ")}
                    >
                      <p className="font-alexandria text-sm md:text-[16px] font-medium leading-normal text-nowrap">
                        بطاقة إئتمان
                      </p>
                      <div className="h-[17px] w-[17px] shrink-0 relative flex items-center justify-center">
                        <Image
                          src="/circle-option.svg"
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px]"
                        />
                        {paymentMethod === "credit" && (
                          <div className="absolute h-[9px] w-[9px] rounded-full bg-[#007F5E]" />
                        )}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={[
                        "flex gap-[10px] h-full items-center justify-center px-4 transition-all w-full md:w-auto",
                        paymentMethod === "paypal"
                          ? "text-[#007F5E]"
                          : "text-[rgba(13,13,13,0.7)] opacity-[0.67]",
                      ].join(" ")}
                    >
                      <p className="font-alexandria text-sm md:text-[16px] font-medium leading-normal text-nowrap">
                        PayPal
                      </p>
                      <div className="h-[17px] w-[17px] shrink-0 relative flex items-center justify-center">
                        <Image
                          src="/circle-option.svg"
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px]"
                        />
                        {paymentMethod === "paypal" && (
                          <div className="absolute h-[9px] w-[9px] rounded-full bg-[#007F5E]" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Country selector - Single row on Mobile per Figma 1390:41080 */}
                <div className="flex gap-4 h-auto sm:h-[81px] items-center justify-end w-full" dir="rtl">
                <p className="font-alexandria text-base md:text-[18px] font-medium leading-normal text-[#122F2A] text-right md:text-center text-nowrap">
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
                  className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full"
                >
                  <p className="font-alexandria text-sm md:text-[16px] font-bold leading-normal text-white text-nowrap">
                    تبرع الان
                  </p>
                  <Image
                    src="/figma/mingcute_love-fill.svg"
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
          </div>
        </section>
      </Container>

      {/* Gaza Children Section - Centered - Separate Container */}
      <section className="relative py-10 md:py-[100px] bg-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-[5px]">
              <span aria-hidden="true" className="relative h-5 w-5 sm:h-6 sm:w-6 shrink-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6">
                  <path d="M4.66663 16.3334H7.46079C7.80379 16.3334 8.14213 16.4104 8.44896 16.5597L10.8313 17.7124C11.1381 17.8605 11.4765 17.9375 11.8206 17.9375H13.0363C14.2123 17.9375 15.1666 18.8604 15.1666 19.999C15.1666 20.0457 15.1351 20.0854 15.0896 20.0982L12.1251 20.9184C11.5932 21.0653 11.026 21.0139 10.5291 20.7737L7.98229 19.5417M9.79529 2.97736C11.515 1.91102 13.0176 2.34036 13.9195 3.02519C14.2893 3.30519 14.4748 3.44519 14.5833 3.44519C14.6918 3.44519 14.8773 3.30519 15.2471 3.02519C16.149 2.34036 17.6505 1.91102 19.3713 2.97736C21.63 4.37736 22.141 8.99269 16.933 12.887C15.9401 13.629 15.4443 14 14.5833 14C13.7223 14 13.2265 13.629 12.2348 12.887C7.02563 8.99269 7.53663 4.37619 9.79529 2.97736Z" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.1666 19.25L20.5251 17.6039C20.9916 17.4607 21.4914 17.4686 21.9532 17.6264C22.4149 17.7841 22.8151 18.0837 23.0965 18.4824C23.527 19.0774 23.352 19.9314 22.7243 20.293L13.9568 25.3529C13.6826 25.5115 13.3791 25.6126 13.0646 25.6501C12.7501 25.6876 12.4312 25.6607 12.1275 25.571L4.66663 23.3567" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <p className="text-xs sm:text-[16px] leading-[1.5] text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
            </div>
            <p className="font-['Cairo',var(--font-cairo),sans-serif] text-xl md:text-[32px] font-bold leading-[1.5] text-[#122F2A] text-center max-w-[496px]">
              كن سببا في ابتسامة شخص ما
            </p>
          </div>
        </Container>
      </section>
    </section>
    
  );
}
