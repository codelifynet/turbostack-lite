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
import userIcon from "@iconify-icons/lucide/user";
import shieldIcon from "@iconify-icons/lucide/shield";
import copyIcon from "@iconify-icons/lucide/copy";
import checkIcon from "@iconify-icons/lucide/check";
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
		setValue,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

	const fillDemoCredentials = (email: string, password: string) => {
		setValue("email", email);
		setValue("password", password);
	};

	const copyToClipboard = async (text: string, account: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedAccount(account);
			setTimeout(() => setCopiedAccount(null), 2000);
			toast.success("Copied to clipboard");
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

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
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						className="text-primary hover:underline font-medium"
					>
						Sign up
					</Link>
				</p>
			}
		>
			{/* Demo Credentials */}
			<div className="mb-6 overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 backdrop-blur-sm">
				<div className="border-b border-border/50 bg-muted/40 px-4 py-2.5">
					<div className="flex items-center gap-2">
						<div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
							<Iconify icon={shieldIcon} className="h-3 w-3 text-primary" />
						</div>
						<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							Demo Accounts
						</p>
					</div>
				</div>
				<div className="p-3 grid grid-cols-2 gap-3">
					<button
						type="button"
						onClick={() => fillDemoCredentials("admin@demo.com", "demo123")}
						className="group relative w-full overflow-hidden rounded-lg border border-border/50 bg-background/50 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
					>
						<div className="flex flex-col items-center gap-2 text-center">
							<div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-500/10 ring-1 ring-amber-500/20">
								<Iconify
									icon={shieldIcon}
									className="h-5 w-5 text-amber-600 dark:text-amber-500"
								/>
							</div>
							<div className="w-full">
								<div className="flex items-center justify-center gap-1.5 mb-1">
									<span className="text-sm font-semibold text-foreground">
										Admin
									</span>
									<span className="inline-flex items-center rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20">
										ADMIN
									</span>
								</div>
								<p className="text-xs text-muted-foreground truncate mb-1">
									admin@demo.com
								</p>
								<div className="flex items-center justify-center gap-1.5">
									<span className="text-[10px] font-mono text-muted-foreground">
										demo123
									</span>
									<div
										role="button"
										tabIndex={0}
										onClick={(e) => {
											e.stopPropagation();
											copyToClipboard("admin@demo.com / demo123", "admin");
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												e.stopPropagation();
												copyToClipboard("admin@demo.com / demo123", "admin");
											}
										}}
										className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-muted rounded cursor-pointer"
									>
										<Iconify
											icon={copiedAccount === "admin" ? checkIcon : copyIcon}
											className={`h-3 w-3 ${copiedAccount === "admin" ? "text-green-600" : "text-muted-foreground"}`}
										/>
									</div>
								</div>
							</div>
						</div>
					</button>
					<button
						type="button"
						onClick={() => fillDemoCredentials("user@demo.com", "demo123")}
						className="group relative w-full overflow-hidden rounded-lg border border-border/50 bg-background/50 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
					>
						<div className="flex flex-col items-center gap-2 text-center">
							<div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10 ring-1 ring-blue-500/20">
								<Iconify
									icon={userIcon}
									className="h-5 w-5 text-blue-600 dark:text-blue-500"
								/>
							</div>
							<div className="w-full">
								<div className="flex items-center justify-center gap-1.5 mb-1">
									<span className="text-sm font-semibold text-foreground">
										User
									</span>
									<span className="inline-flex items-center rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-400 ring-1 ring-blue-500/20">
										USER
									</span>
								</div>
								<p className="text-xs text-muted-foreground truncate mb-1">
									user@demo.com
								</p>
								<div className="flex items-center justify-center gap-1.5">
									<span className="text-[10px] font-mono text-muted-foreground">
										demo123
									</span>
									<div
										role="button"
										tabIndex={0}
										onClick={(e) => {
											e.stopPropagation();
											copyToClipboard("user@demo.com / demo123", "user");
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												e.stopPropagation();
												copyToClipboard("user@demo.com / demo123", "user");
											}
										}}
										className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-muted rounded cursor-pointer"
									>
										<Iconify
											icon={copiedAccount === "user" ? checkIcon : copyIcon}
											className={`h-3 w-3 ${copiedAccount === "user" ? "text-green-600" : "text-muted-foreground"}`}
										/>
									</div>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>

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

			{/* <div className="relative my-6">
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
      </div> */}
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
