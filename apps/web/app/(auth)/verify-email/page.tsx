import { Suspense } from "react";
import { Metadata } from "next";
import {
  VerifyEmailContent,
  VerifyEmailFallback,
} from "./components/verify-email-content";

export const metadata: Metadata = {
  title: "Verify Email - TurboStack",
  description: "Verify your TurboStack account email address",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
