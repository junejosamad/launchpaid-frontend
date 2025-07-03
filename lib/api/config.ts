// API Configuration with environment-based URLs
export const API_CONFIG = {
  SERVICES: {
    USER: process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8000",
    CAMPAIGN: process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL || "http://localhost:8002",
    PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || "http://localhost:8003",
    ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || "http://localhost:8004",
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

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },

  // User endpoints
  USERS: {
    LIST: "/users",
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CREATORS: "/creators",
    AGENCIES: "/agencies",
  },

  // Campaign endpoints
  CAMPAIGNS: {
    LIST: "/campaigns",
    CREATE: "/campaigns",
    GET: (id: string) => `/campaigns/${id}`,
    UPDATE: (id: string) => `/campaigns/${id}`,
    DELETE: (id: string) => `/campaigns/${id}`,
    APPLICATIONS: (id: string) => `/campaigns/${id}/applications`,
    APPLY: "/applications",
    REVIEW_APPLICATION: (id: string) => `/applications/${id}/review`,
  },

  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    CAMPAIGN: (id: string) => `/analytics/campaigns/${id}`,
    CREATOR: (id: string) => `/analytics/creators/${id}`,
    GMV: "/analytics/gmv",
    REAL_TIME: "/analytics/real-time",
  },

  // Payment endpoints
  PAYMENTS: {
    OVERVIEW: "/payments/overview",
    PAYOUTS: "/payments/payouts",
    PROCESS: "/payments/process",
    HISTORY: "/payments/history",
  },
} as const
