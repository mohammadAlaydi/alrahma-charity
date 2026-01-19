import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { AboutPageContent } from "@/features/about/components/AboutPageContent";

export default function AboutPage() {
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
        style={{ width: '300.12px', height: '300.12px' ,transform: 'rotate(-10.769deg)', }}
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

      {/* Hero - matches projects page */}
      <section className="relative h-[246px] md:h-[280px] overflow-hidden">
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="تعرف علينا"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/figma/hugeicons-healthcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "تعرف علينا", href: "/about" },
            ]}
          />
        </Container>
      </section>

      <AboutPageContent />
    </div>
  );
}
