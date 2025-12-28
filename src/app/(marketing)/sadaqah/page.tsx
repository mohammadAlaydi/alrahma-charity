import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WaveBackground } from "@/components/ui/WaveBackground";
import { SadaqahPageContent } from "@/features/sadaqah/components/SadaqahPageContent";

export default function SadaqahPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches Projects page hero height with wavy edges */}
      <section className="relative h-[502px] overflow-hidden border-b border-black/5 bg-white">
        <WaveBackground />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="الصدقات"
            subtitle="صدقة اليوم… أمان لغدهم"
            subtitleIcon="/heart.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "الصدقات", href: "/sadaqah" },
            ]}
          />
        </Container>
      </section>

      <SadaqahPageContent />
    </div>
  );
}

