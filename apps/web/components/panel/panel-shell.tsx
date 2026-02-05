"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  image?: string | null;
}

interface PanelShellProps {
  children: React.ReactNode;
  user?: User | null;
  isPending?: boolean;
}

export function PanelShell({
  children,
  user,
  isPending = false,
}: PanelShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Header */}
      <Header
        sidebarCollapsed={sidebarCollapsed}
        user={user}
        isPending={isPending}
      />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pt-16 transition-all duration-300",
          sidebarCollapsed ? "md:pl-16" : "md:pl-64",
        )}
      >
        <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
