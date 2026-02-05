// ============================================
// Settings Types
// ============================================

// Media upload settings
export interface MediaUploadSettings {
  maxFileSize: number;
  maxFileCount: number;
  allowedMimeTypes: string[];
}

// ============================================
// Color Settings
// ============================================

export interface ColorSettings {
  primaryColor: string | null;
  primaryForeground: string | null;
  secondaryColor: string | null;
  secondaryForeground: string | null;
}

// ============================================
// General Settings
// ============================================

export interface GeneralSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  defaultPage: string;
}

// ============================================
// Security Settings
// ============================================

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  loginNotifications: boolean;
}

// ============================================
// Billing Types
// ============================================

export interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: string;
}
