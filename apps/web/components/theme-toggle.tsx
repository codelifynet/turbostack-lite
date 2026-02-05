"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = React.useCallback(async () => {
    const newTheme = isDark ? "light" : "dark";

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    if (!buttonRef.current) {
      setTheme(newTheme);
      return;
    }

    try {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme);
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch {
      // Fallback if animation fails
      setTheme(newTheme);
    }
  }, [isDark, setTheme]);

  const buttonClasses = cn(
    "relative h-9 w-9 flex items-center justify-center rounded-xl",
    "bg-gray-100 dark:bg-zinc-800",
    "hover:bg-gray-200 dark:hover:bg-zinc-700",
    "border border-gray-200 dark:border-zinc-700",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
    className,
  );

  if (!mounted) {
    return (
      <button className={buttonClasses}>
        <Sun className="h-[18px] w-[18px] text-gray-600 dark:text-gray-400" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={buttonClasses}>
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-amber-500" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-slate-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
