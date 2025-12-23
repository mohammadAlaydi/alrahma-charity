import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WaveBackground } from "@/components/ui/WaveBackground";
import { CampaignsSection } from "./CampaignsSection";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - matches About page hero height with wavy edges */}
      <section className="relative h-[502px] overflow-hidden border-b border-black/5 bg-white">
        <WaveBackground />
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
