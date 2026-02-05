import type {
  MockMediaFile,
  MockMediaStats,
  MediaType,
  FileSizeCategory,
} from "@repo/types";

export const mockMediaFiles: MockMediaFile[] = [
  {
    key: "images/hero-banner.jpg",
    name: "hero-banner.jpg",
    type: "image/jpeg",
    size: 2457600,
    url: "https://picsum.photos/seed/hero/1920/1080.jpg",
    uploadedAt: Date.now() - 86400000, // 1 day ago
  },
  {
    key: "images/logo.png",
    name: "logo.png",
    type: "image/png",
    size: 45678,
    url: "https://picsum.photos/seed/logo/512/512.jpg",
    uploadedAt: Date.now() - 172800000, // 2 days ago
  },
  {
    key: "images/product-shot.jpg",
    name: "product-shot.jpg",
    type: "image/jpeg",
    size: 1024000,
    url: "https://picsum.photos/seed/product/800/600.jpg",
    uploadedAt: Date.now() - 259200000, // 3 days ago
  },
  {
    key: "documents/user-guide.pdf",
    name: "user-guide.pdf",
    type: "application/pdf",
    size: 2048000,
    url: "/files/user-guide.pdf",
    uploadedAt: Date.now() - 345600000, // 4 days ago
  },
  {
    key: "images/team-photo.jpg",
    name: "team-photo.jpg",
    type: "image/jpeg",
    size: 3072000,
    url: "https://picsum.photos/seed/team/1200/800.jpg",
    uploadedAt: Date.now() - 432000000, // 5 days ago
  },
  {
    key: "videos/intro.mp4",
    name: "intro.mp4",
    type: "video/mp4",
    size: 15728640,
    url: "/videos/intro.mp4",
    uploadedAt: Date.now() - 518400000, // 6 days ago
  },
  {
    key: "images/icon.svg",
    name: "icon.svg",
    type: "image/svg+xml",
    size: 8192,
    url: "https://picsum.photos/seed/icon/256/256.jpg",
    uploadedAt: Date.now() - 604800000, // 7 days ago
  },
  {
    key: "documents/contract.docx",
    name: "contract.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 512000,
    url: "/files/contract.docx",
    uploadedAt: Date.now() - 691200000, // 8 days ago
  },
  {
    key: "images/background.jpg",
    name: "background.jpg",
    type: "image/jpeg",
    size: 1536000,
    url: "https://picsum.photos/seed/background/1920/1080.jpg",
    uploadedAt: Date.now() - 777600000, // 9 days ago
  },
  {
    key: "audio/podcast.mp3",
    name: "podcast.mp3",
    type: "audio/mpeg",
    size: 8388608,
    url: "/audio/podcast.mp3",
    uploadedAt: Date.now() - 864000000, // 10 days ago
  },
  {
    key: "images/avatar-1.jpg",
    name: "avatar-1.jpg",
    type: "image/jpeg",
    size: 65536,
    url: "https://picsum.photos/seed/avatar1/200/200.jpg",
    uploadedAt: Date.now() - 950400000, // 11 days ago
  },
  {
    key: "images/avatar-2.jpg",
    name: "avatar-2.jpg",
    type: "image/jpeg",
    size: 73728,
    url: "https://picsum.photos/seed/avatar2/200/200.jpg",
    uploadedAt: Date.now() - 1036800000, // 12 days ago
  },
  {
    key: "images/screenshot.png",
    name: "screenshot.png",
    type: "image/png",
    size: 409600,
    url: "https://picsum.photos/seed/screenshot/1280/720.jpg",
    uploadedAt: Date.now() - 1123200000, // 13 days ago
  },
  {
    key: "documents/specification.pdf",
    name: "specification.pdf",
    type: "application/pdf",
    size: 3072000,
    url: "/files/specification.pdf",
    uploadedAt: Date.now() - 1209600000, // 14 days ago
  },
  {
    key: "images/infographic.jpg",
    name: "infographic.jpg",
    type: "image/jpeg",
    size: 2048000,
    url: "https://picsum.photos/seed/infographic/1200/1800.jpg",
    uploadedAt: Date.now() - 1296000000, // 15 days ago
  },
];

export const mockMediaStats: MockMediaStats = {
  totalFiles: mockMediaFiles.length,
  totalSize: mockMediaFiles.reduce((sum, file) => sum + file.size, 0),
  imageFiles: mockMediaFiles.filter(
    (file) =>
      file.type.startsWith("image/") ||
      file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i),
  ).length,
  videoFiles: mockMediaFiles.filter(
    (file) =>
      file.type.startsWith("video/") ||
      file.name.match(/\.(mp4|avi|mov|wmv)$/i),
  ).length,
  audioFiles: mockMediaFiles.filter(
    (file) =>
      file.type.startsWith("audio/") ||
      file.name.match(/\.(mp3|wav|ogg|flac)$/i),
  ).length,
  documentFiles: mockMediaFiles.filter(
    (file) =>
      file.type.includes("document") ||
      file.type.includes("pdf") ||
      file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i),
  ).length,
  otherFiles:
    mockMediaFiles.length -
    mockMediaFiles.filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type.startsWith("audio/") ||
        file.type.includes("document") ||
        file.type.includes("pdf") ||
        file.name.match(
          /\.(jpg|jpeg|png|gif|webp|svg|mp4|avi|mov|wmv|mp3|wav|ogg|flac|pdf|doc|docx|xls|xlsx|ppt|pptx)$/i,
        ),
    ).length,
};

export const mockMediaTypes: MediaType[] = [
  {
    value: "image",
    label: "Images",
    extensions: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  },
  { value: "video", label: "Videos", extensions: ["mp4", "avi", "mov", "wmv"] },
  { value: "audio", label: "Audio", extensions: ["mp3", "wav", "ogg", "flac"] },
  {
    value: "document",
    label: "Documents",
    extensions: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
  },
  { value: "other", label: "Other", extensions: [] },
];

export const mockFileSizes: FileSizeCategory[] = [
  { label: "Small (< 1MB)", max: 1048576 },
  { label: "Medium (1MB - 10MB)", min: 1048576, max: 10485760 },
  { label: "Large (10MB - 100MB)", min: 10485760, max: 104857600 },
  { label: "Extra Large (> 100MB)", min: 104857600 },
];

export const mockRecentUploads = mockMediaFiles
  .sort((a, b) => b.uploadedAt - a.uploadedAt)
  .slice(0, 5);

export const mockLargestFiles = mockMediaFiles
  .sort((a, b) => b.size - a.size)
  .slice(0, 5);
