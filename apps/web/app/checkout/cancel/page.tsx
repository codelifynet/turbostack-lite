"use client";

import Link from "next/link";
import { Suspense } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-background via-muted/20 to-background">
      <Suspense fallback={<LoadingState />}>
        <CancelContent />
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
          Please wait while we process your request
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function CancelContent() {
  return (
    <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-2">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-red-500 dark:from-orange-500 dark:to-red-600 shadow-lg">
          <XCircle className="h-12 w-12 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
          Payment Cancelled
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Your payment was cancelled. No charges have been made to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-linear-to-br from-muted/50 to-muted/30 p-5 space-y-3 border border-border/50">
          <h3 className="font-semibold text-lg">What happened?</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>You cancelled the payment process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>No subscription was created</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>Your account remains unchanged</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>You can try again anytime</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Need help?</strong> If you experienced any issues during
            checkout, please contact our support team. We're here to help!
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          asChild
          className="w-full gradient-bg text-white hover:opacity-90"
        >
          <Link href="/#pricing">Try Again</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/" className="flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
