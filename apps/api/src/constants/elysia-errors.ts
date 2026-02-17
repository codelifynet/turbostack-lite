/**
 * Maps Elysia built-in error codes to HTTP response details.
 *
 * Used by the global `.onError` handler.
 */
export const ELYSIA_ERROR_MAP: Record<
  string,
  { status: number; error: string; message: string }
> = {
  NOT_FOUND: {
    status: 404,
    error: "NOT_FOUND",
    message: "The requested resource was not found",
  },
  PARSE: {
    status: 400,
    error: "VALIDATION_ERROR",
    message: "Failed to parse request body",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    error: "INTERNAL_ERROR",
    message: "An unexpected error occurred",
  },
} as const;

