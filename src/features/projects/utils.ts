import { Campaign } from "@/services/api/campaigns";
import { CampaignCategoryId } from "./components/CampaignHeader";
import { Project } from "./types";

/**
 * Transform backend Campaign to frontend Project format
 */
export function transformCampaignToProject(campaign: Campaign): Project {
    // Map project target_category to frontend category
    // If project_id is populated, use its target_category, otherwise default
    const projectCategory =
        typeof campaign.project_id === "object" && campaign.project_id
            ? (campaign.project_id as { target_category?: string }).target_category
            : undefined;

    // Map backend category to frontend category
    const categoryMap: Record<string, CampaignCategoryId> = {
        emergency: "emergency",
        education: "education",
        humanitarian: "humanitarian",
        orphans: "orphans",
        medical: "medical",
    };

    const category: CampaignCategoryId =
        (projectCategory && categoryMap[projectCategory]) || "humanitarian";

    return {
        id: campaign._id,
        title: campaign.title_ar || campaign.title_en || campaign.title_tr || "",
        description:
            campaign.description_ar || campaign.description_en || campaign.description_tr || "",
        category,
        goal: campaign.financial_goal || 0,
        collected: campaign.current_amount || 0,
    };
}

export function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function calculateProgress(collected: number, goal: number): number {
    if (goal <= 0) return 0;
    return Math.min((collected / goal) * 100, 100);
}

export function calculateDonorsCount(collected: number): number {
    return Math.floor(collected / 100);
}
