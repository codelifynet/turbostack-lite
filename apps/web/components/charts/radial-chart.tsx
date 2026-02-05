"use client";

import * as React from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/shadcn-ui/chart";

export interface RadialChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface RadialChartProps {
  data: RadialChartData[];
  config: ChartConfig;
  className?: string;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  centerLabel?: string;
  centerValue?: string | number;
}

export function RadialChartComponent({
  data,
  config,
  className,
  startAngle = 0,
  endAngle = 250,
  innerRadius = 80,
  outerRadius = 110,
  centerLabel,
  centerValue,
}: RadialChartProps) {
  const firstDataKey = data[0]?.name || "value";

  return (
    <ChartContainer
      config={config}
      className={`${className ?? "aspect-square max-h-[220px]"} mx-auto`}
    >
      <RadialBarChart
        data={data}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <defs>
          <linearGradient
            id={`radial-gradient-${firstDataKey}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={`var(--color-${firstDataKey})`}
              stopOpacity={1}
            />
            <stop
              offset="50%"
              stopColor={`var(--color-${firstDataKey})`}
              stopOpacity={0.9}
            />
            <stop
              offset="100%"
              stopColor={`var(--color-${firstDataKey})`}
              stopOpacity={0.7}
            />
          </linearGradient>
          <filter
            id={`radial-glow-${firstDataKey}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood
              floodColor={`var(--color-${firstDataKey})`}
              floodOpacity="0.4"
            />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="radial-inner-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              nameKey="name"
              className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-xl rounded-xl"
            />
          }
        />
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-gray-100 dark:first:fill-zinc-800/50 last:fill-white dark:last:fill-zinc-900"
          polarRadius={[innerRadius + 10, innerRadius - 10]}
        />
        <RadialBar
          dataKey="value"
          background={{
            fill: "var(--muted)",
            opacity: 0.2,
            className: "dark:opacity-30",
          }}
          cornerRadius={14}
          fill={`url(#radial-gradient-${firstDataKey})`}
          style={{ filter: `url(#radial-glow-${firstDataKey})` }}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          {(centerLabel || centerValue) && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ filter: "url(#radial-inner-shadow)" }}
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-gray-900 dark:fill-white text-4xl font-bold"
                      >
                        {centerValue ?? data[0]?.value?.toLocaleString()}
                      </tspan>
                      {centerLabel && (
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-gray-500 dark:fill-gray-400 text-sm font-medium"
                        >
                          {centerLabel}
                        </tspan>
                      )}
                    </text>
                  );
                }
              }}
            />
          )}
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
