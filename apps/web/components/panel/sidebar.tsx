"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Loader2,
} from "lucide-react";
import { ScrollArea } from "@repo/shadcn-ui/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/shadcn-ui/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/shadcn-ui/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/shadcn-ui/ui/avatar";
import Image from "next/image";
import { Skeleton } from "@repo/shadcn-ui/ui/skeleton";

import { useSession, signOut } from "@/lib/auth-client";
import { menuItems, type MenuItem } from "@/lib/menu-items";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface SidebarSkeletonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function SidebarSkeleton({ isCollapsed, onToggle }: SidebarSkeletonProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
        "bg-white dark:bg-zinc-900",
        "border-r border-gray-200 dark:border-zinc-800",
        isCollapsed ? "w-18" : "w-64",
      )}
    >
      {/* Logo Section Skeleton */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-gray-200 dark:border-zinc-800",
          isCollapsed ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-lg",
            "bg-gray-100 dark:bg-zinc-800",
            "hover:bg-gray-200 dark:hover:bg-zinc-700",
            "border border-gray-200 dark:border-zinc-700",
            "transition-all duration-200",
            "text-gray-500 dark:text-gray-400",
            isCollapsed && "mx-auto",
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Skeleton */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className={cn("py-4", isCollapsed ? "px-2" : "px-3")}>
            {/* Main Section Skeleton */}
            {!isCollapsed && (
              <div className="flex items-center gap-2 px-3 mb-2">
                <Skeleton className="h-3 w-12" />
                <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
              </div>
            )}
            {isCollapsed && (
              <div className="h-px bg-gray-200 dark:bg-zinc-800 my-3 mx-2" />
            )}

            {/* Menu Items Skeleton */}
            <nav className="space-y-1">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isCollapsed && "justify-center px-0 w-12 h-12 mx-auto",
                  )}
                >
                  <Skeleton
                    className={cn(
                      "flex items-center justify-center shrink-0",
                      isCollapsed ? "h-5 w-5" : "h-4.5 w-4.5",
                    )}
                  />
                  {!isCollapsed && <Skeleton className="flex-1 h-4 w-20" />}
                </div>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* User Section Skeleton */}
      <div
        className={cn(
          "border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
          isCollapsed ? "p-2" : "p-3",
        )}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="flex-1 h-9 rounded-lg" />
              <Skeleton className="flex-1 h-9 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Define userRole before conditional return
  const userRole =
    ((session?.user as { role?: string } | undefined)?.role as
      | "USER"
      | "ADMIN"
      | "SUPERADMIN") || "USER";

  const user = session?.user as
    | {
        id?: string;
        email?: string;
        name?: string | null;
        role?: string;
        image?: string | null;
      }
    | undefined;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U";

  // Track open submenus - MOVED UP BEFORE CONDITIONAL RETURN
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(() => {
    // Auto-open submenu if current path matches
    const initialOpen: string[] = [];
    menuItems.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems) {
          const isSubActive = item.subItems.some((sub) =>
            pathname.startsWith(sub.href),
          );
          if (isSubActive) {
            initialOpen.push(item.label);
          }
        }
      });
    });
    return initialOpen;
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Clear all auth-related localStorage keys
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage"); // zustand persist key
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }

      // Call better-auth signOut
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out");
            router.push("/");
            router.refresh();
          },
          onError: (error) => {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
            setIsLoggingOut(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
      setIsLoggingOut(false);
    }
  };

  // Show skeleton while loading session
  if (isPending) {
    return <SidebarSkeleton isCollapsed={isCollapsed} onToggle={onToggle} />;
  }

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  // Filter sections and items based on role
  // SUPERADMIN has access to all items (including ADMIN items)
  const filteredMenuItems = menuItems
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !item.roles ||
          item.roles.includes(userRole) ||
          (userRole === "SUPERADMIN" && item.roles.includes("ADMIN")),
      ),
    }))
    .filter((section) => section.items.length > 0);

  const renderMenuItem = (item: MenuItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = item.href ? pathname === item.href : false;
    const isSubActive =
      hasSubItems &&
      item.subItems!.some((sub) => pathname.startsWith(sub.href));
    const isOpen = openSubmenus.includes(item.label);
    const Icon = item.icon;

    // Item with subitems
    if (hasSubItems) {
      if (isCollapsed) {
        // Collapsed view - show tooltip with subitems
        return (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <button
                onClick={() => toggleSubmenu(item.label)}
                className={cn(
                  "group relative flex items-center justify-center rounded-xl w-12 h-12 mx-auto text-sm font-medium transition-all duration-200",
                  isSubActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      !isSubActive && "group-hover:scale-110",
                    )}
                  />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="p-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-xl rounded-xl overflow-hidden"
              sideOffset={12}
            >
              <div className="px-3 py-2 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "flex items-center justify-center min-w-4.5 h-4 px-1 rounded text-[9px] font-semibold",
                        item.badge === "New"
                          ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                          : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="py-1">
                {item.subItems!.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubItemActive = pathname === subItem.href;
                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                        isSubItemActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800",
                      )}
                    >
                      <SubIcon className="h-4 w-4" />
                      {subItem.label}
                    </Link>
                  );
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      }

      // Expanded view with collapsible submenu
      return (
        <Collapsible
          key={item.label}
          open={isOpen}
          onOpenChange={() => toggleSubmenu(item.label)}
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 w-full text-sm font-medium transition-all duration-200",
                isSubActive
                  ? "bg-primary/10 dark:bg-primary/20 text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white",
              )}
            >
              {/* Active Indicator */}
              {isSubActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}

              {/* Icon */}
              <div className="flex items-center justify-center w-5 h-5 shrink-0">
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 transition-transform duration-200",
                    !isSubActive && "group-hover:scale-110",
                  )}
                />
              </div>

              {/* Label & Badge */}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md text-[10px] font-semibold",
                    item.badge === "New"
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300",
                  )}
                >
                  {item.badge}
                </span>
              )}

              {/* Chevron */}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-zinc-700 mt-1 space-y-0.5">
              {item.subItems!.map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubItemActive = pathname === subItem.href;
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                      isSubItemActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white",
                    )}
                  >
                    <SubIcon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        !isSubItemActive && "group-hover:scale-110",
                      )}
                    />
                    <span>{subItem.label}</span>
                  </Link>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    // Regular item without subitems
    const linkContent = (
      <Link
        href={item.href!}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary text-white shadow-lg shadow-primary/25"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white",
          isCollapsed && "justify-center px-0 w-12 h-12 mx-auto",
        )}
      >
        {/* Active Indicator */}
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
        )}

        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center shrink-0",
            isCollapsed ? "w-6 h-6" : "w-5 h-5",
          )}
        >
          <Icon
            className={cn(
              "transition-transform duration-200",
              isCollapsed ? "h-5 w-5" : "h-4.5 w-4.5",
              !isActive && "group-hover:scale-110",
            )}
          />
        </div>

        {/* Label & Badge */}
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md text-[10px] font-semibold",
                  isActive
                    ? "bg-white/20 text-white"
                    : item.badge === "New"
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300",
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.href}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="flex items-center gap-2 bg-gray-900 dark:bg-zinc-800 text-white border-0 shadow-xl"
            sideOffset={12}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "flex items-center justify-center min-w-4.5 h-4 px-1 rounded text-[9px] font-semibold",
                  item.badge === "New"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/20 text-white",
                )}
              >
                {item.badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.href}>{linkContent}</div>;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
          "bg-white dark:bg-zinc-900",
          "border-r border-gray-200 dark:border-zinc-800",
          isCollapsed ? "w-18" : "w-64",
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-gray-200 dark:border-zinc-800",
            isCollapsed ? "justify-center px-2" : "justify-between px-4",
          )}
        >
          <Link
            href="/panel"
            className={cn(
              "flex items-center gap-3 group transition-opacity duration-200",
              isCollapsed ? "opacity-0 pointer-events-none w-0 h-0 overflow-hidden" : "opacity-100"
            )}
          >
            <Image src="/logo.svg" alt="TurboStack Logo" width={32} height={32} />
            <span className="font-bold text-base text-gray-900 dark:text-white">
              TurboStack
            </span>
          </Link>
          <button
            onClick={onToggle}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-lg",
              "bg-gray-100 dark:bg-zinc-800",
              "hover:bg-gray-200 dark:hover:bg-zinc-700",
              "border border-gray-200 dark:border-zinc-700",
              "transition-all duration-200",
              "text-gray-500 dark:text-gray-400",
              isCollapsed && "mx-auto",
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className={cn("py-4", isCollapsed ? "px-2" : "px-3")}>
              {filteredMenuItems.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={cn(sectionIndex > 0 && "mt-6")}
                >
                  {/* Section Title */}
                  {!isCollapsed && (
                    <div className="flex items-center gap-2 px-3 mb-2">
                      <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {section.title}
                      </span>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
                    </div>
                  )}
                  {isCollapsed && sectionIndex > 0 && (
                    <div className="h-px bg-gray-200 dark:bg-zinc-800 my-3 mx-2" />
                  )}

                  {/* Menu Items */}
                  <nav className="space-y-1">
                    {section.items.map((item) => renderMenuItem(item))}
                  </nav>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* User Section */}
        {user && (
          <div
            className={cn(
              "border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
              isCollapsed ? "p-2" : "p-3",
            )}
          >
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-zinc-700 shadow-sm cursor-pointer">
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.name || user.email || "User"}
                          />
                        )}
                        <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-sm font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-900 dark:bg-zinc-800 text-white border-0 shadow-xl"
                    sideOffset={12}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">
                        {user.name || "User"}
                      </span>
                      <span className="text-xs text-gray-300">
                        {user.email}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                        "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      {isLoggingOut ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <LogOut className="h-5 w-5" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-900 dark:bg-zinc-800 text-white border-0 shadow-xl"
                    sideOffset={12}
                  >
                    Log Out
                  </TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-zinc-700 shadow-sm">
                      {user.image && (
                        <AvatarImage
                          src={user.image}
                          alt={user.name || user.email || "User"}
                        />
                      )}
                      <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link
                    href="/panel/settings"
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === "/panel/settings"
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white",
                    )}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    )}
                  >
                    {isLoggingOut ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
