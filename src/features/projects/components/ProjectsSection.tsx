"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getCampaigns, Campaign } from "@/services/api/campaigns";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { DonationModal } from "@/features/projects/components/DonationModal";

const categoryLabels: Record<string, string> = {
    // English keys (from frontend)
    emergency: "استجابة وطوارئ",
    education: "تعليم",
    humanitarian: "إنساني",
    orphans: "أيتام",
    medical: "طبي",
    all: "عام",
    // Arabic keys (from backend)
    "حملات دعم الأيتام": "أيتام",
    "الحملات الطبية": "طبي",
    "الحملات الانسانية": "إنساني",
    "حملات التعليم": "تعليم",
    "حملات الاستجابة والطوارئ": "استجابة وطوارئ"
};

export function ProjectsSection() {
    const [projects, setProjects] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Campaign | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getCampaigns({ limit: 3 });
                if (response && 'data' in response && Array.isArray(response.data)) {
                    setProjects(response.data);
                } else if (Array.isArray(response)) {
                    // Fallback if response is direct array
                    setProjects(response);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="w-full bg-white py-[100px]">
                <Container>
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#007F5E]" />
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <>
            <section className="w-full bg-white py-[100px]">
                <Container>
                    <div className="flex flex-col gap-12 items-center">
                        {/* Section Header */}
                        <div className="flex flex-col gap-2 items-center text-center">
                            <div className="flex gap-[5px] items-center">
                                <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-[#007F5E]">
                                    مشاريع تصنع الفارق في حياة الأسر المحتاجة
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
                            <h2 className="font-alexandria text-[40px] font-bold leading-[1.6]">
                                <span className="text-[#122F2A]">مشاريعنا </span>
                                <span className="text-[#007F5E]">الإنسانية</span>
                            </h2>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {projects.map((project) => {
                                const progress = project.financial_goal
                                    ? Math.min((project.current_amount / project.financial_goal) * 100, 100)
                                    : 0;

                                return (
                                    <div
                                        key={project._id}
                                        className="flex h-full w-full max-w-[395px] flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] mx-auto"
                                    >
                                        {/* Project Image */}
                                        <div className="relative h-[250px] w-full overflow-hidden rounded-t-[20px] bg-zinc-200">
                                            {project.image_url ? (
                                                <Image
                                                    src={project.image_url}
                                                    alt={project.title_ar}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                                    <span className="font-molle text-center text-[24px]">No Image</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between">
                                                <div className="inline-flex items-center gap-1.5 rounded-full border border-white bg-[#007F5E] px-3.5 py-1.5">
                                                    <span className="font-alexandria text-[14px] font-medium leading-[1.5] text-white">
                                                        {(project.category && categoryLabels[project.category]) || 'تصنيف'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col gap-3.5 bg-white p-4">
                                            <div className="space-y-2.5">
                                                <h3 className="font-alexandria text-[18px] font-bold leading-[1.5] text-[#122F2A] line-clamp-1">
                                                    {project.title_ar}
                                                </h3>
                                                <div className="flex items-start gap-2 h-[48px] overflow-hidden">
                                                    <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center">
                                                        <Image
                                                            src="/mage_goals-fill.svg"
                                                            alt="وصف الحملة"
                                                            width={20}
                                                            height={20}
                                                            className="h-5 w-5"
                                                        />
                                                    </span>
                                                    <p className="font-alexandria text-[14px] font-normal leading-[1.5] text-[rgba(13,13,13,0.7)] line-clamp-2">
                                                        {project.description_ar}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5 mt-auto">
                                                <div className="font-alexandria text-[14px] flex items-center justify-between font-bold text-[#122F2A]">
                                                    <span>التبرعات</span>
                                                    <span>{progress.toFixed(0)}%</span>
                                                </div>
                                                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]/40">
                                                    <div
                                                        className="absolute top-0 right-0 h-full rounded-full bg-[#007F5E]"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <div className="font-alexandria text-[14px] mt-1 flex items-center justify-between text-[#122F2A]">
                                                    <span className="font-medium whitespace-nowrap">
                                                        المبلغ: ${project.current_amount?.toLocaleString() || '0'}
                                                    </span>
                                                    <span className="font-bold text-[#B4BB5F] whitespace-nowrap">
                                                        الهدف: ${project.financial_goal?.toLocaleString() || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4 -mb-4 -ml-4 flex items-start justify-end relative z-10">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedProject(project);
                                                        setIsDonationModalOpen(true);
                                                    }}
                                                    className="font-alexandria text-[16px] font-bold leading-[1.5] inline-flex items-center gap-3 rounded-tr-2xl rounded-bl-none bg-[#007F5E] px-6 py-2.5 text-white transition-colors hover:bg-[#056A4F]"
                                                >
                                                    <span>تبرع الآن</span>
                                                    <Image
                                                        src="/double hearts.svg"
                                                        alt="تبرع"
                                                        width={22}
                                                        height={23}
                                                        className="h-6 w-6"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* More Button */}
                        <Link
                            href="/projects"
                            className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] hover:bg-[#005F4A] transition-colors"
                        >
                            <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                                <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                                    <Image
                                        src="/emojis/line-md_arrow-up.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="h-5 w-5"
                                    />
                                </div>
                            </div>
                            <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                                المزيد
                            </p>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Donation Modal */}
            <DonationModal
                open={isDonationModalOpen}
                onClose={() => {
                    setIsDonationModalOpen(false);
                    setSelectedProject(null);
                }}
                projectTitle={selectedProject?.title_ar || "تبرع سريع"}
            />
        </>
    );
}
