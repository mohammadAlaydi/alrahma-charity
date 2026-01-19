/**
 * Unified type definitions for authentication
 * Consolidates all auth-related types in one place
 */

// User types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  role?: string;
  image?: string;
}

// Token types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Response types
export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
  message?: string;
}

export interface RegisterResponse {
  user: AuthUser;
  tokens: AuthTokens;
  message?: string;
}

export interface RefreshTokenResponse {
  tokens: AuthTokens;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// State types
export type AuthStatus = "anonymous" | "authenticated" | "loading";

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  tokens: AuthTokens | null;
}
