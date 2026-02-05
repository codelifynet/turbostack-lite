import { Suspense } from "react";
import { Metadata } from "next";
import {
  ForgotPasswordForm,
  ForgotPasswordFormFallback,
} from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password - TurboStack",
  description: "Reset your TurboStack account password",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordFormFallback />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
