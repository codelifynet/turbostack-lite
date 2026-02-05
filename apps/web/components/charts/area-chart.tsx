"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/shadcn-ui/chart";

export interface AreaChartProps {
  data: Record<string, unknown>[];
  config: ChartConfig;
  xAxisKey: string;
  dataKeys: string[];
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  showYAxis?: boolean;
  stacked?: boolean;
  gradient?: boolean;
  curveType?: "linear" | "natural" | "monotone" | "step";
}

export function AreaChartComponent({
  data,
  config,
  xAxisKey,
  dataKeys,
  className,
  showLegend = true,
  showGrid = true,
  showYAxis = false,
  stacked = true,
  gradient = true,
  curveType = "monotone",
}: AreaChartProps) {
  return (
    <ChartContainer
      config={config}
      className={`${className ?? "h-[200px]"} w-full`}
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((key, index) => (
            <React.Fragment key={`area-defs-${key}`}>
              {/* Fill gradient - smooth fade to transparent */}
              <linearGradient
                id={`area-fill-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.6}
                />
                <stop
                  offset="40%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.02}
                />
              </linearGradient>
              {/* Stroke gradient - horizontal shine effect */}
              <linearGradient
                id={`area-stroke-${key}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="50%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.8}
                />
              </linearGradient>
              {/* Glow filter */}
              <filter
                id={`area-glow-${key}`}
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
            <ChartTooltipContent
              indicator="dot"
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
          <Area
            key={key}
            dataKey={key}
            type={curveType}
            fill={gradient ? `url(#area-fill-${key})` : `var(--color-${key})`}
            fillOpacity={1}
            stroke={
              gradient ? `url(#area-stroke-${key})` : `var(--color-${key})`
            }
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            stackId={stacked ? "a" : undefined}
            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: "white",
              fill: `var(--color-${key})`,
              className: "drop-shadow-lg",
            }}
            style={{ filter: gradient ? `url(#area-glow-${key})` : undefined }}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
