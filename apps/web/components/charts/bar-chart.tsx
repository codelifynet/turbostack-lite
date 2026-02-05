"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/shadcn-ui/chart";

export interface BarChartProps {
  data: Record<string, unknown>[];
  config: ChartConfig;
  xAxisKey: string;
  dataKeys: string[];
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  showYAxis?: boolean;
  stacked?: boolean;
  horizontal?: boolean;
  radius?: number;
  gradient?: boolean;
}

export function BarChartComponent({
  data,
  config,
  xAxisKey,
  dataKeys,
  className,
  showLegend = true,
  showGrid = true,
  showYAxis = false,
  stacked = false,
  horizontal = false,
  radius = 8,
  gradient = true,
}: BarChartProps) {
  return (
    <ChartContainer
      config={config}
      className={`${className ?? "h-[200px]"} w-full`}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
        barGap={4}
        barCategoryGap="15%"
      >
        {gradient && (
          <defs>
            {dataKeys.map((key, index) => (
              <React.Fragment key={`bar-defs-${key}`}>
                <linearGradient
                  id={`bar-gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={1}
                  />
                  <stop
                    offset="50%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.85}
                  />
                  <stop
                    offset="100%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.6}
                  />
                </linearGradient>
                <filter
                  id={`bar-shadow-${key}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="3"
                    floodColor={`var(--color-${key})`}
                    floodOpacity="0.25"
                  />
                </filter>
              </React.Fragment>
            ))}
          </defs>
        )}
        {showGrid && (
          <CartesianGrid
            vertical={!horizontal}
            horizontal={horizontal}
            strokeDasharray="4 4"
            className="stroke-gray-200 dark:stroke-zinc-800"
            strokeOpacity={0.6}
          />
        )}
        {horizontal ? (
          <>
            <YAxis
              dataKey={xAxisKey}
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
              className="text-gray-500 dark:text-gray-400"
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
              className="text-gray-500 dark:text-gray-400"
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <ChartTooltip
          cursor={{
            fill: "var(--primary)",
            fillOpacity: 0.05,
            radius: 4,
          }}
          content={
            <ChartTooltipContent
              hideLabel={horizontal}
              className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-xl rounded-xl"
            />
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
          <Bar
            key={key}
            dataKey={key}
            fill={
              gradient ? `url(#bar-gradient-${key})` : `var(--color-${key})`
            }
            radius={[radius, radius, 4, 4]}
            stackId={stacked ? "a" : undefined}
            style={{
              filter: gradient ? `url(#bar-shadow-${key})` : undefined,
              transition: "all 0.2s ease-in-out",
            }}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
