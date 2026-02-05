"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { AuthCard, Input, Button } from "@/components/auth";
import { AUTH_ENDPOINTS } from "@repo/types";
import { env } from "@/lib/env";

const resendSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ResendFormData = z.infer<typeof resendSchema>;

export function ResendVerificationForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResendFormData>({
    resolver: zodResolver(resendSchema),
  });

  // Check if user is logged in but not verified
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.session}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await response.json();

        if (data.authenticated && data.emailVerified) {
          // Email already verified, redirect to dashboard
          router.replace("/panel");
          return;
        }

        if (data.authenticated && !data.emailVerified && data.user?.email) {
          setUserEmail(data.user.email);
          setValue("email", data.user.email);
        }
      } catch {
        // Ignore errors
      }
    };

    checkSession();
  }, [setValue, router]);

  const onSubmit = async (data: ResendFormData) => {
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.resendVerification}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      // Better-auth returns { status: boolean } format
      if (response.ok && result.status !== false) {
        const successMsg = "Verification email sent successfully!";
        setStatus("success");
        setMessage(successMsg);
        toast.success(successMsg);
      } else {
        const errorMsg =
          result.message ||
          result.error?.message ||
          "Failed to send verification email.";
        setStatus("error");
        setMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      const errorMsg = "An error occurred. Please try again.";
      setStatus("error");
      setMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
        <p className="text-sm text-muted-foreground mb-6">
          Didnt receive the email? Check your spam folder or try again.
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <AuthCard
      title="Email Verification Required"
      description="Please verify your email address to access your dashboard"
      footer={
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      }
    >
      {userEmail && (
        <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            Your email address has not been verified yet. Please check your
            inbox or request a new verification email.
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {message}
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
          <Mail className="w-4 h-4 mr-2" />
          Send Verification Email
        </Button>
      </form>
    </AuthCard>
  );
}

export function ResendVerificationFormFallback() {
  return (
    <AuthCard
      title="Email Verification Required"
      description="Please verify your email address to access your dashboard"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </AuthCard>
  );
}
