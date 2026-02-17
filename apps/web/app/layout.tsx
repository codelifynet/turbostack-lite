import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@repo/shadcn-ui/sonner";

import { NotificationProvider } from "@/components/notification-provider";
import { ColorSettingsProvider } from "@/lib/color-settings-context";
import { ColorSettingsLoader } from "@/components/color-settings-loader";

// Optimize font loading for faster builds
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "TurboStack",
  description:
    "Modern fullstack monorepo starter with Next.js, Elysia.js, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorSettingsProvider>
            <ColorSettingsLoader />
            <NotificationProvider>{children}</NotificationProvider>
            <Toaster />
          </ColorSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
