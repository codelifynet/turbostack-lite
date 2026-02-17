"use client";

import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { FireworksBackground } from "@/components/fireworks-background";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fireworks Background */}
      <FireworksBackground
        population={2}
        color={["#8b5cf6", "#a78bfa", "#c084fc", "#d946ef", "#f472b6"]}
        fireworkSpeed={{ min: 5, max: 10 }}
        particleSpeed={{ min: 3, max: 8 }}
        className="pointer-events-none"
      />

      <Suspense fallback={<LoadingState />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

function LoadingState() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Processing...</CardTitle>
        <CardDescription>
          Please wait while we confirm your subscription
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function SuccessContent() {
  return (
    <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-2">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-lg animate-pulse">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          Payment Successful! 🎉
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Thank you for subscribing to TurboStack Pro! Your account has been
          upgraded.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-linear-to-br from-muted/50 to-muted/30 p-5 space-y-3 border border-border/50">
          <h3 className="font-semibold text-lg">What&apos;s Next?</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Access your AI rules and guidelines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Download the TurboStack starter template</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                You&apos;ll be added to the GitHub repository within 6 hours
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Check your email for getting started guide</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          asChild
          className="flex-1 gradient-bg text-white hover:opacity-90"
        >
          <Link href="/panel">Go to Dashboard</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/docs">View Docs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
