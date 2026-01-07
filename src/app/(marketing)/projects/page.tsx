import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CampaignsSection } from "./CampaignsSection";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Background Banners from Figma - Adjusted more towards center for visibility */}
      <div 
        className="absolute left-[-60px] top-[210.01px] z-0 pointer-events-none"
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
        className="absolute right-[-80px] top-[224.67px] z-0 pointer-events-none"
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

      {/* Hero - matches projects page */}
      <section className="relative h-[280px] overflow-hidden">
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="آخر مشاريعنا"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/emojis/hand_healtcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "آخر مشاريعنا", href: "/projects" },
            ]}
          />
        </Container>
      </section>

      {/* الفريمان + كروت الحملات أسفل الهيرو مباشرة */}
      <CampaignsSection/>

      {/* Gaza Children Section - Centered - Separate Container */}
      <section className="relative py-10 md:py-[100px] bg-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-[5px]">
              <span aria-hidden="true" className="relative h-6 w-6 shrink-0 flex items-center justify-center">
                <Image
                  src="/figma/hugeicons-healthcare.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </span>
              <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-[16px] leading-[1.5] text-[#007F5E] text-nowrap">
                أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
              </p>
            </div>
            <p className="font-alexandria text-[30px] font-bold leading-[1.5] text-[#122F2A] text-center max-w-[537px]">
              كن سببا في ابتسامة شخص ما
            </p>
          </div>
        </Container>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905357829980"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-xl"
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
  );
}
