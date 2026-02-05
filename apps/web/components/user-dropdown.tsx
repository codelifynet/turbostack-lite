"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Loader2,
  Shield,
  Crown,
  ChevronRight,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/shadcn-ui/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/shadcn-ui/ui/avatar";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { userMenuItems } from "@/lib/user-menu-items";

interface UserDropdownProps {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    image?: string | null;
  };
}

// Role badge configurations
const roleBadgeConfig: Record<
  string,
  {
    label: string;
    icon: typeof Shield;
    className: string;
    bgClassName: string;
  }
> = {
  ADMIN: {
    label: "Admin",
    icon: Crown,
    className: "text-amber-600 dark:text-amber-400",
    bgClassName:
      "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
  },
  MODERATOR: {
    label: "Moderator",
    icon: Shield,
    className: "text-blue-600 dark:text-blue-400",
    bgClassName:
      "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
  },
  USER: {
    label: "User",
    icon: User,
    className: "text-gray-600 dark:text-gray-400",
    bgClassName:
      "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  },
};

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() || "U";

  const roleConfig = roleBadgeConfig[user.role] || roleBadgeConfig.USER;
  const RoleIcon = roleConfig?.icon || Shield;

  const handleLogout = async () => {
    setIsPending(true);

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
            toast.success("Logged out successfully");
            router.push("/");
            router.refresh();
          },
          onError: (error) => {
            console.error("Logout error:", error);
            toast.error("Logout failed");
            setIsPending(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
      setIsPending(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center gap-2 rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
          <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-white dark:ring-zinc-800 shadow-sm object-cover">
            {user.image && (
              <AvatarImage src={user.image} alt={user.name || user.email} />
            )}
            <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 p-0 overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl"
        align="end"
        forceMount
        sideOffset={8}
      >
        {/* User Header Section */}
        <div className="p-4 bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-zinc-800/50 dark:to-zinc-900 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-zinc-700 shadow-md object-cover">
              {user.image && (
                <AvatarImage src={user.image} alt={user.name || user.email} />
              )}
              <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-base font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user.name || "User"}
                </p>
                {/* Role Badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border",
                    roleConfig?.bgClassName,
                    roleConfig?.className,
                  )}
                >
                  <RoleIcon className="h-2.5 w-2.5" />
                  {roleConfig?.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {user.email}
              </p>
              {/* Status indicator */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-2">
          {userMenuItems.map((group, groupIndex) => (
            <div key={group.group}>
              {groupIndex > 0 && (
                <DropdownMenuSeparator className="my-1.5 bg-gray-200 dark:bg-zinc-800" />
              )}
              <DropdownMenuGroup>
                {group.items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="p-0">
                    <Link
                      href={item.href}
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors">
                          <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          ))}
        </div>

        {/* Logout Section */}
        <div className="p-2 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
          <button
            onClick={handleLogout}
            disabled={isPending}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30">
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isPending ? "Logging out..." : "Log out"}
              </span>
            </div>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
