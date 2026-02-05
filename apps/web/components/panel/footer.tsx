"use client";
import { Github, Twitter, Linkedin } from "lucide-react";
import { version } from "@/package.json";

export function PanelFooter() {
  return (
    <footer className="w-full border-t border-border bg-linear-to-b from-background to-background/95 backdrop-blur-sm mt-auto">
      <div className="w-full px-4 md:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Left: Copyright */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TurboStack. All rights reserved.</p>
          </div>

          {/* Center: Version Info */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              v{version}
            </span>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/codelifynet/turbostack-lite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all p-2 rounded-lg hover:bg-muted hover:scale-110"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/codelifynet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all p-2 rounded-lg hover:bg-muted hover:scale-110"
              aria-label="Twitter"
              title="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/company/codelify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all p-2 rounded-lg hover:bg-muted hover:scale-110"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
