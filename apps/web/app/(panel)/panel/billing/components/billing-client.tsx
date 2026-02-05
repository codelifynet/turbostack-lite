"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/shadcn-ui/ui/card";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Badge } from "@repo/shadcn-ui/ui/badge";
import { Separator } from "@repo/shadcn-ui/ui/separator";
import { CreditCard, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { currentPlan, planFeatures } from "@/mocks/billing.mock";
export function BillingClient() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Billing
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your billing information and view invoices
              </p>
            </div>
          </div>
        </div>
        <Button>
          <Sparkles className="h-4 w-4 mr-2" />
          Upgrade Plan
        </Button>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription plan</CardDescription>
            </div>
            <Badge variant="default" className="text-sm">
              {currentPlan.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">{currentPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentPlan.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${currentPlan.price}</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            {planFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-green-500" />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
          <Button className="w-full">Upgrade Plan</Button>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium">No payment method</p>
              <p className="text-sm text-muted-foreground">
                Add a payment method to upgrade your plan
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No invoices yet</h3>
            <p className="text-sm text-muted-foreground">
              Your billing history will appear here once you have invoices
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
