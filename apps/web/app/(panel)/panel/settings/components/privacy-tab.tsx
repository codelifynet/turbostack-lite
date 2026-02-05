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
import { Label } from "@repo/shadcn-ui/label";
import { Switch } from "@repo/shadcn-ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/select";
import { Separator } from "@repo/shadcn-ui/separator";
import { Loader2, Lock, Eye, Globe, Users } from "lucide-react";

interface PrivacySettings {
  profilePublic: boolean;
  emailVisibility: "public" | "private" | "contacts";
  activityVisibility: "everyone" | "contacts" | "private";
  searchEngineIndexing: boolean;
  allowDataSharing: boolean;
  allowAnalytics: boolean;
  showOnlineStatus: boolean;
}

export function PrivacyTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    profilePublic: true,
    emailVisibility: "private",
    activityVisibility: "contacts",
    searchEngineIndexing: false,
    allowDataSharing: false,
    allowAnalytics: true,
    showOnlineStatus: true,
  });

  useEffect(() => {
    void loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      // TODO: Load from API
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to load privacy settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: Save to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Privacy settings saved successfully");
    } catch (error) {
      console.error("Failed to save privacy settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control who can see your information and activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Visibility */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Profile Visibility</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch
                  checked={settings.profilePublic}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, profilePublic: checked })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email Visibility</Label>
                <Select
                  value={settings.emailVisibility}
                  onValueChange={(value: "public" | "private" | "contacts") =>
                    setSettings({ ...settings, emailVisibility: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="contacts">Contacts Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Activity Visibility</Label>
                <Select
                  value={settings.activityVisibility}
                  onValueChange={(
                    value: "everyone" | "contacts" | "private",
                  ) => setSettings({ ...settings, activityVisibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="contacts">Contacts Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you&apos;re online
                  </p>
                </div>
                <Switch
                  checked={settings.showOnlineStatus}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showOnlineStatus: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Search & Indexing */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Search Engine Indexing</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Search Engine Indexing</Label>
                  <p className="text-sm text-muted-foreground">
                    Let search engines index your public profile
                  </p>
                </div>
                <Switch
                  checked={settings.searchEngineIndexing}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, searchEngineIndexing: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Data Usage */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Data Usage & Sharing</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={settings.allowAnalytics}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowAnalytics: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share data with trusted third-party services
                  </p>
                </div>
                <Switch
                  checked={settings.allowDataSharing}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowDataSharing: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </div>
  );
}
