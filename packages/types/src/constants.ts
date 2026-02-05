// ============================================
// API Endpoints
// ============================================

export const AUTH_ENDPOINTS = {
  get signUp() {
    return "/api/auth/sign-up/email";
  },
  get signIn() {
    return "/api/auth/sign-in/email";
  },
  get signOut() {
    return "/api/auth/sign-out";
  },

  get socialSignIn() {
    return "/api/auth/sign-in/social";
  },

  oauthGoogleStart: "/api/auth/oauth/google/start",
  oauthGithubStart: "/api/auth/oauth/github/start",
  oauthCallback: (provider: string) => `/api/auth/oauth/${provider}/callback`,

  get session() {
    return "/api/auth/get-session";
  },

  get forgotPassword() {
    return "/api/auth/forgot-password"; // Better Auth uses "forgot-password" not "forgot-password"
  },
  get resetPassword() {
    return "/api/auth/reset-password";
  },

  get verifyEmail() {
    return "/api/auth/verify-email";
  },
  get resendVerification() {
    return "/api/auth/send-verification-email";
  },

  register: "/auth/register",
  login: "/auth/login",
} as const;

export const USER_ENDPOINTS = {
  me: "/users/me",
  settings: "/users/me/settings",
  updateProfile: "/users/me",
  updatePassword: "/users/me/password",
  list: "/users",
  byId: (id: string) => `/users/${id}`,
} as const;

export const HEALTH_ENDPOINTS = {
  status: "/health",
  ready: "/health/ready",
  live: "/health/live",
} as const;

export const POLAR_ENDPOINTS = {
  products: "/polar/products",
  checkout: "/polar/checkout",
} as const;

export const WEBHOOK_ENDPOINTS = {
  polar: "/webhooks/polar",
} as const;

export const POLAR_DEFAULTS = {
  productsLimit: 10,
  isArchived: false,
  page: 1,
} as const;

export const AUTH = {
  ACCESS_TOKEN_TTL: "5m",
  REFRESH_TOKEN_TTL: "5d",

  ACCESS_TOKEN_TTL_SECONDS: 60,
  REFRESH_TOKEN_TTL_SECONDS: 24 * 60 * 60,
  SESSION_TOKEN_TTL_SECONDS: 24 * 60 * 60,
} as const;

export const PANEL_DASHBOARD_STATS = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    description: "from last month",
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    change: "+180.1%",
    trend: "up" as const,
    description: "from last month",
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    trend: "up" as const,
    description: "from last month",
  },
  {
    title: "Active Now",
    value: "+573",
    change: "-2%",
    trend: "down" as const,
    description: "from last hour",
  },
] as const;

export const PANEL_RECENT_ACTIVITY = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new account",
    time: "2 minutes ago",
    status: "success" as const,
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Purchased Pro Plan",
    time: "15 minutes ago",
    status: "success" as const,
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Updated profile",
    time: "1 hour ago",
    status: "info" as const,
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "Submitted support ticket",
    time: "2 hours ago",
    status: "warning" as const,
  },
  {
    id: 5,
    user: "Chris Brown",
    action: "Cancelled subscription",
    time: "5 hours ago",
    status: "error" as const,
  },
] as const;

export const PANEL_TOP_PRODUCTS = [
  { name: "Premium Plan", sales: 1234, revenue: "$12,340" },
  { name: "Basic Plan", sales: 987, revenue: "$4,935" },
  { name: "Enterprise Plan", sales: 456, revenue: "$45,600" },
  { name: "Starter Pack", sales: 321, revenue: "$1,605" },
] as const;

export const PANEL_ANALYTICS_DATA = [
  {
    title: "Page Views",
    value: "124,892",
    change: "+12.5%",
    trend: "up" as const,
  },
  {
    title: "Unique Visitors",
    value: "45,234",
    change: "+8.2%",
    trend: "up" as const,
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: "-2.1%",
    trend: "down" as const,
  },
  {
    title: "Bounce Rate",
    value: "32.4%",
    change: "-5.3%",
    trend: "up" as const,
  },
] as const;

export const PANEL_TOP_PAGES = [
  { page: "/", views: 45234, percentage: 36 },
  { page: "/products", views: 23456, percentage: 19 },
  { page: "/about", views: 12345, percentage: 10 },
  { page: "/contact", views: 8765, percentage: 7 },
  { page: "/blog", views: 7654, percentage: 6 },
] as const;

export const PANEL_TRAFFIC_SOURCES = [
  { source: "Organic Search", visitors: 23456, percentage: 45 },
  { source: "Direct", visitors: 15678, percentage: 30 },
  { source: "Social Media", visitors: 8901, percentage: 17 },
  { source: "Referral", visitors: 4123, percentage: 8 },
] as const;

export const PANEL_CONTENT_ITEMS = [
  {
    id: 1,
    title: "Getting Started with TurboStack",
    type: "blog" as const,
    status: "published" as const,
    author: "John Doe",
    createdAt: "2024-01-15",
    views: 1234,
    category: "Tutorial",
  },
  {
    id: 2,
    title: "API Best Practices",
    type: "blog" as const,
    status: "draft" as const,
    author: "Jane Smith",
    createdAt: "2024-01-20",
    views: 0,
    category: "Guide",
  },
  {
    id: 3,
    title: "Welcome to TurboStack",
    type: "page" as const,
    status: "published" as const,
    author: "Admin",
    createdAt: "2024-01-10",
    views: 5678,
    category: "Page",
  },
  {
    id: 4,
    title: "Product Documentation",
    type: "page" as const,
    status: "published" as const,
    author: "Admin",
    createdAt: "2024-01-12",
    views: 2345,
    category: "Documentation",
  },
  {
    id: 5,
    title: "Security Guidelines",
    type: "blog" as const,
    status: "published" as const,
    author: "Mike Johnson",
    createdAt: "2024-01-18",
    views: 890,
    category: "Security",
  },
] as const;

export const PANEL_MEDIA_ITEMS = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image" as const,
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    url: "/images/hero-image.jpg",
  },
  {
    id: 2,
    name: "logo.svg",
    type: "image" as const,
    size: "45 KB",
    uploadedAt: "2024-01-10",
    url: "/images/logo.svg",
  },
  {
    id: 3,
    name: "documentation.pdf",
    type: "file" as const,
    size: "1.2 MB",
    uploadedAt: "2024-01-12",
    url: "/files/documentation.pdf",
  },
] as const;

export const PANEL_INBOX_MESSAGES = [
  {
    id: 1,
    from: "john.doe@example.com",
    fromName: "John Doe",
    subject: "Question about API integration",
    preview:
      "Hi, I'm having trouble integrating your API with my application...",
    date: "2024-01-20 14:30",
    read: false,
    starred: false,
    category: "support",
  },
  {
    id: 2,
    from: "jane.smith@example.com",
    fromName: "Jane Smith",
    subject: "Feature request: Dark mode",
    preview: "Would it be possible to add a dark mode option?",
    date: "2024-01-20 12:15",
    read: true,
    starred: true,
    category: "feature",
  },
  {
    id: 3,
    from: "support@example.com",
    fromName: "Support Team",
    subject: "Your account has been verified",
    preview: "Congratulations! Your account verification is complete.",
    date: "2024-01-19 09:45",
    read: true,
    starred: false,
    category: "system",
  },
  {
    id: 4,
    from: "mike.johnson@example.com",
    fromName: "Mike Johnson",
    subject: "Partnership inquiry",
    preview: "I'm interested in discussing a potential partnership...",
    date: "2024-01-18 16:20",
    read: false,
    starred: false,
    category: "business",
  },
] as const;

export const PANEL_SENT_MESSAGES = [
  {
    id: 1,
    to: "john.doe@example.com",
    toName: "John Doe",
    subject: "Re: Question about API integration",
    preview: "Thank you for reaching out. Here's how you can integrate...",
    date: "2024-01-20 15:00",
    status: "sent",
  },
  {
    id: 2,
    to: "team@example.com",
    toName: "Team",
    subject: "Weekly update",
    preview: "Here's what we accomplished this week...",
    date: "2024-01-19 10:00",
    status: "sent",
  },
] as const;

export const PANEL_DRAFT_MESSAGES = [
  {
    id: 1,
    to: "jane.smith@example.com",
    toName: "Jane Smith",
    subject: "Re: Feature request: Dark mode",
    preview: "Thank you for your suggestion. We're considering...",
    date: "2024-01-20 13:00",
  },
] as const;

export const PANEL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success" as const,
    title: "Payment received",
    message: "A payment of $99.00 has been successfully processed.",
    time: "2 minutes ago",
    read: false,
    category: "payment",
  },
  {
    id: 2,
    type: "info" as const,
    title: "New user registered",
    message: "John Doe has created a new account.",
    time: "15 minutes ago",
    read: false,
    category: "user",
  },
  {
    id: 3,
    type: "warning" as const,
    title: "Low inventory",
    message: "Product 'Premium Plan' is running low on stock.",
    time: "1 hour ago",
    read: true,
    category: "inventory",
  },
  {
    id: 4,
    type: "error" as const,
    title: "API rate limit warning",
    message: "You're approaching your API rate limit (85% used).",
    time: "2 hours ago",
    read: true,
    category: "system",
  },
  {
    id: 5,
    type: "success" as const,
    title: "Backup completed",
    message: "Daily backup has been successfully completed.",
    time: "3 hours ago",
    read: true,
    category: "system",
  },
  {
    id: 6,
    type: "info" as const,
    title: "System update available",
    message: "A new system update is available for installation.",
    time: "5 hours ago",
    read: true,
    category: "system",
  },
] as const;

export const PANEL_AUDIT_LOGS = [
  {
    id: 1,
    action: "Login",
    user: "john.doe@example.com",
    ip: "192.168.1.100",
    location: "Istanbul, Turkey",
    device: "Chrome on Windows",
    status: "success" as const,
    timestamp: "2024-01-20 14:30:25",
  },
  {
    id: 2,
    action: "Failed login",
    user: "unknown@example.com",
    ip: "192.168.1.101",
    location: "Unknown",
    device: "Firefox on Linux",
    status: "failed" as const,
    timestamp: "2024-01-20 14:25:10",
  },
  {
    id: 3,
    action: "Password changed",
    user: "jane.smith@example.com",
    ip: "192.168.1.102",
    location: "Ankara, Turkey",
    device: "Safari on macOS",
    status: "success" as const,
    timestamp: "2024-01-20 13:15:45",
  },
  {
    id: 4,
    action: "API key created",
    user: "admin@example.com",
    ip: "192.168.1.103",
    location: "Izmir, Turkey",
    device: "Chrome on macOS",
    status: "success" as const,
    timestamp: "2024-01-20 12:00:00",
  },
  {
    id: 5,
    action: "Permission denied",
    user: "user@example.com",
    ip: "192.168.1.104",
    location: "Bursa, Turkey",
    device: "Edge on Windows",
    status: "failed" as const,
    timestamp: "2024-01-20 11:30:20",
  },
] as const;

export const PANEL_ACTIVE_SESSIONS = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Istanbul, Turkey",
    ip: "192.168.1.100",
    lastActive: "2 minutes ago",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Ankara, Turkey",
    ip: "192.168.1.105",
    lastActive: "1 hour ago",
    current: false,
  },
  {
    id: 3,
    device: "Firefox on Linux",
    location: "Izmir, Turkey",
    ip: "192.168.1.106",
    lastActive: "3 hours ago",
    current: false,
  },
] as const;

export const PANEL_SECURITY_ALERTS = [
  {
    id: 1,
    type: "warning" as const,
    title: "Multiple failed login attempts",
    message: "5 failed login attempts detected from IP 192.168.1.101",
    time: "15 minutes ago",
    resolved: false,
  },
  {
    id: 2,
    type: "info" as const,
    title: "New device login",
    message: "Login detected from a new device in Ankara, Turkey",
    time: "2 hours ago",
    resolved: true,
  },
  {
    id: 3,
    type: "warning" as const,
    title: "API rate limit exceeded",
    message: "API rate limit exceeded for user admin@example.com",
    time: "5 hours ago",
    resolved: false,
  },
] as const;

export const PANEL_FAQ_CATEGORIES = [
  {
    id: 1,
    title: "Getting Started",
    count: 5,
    color: "text-blue-600 dark:text-blue-500",
  },
  {
    id: 2,
    title: "Account & Billing",
    count: 8,
    color: "text-green-600 dark:text-green-500",
  },
  {
    id: 3,
    title: "API & Integration",
    count: 12,
    color: "text-purple-600 dark:text-purple-500",
  },
  {
    id: 4,
    title: "Security",
    count: 6,
    color: "text-red-600 dark:text-red-500",
  },
] as const;

export const PANEL_FAQS = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I create my first project?",
    answer:
      "To create your first project, navigate to the Projects section and click the 'New Project' button. Fill in the project details and click 'Create'.",
  },
  {
    id: 2,
    category: "Account & Billing",
    question: "How do I update my payment method?",
    answer:
      "Go to Settings > Billing and click on 'Update Payment Method'. You can add a new card or update your existing one.",
  },
  {
    id: 3,
    category: "API & Integration",
    question: "How do I generate an API key?",
    answer:
      "Navigate to Settings > API Keys and click 'Generate New Key'. Make sure to copy and store it securely as it won't be shown again.",
  },
  {
    id: 4,
    category: "Security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Security settings and click 'Enable 2FA'. Follow the instructions to set up your authenticator app.",
  },
] as const;

export const PANEL_QUICK_LINKS = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API reference",
    href: "/docs",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    href: "#",
  },
  {
    title: "Community Forum",
    description: "Get help from the community",
    href: "#",
  },
  {
    title: "Contact Support",
    description: "Reach out to our support team",
    href: "#",
  },
] as const;
