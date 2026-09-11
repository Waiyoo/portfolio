export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    details?: unknown,
    code = "APP_ERROR"
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static notFound(message = "Resource not found.", details?: unknown): AppError {
    return new AppError(message, 404, details, "NOT_FOUND");
  }

  static conflict(message = "Resource conflict.", details?: unknown): AppError {
    return new AppError(message, 409, details, "CONFLICT");
  }

  static badRequest(message = "Bad request.", details?: unknown): AppError {
    return new AppError(message, 400, details, "BAD_REQUEST");
  }

  static unauthorized(message = "Unauthorized.", details?: unknown): AppError {
    return new AppError(message, 401, details, "UNAUTHORIZED");
  }

  static forbidden(message = "Forbidden.", details?: unknown): AppError {
    return new AppError(message, 403, details, "FORBIDDEN");
  }
}
