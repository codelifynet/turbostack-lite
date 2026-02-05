/**
 * Application constants
 * Centralized configuration values
 */

// Rate limiting defaults
export const RATE_LIMIT = {
  GLOBAL: {
    duration: 60000, // 1 minute
    max: 100, // 100 requests per minute
  },
  AUTH: {
    duration: 60000, // 1 minute
    max: 10, // 10 requests per minute for auth endpoints
  },
  STRICT: {
    duration: 60000, // 1 minute
    max: 5, // 5 requests per minute for sensitive operations
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_OFFSET: 0,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

// Polar API Configuration
export const POLAR_API = {
  PRODUCTION_URL: "https://api.polar.sh/v1",
  SANDBOX_URL: "https://sandbox-api.polar.sh/v1",
  getApiUrl: () => {
    return process.env.NODE_ENV === "production"
      ? POLAR_API.PRODUCTION_URL
      : POLAR_API.SANDBOX_URL;
  },
} as const;

// OpenRouter API Configuration
export const OPENROUTER_API = {
  BASE_URL: "https://openrouter.ai/api/v1",
  CHAT_COMPLETIONS: "/chat/completions",
  MODELS: "/models",
} as const;

// OpenRouter Image Model Patterns
export const OPENROUTER_IMAGE_MODEL_PATTERNS = [
  "dall-e",
  "image",
  "flux",
  "stable-diffusion",
  "sdxl",
  "midjourney",
  "imagen",
  "ideogram",
  "playground",
  "leonardo",
  "dreamshaper",
  "kandinsky",
  "openjourney",
  "deliberate",
  "realistic-vision",
  "gemini-2.0-flash-exp", // Gemini with image output
  "gemini-2.5-flash-image", // Gemini image models
  "gpt-image", // OpenAI image models
] as const;

// Content Type Labels
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  blog: "blog post",
  article: "article",
  product: "product description",
  social: "social media post",
} as const;

// Image Style Prompts
export const IMAGE_STYLE_PROMPTS: Record<string, string> = {
  realistic: "photorealistic, highly detailed, professional photography",
  artistic: "artistic, creative, expressive brushstrokes",
  anime: "anime style, vibrant colors, Japanese animation",
  "3d": "3D render, CGI, ray tracing, realistic lighting",
  "digital-art": "digital art, illustration, modern style",
  watercolor: "watercolor painting, soft colors, artistic",
} as const;

// Image Aspect Ratio Map
export const IMAGE_ASPECT_RATIO_MAP: Record<string, string> = {
  "1:1": "1:1",
  "16:9": "16:9",
  "9:16": "9:16",
} as const;

// Media Upload Default Settings
export const MEDIA_UPLOAD_DEFAULTS = {
  MAX_FILE_SIZE: 4, // MB
  MAX_FILE_COUNT: 10,
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
} as const;

// File Upload Limits
export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_MB: 10, // 10MB
  MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB in bytes
} as const;

// AI Model Default Settings
export const AI_MODEL_DEFAULTS = {
  DEFAULT_LIMIT: 50, // Default limit for AI model listings
} as const;

// Default AI Models for Seeding
export const DEFAULT_AI_MODELS = [
  {
    name: "GPT-4o",
    provider: "openrouter",
    modelId: "openai/gpt-4o",
    description: "Most capable GPT-4 model with vision",
    contextSize: 128000,
    pricing: { inputPerMillion: 2.5, outputPerMillion: 10 },
    capabilities: ["chat", "vision", "function_calling", "json_mode"],
  },
  {
    name: "GPT-4o Mini",
    provider: "openrouter",
    modelId: "openai/gpt-4o-mini",
    description: "Smaller, faster, cheaper GPT-4o",
    contextSize: 128000,
    pricing: { inputPerMillion: 0.15, outputPerMillion: 0.6 },
    capabilities: ["chat", "vision", "function_calling", "json_mode"],
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "openrouter",
    modelId: "anthropic/claude-3.5-sonnet",
    description: "Anthropic's most intelligent model",
    contextSize: 200000,
    pricing: { inputPerMillion: 3, outputPerMillion: 15 },
    capabilities: ["chat", "vision", "function_calling"],
  },
  {
    name: "Gemini 2.0 Flash",
    provider: "openrouter",
    modelId: "google/gemini-2.0-flash-001",
    description: "Google's fast multimodal model",
    contextSize: 1000000,
    pricing: { inputPerMillion: 0.1, outputPerMillion: 0.4 },
    capabilities: ["chat", "vision", "function_calling"],
  },
] as const;
