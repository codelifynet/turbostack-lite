"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import { AuthCard, Input, Button } from "@/components/auth";
import { authService } from "@/services/auth.service";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    const response = await authService.forgotPassword(data.email);

    if (!response.success) {
      const errorMsg = response.message || "Failed to send reset email";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSubmittedEmail(data.email);
    setSubmitted(true);
    toast.success("Password reset email sent! Please check your inbox.");

    // In development, log the debug info
    if (response.data?.debug) {
      console.log("Reset token (dev only):", response.data.debug);
    }
  };

  if (submitted) {
    return (
      <AuthCard
        title="Check your email"
        description={`We've sent a password reset link to ${submittedEmail}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            variant="secondary"
            onClick={() => setSubmitted(false)}
            className="mb-4"
          >
            Try another email
          </Button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      description="No worries, we'll send you reset instructions."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" loading={isSubmitting}>
          Send Reset Link
        </Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordFormFallback() {
  return (
    <AuthCard
      title="Forgot password?"
      description="No worries, we'll send you reset instructions."
    >
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </AuthCard>
  );
}
