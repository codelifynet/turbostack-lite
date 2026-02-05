// ============================================
// Upload Types
// ============================================

export interface UploadResult {
  url: string;
  key: string;
  name: string;
  size: number;
}

// Media service types
export interface MediaFile {
  key: string;
  name: string;
  size: number;
  uploadedAt: number;
  url: string;
  type: string;
  customId?: string | null;
}

export interface MediaListResponse {
  files: MediaFile[];
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// Frontend Panel Types
// ============================================

export interface MediaStats {
  totalFiles: number;
  totalSize: number;
  imageFiles: number;
  otherFiles: number;
}

// Mock Types
export interface MockMediaFile {
  key: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: number;
}

export interface MockMediaStats {
  totalFiles: number;
  totalSize: number;
  imageFiles: number;
  videoFiles: number;
  audioFiles: number;
  documentFiles: number;
  otherFiles: number;
}

export interface MediaType {
  value: string;
  label: string;
  extensions: string[];
}

export interface FileSizeCategory {
  label: string;
  max?: number;
  min?: number;
}
