import { http } from "@/services/http";

export type HealthResponse = {
  ok: boolean;
  timestamp: string;
};

export async function getHealth(): Promise<HealthResponse> {
  // If your backend exposes /health or /api/health, update this path later.
  // For now this endpoint may 404; it's just here to demonstrate React Query patterns.
  const { data } = await http.get<HealthResponse>("/health");
  return data;
}
