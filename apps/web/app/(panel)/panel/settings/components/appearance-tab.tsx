"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Button } from "@repo/shadcn-ui/button";
import { Input } from "@repo/shadcn-ui/input";
import { Label } from "@repo/shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/select";
import { RotateCcw } from "lucide-react";
import { userService } from "@/services";
import { hexToOklch, oklchToHex, PRESET_COLORS } from "@/lib/color-utils";
import type { ColorSettings } from "@repo/types";

export function AppearanceTab() {
  const [colorSettings, setColorSettings] = useState<ColorSettings>({
    primaryColor: null,
    primaryForeground: null,
    secondaryColor: null,
    secondaryForeground: null,
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingColors, setIsSavingColors] = useState(false);

  // Load settings on mount
  useEffect(() => {
    void loadColorSettings();
  }, []);

  const loadColorSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const response = await userService.getUserSettings();
      if (response.success && response.data) {
        setColorSettings({
          primaryColor: response.data.primaryColor ?? null,
          primaryForeground: response.data.primaryForeground ?? null,
          secondaryColor: response.data.secondaryColor ?? null,
          secondaryForeground: response.data.secondaryForeground ?? null,
        });
      } else {
        setColorSettings({
          primaryColor: null,
          primaryForeground: null,
          secondaryColor: null,
          secondaryForeground: null,
        });
      }
    } catch (error) {
      console.error("Failed to load color settings:", error);
      setColorSettings({
        primaryColor: null,
        primaryForeground: null,
        secondaryColor: null,
        secondaryForeground: null,
      });
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const handleColorChange = async (
    type: keyof ColorSettings,
    value: string | null,
  ) => {
    const newSettings = { ...colorSettings, [type]: value };
    setColorSettings(newSettings);

    // Apply immediately for preview
    const root = document.documentElement;
    if (type === "primaryColor") {
      if (value) {
        root.style.setProperty("--color-primary", value);
      } else {
        root.style.removeProperty("--color-primary");
      }
    } else if (type === "primaryForeground") {
      if (value) {
        root.style.setProperty("--color-primary-foreground", value);
      } else {
        root.style.removeProperty("--color-primary-foreground");
      }
    } else if (type === "secondaryColor") {
      if (value) {
        root.style.setProperty("--color-secondary", value);
      } else {
        root.style.removeProperty("--color-secondary");
      }
    } else if (type === "secondaryForeground") {
      if (value) {
        root.style.setProperty("--color-secondary-foreground", value);
      } else {
        root.style.removeProperty("--color-secondary-foreground");
      }
    }

    // Save to database
    setIsSavingColors(true);
    try {
      const response = await userService.updateUserSettings(newSettings);
      if (response.success) {
        toast.success("Color settings saved successfully");
      } else {
        toast.error(response.message || "Failed to save color settings");
      }
    } catch (error) {
      console.error("Failed to save color settings:", error);
      toast.error("Failed to save color settings");
    } finally {
      setIsSavingColors(false);
    }
  };

  const handlePresetColorSelect = async (
    type: "primary" | "secondary",
    oklch: string,
  ) => {
    if (type === "primary") {
      const newSettings = {
        ...colorSettings,
        primaryColor: oklch,
        primaryForeground: "oklch(0.99 0 0)",
      };
      setColorSettings(newSettings);

      // Apply immediately for preview
      const root = document.documentElement;
      root.style.setProperty("--color-primary", oklch);
      root.style.setProperty("--color-primary-foreground", "oklch(0.99 0 0)");

      // Save to database
      setIsSavingColors(true);
      try {
        const response = await userService.updateUserSettings(newSettings);
        if (response.success) {
          toast.success("Color settings saved successfully");
        } else {
          toast.error(response.message || "Failed to save color settings");
        }
      } catch (error) {
        console.error("Failed to save color settings:", error);
        toast.error("Failed to save color settings");
      } finally {
        setIsSavingColors(false);
      }
    } else {
      const newSettings = {
        ...colorSettings,
        secondaryColor: oklch,
        secondaryForeground: "oklch(0.205 0 0)",
      };
      setColorSettings(newSettings);

      // Apply immediately for preview
      const root = document.documentElement;
      root.style.setProperty("--color-secondary", oklch);
      root.style.setProperty(
        "--color-secondary-foreground",
        "oklch(0.205 0 0)",
      );

      // Save to database
      setIsSavingColors(true);
      try {
        const response = await userService.updateUserSettings(newSettings);
        if (response.success) {
          toast.success("Color settings saved successfully");
        } else {
          toast.error(response.message || "Failed to save color settings");
        }
      } catch (error) {
        console.error("Failed to save color settings:", error);
        toast.error("Failed to save color settings");
      } finally {
        setIsSavingColors(false);
      }
    }
  };

  const resetToDefault = async () => {
    const defaultSettings: ColorSettings = {
      primaryColor: null,
      primaryForeground: null,
      secondaryColor: null,
      secondaryForeground: null,
    };
    setColorSettings(defaultSettings);

    // Reset CSS variables
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-foreground");
    root.style.removeProperty("--color-secondary");
    root.style.removeProperty("--color-secondary-foreground");

    // Save to database
    setIsSavingColors(true);
    try {
      const response = await userService.updateUserSettings(defaultSettings);
      if (response.success) {
        toast.success("Color settings reset to default");
      } else {
        toast.error(response.message || "Failed to reset color settings");
      }
    } catch (error) {
      console.error("Failed to reset color settings:", error);
      toast.error("Failed to reset color settings");
    } finally {
      setIsSavingColors(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>
                Customize primary and secondary colors for your dashboard
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              disabled={isSavingColors}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Color */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Primary Color</Label>
              <p className="text-sm text-muted-foreground">
                Main brand color used throughout the dashboard
              </p>
            </div>

            {/* Preset Colors */}
            <div className="space-y-2">
              <Label className="text-sm">Preset Colors</Label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() =>
                      handlePresetColorSelect("primary", preset.oklch)
                    }
                    className="relative h-10 w-10 rounded-md border-2 border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: preset.hex }}
                    title={preset.name}
                    disabled={isSavingColors}
                  >
                    {colorSettings.primaryColor === preset.oklch && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div className="space-y-2">
              <Label className="text-sm">Custom Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    colorSettings.primaryColor
                      ? oklchToHex(colorSettings.primaryColor)
                      : "#8b5cf6"
                  }
                  onChange={(e) => {
                    const hex = e.target.value;
                    const oklch = hexToOklch(hex);
                    handleColorChange("primaryColor", oklch);
                  }}
                  className="h-10 w-20 rounded-md border border-border cursor-pointer"
                  disabled={isSavingColors}
                />
                <Input
                  type="text"
                  placeholder="oklch(0.55 0.25 280)"
                  value={colorSettings.primaryColor || ""}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value || null)
                  }
                  className="flex-1 font-mono text-sm"
                  disabled={isSavingColors}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter OKLCH format or use the color picker
              </p>
            </div>

            {/* Primary Foreground */}
            <div className="space-y-2">
              <Label className="text-sm">Primary Foreground</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    colorSettings.primaryForeground
                      ? oklchToHex(colorSettings.primaryForeground)
                      : "#ffffff"
                  }
                  onChange={(e) => {
                    const hex = e.target.value;
                    const oklch = hexToOklch(hex);
                    handleColorChange("primaryForeground", oklch);
                  }}
                  className="h-10 w-20 rounded-md border border-border cursor-pointer"
                  disabled={isSavingColors}
                />
                <Input
                  type="text"
                  placeholder="oklch(0.99 0 0)"
                  value={colorSettings.primaryForeground || ""}
                  onChange={(e) =>
                    handleColorChange(
                      "primaryForeground",
                      e.target.value || null,
                    )
                  }
                  className="flex-1 font-mono text-sm"
                  disabled={isSavingColors}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            {/* Secondary Color */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">
                  Secondary Color
                </Label>
                <p className="text-sm text-muted-foreground">
                  Secondary accent color for UI elements
                </p>
              </div>

              {/* Preset Colors */}
              <div className="space-y-2">
                <Label className="text-sm">Preset Colors</Label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {PRESET_COLORS.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() =>
                        handlePresetColorSelect("secondary", preset.oklch)
                      }
                      className="relative h-10 w-10 rounded-md border-2 border-border hover:border-primary transition-colors"
                      style={{ backgroundColor: preset.hex }}
                      title={preset.name}
                      disabled={isSavingColors}
                    >
                      {colorSettings.secondaryColor === preset.oklch && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Input */}
              <div className="space-y-2">
                <Label className="text-sm">Custom Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={
                      colorSettings.secondaryColor
                        ? oklchToHex(colorSettings.secondaryColor)
                        : "#f3f4f6"
                    }
                    onChange={(e) => {
                      const hex = e.target.value;
                      const oklch = hexToOklch(hex);
                      handleColorChange("secondaryColor", oklch);
                    }}
                    className="h-10 w-20 rounded-md border border-border cursor-pointer"
                    disabled={isSavingColors}
                  />
                  <Input
                    type="text"
                    placeholder="oklch(0.97 0 0)"
                    value={colorSettings.secondaryColor || ""}
                    onChange={(e) =>
                      handleColorChange(
                        "secondaryColor",
                        e.target.value || null,
                      )
                    }
                    className="flex-1 font-mono text-sm"
                    disabled={isSavingColors}
                  />
                </div>
              </div>

              {/* Secondary Foreground */}
              <div className="space-y-2">
                <Label className="text-sm">Secondary Foreground</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={
                      colorSettings.secondaryForeground
                        ? oklchToHex(colorSettings.secondaryForeground)
                        : "#1f2937"
                    }
                    onChange={(e) => {
                      const hex = e.target.value;
                      const oklch = hexToOklch(hex);
                      handleColorChange("secondaryForeground", oklch);
                    }}
                    className="h-10 w-20 rounded-md border border-border cursor-pointer"
                    disabled={isSavingColors}
                  />
                  <Input
                    type="text"
                    placeholder="oklch(0.205 0 0)"
                    value={colorSettings.secondaryForeground || ""}
                    onChange={(e) =>
                      handleColorChange(
                        "secondaryForeground",
                        e.target.value || null,
                      )
                    }
                    className="flex-1 font-mono text-sm"
                    disabled={isSavingColors}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2 pt-6 border-t border-border">
            <Label className="text-sm">Preview</Label>
            <div className="flex flex-wrap gap-3 p-4 rounded-lg border border-border bg-card">
              <Button className="bg-primary text-primary-foreground">
                Primary Button
              </Button>
              <Button
                variant="secondary"
                className="bg-secondary text-secondary-foreground"
              >
                Secondary Button
              </Button>
              <div className="px-3 py-1 rounded-md bg-primary/10 text-primary">
                Primary Text
              </div>
              <div className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground">
                Secondary Text
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Additional theme preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Color Scheme</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
