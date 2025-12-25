import { get, post } from "../http";
import { PaginatedResponse } from "@/types/api";

/**
 * Donation types matching backend schema
 */
export enum DonationType {
  ONE_TIME = "ONE_TIME",
  MONTHLY_SUBSCRIPTION = "MONTHLY_SUBSCRIPTION",
  CAMPAIGN = "CAMPAIGN",
  ORPHAN_SPONSORSHIP = "ORPHAN_SPONSORSHIP",
}

export enum DonationStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentGateway {
  HYPERPAY = "HYPERPAY",
  STRIPE = "STRIPE",
}

export type Donation = {
  _id: string;
  user_id?: string;
  project_id?: string;
  campaign_id?: string;
  orphan_id?: string;
  donation_type: DonationType;
  amount: number;
  currency: string;
  status: DonationStatus;
  payment_method: string;
  transaction_id?: string;
  payment_gateway: PaymentGateway;
  user_snapshot?: {
    user_id?: string;
    email?: string;
    full_name?: string;
    phone_number?: string;
  };
  project_snapshot?: {
    project_id?: string;
    name_ar?: string;
    name_en?: string;
    name_tr?: string;
    target_category?: string;
  };
  campaign_snapshot?: {
    campaign_id?: string;
    title_ar?: string;
    title_en?: string;
    title_tr?: string;
  };
  orphan_snapshot?: {
    orphan_id?: string;
    name?: string;
    age?: number;
    country?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Create one-time donation request
 */
export type CreateOneTimeDonationRequest = {
  amount: number;
  currency?: string;
  project_id?: string;
  campaign_id?: string;
  orphan_id?: string;
  payment_method?: string;
  payment_gateway: PaymentGateway;
  // Guest donation fields
  email?: string;
  full_name?: string;
  phone_number?: string;
};

/**
 * Create one-time donation response
 */
export type CreateOneTimeDonationResponse = {
  message: string;
  donation_id: string;
  checkout_url?: string;
};

/**
 * Query parameters for donations list
 */
export type DonationsQueryParams = {
  page?: number;
  limit?: number;
};

/**
 * Create one-time donation (guest or authenticated)
 * POST /api/v1/donations/one-time
 */
export async function createOneTimeDonation(
  data: CreateOneTimeDonationRequest,
): Promise<CreateOneTimeDonationResponse> {
  return post<CreateOneTimeDonationResponse, CreateOneTimeDonationRequest>(
    "/donations/one-time",
    data,
  );
}

/**
 * Get donation history for authenticated user
 * GET /api/v1/donations/history
 */
export async function getDonationHistory(
  params?: DonationsQueryParams,
): Promise<PaginatedResponse<Donation>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const url = `/donations/history${queryString ? `?${queryString}` : ""}`;
  return get<PaginatedResponse<Donation>>(url);
}

/**
 * Get donation by ID
 * GET /api/v1/donations/:id
 */
export async function getDonationById(id: string): Promise<Donation> {
  return get<Donation>(`/donations/${id}`);
}
