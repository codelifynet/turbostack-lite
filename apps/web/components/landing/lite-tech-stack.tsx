"use client";

import { Iconify } from "@/components/iconify";

const techStack = [
  { name: "Next.js 15", icon: "logos:nextjs-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Elysia.js", icon: "skill-icons:elysia-light" },
  { name: "Prisma", icon: "material-icon-theme:prisma" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { name: "shadcn/ui", icon: "vscode-icons:file-type-shadcn" },
];

export function LiteTechStack() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built with modern{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              technologies
            </span>
          </h2>
          <p className="text-muted-foreground">
            Industry-standard tools that scale with your project
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
            >
              <Iconify
                icon={tech.icon}
                className="w-10 h-10 md:w-12 md:h-12 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
