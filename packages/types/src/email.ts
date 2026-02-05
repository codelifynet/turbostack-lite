// ============================================
// Email Types (Shared between API and Web)
// ============================================

export interface SendVerificationEmailParams {
  email: string;
  name: string | null;
  url: string;
}

export interface SendPasswordResetEmailParams {
  email: string;
  name: string | null;
  url: string;
}

export interface SendWelcomeEmailParams {
  email: string;
  name: string | null;
}

export interface EmailServiceResponse {
  success: boolean;
  error?: string;
}
