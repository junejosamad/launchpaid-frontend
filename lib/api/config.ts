// lib/api/config.ts - Fixed Frontend API Configuration
export const API_CONFIG = {
  SERVICES: {
    USER: process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8000",
    CAMPAIGN: process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL || "http://localhost:8002",
    ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || "http://localhost:8003",
    PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || "http://localhost:8004",
    INTEGRATION: process.env.NEXT_PUBLIC_INTEGRATION_SERVICE_URL || "http://localhost:8005",
  },
  TIMEOUT: Number.parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
  DEBUG: process.env.NEXT_PUBLIC_API_DEBUG === "true",
  ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS === "true",
  ENABLE_MOCK_DATA: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true",
} as const

export const REQUEST_TIMEOUT = API_CONFIG.TIMEOUT
export const MAX_RETRIES = 3
export const RETRY_DELAY = 1000

// Auth token management
export const getAuthHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
})

// Fixed API endpoints with proper service prefixes
export const ENDPOINTS = {
  // Auth endpoints (User Service)
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout", 
    REFRESH: "/api/v1/auth/refresh",
    REGISTER: "/api/v1/auth/signup",
    PROFILE: "/api/v1/auth/profile",
    VERIFY_EMAIL: "/api/v1/auth/verify-email",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
  },

  // User endpoints (User Service)
  USERS: {
    LIST: "/api/v1/users",
    PROFILE: "/api/v1/users/profile",
    UPDATE_PROFILE: "/api/v1/users/profile",
    DELETE_ACCOUNT: "/api/v1/users/account",
    CREATORS: "/api/v1/users/creators",
    AGENCIES: "/api/v1/users/agencies",
  },

  // Campaign endpoints (Campaign Service)
  CAMPAIGNS: {
    LIST: "/api/v1/campaigns",
    CREATE: "/api/v1/campaigns",
    GET: (id: string) => `/api/v1/campaigns/${id}`,
    UPDATE: (id: string) => `/api/v1/campaigns/${id}`,
    DELETE: (id: string) => `/api/v1/campaigns/${id}`,
    APPLICATIONS: "/api/v1/applications",
    APPLY: "/api/v1/applications",
    UPDATE_APPLICATION: (id: string) => `/api/v1/applications/${id}`,
    BULK_APPROVE: "/api/v1/applications/bulk-approve",
    BULK_REJECT: "/api/v1/applications/bulk-reject",
  },

  // Analytics endpoints (Analytics Service)
  ANALYTICS: {
    DASHBOARD: "/api/v1/analytics/dashboard",
    CAMPAIGN: (id: string) => `/api/v1/analytics/campaigns/${id}`,
    CREATOR: (id: string) => `/api/v1/analytics/creators/${id}`,
    GMV: "/api/v1/analytics/gmv",
    REAL_TIME: "/api/v1/analytics/real-time",
    PERFORMANCE: "/api/v1/analytics/performance",
  },

  // Payment endpoints (Payment Service)
  PAYMENTS: {
    OVERVIEW: "/api/v1/payments/overview",
    PAYOUTS: "/api/v1/payments/payouts",
    PROCESS: "/api/v1/payments/process",
    HISTORY: "/api/v1/payments/history",
    INVOICES: "/api/v1/payments/invoices",
    STRIPE_WEBHOOK: "/api/v1/payments/stripe/webhook",
  },

  // Integration endpoints (Integration Service)
  INTEGRATIONS: {
    TIKTOK: {
      CONNECT: "/api/v1/integrations/tiktok/connect",
      DISCONNECT: "/api/v1/integrations/tiktok/disconnect",
      SYNC: "/api/v1/integrations/tiktok/sync",
      SHOP_DATA: "/api/v1/integrations/tiktok/shop",
    },
    DISCORD: {
      CONNECT: "/api/v1/integrations/discord/connect",
      SEND_MESSAGE: "/api/v1/integrations/discord/message",
      WEBHOOKS: "/api/v1/integrations/discord/webhooks",
    },
    SENDBLUE: {
      SEND_SMS: "/api/v1/integrations/sendblue/sms",
      STATUS: "/api/v1/integrations/sendblue/status",
    },
  },
} as const

// Service-specific base URLs
export const getServiceBaseUrl = (service: keyof typeof API_CONFIG.SERVICES): string => {
  return API_CONFIG.SERVICES[service]
}

// Helper to build full URL for specific service
export const buildServiceUrl = (
  service: keyof typeof API_CONFIG.SERVICES,
  endpoint: string
): string => {
  const baseUrl = getServiceBaseUrl(service)
  return `${baseUrl}${endpoint}`
}