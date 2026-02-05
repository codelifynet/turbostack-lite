/**
 * Color utility functions for converting between HEX and OKLCH
 */

/**
 * Convert HEX color to OKLCH format
 * Note: This is a simplified conversion. For production, consider using a library like culori
 */
export function hexToOklch(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to Linear RGB
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  // Convert Linear RGB to XYZ
  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175;
  const z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041;

  // Normalize XYZ
  const xNorm = x / 0.95047;
  const zNorm = z / 1.08883;

  // Convert XYZ to Lab
  const fx = xNorm > 0.008856 ? Math.cbrt(xNorm) : 7.787 * xNorm + 16 / 116;
  const fy = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
  const fz = zNorm > 0.008856 ? Math.cbrt(zNorm) : 7.787 * zNorm + 16 / 116;

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bLab = 200 * (fy - fz);

  // Convert Lab to OKLab (simplified)
  const lOk = l / 100;
  const aOk = a / 100;
  const bOk = bLab / 100;

  // Convert OKLab to OKLCH
  const c = Math.sqrt(aOk * aOk + bOk * bOk);
  const h = Math.atan2(bOk, aOk) * (180 / Math.PI);
  const hNormalized = h < 0 ? h + 360 : h;

  // Format OKLCH
  return `oklch(${lOk.toFixed(3)} ${c.toFixed(3)} ${hNormalized.toFixed(1)})`;
}

/**
 * Convert OKLCH to HEX (simplified - for display purposes)
 * Note: This is a simplified conversion. For production, consider using a library like culori
 */
export function oklchToHex(oklch: string): string {
  // Parse OKLCH: oklch(L C H)
  const match = oklch.match(/oklch\(([^)]+)\)/);
  if (!match || !match[1]) return "#000000";

  const values = match[1].trim().split(/\s+/);
  const l = parseFloat(values[0] || "0") || 0;
  const c = parseFloat(values[1] || "0") || 0;
  const h = parseFloat(values[2] || "0") || 0;

  // Convert OKLCH to RGB (simplified)
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const bOk = c * Math.sin(hRad);

  // Convert to linear RGB (simplified)
  const rLinear = l + 0.3963377774 * a + 0.2158037573 * bOk;
  const gLinear = l - 0.1055613458 * a - 0.0638541728 * bOk;
  const bLinear = l - 0.0894841775 * a - 1.291485548 * bOk;

  // Convert linear RGB to RGB
  const toSRGB = (c: number) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  const r = Math.max(0, Math.min(1, toSRGB(rLinear)));
  const g = Math.max(0, Math.min(1, toSRGB(gLinear)));
  const blue = Math.max(0, Math.min(1, toSRGB(bLinear)));

  // Convert to HEX
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(blue)}`;
}

/**
 * Preset color options for quick selection
 */
export const PRESET_COLORS = [
  { name: "Violet", hex: "#8b5cf6", oklch: "oklch(0.55 0.25 280)" },
  { name: "Blue", hex: "#3b82f6", oklch: "oklch(0.55 0.2 250)" },
  { name: "Green", hex: "#10b981", oklch: "oklch(0.65 0.15 150)" },
  { name: "Red", hex: "#ef4444", oklch: "oklch(0.577 0.245 27.325)" },
  { name: "Orange", hex: "#f97316", oklch: "oklch(0.65 0.2 50)" },
  { name: "Pink", hex: "#ec4899", oklch: "oklch(0.6 0.2 330)" },
  { name: "Purple", hex: "#a855f7", oklch: "oklch(0.6 0.25 300)" },
  { name: "Teal", hex: "#14b8a6", oklch: "oklch(0.65 0.15 180)" },
] as const;
