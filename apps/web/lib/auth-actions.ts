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
 * Get session cookie name based on environment
 * Better Auth'un cookie yapılandırmasına göre cookie ismini döndürür
 * Production'da tarayıcılar Secure flag ile cookie'ye __Secure- öneki ekler
 */
function getSessionCookieName(): string {
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction
    ? "__Secure-turbostack_session_token"
    : "turbostack_session_token";
}

/**
 * Get session token from cookies
 * Better Auth'un cookie'lerini okurken tüm olası cookie isimlerini kontrol eder
 */
async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  // Production cookie ismi (__Secure- öneki ile)
  const productionCookieName = "__Secure-turbostack_session_token";
  // Development cookie ismi
  const developmentCookieName = "turbostack_session_token";

  // Better Auth'un varsayılan cookie prefix'i ile (eğer kullanılıyorsa)
  const betterAuthPrefix = "better-auth";
  const prefixedProduction = `${betterAuthPrefix}.${productionCookieName}`;
  const prefixedDevelopment = `${betterAuthPrefix}.${developmentCookieName}`;

  // Tüm olası cookie isimlerini kontrol et
  return (
    cookieStore.get(productionCookieName)?.value ||
    cookieStore.get(developmentCookieName)?.value ||
    cookieStore.get(prefixedProduction)?.value ||
    cookieStore.get(prefixedDevelopment)?.value ||
    cookieStore.get("__Secure-turbostack_session_token")?.value ||
    cookieStore.get("turbostack_session_token")?.value
  );
}

/**
 * Get all cookies as a Cookie header string
 */
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

/**
 * Get the current session by validating with the API
 * Better Auth'un cookie'lerini otomatik olarak göndermesi için credentials: "include" kullanır
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const apiUrl = env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("API URL not configured");
      return null;
    }

    // Better Auth'un cookie'lerini otomatik olarak göndermesi için
    // Tüm cookie'leri Cookie header'ına ekliyoruz
    const cookieHeader = await getCookieHeader();

    // Better-auth endpoint: /api/auth/get-session
    const response = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Check if data is null or doesn't have user property
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
 * Better Auth'un cookie'lerini otomatik olarak göndermesi için credentials: "include" kullanır
 */
export async function logoutAction() {
  try {
    const apiUrl = env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      // Better Auth'un cookie'lerini otomatik olarak göndermesi için
      // Tüm cookie'leri Cookie header'ına ekliyoruz
      const cookieHeader = await getCookieHeader();

      await fetch(`${apiUrl}${AUTH_ENDPOINTS.signOut}`, {
        method: "POST",
        headers: {
          Cookie: cookieHeader,
        },
        credentials: "include",
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirect("/");
}

/**
 * Server action for forgot password
 */
export async function forgotPasswordAction(
  email: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const apiUrl = env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return { success: false, message: "API URL not configured" };
    }

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
    const apiUrl = env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return { success: false, message: "API URL not configured" };
    }

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
