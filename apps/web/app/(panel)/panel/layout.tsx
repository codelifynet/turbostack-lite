"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, Header } from "@/components/panel";
import { PanelFooter } from "@/components/panel/footer";
import { useSession } from "@/lib/auth-client";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        image: session.user.image,
      }
    : null;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full z-40">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      <Header
        sidebarCollapsed={sidebarCollapsed}
        user={user}
        isPending={isPending}
      />

      <div
        className={cn(
          "flex-1 flex flex-col pt-16 transition-all duration-300",
          sidebarCollapsed ? "md:pl-16" : "md:pl-64",
        )}
      >
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
        <PanelFooter />
      </div>
    </div>
  );
}
