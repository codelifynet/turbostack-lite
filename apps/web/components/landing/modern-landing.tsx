"use client";

import Link from "next/link";
import Image from "next/image";
import { Iconify } from "@/components/iconify";
import { DottedGlowBackground } from "@/components/dotted-glow-background";
import { CardSpotlight } from "@/components/card-spotlight";
import { Meteors } from "@/components/meteors";
import { Ripple } from "@/components/ripple";
import { AuroraText } from "@/components/aurora-text";
import { Particles } from "@/components/particles";
import arrowRightIcon from "@iconify-icons/lucide/arrow-right";
import checkIcon from "@iconify-icons/lucide/check";
import lockIcon from "@iconify-icons/lucide/lock";
import mailIcon from "@iconify-icons/lucide/mail";
import codeIcon from "@iconify-icons/lucide/code";
import zapIcon from "@iconify-icons/lucide/zap";
import botIcon from "@iconify-icons/lucide/bot";
import creditCardIcon from "@iconify-icons/lucide/credit-card";
import shieldIcon from "@iconify-icons/lucide/shield";
import databaseIcon from "@iconify-icons/lucide/database";
import rocketIcon from "@iconify-icons/lucide/rocket";

const heroFeatures = [
  "Auth & Payments Ready",
  "AI Integration Built-in",
  "Email with Resend",
  "Type-safe API",
];

const mainFeatures = [
  {
    icon: lockIcon,
    title: "Authentication",
    description:
      "Secure user authentication with email/password and OAuth providers. Built-in session management and protected routes.",
  },
  {
    icon: creditCardIcon,
    title: "Payments",
    description:
      "Integrated payment processing with Polar.sh. Handle subscriptions, one-time payments, and webhooks seamlessly.",
  },
  {
    icon: botIcon,
    title: "AI Integration",
    description:
      "Built-in AI capabilities with OpenRouter. Ready-to-use AI endpoints and components for your applications.",
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
    icon: shieldIcon,
    title: "Security First",
    description:
      "Built with security best practices. Password hashing, secure cookies, and RBAC system included.",
  },
];

const techStack = [
  { name: "Next.js 15", icon: "logos:nextjs-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Elysia.js", icon: "skill-icons:elysia-light" },
  { name: "Prisma", icon: "material-icon-theme:prisma" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { name: "shadcn/ui", icon: "vscode-icons:file-type-shadcn" },
  { name: "Turborepo", icon: "logos:turborepo-icon" },
  { name: "Resend", icon: "simple-icons:resend" },
  { name: "OpenRouter", icon: "simple-icons:openrouter" },
];

const benefits = [
  {
    title: "Save Time",
    description:
      "Skip weeks of boilerplate setup. Start building your product immediately.",
  },
  {
    title: "Production Ready",
    description:
      "Built with best practices. Deploy with confidence knowing everything is tested.",
  },
  {
    title: "AI Friendly",
    description:
      "Designed for both humans and AI. Clear architecture that scales.",
  },
];

export function ModernLanding() {
  return (
    <main className="overflow-x-hidden w-full">
      {/* Section 1: Hero */}
      <section className="relative flex items-center justify-center overflow-x-hidden w-full pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-32">
        {/* Particles Background */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={150}
          ease={80}
          color="#8b5cf6"
          refresh
        />

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

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-linear-to-r from-primary/10 via-purple-500/8 to-pink-500/8 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-linear-to-r from-blue-500/8 via-primary/10 to-violet-500/8 rounded-full blur-[60px] animate-[float_12s_ease-in-out_infinite_reverse]" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 text-center relative z-10 w-full">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Production-Ready SaaS Starter</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="block text-foreground mb-2">
              Your SaaS starter kit
            </span>
            <AuroraText
              className="block"
              colors={["#8b5cf6", "#a855f7", "#ec4899", "#3b82f6"]}
              speed={0.8}
            >
              shouldn&apos;t break when you use AI
            </AuroraText>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            A production-ready monorepo with clear frontend, backend & AI rules.
            Humans and AI follow the same architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-3xl mx-auto">
            {heroFeatures.map((feature) => (
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              <div className="absolute inset-0 gradient-bg opacity-100" />
              <span className="relative text-white flex items-center gap-2">
                Get Started
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

      {/* Section 2: Features */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                ship faster
              </AuroraText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Focus on building your product, not setting up infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mainFeatures.map((feature, index) => (
              <CardSpotlight
                key={index}
                spotlightColor="rgba(139, 92, 246, 0.4)"
                className="group p-6 md:p-8 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                    <Iconify
                      icon={feature.icon}
                      className="w-6 h-6 text-primary transition-transform group-hover:rotate-6"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Benefits */}
      <section id="benefits" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why choose{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                TurboStack
              </AuroraText>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <CardSpotlight
                key={index}
                spotlightColor="rgba(139, 92, 246, 0.3)"
                className="text-center p-8 transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Tech Stack */}
      <section id="tech" className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built with modern{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                technologies
              </AuroraText>
            </h2>
            <p className="text-muted-foreground">
              Industry-standard tools that scale with your project
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {techStack.map((tech, index) => (
              <CardSpotlight
                key={index}
                spotlightColor="rgba(139, 92, 246, 0.25)"
                className="group flex flex-col items-center gap-3 p-6 transition-all duration-300 hover:scale-105"
              >
                <Iconify
                  icon={tech.icon}
                  className="w-10 h-10 md:w-12 md:h-12 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all group-hover:rotate-6"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {tech.name}
                </span>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Architecture */}
      <section id="architecture" className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Clean{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                Architecture
              </AuroraText>
            </h2>
            <p className="text-lg text-muted-foreground">
              Designed for scalability and maintainability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Iconify icon={codeIcon} className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-muted-foreground">
                Next.js 15 with App Router, React 19, and Tailwind CSS v4.
                Type-safe API client with shared validation schemas.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Iconify icon={databaseIcon} className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <p className="text-muted-foreground">
                Elysia.js with Bun runtime. Prisma ORM for database access.
                RESTful API with OpenAPI documentation.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Iconify icon={botIcon} className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Ready</h3>
              <p className="text-muted-foreground">
                Built-in AI integration with OpenRouter. Clear rules and
                patterns for AI-assisted development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Quick Start */}
      <section id="quick-start" className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get started in{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                5 minutes
              </AuroraText>
            </h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Clone the repository</h3>
                  <code className="block p-3 rounded-lg bg-muted text-sm mt-2">
                    git clone https://github.com/turbostack/TurboStack.git
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Install dependencies</h3>
                  <code className="block p-3 rounded-lg bg-muted text-sm mt-2">
                    bun install
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Setup environment</h3>
                  <code className="block p-3 rounded-lg bg-muted text-sm mt-2">
                    cp .env.example .env
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Start development</h3>
                  <code className="block p-3 rounded-lg bg-muted text-sm mt-2">
                    bun run dev
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Stats */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100+", label: "Hours Saved" },
              { value: "100%", label: "TypeScript" },
              { value: "0", label: "Config Files" },
              { value: "∞", label: "Possibilities" },
            ].map((stat, index) => (
              <CardSpotlight
                key={index}
                spotlightColor="rgba(139, 92, 246, 0.3)"
                className="text-center p-6 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AuroraText
                    colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                    speed={0.5}
                  >
                    {stat.value}
                  </AuroraText>
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Comparison */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why not build{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                from scratch?
              </AuroraText>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CardSpotlight
              spotlightColor="rgba(239, 68, 68, 0.2)"
              className="p-6 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-muted-foreground">
                Building from scratch
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Iconify
                    icon="lucide:x"
                    className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  />
                  <span className="text-muted-foreground">
                    Weeks of setup time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Iconify
                    icon="lucide:x"
                    className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  />
                  <span className="text-muted-foreground">
                    Security vulnerabilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Iconify
                    icon="lucide:x"
                    className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  />
                  <span className="text-muted-foreground">
                    Inconsistent patterns
                  </span>
                </li>
              </ul>
            </CardSpotlight>

            <CardSpotlight
              spotlightColor="rgba(139, 92, 246, 0.4)"
              className="p-6 border-2 border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                With TurboStack
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Iconify
                    icon={checkIcon}
                    className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Start building immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <Iconify
                    icon={checkIcon}
                    className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Production-ready security</span>
                </li>
                <li className="flex items-start gap-2">
                  <Iconify
                    icon={checkIcon}
                    className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Consistent architecture</span>
                </li>
              </ul>
            </CardSpotlight>
          </div>
        </div>
      </section>

      {/* Section 9: Testimonials / Social Proof */}
      <section id="testimonials" className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by{" "}
              <AuroraText
                colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                speed={0.7}
              >
                developers
              </AuroraText>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                stars: 5,
                quote:
                  "Finally, a starter kit that doesn't break when AI tries to help. The architecture is clear and consistent.",
                author: "Developer",
              },
              {
                stars: 5,
                quote:
                  "Saved me weeks of setup time. Everything just works out of the box. Highly recommended!",
                author: "Startup Founder",
              },
            ].map((testimonial, index) => (
              <CardSpotlight
                key={index}
                spotlightColor="rgba(139, 92, 246, 0.3)"
                className="p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Iconify
                      key={i}
                      icon="lucide:star"
                      className="w-5 h-5 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="font-semibold group-hover:text-primary transition-colors">
                  — {testimonial.author}
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <section className="py-24 px-6 bg-linear-to-br from-primary/10 via-purple-500/5 to-pink-500/5 relative overflow-hidden">
        {/* Meteors Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={30} />
        </div>

        {/* Ripple Effect */}
        <Ripple
          mainCircleSize={200}
          mainCircleOpacity={0.2}
          numCircles={6}
          className="opacity-50"
        />

        <div className="mx-auto max-w-4xl relative z-10">
          <CardSpotlight
            spotlightColor="rgba(139, 92, 246, 0.5)"
            className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-purple-500/5 to-pink-500/5"></div>

            <div className="relative py-16 px-6 md:px-12 md:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                <Iconify icon={rocketIcon} className="w-4 h-4 animate-bounce" />
                <span>Ready to Build?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Start building your{" "}
                <AuroraText
                  colors={["#8b5cf6", "#a855f7", "#ec4899"]}
                  speed={0.6}
                >
                  SaaS product
                </AuroraText>{" "}
                today
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get TurboStack and save weeks of setup time. Focus on what
                matters — building your product.
              </p>

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
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-background/80 border-2 border-border hover:border-primary/50 font-semibold text-base transition-all duration-300 hover:bg-background backdrop-blur-sm hover:scale-105"
                >
                  <Iconify
                    icon="simple-icons:github"
                    className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  />
                  <span>View on GitHub</span>
                </Link>
              </div>
            </div>
          </CardSpotlight>
        </div>
      </section>
    </main>
  );
}
