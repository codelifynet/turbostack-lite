import type {
  OrderPanel,
  OrderStatus,
  PaymentMethod,
  TopProduct,
} from "@repo/types";

export const mockOrders: OrderPanel[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    product: "Pro Plan",
    amount: 149.0,
    status: "completed",
    date: "2024-01-15",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    product: "Business Plan",
    amount: 299.0,
    status: "pending",
    date: "2024-01-20",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob.johnson@example.com",
    product: "Pro Plan",
    amount: 149.0,
    status: "completed",
    date: "2024-01-22",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Alice Williams",
    email: "alice.williams@example.com",
    product: "Enterprise Plan",
    amount: 499.0,
    status: "completed",
    date: "2024-01-25",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-005",
    customer: "Charlie Brown",
    email: "charlie.brown@example.com",
    product: "Pro Plan",
    amount: 149.0,
    status: "cancelled",
    date: "2024-01-28",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-006",
    customer: "Diana Miller",
    email: "diana.miller@example.com",
    product: "Starter Plan",
    amount: 49.0,
    status: "completed",
    date: "2024-02-01",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-007",
    customer: "Edward Davis",
    email: "edward.davis@example.com",
    product: "Business Plan",
    amount: 299.0,
    status: "pending",
    date: "2024-02-03",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-008",
    customer: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    product: "Enterprise Plan",
    amount: 499.0,
    status: "completed",
    date: "2024-02-05",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-009",
    customer: "George Martinez",
    email: "george.martinez@example.com",
    product: "Pro Plan",
    amount: 149.0,
    status: "refunded",
    date: "2024-02-08",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-010",
    customer: "Helen Rodriguez",
    email: "helen.rodriguez@example.com",
    product: "Business Plan",
    amount: 299.0,
    status: "completed",
    date: "2024-02-10",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-011",
    customer: "Ian Thompson",
    email: "ian.thompson@example.com",
    product: "Starter Plan",
    amount: 49.0,
    status: "pending",
    date: "2024-02-12",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-012",
    customer: "Julia White",
    email: "julia.white@example.com",
    product: "Enterprise Plan",
    amount: 499.0,
    status: "completed",
    date: "2024-02-15",
    paymentMethod: "Bank Transfer",
  },
];

export const mockOrderStats = {
  total: mockOrders.length,
  completed: mockOrders.filter((order) => order.status === "completed").length,
  pending: mockOrders.filter((order) => order.status === "pending").length,
  cancelled: mockOrders.filter((order) => order.status === "cancelled").length,
  refunded: mockOrders.filter((order) => order.status === "refunded").length,
  totalRevenue: mockOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.amount, 0),
  completionRate: Math.round(
    (mockOrders.filter((order) => order.status === "completed").length /
      mockOrders.length) *
      100,
  ),
};

export const mockOrderStatuses: OrderStatus[] = [
  { value: "completed", label: "Completed", color: "default" },
  { value: "pending", label: "Pending", color: "secondary" },
  { value: "cancelled", label: "Cancelled", color: "destructive" },
  { value: "refunded", label: "Refunded", color: "outline" },
];

export const mockPaymentMethods: PaymentMethod[] = [
  { value: "Credit Card", label: "Credit Card", icon: "credit-card" },
  { value: "PayPal", label: "PayPal", icon: "paypal" },
  { value: "Bank Transfer", label: "Bank Transfer", icon: "building" },
  { value: "Crypto", label: "Cryptocurrency", icon: "bitcoin" },
];

export const mockTopProducts: TopProduct[] = [
  {
    name: "Pro Plan",
    orders: mockOrders.filter((o) => o.product === "Pro Plan").length,
    revenue: mockOrders
      .filter((o) => o.product === "Pro Plan")
      .reduce((sum, o) => sum + o.amount, 0),
  },
  {
    name: "Business Plan",
    orders: mockOrders.filter((o) => o.product === "Business Plan").length,
    revenue: mockOrders
      .filter((o) => o.product === "Business Plan")
      .reduce((sum, o) => sum + o.amount, 0),
  },
  {
    name: "Enterprise Plan",
    orders: mockOrders.filter((o) => o.product === "Enterprise Plan").length,
    revenue: mockOrders
      .filter((o) => o.product === "Enterprise Plan")
      .reduce((sum, o) => sum + o.amount, 0),
  },
  {
    name: "Starter Plan",
    orders: mockOrders.filter((o) => o.product === "Starter Plan").length,
    revenue: mockOrders
      .filter((o) => o.product === "Starter Plan")
      .reduce((sum, o) => sum + o.amount, 0),
  },
];
