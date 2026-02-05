"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/ui/card";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Badge } from "@repo/shadcn-ui/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Share2,
  MoreHorizontal,
  Zap,
  Database,
  Users,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the last 30 days
const generateMockData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      apiCalls: Math.floor(Math.random() * 5000) + 8000,
      bandwidth: Math.floor(Math.random() * 20) + 40,
      storage: Math.floor(Math.random() * 5) + 75,
      users: Math.floor(Math.random() * 50) + 200,
    });
  }
  return data;
};

const chartData = generateMockData();

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

const metrics = [
  {
    key: "apiCalls",
    label: "API Calls",
    color: "#3b82f6",
    gradientFrom: "#3b82f6",
    gradientTo: "#60a5fa",
    unit: "calls",
    icon: Zap,
  },
  {
    key: "bandwidth",
    label: "Bandwidth",
    color: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#34d399",
    unit: "GB",
    icon: Globe,
  },
  {
    key: "storage",
    label: "Storage",
    color: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#fbbf24",
    unit: "GB",
    icon: Database,
  },
  {
    key: "users",
    label: "Active Users",
    color: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#a78bfa",
    unit: "users",
    icon: Users,
  },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-4 min-w-[240px]">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          {label}
        </p>
        <div className="space-y-2">
          {payload.map((entry) => {
            const metric = metrics.find((m) => m.key === entry.dataKey);
            return (
              <div
                key={entry.dataKey}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {metric?.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {entry.value.toLocaleString()} {metric?.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium",
            trend === "up"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400",
          )}
        >
          {trend === "up" ? (
            <ArrowUpRight className="w-3 h-3 mr-1" />
          ) : (
            <ArrowDownRight className="w-3 h-3 mr-1" />
          )}
          {change}
        </Badge>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}

export function UsageTrendsChart() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "apiCalls",
    "bandwidth",
  ]);
  const [timeRange, setTimeRange] = useState("30d");

  const toggleMetric = (key: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key],
    );
  };

  // Calculate stats
  const latestData = chartData[chartData.length - 1];
  const previousData = chartData[chartData.length - 2];

  const stats = [
    {
      title: "Total API Calls",
      value: "247.3K",
      change: "+12.5%",
      trend: "up" as const,
      icon: Zap,
      color: "#3b82f6",
    },
    {
      title: "Bandwidth Used",
      value: "1.8 TB",
      change: "+8.2%",
      trend: "up" as const,
      icon: Globe,
      color: "#10b981",
    },
    {
      title: "Avg. Response Time",
      value: "124ms",
      change: "-15.3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "#f59e0b",
    },
    {
      title: "Active Users",
      value: "1,429",
      change: "+23.1%",
      trend: "up" as const,
      icon: Users,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Chart Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-r from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Usage Trends
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Resource consumption over the last 30 days
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[160px] h-9">
                  <Calendar className="w-4 h-4 mr-2 text-zinc-500 shrink-0" />
                  <SelectValue className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Metric Toggles */}
          <div className="flex flex-wrap gap-2 mb-6">
            {metrics.map((metric) => {
              const isSelected = selectedMetrics.includes(metric.key);
              const Icon = metric.icon;
              return (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() => toggleMetric(metric.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    isSelected
                      ? "text-white shadow-md"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700",
                  )}
                  style={{
                    backgroundColor: isSelected ? metric.color : undefined,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {metric.label}
                </button>
              );
            })}
          </div>

          {/* Chart */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  {metrics.map((metric) => (
                    <linearGradient
                      key={metric.key}
                      id={`gradient-${metric.key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={metric.gradientFrom}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={metric.gradientTo}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e4e4e7"
                  vertical={false}
                  className="dark:stroke-zinc-700"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  dy={10}
                  minTickGap={30}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                />
                {selectedMetrics.map((key) => {
                  const metric = metrics.find((m) => m.key === key);
                  if (!metric) return null;
                  return (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      name={metric.label}
                      stroke={metric.color}
                      strokeWidth={2}
                      fill={`url(#gradient-${key})`}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                      dot={{ r: 0 }}
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Footer */}
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Peak Usage
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Jan 15 - 12.4K API calls
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                  <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Lowest Usage
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Jan 08 - 8.2K API calls
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/30">
                  <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Avg. Daily
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    10.3K API calls/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
