import { Container } from "@/components/ui/Container";
import { AboutSectionHeader } from "@/components/ui/AboutSectionHeader";
import { AboutSection } from "@/components/ui/AboutSection";
import { WaveBackground } from "@/components/ui/WaveBackground";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[502px] overflow-hidden border-b border-black/5 bg-white">
        <WaveBackground />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <AboutSectionHeader />
        </Container>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
