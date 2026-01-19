import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

type ProjectHeroSectionProps = {
    title: string;
    projectId: string;
};

export function ProjectHeroSection({ title, projectId }: ProjectHeroSectionProps) {
    return (
        <section className="relative h-[246px] md:h-[280px] overflow-hidden">
            <Container className="relative z-10 flex h-full items-center justify-center">
                <PageHeader
                    title={title}
                    subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
                    subtitleIcon="/figma/hugeicons-healthcare.svg"
                    breadcrumbs={[
                        { label: "الرئيسية", href: "/" },
                        { label: "آخر مشاريعنا", href: "/projects" },
                        { label: title, href: `/projects/${projectId}` },
                    ]}
                />
            </Container>
        </section>
    );
}
