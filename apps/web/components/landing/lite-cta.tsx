"use client";

import Link from "next/link";
import { Iconify } from "@/components/iconify";
import arrowRightIcon from "@iconify-icons/lucide/arrow-right";

export function LiteCTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-linear-to-br from-primary/10 via-purple-500/5 to-pink-500/5">
          {/* Content */}
          <div className="relative py-16 px-6 md:px-12 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to start building?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get TurboStack Lite for free and start building your next project
              today.
            </p>

            {/* CTA Button */}
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
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
          </div>
        </div>
      </div>
    </section>
  );
}
