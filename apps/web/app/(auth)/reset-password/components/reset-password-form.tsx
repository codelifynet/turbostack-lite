"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { AuthCard, Input, Button } from "@/components/auth";
import { authService } from "@/services/auth.service";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Redirect if token or email is missing
  useEffect(() => {
    if (!token || !email) {
      const errorMsg =
        "Invalid or missing reset link. Please request a new password reset.";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  }, [token, email]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || !email) {
      const errorMsg = "Invalid reset link";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setError(null);

    const response = await authService.resetPassword({
      email,
      token,
      password: data.password,
    });

    if (!response.success) {
      const errorMsg = response.message || "Failed to reset password";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSuccess(true);
    toast.success("Password reset successfully! Redirecting to login...");
  };

  if (success) {
    return (
      <AuthCard
        title="Password reset successful"
        description="Your password has been successfully reset"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            You can now sign in with your new password.
          </p>
          <Button onClick={() => router.push("/login")}>Go to Sign In</Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your new password below"
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

      {!token || !email ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Invalid or missing reset link. Please request a new password reset.
          </p>
          <Button onClick={() => router.push("/forgot-password")}>
            Request New Reset Link
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" loading={isSubmitting}>
            Reset Password
          </Button>
        </form>
      )}
    </AuthCard>
  );
}

export function ResetPasswordFormFallback() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your new password below"
    >
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    </AuthCard>
  );
}
