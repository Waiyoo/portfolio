import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors/AppError";

export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(error: unknown, status?: number): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: status ?? error.statusCode }
    );
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: "INTERNAL_ERROR",
      },
    },
    { status: status ?? 500 }
  );
}
