import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SadaqahJariyahPageContent } from "@/features/sadaqah-jariyah/components/SadaqahJariyahPageContent";

export default function SadaqahJariyahPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches Sadaqah page hero height with wavy edges */}
      <section 
        className="relative h-[502px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)'
        }}
      >
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="صدقة جارية"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/figma/hugeicons-healthcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "الصدقات", href: "/sadaqah" },
              { label: "صدقة جارية", href: "/sadaqah/sadaqah-jariyah" },
            ]}
          />
        </Container>
      </section>

      <SadaqahJariyahPageContent />
    </div>
  );
}

