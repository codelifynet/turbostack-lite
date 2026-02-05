"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell, Sector } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/shadcn-ui/chart";

export interface PieChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  config: ChartConfig;
  className?: string;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  showLabel?: boolean;
  centerLabel?: string;
  centerValue?: string | number;
}

export function PieChartComponent({
  data,
  config,
  className,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 90,
  showLabel = false,
  centerLabel,
  centerValue,
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  );

  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: unknown) => {
    const typedProps = props as {
      cx: number;
      cy: number;
      innerRadius: number;
      outerRadius: number;
      startAngle: number;
      endAngle: number;
      fill: string;
    };

    return (
      <g>
        <Sector
          cx={typedProps.cx}
          cy={typedProps.cy}
          innerRadius={typedProps.innerRadius - 2}
          outerRadius={typedProps.outerRadius + 10}
          startAngle={typedProps.startAngle}
          endAngle={typedProps.endAngle}
          fill={typedProps.fill}
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </g>
    );
  };

  return (
    <ChartContainer
      config={config}
      className={`${className ?? "aspect-square max-h-[250px]"} mx-auto`}
    >
      <PieChart>
        <defs>
          {data.map((entry, index) => (
            <React.Fragment key={`pie-defs-${index}`}>
              <linearGradient
                id={`pie-gradient-${entry.name}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={entry.fill || `var(--color-${entry.name})`}
                  stopOpacity={1}
                />
                <stop
                  offset="50%"
                  stopColor={entry.fill || `var(--color-${entry.name})`}
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor={entry.fill || `var(--color-${entry.name})`}
                  stopOpacity={0.75}
                />
              </linearGradient>
              <filter
                id={`pie-glow-${entry.name}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feFlood
                  floodColor={entry.fill || `var(--color-${entry.name})`}
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
          <filter id="pie-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
          </filter>
          <filter
            id="pie-inner-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-xl rounded-xl"
            />
          }
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          strokeWidth={3}
          stroke="white"
          paddingAngle={4}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          style={{ filter: "url(#pie-shadow)" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#pie-gradient-${entry.name})`}
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
            />
          ))}
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
                      style={{ filter: "url(#pie-inner-shadow)" }}
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-gray-900 dark:fill-white text-3xl font-bold"
                      >
                        {centerValue ?? total.toLocaleString()}
                      </tspan>
                      {centerLabel && (
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 28}
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
        </Pie>
        {showLegend && (
          <ChartLegend
            content={
              <ChartLegendContent
                nameKey="name"
                className="text-gray-600 dark:text-gray-400"
              />
            }
          />
        )}
      </PieChart>
    </ChartContainer>
  );
}
