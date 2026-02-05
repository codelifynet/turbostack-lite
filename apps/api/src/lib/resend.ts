import { Resend } from "resend";
import { env } from "@backend/lib/env";

/**
 * Resend client instance
 * Used for sending transactional emails
 */
export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

/**
 * Default email sender
 * Falls back to a default if not configured
 */
export const FROM_EMAIL = env.FROM_EMAIL || "onboarding@resend.dev";

/**
 * Check if email service is configured
 */
export const isEmailConfigured = (): boolean => {
  return resend !== null && env.RESEND_API_KEY !== undefined;
};

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send email using Resend
 * In development without RESEND_API_KEY, logs email to console
 */
export const sendEmail = async (options: SendEmailOptions) => {
  const recipients = Array.isArray(options.to) ? options.to : [options.to];

  // Development mode: Log email to console if no API key
  if (!resend) {
    console.log(
      "\n╔══════════════════════════════════════════════════════════════╗",
    );
    console.log(
      "║  📧 EMAIL (Development Mode - No RESEND_API_KEY)             ║",
    );
    console.log(
      "╠══════════════════════════════════════════════════════════════╣",
    );
    console.log(`║  To:      ${recipients.join(", ")}`);
    console.log(`║  From:    ${FROM_EMAIL}`);
    console.log(`║  Subject: ${options.subject}`);
    console.log(
      "╠══════════════════════════════════════════════════════════════╣",
    );
    if (options.text) {
      console.log("║  Content (Text):");
      console.log("║  " + options.text.split("\n").slice(0, 10).join("\n║  "));
      if (options.text.split("\n").length > 10) {
        console.log("║  ... (truncated)");
      }
    }
    console.log(
      "╚══════════════════════════════════════════════════════════════╝\n",
    );
    return { id: `dev-${Date.now()}` };
  }

  try {
    const emailData: any = {
      from: FROM_EMAIL,
      to: recipients,
      subject: options.subject,
      replyTo: options.replyTo,
    };

    if (options.html) emailData.html = options.html;
    if (options.text) emailData.text = options.text;

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("❌ Failed to send email:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully:", data?.id);
    return data;
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw error;
  }
};
