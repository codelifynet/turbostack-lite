"use client";

import { useState, useMemo } from "react";
import { CustomersPageHeader } from "./customers-page-header";
import { CustomersStatsCards } from "./customers-stats-cards";
import { CustomersTable } from "./customers-table";
import type { CustomerPanel, CustomersStats } from "@repo/types";

interface CustomersClientProps {
  initialCustomers: CustomerPanel[];
}

export function CustomersClient({ initialCustomers }: CustomersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = useMemo<CustomersStats>(() => {
    const total = initialCustomers.length;
    const active = initialCustomers.filter((c) => c.status === "active").length;
    const totalRevenue = initialCustomers.reduce(
      (sum, c) => sum + c.totalSpent,
      0,
    );
    const totalOrders = initialCustomers.reduce((sum, c) => sum + c.orders, 0);

    return {
      total,
      active,
      totalRevenue,
      totalOrders,
    };
  }, [initialCustomers]);

  return (
    <div className="space-y-6">
      <CustomersPageHeader totalCustomers={stats.total} />
      <CustomersStatsCards stats={stats} />
      <CustomersTable
        customers={initialCustomers}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
