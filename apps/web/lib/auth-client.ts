import { createAuthClient } from "better-auth/react";

/**
 * Better Auth React Client
 * Handles authentication state and actions
 *
 * Note: baseURL is omitted to use same-origin requests via Next.js rewrites
 * This ensures cookies are set on the frontend domain (domain.com) instead of backend (api.domain.com)
 */
export const authClient = createAuthClient({
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

// Export types with role field
export type User = typeof authClient.$Infer.Session["user"] & {
  role?: string;
};

export type UserWithRole = typeof authClient.$Infer.Session["user"] & {
  role: string;
};

export type Session = Omit<typeof authClient.$Infer.Session, "user"> & {
  user: User;
};

// Export typed hooks and actions
export const { signIn, signUp, signOut, useSession: _useSession, getSession } = authClient;

// Re-export useSession with proper typing
export function useSession() {
  const result = _useSession();
  return {
    ...result,
    data: result.data
      ? ({
          ...result.data,
          user: {
            ...result.data.user,
            role: (result.data.user as unknown as User).role,
          },
        } as Session)
      : null,
  };
}
