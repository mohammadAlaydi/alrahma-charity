import { notFound } from "next/navigation";
import { ProjectDetailsView } from "@/features/projects/components/ProjectDetailsView";
import { transformCampaignToProject } from "@/features/projects/utils";
import { getCampaignById } from "@/services/api/campaigns";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: PageProps) {
    const { id } = await params;
    let project;

    try {
        const campaign = await getCampaignById(id);
        if (!campaign) {
            notFound();
        }
        project = transformCampaignToProject(campaign);
    } catch (error) {
        console.error("Failed to fetch campaign:", error);
        notFound();
    }

    return (
        <div className="relative min-h-screen bg-white">
            <ProjectDetailsView project={project} />
        </div>
    );
}
