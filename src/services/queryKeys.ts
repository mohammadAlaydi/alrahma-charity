export const queryKeys = {
  health: () => ["health"] as const,
  campaigns: {
    all: () => ["campaigns"] as const,
    lists: () => ["campaigns", "list"] as const,
    list: (filters?: { page?: number; limit?: number; status?: string }) =>
      ["campaigns", "list", filters] as const,
    detail: (id: string) => ["campaigns", "detail", id] as const,
  },
  donations: {
    all: () => ["donations"] as const,
    history: (filters?: { page?: number; limit?: number }) =>
      ["donations", "history", filters] as const,
    detail: (id: string) => ["donations", "detail", id] as const,
  },
  auth: {
    all: () => ["auth"] as const,
  },
};
