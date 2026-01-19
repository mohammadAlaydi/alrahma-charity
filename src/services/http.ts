import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError, ApiException } from "@/types/api";
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from "@/config/constants";
import { tokenStorage } from "@/lib/storage";
import { errorLogger } from "@/lib/errorLogger";
import { isDevelopment } from "@/lib/env";

export const http = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api/${API_CONFIG.VERSION}`,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // Prevent aggressive caching in development
  params: isDevelopment ? { _nocache: Date.now() } : undefined,
});

/**
 * Get access token from storage
 */
function getAccessToken(): string | null {
  return tokenStorage.getAccessToken();
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
      const exception = new ApiException(0, ERROR_MESSAGES.NETWORK_ERROR, "NETWORK_ERROR");
      const severity = isDevelopment ? "low" : "high";
      errorLogger.log(exception, severity);
      throw exception;
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
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      tokenStorage.clearTokens();
      apiError.message = ERROR_MESSAGES.UNAUTHORIZED;
    }

    // Handle 403 Forbidden
    if (status === HTTP_STATUS.FORBIDDEN) {
      apiError.message = ERROR_MESSAGES.FORBIDDEN;
    }

    // Handle 404 Not Found
    if (status === HTTP_STATUS.NOT_FOUND) {
      apiError.message = data?.message || ERROR_MESSAGES.NOT_FOUND;
    }

    // Handle 500+ Server errors
    if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      apiError.message = ERROR_MESSAGES.SERVER_ERROR;
    }

    const exception = new ApiException(apiError.statusCode, apiError.message, apiError.error, apiError.details);
    errorLogger.log(exception, status >= 500 ? "critical" : "medium", { status, data });
    throw exception;
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
