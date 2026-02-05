"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", loading, disabled, children, ...props },
    ref,
  ) => {
    const baseStyles =
      "w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "gradient-bg text-white hover:opacity-90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border-2 border-border bg-transparent hover:bg-muted",
    };

    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
