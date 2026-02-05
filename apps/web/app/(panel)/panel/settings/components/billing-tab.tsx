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
import { Badge } from "@repo/shadcn-ui/badge";
import { Alert, AlertDescription } from "@repo/shadcn-ui/alert";
import { CreditCard, Loader2, ShieldCheck, Info } from "lucide-react";
import type { BillingHistoryItem } from "@repo/types";

interface BillingTabProps {
  userRole: string;
}

export function BillingTab({ userRole }: BillingTabProps) {
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>(
    [],
  );
  const [isLoadingBilling, setIsLoadingBilling] = useState(false);
  const isSuperAdmin = userRole === "SUPERADMIN";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPERADMIN";

  // Load billing history on mount
  useEffect(() => {
    void loadBillingHistory();
  }, []);

  const loadBillingHistory = async () => {
    setIsLoadingBilling(true);
    try {
      // Load user's own billing history
      setBillingHistory([]);
    } catch (error) {
      console.error("Failed to load billing history:", error);
      toast.error("Failed to load billing history");
    } finally {
      setIsLoadingBilling(false);
    }
  };

  return (
    <>
      {!isAdmin && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            You're viewing your subscription in read-only mode. Contact support to make changes.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Payment Method
            {isSuperAdmin && (
              <Badge variant="outline" className="ml-auto">
                Full Access
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {isSuperAdmin
              ? "Manage your payment methods"
              : "View payment methods (Read-only)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No payment methods configured</p>
            <p className="text-xs mt-2">
              {isSuperAdmin
                ? "Payment method management will be available soon"
                : "Contact a Super Admin to configure payment methods"}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingBilling ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : billingHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No billing history found</p>
              <p className="text-xs mt-2">
                Your invoices will appear here once you make a purchase
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {billingHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium text-sm">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.amount}</span>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
