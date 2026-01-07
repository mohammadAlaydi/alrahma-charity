import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { AboutPageContent } from "@/features/about/components/AboutPageContent";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
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

      {/* Hero - matches About page hero height with wavy edges */}
      <section className="relative h-[390px] overflow-hidden">
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
