import { post } from "../http";
import type {
  AuthUser,
  AuthTokens,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

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
    refreshToken,
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

/**
 * Verify email with OTP
 * POST /api/v1/auth/verify-email
 */
export async function verifyEmail(email: string, otp: string): Promise<{ message: string }> {
  return post<{ message: string }>("/auth/verify-email", { email, otp });
}

/**
 * Resend email verification OTP
 * POST /api/v1/auth/resend-email-otp
 */
export async function resendEmailOtp(email: string): Promise<{ message: string }> {
  return post<{ message: string }>("/auth/resend-email-otp", { email });
}
