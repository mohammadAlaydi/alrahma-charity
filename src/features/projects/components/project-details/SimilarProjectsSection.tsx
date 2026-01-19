import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "../ProjectCard";
import { Project } from "../../types";

type SimilarProjectsSectionProps = {
    projects: Project[];
    favorites: Record<string, boolean>;
    favoriteBursts: Record<string, boolean>;
    onToggleFavorite: (id: string) => void;
    onDonate: (project: Project) => void;
};

export function SimilarProjectsSection({
    projects,
    favorites,
    favoriteBursts,
    onToggleFavorite,
    onDonate,
}: SimilarProjectsSectionProps) {
    if (projects.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-[rgba(244,244,244,0.5)]">
            <Container>
                <div className="flex flex-col gap-12">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2.5 items-end">
                            <div className="flex items-center gap-2">
                                <p className="font-['Playpen_Sans_Arabic',sans-serif] text-[16px] leading-[1.5] text-[#007F5E]">
                                    كن أنت سبب الأمل
                                </p>
                                <div className="relative h-6 w-6">
                                    <Image
                                        src="/emojis/hand_healtcare.svg"
                                        alt=""
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <h2 className="font-alexandria text-[30px] font-semibold leading-[normal] text-[#232325]">
                                مشاريع مشابهة
                            </h2>
                        </div>
                        <Link
                            href="/projects"
                            className="bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white hover:bg-[#056A4F] transition-colors"
                        >
                            <span className="font-alexandria text-[16px] font-bold leading-[1.5]">
                                مشاهدة المزيد
                            </span>
                            <div className="relative h-5 w-5">
                                <Image
                                    src="/emojis/line-md_arrow-up.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="h-5 w-5 rotate-[90deg] scale-y-[-100%]"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
                        {projects.map((proj) => (
                            <ProjectCard
                                key={proj.id}
                                project={proj}
                                isFav={!!favorites[proj.id]}
                                isBursting={!!favoriteBursts[proj.id]}
                                onToggleFavorite={onToggleFavorite}
                                onDonate={() => onDonate(proj)}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
