"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/Container";
import { DonationModal } from "./DonationModal";
import { DonationSuccessModal } from "./DonationSuccessModal";
import { Project } from "../types";
import { transformCampaignToProject, calculateProgress, calculateDonorsCount } from "../utils";
import { getCampaigns } from "@/services/api/campaigns";
import { queryKeys } from "@/services/queryKeys";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";

// Components
import { ProjectHeroSection } from "./project-details/ProjectHeroSection";
import { ProjectImageWithStats } from "./project-details/ProjectImageWithStats";
import { ProjectContentTabs } from "./project-details/ProjectContentTabs";
import { ProjectDonationSection } from "./project-details/ProjectDonationSection";
import { SimilarProjectsSection } from "./project-details/SimilarProjectsSection";

type ProjectDetailsViewProps = {
    project: Project;
};

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
    const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // For donation dialog pre-fill
    const [dialogAmount, setDialogAmount] = useState<number>(200);
    const [dialogCustomAmount, setDialogCustomAmount] = useState<string>("");

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const dispatch = useAppDispatch();
    const [favoriteBursts, setFavoriteBursts] = useState<Record<string, boolean>>({});

    const handleToggleFavoriteCard = (id: string) => {
        const wasFavorite = favorites[id];
        dispatch(toggleFavorite(id));
        if (!wasFavorite) {
            setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: true }));
            setTimeout(() => {
                setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: false }));
            }, 500);
        }
    };

    const handleDonateConnect = (data: { amount: number; isCustom: boolean; country: string | null }) => {
        // Here we could pass the data to the dialog or just open it
        // Ideally DonationFormDialog should accept initial values
        // For now, just opening the dialog as per original behavior
        // But since we have amount selection in the section, we might want to pass it.
        // The original code reset state on open or had separate state?
        // Original: `setIsDonationDialogOpen(true)` was the only action in handleDonate
        // (after validating amount > 0, but the state was local to the view)

        // Let's assume we just open the dialog for now to match behavior, 
        // or effectively we could pre-fill the dialog if it supported it.
        setIsDonationDialogOpen(true);
    };

    const progress = calculateProgress(project.collected, project.goal);
    const donors = calculateDonorsCount(project.collected);

    // Fetch similar projects
    const { data: campaignsData } = useQuery({
        queryKey: queryKeys.campaigns.list({ page: 1, limit: 3 }),
        queryFn: () => getCampaigns({ page: 1, limit: 3 }),
        retry: 1,
        staleTime: 0,
        gcTime: 0,
    });

    const similarProjects = useMemo(() => {
        if (!campaignsData?.data) return [];
        const dataArray = Array.isArray(campaignsData.data) ? campaignsData.data : [];
        return dataArray
            .map(transformCampaignToProject)
            .filter((p) => p.id !== project.id && p.category === project.category)
            .slice(0, 3);
    }, [campaignsData, project.id, project.category]);

    return (
        <div dir="rtl" className="bg-white">
            <ProjectHeroSection
                title={project.title}
                projectId={project.id}
            />

            <section className="py-16 md:py-24">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                        {/* Main Content */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col gap-10">
                                {/* Title and Description */}
                                <div className="flex flex-col gap-5 items-start text-start">
                                    <h2 className="font-alexandria text-[30px] font-bold leading-[normal]">
                                        <span className="text-[#0D0D0D]">حفر 5 </span>
                                        <span className="text-[#007F5E]">آبار مياه </span>
                                        <span className="text-[#0D0D0D]">في شمال غزة</span>
                                    </h2>
                                    <p className="font-alexandria text-[20px] leading-[1.5] text-[rgba(13,13,13,0.7)] max-w-[801px]">
                                        {project.description || "يمثل مشروع حفر آبار المياه في شمال غزة استجابة عاجلة وضرورية لتأمين مصدر حياة أساسي لآلاف الأسر التي تعاني من العطش ونقص المياه"}
                                    </p>
                                </div>

                                <ProjectImageWithStats
                                    project={project}
                                    progress={progress}
                                    donorsCount={donors}
                                    onDonateClick={() => setIsDonationDialogOpen(true)}
                                />

                                <ProjectContentTabs
                                    onDonateClick={() => setIsDonationDialogOpen(true)}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <ProjectDonationSection
                onDonate={handleDonateConnect}
            />

            <SimilarProjectsSection
                projects={similarProjects}
                favorites={favorites}
                favoriteBursts={favoriteBursts}
                onToggleFavorite={handleToggleFavoriteCard}
                onDonate={() => setIsDonationDialogOpen(true)}
            />

            <DonationModal
                open={isDonationDialogOpen}
                onClose={() => setIsDonationDialogOpen(false)}
                onSuccess={() => setIsSuccessModalOpen(true)}
                projectTitle={project.title}
                isProject={true}
            />

            <DonationSuccessModal
                open={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </div>
    );
}
