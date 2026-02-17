/**
 * CORS defaults used by the API.
 *
 * Note: `origin` is environment-specific and should be provided at call-site.
 */
export const CORS_DEFAULTS = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-request-id"],
};

