"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Badge } from "@repo/shadcn-ui/badge";
import { Progress } from "@repo/shadcn-ui/progress";
import { Loader2, BarChart3, Database, Zap, RefreshCw } from "lucide-react";

interface UsageData {
  storage: {
    used: number;
    limit: number;
    unit: string;
  };
  apiCalls: {
    used: number;
    limit: number;
    resetDate: string;
  };
  uploads: {
    used: number;
    limit: number;
    resetDate: string;
  };
  bandwidth: {
    used: number;
    limit: number;
    unit: string;
    resetDate: string;
  };
}

export function UsageTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [usageData] = useState<UsageData>({
    storage: {
      used: 2.4,
      limit: 10,
      unit: "GB",
    },
    apiCalls: {
      used: 15420,
      limit: 50000,
      resetDate: "Feb 15, 2026",
    },
    uploads: {
      used: 234,
      limit: 1000,
      resetDate: "Feb 15, 2026",
    },
    bandwidth: {
      used: 45.2,
      limit: 100,
      unit: "GB",
      resetDate: "Feb 15, 2026",
    },
  });

  useEffect(() => {
    void loadUsageData();
  }, []);

  const loadUsageData = async () => {
    try {
      setIsLoading(true);
      // TODO: Load from API
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to load usage data:", error);
      toast.error("Failed to load usage data");
    } finally {
      setIsLoading(false);
    }
  };

  const getPercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Usage & Limits
          </CardTitle>
          <CardDescription>
            Track your resource usage and available limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Storage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Storage</h3>
              </div>
              <Badge variant="secondary">
                {usageData.storage.used} / {usageData.storage.limit}{" "}
                {usageData.storage.unit}
              </Badge>
            </div>
            <Progress
              value={getPercentage(
                usageData.storage.used,
                usageData.storage.limit,
              )}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">
              {getPercentage(usageData.storage.used, usageData.storage.limit)}%
              used •{" "}
              {(usageData.storage.limit - usageData.storage.used).toFixed(1)}{" "}
              {usageData.storage.unit} remaining
            </p>
          </div>

          {/* API Calls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">API Calls</h3>
              </div>
              <Badge variant="secondary">
                {usageData.apiCalls.used.toLocaleString()} /{" "}
                {usageData.apiCalls.limit.toLocaleString()}
              </Badge>
            </div>
            <Progress
              value={getPercentage(
                usageData.apiCalls.used,
                usageData.apiCalls.limit,
              )}
              className="h-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {getPercentage(usageData.apiCalls.used, usageData.apiCalls.limit)}%
                used
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Resets on {usageData.apiCalls.resetDate}
              </span>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">File Uploads</h3>
              </div>
              <Badge variant="secondary">
                {usageData.uploads.used} / {usageData.uploads.limit}
              </Badge>
            </div>
            <Progress
              value={getPercentage(
                usageData.uploads.used,
                usageData.uploads.limit,
              )}
              className="h-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {getPercentage(usageData.uploads.used, usageData.uploads.limit)}%
                used • {usageData.uploads.limit - usageData.uploads.used}{" "}
                remaining
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Resets on {usageData.uploads.resetDate}
              </span>
            </div>
          </div>

          {/* Bandwidth */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Bandwidth</h3>
              </div>
              <Badge variant="secondary">
                {usageData.bandwidth.used} / {usageData.bandwidth.limit}{" "}
                {usageData.bandwidth.unit}
              </Badge>
            </div>
            <Progress
              value={getPercentage(
                usageData.bandwidth.used,
                usageData.bandwidth.limit,
              )}
              className="h-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {getPercentage(usageData.bandwidth.used, usageData.bandwidth.limit)}%
                used •{" "}
                {(usageData.bandwidth.limit - usageData.bandwidth.used).toFixed(
                  1,
                )}{" "}
                {usageData.bandwidth.unit} remaining
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Resets on {usageData.bandwidth.resetDate}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Notice */}
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Need more resources?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upgrade your plan to get higher limits and access to premium
                features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
