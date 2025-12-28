import { Container } from "@/components/ui/Container";
import { AboutSectionHeader } from "@/components/ui/AboutSectionHeader";
import { AboutSection } from "@/components/ui/AboutSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative h-[502px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)'
        }}
      >
        <Container className="relative z-10 flex h-full items-center justify-center">
          <AboutSectionHeader />
        </Container>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
