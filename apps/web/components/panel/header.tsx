"use client";

import { MobileSidebar } from "@/components/panel/mobile-sidebar";
import { NotificationsDropdown } from "@/components/panel/notifications-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { UserDropdown } from "@/components/user-dropdown";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  image?: string | null;
}

interface HeaderProps {
  sidebarCollapsed: boolean;
  user?: User | null;
  isPending?: boolean;
}

export function Header({
  sidebarCollapsed,
  user,
  isPending = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 transition-all duration-300",
        sidebarCollapsed ? "left-0 md:left-16" : "left-0 md:left-64",
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <MobileSidebar />
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <LanguageSelector />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationsDropdown />

        {/* User Menu */}
        {!isPending && user ? <UserDropdown user={user} /> : null}
      </div>
    </header>
  );
}
