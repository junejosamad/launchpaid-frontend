// // lib/api/client.ts - Complete API Client with Enhanced Parameter Validation

import { API_CONFIG } from './config'

// Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string | null
  message?: string
  statusCode?: number
}

export interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
  skipAuth?: boolean
  signal?: AbortSignal
}

// Base API Client Class
class ApiClient {
  private baseUrl: string
  private isHealthy: boolean = false
  private headers: Record<string, string>
  private timeout: number = 30000 // 30 seconds
  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    
    // Check health but don't block initialization
    this.checkHealth().catch(err => {
      console.warn(`⚠️ Service ${baseUrl} is not available. Will retry on first request.`)
    })
  }

  // Health check method
  async checkHealth(): Promise<boolean> {
    try {
      console.log(`🏥 Checking health of ${this.baseUrl}...`)
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        // Special handling for 404 on health endpoint
        if (response.status === 404) {
          console.warn(`⚠️ Health endpoint not found at ${this.baseUrl}, but service might still work`)
          this.isHealthy = true // Assume healthy if health endpoint doesn't exist
          return true
        }
        throw new Error(`Health check failed: ${response.status}`)
      }

      const data = await response.json()
      this.isHealthy = true
      console.log(`✅ ${this.baseUrl} is healthy:`, data)
      return true
    } catch (error: any) {
      this.isHealthy = false
      console.error(`❌ ${this.baseUrl} health check failed:`, error.message)
      return false
    }
  }

  // Get auth token from storage
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    
    return localStorage.getItem('auth_token') || 
           localStorage.getItem('access_token') ||
           sessionStorage.getItem('auth_token') ||
           sessionStorage.getItem('access_token')
  }

  // Get refresh token
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    
    return localStorage.getItem('refresh_token') ||
           sessionStorage.getItem('refresh_token')
  }

  // Set auth tokens
  setAuthTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('auth_token', accessToken)
    localStorage.setItem('access_token', accessToken)
    
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken)
    }
  }

  // Clear auth tokens
  clearAuthTokens() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
  }

  // Refresh token logic
  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      console.error('No refresh token available')
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      if (data.access_token) {
        this.setAuthTokens(data.access_token, data.refresh_token)
        return data.access_token
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
      this.clearAuthTokens()
    }

    return null
  }

  // Subscribe to token refresh
  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb)
  }

  // Notify all subscribers about token refresh
  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach(cb => cb(token))
    this.refreshSubscribers = []
  }

  // Main request method
  async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      // If service is not healthy, try health check again
      if (!this.isHealthy && retryCount === 0) {
        await this.checkHealth()
      }

      const url = `${this.baseUrl}${endpoint}`
      const token = this.getAuthToken()

      console.log(`🚀 ${options.method || 'GET'} ${url}`)
      console.log(`🔑 Auth token present: ${!!token}`)

      // Build headers
      const headers: Record<string, string> = {
        ...this.headers,
        ...options.headers,
      }

      // Add auth token if available and not skipped
      if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`
      }

      // Build request config
      const config: RequestInit = {
        method: options.method || 'GET',
        headers,
        signal: options.signal || AbortSignal.timeout(this.timeout),
      }

      // Add body for non-GET requests
      if (options.body && options.method !== 'GET') {
        config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
      }

      // Make the request
      const response = await fetch(url, config)
      console.log(`📡 Response status: ${response.status}`)

      // Handle 401 Unauthorized
      if (response.status === 401 && retryCount === 0) {
        console.warn('🔒 Received 401, attempting token refresh...')
        
        if (!this.isRefreshing) {
          this.isRefreshing = true
          const newToken = await this.refreshAccessToken()
          
          if (newToken) {
            this.isRefreshing = false
            this.onTokenRefreshed(newToken)
            // Retry original request
            return this.makeRequest<T>(endpoint, options, 1)
          } else {
            this.isRefreshing = false
            this.clearAuthTokens()
            // Redirect to login or handle as needed
            if (typeof window !== 'undefined') {
              window.location.href = '/auth'
            }
          }
        } else {
          // Wait for token refresh to complete
          return new Promise((resolve) => {
            this.subscribeTokenRefresh((newToken: string) => {
              resolve(this.makeRequest<T>(endpoint, options, 1))
            })
          })
        }
      }

      // Parse response
      let responseData: any = null
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json()
      } else if (!response.ok) {
        responseData = await response.text()
      }

      // Handle non-OK responses
      if (!response.ok) {
        const errorMessage = responseData?.detail || responseData?.message || responseData || `Request failed with status ${response.status}`
        console.error(`❌ API Error: ${errorMessage}`)
        
        return {
          success: false,
          error: errorMessage,
          statusCode: response.status,
          data: null as any,
        }
      }

      console.log('✅ Request successful')
      return {
        success: true,
        data: responseData,
        error: null,
        statusCode: response.status,
      }

    } catch (error: any) {
      console.error(`❌ Request error:`, error)
      
      // Handle different error types
      let errorMessage = 'An unexpected error occurred'
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        errorMessage = `Cannot connect to ${this.baseUrl}. Please ensure the backend service is running.`
      } else if (error.name === 'AbortError') {
        errorMessage = 'Request timeout. The server took too long to respond.'
      } else if (error.message) {
        errorMessage = error.message
      }

      return {
        success: false,
        error: errorMessage,
        data: null as any,
      }
    }
  }

  // HTTP method helpers with enhanced parameter validation
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint
    
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        // Skip null, undefined, or empty string values
        if (value === null || value === undefined || value === '') {
          console.log(`⏭️ Skipping empty param: ${key}`)
          return
        }
        
        // Detect and warn about objects
        if (typeof value === 'object' && !Array.isArray(value)) {
          console.error(`🚨 ERROR: Object detected in URL parameter!`)
          console.error(`Key: ${key}`)
          console.error(`Value:`, value)
          console.error(`Type:`, typeof value)
          console.error(`String representation:`, String(value))
          console.trace('Stack trace to find the source:')
          
          // Skip this parameter to prevent [object Object] in URL
          return
        }
        
        // Handle arrays properly
        if (Array.isArray(value)) {
          value.forEach(v => {
            if (typeof v === 'object') {
              console.error(`🚨 ERROR: Object in array for parameter ${key}`)
              return
            }
            searchParams.append(key, String(v))
          })
        } else {
          // Ensure we have a string
          const stringValue = String(value)
          
          // Final check for [object Object]
          if (stringValue === '[object Object]') {
            console.error(`🚨 ERROR: [object Object] detected for parameter ${key}!`)
            console.error(`Original value:`, value)
            console.trace('Stack trace:')
            return
          }
          
          searchParams.append(key, stringValue)
        }
      })
      
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }
    
    console.log(`🔗 Final URL: ${url}`)
    
    // Additional check for [object Object] in final URL
    if (url.includes('[object Object]') || url.includes('%5Bobject+Object%5D')) {
      console.error('🚨 CRITICAL ERROR: [object Object] detected in final URL!')
      console.error('URL:', url)
      console.error('Parameters:', params)
      console.trace('Stack trace to debug:')
    }
    
    return this.makeRequest<T>(url, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    })
  }

  // File upload method
  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const token = this.getAuthToken()
    const headers: Record<string, string> = {}
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    })
  }
}

// Create service-specific clients with correct ports
// Based on your configuration:
// - User service: port 8000
// - Shared-types service: port 8006

// IMPORTANT: Make sure your API_CONFIG has the correct ports:
// USER_SERVICE should be http://localhost:8000
// SHARED_SERVICE should be http://localhost:8006

export const userServiceClient = new ApiClient(API_CONFIG.SERVICES.USER_SERVICE)
export const campaignServiceClient = new ApiClient(API_CONFIG.SERVICES.CAMPAIGN_SERVICE)
export const analyticsServiceClient = new ApiClient(API_CONFIG.SERVICES.ANALYTICS_SERVICE)
export const paymentServiceClient = new ApiClient(API_CONFIG.SERVICES.PAYMENT_SERVICE)
export const integrationServiceClient = new ApiClient(API_CONFIG.SERVICES.INTEGRATION_SERVICE)
export const sharedServiceClient = new ApiClient(API_CONFIG.SERVICES.SHARED_SERVICE)

// Export the ApiClient class for custom instances
export { ApiClient }

// Helper function to set tokens across all clients
export function setGlobalAuthTokens(accessToken: string, refreshToken?: string) {
  userServiceClient.setAuthTokens(accessToken, refreshToken)
  campaignServiceClient.setAuthTokens(accessToken, refreshToken)
  analyticsServiceClient.setAuthTokens(accessToken, refreshToken)
  paymentServiceClient.setAuthTokens(accessToken, refreshToken)
  integrationServiceClient.setAuthTokens(accessToken, refreshToken)
  sharedServiceClient.setAuthTokens(accessToken, refreshToken)
}

// Helper function to clear tokens across all clients
export function clearGlobalAuthTokens() {
  userServiceClient.clearAuthTokens()
  campaignServiceClient.clearAuthTokens()
  analyticsServiceClient.clearAuthTokens()
  paymentServiceClient.clearAuthTokens()
  integrationServiceClient.clearAuthTokens()
  sharedServiceClient.clearAuthTokens()
}

// Debug function to check current service URLs
export function debugServiceUrls() {
  console.log('🔍 Current Service URLs:')
  console.log('User Service:', API_CONFIG.SERVICES.USER_SERVICE)
  console.log('Shared Service:', API_CONFIG.SERVICES.SHARED_SERVICE)
  console.log('Campaign Service:', API_CONFIG.SERVICES.CAMPAIGN_SERVICE)
  console.log('Analytics Service:', API_CONFIG.SERVICES.ANALYTICS_SERVICE)
  console.log('Payment Service:', API_CONFIG.SERVICES.PAYMENT_SERVICE)
  console.log('Integration Service:', API_CONFIG.SERVICES.INTEGRATION_SERVICE)
}
