"use client";

import { useColorSettings } from "@/lib/color-settings-context";
import { useState } from "react";

/**
 * Example Color Settings Form Component
 * Use this in your settings page to allow users to customize colors
 */
export function ColorSettingsForm() {
  const { settings, updateSettings, resetSettings } = useColorSettings();
  const [localColors, setLocalColors] = useState(settings);

  const handleSave = () => {
    updateSettings(localColors);
  };

  const handleReset = () => {
    resetSettings();
    setLocalColors({
      primaryColor: "",
      primaryForeground: "",
      secondaryColor: "",
      secondaryForeground: "",
    });
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold">Theme Colors</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="primaryColor" className="text-sm font-medium">
            Primary Color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="primaryColor"
              type="color"
              value={localColors.primaryColor || "#000000"}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  primaryColor: e.target.value,
                }))
              }
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={localColors.primaryColor}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  primaryColor: e.target.value,
                }))
              }
              placeholder="#hsl(...)"
              className="flex-1 px-3 py-2 rounded-md border bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="primaryFg" className="text-sm font-medium">
            Primary Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              id="primaryFg"
              type="color"
              value={localColors.primaryForeground || "#ffffff"}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  primaryForeground: e.target.value,
                }))
              }
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={localColors.primaryForeground}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  primaryForeground: e.target.value,
                }))
              }
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 rounded-md border bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="secondaryColor" className="text-sm font-medium">
            Secondary Color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="secondaryColor"
              type="color"
              value={localColors.secondaryColor || "#000000"}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  secondaryColor: e.target.value,
                }))
              }
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={localColors.secondaryColor}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  secondaryColor: e.target.value,
                }))
              }
              placeholder="#hsl(...)"
              className="flex-1 px-3 py-2 rounded-md border bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="secondaryFg" className="text-sm font-medium">
            Secondary Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              id="secondaryFg"
              type="color"
              value={localColors.secondaryForeground || "#ffffff"}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  secondaryForeground: e.target.value,
                }))
              }
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={localColors.secondaryForeground}
              onChange={(e) =>
                setLocalColors((prev) => ({
                  ...prev,
                  secondaryForeground: e.target.value,
                }))
              }
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 rounded-md border bg-background"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border rounded-md hover:bg-secondary transition-colors"
        >
          Reset to Default
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Colors are automatically saved to localStorage and applied instantly
        across the app.
      </p>
    </div>
  );
}
