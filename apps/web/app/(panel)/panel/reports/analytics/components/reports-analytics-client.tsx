"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/shadcn-ui/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/shadcn-ui/ui/tabs";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Badge } from "@repo/shadcn-ui/ui/badge";
import { Progress } from "@repo/shadcn-ui/ui/progress";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const trafficSources = [
  { source: "Organic Search", visitors: 12453, percentage: 42, color: "bg-blue-500" },
  { source: "Direct", visitors: 8921, percentage: 30, color: "bg-green-500" },
  { source: "Social Media", visitors: 5234, percentage: 18, color: "bg-purple-500" },
  { source: "Referral", visitors: 2967, percentage: 10, color: "bg-orange-500" },
];

const devices = [
  { device: "Desktop", icon: Monitor, count: 15234, percentage: 52 },
  { device: "Mobile", icon: Smartphone, count: 10876, percentage: 37 },
  { device: "Tablet", icon: Globe, count: 3465, percentage: 11 },
];

const topPages = [
  { page: "/products", views: 23456, bounceRate: "32%" },
  { page: "/pricing", views: 18234, bounceRate: "28%" },
  { page: "/blog", views: 15678, bounceRate: "45%" },
  { page: "/about", views: 12345, bounceRate: "38%" },
  { page: "/contact", views: 9876, bounceRate: "52%" },
];

export function ReportsAnalyticsClient() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Analytics
              </h1>
              <p className="text-muted-foreground text-sm">
                Detailed insights and analytics
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", source.color)} />
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {source.visitors.toLocaleString()} visitors
                        </span>
                        <Badge variant="secondary">{source.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Trends</CardTitle>
              <CardDescription>Visitor trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12 text-center">
                <div className="space-y-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">Chart coming soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Visual representation of traffic trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <Card key={device.device}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {device.device}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">
                      {device.count.toLocaleString()}
                    </div>
                    <div className="space-y-2">
                      <Progress value={device.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {device.percentage}% of total traffic
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Breakdown by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => {
                  const Icon = device.icon;
                  return (
                    <div key={device.device} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{device.device}</span>
                          <span className="text-sm text-muted-foreground">
                            {device.count.toLocaleString()} visits
                          </span>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                      <Badge variant="secondary">{device.percentage}%</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium font-mono text-sm">{page.page}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {page.views.toLocaleString()} views
                          </span>
                          <Badge variant="outline">
                            Bounce: {page.bounceRate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
