import { get, post, patch, del } from "../http";
import { PaginatedResponse } from "@/types/api";

/**
 * Project types matching backend schema
 */
export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  SUSPENDED = "SUSPENDED",
  HIDDEN = "HIDDEN",
}

export type Project = {
  _id: string;
  name_ar: string;
  name_en: string;
  name_tr: string;
  description_ar: string;
  description_en: string;
  description_tr: string;
  justification?: string;
  objectives?: string;
  target_category?: string;
  budget: number;
  total_raised: number;
  cover_image_url?: string;
  video_url?: string;
  status: ProjectStatus;
  start_date?: string;
  end_date?: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Frontend-friendly project type (normalized)
 */
export type ProjectDisplay = {
  id: string;
  name: string;
  description: string;
  category: string;
  budget: number;
  raised: number;
  progress: number;
  imageUrl?: string;
  status: ProjectStatus;
};

/**
 * Query parameters for projects list
 */
export type ProjectsQueryParams = {
  page?: number;
  limit?: number;
  status?: ProjectStatus;
};

/**
 * DTO for creating a project
 */
export type CreateProjectDto = {
  name_ar: string;
  name_en: string;
  name_tr: string;
  description_ar: string;
  description_en: string;
  description_tr: string;
  target_category?: string;
  budget: number;
  cover_image_url?: string;
  status?: ProjectStatus;
  start_date?: string;
  end_date?: string;
};

/**
 * Get all projects (public)
 * GET /api/v1/projects
 */
export async function getProjects(
  params?: ProjectsQueryParams,
): Promise<PaginatedResponse<Project>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const url = `/projects${queryString ? `?${queryString}` : ""}`;

  type ApiResponse =
    | { success: true; data: PaginatedResponse<Project> }
    | PaginatedResponse<Project>;

  const response = await get<ApiResponse>(url);

  // Handle backend wrapper
  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as PaginatedResponse<Project>;
    } else if ("data" in response && Array.isArray(response.data)) {
      return response as PaginatedResponse<Project>;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get all projects including hidden (admin)
 * GET /api/v1/projects/admin
 */
export async function getProjectsAdmin(
  params?: ProjectsQueryParams,
): Promise<PaginatedResponse<Project>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = `/projects/admin${queryString ? `?${queryString}` : ""}`;

  type ApiResponse =
    | { success: true; data: PaginatedResponse<Project> }
    | PaginatedResponse<Project>;

  const response = await get<ApiResponse>(url);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as PaginatedResponse<Project>;
    } else if ("data" in response && Array.isArray(response.data)) {
      return response as PaginatedResponse<Project>;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get project by ID
 * GET /api/v1/projects/:id
 */
export async function getProjectById(id: string): Promise<Project> {
  type ApiResponse = { success: true; data: Project } | Project;
  const response = await get<ApiResponse>(`/projects/${id}`);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Project;
    }
    return response as Project;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Create project (admin)
 * POST /api/v1/projects
 */
export async function createProject(data: CreateProjectDto): Promise<Project> {
  type ApiResponse = { success: true; data: Project } | Project;
  const response = await post<ApiResponse>("/projects", data);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Project;
    }
    return response as Project;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Update project (admin)
 * PATCH /api/v1/projects/:id
 */
export async function updateProject(
  id: string,
  data: Partial<CreateProjectDto>,
): Promise<Project> {
  type ApiResponse = { success: true; data: Project } | Project;
  const response = await patch<ApiResponse>(`/projects/${id}`, data);

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Project;
    }
    return response as Project;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Update project status (admin)
 * PATCH /api/v1/projects/:id/status
 */
export async function updateProjectStatus(
  id: string,
  status: ProjectStatus,
): Promise<Project> {
  type ApiResponse = { success: true; data: Project } | Project;
  const response = await patch<ApiResponse>(`/projects/${id}/status`, {
    status,
  });

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as Project;
    }
    return response as Project;
  }

  throw new Error("Unexpected response structure");
}

/**
 * Delete project (admin)
 * DELETE /api/v1/projects/:id
 */
export async function deleteProject(id: string): Promise<void> {
  await del(`/projects/${id}`);
}

/**
 * Helper: Convert Project to display format
 */
export function projectToDisplay(
  project: Project,
  lang: "ar" | "en" | "tr" = "ar",
): ProjectDisplay {
  const nameKey = `name_${lang}` as keyof Project;
  const descKey = `description_${lang}` as keyof Project;

  return {
    id: project._id,
    name: (project[nameKey] as string) || project.name_ar,
    description: (project[descKey] as string) || project.description_ar,
    category: project.target_category || "",
    budget: project.budget,
    raised: project.total_raised,
    progress:
      project.budget > 0
        ? Math.min(Math.round((project.total_raised / project.budget) * 100), 100)
        : 0,
    imageUrl: project.cover_image_url,
    status: project.status,
  };
}
