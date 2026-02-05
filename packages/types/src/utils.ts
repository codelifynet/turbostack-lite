/**
 * Resolves the API base URL from environment variables
 * Falls back to localhost in development if not set
 *
 * Note: In Next.js, NEXT_PUBLIC_* variables are embedded at build time.
 * Make sure NEXT_PUBLIC_API_URL is set in your environment before building.
 */
export function resolveApiBaseUrl(): string {
  // Client-side (browser) - NEXT_PUBLIC_* vars are available
  if (typeof window !== "undefined") {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) return apiUrl;

    // Fallback for development
    if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }

    // Production fallback - should not happen if env var is set
    console.warn("NEXT_PUBLIC_API_URL is not set! OAuth will not work.");
    return "";
  }

  // Server-side (Node.js)
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    ""
  );
}
