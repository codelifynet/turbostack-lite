"use client";

import { useEffect } from "react";
import { userService } from "@/services/user.service";

/**
 * Client component that loads and applies user color settings
 * This runs on the client side to apply CSS variables dynamically
 */
export function ColorSettingsLoader() {
  useEffect(() => {
    const loadAndApplyColors = async () => {
      try {
        // Load color settings directly - session is handled via cookies
        const response = await userService.getUserSettings();
        if (response.success && response.data) {
          const root = document.documentElement;
          const settings = response.data;

          if (settings.primaryColor) {
            root.style.setProperty("--color-primary", settings.primaryColor);
          }
          if (settings.primaryForeground) {
            root.style.setProperty(
              "--color-primary-foreground",
              settings.primaryForeground,
            );
          }
          if (settings.secondaryColor) {
            root.style.setProperty(
              "--color-secondary",
              settings.secondaryColor,
            );
          }
          if (settings.secondaryForeground) {
            root.style.setProperty(
              "--color-secondary-foreground",
              settings.secondaryForeground,
            );
          }
        }
      } catch (error) {
        // Silently fail - user might not be logged in or settings might not exist
        console.debug("Could not load color settings:", error);
      }
    };

    loadAndApplyColors();
  }, []);

  return null;
}
