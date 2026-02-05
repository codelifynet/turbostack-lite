import { Suspense } from "react";
import { Metadata } from "next";
import { LoginForm, LoginFormFallback } from "./components/login-form";

export const metadata: Metadata = {
  title: "Sign In - TurboStack",
  description: "Sign in to your TurboStack account",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}
