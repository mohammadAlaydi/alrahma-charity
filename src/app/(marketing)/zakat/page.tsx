import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ZakatPageContent } from "@/features/zakat/components/ZakatPageContent";

export default function ZakatPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches Sadaqah page hero height with wavy edges */}
      <section 
        className="relative h-[300px] md:h-[391px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)'
        }}
      >
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="زكاة"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/figma/hugeicons-healthcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "زكاة", href: "/zakat" },
            ]}
          />
        </Container>
      </section>

      <ZakatPageContent />
    </div>
  );
}
