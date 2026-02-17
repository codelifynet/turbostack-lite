import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { rateLimit } from "elysia-rate-limit";

import { logger } from "@api/lib/logger";
import { env } from "@api/lib/env";
import { AppError } from "@api/lib/errors";
import {
  BLOCKED_PATH_PATTERNS,
  CORS_DEFAULTS,
  ELYSIA_ERROR_MAP,
  getOpenApiDocumentation,
  RATE_LIMIT,
} from "@api/constants";
import { auth } from "@api/lib/auth";
import {
  healthRoutes,
  authRoutes,
  dashboardRoutes,
  usersRoutes,
  profileRoutes,
  settingsMediaUploadRoutes,
  mediaRoutes,
  uploadthingRoutes,
  systemRoutes,
} from "@api/routes";

/**
 * TurboStack Backend API
 * Elysia.js + Bun runtime
 */
const app = new Elysia()
  // Security: Block access to sensitive files
  .onRequest(({ request, set }) => {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    // Check if path matches any blocked pattern
    for (const pattern of BLOCKED_PATH_PATTERNS) {
      if (pattern.test(pathname)) {
        set.status = 404;
        return {
          success: false,
          error: "NOT_FOUND",
          message: "Resource not found",
        };
      }
    }
  })

  // Request ID & Logging Middleware
  .derive(({ request, headers }) => {
    const requestId =
      (headers["x-request-id"] as string) || crypto.randomUUID();
    const startTime = Date.now();

    const method = request.method;
    const url = new URL(request.url);

    logger.info(
      { requestId, method, path: url.pathname },
      `[REQUEST] ${method} ${url.pathname}`,
    );

    return { requestId, startTime };
  })

  // Add request ID to response headers & Log Response
  .onAfterHandle(({ request, set, requestId, startTime }) => {
    // Set Header
    set.headers["x-request-id"] = requestId;

    // Log Response
    if (requestId && startTime) {
      const duration = Date.now() - startTime;
      const method = request.method;
      const url = new URL(request.url);
      const status = set.status;

      logger.info(
        { requestId, method, path: url.pathname, status, duration },
        `[RESPONSE] ${method} ${url.pathname} ${status} (${duration}ms)`,
      );
    }
  })

  // CORS configuration
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      ...CORS_DEFAULTS,
    }),
  )

  // Global error handler - Standard API Response Format
  .onError(({ error, code, set, requestId }) => {
    // Handle custom AppError instances
    if (error instanceof AppError) {
      set.status = error.status;
      const err = error as any;
      logger.error(
        { requestId, code: err.code, error: err },
        `[ERROR] ${err.code || "UNKNOWN"}: ${err.message}`,
      );

      // Standard API response format
      return {
        success: false,
        error: err.code || "INTERNAL_ERROR",
        message: err.message || "An unexpected error occurred",
        ...(err.details && { details: err.details }),
        ...(requestId && { requestId }),
      };
    }

    // Handle Elysia built-in errors
    // Special handling for VALIDATION errors to extract user-friendly messages
    if (code === "VALIDATION" && error && typeof error === "object") {
      set.status = 400;

      // Try to parse Elysia validation error format
      const errorObj = error as any;
      let message = "Validation failed";

      // Elysia validation errors can have different structures
      // Try to extract user-friendly message
      try {
        // Check if it's an Error object with all property
        if (
          errorObj.all &&
          Array.isArray(errorObj.all) &&
          errorObj.all.length > 0
        ) {
          const firstError = errorObj.all[0];
          if (firstError.summary) {
            message = String(firstError.summary)
              .replace(
                /Expected property '(\w+)' to be (\w+) but found: undefined/g,
                "'$1' field is required",
              )
              .replace(
                /Property '(\w+)' is missing/g,
                "'$1' field is required",
              );
          } else if (firstError.path) {
            const fieldName = String(firstError.path).replace(/^\//, "");
            message = `'${fieldName}' field is required`;
          }
        }
        // Check for errors array
        else if (
          errorObj.errors &&
          Array.isArray(errorObj.errors) &&
          errorObj.errors.length > 0
        ) {
          const firstError = errorObj.errors[0];
          if (firstError.summary && typeof firstError.summary === "string") {
            message = firstError.summary
              .replace(
                /Expected property '(\w+)' to be (\w+) but found: undefined/g,
                "'$1' field is required",
              )
              .replace(
                /Property '(\w+)' is missing/g,
                "'$1' field is required",
              );
          } else if (firstError.path) {
            const fieldName = firstError.path.replace(/^\//, "");
            message = `'${fieldName}' field is required`;
          }
        }
        // Check for direct summary
        else if (errorObj.summary && typeof errorObj.summary === "string") {
          message = errorObj.summary
            .replace(
              /Expected property '(\w+)' to be (\w+) but found: undefined/g,
              "'$1' field is required",
            )
            .replace(/Property '(\w+)' is missing/g, "'$1' field is required");
        }
        // Check for message that's not JSON
        else if (
          errorObj.message &&
          typeof errorObj.message === "string" &&
          !errorObj.message.startsWith("{")
        ) {
          message = errorObj.message;
        }
        // Check for property path
        else if (errorObj.property) {
          const propertyPath = errorObj.property
            .replace(/^\//, "")
            .replace(/\//g, ".");
          message = `'${propertyPath}' field is required`;
        }
        // Try to get from validator property
        else if (errorObj.validator?.Errors) {
          const errors = [...errorObj.validator.Errors(errorObj.value)];
          if (errors.length > 0 && errors[0].message) {
            message = String(errors[0].message);
          }
        }
      } catch {
        // If parsing fails, use default message
        message = "Invalid request data";
      }

      logger.error(
        { requestId, error: message },
        `[ERROR] VALIDATION: ${message}`,
      );

      return {
        success: false,
        error: "VALIDATION_ERROR",
        message,
        ...(requestId && { requestId }),
      };
    }

    const errorInfo = ELYSIA_ERROR_MAP[code] || {
      status: 500,
      error: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    };

    set.status = errorInfo.status;

    // Get error message safely
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : "Unknown error";

    logger.error(
      { requestId, code, error: errorMessage },
      `[ERROR] ${code}: ${errorMessage}`,
    );

    // Don't expose internal error details in production
    const message =
      env.NODE_ENV === "production" ? errorInfo.message : errorMessage;

    // Standard API response format
    return {
      success: false,
      error: errorInfo.error,
      message,
      ...(requestId && { requestId }),
    };
  })

  // OpenAPI documentation (Swagger UI) with Basic Auth
  .onBeforeHandle(({ request, set }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Only protect /openapi path
    if (pathname === "/openapi" || pathname.startsWith("/openapi/")) {
      // Check if credentials are configured
      if (!env.DOCS_USERNAME || !env.DOCS_PASSWORD) {
        // If not configured, allow access (development mode)
        return;
      }

      // Get Authorization header
      const authHeader = request.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Basic ")) {
        set.status = 401;
        set.headers["WWW-Authenticate"] = 'Basic realm="OpenAPI Documentation"';
        return {
          success: false,
          error: "UNAUTHORIZED",
          message: "Authentication required to access OpenAPI documentation",
        };
      }

      // Decode Basic Auth credentials
      const base64Credentials = authHeader.slice(6); // Remove "Basic "
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf-8",
      );
      const [username, password] = credentials.split(":");

      // Validate credentials
      if (username !== env.DOCS_USERNAME || password !== env.DOCS_PASSWORD) {
        set.status = 401;
        set.headers["WWW-Authenticate"] = 'Basic realm="OpenAPI Documentation"';
        return {
          success: false,
          error: "UNAUTHORIZED",
          message: "Invalid username or password",
        };
      }
    }
  })
  .use(
    openapi({
      documentation: getOpenApiDocumentation(env.PORT),
      path: "/openapi",
    }),
  )

  // Mount routes
  .use(healthRoutes)

  // Better-auth must be mounted FIRST using .mount() to avoid body parsing conflicts
  .mount(auth.handler)

  .group(
    "/api",
    (app) =>
      app
        // Apply rate limiting to API routes (excludes Better Auth /api/auth/*)
        .use(
          rateLimit({
            duration: RATE_LIMIT.GLOBAL.duration,
            max: RATE_LIMIT.GLOBAL.max,
          }),
        )
        .use(authRoutes) // Protected user routes at /api/*
        .use(dashboardRoutes) // Dashboard stats at /api/dashboard/*
        .use(usersRoutes) // User management at /api/users/*
        .use(profileRoutes) // Profile at /api/profile/*
        .use(mediaRoutes) // Media management at /api/media/*
        .use(uploadthingRoutes) // UploadThing file uploads at /api/uploadthing/*
        .use(settingsMediaUploadRoutes) // Media upload settings at /api/settings/media-upload/**
        .use(systemRoutes), // System statistics at /api/system/*
  )

  // Root endpoint
  .get(
    "/",
    () => ({
      success: true,
      data: {
        name: "TurboStack API",
        version: "1.0.0",
        documentation: "/openapi",
      },
    }),
    {
      detail: {
        tags: ["Health"],
        summary: "API Root",
        description:
          "Returns basic API information and links to documentation.",
        responses: {
          200: {
            description: "API information",
            content: {
              "application/json": {
                example: {
                  success: true,
                  data: {
                    name: "TurboStack API",
                    version: "1.0.0",
                    documentation: "/openapi",
                  },
                },
              },
            },
          },
        },
      },
    },
  )

  // Start server
  .listen(env.PORT);

// Export type for Eden Treaty (type-safe client)
export type App = typeof app;

// Startup message
console.log(`
\x1b[36m╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 TurboStack API Server                                   ║
║                                                            ║
║   Local:        http://localhost:${env.PORT}                    ║
║   Environment:  ${env.NODE_ENV.padEnd(16)}                       ║
║   OpenAPI:      http://localhost:${env.PORT}/openapi            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝\x1b[0m
`);
