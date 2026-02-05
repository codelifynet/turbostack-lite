"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Iconify } from "@/components/iconify";
import homeIcon from "@iconify-icons/lucide/home";
import arrowLeftIcon from "@iconify-icons/lucide/arrow-left";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-2">
            The page you are looking for does not exist or may have been moved.
          </p>
          <p className="text-sm text-muted-foreground">
            Check the URL or return to the home page.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Iconify icon={homeIcon} className="w-5 h-5" />
            Return to Home
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-accent transition-colors"
          >
            <Iconify icon={arrowLeftIcon} className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Pages that might help:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Home
            </Link>
            <Link
              href="/contact"
              className="text-sm text-primary hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/legal/privacy"
              className="text-sm text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="text-sm text-primary hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
