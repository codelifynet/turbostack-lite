import { treaty } from "@elysiajs/eden";
import type { App } from "@api/index";
import { env } from "@/lib/env";

/**
 * Use same-origin (relative) URL on the client side so requests go through
 * Next.js rewrites → cookies are forwarded automatically.
 * On the server side (SSR), use the full API URL directly.
 */
const isServer = typeof window === "undefined";
const API_BASE_URL = isServer
  ? env.NEXT_PUBLIC_API_URL // SSR: direct backend call
  : window.location.origin; // Browser: same-origin → Next.js rewrites

export const api = treaty<App>(API_BASE_URL, {
  fetch: {
    credentials: "include",
  },
});

export const baseApi = api.api;

/**
 * Traditional REST client wrapper.
 * Uses same-origin on the client for cookie forwarding.
 */
const getBaseUrl = () =>
  typeof window === "undefined" ? env.NEXT_PUBLIC_API_URL : ""; // empty string = same origin (relative path)

export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  async post<T>(path: string, data?: unknown): Promise<T> {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async patch<T>(path: string, data?: unknown): Promise<T> {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async delete<T>(path: string): Promise<T | void> {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  },
};
