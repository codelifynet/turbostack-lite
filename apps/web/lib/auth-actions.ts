"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_ENDPOINTS } from "@repo/types";
import { env } from "@/lib/env";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image?: string | null;
  emailVerified?: boolean;
}

export interface SessionData {
  user: User;
  session: {
    token: string;
    expiresAt: string;
  };
}

/**
 * Tüm cookie'leri Cookie header string'ine dönüştürür.
 * Server-side'dan backend'e istek atarken cookie'leri manuel iletmek için kullanılır.
 *
 * Next.js rewrite sayesinde cookie'ler domain.com'da set ediliyor.
 * Middleware/Server Actions'da incoming request'ten cookie'leri okuyup
 * backend'e Cookie header'ı olarak iletiyoruz.
 */
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

/**
 * Backend API URL (server-side direct call)
 * Server-side'dan backend'e doğrudan istek atar (rewrite yerine).
 */
function getApiUrl(): string {
  const apiUrl = env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return apiUrl;
}

/**
 * Get the current session by validating with the API
 *
 * Server-side'dan backend'e doğrudan istek atar.
 * Cookie'ler incoming request'ten okunup Cookie header'ında iletilir.
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const apiUrl = getApiUrl();
    const cookieHeader = await getCookieHeader();

    if (!cookieHeader) {
      return null;
    }

    const response = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.user) {
      return null;
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || "USER",
        image: data.user.image,
        emailVerified: data.user.emailVerified,
      },
      session: data.session,
    };
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Server action to log out the user
 */
export async function logoutAction() {
  try {
    const apiUrl = getApiUrl();
    const cookieHeader = await getCookieHeader();

    await fetch(`${apiUrl}${AUTH_ENDPOINTS.signOut}`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirect("/");
}

/**
 * Server action for forgot password
 */
export async function forgotPasswordAction(
  email: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const apiUrl = getApiUrl();

    const response = await fetch(`${apiUrl}${AUTH_ENDPOINTS.forgotPassword}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    await response.json();

    // Always return success to prevent email enumeration
    return {
      success: true,
      message: "If the email exists, a reset link was sent.",
    };
  } catch {
    return { success: false, message: "Failed to send reset email" };
  }
}

/**
 * Server action for password reset
 */
export async function resetPasswordAction(data: {
  token: string;
  newPassword: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const apiUrl = getApiUrl();

    const response = await fetch(`${apiUrl}${AUTH_ENDPOINTS.resetPassword}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: "Password reset successfully" };
    }

    return {
      success: false,
      message: result.message || "Failed to reset password",
    };
  } catch {
    return { success: false, message: "Failed to reset password" };
  }
}
