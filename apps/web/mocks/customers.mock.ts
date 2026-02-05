import type { CustomerPanel, CustomerSegment } from "@repo/types";

export const mockCustomers: CustomerPanel[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    orders: 12,
    totalSpent: 2450.0,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    orders: 8,
    totalSpent: 1890.5,
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    status: "inactive",
    orders: 3,
    totalSpent: 450.0,
    joinedDate: "2024-03-10",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    status: "active",
    orders: 15,
    totalSpent: 3200.75,
    joinedDate: "2024-01-05",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "active",
    orders: 6,
    totalSpent: 980.25,
    joinedDate: "2024-04-12",
  },
  {
    id: "6",
    name: "Diana Miller",
    email: "diana.miller@example.com",
    status: "active",
    orders: 22,
    totalSpent: 4560.8,
    joinedDate: "2023-12-08",
  },
  {
    id: "7",
    name: "Edward Davis",
    email: "edward.davis@example.com",
    status: "inactive",
    orders: 2,
    totalSpent: 125.0,
    joinedDate: "2024-03-25",
  },
  {
    id: "8",
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    status: "active",
    orders: 18,
    totalSpent: 2890.45,
    joinedDate: "2024-01-22",
  },
  {
    id: "9",
    name: "George Martinez",
    email: "george.martinez@example.com",
    status: "active",
    orders: 9,
    totalSpent: 1675.3,
    joinedDate: "2024-02-14",
  },
  {
    id: "10",
    name: "Helen Rodriguez",
    email: "helen.rodriguez@example.com",
    status: "active",
    orders: 31,
    totalSpent: 6780.9,
    joinedDate: "2023-11-30",
  },
];

export const mockCustomerStats = {
  total: mockCustomers.length,
  active: mockCustomers.filter((customer) => customer.status === "active")
    .length,
  inactive: mockCustomers.filter((customer) => customer.status === "inactive")
    .length,
  totalRevenue: mockCustomers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0,
  ),
  totalOrders: mockCustomers.reduce(
    (sum, customer) => sum + customer.orders,
    0,
  ),
  averageOrderValue:
    mockCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0) /
    mockCustomers.reduce((sum, customer) => sum + customer.orders, 0),
  activeRate: Math.round(
    (mockCustomers.filter((customer) => customer.status === "active").length /
      mockCustomers.length) *
      100,
  ),
};

export const mockCustomerSegments: CustomerSegment[] = [
  {
    name: "VIP Customers",
    count: mockCustomers.filter((c) => c.totalSpent > 3000).length,
    description: "Customers with >$3000 spent",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Regular Customers",
    count: mockCustomers.filter(
      (c) => c.totalSpent > 1000 && c.totalSpent <= 3000,
    ).length,
    description: "Customers with $1000-$3000 spent",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "New Customers",
    count: mockCustomers.filter((c) => c.orders <= 5).length,
    description: "Customers with ≤5 orders",
    color: "text-green-600 dark:text-green-400",
  },
  {
    name: "Inactive Customers",
    count: mockCustomers.filter((c) => c.status === "inactive").length,
    description: "Customers with inactive status",
    color: "text-red-600 dark:text-red-400",
  },
];
