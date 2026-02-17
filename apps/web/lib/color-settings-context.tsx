"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface ColorSettings {
  primaryColor: string;
  primaryForeground: string;
  secondaryColor: string;
  secondaryForeground: string;
}

interface ColorSettingsContextType {
  settings: ColorSettings;
  updateSettings: (settings: Partial<ColorSettings>) => void;
  resetSettings: () => void;
  isLoaded: boolean;
}

const defaultSettings: ColorSettings = {
  primaryColor: "",
  primaryForeground: "",
  secondaryColor: "",
  secondaryForeground: "",
};

const ColorSettingsContext = createContext<
  ColorSettingsContextType | undefined
>(undefined);

const STORAGE_KEY = "color-settings";

export function ColorSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ColorSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.debug("Could not load color settings from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Apply settings to CSS variables whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;

    console.debug("[ColorSettings] Applying colors:", settings);

    if (settings.primaryColor) {
      root.style.setProperty("--color-primary", settings.primaryColor);
      console.debug(
        "[ColorSettings] Set --color-primary:",
        settings.primaryColor,
      );
    }
    if (settings.primaryForeground) {
      root.style.setProperty(
        "--color-primary-foreground",
        settings.primaryForeground,
      );
    }
    if (settings.secondaryColor) {
      root.style.setProperty("--color-secondary", settings.secondaryColor);
      console.debug(
        "[ColorSettings] Set --color-secondary:",
        settings.secondaryColor,
      );
    }
    if (settings.secondaryForeground) {
      root.style.setProperty(
        "--color-secondary-foreground",
        settings.secondaryForeground,
      );
    }

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.debug("Could not save color settings to localStorage:", error);
    }
  }, [settings, isLoaded]);

  const updateSettings = useCallback((newSettings: Partial<ColorSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);

    // Reset CSS variables
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-foreground");
    root.style.removeProperty("--color-secondary");
    root.style.removeProperty("--color-secondary-foreground");
  }, []);

  return (
    <ColorSettingsContext.Provider
      value={{ settings, updateSettings, resetSettings, isLoaded }}
    >
      {children}
    </ColorSettingsContext.Provider>
  );
}

export function useColorSettings() {
  const context = useContext(ColorSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useColorSettings must be used within a ColorSettingsProvider",
    );
  }
  return context;
}
