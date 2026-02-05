import { createAuthClient } from "better-auth/react";
import type { Session as BetterAuthSession } from "better-auth";
import { env } from "@/lib/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

/**
 * Better Auth React Client
 * Handles authentication state and actions
 */
export const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: `/api/auth`,
  fetchOptions: {
    credentials: "include",
    onError: (ctx) => {
      console.error("Auth client error:", ctx.error);
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});

// Type definitions with role field
export type UserWithRole = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: "USER" | "ADMIN" | "SUPERADMIN";
};

export type SessionWithRole = {
  user: UserWithRole;
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  };
};

// Export types
export type Session = SessionWithRole;
export type User = UserWithRole;

// Export better-auth client and typed hooks
const { useSession: useSessionOriginal, getSession: getSessionOriginal, signIn, signUp, signOut } = authClient;

// Create a wrapper to cast session type properly
export function useSession() {
  const session = useSessionOriginal();
  return {
    ...session,
    data: session.data as SessionWithRole | null,
  };
}

export async function getSession() {
  const session = await getSessionOriginal();
  if (!session || "error" in session) {
    return null;
  }
  return session as SessionWithRole;
}

// Re-export other auth functions
export { signIn, signUp, signOut };
