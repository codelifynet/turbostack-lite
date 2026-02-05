import { CheckCircle2, type LucideIcon } from "lucide-react";

export interface BillingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface BillingFeature {
  icon: LucideIcon;
  label: string;
}

export const currentPlan: BillingPlan = {
  name: "Free Plan",
  price: 0,
  description: "Basic features for personal use",
  features: [
    "Up to 3 projects",
    "Basic support",
    "Community access",
  ],
};

export const planFeatures: BillingFeature[] = [
  {
    icon: CheckCircle2,
    label: "Up to 3 projects",
  },
  {
    icon: CheckCircle2,
    label: "Basic support",
  },
  {
    icon: CheckCircle2,
    label: "Community access",
  },
];
