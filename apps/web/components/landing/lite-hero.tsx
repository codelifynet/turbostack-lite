"use client";

import Link from "next/link";
import { Iconify } from "@/components/iconify";
import arrowRightIcon from "@iconify-icons/lucide/arrow-right";
import checkIcon from "@iconify-icons/lucide/check";
import { DottedGlowBackground } from "@/components/dotted-glow-background";

const features = [
  "Authentication Ready",
  "Email with Resend",
  "Type-safe API",
  "Modern Stack",
];

export function LiteHero() {
  return (
    <section className="relative flex items-center justify-center overflow-x-hidden w-full py-20 sm:py-24 md:py-32">
      {/* Subtle Background */}
      <DottedGlowBackground
        className="absolute inset-0 -z-10"
        gap={30}
        radius={1}
        color="rgba(139, 92, 246, 0.15)"
        darkColor="rgba(167, 139, 250, 0.2)"
        glowColor="rgba(139, 92, 246, 0.4)"
        darkGlowColor="rgba(167, 139, 250, 0.5)"
        opacity={0.5}
        speedMin={0.2}
        speedMax={0.5}
        speedScale={0.4}
      />

      {/* Subtle Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-linear-to-r from-primary/10 via-purple-500/8 to-pink-500/8 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-linear-to-r from-blue-500/8 via-primary/10 to-violet-500/8 rounded-full blur-[60px] animate-[float_12s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center relative z-10 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Free & Open Source</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="block text-foreground mb-2">Build faster with</span>
          <span className="block bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            TurboStack Lite
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          A clean, minimal starter kit with authentication and email ready to
          go. Perfect for building your next project without the complexity.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-2xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm"
            >
              <Iconify
                icon={checkIcon}
                className="w-4 h-4 text-green-500 shrink-0"
              />
              <span className="text-sm font-medium text-foreground/80">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
          >
            <div className="absolute inset-0 gradient-bg opacity-100" />
            <span className="relative text-white flex items-center gap-2">
              Get Started Free
            </span>
            <Iconify
              icon={arrowRightIcon}
              className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="https://github.com/turbostack"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-card/80 border-2 border-border hover:border-primary/50 font-semibold text-base transition-all duration-300 hover:bg-card backdrop-blur-sm"
          >
            <Iconify
              icon="simple-icons:github"
              className="w-5 h-5 group-hover:rotate-12 transition-transform"
            />
            <span>View on GitHub</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
