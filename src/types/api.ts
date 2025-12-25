/**
 * Shared API response types and error handling
 */

// Standard API response wrapper
export type ApiResponse<T = unknown> = {
  data: T;
  message?: string;
  timestamp?: string;
};

// Paginated response
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Standardized API error
export type ApiError = {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
  timestamp?: string;
};

// Custom error class for API errors
export class ApiException extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiException";
  }
}
