
class ApiException extends Error {
    constructor(statusCode, message, error, details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.details = details;
        this.name = "ApiException";
    }
}

class ErrorLogger {
    log(error, severity = "medium", context) {
        const errorLog = {
            message: typeof error === "string" ? error : error.message,
            severity,
            timestamp: new Date(),
            context,
            stack: typeof error === "object" ? error.stack : undefined,
        };

        console.log("Error object:", error);
        console.log("Error message property:", error.message);
        console.error(`[${severity.toUpperCase()}]`, errorLog);
    }
}

const logger = new ErrorLogger();
const exception = new ApiException(0, "Network Error", "NETWORK_ERROR");

logger.log(exception, "high");
