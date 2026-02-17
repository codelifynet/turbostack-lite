"use client";

import { useEffect, useRef } from "react";
import { userService } from "@/services/user.service";
import { useColorSettings } from "@/lib/color-settings-context";

/**
 * Client component that loads and applies user color settings from API
 * This runs on the client side to apply CSS variables dynamically
 * Uses Context API for state management with localStorage persistence
 */
export function ColorSettingsLoader() {
  const { updateSettings, isLoaded } = useColorSettings();
  const hasLoadedFromApi = useRef(false);

  useEffect(() => {
    // Wait for context to load from localStorage first
    if (!isLoaded) return;

    // Only load from API once per session
    if (hasLoadedFromApi.current) return;

    const loadAndApplyColors = async () => {
      try {
        // Load color settings from API - session is handled via cookies
        const response = await userService.getUserSettings();

        if (response.success && response.data) {
          const settings = response.data;

          // Only update if we have actual color values
          if (settings.primaryColor || settings.secondaryColor) {
            // Update context state (which will also save to localStorage and apply CSS)
            updateSettings({
              primaryColor: settings.primaryColor || "",
              primaryForeground: settings.primaryForeground || "",
              secondaryColor: settings.secondaryColor || "",
              secondaryForeground: settings.secondaryForeground || "",
            });

            console.debug("Color settings loaded from API:", {
              primary: settings.primaryColor,
              secondary: settings.secondaryColor,
            });
          }

          hasLoadedFromApi.current = true;
        }
      } catch (error) {
        // Silently fail - user might not be logged in or settings might not exist
        // Settings will be loaded from localStorage by the context provider
        console.debug("Could not load color settings from API:", error);
      }
    };

    loadAndApplyColors();
  }, [isLoaded, updateSettings]);

  return null;
}
