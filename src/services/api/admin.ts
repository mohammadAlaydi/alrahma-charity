import { get } from "../http";

/**
 * Dashboard overview stats from backend
 */
export type DashboardOverview = {
  totalUsers: number;
  activeUsers: number;
  userGrowth: number;
  totalOrphans: number;
  activeOrphans: number;
  totalProjects: number;
  activeProjects: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalDonations: number;
  activeSponsorships: number;
  activeSubscriptions: number;
};

/**
 * Dashboard financial stats from backend
 */
export type DashboardFinancial = {
  totalAmount: number;
  thisMonthAmount: number;
  lastMonthAmount: number;
  revenueGrowth: number;
  donationsThisMonth: number;
  donationsLastMonth: number;
  donationGrowth: number;
  currency: string;
};

/**
 * Recent activity item
 */
export type RecentActivityItem = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  userName: string;
  userEmail?: string;
  campaignTitle?: string;
  createdAt: string;
};

/**
 * Complete dashboard stats response
 */
export type DashboardStats = {
  overview: DashboardOverview;
  financial: DashboardFinancial;
  recentActivity: RecentActivityItem[];
};

/**
 * Chart data point
 */
export type ChartDataPoint = {
  month: string;
  year: number;
  amount: number;
  count: number;
};

/**
 * Donation chart response
 */
export type DonationChartData = {
  months: ChartDataPoint[];
};

/**
 * Donation distribution item
 */
export type DonationDistributionItem = {
  type: string;
  label: string;
  amount: number;
  count: number;
};

/**
 * Get admin dashboard statistics
 * GET /api/v1/admin/dashboard
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  type ApiResponse = { success: true; data: DashboardStats } | DashboardStats;
  const response = await get<ApiResponse>("/admin/dashboard");

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as DashboardStats;
    }
    if ("overview" in response) {
      return response as DashboardStats;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get donation chart data for the last 12 months
 * GET /api/v1/admin/dashboard/chart
 */
export async function getDonationChartData(): Promise<DonationChartData> {
  type ApiResponse =
    | { success: true; data: DonationChartData }
    | DonationChartData;
  const response = await get<ApiResponse>("/admin/dashboard/chart");

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as DonationChartData;
    }
    if ("months" in response) {
      return response as DonationChartData;
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Get donation distribution by type
 * GET /api/v1/admin/dashboard/distribution
 */
export async function getDonationDistribution(): Promise<
  DonationDistributionItem[]
> {
  type ApiResponse =
    | { success: true; data: DonationDistributionItem[] }
    | DonationDistributionItem[];
  const response = await get<ApiResponse>("/admin/dashboard/distribution");

  if (response && typeof response === "object") {
    if ("success" in response && response.success && response.data) {
      return response.data as DonationDistributionItem[];
    }
    if (Array.isArray(response)) {
      return response as DonationDistributionItem[];
    }
  }

  throw new Error("Unexpected response structure");
}

/**
 * Format currency amount for display
 */
export function formatCurrency(
  amount: number,
  currency: string = "SAR",
): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with Arabic locale
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ar-SA").format(num);
}
