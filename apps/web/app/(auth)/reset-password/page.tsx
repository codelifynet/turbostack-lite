import { Suspense } from "react";
import { Metadata } from "next";
import {
  ResetPasswordForm,
  ResetPasswordFormFallback,
} from "./components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password - TurboStack",
  description: "Set a new password for your TurboStack account",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFormFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
