import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrphanSponsorshipPageContent } from "@/features/orphan-sponsorship/components/OrphanSponsorshipPageContent";

export default function OrphanSponsorshipPage() {
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
            title="كفالة الايتام"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/figma/hugeicons-healthcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "كفالة الايتام", href: "/kafalah" },
            ]}
          />
        </Container>
      </section>

      <OrphanSponsorshipPageContent />
    </div>
  );
}

