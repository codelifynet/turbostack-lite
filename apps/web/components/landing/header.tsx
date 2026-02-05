"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Iconify } from "@/components/iconify";
import menuIcon from "@iconify-icons/lucide/menu";
import xIcon from "@iconify-icons/lucide/x";
import { UserDropdown } from "@/components/user-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from "@/lib/auth-client";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image?: string | null;
}

interface HeaderProps {
  user?: User | null;
}

export function Header({ user: initialUser }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Use session from client if available, otherwise use prop
  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: (session.user as any).role || "USER",
        image: session.user.image,
      }
    : initialUser;

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "https://github.com/turbostack", label: "GitHub" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="mx-auto max-w-7xl px-6 py-3  md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="TurboStack Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">
                TurboStack
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <UserDropdown user={user} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium px-4 py-2 rounded-full gradient-bg text-white hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <Iconify icon={xIcon} className="w-6 h-6" />
              ) : (
                <Iconify icon={menuIcon} className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <hr className="border-border" />
                {user ? (
                  <div className="flex items-center gap-3 py-2">
                    <UserDropdown user={user} />
                    <span className="text-sm text-muted-foreground">
                      {user.name || user.email}
                    </span>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="text-center font-medium px-4 py-2 rounded-full gradient-bg text-white"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
