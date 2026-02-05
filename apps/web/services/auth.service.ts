import { apiClient } from "@/lib/api";
import {
  DEFAULT_ERROR_MESSAGES,
  mapBetterAuthUserToUser,
  createSuccessResponse,
  createErrorResponse,
  createNetworkErrorResponse,
} from "@/helpers/auth.helpers";
import type {
  ApiResponse,
  AuthResponse,
  UserFrontend,
  BetterAuthSignUpResponse,
  BetterAuthSignInResponse,
  BetterAuthSessionResponse,
} from "@repo/types";

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<
        BetterAuthSignUpResponse | { error?: string; message?: string }
      >("/api/auth/sign-up/email", data);

      // Check if response has error property directly (Better Auth error style)
      if ("error" in response && response.error) {
        return createErrorResponse(
          response.error || DEFAULT_ERROR_MESSAGES.registration,
          response.message || DEFAULT_ERROR_MESSAGES.registration,
        );
      }

      const result = response as BetterAuthSignUpResponse;

      if (result?.user) {
        const authData: AuthResponse = {
          user: mapBetterAuthUserToUser(result.user),
          session: result.session,
        };
        return createSuccessResponse(authData);
      }

      return createErrorResponse(
        DEFAULT_ERROR_MESSAGES.registration,
        DEFAULT_ERROR_MESSAGES.registration,
      );
    } catch (error) {
      return createNetworkErrorResponse("registration");
    }
  },

  async login(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<
        BetterAuthSignInResponse | { error?: string; message?: string }
      >("/api/auth/sign-in/email", data);

      if ("error" in response && response.error) {
        return createErrorResponse(
          response.error || DEFAULT_ERROR_MESSAGES.login,
          response.message || DEFAULT_ERROR_MESSAGES.login,
        );
      }

      const result = response as BetterAuthSignInResponse;

      if (result?.user) {
        const authData: AuthResponse = {
          user: mapBetterAuthUserToUser(result.user),
          session: result.session,
        };
        return createSuccessResponse(authData);
      }

      return createErrorResponse(
        DEFAULT_ERROR_MESSAGES.login,
        DEFAULT_ERROR_MESSAGES.login,
      );
    } catch {
      return createNetworkErrorResponse("login");
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      await apiClient.post("/api/auth/sign-out", {});

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }

      return createSuccessResponse(void 0);
    } catch {
      return createNetworkErrorResponse("logout");
    }
  },

  async forgotPassword(
    email: string,
  ): Promise<ApiResponse<{ debug?: { token: string; email: string } }>> {
    try {
      const response = await apiClient.post<any>("/api/auth/forgot-password", {
        email,
      });

      if (response?.error || response?.success === false) {
        return createErrorResponse(
          "Request failed",
          response?.message ||
            response?.error ||
            DEFAULT_ERROR_MESSAGES.forgotPassword,
        );
      }

      const resultData: { debug?: { token: string; email: string } } = response
        ?.data
        ? { debug: response.data }
        : {};

      return createSuccessResponse(resultData, response?.message);
    } catch {
      return createNetworkErrorResponse("forgotPassword");
    }
  },

  async resetPassword(data: {
    email: string;
    token: string;
    password: string;
  }): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<any>("/api/auth/reset-password", {
        newPassword: data.password,
        token: data.token,
      });

      if (response?.error || response?.success === false) {
        return createErrorResponse(
          "Request failed",
          response?.message ||
            response?.error ||
            DEFAULT_ERROR_MESSAGES.resetPassword,
        );
      }

      return createSuccessResponse(void 0, response?.message);
    } catch {
      return createNetworkErrorResponse("resetPassword");
    }
  },

  async getSession(): Promise<ApiResponse<{ user: UserFrontend }>> {
    try {
      const response = await apiClient.get<
        BetterAuthSessionResponse | { error?: string }
      >("/api/auth/get-session");

      if ("error" in response && response.error) {
        return createErrorResponse("No session", "No session");
      }

      const result = response as BetterAuthSessionResponse;

      if (result?.user) {
        return createSuccessResponse({
          user: mapBetterAuthUserToUser(result.user),
        });
      }

      return createErrorResponse("No session", "No session");
    } catch {
      return createNetworkErrorResponse("getSession");
    }
  },
};
