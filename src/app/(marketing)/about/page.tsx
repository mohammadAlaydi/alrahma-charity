import { Container } from "@/components/ui/Container";
import { AboutSectionHeader } from "@/components/ui/AboutSectionHeader";
import { AboutSection } from "@/components/ui/AboutSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[502px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#B4BB5F]/[0.12] to-white" />
        <Container className="relative flex h-full items-center justify-center">
          <AboutSectionHeader />
        </Container>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
