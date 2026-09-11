export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static notFound(message = "Resource not found.", details?: unknown): AppError {
    return new AppError(message, 404, "NOT_FOUND", details);
  }

  static conflict(message = "Resource conflict.", details?: unknown): AppError {
    return new AppError(message, 409, "CONFLICT", details);
  }

  static badRequest(message = "Bad request.", details?: unknown): AppError {
    return new AppError(message, 400, "BAD_REQUEST", details);
  }

  static unauthorized(message = "Unauthorized.", details?: unknown): AppError {
    return new AppError(message, 401, "UNAUTHORIZED", details);
  }

  static forbidden(message = "Forbidden.", details?: unknown): AppError {
    return new AppError(message, 403, "FORBIDDEN", details);
  }
}
