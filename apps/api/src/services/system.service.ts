import { exec } from "child_process";
import { promisify } from "util";
import * as os from "os";
import { AppError } from "@api/lib/errors";
import type { CPUInfo, MemoryInfo, DiskInfo, SystemInfo } from "@repo/types";

const execAsync = promisify(exec);

async function getCPUInfo(): Promise<CPUInfo> {
  const platform = os.platform();
  const cores = os.cpus().length;
  const model = os.cpus()[0]?.model || "Unknown";

  const usage: number[] = [];

  try {
    if (platform === "darwin") {
      const { stdout } = await execAsync("top -l 1 | grep 'CPU usage'");
      const match = stdout.match(/(\d+\.\d+)%/g);
      if (match) {
        const totalUsage = parseFloat(match[0]?.replace("%", "") || "0");
        for (let i = 0; i < cores; i++) {
          usage.push(totalUsage / cores);
        }
      } else {
        const loadAvg = os.loadavg()[0] || 0;
        const usagePercent = Math.min((loadAvg / cores) * 100, 100);
        for (let i = 0; i < cores; i++) {
          usage.push(usagePercent);
        }
      }
    } else {
      const { stdout } = await execAsync("cat /proc/stat | head -1");
      const parts = stdout.trim().split(/\s+/);
      if (parts.length >= 8) {
        const user = parseInt(parts[1] || "0") || 0;
        const nice = parseInt(parts[2] || "0") || 0;
        const system = parseInt(parts[3] || "0") || 0;
        const idle = parseInt(parts[4] || "0") || 0;
        const iowait = parseInt(parts[5] || "0") || 0;
        const irq = parseInt(parts[6] || "0") || 0;
        const softirq = parseInt(parts[7] || "0") || 0;

        const total = user + nice + system + idle + iowait + irq + softirq;
        const used = total - idle;
        const usagePercent = total > 0 ? (used / total) * 100 : 0;

        for (let i = 0; i < cores; i++) {
          usage.push(usagePercent);
        }
      } else {
        const loadAvg = os.loadavg()[0] || 0;
        const usagePercent = Math.min((loadAvg / cores) * 100, 100);
        for (let i = 0; i < cores; i++) {
          usage.push(usagePercent);
        }
      }
    }
  } catch (error) {
    const loadAvg = os.loadavg()[0] || 0;
    const usagePercent = Math.min((loadAvg / cores) * 100, 100);
    for (let i = 0; i < cores; i++) {
      usage.push(usagePercent);
    }
  }

  return {
    cores,
    usage: usage.map((u) => Math.round(u * 100) / 100),
    model,
  };
}

async function getMemoryInfo(): Promise<MemoryInfo> {
  const platform = os.platform();
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  let swapTotal = 0;
  let swapUsed = 0;
  let swapFree = 0;

  try {
    if (platform === "darwin") {
      const { stdout } = await execAsync("vm_stat");
      const swapMatch = stdout.match(/Swapins:\s+(\d+)/);
      if (swapMatch) {
        swapTotal = total;
        swapUsed = 0;
        swapFree = swapTotal;
      }
    } else {
      const { stdout } = await execAsync("cat /proc/meminfo");
      const swapTotalMatch = stdout.match(/SwapTotal:\s+(\d+)\s+kB/);
      const swapFreeMatch = stdout.match(/SwapFree:\s+(\d+)\s+kB/);

      if (swapTotalMatch && swapTotalMatch[1]) {
        swapTotal = parseInt(swapTotalMatch[1]) * 1024;
      }
      if (swapFreeMatch && swapFreeMatch[1]) {
        swapFree = parseInt(swapFreeMatch[1]) * 1024;
      }
      swapUsed = swapTotal - swapFree;
    }
  } catch (error) {
    swapTotal = 0;
    swapUsed = 0;
    swapFree = 0;
  }

  return {
    total,
    used,
    free,
    swapTotal,
    swapUsed,
    swapFree,
  };
}

async function getDiskInfo(): Promise<DiskInfo> {
  const platform = os.platform();
  const path = platform === "darwin" ? "/" : "/";

  try {
    if (platform === "darwin") {
      const { stdout } = await execAsync("df -k / | tail -1");
      const parts = stdout.trim().split(/\s+/);
      if (parts.length >= 4) {
        const total = parseInt(parts[1] || "0") * 1024;
        const used = parseInt(parts[2] || "0") * 1024;
        const free = parseInt(parts[3] || "0") * 1024;

        return {
          total,
          used,
          free,
          path: "/",
        };
      }
    } else {
      const { stdout } = await execAsync("df -B1 / | tail -1");
      const parts = stdout.trim().split(/\s+/);
      if (parts.length >= 4) {
        const total = parseInt(parts[1] || "0") || 0;
        const used = parseInt(parts[2] || "0") || 0;
        const free = parseInt(parts[3] || "0") || 0;

        return {
          total,
          used,
          free,
          path: "/",
        };
      }
    }
  } catch (error) {
    const total = os.totalmem() * 10;
    const used = total * 0.5;
    const free = total - used;

    return {
      total,
      used,
      free,
      path: "/",
    };
  }

  return {
    total: 0,
    used: 0,
    free: 0,
    path: "/",
  };
}

export async function getSystemInfo(): Promise<SystemInfo> {
  try {
    const [cpu, memory, disk] = await Promise.all([
      getCPUInfo(),
      getMemoryInfo(),
      getDiskInfo(),
    ]);

    return {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      uptime: os.uptime(),
      cpu,
      memory,
      disk,
    };
  } catch (error) {
    console.error("Error fetching system info:", error);
    throw new AppError(
      "SYSTEM_ERROR",
      "Failed to fetch system information",
      500,
    );
  }
}
