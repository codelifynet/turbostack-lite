"use client";

import { useMemo } from "react";
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
  ShoppingCart,
  Mail,
  Calendar,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  RefreshCw,
  Truck,
  RotateCcw,
} from "lucide-react";
import type { OrderPanel } from "@repo/types";

interface OrdersTableProps {
  orders: OrderPanel[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const statusColors = {
  completed: "default",
  pending: "secondary",
  cancelled: "destructive",
  refunded: "outline",
} as const;

const statusIcons = {
  completed: CheckCircle2,
  pending: Clock,
  cancelled: XCircle,
  refunded: Clock,
} as const;

export function OrdersTable({
  orders,
  searchTerm,
  onSearchChange,
}: OrdersTableProps) {
  const actions: DataTableAction<OrderPanel>[] = useMemo(
    () => [
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        onClick: (order) => {
          console.log("View order:", order.id);
        },
      },
      {
        label: "Download Invoice",
        icon: <FileText className="h-4 w-4" />,
        onClick: (order) => {
          console.log("Download invoice:", order.id);
        },
      },
      {
        label: "Track Shipment",
        icon: <Truck className="h-4 w-4" />,
        onClick: (order) => {
          console.log("Track shipment:", order.id);
        },
        disabled: (row) =>
          row.status === "cancelled" || row.status === "refunded",
      },
      {
        label: (row) =>
          row.status === "pending" ? "Process Order" : "Reprocess Order",
        icon: <RefreshCw className="h-4 w-4" />,
        onClick: (order) => {
          console.log("Process order:", order.id);
        },
        disabled: (row) => row.status === "cancelled",
      },
      {
        label: "Refund Order",
        icon: <RotateCcw className="h-4 w-4" />,
        onClick: (order) => {
          console.log("Refund order:", order.id);
        },
        variant: "destructive",
        disabled: (row) =>
          row.status === "refunded" || row.status === "cancelled",
      },
    ],
    [],
  );

  const columns: Column<OrderPanel>[] = useMemo(
    () => [
      {
        key: "id",
        header: "Order ID",
        sortable: true,
        cell: (order) => (
          <span className="font-mono font-medium text-gray-900 dark:text-white">
            {order.id}
          </span>
        ),
      },
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        cell: (order) => (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">
              {order.customer}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {order.email}
            </span>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        cell: (order) => {
          const Icon =
            statusIcons[order.status as keyof typeof statusIcons] || Clock;
          return (
            <Badge
              variant={
                statusColors[order.status as keyof typeof statusColors] ||
                "secondary"
              }
            >
              <Icon className="h-3 w-3 mr-1" />
              {order.status}
            </Badge>
          );
        },
      },
      {
        key: "product",
        header: "Product",
        sortable: true,
        cell: (order) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Package className="h-3.5 w-3.5" />
            {order.product}
          </div>
        ),
      },
      {
        key: "amount",
        header: "Amount",
        sortable: true,
        cell: (order) => (
          <div className="font-medium text-gray-900 dark:text-white">
            $
            {order.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ),
      },
      {
        key: "date",
        header: "Date",
        sortable: true,
        cell: (order) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(order.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          {orders.length} order{orders.length === 1 ? "" : "s"} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={orders}
          columns={columns}
          actions={actions}
          loading={false}
          loadingText="Loading orders..."
          emptyIcon={<ShoppingCart className="h-8 w-8 text-gray-400" />}
          emptyTitle="No orders found"
          emptyDescription="Orders will appear here once customers make purchases."
          searchable
          searchPlaceholder="Search by order ID, customer, or email..."
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
