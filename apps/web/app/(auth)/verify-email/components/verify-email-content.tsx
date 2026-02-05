"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import { AUTH_ENDPOINTS } from "@repo/types";
import { env } from "@/lib/env";

export function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      const errorMsg = "Invalid verification link. No token provided.";
      setStatus("error");
      setMessage(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const verifyEmail = async () => {
      try {
        // Better-auth uses GET with token query param for email verification
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.verifyEmail}?token=${encodeURIComponent(token)}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        // Better-auth returns { status: boolean, user: object | null }
        // Also check response.ok for HTTP-level success
        if (response.ok && (data.status === true || data.user)) {
          const successMsg = "Your email has been verified successfully!";
          setStatus("success");
          setMessage(successMsg);
          toast.success(successMsg);
        } else {
          const errorMsg =
            data.message ||
            data.error?.message ||
            "Failed to verify email. The token may be invalid or expired.";
          setStatus("error");
          setMessage(errorMsg);
          toast.error(errorMsg);
        }
      } catch {
        const errorMsg = "An error occurred while verifying your email.";
        setStatus("error");
        setMessage(errorMsg);
        toast.error(errorMsg);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
      {status === "loading" && (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
          <p className="text-muted-foreground">
            Please wait while we verify your email address.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
            Email Verified!
          </h1>
          <p className="text-muted-foreground mb-6">{message}</p>
          <Button onClick={() => router.push("/panel")} className="w-full">
            Go to Dashboard
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-destructive">
            Verification Failed
          </h1>
          <p className="text-muted-foreground mb-6">{message}</p>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => router.push("/resend-verification")}
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Resend Verification Email
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export function VerifyEmailFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
}
