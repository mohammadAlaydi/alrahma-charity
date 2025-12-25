import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError, ApiException } from "@/types/api";

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000"}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // Prevent aggressive caching in development via params instead of headers
  params: process.env.NODE_ENV === "development" ? { _nocache: Date.now() } : undefined,
});

/**
 * Get access token from localStorage or Redux store
 */
function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

/**
 * Request interceptor: Inject auth token
 */
http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor: Normalize errors
 */
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    // Network errors
    if (!error.response) {
      throw new ApiException(0, "Network error. Please check your connection.", "NETWORK_ERROR");
    }

    const { status, data } = error.response;

    // Normalize error response
    const apiError: ApiError = {
      message: data?.message || error.message || "An error occurred",
      statusCode: status,
      error: data?.error || `HTTP_${status}`,
      details: data?.details,
      timestamp: data?.timestamp || new Date().toISOString(),
    };

    // Handle 401 Unauthorized - clear tokens
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // Optionally redirect to login
        // window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden
    if (status === 403) {
      apiError.message = "You don't have permission to perform this action.";
    }

    // Handle 404 Not Found
    if (status === 404) {
      apiError.message = data?.message || "Resource not found.";
    }

    // Handle 500+ Server errors
    if (status >= 500) {
      apiError.message = "Server error. Please try again later.";
    }

    throw new ApiException(apiError.statusCode, apiError.message, apiError.error, apiError.details);
  },
);

/**
 * Typed GET request
 */
export async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.get<T>(url, config);
  return response.data;
}

/**
 * Typed POST request
 */
export async function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.post<T>(url, data, config);
  return response.data;
}

/**
 * Typed PATCH request
 */
export async function patch<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.patch<T>(url, data, config);
  return response.data;
}

/**
 * Typed PUT request
 */
export async function put<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.put<T>(url, data, config);
  return response.data;
}

/**
 * Typed DELETE request
 */
export async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.delete<T>(url, config);
  return response.data;
}
