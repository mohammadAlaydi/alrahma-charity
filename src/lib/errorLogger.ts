/**
 * Error logging service
 * Centralized error logging with different severity levels
 */

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorLog {
  message: string;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: Record<string, unknown>;
  stack?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];

  /**
   * Log an error
   */
  log(error: Error | string, severity: ErrorSeverity = "medium", context?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      message: typeof error === "string" ? error : error.message,
      severity,
      timestamp: new Date(),
      context,
      stack: typeof error === "object" ? error.stack : undefined,
    };

    this.logs.push(errorLog);

    // In production, send to external logging service
    if (process.env.NODE_ENV === "production") {
      this.sendToExternalService(errorLog);
    } else {
      // In development, log to console
      console.error(`[${severity.toUpperCase()}]`, errorLog);
    }
  }

  /**
   * Get all logs
   */
  getLogs(): ErrorLog[] {
    return this.logs;
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Send error to external logging service (Sentry, LogRocket, etc.)
   */
  private sendToExternalService(_errorLog: ErrorLog): void {
    // TODO: Implement external logging service integration
    // Example: Sentry.captureException(errorLog);
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();

/**
 * Error handler utility
 */
export const handleError = (
  error: unknown,
  fallbackMessage: string = "حدث خطأ غير متوقع",
): string => {
  if (error instanceof Error) {
    errorLogger.log(error, "medium");
    return error.message;
  }

  if (typeof error === "string") {
    errorLogger.log(error, "medium");
    return error;
  }

  errorLogger.log(fallbackMessage, "medium", { originalError: error });
  return fallbackMessage;
};
