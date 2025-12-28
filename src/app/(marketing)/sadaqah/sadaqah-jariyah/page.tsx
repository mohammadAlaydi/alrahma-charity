import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WaveBackground } from "@/components/ui/WaveBackground";
import { SadaqahJariyahPageContent } from "@/features/sadaqah-jariyah/components/SadaqahJariyahPageContent";

export default function SadaqahJariyahPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches Sadaqah page hero height with wavy edges */}
      <section className="relative h-[502px] overflow-hidden border-b border-black/5 bg-white">
        <WaveBackground />
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

