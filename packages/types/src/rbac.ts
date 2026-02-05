// ============================================
// Role Types (Simplified)
// ============================================

export type Role = "USER" | "ADMIN" | "SUPERADMIN";

export interface RoleInfo {
  role: Role;
  label: string;
  description: string;
}

export const ROLES: Record<Role, RoleInfo> = {
  USER: {
    role: "USER",
    label: "User",
    description: "Regular user with basic access",
  },
  ADMIN: {
    role: "ADMIN",
    label: "Admin",
    description: "Administrator with management access",
  },
  SUPERADMIN: {
    role: "SUPERADMIN",
    label: "Super Admin",
    description: "Super administrator with full access",
  },
};
