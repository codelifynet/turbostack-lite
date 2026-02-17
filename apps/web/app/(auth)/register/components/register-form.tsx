"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import { Iconify } from "@/components/iconify";
import googleIcon from "@iconify-icons/simple-icons/google";
import githubIcon from "@iconify-icons/simple-icons/github";
import { signUp, signIn } from "@/lib/auth-client";
import { AuthCard, Input, Button } from "@/components/auth";

const registerSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
		acceptTerms: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(
		null,
	);
	const [registrationComplete, setRegistrationComplete] = useState(false);
	const [registeredEmail, setRegisteredEmail] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			acceptTerms: false,
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setError(null);
		setIsLoading(true);

		try {
			const result = await signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
			});

			if (result.error) {
				const errorMsg = result.error.message || "Registration failed";
				setError(errorMsg);
				toast.error(errorMsg);
				setIsLoading(false);
				return;
			}

			// Show verification email sent message
			setRegisteredEmail(data.email);
			setRegistrationComplete(true);
			toast.success(
				"Account created successfully! Please check your email to verify your account.",
			);
		} catch (err) {
			console.error("Registration error:", err);
			const errorMsg = "An unexpected error occurred";
			setError(errorMsg);
			toast.error(errorMsg);
		} finally {
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

	// Show success message after registration
	if (registrationComplete) {
		return (
			<div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
				{/* Animated icon */}
				<div className="relative mx-auto mb-8 w-fit">
					<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
						<div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
							<Mail className="w-8 h-8 text-primary" />
						</div>
					</div>
					<div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
						<CheckCircle className="w-4 h-4 text-white" />
					</div>
				</div>

				<h1 className="text-2xl font-bold mb-3">Verify your email</h1>

				<p className="text-muted-foreground mb-2">
					We&apos;ve sent a verification link to
				</p>

				<div className="bg-muted/50 rounded-lg px-4 py-2 mb-6 inline-block">
					<p className="font-medium text-primary">{registeredEmail}</p>
				</div>

				<div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
					<p className="text-sm text-amber-700 dark:text-amber-400">
						<strong>Important:</strong> You must verify your email before you
						can access the dashboard.
					</p>
				</div>

				<p className="text-sm text-muted-foreground mb-8">
					Please check your inbox and click the verification link to activate
					your account. Don&apos;t forget to check your spam folder.
				</p>

				<div className="space-y-3">
					<Link href="/resend-verification" className="block">
						<Button variant="outline" className="w-full">
							<Mail className="w-4 h-4 mr-2" />
							Resend verification email
						</Button>
					</Link>
					<Link href="/login" className="block">
						<Button variant="outline" className="w-full text-muted-foreground">
							Back to Login
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<AuthCard
			title="Create an account"
			description="Get started with TurboStack today"
			footer={
				<p className="text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-primary hover:underline font-medium"
					>
						Sign in
					</Link>
				</p>
			}
		>
			{error && (
				<div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Full Name"
					type="text"
					placeholder="John Doe"
					error={errors.name?.message}
					{...register("name")}
				/>

				<Input
					label="Email"
					type="email"
					placeholder="you@example.com"
					error={errors.email?.message}
					{...register("email")}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="••••••••"
					error={errors.password?.message}
					{...register("password")}
				/>

				<Input
					label="Confirm Password"
					type="password"
					placeholder="••••••••"
					error={errors.confirmPassword?.message}
					{...register("confirmPassword")}
				/>

				<div className="space-y-2">
					<div className="flex items-start gap-2">
						<input
							type="checkbox"
							id="acceptTerms"
							className="w-4 h-4 mt-1 rounded border-input accent-primary"
							{...register("acceptTerms")}
						/>
						<label
							htmlFor="acceptTerms"
							className="text-sm text-muted-foreground"
						>
							I agree to the{" "}
							<Link href="#" className="text-primary hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="#" className="text-primary hover:underline">
								Privacy Policy
							</Link>
						</label>
					</div>
					{errors.acceptTerms && (
						<p className="text-sm text-destructive">
							{errors.acceptTerms.message}
						</p>
					)}
				</div>

				<Button type="submit" loading={isLoading}>
					Create Account
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

export function RegisterFormFallback() {
	return (
		<AuthCard
			title="Create an account"
			description="Get started with TurboStack today"
		>
			<div className="animate-pulse space-y-4">
				<div className="h-10 bg-muted rounded" />
				<div className="h-10 bg-muted rounded" />
				<div className="h-10 bg-muted rounded" />
				<div className="h-10 bg-muted rounded" />
				<div className="h-10 bg-muted rounded" />
			</div>
		</AuthCard>
	);
}
