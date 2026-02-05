import type {
  Subscription,
  SubscriptionStatus,
  BillingCycle,
  SubscriptionPlan,
} from "@repo/types";

export const mockSubscriptions: Subscription[] = [
  {
    id: "SUB-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    plan: "Pro Plan",
    amount: 149.0,
    status: "active",
    billingCycle: "monthly",
    startDate: "2024-01-15",
    nextBilling: "2024-02-01T00:00:00.000Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "Business Plan",
    amount: 299.0,
    status: "active",
    billingCycle: "monthly",
    startDate: "2024-01-20",
    nextBilling: "2024-02-01T00:00:00.000Z",
    paymentMethod: "PayPal",
  },
  {
    id: "SUB-003",
    customer: "Bob Johnson",
    email: "bob.johnson@example.com",
    plan: "Pro Plan",
    amount: 149.0,
    status: "cancelled",
    billingCycle: "monthly",
    startDate: "2024-01-22",
    nextBilling: null,
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-004",
    customer: "Alice Williams",
    email: "alice.williams@example.com",
    plan: "Enterprise Plan",
    amount: 499.0,
    status: "active",
    billingCycle: "yearly",
    startDate: "2024-01-25",
    nextBilling: "2025-01-25T00:00:00.000Z",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "SUB-005",
    customer: "Charlie Brown",
    email: "charlie.brown@example.com",
    plan: "Pro Plan",
    amount: 149.0,
    status: "past_due",
    billingCycle: "monthly",
    startDate: "2024-01-28",
    nextBilling: "2024-02-28T00:00:00.000Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-006",
    customer: "Diana Miller",
    email: "diana.miller@example.com",
    plan: "Starter Plan",
    amount: 49.0,
    status: "active",
    billingCycle: "monthly",
    startDate: "2024-02-01",
    nextBilling: "2024-03-01T00:00:00.000Z",
    paymentMethod: "PayPal",
  },
  {
    id: "SUB-007",
    customer: "Edward Davis",
    email: "edward.davis@example.com",
    plan: "Business Plan",
    amount: 299.0,
    status: "trialing",
    billingCycle: "monthly",
    startDate: "2024-02-03",
    nextBilling: "2024-02-17T00:00:00.000Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-008",
    customer: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    plan: "Enterprise Plan",
    amount: 499.0,
    status: "active",
    billingCycle: "yearly",
    startDate: "2024-02-05",
    nextBilling: "2025-02-05T00:00:00.000Z",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "SUB-009",
    customer: "George Martinez",
    email: "george.martinez@example.com",
    plan: "Pro Plan",
    amount: 149.0,
    status: "active",
    billingCycle: "monthly",
    startDate: "2024-02-08",
    nextBilling: "2024-03-08T00:00:00.000Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-010",
    customer: "Helen Rodriguez",
    email: "helen.rodriguez@example.com",
    plan: "Business Plan",
    amount: 299.0,
    status: "past_due",
    billingCycle: "monthly",
    startDate: "2024-02-10",
    nextBilling: "2024-03-10T00:00:00.000Z",
    paymentMethod: "PayPal",
  },
  {
    id: "SUB-011",
    customer: "Ian Thompson",
    email: "ian.thompson@example.com",
    plan: "Starter Plan",
    amount: 49.0,
    status: "cancelled",
    billingCycle: "monthly",
    startDate: "2024-02-12",
    nextBilling: null,
    paymentMethod: "Credit Card",
  },
  {
    id: "SUB-012",
    customer: "Julia White",
    email: "julia.white@example.com",
    plan: "Enterprise Plan",
    amount: 499.0,
    status: "active",
    billingCycle: "yearly",
    startDate: "2024-02-15",
    nextBilling: "2025-02-15T00:00:00.000Z",
    paymentMethod: "Bank Transfer",
  },
];

export const mockSubscriptionStats = {
  total: mockSubscriptions.length,
  active: mockSubscriptions.filter((sub) => sub.status === "active").length,
  cancelled: mockSubscriptions.filter((sub) => sub.status === "cancelled")
    .length,
  pastDue: mockSubscriptions.filter((sub) => sub.status === "past_due").length,
  trialing: mockSubscriptions.filter((sub) => sub.status === "trialing").length,
  mrr: mockSubscriptions
    .filter((sub) => sub.status === "active")
    .reduce((sum, sub) => {
      const monthlyAmount =
        sub.billingCycle === "yearly" ? sub.amount / 12 : sub.amount;
      return sum + monthlyAmount;
    }, 0),
  arr: mockSubscriptions
    .filter((sub) => sub.status === "active")
    .reduce((sum, sub) => {
      return sub.billingCycle === "yearly"
        ? sum + sub.amount
        : sum + sub.amount * 12;
    }, 0),
  activeRate: Math.round(
    (mockSubscriptions.filter((sub) => sub.status === "active").length /
      mockSubscriptions.length) *
      100,
  ),
};

export const mockSubscriptionStatuses: SubscriptionStatus[] = [
  { value: "active", label: "Active", color: "default" },
  { value: "cancelled", label: "Cancelled", color: "destructive" },
  { value: "past_due", label: "Past Due", color: "secondary" },
  { value: "trialing", label: "Trial", color: "outline" },
];

export const mockBillingCycles: BillingCycle[] = [
  { value: "monthly", label: "Monthly", description: "Billed monthly" },
  {
    value: "yearly",
    label: "Yearly",
    description: "Billed annually with 2 months free",
  },
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Starter Plan",
    price: 49,
    billingCycle: "monthly",
    features: ["Basic features", "Email support", "5 projects"],
  },
  {
    name: "Pro Plan",
    price: 149,
    billingCycle: "monthly",
    features: [
      "Advanced features",
      "Priority support",
      "Unlimited projects",
      "API access",
    ],
  },
  {
    name: "Business Plan",
    price: 299,
    billingCycle: "monthly",
    features: [
      "All Pro features",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise Plan",
    price: 499,
    billingCycle: "yearly",
    features: [
      "All Business features",
      "Dedicated support",
      "On-premise deployment",
      "Custom training",
    ],
  },
];
