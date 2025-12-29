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
  { id: "water", title: "سقيا الماء", iconSrc: "/globe.svg", isHighlighted: true },
  { id: "purification", title: "تطهير مال وأسهم", iconSrc: "/all-campanes.svg" },
  { id: "nadhr", title: "النذر", iconSrc: "/heart.svg" },
  { id: "aqiqah", title: "عقائق", iconSrc: "/orphan.svg" },
  { id: "relieve", title: "تفريج كربة", iconSrc: "/heart.svg" },
  { id: "pay-harm", title: "دفع بلاء", iconSrc: "/medical.svg" },
  { id: "clothe", title: "كسوة مسكين", iconSrc: "/human 1.svg" },
  { id: "sadaqah-jariyah", title: "صدقة جارية", iconSrc: "/heart.svg" },
  { id: "expiation", title: "كفارة يمين", iconSrc: "/heart.svg" },
  { id: "feed", title: "إطعام مسكين", iconSrc: "/education.svg" },
  { id: "debtors", title: "الغارمين", iconSrc: "/file.svg" },
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
    <main dir="rtl" className="relative bg-white">
      {/* Background image with opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]">
          {/* Placeholder for background image - replace with actual image */}
          <div className="w-full h-full bg-gray-200" />
        </div>
      </div>

      <div className="relative px-4 py-10 md:px-[320px] md:py-[100px]">
        {/* Intro section */}
        <section className="mb-[40px] md:mb-[79px]">
          <div className="mx-auto flex w-full max-w-[971px] flex-col items-center md:items-center gap-[8px] text-center">
            <div className="flex items-center justify-center gap-[5px]">
              <p className="text-sm md:text-[16px] leading-normal text-[#007F5E] text-nowrap font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                زكاتك حياة… تصل لمستحقيها
              </p>
              <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
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
        <section className="flex flex-col lg:grid lg:grid-cols-[1fr_555px] gap-6 lg:gap-[10px] items-start justify-center w-full max-w-[1280px] mx-auto">
          
          {/* Left Side: Grid of donation type cards - Visible only on Desktop */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4 items-start w-full order-2 lg:order-1">
            {DONATION_TYPES.map((type) => {
              const isActive = selectedType.id === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className={[
                    "group bg-white flex items-center justify-end px-6 md:px-8 py-4 rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] w-full md:w-[348px] transition-all duration-300 cursor-pointer",
                    isActive 
                      ? "shadow-[0px_19px_29px_0px_rgba(0,127,94,0.14)] ring-2 ring-[#007F5E]" 
                      : "hover:shadow-[0px_8px_24px_0px_rgba(0,127,94,0.15)] hover:scale-[1.02] hover:-translate-y-1",
                    "ml-auto",
                  ].join(" ")}
                >
                  <div className="flex gap-4 items-center justify-end w-full">
                    <div className="flex flex-col items-start mr-auto md:mr-0">
                      <p className="font-alexandria text-lg md:text-[20px] font-bold leading-[1.5] text-[#122F2A] text-nowrap text-right">
                        {type.title}
                      </p>
                    </div>
                    <div className="bg-[rgba(223,211,131,0.2)] flex flex-col items-center justify-center overflow-hidden px-0 py-[9px] rounded-[53px] w-16 h-16 md:w-20 md:h-20 transition-all duration-300 group-hover:bg-[rgba(223,211,131,0.3)]">
                      <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                          src={type.iconSrc}
                          alt=""
                          width={40}
                          height={40}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Donation form card - Dropdown ONLY on Mobile */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-[555px] order-1 lg:order-2">
            
            {/* Type Selector Dropdown - Visible ONLY on Mobile */}
            <div className="relative w-full z-20 lg:hidden">
              <button 
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="flex bg-white items-center justify-between w-full p-4 rounded-[20px] shadow-[0px_2px_29px_0px_rgba(0,127,94,0.14)] mb-2 group transition-all"
              >
                <div className="p-2">
                  <Image 
                    src="/emojis/weui_arrow-outlined.svg" 
                    alt="" 
                    width={24} 
                    height={12} 
                    className={["transition-transform duration-300", isTypeDropdownOpen ? "rotate-[270deg]" : "rotate-90"].join(" ")} 
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-alexandria text-[18px] font-bold text-[#122F2A]">{selectedType.title}</p>
                  <div className="bg-[rgba(223,211,131,0.2)] flex items-center justify-center rounded-full w-[65px] h-[65px]">
                    <Image src={selectedType.iconSrc} alt="" width={40} height={40} />
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
                      >
                         <div className="flex items-center gap-4 mr-auto">
                           
                         </div>
                         <div className="flex items-center gap-4">
                           <p className="font-alexandria text-base font-medium text-[#122F2A]">{type.title}</p>
                           <div className="bg-[rgba(223,211,131,0.1)] flex items-center justify-center rounded-full w-10 h-10">
                             <Image src={type.iconSrc} alt="" width={24} height={24} />
                           </div>
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* "How much?" Title - Visible ONLY on Mobile/iPhone */}
            <div className="flex lg:hidden items-center justify-center gap-2.5 w-full mb-2">
               <p className="font-alexandria text-lg md:text-[18px] font-bold text-[#232325]">كم تريد التبرع اليوم</p>
               <Image src="/figma/hugeicons-healthcare.svg" alt="" width={32} height={32} />
            </div>
            
            <p className="lg:hidden font-alexandria text-sm text-[#4f4f52] text-center leading-[2] mb-2 px-4 max-w-[400px]">
              جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
            </p>

            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-6 md:px-8 py-6 md:py-4 w-full relative z-10">
              <div className="flex flex-col gap-6 items-center w-full">
                {/* Desktop Title - Visible only on Desktop */}
                <p className="hidden lg:block font-alexandria text-[24px] font-bold leading-[1.5] text-[#007F5E] text-center text-nowrap">
                  {selectedType.title}
                </p>

                {/* Amount selection */}
                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col items-end w-full">
                    <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                      حدد المبلغ
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-3 w-full" dir="rtl">
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
                            "flex items-center justify-center rounded-[20px] transition-all w-full",
                            isActive
                              ? "h-[57px] md:w-[106px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                              : "h-[60px] md:w-[110px] border border-[rgba(13,13,13,0.2)] px-4 hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
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
                    className="h-[60px] w-full"
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
                <div className="flex gap-4 h-auto md:h-[81px] items-center justify-end w-full" dir="rtl">
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
                  <p className="font-alexandria text-sm md:text-[16px] font-normal leading-normal text-white text-nowrap">
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
                <p className="font-alexandria text-sm md:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                  معاملة مشفرة آمنة بتقنية SSL
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
