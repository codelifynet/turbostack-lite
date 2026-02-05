// ============================================
// System Types
// ============================================

export interface CPUInfo {
  cores: number;
  usage: number[];
  model: string;
}

export interface MemoryInfo {
  total: number;
  used: number;
  free: number;
  swapTotal: number;
  swapUsed: number;
  swapFree: number;
}

export interface DiskInfo {
  total: number;
  used: number;
  free: number;
  path: string;
}

export interface SystemInfo {
  platform: string;
  arch: string;
  hostname: string;
  uptime: number;
  cpu: CPUInfo;
  memory: MemoryInfo;
  disk: DiskInfo;
}
