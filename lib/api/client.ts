// lib/api/client.ts - Enhanced version with connection testing

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []
  private isHealthy = true
  private lastHealthCheck = 0
  private healthCheckInterval = 30000 // 30 seconds

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    // Perform initial health check
    this.checkHealth()
  }

  // Add health check method
  private async checkHealth(): Promise<boolean> {
    const now = Date.now()
    
    // Skip if we checked recently
    if (now - this.lastHealthCheck < this.healthCheckInterval) {
      return this.isHealthy
    }

    try {
      console.log(`🏥 Checking health of ${this.baseUrl}...`)
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Short timeout for health check
        signal: AbortSignal.timeout(5000)
      })
      
      this.isHealthy = response.ok
      this.lastHealthCheck = now
      
      if (this.isHealthy) {
        console.log(`✅ ${this.baseUrl} is healthy`)
      } else {
        console.error(`❌ ${this.baseUrl} returned status ${response.status}`)
      }
      
      return this.isHealthy
    } catch (error) {
      this.isHealthy = false
      this.lastHealthCheck = now
      console.error(`❌ ${this.baseUrl} is not accessible:`, error)
      return false
    }
  }

  private getAuthToken(): string | null {
    // Try multiple storage locations for flexibility
    return localStorage.getItem("auth_token") || 
           localStorage.getItem("access_token") || 
           sessionStorage.getItem("auth_token") ||
           sessionStorage.getItem("access_token");
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token") || 
           sessionStorage.getItem("refresh_token");
  }

  private setTokens(accessToken: string, refreshToken?: string) {
    // Store in multiple locations for redundancy
    localStorage.setItem("auth_token", accessToken)
    localStorage.setItem("access_token", accessToken)
    sessionStorage.setItem("auth_token", accessToken)
    sessionStorage.setItem("access_token", accessToken)
    
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken)
      sessionStorage.setItem("refresh_token", refreshToken)
    }
  }

  private clearTokens() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach(callback => callback(token))
    this.refreshSubscribers = []
  }

  private addRefreshSubscriber(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback)
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    
    if (!refreshToken) {
      console.error("No refresh token available")
      return null
    }

    try {
      console.log("🔄 Attempting to refresh access token...")
      
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        credentials: 'include',
      })

      if (!response.ok) {
        console.error("❌ Token refresh failed:", response.status)
        return null
      }

      const data = await response.json()
      
      if (data.access_token) {
        console.log("✅ Token refreshed successfully")
        this.setTokens(data.access_token, data.refresh_token)
        return data.access_token
      }

      return null
    } catch (error) {
      console.error("❌ Token refresh error:", error)
      return null
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      // Check service health first
      const isHealthy = await this.checkHealth()
      if (!isHealthy && retryCount === 0) {
        return {
          success: false,
          error: `Service at ${this.baseUrl} is not available`,
          message: 'Please check if the backend service is running'
        }
      }

      const url = `${this.baseUrl}${endpoint}`
      console.log(`🌐 Making API request to: ${url}`)

      // Get auth token from localStorage
      const authToken = this.getAuthToken()
      console.log(`🔐 Auth token present: ${!!authToken}`)
      
      // Debug: Log first 20 chars of token
      if (authToken) {
        console.log(`🔑 Token preview: ${authToken.substring(0, 20)}...`)
      }

      // Create the headers object
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers, // Merge any provided headers
      }

      // Add authentication header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      // Create the fetch options with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: 'include', // Include cookies if any
        signal: controller.signal
      }

      console.log(`🔧 Request method: ${options.method || 'GET'}`)
      if (options.body) {
        console.log(`📦 Request body:`, options.body)
      }

      try {
        const response = await fetch(url, fetchOptions)
        clearTimeout(timeoutId)

        console.log(`📡 Response status: ${response.status}`)

        // Handle 401 with token refresh
        if (response.status === 401 && retryCount === 0) {
          console.warn('🔒 Received 401, attempting token refresh...')
          
          if (!this.isRefreshing) {
            this.isRefreshing = true
            
            const newToken = await this.refreshAccessToken()
            
            if (newToken) {
              this.isRefreshing = false
              this.onTokenRefreshed(newToken)
              
              // Retry the original request with new token
              return this.makeRequest<T>(endpoint, options, 1)
            } else {
              this.isRefreshing = false
              // Refresh failed, clear tokens and redirect
              this.clearTokens()
              
              // Only redirect if not already on auth page
              if (!window.location.pathname.includes('/auth')) {
                window.location.href = "/auth"
              }
              
              return {
                success: false,
                error: "Authentication required",
                message: "Please log in again"
              }
            }
          } else {
            // Wait for ongoing refresh to complete
            return new Promise<ApiResponse<T>>((resolve) => {
              this.addRefreshSubscriber((token: string) => {
                // Retry request with refreshed token
                this.makeRequest<T>(endpoint, options, 1).then(resolve)
              })
            })
          }
        }

        // Handle other non-OK responses
        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`
          let errorDetails: any = null

          try {
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
              errorDetails = await response.json()
              errorMessage = errorDetails.detail || errorDetails.message || errorMessage
            } else {
              const errorText = await response.text()
              if (errorText) {
                errorMessage = errorText
              }
            }
          } catch (e) {
            console.error('❌ Failed to parse error response:', e)
          }

          console.error(`❌ API Error: ${errorMessage}`)
          if (errorDetails) {
            console.error(`❌ Error details:`, errorDetails)
          }
          
          return {
            success: false,
            error: errorMessage,
            message: errorDetails?.detail || errorMessage
          }
        }

        // Parse successful response
        let data: any = null
        try {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            data = await response.json()
            console.log('✅ Response data:', data)
          } else {
            // Handle non-JSON responses
            data = await response.text()
            console.log('✅ Response (non-JSON):', data)
          }
        } catch (jsonError) {
          console.error('❌ Failed to parse response:', jsonError)
          return {
            success: false,
            error: 'Invalid response format from server'
          }
        }

        return {
          success: true,
          data: data,
        }
      } catch (fetchError) {
        clearTimeout(timeoutId)
        
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            return {
              success: false,
              error: 'Request timeout - server took too long to respond',
              message: 'Please try again later'
            }
          }
        }
        
        throw fetchError
      }
    } catch (error) {
      console.error('❌ API request failed:', error)
      
      // Network errors or other failures
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return {
          success: false,
          error: 'Network error - could not connect to server',
          message: `Please check if the backend service at ${this.baseUrl} is running`
        }
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint
    
    if (params) {
      const searchParams = new URLSearchParams()
      
      // Handle params properly
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
      
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }
    
    return this.makeRequest<T>(url, {
      method: 'GET',
    })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    })
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    // Get auth token for file uploads
    const authToken = this.getAuthToken()
    const headers: HeadersInit = {}
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }
    
    // For file uploads, don't set Content-Type header - let browser set it
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    })
  }

  // Method to manually set auth tokens (useful after login)
  setAuthTokens(accessToken: string, refreshToken?: string) {
    this.setTokens(accessToken, refreshToken)
  }

  // Method to clear auth and logout
  logout() {
    this.clearTokens()
    window.location.href = "/auth"
  }

  // Method to check if service is available
  async isServiceAvailable(): Promise<boolean> {
    return await this.checkHealth()
  }
}

// Create service clients
export const campaignServiceClient = new ApiClient('http://localhost:8002')
export const userServiceClient = new ApiClient('http://localhost:8000')
export const analyticsServiceClient = new ApiClient('http://localhost:8003')
export const sharedServiceClient = new ApiClient('http://localhost:8001')

// Test connection function
export async function testConnection() {
  console.log('🧪 Testing service connections...')
  
  const services = [
    { name: 'Campaign Service', client: campaignServiceClient, url: 'http://localhost:8002' },
    { name: 'User Service', client: userServiceClient, url: 'http://localhost:8000' },
  ]
  
  const results: Record<string, boolean> = {}
  
  for (const service of services) {
    console.log(`🔍 Testing ${service.name}...`)
    const isAvailable = await service.client.isServiceAvailable()
    results[service.name] = isAvailable
    
    if (!isAvailable) {
      console.error(`❌ ${service.name} is not available at ${service.url}`)
      console.error(`   Please ensure the backend service is running:`)
      console.error(`   cd campaign-service && python -m uvicorn app.main:app --port 8002`)
    }
  }
  
  return results
}

// Helper function to check auth status
export function checkAuthStatus() {
  const token = localStorage.getItem("auth_token") || 
                localStorage.getItem("access_token") ||
                sessionStorage.getItem("auth_token") ||
                sessionStorage.getItem("access_token")
                
  console.log("🔐 Auth Status Check:")
  console.log("  - Token exists:", !!token)
  
  if (token) {
    try {
      // Check if it's a session token (starts with 'token_')
      if (token.startsWith('token_')) {
        console.log("  - Token type: Session token")
        return true // Session tokens don't have expiration info
      }
      
      // Decode JWT to check expiration
      const parts = token.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]))
        console.log("  - Token type: JWT")
        console.log("  - Token payload:", payload)
        
        if (payload.exp) {
          const expDate = new Date(payload.exp * 1000)
          const now = new Date()
          console.log("  - Token expires at:", expDate)
          console.log("  - Token is expired:", expDate < now)
          
          return expDate > now // Return false if token is expired
        }
      }
    } catch (e) {
      console.error("  - Failed to decode token:", e)
    }
  }
  
  return !!token
}

// Export types for use in hooks
export type { ApiResponse }