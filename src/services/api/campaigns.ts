import { get } from "../http";
import { PaginatedResponse } from "@/types/api";
import { getMockCampaignsResponse } from "./mockData";

/**
 * Campaign types matching backend schema
 */
export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  SUSPENDED = "SUSPENDED",
  HIDDEN = "HIDDEN",
}

export type Campaign = {
  _id: string;
  title_ar: string;
  title_en: string;
  title_tr: string;
  description_ar?: string;
  description_en?: string;
  description_tr?: string;
  project_id?: string | { _id: string; name_ar: string; name_en: string; name_tr: string };
  status: CampaignStatus;
  financial_goal?: number;
  current_amount: number;
  image_url?: string;
  video_url?: string;
  start_date?: string;
  end_date?: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Frontend-friendly campaign type (normalized)
 */
export type CampaignDisplay = {
  id: string;
  title: string;
  description: string;
  category: string; // Mapped from project target_category or campaign type
  goal: number;
  collected: number;
  imageUrl?: string;
  status: CampaignStatus;
};

/**
 * Query parameters for campaigns list
 */
export type CampaignsQueryParams = {
  page?: number;
  limit?: number;
  status?: CampaignStatus;
};

/**
 * Get all campaigns
 * GET /api/v1/campaigns
 *
 * Falls back to mock data if API is unavailable (development only)
 */
export async function getCampaigns(
  params?: CampaignsQueryParams,
): Promise<PaginatedResponse<Campaign>> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    // Add timestamp to prevent aggressive caching in development
    if (process.env.NODE_ENV === "development") {
      queryParams.append("_t", Date.now().toString());
    }

    const queryString = queryParams.toString();
    const url = `/campaigns${queryString ? `?${queryString}` : ""}`;
    
    // Response can be wrapped { success: true, data: {...} } or direct paginated response
    type ApiResponse = 
      | { success: true; data: PaginatedResponse<Campaign> }
      | PaginatedResponse<Campaign>
      | { data: Campaign[]; total: number; page: number; limit: number; totalPages: number };
    
    const response = await get<ApiResponse>(url);

    // Debug logging in development
    if (process.env.NODE_ENV === "development") {
      console.log("📡 Campaigns API Response:", response);
    }

    // Handle backend response wrapper: { success: true, data: { data: [...], total: ... } }
    // or direct paginated response: { data: [...], total: ... }
    if (response && typeof response === "object") {
      if ("success" in response && response.success && response.data) {
        // Backend wrapped response: { success: true, data: { data: [...], total: ... } }
        const paginatedData = response.data;
        if (paginatedData && "data" in paginatedData && Array.isArray(paginatedData.data)) {
          return paginatedData as PaginatedResponse<Campaign>;
        }
      } else if ("data" in response && Array.isArray(response.data)) {
        // Direct paginated response: { data: [...], total: ... }
        return response as PaginatedResponse<Campaign>;
      }
    }

    // Fallback if structure is unexpected
    console.error("❌ Unexpected response structure:", response);
    throw new Error("Unexpected response structure");
  } catch (error) {
    // Fallback to mock data in development if API fails
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ API unavailable, using mock data:", error);
      return getMockCampaignsResponse(params?.page || 1, params?.limit || 20);
    }
    // In production, re-throw the error
    throw error;
  }
}

/**
 * Get campaign by ID
 * GET /api/v1/campaigns/:id
 */
export async function getCampaignById(id: string): Promise<Campaign> {
  return get<Campaign>(`/campaigns/${id}`);
}
