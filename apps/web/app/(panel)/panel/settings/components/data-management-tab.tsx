"use client";

import { useState } from "react";
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
import { Separator } from "@repo/shadcn-ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/shadcn-ui/alert-dialog";
import {
  Loader2,
  Download,
  AlertTriangle,
  Trash2,
  Archive,
  FileText,
} from "lucide-react";

export function DataManagementTab() {
  const [isExporting, setIsExporting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      // TODO: API call to export data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Data export started. You'll receive an email when ready.");
    } catch (error) {
      console.error("Failed to export data:", error);
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleFreezeAccount = async () => {
    try {
      // TODO: API call to freeze account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account frozen successfully");
    } catch (error) {
      console.error("Failed to freeze account:", error);
      toast.error("Failed to freeze account");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    try {
      setIsDeleting(true);
      // TODO: API call to delete account
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account deletion initiated");
      // Redirect to logout or home page
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download a copy of all your data in JSON format (GDPR compliant)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">What&apos;s included:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>Profile information and preferences</li>
              <li>Account settings and security data</li>
              <li>Activity logs and usage history</li>
              <li>Uploaded files and media</li>
              <li>All associated metadata</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive an email with a download link when your export is
            ready. This usually takes a few minutes.
          </p>
          <Button onClick={handleExportData} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Preparing Export...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Request Data Export
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Agreements & Consents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal & Agreements
          </CardTitle>
          <CardDescription>
            View and manage your agreements and consents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Terms of Service</p>
              <p className="text-xs text-muted-foreground">
                Last updated: January 1, 2026
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Privacy Policy</p>
              <p className="text-xs text-muted-foreground">
                Last updated: January 1, 2026
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Cookie Policy</p>
              <p className="text-xs text-muted-foreground">
                Last updated: January 1, 2026
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Freeze Account */}
          <div className="flex items-start justify-between p-4 border border-yellow-500/50 rounded-lg bg-yellow-500/5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Archive className="h-4 w-4 text-yellow-600" />
                <h4 className="font-medium">Freeze Account</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Temporarily suspend your account. You can reactivate it anytime
                by logging in.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="ml-4">
                  Freeze
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Freeze Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your account will be temporarily disabled. You can reactivate
                    it by logging in again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFreezeAccount}>
                    Freeze Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Delete Account */}
          <div className="flex items-start justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Trash2 className="h-4 w-4 text-destructive" />
                <h4 className="font-medium text-destructive">
                  Delete Account Permanently
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Once you delete your account, there is no going back. All your
                data will be permanently deleted.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>All your personal data will be deleted</li>
                <li>Your subscription will be cancelled</li>
                <li>All uploaded files will be removed</li>
                <li>This action cannot be undone</li>
              </ul>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="ml-4">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-delete">
                        Type <span className="font-bold">DELETE</span> to
                        confirm:
                      </Label>
                      <Input
                        id="confirm-delete"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="DELETE"
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setConfirmText("")}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={confirmText !== "DELETE" || isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Account"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
