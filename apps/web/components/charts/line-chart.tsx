"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/shadcn-ui/chart";

export interface LineChartProps {
  data: Record<string, unknown>[];
  config: ChartConfig;
  xAxisKey: string;
  dataKeys: string[];
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  showYAxis?: boolean;
  showDots?: boolean;
  curveType?: "linear" | "natural" | "monotone" | "step";
  gradient?: boolean;
}

export function LineChartComponent({
  data,
  config,
  xAxisKey,
  dataKeys,
  className,
  showLegend = true,
  showGrid = true,
  showYAxis = false,
  showDots = true,
  curveType = "monotone",
  gradient = true,
}: LineChartProps) {
  return (
    <ChartContainer
      config={config}
      className={`${className ?? "h-[200px]"} w-full`}
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
      >
        {gradient && (
          <defs>
            {dataKeys.map((key, index) => (
              <React.Fragment key={`line-defs-${key}`}>
                <linearGradient
                  id={`line-gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={1}
                  />
                  <stop
                    offset="50%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="100%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.7}
                  />
                </linearGradient>
                <filter
                  id={`line-glow-${key}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feFlood
                    floodColor={`var(--color-${key})`}
                    floodOpacity="0.3"
                  />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </React.Fragment>
            ))}
          </defs>
        )}
        {showGrid && (
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            className="stroke-gray-200 dark:stroke-zinc-800"
            strokeOpacity={0.6}
          />
        )}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
          className="text-gray-500 dark:text-gray-400"
          tickFormatter={(value) => {
            if (typeof value === "string" && value.length > 3) {
              return value.slice(0, 3);
            }
            return value;
          }}
        />
        {showYAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
            className="text-gray-500 dark:text-gray-400"
            tickFormatter={(value) => `${value}`}
          />
        )}
        <ChartTooltip
          cursor={{
            stroke: "var(--primary)",
            strokeWidth: 1,
            strokeDasharray: "4 4",
            strokeOpacity: 0.5,
          }}
          content={
            <ChartTooltipContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-xl rounded-xl" />
          }
        />
        {showLegend && (
          <ChartLegend
            content={
              <ChartLegendContent className="text-xs text-gray-600 dark:text-gray-400" />
            }
            verticalAlign="bottom"
            height={32}
          />
        )}
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            dataKey={key}
            type={curveType}
            stroke={
              gradient ? `url(#line-gradient-${key})` : `var(--color-${key})`
            }
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={
              showDots
                ? {
                    fill: `var(--color-${key})`,
                    strokeWidth: 3,
                    stroke: "white",
                    r: 5,
                    className: "drop-shadow-md transition-all duration-200",
                  }
                : false
            }
            activeDot={{
              r: 7,
              strokeWidth: 3,
              stroke: "white",
              fill: `var(--color-${key})`,
              className: "drop-shadow-lg",
              style: {
                filter: gradient ? `url(#line-glow-${key})` : undefined,
              },
            }}
            style={{
              filter: gradient
                ? `drop-shadow(0 2px 4px var(--color-${key}))`
                : undefined,
            }}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
