import { Suspense } from "react";
import { Metadata } from "next";
import {
  ResendVerificationForm,
  ResendVerificationFormFallback,
} from "./components/resend-verification-form";

export const metadata: Metadata = {
  title: "Resend Verification - TurboStack",
  description: "Resend email verification for your TurboStack account",
};

export default function ResendVerificationPage() {
  return (
    <Suspense fallback={<ResendVerificationFormFallback />}>
      <ResendVerificationForm />
    </Suspense>
  );
}
