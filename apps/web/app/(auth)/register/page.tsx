import { Suspense } from "react";
import { Metadata } from "next";
import { RegisterForm, RegisterFormFallback } from "./components/register-form";

export const metadata: Metadata = {
  title: "Sign Up - TurboStack",
  description: "Create a new TurboStack account",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFormFallback />}>
      <RegisterForm />
    </Suspense>
  );
}
