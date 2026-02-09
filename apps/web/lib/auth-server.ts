import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-actions";

/**
 * Server-side authentication check
 * Call this in any protected page component
 * Returns valid session or redirects to login
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

/**
 * Check if user has a specific role
 */
export async function requireRole(requiredRole: string) {
  const session = await requireAuth();

  if (
    session.user.role !== requiredRole &&
    session.user.role !== "SUPER_ADMIN"
  ) {
    redirect("/unauthorized");
  }

  return session;
}

/**
 * Check if user is admin
 */
export async function requireAdmin() {
  return requireRole("ADMIN");
}