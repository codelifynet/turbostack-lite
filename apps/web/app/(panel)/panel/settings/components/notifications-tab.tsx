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
import { Separator } from "@repo/shadcn-ui/separator";
import { Loader2, Bell, Mail, MessageSquare, TrendingUp } from "lucide-react";

interface NotificationSettings {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  marketingEmails: boolean;
  systemAnnouncements: boolean;
  weeklyDigest: boolean;
  instantAlerts: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  commentNotifications: boolean;
  mentionNotifications: boolean;
}

export function NotificationsTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    inAppNotifications: true,
    marketingEmails: false,
    systemAnnouncements: true,
    weeklyDigest: true,
    instantAlerts: false,
    productUpdates: true,
    securityAlerts: true,
    commentNotifications: true,
    mentionNotifications: true,
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
      console.error("Failed to load notification settings:", error);
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
      toast.success("Notification settings saved successfully");
    } catch (error) {
      console.error("Failed to save notification settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
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
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Control how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Email Notifications</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional content and offers
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleToggle("marketingEmails")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of your activity
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={() => handleToggle("weeklyDigest")}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* In-App Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">In-App Notifications</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications within the app
                  </p>
                </div>
                <Switch
                  checked={settings.inAppNotifications}
                  onCheckedChange={() => handleToggle("inAppNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Instant Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time notifications for important events
                  </p>
                </div>
                <Switch
                  checked={settings.instantAlerts}
                  onCheckedChange={() => handleToggle("instantAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comment Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone comments
                  </p>
                </div>
                <Switch
                  checked={settings.commentNotifications}
                  onCheckedChange={() => handleToggle("commentNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mention Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone mentions you
                  </p>
                </div>
                <Switch
                  checked={settings.mentionNotifications}
                  onCheckedChange={() => handleToggle("mentionNotifications")}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* System Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">System & Updates</h3>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Announcements</Label>
                  <p className="text-sm text-muted-foreground">
                    Important platform updates and maintenance
                  </p>
                </div>
                <Switch
                  checked={settings.systemAnnouncements}
                  onCheckedChange={() => handleToggle("systemAnnouncements")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    New features and improvements
                  </p>
                </div>
                <Switch
                  checked={settings.productUpdates}
                  onCheckedChange={() => handleToggle("productUpdates")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical security notifications (always enabled)
                  </p>
                </div>
                <Switch checked={settings.securityAlerts} disabled />
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
            "Save Preferences"
          )}
        </Button>
      </div>
    </div>
  );
}
