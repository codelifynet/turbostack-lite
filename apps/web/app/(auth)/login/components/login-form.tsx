"use client";

import { Suspense, useState, useEffect, useId } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Iconify } from "@/components/iconify";
import googleIcon from "@iconify-icons/simple-icons/google";
import githubIcon from "@iconify-icons/simple-icons/github";
import { AuthCard, Input, Button } from "@/components/auth";
import { signIn } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rememberId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(
    null,
  );

  const callbackUrl = searchParams.get("callbackUrl") || "/panel";
  const expired = searchParams.get("expired");
  const error = searchParams.get("error");

  useEffect(() => {
    if (expired === "true") {
      toast.error("Your session has expired. Please login again.");
    }
    if (error) {
      toast.error("Authentication failed. Please try again.");
    }
  }, [expired, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl,
      });

      if (result.error) {
        toast.error(result.error.message || "Login failed");
        setIsLoading(false);
        return;
      }

      toast.success("Login successful! Redirecting...");
      router.refresh();

      // Small delay to ensure cookies are set
      await new Promise((resolve) => setTimeout(resolve, 100));
      window.location.href = callbackUrl;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setOauthLoading(provider);

    try {
      // Use full frontend URL for callback to avoid redirect to API
      const callbackURL = `${window.location.origin}/oauth/callback`;
      await signIn.social({
        provider,
        callbackURL,
      });
    } catch (error) {
      console.error("OAuth error:", error);
      toast.error("Failed to initiate OAuth login");
      setOauthLoading(null);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue"
      footer={
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={rememberId}
            className="w-4 h-4 rounded border-input accent-primary"
          />
          <label htmlFor={rememberId} className="text-sm text-muted-foreground">
            Remember me
          </label>
        </div>

        <Button type="submit" loading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => handleOAuthLogin("google")}
          loading={oauthLoading === "google"}
          disabled={oauthLoading !== null}
        >
          <Iconify icon={googleIcon} className="w-5 h-5" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleOAuthLogin("github")}
          loading={oauthLoading === "github"}
          disabled={oauthLoading !== null}
        >
          <Iconify icon={githubIcon} className="w-5 h-5" />
          GitHub
        </Button>
      </div>
    </AuthCard>
  );
}

export function LoginFormFallback() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </AuthCard>
  );
}
