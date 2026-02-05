"use client";

import { useMemo } from "react";
import type { Subscription } from "@repo/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Badge } from "@repo/shadcn-ui/badge";
import {
  DataTable,
  type Column,
  type DataTableAction,
} from "@/components/data-table";
import {
  CreditCard,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  RefreshCw,
  Pause,
  Trash2,
} from "lucide-react";

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const statusColors = {
  active: "default",
  cancelled: "destructive",
  past_due: "secondary",
  trialing: "outline",
} as const;

const statusIcons = {
  active: CheckCircle2,
  cancelled: XCircle,
  past_due: Clock,
  trialing: Clock,
} as const;

export function SubscriptionsTable({
  subscriptions,
  searchTerm,
  onSearchChange,
}: SubscriptionsTableProps) {
  const actions: DataTableAction<Subscription>[] = useMemo(
    () => [
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        onClick: (subscription) => {
          console.log("View subscription:", subscription.id);
        },
      },
      {
        label: "Edit Subscription",
        icon: <Edit className="h-4 w-4" />,
        onClick: (subscription) => {
          console.log("Edit subscription:", subscription.id);
        },
      },
      {
        label: (row) =>
          row.status === "active"
            ? "Pause Subscription"
            : "Resume Subscription",
        icon: (row) =>
          row.status === "active" ? (
            <Pause className="h-4 w-4" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          ),
        onClick: (subscription) => {
          console.log("Toggle subscription status:", subscription.id);
        },
      },
      {
        label: "Cancel Subscription",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: (subscription) => {
          console.log("Cancel subscription:", subscription.id);
        },
        variant: "destructive",
        disabled: (row) => row.status === "cancelled",
      },
    ],
    [],
  );

  const columns: Column<Subscription>[] = useMemo(
    () => [
      {
        key: "id",
        header: "Subscription ID",
        sortable: true,
        cell: (subscription) => (
          <span className="font-mono font-medium text-gray-900 dark:text-white">
            {subscription.id}
          </span>
        ),
      },
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        cell: (subscription) => (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">
              {subscription.customer}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {subscription.email}
            </span>
          </div>
        ),
      },
      {
        key: "plan",
        header: "Plan",
        sortable: true,
        cell: (subscription) => (
          <div className="font-medium text-gray-900 dark:text-white">
            {subscription.plan}
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        cell: (subscription) => {
          const Icon =
            statusIcons[subscription.status as keyof typeof statusIcons] ||
            Clock;
          return (
            <Badge
              variant={
                statusColors[
                  subscription.status as keyof typeof statusColors
                ] || "secondary"
              }
            >
              <Icon className="h-3 w-3 mr-1" />
              {subscription.status}
            </Badge>
          );
        },
      },
      {
        key: "amount",
        header: "Amount",
        sortable: true,
        cell: (subscription) => (
          <div className="font-medium text-gray-900 dark:text-white">
            $
            {subscription.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              /{subscription.billingCycle === "yearly" ? "year" : "month"}
            </span>
          </div>
        ),
      },
      {
        key: "nextBilling",
        header: "Next Billing",
        sortable: true,
        cell: (subscription) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {subscription.nextBilling
              ? new Date(subscription.nextBilling).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
        <CardDescription>
          {subscriptions.length} subscription
          {subscriptions.length === 1 ? "" : "s"} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={subscriptions}
          columns={columns}
          actions={actions}
          loading={false}
          loadingText="Loading subscriptions..."
          emptyIcon={<CreditCard className="h-8 w-8 text-gray-400" />}
          emptyTitle="No subscriptions found"
          emptyDescription="Subscriptions will appear here once customers subscribe."
          searchable
          searchPlaceholder="Search by ID, customer, or email..."
          searchValue={searchTerm}
          onSearchChange={onSearchChange}
          pagination={false}
        />
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a demo page with fake data. In a
            production environment, this would connect to your backend API.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
