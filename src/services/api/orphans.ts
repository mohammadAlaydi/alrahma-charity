import { get, post, patch, del } from "../http";
import { PaginatedResponse } from "@/types/api";

/**
 * Orphan status enum
 */
export enum OrphanStatus {
  ACTIVE = "ACTIVE",
  SPONSORED = "SPONSORED",
  GRADUATED = "GRADUATED",
  HIDDEN = "HIDDEN",
}

/**
 * Orphan type matching backend schema
 */
export type Orphan = {
  _id: string;
  name: string;
  age: number;
  country: string;
  story_ar?: string;
  story_en?: string;
  story_tr?: string;
  profile_image_url?: string;
  status: OrphanStatus;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Query parameters for orphans list
 */
export type OrphansQueryParams = {
  page?: number;
  limit?: number;
  status?: OrphanStatus;
};

/**
 * DTO for creating an orphan
 */
export type CreateOrphanDto = {
  name: string;
  age: number;
  country: string;
  story_ar?: string;
  story_en?: string;
  story_tr?: string;
  profile_image_url?: string;
  status?: OrphanStatus;
  privateData?: {
    full_legal_name?: string;
    date_of_birth?: string;
    guardian_name?: string;
    guardian_phone?: string;
    address?: string;
    school_name?: string;
    health_notes?: string;
  };
};

/**
 * Get all orphans (public - only active)
 * GET /api/v1/orphans
 */
export async function getOrphans(
  params?: OrphansQueryParams,
): Promise<PaginatedResponse<Orphan>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const url = `/orphans${queryString ? `?${queryString}` : ""}`;

  type ApiResponse =
    | { success: true; data: PaginatedResponse<Orphan> }
    | PaginatedResponse<Orphan>;

  const response = await get<ApiResponse>(url);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as PaginatedResponse<Orphan>;
    } else if ("data" in response && Array.isArray(response.data)) {
      return response as PaginatedResponse<Orphan>;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get all orphans including non-active (admin)
 * GET /api/v1/orphans/admin
 */
export async function getOrphansAdmin(
  params?: OrphansQueryParams,
): Promise<PaginatedResponse<Orphan>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = `/orphans/admin${queryString ? `?${queryString}` : ""}`;

  type ApiResponse =
    | { success: true; data: PaginatedResponse<Orphan> }
    | PaginatedResponse<Orphan>;

  const response = await get<ApiResponse>(url);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as PaginatedResponse<Orphan>;
    } else if ("data" in response && Array.isArray(response.data)) {
      return response as PaginatedResponse<Orphan>;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get orphan by ID
 * GET /api/v1/orphans/:id
 */
export async function getOrphanById(id: string): Promise<Orphan> {
  type ApiResponse = { success: true; data: Orphan } | Orphan;
  const response = await get<ApiResponse>(`/orphans/${id}`);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Orphan;
    }
    if ("_id" in response) {
      return response as Orphan;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get orphan with private data (admin)
 * GET /api/v1/orphans/:id/private
 */
export async function getOrphanWithPrivateData(id: string): Promise<any> {
  return get(`/orphans/${id}/private`);
}

/**
 * Create orphan (admin)
 * POST /api/v1/orphans
 */
export async function createOrphan(data: CreateOrphanDto): Promise<Orphan> {
  type ApiResponse = { success: true; data: Orphan } | Orphan;
  const response = await post<ApiResponse>("/orphans", data);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Orphan;
    }
    return response as Orphan;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Update orphan (admin)
 * PATCH /api/v1/orphans/:id
 */
export async function updateOrphan(
  id: string,
  data: Partial<CreateOrphanDto>,
): Promise<Orphan> {
  type ApiResponse = { success: true; data: Orphan } | Orphan;
  const response = await patch<ApiResponse>(`/orphans/${id}`, data);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Orphan;
    }
    return response as Orphan;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Update orphan status (admin)
 * PATCH /api/v1/orphans/:id/status
 */
export async function updateOrphanStatus(
  id: string,
  status: OrphanStatus,
): Promise<Orphan> {
  type ApiResponse = { success: true; data: Orphan } | Orphan;
  const response = await patch<ApiResponse>(`/orphans/${id}/status`, {
    status,
  });

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Orphan;
    }
    return response as Orphan;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Delete orphan (admin)
 * DELETE /api/v1/orphans/:id
 */
export async function deleteOrphan(id: string): Promise<void> {
  await del(`/orphans/${id}`);
}
