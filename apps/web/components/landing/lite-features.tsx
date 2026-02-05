"use client";

import { Iconify } from "@/components/iconify";
import lockIcon from "@iconify-icons/lucide/lock";
import mailIcon from "@iconify-icons/lucide/mail";
import codeIcon from "@iconify-icons/lucide/code";
import zapIcon from "@iconify-icons/lucide/zap";

const features = [
  {
    icon: lockIcon,
    title: "Authentication",
    description:
      "Secure user authentication with email/password and OAuth providers. Built-in session management and protected routes.",
  },
  {
    icon: mailIcon,
    title: "Email Ready",
    description:
      "Integrated Resend for transactional emails. Send verification emails, password resets, and notifications out of the box.",
  },
  {
    icon: codeIcon,
    title: "Type-Safe API",
    description:
      "End-to-end type safety with TypeScript. Shared validation schemas ensure consistency between frontend and backend.",
  },
  {
    icon: zapIcon,
    title: "Modern Stack",
    description:
      "Built with Next.js, Elysia.js, Prisma, and Tailwind CSS. Everything you need to build modern web applications.",
  },
];

export function LiteFeatures() {
  return (
    <section id="features" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              get started
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focus on building your product, not setting up infrastructure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Iconify
                    icon={feature.icon}
                    className="w-6 h-6 text-primary"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
