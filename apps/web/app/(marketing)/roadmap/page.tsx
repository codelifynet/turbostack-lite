"use client";

import { Iconify } from "@/components/iconify";
import { Button } from "@repo/shadcn-ui/button";
import Link from "next/link";
import arrowLeftIcon from "@iconify-icons/lucide/arrow-left";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/#roadmap">
            <Button variant="ghost" className="mb-4 gap-2">
              <Iconify icon={arrowLeftIcon} className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Building in Public
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Development <span className="gradient-text">Roadmap</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              TurboStack is actively developed. You can follow what's planned,
              what's in progress, and what's already shipped — transparently, in
              real time.
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-card rounded-lg border shadow-lg p-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Roadmap Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            We're working on an interactive roadmap to show you what's coming
            next.
          </p>
          <Link href="/">
            <Button>View Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
