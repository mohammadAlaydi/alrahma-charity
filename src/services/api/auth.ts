import { post } from "../http";

/**
 * Auth types matching backend schema
 */
export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthUser = {
  user_id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
};

/**
 * Login request
 */
export type LoginRequest = {
  email: string;
  password: string;
};

/**
 * Login response
 */
export type LoginResponse = AuthTokens & {
  user: AuthUser;
  message?: string;
};

/**
 * Register request
 */
export type RegisterRequest = {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
};

/**
 * Register response
 */
export type RegisterResponse = AuthTokens & {
  user: AuthUser;
  message?: string;
};

/**
 * Refresh token request
 */
export type RefreshTokenRequest = {
  refresh_token: string;
};

/**
 * Refresh token response
 */
export type RefreshTokenResponse = AuthTokens;

/**
 * Forgot password request
 */
export type ForgotPasswordRequest = {
  email: string;
};

/**
 * Forgot password response
 */
export type ForgotPasswordResponse = {
  message: string;
};

/**
 * Reset password request
 */
export type ResetPasswordRequest = {
  token: string;
  new_password: string;
};

/**
 * Reset password response
 */
export type ResetPasswordResponse = {
  message: string;
};

/**
 * Register new user
 * POST /api/v1/auth/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return post<RegisterResponse, RegisterRequest>("/auth/register", data);
}

/**
 * Login user
 * POST /api/v1/auth/login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return post<LoginResponse, LoginRequest>("/auth/login", data);
}

/**
 * Refresh access token
 * POST /api/v1/auth/refresh
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  return post<RefreshTokenResponse, RefreshTokenRequest>("/auth/refresh", {
    refresh_token: refreshToken,
  });
}

/**
 * Forgot password - send reset email
 * POST /api/v1/auth/forgot-password
 */
export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  return post<ForgotPasswordResponse, ForgotPasswordRequest>("/auth/forgot-password", { email });
}

/**
 * Reset password with token
 * POST /api/v1/auth/reset-password
 */
export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return post<ResetPasswordResponse, ResetPasswordRequest>("/auth/reset-password", data);
}
