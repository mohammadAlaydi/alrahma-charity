import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountSelector } from "@/features/donations/components/AmountSelector";
import { CountryDropdown } from "@/components/ui/country-dropdown";

type ProjectDonationSectionProps = {
    onDonate: (data: { amount: number; isCustom: boolean; country: string | null }) => void;
};

export function ProjectDonationSection({ onDonate }: ProjectDonationSectionProps) {
    const [selectedAmount, setSelectedAmount] = useState<number>(200);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleCountryChange = (country: { name: string }) => {
        setSelectedCountry(country.name);
    };

    const handleDonateClick = () => {
        const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
        if (amount > 0) {
            onDonate({
                amount,
                isCustom: !!customAmount,
                country: selectedCountry
            });
        }
    };

    return (
        <section className="py-16 md:py-24 relative">
            <Container>
                <div className="relative rounded-[20px] p-8 md:p-12 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <Image
                            src="/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg"
                            alt=""
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Left Corner Decoration */}
                    <div className="absolute left-[-100px] top-[-80px] w-[400px] h-[600px] pointer-events-none opacity-100 z-0">
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/peigeCorners1.png"
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Corner Decoration */}
                    <div className="absolute right-[-100px] top-[-80px] w-[400px] h-[600px] pointer-events-none opacity-100 z-0">
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/peigeCorners2.png"
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-6 items-center">
                        <div className="flex items-center gap-2.5">
                            <p className="font-alexandria text-[24px] font-semibold text-[#232325]">
                                كم تريد التبرع اليوم
                            </p>
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/figma/donation-svgrepo-com (1) 1.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                />
                            </div>
                        </div>
                        <p className="font-alexandria text-[16px] leading-loose text-[#4f4f52] text-center max-w-200 hidden md:block">
                            جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                        </p>
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
                                <p className="font-alexandria text-sm text-[#4f4f52] text-center leading-loose px-4 md:hidden mb-4">
                                    جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                                </p>

                                <AmountSelector
                                    selectedAmount={selectedAmount}
                                    customAmount={customAmount}
                                    onAmountSelect={(amount) => {
                                        setSelectedAmount(amount);
                                        setCustomAmount("");
                                    }}
                                    onCustomAmountChange={(value) => {
                                        setCustomAmount(value);
                                        if (value) setSelectedAmount(0);
                                    }}
                                />

                                {/* Country selector */}
                                <div className="flex gap-4 h-auto sm:h-[81px] items-center justify-start w-full" dir="rtl">
                                    <p className="font-alexandria text-base md:text-[18px] font-medium leading-normal text-[#122F2A] text-center text-nowrap">
                                        الدولة
                                    </p>
                                    <div className="flex-1">
                                        <CountryDropdown
                                            onChange={handleCountryChange}
                                            defaultValue={selectedCountry || "Palestine"}
                                            placeholder="فلسطين"
                                            dir="rtl"
                                        />
                                    </div>
                                </div>

                                {/* Donate button */}
                                <button
                                    type="button"
                                    onClick={handleDonateClick}
                                    className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full hover:bg-[#005F4A] transition-colors"
                                >
                                    <Image
                                        src="/figma/mingcute_love-fill.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="h-6 w-6"
                                    />
                                    <p className="font-alexandria text-sm md:text-[16px] font-semibold leading-normal text-white text-nowrap">
                                        تبرع الان
                                    </p>
                                </button>

                                {/* Security text */}
                                <p className="font-alexandria text-xs sm:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                                    معاملة مشفرة آمنة بتقنية SSL
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
