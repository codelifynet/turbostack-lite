import { type ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 shadow-xl shadow-primary/5">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
      {footer && (
        <div className="mt-6 pt-6 border-t border-border text-center">
          {footer}
        </div>
      )}
    </div>
  );
}
