import { API_CONFIG, getAuthHeaders, REQUEST_TIMEOUT } from "./config"

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Token management
class TokenManager {
  private static instance: TokenManager
  private token: string | null = null
  private refreshPromise: Promise<string> | null = null

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  getToken(): string | null {
    if (typeof window !== "undefined" && !this.token) {
      this.token = localStorage.getItem("auth_token")
    }
    return this.token
  }

  setToken(token: string): void {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken(): void {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  async refreshToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshPromise = this.performTokenRefresh()
    try {
      const newToken = await this.refreshPromise
      this.setToken(newToken)
      return newToken
    } finally {
      this.refreshPromise = null
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null

    if (!refreshToken) {
      throw new ApiError("No refresh token available", 401)
    }

    const response = await fetch(`${API_CONFIG.SERVICES.USER}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      throw new ApiError("Token refresh failed", response.status)
    }

    const data = await response.json()
    return data.access_token
  }
}

// Base API client with interceptors and error handling
class ApiClient {
  private baseUrl: string
  private timeout: number
  private tokenManager: TokenManager

  constructor(baseUrl: string, timeout = REQUEST_TIMEOUT) {
    this.baseUrl = baseUrl
    this.timeout = timeout
    this.tokenManager = TokenManager.getInstance()
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const token = this.tokenManager.getToken()

    const config: RequestInit = {
      ...options,
      headers: {
        ...getAuthHeaders(token || undefined),
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    }

    try {
      if (API_CONFIG.DEBUG) {
        console.log(`[API] ${options.method || "GET"} ${url}`, {
          headers: config.headers,
          body: options.body,
        })
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (API_CONFIG.DEBUG) {
        console.log(`[API Response] ${response.status}`, data)
      }

      // Handle 401 - Token expired
      if (response.status === 401 && token && retryCount === 0) {
        try {
          await this.tokenManager.refreshToken()
          return this.request<T>(endpoint, options, retryCount + 1)
        } catch (refreshError) {
          this.tokenManager.clearToken()
          // Redirect to login or emit auth error event
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("auth:expired"))
          }
          throw new ApiError("Authentication expired", 401, data)
        }
      }

      if (!response.ok) {
        throw new ApiError(data.message || data.error || `HTTP ${response.status}`, response.status, data)
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError("Request timeout", 408)
        }

        // Retry logic for network errors
        if (retryCount < 3 && this.shouldRetry(error)) {
          await this.delay(1000 * (retryCount + 1))
          return this.request<T>(endpoint, options, retryCount + 1)
        }

        throw new ApiError(error.message, 0)
      }

      throw new ApiError("Unknown error occurred", 0)
    }
  }

  private shouldRetry(error: Error): boolean {
    return (
      error.message.includes("fetch") || error.message.includes("network") || error.message.includes("ECONNREFUSED")
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const token = this.tokenManager.getToken()
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      signal: AbortSignal.timeout(this.timeout),
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.message || `HTTP ${response.status}`, response.status, data)
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError("Upload failed", 0)
    }
  }
}

// Service-specific API clients
export const userServiceClient = new ApiClient(API_CONFIG.SERVICES.USER)
export const campaignServiceClient = new ApiClient(API_CONFIG.SERVICES.CAMPAIGN)
export const analyticsServiceClient = new ApiClient(API_CONFIG.SERVICES.ANALYTICS)
export const paymentServiceClient = new ApiClient(API_CONFIG.SERVICES.PAYMENT)
export const integrationServiceClient = new ApiClient(API_CONFIG.SERVICES.INTEGRATION)

// Default export
export default ApiClient
