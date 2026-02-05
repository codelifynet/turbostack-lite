"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Button } from "@repo/shadcn-ui/button";
import Link from "next/link";

export function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/panel";

  useEffect(() => {
    // Handle error from OAuth provider
    if (error) {
      setStatus("error");
      setErrorMessage(getErrorMessage(error));
      toast.error(getErrorMessage(error));
      return;
    }

    // If session is loaded and user exists, redirect
    if (!isPending && session?.user) {
      setStatus("success");
      toast.success("Login successful!");

      // Small delay for visual feedback
      setTimeout(() => {
        router.push(callbackUrl);
      }, 500);
    }

    // If session is loaded but no user, show error
    if (!isPending && !session?.user && !error) {
      // Wait a bit for session to be established from cookie
      const timeout = setTimeout(() => {
        if (!session?.user) {
          setStatus("error");
          setErrorMessage("Failed to establish session. Please try again.");
          toast.error("Authentication failed");
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [session, isPending, error, router, callbackUrl]);

  function getErrorMessage(errorCode: string): string {
    const errors: Record<string, string> = {
      access_denied: "Access was denied. Please try again.",
      oauth_failed: "OAuth authentication failed.",
      no_session: "Could not create session. Please try again.",
      invalid_state: "Invalid authentication state. Please try again.",
    };
    return errors[errorCode] || "An error occurred during authentication.";
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center max-w-md w-full">
      {status === "loading" && (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Completing sign in...</h1>
          <p className="text-muted-foreground">
            Please wait while we complete your authentication.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Redirecting you to the dashboard...
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-destructive">
            Authentication Failed
          </h1>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          <div className="space-y-3">
            <Link href="/login" className="block">
              <Button className="w-full">Try Again</Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                Go Home
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export function OAuthCallbackFallback() {
  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center max-w-md w-full">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
      <p className="text-muted-foreground">
        Please wait while we prepare your authentication.
      </p>
    </div>
  );
}
