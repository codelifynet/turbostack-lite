import { Card, CardContent, CardHeader, CardTitle } from "@repo/shadcn-ui/card";
import { Badge } from "@repo/shadcn-ui/badge";
import { CreditCard, DollarSign, CheckCircle2, TrendingUp } from "lucide-react";
import type { SubscriptionsStats } from "@repo/types";

interface SubscriptionsStatsCardsProps {
  stats: SubscriptionsStats;
}

export function SubscriptionsStatsCards({
  stats,
}: SubscriptionsStatsCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="relative overflow-hidden bg-linear-to-br from-blue-500/10 to-cyan-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Subscriptions
          </CardTitle>
          <div className="p-2 rounded-lg bg-blue-500/20">
            <CreditCard className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="default"
              className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-linear-to-br from-green-500/10 to-emerald-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Subscriptions
          </CardTitle>
          <div className="p-2 rounded-lg bg-green-500/20">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.active}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="default"
              className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              +18%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-linear-to-br from-emerald-500/10 to-teal-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            MRR
          </CardTitle>
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            $
            {stats.mrr.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="default"
              className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              +8%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-linear-to-br from-purple-500/10 to-pink-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            ARR
          </CardTitle>
          <div className="p-2 rounded-lg bg-purple-500/20">
            <DollarSign className="h-4 w-4 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            $
            {stats.arr.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="default"
              className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              +5%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
