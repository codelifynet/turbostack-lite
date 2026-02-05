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
import { Avatar, AvatarFallback } from "@repo/shadcn-ui/avatar";
import {
  Mail,
  Calendar,
  ShoppingCart,
  UserCircle,
  Eye,
  Edit,
  MessageSquare,
  Ban,
  Trash2,
} from "lucide-react";
import type { CustomerPanel } from "@repo/types";

interface CustomersTableProps {
  customers: CustomerPanel[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function CustomersTable({
  customers,
  searchTerm,
  onSearchChange,
}: CustomersTableProps) {
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term),
    );
  }, [customers, searchTerm]);

  const actions: DataTableAction<CustomerPanel>[] = useMemo(
    () => [
      {
        label: "View Profile",
        icon: <Eye className="h-4 w-4" />,
        onClick: (customer) => {
          console.log("View customer:", customer.id);
        },
      },
      {
        label: "Edit Customer",
        icon: <Edit className="h-4 w-4" />,
        onClick: (customer) => {
          console.log("Edit customer:", customer.id);
        },
      },
      {
        label: "Send Message",
        icon: <MessageSquare className="h-4 w-4" />,
        onClick: (customer) => {
          console.log("Send message to:", customer.email);
        },
      },
      {
        label: (row) =>
          row.status === "active" ? "Suspend Customer" : "Activate Customer",
        icon: <Ban className="h-4 w-4" />,
        onClick: (customer) => {
          console.log("Toggle customer status:", customer.id);
        },
      },
      {
        label: "Delete Customer",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: (customer) => {
          console.log("Delete customer:", customer.id);
        },
        variant: "destructive",
      },
    ],
    [],
  );

  const columns: Column<CustomerPanel>[] = useMemo(
    () => [
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        cell: (customer) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-800 shadow-sm">
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                {customer.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {customer.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        cell: (customer) => (
          <Badge
            variant={customer.status === "active" ? "default" : "secondary"}
          >
            {customer.status}
          </Badge>
        ),
      },
      {
        key: "orders",
        header: "Orders",
        sortable: true,
        cell: (customer) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <ShoppingCart className="h-3.5 w-3.5" />
            {customer.orders}
          </div>
        ),
      },
      {
        key: "totalSpent",
        header: "Total Spent",
        sortable: true,
        cell: (customer) => (
          <div className="font-medium text-gray-900 dark:text-white">
            $
            {customer.totalSpent.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ),
      },
      {
        key: "joinedDate",
        header: "Joined",
        sortable: true,
        cell: (customer) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(customer.joinedDate).toLocaleDateString("en-US", {
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
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          {customers.length} customer{customers.length === 1 ? "" : "s"} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={filteredCustomers}
          columns={columns}
          actions={actions}
          loading={false}
          loadingText="Loading customers..."
          emptyIcon={<UserCircle className="h-8 w-8 text-gray-400" />}
          emptyTitle="No customers found"
          emptyDescription="Get started by adding your first customer."
          searchable
          searchPlaceholder="Search by name or email..."
          searchValue={searchTerm}
          onSearchChange={onSearchChange}
          pagination={false}
        />
        {/* Note */}
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
