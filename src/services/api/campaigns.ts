import { get, del } from "../http";
import { PaginatedResponse } from "@/types/api";
import { getMockCampaignsResponse, MOCK_CAMPAIGNS } from "./mockData";

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
  category?: string;
  project_id?:
    | string
    | { _id: string; name_ar: string; name_en: string; name_tr: string };
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
  category: string;
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
 * Get all campaigns (public)
 * GET /api/v1/campaigns
 */
export async function getCampaigns(
  params?: CampaignsQueryParams,
): Promise<PaginatedResponse<Campaign>> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    if (process.env.NODE_ENV === "development") {
      queryParams.append("_t", Date.now().toString());
    }

    const queryString = queryParams.toString();
    const url = `/campaigns${queryString ? `?${queryString}` : ""}`;

    type ApiResponse =
      | { success: true; data: PaginatedResponse<Campaign> }
      | PaginatedResponse<Campaign>;

    const response = await get<ApiResponse>(url);

    if (response && typeof response === "object") {
      if ("success" in response && response.success && response.data) {
        const paginatedData = response.data;
        if (
          paginatedData &&
          "data" in paginatedData &&
          Array.isArray(paginatedData.data)
        ) {
          return paginatedData as PaginatedResponse<Campaign>;
        }
      } else if ("data" in response && Array.isArray(response.data)) {
        return response as PaginatedResponse<Campaign>;
      }
    }

    throw new Error("Unexpected response structure");
  } catch (error) {
    // Only use mock data in development as last resort
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Using mock data (development only):", error);
      return getMockCampaignsResponse(params?.page || 1, params?.limit || 20);
    }
    throw error;
  }
}

/**
 * Get all campaigns including hidden (admin)
 * GET /api/v1/campaigns/admin
 */
export async function getCampaignsAdmin(
  params?: CampaignsQueryParams,
): Promise<PaginatedResponse<Campaign>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = `/campaigns/admin${queryString ? `?${queryString}` : ""}`;

  type ApiResponse =
    | { success: true; data: PaginatedResponse<Campaign> }
    | PaginatedResponse<Campaign>;

  const response = await get<ApiResponse>(url);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as PaginatedResponse<Campaign>;
    } else if ("data" in response && Array.isArray(response.data)) {
      return response as PaginatedResponse<Campaign>;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get campaign by ID
 * GET /api/v1/campaigns/:id
 */
export async function getCampaignById(id: string): Promise<Campaign> {
  try {
    type ApiResponse = { success: true; data: Campaign } | Campaign;
    const response = await get<ApiResponse>(`/campaigns/${id}`);

    if (response && typeof response === "object") {
      if ("success" in response && response.success && response.data) {
        return response.data as Campaign;
      }
      if ("_id" in response) {
        return response as Campaign;
      }
    }

    throw new Error("Unexpected response structure");
  } catch (error) {
    // Fallback to mock data in development if API fails
    if (process.env.NODE_ENV === "development") {
      const mockCampaign = MOCK_CAMPAIGNS.find((c) => c._id === id);
      if (mockCampaign) {
        console.warn(`⚠️ Using mock data for ID: ${id}`);
        return mockCampaign;
      }
    }
    throw error;
  }
}

/**
 * Delete campaign (admin)
 * DELETE /api/v1/campaigns/:id
 */
export async function deleteCampaign(id: string): Promise<void> {
  await del(`/campaigns/${id}`);
}
