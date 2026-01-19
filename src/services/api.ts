import { get } from "./http";

export type HealthResponse = {
  ok: boolean;
  timestamp: string;
};

/**
 * Health check endpoint
 * GET /api/v1/health
 */
export async function getHealth(): Promise<HealthResponse> {
  return get<HealthResponse>("/health");
}

// Re-export API modules for convenience
export * from "./api/auth";
export * from "./api/campaigns";
export * from "./api/donations";
