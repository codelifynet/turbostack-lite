"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/ui/card";
import { Progress } from "@repo/shadcn-ui/ui/progress";
import { Badge } from "@repo/shadcn-ui/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/shadcn-ui/ui/tabs";
import { Button } from "@repo/shadcn-ui/ui/button";
import { BarChart3, TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { usageData } from "@/mocks/usage.mock";
import { UsageTrendsChart } from "./usage-trends-chart";

export function UsageClient() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Usage
              </h1>
              <p className="text-muted-foreground text-sm">
                Monitor your resource usage and limits
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {usageData.map((item) => {
              const Icon = item.icon;
              const percentage = (item.current / item.limit) * 100;

              return (
                <Card
                  key={item.name}
                  className={cn(
                    "relative overflow-hidden bg-linear-to-br",
                    item.gradient,
                    "border-0 shadow-sm",
                  )}
                >
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {item.name}
                    </CardTitle>
                    <div className={cn("p-2 rounded-lg", item.iconBg)}>
                      <Icon className={cn("h-4 w-4", item.iconColor)} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">
                          {item.current.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          / {item.limit.toLocaleString()}
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}% used
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <UsageTrendsChart />
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Usage Breakdown</CardTitle>
              <CardDescription>
                Comprehensive view of your resource consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.map((item) => {
                  const Icon = item.icon;
                  const percentage = (item.current / item.limit) * 100;

                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn("rounded-lg p-2", item.iconBg)}>
                            <Icon className={cn("h-4 w-4", item.iconColor)} />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.current.toLocaleString()} /{" "}
                              {item.limit.toLocaleString()} {item.unit}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            percentage > 80 ? "destructive" : "secondary"
                          }
                        >
                          {percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Historical data of your resource usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  No history data yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your usage history will appear here over time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
