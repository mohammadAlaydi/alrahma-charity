import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CampaignsSection } from "./CampaignsSection";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches About page hero height with wavy edges */}
      <section 
        className="relative h-[502px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)'
        }}
      >
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
      <CampaignsSection />
    </div>
  );
}
