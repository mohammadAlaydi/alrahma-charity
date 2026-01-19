import { CampaignCategoryId } from "./components/CampaignHeader";

export type Project = {
    id: string;
    title: string;
    description: string;
    category: CampaignCategoryId;
    goal: number;
    collected: number;
    imageUrl?: string;
};
