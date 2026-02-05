"use client";

import { useState, useMemo } from "react";
import { OrdersPageHeader } from "./orders-page-header";
import { OrdersStatsCards } from "./orders-stats-cards";
import { OrdersTable } from "./orders-table";
import type { OrderPanel, OrdersStats } from "@repo/types";

interface OrdersClientProps {
  initialOrders: OrderPanel[];
}

export function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return initialOrders;
    const term = searchTerm.toLowerCase();
    return initialOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.email.toLowerCase().includes(term),
    );
  }, [initialOrders, searchTerm]);

  const stats = useMemo<OrdersStats>(() => {
    const total = initialOrders.length;
    const completed = initialOrders.filter(
      (o) => o.status === "completed",
    ).length;
    const totalRevenue = initialOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.amount, 0);
    const pending = initialOrders.filter((o) => o.status === "pending").length;

    return {
      total,
      completed,
      totalRevenue,
      pending,
    };
  }, [initialOrders]);

  return (
    <div className="space-y-6">
      <OrdersPageHeader totalOrders={stats.total} />
      <OrdersStatsCards stats={stats} />
      <OrdersTable
        orders={filteredOrders}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
