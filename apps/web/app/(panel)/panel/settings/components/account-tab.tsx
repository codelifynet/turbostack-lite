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
import { Switch } from "@repo/shadcn-ui/switch";
import { Badge } from "@repo/shadcn-ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/table";
import {
  Loader2,
  Shield,
  Mail,
  Lock,
  History,
  Monitor,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { userService } from "@/services/user.service";

interface LoginHistory {
  id: string;
  ipAddress: string;
  device: string;
  location: string;
  timestamp: string;
  status: "success" | "failed";
}

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export function AccountTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Email change
  const [newEmail, setNewEmail] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  useEffect(() => {
    void loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      setIsLoading(true);
      
      // Mock data - replace with actual API calls
      setTwoFactorEnabled(false);
      setLoginNotifications(true);
      
      setLoginHistory([
        {
          id: "1",
          ipAddress: "192.168.1.1",
          device: "Chrome on Windows",
          location: "Istanbul, Turkey",
          timestamp: "2 hours ago",
          status: "success",
        },
        {
          id: "2",
          ipAddress: "192.168.1.2",
          device: "Safari on iPhone",
          location: "Istanbul, Turkey",
          timestamp: "1 day ago",
          status: "success",
        },
      ]);

      setActiveSessions([
        {
          id: "1",
          device: "Windows PC",
          browser: "Chrome 120",
          ipAddress: "192.168.1.1",
          location: "Istanbul, Turkey",
          lastActive: "Active now",
          isCurrent: true,
        },
        {
          id: "2",
          device: "iPhone 15",
          browser: "Safari",
          ipAddress: "192.168.1.2",
          location: "Istanbul, Turkey",
          lastActive: "2 hours ago",
          isCurrent: false,
        },
      ]);
    } catch (error) {
      console.error("Failed to load account data:", error);
      toast.error("Failed to load account data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setIsChangingPassword(true);
      const result = await userService.changePassword(
        currentPassword,
        newPassword,
      );

      if (result.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(
          typeof result.error === "string"
            ? result.error
            : "Failed to change password",
        );
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail) {
      toast.error("Please enter new email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsChangingEmail(true);
      // TODO: Implement email change API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Verification email sent to new address");
      setNewEmail("");
    } catch (error) {
      console.error("Failed to change email:", error);
      toast.error("Failed to change email");
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handleToggle2FA = async (enabled: boolean) => {
    try {
      // TODO: Implement 2FA toggle API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwoFactorEnabled(enabled);
      toast.success(
        enabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      );
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
      toast.error("Failed to update two-factor authentication");
    }
  };

  const handleLogoutSession = async (sessionId: string) => {
    try {
      // TODO: Implement logout session API
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast.success("Session logged out successfully");
    } catch (error) {
      console.error("Failed to logout session:", error);
      toast.error("Failed to logout session");
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      // TODO: Implement logout all sessions API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActiveSessions((prev) => prev.filter((s) => s.isCurrent));
      toast.success("All other sessions logged out");
    } catch (error) {
      console.error("Failed to logout all sessions:", error);
      toast.error("Failed to logout all sessions");
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
      {/* Email Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Change Email Address
          </CardTitle>
          <CardDescription>
            Update your email address. You&apos;ll need to verify the new address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email Address</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="new.email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={handleChangeEmail}
            disabled={isChangingEmail || !newEmail}
          >
            {isChangingEmail ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending Verification...
              </>
            ) : (
              "Send Verification Email"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={
              isChangingPassword ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword
            }
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code in addition to your password
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleToggle2FA}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Login Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when someone logs into your account
              </p>
            </div>
            <Switch
              checked={loginNotifications}
              onCheckedChange={setLoginNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage devices where you&apos;re currently logged in
              </CardDescription>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogoutAllSessions}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout All Others
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device}</p>
                    {session.isCurrent && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.browser} • {session.ipAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLogoutSession(session.id)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Login Activity
          </CardTitle>
          <CardDescription>
            Review recent login attempts to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((login) => (
                <TableRow key={login.id}>
                  <TableCell>{login.device}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {login.ipAddress}
                  </TableCell>
                  <TableCell>{login.timestamp}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        login.status === "success" ? "default" : "destructive"
                      }
                    >
                      {login.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lock Account</p>
              <p className="text-sm text-muted-foreground">
                Temporarily disable your account
              </p>
            </div>
            <Button variant="outline">Lock Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
