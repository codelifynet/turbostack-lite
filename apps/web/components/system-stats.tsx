"use client";

import { useEffect, useState, useRef } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/shadcn-ui/card";
import {
	RadialChartComponent,
	type RadialChartData,
} from "@/components/charts";
import type { SystemInfo } from "@/services/types";
import { Cpu, HardDrive, MemoryStick, Monitor } from "lucide-react";
import type { ChartConfig } from "@repo/shadcn-ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/shadcn-ui/select";

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Format uptime to human readable format
 */
function formatUptime(seconds: number): string {
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (days > 0) {
		return `${days}d ${hours}h ${minutes}m`;
	}
	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
}

/**
 * Custom hook for smooth value animation
 */
function useAnimatedValue(targetValue: number, duration: number = 800) {
	const [displayValue, setDisplayValue] = useState(targetValue);
	const animationRef = useRef<number | null>(null);
	const startValueRef = useRef(targetValue);
	const startTimeRef = useRef<number | null>(null);
	const displayValueRef = useRef(displayValue);

	// Keep ref in sync with state for access inside effect without dependency
	displayValueRef.current = displayValue;

	useEffect(() => {
		startValueRef.current = displayValueRef.current;
		startTimeRef.current = null;

		const animate = (currentTime: number) => {
			if (startTimeRef.current === null) {
				startTimeRef.current = currentTime;
			}

			const elapsed = currentTime - startTimeRef.current;
			const progress = Math.min(elapsed / duration, 1);

			// Ease out cubic
			const easeOut = 1 - Math.pow(1 - progress, 3);

			const currentValue =
				startValueRef.current + (targetValue - startValueRef.current) * easeOut;
			setDisplayValue(currentValue);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			}
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [targetValue, duration]);

	return displayValue;
}

/**
 * CPU Usage Radial Chart - Seçilen çekirdek veya ortalama
 */
function CPUUsageChart({
	systemInfo,
	selectedCore,
}: {
	systemInfo: SystemInfo;
	selectedCore: string;
}) {
	const { cpu } = systemInfo;

	// Default values if data not available
	const cores = cpu?.cores || 4;
	const usage =
		cpu?.usage && cpu.usage.length > 0 ? cpu.usage : Array(cores).fill(0);

	// Seçilen çekirdek veya ortalama
	let targetCpuUsage = 0;
	let label = "CPU";

	if (selectedCore === "average") {
		targetCpuUsage =
			usage.reduce((a: number, b: number) => a + b, 0) / usage.length;
		label = "Avg CPU";
	} else {
		const coreIndex = parseInt(selectedCore);
		if (!isNaN(coreIndex) && coreIndex >= 0 && coreIndex < usage.length) {
			targetCpuUsage = usage[coreIndex];
			label = `Core ${coreIndex + 1}`;
		} else {
			targetCpuUsage =
				usage.reduce((a: number, b: number) => a + b, 0) / usage.length;
			label = "Avg CPU";
		}
	}

	const animatedCpuUsage = useAnimatedValue(targetCpuUsage);

	const data: RadialChartData[] = [
		{
			name: "cpu",
			value: animatedCpuUsage,
			fill: "hsl(var(--chart-1))",
		},
	];

	const config = {
		cpu: {
			label: "CPU Usage",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div className="w-full h-55 flex items-center justify-center">
			<RadialChartComponent
				data={data}
				config={config}
				className="h-55 w-full max-w-55"
				startAngle={0}
				endAngle={250}
				innerRadius={70}
				outerRadius={95}
				centerValue={`${animatedCpuUsage.toFixed(1)}%`}
				centerLabel={label}
				domain={[0, 100]}
			/>
		</div>
	);
}

/**
 * RAM + Swap Usage Radial Chart - Seçilen memory tipine göre
 */
function MemoryUsageChart({
	systemInfo,
	memoryType,
}: {
	systemInfo: SystemInfo;
	memoryType: "ram" | "swap" | "total";
}) {
	const { memory } = systemInfo;

	// Default values if data not available
	const ramUsed = memory?.used || 0;
	const swapUsed = memory?.swapUsed || 0;

	const ramTotal = memory?.total || 1;
	const swapTotal = memory?.swapTotal || 0;

	let targetPercent = 0;
	let label = "Used";

	if (memoryType === "ram") {
		targetPercent = ramTotal > 0 ? (ramUsed / ramTotal) * 100 : 0;
	} else if (memoryType === "swap") {
		targetPercent = swapTotal > 0 ? (swapUsed / swapTotal) * 100 : 0;
		label = "Swap";
	} else {
		// total (RAM + Swap)
		const totalMemory = ramTotal + swapTotal;
		const totalUsed = ramUsed + swapUsed;
		targetPercent = totalMemory > 0 ? (totalUsed / totalMemory) * 100 : 0;
		label = "Used";
	}

	const animatedPercent = useAnimatedValue(targetPercent);

	const data: RadialChartData[] = [
		{
			name: "memory",
			value: animatedPercent,
			fill: "hsl(var(--chart-1))",
		},
	];

	const config = {
		memory: {
			label: "Memory Used",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div className="w-full h-55 flex items-center justify-center">
			<RadialChartComponent
				data={data}
				config={config}
				className="h-55 w-full max-w-55"
				startAngle={0}
				endAngle={250}
				innerRadius={70}
				outerRadius={95}
				centerValue={`${animatedPercent.toFixed(1)}%`}
				centerLabel={label}
				domain={[0, 100]}
			/>
		</div>
	);
}

/**
 * Disk Usage Radial Chart
 */
function DiskUsageChart({ systemInfo }: { systemInfo: SystemInfo }) {
	const { disk } = systemInfo;

	// Default values if data not available
	const used = disk?.used || 0;
	const total = disk?.total || 1;
	const targetPercent = total > 0 ? (used / total) * 100 : 0;

	const animatedPercent = useAnimatedValue(targetPercent);

	const data: RadialChartData[] = [
		{
			name: "disk",
			value: animatedPercent,
			fill: "hsl(var(--chart-1))",
		},
	];

	const config = {
		disk: {
			label: "Disk Used",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div className="w-full h-55 flex items-center justify-center">
			<RadialChartComponent
				data={data}
				config={config}
				className="h-55 w-full max-w-55"
				startAngle={0}
				endAngle={250}
				innerRadius={70}
				outerRadius={95}
				centerValue={`${animatedPercent.toFixed(1)}%`}
				centerLabel="Used"
				domain={[0, 100]}
			/>
		</div>
	);
}

/**
 * System Info Card
 */
function SystemInfoCard({ systemInfo }: { systemInfo: SystemInfo }) {
	return (
		<Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
			<CardHeader>
				<CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
					<Monitor className="h-5 w-5 text-blue-500" />
					System Information
				</CardTitle>
				<CardDescription className="text-gray-500 dark:text-gray-400">
					Hardware and system details
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">Platform</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{systemInfo.platform === "darwin"
								? "macOS"
								: systemInfo.platform || "Unknown"}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Architecture
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{systemInfo.arch || "Unknown"}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">Hostname</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{systemInfo.hostname || "Unknown"}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">Uptime</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{formatUptime(systemInfo.uptime || 0)}
						</p>
					</div>
					<div className="space-y-1 col-span-2">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							CPU Model
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
							{systemInfo.cpu?.model || "Unknown"}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							CPU Cores
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{systemInfo.cpu?.cores || 0}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Total RAM
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{formatBytes(systemInfo.memory?.total || 0)}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Total Disk
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{formatBytes(systemInfo.disk?.total || 0)}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Disk Path
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							{systemInfo.disk?.path || "/"}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * System Stats Component
 */
// Dummy data sets - 6 different states
const dummyDataSets = [
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12,
		cpu: {
			cores: 8,
			usage: [25, 30, 22, 28, 35, 20, 26, 24],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 12 * 1024 * 1024 * 1024,
			free: 20 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 1 * 1024 * 1024 * 1024,
			swapFree: 7 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 180 * 1024 * 1024 * 1024,
			free: 320 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12 + 5,
		cpu: {
			cores: 8,
			usage: [45, 52, 48, 55, 60, 42, 50, 47],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 18 * 1024 * 1024 * 1024,
			free: 14 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 2 * 1024 * 1024 * 1024,
			swapFree: 6 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 185 * 1024 * 1024 * 1024,
			free: 315 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12 + 10,
		cpu: {
			cores: 8,
			usage: [75, 82, 78, 85, 88, 72, 80, 76],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 24 * 1024 * 1024 * 1024,
			free: 8 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 3.5 * 1024 * 1024 * 1024,
			swapFree: 4.5 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 200 * 1024 * 1024 * 1024,
			free: 300 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12 + 15,
		cpu: {
			cores: 8,
			usage: [15, 22, 18, 25, 20, 12, 19, 16],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 10 * 1024 * 1024 * 1024,
			free: 22 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 0.5 * 1024 * 1024 * 1024,
			swapFree: 7.5 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 175 * 1024 * 1024 * 1024,
			free: 325 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12 + 20,
		cpu: {
			cores: 8,
			usage: [55, 62, 58, 65, 70, 52, 60, 57],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 20 * 1024 * 1024 * 1024,
			free: 12 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 2.5 * 1024 * 1024 * 1024,
			swapFree: 5.5 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 190 * 1024 * 1024 * 1024,
			free: 310 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
	{
		platform: "linux",
		arch: "x64",
		hostname: "server-prod-01",
		uptime: 86400 * 5 + 3600 * 12 + 25,
		cpu: {
			cores: 8,
			usage: [35, 42, 38, 45, 40, 32, 39, 36],
			model: "AMD EPYC 7763 64-Core Processor",
		},
		memory: {
			total: 32 * 1024 * 1024 * 1024,
			used: 16 * 1024 * 1024 * 1024,
			free: 16 * 1024 * 1024 * 1024,
			swapTotal: 8 * 1024 * 1024 * 1024,
			swapUsed: 1.5 * 1024 * 1024 * 1024,
			swapFree: 6.5 * 1024 * 1024 * 1024,
		},
		disk: {
			total: 500 * 1024 * 1024 * 1024,
			used: 188 * 1024 * 1024 * 1024,
			free: 312 * 1024 * 1024 * 1024,
			path: "/",
		},
	},
] as const;

export function SystemStats() {
	const [selectedCore, setSelectedCore] = useState<string>("average");
	const [memoryType, setMemoryType] = useState<"ram" | "swap" | "total">(
		"total",
	);
	const [dataIndex, setDataIndex] = useState(0);

	useEffect(() => {
		// Rotate through dummy data every 4 seconds
		const interval = setInterval(() => {
			setDataIndex((prev) => (prev + 1) % dummyDataSets.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	const displayInfo: SystemInfo = dummyDataSets[
		dataIndex
	] as unknown as SystemInfo;

	return (
		<div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
			{/* CPU Usage */}
			<Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 overflow-hidden">
				<CardHeader className="pb-2">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
								<Cpu className="h-5 w-5 text-blue-500" />
								CPU Usage
							</CardTitle>
							<CardDescription className="text-gray-500 dark:text-gray-400">
								{displayInfo.cpu?.cores || 0} cores
							</CardDescription>
						</div>
						<Select value={selectedCore} onValueChange={setSelectedCore}>
							<SelectTrigger className="w-30 h-8 text-xs">
								<SelectValue placeholder="Select core" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="average">Average</SelectItem>
								{Array.from({ length: displayInfo.cpu?.cores || 0 }, (_, i) => (
									<SelectItem key={`core-${i}`} value={i.toString()}>
										Core {i + 1}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent className="flex items-center justify-center p-4 pt-0">
					<CPUUsageChart systemInfo={displayInfo} selectedCore={selectedCore} />
				</CardContent>
			</Card>

			{/* RAM + Swap Usage */}
			<Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 overflow-hidden">
				<CardHeader className="pb-2">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
								<MemoryStick className="h-5 w-5 text-purple-500" />
								Memory Usage
							</CardTitle>
							<CardDescription className="text-gray-500 dark:text-gray-400">
								{memoryType === "ram"
									? "RAM"
									: memoryType === "swap"
										? "Swap"
										: "RAM + Swap"}
							</CardDescription>
						</div>
						<Select
							value={memoryType}
							onValueChange={(value) =>
								setMemoryType(value as "ram" | "swap" | "total")
							}
						>
							<SelectTrigger className="w-30 h-8 text-xs">
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ram">RAM</SelectItem>
								<SelectItem value="swap">Swap</SelectItem>
								<SelectItem value="total">RAM + Swap</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent className="flex items-center justify-center p-4 pt-0">
					<MemoryUsageChart systemInfo={displayInfo} memoryType={memoryType} />
				</CardContent>
			</Card>

			{/* Disk Usage */}
			<Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 overflow-hidden">
				<CardHeader className="pb-2">
					<CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
						<HardDrive className="h-5 w-5 text-emerald-500" />
						Disk Usage
					</CardTitle>
					<CardDescription className="text-gray-500 dark:text-gray-400">
						{formatBytes(displayInfo.disk?.total || 0)} total
					</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center p-4 pt-0">
					<DiskUsageChart systemInfo={displayInfo} />
				</CardContent>
			</Card>

			{/* System Info */}
			<SystemInfoCard systemInfo={displayInfo} />
		</div>
	);
}
