import { env } from "@api/lib/env";
import { sendEmail } from "@api/lib/resend";

interface VerificationEmailData {
  to: string;
  url: string;
  token: string;
  userName?: string;
}

interface PasswordResetEmailData {
  to: string;
  url: string;
  token: string;
  userName?: string;
}

interface WelcomeEmailData {
  to: string;
  userName?: string;
  tempPassword: string;
  loginUrl: string;
}

/**
 * Send email verification link
 * Called by Better Auth when user signs up or requests new verification
 */
export const sendVerificationEmail = async (data: VerificationEmailData) => {
  const { to, url, userName } = data;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #0070f3;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
          }
          .button:hover {
            background: #0051cc;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify Your Email Address</h1>
          ${userName ? `<p>Hi ${userName},</p>` : "<p>Hi,</p>"}
          <p>Thanks for signing up! Please verify your email address to complete your registration.</p>
          <p>
            <a href="${url}" class="button">Verify Email Address</a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${url}</p>
          <div class="footer">
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Verify Your Email Address

${userName ? `Hi ${userName},` : "Hi,"}

Thanks for signing up! Please verify your email address to complete your registration.

Click here to verify: ${url}

If you didn't create an account, you can safely ignore this email.
This link will expire in 24 hours.
  `.trim();

  await sendEmail({
    to,
    subject: "Verify Your Email Address",
    html,
    text,
  });
};

/**
 * Send password reset link
 * Called by Better Auth when user requests password reset
 */
export const sendPasswordResetEmail = async (data: PasswordResetEmailData) => {
  const { to, url, userName } = data;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #0070f3;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
          }
          .button:hover {
            background: #0051cc;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Your Password</h1>
          ${userName ? `<p>Hi ${userName},</p>` : "<p>Hi,</p>"}
          <p>We received a request to reset your password. Click the button below to choose a new password.</p>
          <p>
            <a href="${url}" class="button">Reset Password</a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${url}</p>
          <div class="warning">
            <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </div>
          <div class="footer">
            <p>This link will expire in 1 hour.</p>
            <p>For security reasons, we recommend choosing a strong, unique password.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Reset Your Password

${userName ? `Hi ${userName},` : "Hi,"}

We received a request to reset your password. Click the link below to choose a new password.

Reset password: ${url}

⚠️ Security Notice: If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

This link will expire in 1 hour.
For security reasons, we recommend choosing a strong, unique password.
  `.trim();

  await sendEmail({
    to,
    subject: "Reset Your Password",
    html,
    text,
  });
};

/**
 * Send welcome email with temporary password
 * Called when admin creates a new user account
 */
export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
  const { to, userName, tempPassword, loginUrl } = data;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome - Your Account Has Been Created</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #0070f3;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
          }
          .button:hover {
            background: #0051cc;
          }
          .credentials {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .credentials p {
            margin: 8px 0;
          }
          .credentials strong {
            color: #333;
          }
          .password-box {
            background: #fff;
            border: 2px dashed #ddd;
            padding: 12px 16px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 16px;
            letter-spacing: 1px;
            margin-top: 8px;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome! 🎉</h1>
          ${userName ? `<p>Hi ${userName},</p>` : "<p>Hi,</p>"}
          <p>Your account has been created by an administrator. Below are your login credentials:</p>
          
          <div class="credentials">
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Temporary Password:</strong></p>
            <div class="password-box">${tempPassword}</div>
          </div>
          
          <p>
            <a href="${loginUrl}" class="button">Login to Your Account</a>
          </p>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> Please change your password immediately after your first login for security reasons.
          </div>
          
          <div class="footer">
            <p>If you have any questions, please contact your administrator.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome! 🎉

${userName ? `Hi ${userName},` : "Hi,"}

Your account has been created by an administrator. Below are your login credentials:

Email: ${to}
Temporary Password: ${tempPassword}

Login here: ${loginUrl}

⚠️ Important: Please change your password immediately after your first login for security reasons.

If you have any questions, please contact your administrator.
  `.trim();

  await sendEmail({
    to,
    subject: "Welcome - Your Account Has Been Created",
    html,
    text,
  });
};
