import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { DonationHeroSection } from "@/features/donations/components/DonationHeroSection";

export default function DonationsPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Banners for Desktop - Adjusted more towards center for visibility */}
      <div
        className="hidden md:block absolute left-[-60px] top-[210.01px] z-0 pointer-events-none opacity-40"
        style={{ width: '346.12px', height: '346.12px' }}
      >
        <Image
          src="/images/Group 1000009427.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div
        className="hidden md:block absolute right-[-80px] top-[224.67px] z-0 pointer-events-none opacity-40"
        style={{ width: '350.69px', height: '360.33px' }}
      >
        <div className="relative h-full w-full">
          {/* 1 17 - Positioned correctly relative to each other */}
          <div className="absolute right-[60px] top-0 h-[222.52px] w-[222.52px]">
            <Image
              src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 17.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* 1 18 - Positioned 148.5px further right than 1 17 */}
          <div className="absolute right-[-0.5px] top-[120.53px] h-[222.52px] w-[222.52px]">
            <Image
              src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Background Banners for Small Screens */}
      {/* Left Banner */}
      <div
        className="md:hidden absolute left-[-145px] top-[70.01px] z-0 pointer-events-none opacity-40"
        style={{ width: '300.12px', height: '300.12px', transform: 'rotate(-10.769deg)' }}
      >
        <Image
          src="/images/Group 1000009427.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      {/* Right Banner */}
      <div
        className="md:hidden absolute right-[-100px] top-[70px] z-50 pointer-events-none"
        style={{ 
          width: '176px', 
          height: '175.852px', 
          transform: 'rotate(-28.769deg)', 
          aspectRatio: '76.00/75.85',
          borderRadius: '32px 3px',
          opacity: 0.5,
        }}
      >
        <Image
          src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 17.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Hero Section with Donation Form */}
      <DonationHeroSection />

      {/* Additional Content Section */}
      <section className="relative py-10 md:py-[100px] bg-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-[5px]">
              <span aria-hidden="true" className="relative h-5 w-5 sm:h-6 sm:w-6 shrink-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6">
                  <path d="M4.66663 16.3334H7.46079C7.80379 16.3334 8.14213 16.4104 8.44896 16.5597L10.8313 17.7124C11.1381 17.8605 11.4765 17.9375 11.8206 17.9375H13.0363C14.2123 17.9375 15.1666 18.8604 15.1666 19.999C15.1666 20.0457 15.1351 20.0854 15.0896 20.0982L12.1251 20.9184C11.5932 21.0653 11.026 21.0139 10.5291 20.7737L7.98229 19.5417M9.79529 2.97736C11.515 1.91102 13.0176 2.34036 13.9195 3.02519C14.2893 3.30519 14.4748 3.44519 14.5833 3.44519C14.6918 3.44519 14.8773 3.30519 15.2471 3.02519C16.149 2.34036 17.6505 1.91102 19.3713 2.97736C21.63 4.37736 22.141 8.99269 16.933 12.887C15.9401 13.629 15.4443 14 14.5833 14C13.7223 14 13.2265 13.629 12.2348 12.887C7.02563 8.99269 7.53663 4.37619 9.79529 2.97736Z" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.1666 19.25L20.5251 17.6039C20.9916 17.4607 21.4914 17.4686 21.9532 17.6264C22.4149 17.7841 22.8151 18.0837 23.0965 18.4824C23.527 19.0774 23.352 19.0314 22.7243 20.293L13.9568 25.3529C13.6826 25.5115 13.3791 25.6126 13.0646 25.6501C12.7501 25.6876 12.4312 25.6607 12.1275 25.571L4.66663 23.3567" stroke="#007F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="font-alexandria text-xs sm:text-[16px] leading-[1.5] text-[#007F5E] text-nowrap">
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
            </div>
            <p className="font-alexandria text-xl md:text-[32px] font-bold leading-[1.5] text-[#122F2A] text-center max-w-[496px]">
              كن سببا في ابتسامة شخص ما
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
