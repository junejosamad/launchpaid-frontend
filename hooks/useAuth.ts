"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { userServiceClient } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/config"
import type { User } from "@/lib/types/api"

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  role: "creator" | "agency" | "brand"
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  })

  const router = useRouter()

  // Helper function to store tokens in multiple locations
  const storeTokens = (accessToken: string, refreshToken?: string) => {
    console.log("💾 Storing tokens in localStorage and sessionStorage")
    
    // Store in localStorage
    localStorage.setItem("auth_token", accessToken)
    localStorage.setItem("access_token", accessToken)
    
    // Store in sessionStorage for current session
    sessionStorage.setItem("auth_token", accessToken)
    sessionStorage.setItem("access_token", accessToken)
    
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken)
      sessionStorage.setItem("refresh_token", refreshToken)
    }
    
    // Verify storage
    console.log("✅ Tokens stored verification:", {
      localStorage_auth: !!localStorage.getItem("auth_token"),
      localStorage_access: !!localStorage.getItem("access_token"),
      sessionStorage_auth: !!sessionStorage.getItem("auth_token"),
      sessionStorage_access: !!sessionStorage.getItem("access_token")
    })
  }

  // Helper function to clear all tokens
  const clearTokens = () => {
    console.log("🗑️ Clearing all tokens")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
  }

  // Helper function to refresh access token
  const refreshAccessToken = async (): Promise<boolean> => {
    console.log("🔄 Attempting to refresh access token...")
    const refreshToken = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token")
    
    if (!refreshToken) {
      console.log("❌ No refresh token available")
      return false
    }

    try {
      const response = await userServiceClient.post<{
        access_token: string
        refresh_token?: string
      }>('/api/v1/auth/refresh', { refresh_token: refreshToken })

      if (response.success && response.data) {
        const { access_token, refresh_token: newRefreshToken } = response.data
        storeTokens(access_token, newRefreshToken)
        console.log("✅ Token refreshed successfully")
        return true
      }
    } catch (error) {
      console.error("❌ Token refresh failed:", error)
    }

    return false
  }

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log("🔐 [useAuth] Initializing auth state...")
      
      const token = localStorage.getItem("auth_token") || 
                   localStorage.getItem("access_token") ||
                   sessionStorage.getItem("auth_token") ||
                   sessionStorage.getItem("access_token")
      
      console.log("🔍 [useAuth] Token check:", {
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 20) + "..." : null,
        source: token ? (
          localStorage.getItem("auth_token") ? "localStorage.auth_token" :
          localStorage.getItem("access_token") ? "localStorage.access_token" :
          sessionStorage.getItem("auth_token") ? "sessionStorage.auth_token" :
          sessionStorage.getItem("access_token") ? "sessionStorage.access_token" : "unknown"
        ) : "none"
      })
      
      if (!token) {
        console.log("❌ [useAuth] No token found, user is not authenticated")
        setState((prev) => ({ ...prev, isLoading: false, isAuthenticated: false, user: null }))
        return
      }

      try {
        console.log("📡 [useAuth] Fetching user profile with token...")
        
        // Try to fetch user profile - first attempt with current endpoint
        let response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
        
        // If that fails, try the /me endpoint which is common in FastAPI
        if (!response.success) {
          console.log("📡 [useAuth] Trying /me endpoint...")
          response = await userServiceClient.get<User>('/api/v1/me')
        }
        
        // If still failing and it's a 401, try to refresh token
        if (!response.success && response.error?.includes('401')) {
          console.log("🔄 [useAuth] Got 401, attempting token refresh...")
          const refreshed = await refreshAccessToken()
          
          if (refreshed) {
            // Retry with new token
            response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
            if (!response.success) {
              response = await userServiceClient.get<User>('/api/v1/me')
            }
          }
        }
        
        console.log("📡 [useAuth] Profile response:", response)
        
        if (response.success && response.data) {
          // Handle nested data structure
          const userData = ((response.data && typeof response.data === 'object' && 'data' in response.data) 
            ? response.data.data 
            : response.data) as User
          
          console.log("✅ [useAuth] User authenticated:", {
            id: userData.id,
            email: userData.email,
            role: userData.role
          })
          
          setState({
            user: userData,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
        } else {
          console.log("❌ [useAuth] Invalid profile response, clearing tokens")
          clearTokens()
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: "Failed to load user profile"
          })
        }
      } catch (error: any) {
        console.error("❌ [useAuth] Auth initialization error:", error)
        
        // Only clear tokens if it's a 401/403 error
        if (error.statusCode === 401 || error.statusCode === 403) {
          clearTokens()
        }
        
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: "Authentication failed"
        })
      }
    }

    initAuth()
  }, [])

  // Listen for auth expiration events
  useEffect(() => {
    const handleAuthExpired = () => {
      console.log("⏰ [useAuth] Auth expired event received")
      clearTokens()
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: "Session expired",
      })
      router.push("/auth")
    }

    const handleStorageChange = (e: StorageEvent) => {
      // Sync auth state across tabs
      if (e.key === "auth_token" || e.key === "access_token") {
        if (!e.newValue) {
          console.log("🔄 [useAuth] Token removed in another tab")
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
          router.push("/auth")
        } else if (e.newValue && !state.isAuthenticated) {
          console.log("🔄 [useAuth] Token added in another tab, refreshing auth")
          window.location.reload()
        }
      }
    }

    window.addEventListener("auth:expired", handleAuthExpired)
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("auth:expired", handleAuthExpired)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router, state.isAuthenticated])

  // Login function
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      console.log("🚀 [useAuth] Starting login process...")
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.post<any>(ENDPOINTS.AUTH.LOGIN, credentials)
        console.log("📡 [useAuth] Login response:", response)

        if (response.success && response.data) {
          const responseData = response.data.data || response.data
          const { user, access_token, refresh_token } = responseData

          if (!user || !access_token) {
            throw new Error("Invalid response: missing user or access_token")
          }

          // Store tokens immediately
          storeTokens(access_token, refresh_token)

          // Update state with user data
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })

          console.log("✅ [useAuth] Login successful, user authenticated")

          // Determine redirect path based on role
          const userRole = user.role || user.userRole
          
          // For creators, check if profile is complete
          if (userRole === "creator" && user.profile_completion_percentage < 100) {
            console.log(`🚀 [useAuth] Creator profile incomplete (${user.profile_completion_percentage}%), redirecting to profile`)
            router.push("/dashboard/profile")
            return { success: true }
          }
          
          const redirectPath =
            userRole === "creator"
              ? "/creator-dashboard"
              : userRole === "agency"
                ? "/agency-dashboard"
                : userRole === "brand"
                  ? "/client-dashboard"
                  : "/dashboard"

          console.log(`🚀 [useAuth] Redirecting to ${redirectPath}`)
          
          // Small delay to ensure state updates are processed
          setTimeout(() => {
            router.push(redirectPath)
          }, 100)
          
          return { success: true }
        } else {
          const errorMessage = response.error || response.message || "Login failed"
          console.error("❌ [useAuth] Login failed:", errorMessage)
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
          }))
          return { success: false, error: errorMessage }
        }
      } catch (error: any) {
        console.error("❌ [useAuth] Login error:", error)
        const errorMessage = error.message || "Login failed"
        setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
        return { success: false, error: errorMessage }
      }
    },
    [router],
  )

  // Register function
  const register = useCallback(
    async (data: RegisterData) => {
      console.log("🚀 [useAuth] Starting registration process...")
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.post<{
          user: User
          access_token: string
          refresh_token?: string
          message: string
          requires_verification: boolean
        }>(ENDPOINTS.AUTH.REGISTER, data)

        if (response.success && response.data) {
          const { user, access_token, refresh_token, message, requires_verification } = response.data

          if (requires_verification) {
            setState((prev) => ({
              ...prev,
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null,
            }))

            router.push(`/auth/verify-email?email=${encodeURIComponent(user.email)}`)
            
            return { 
              success: true, 
              message: message || "Please check your email to verify your account.",
              requires_verification: true
            }
          } else {
            if (access_token) {
              storeTokens(access_token, refresh_token)

              setState({
                user,
                isLoading: false,
                isAuthenticated: true,
                error: null,
              })
            }

            router.push("/profile/setup")
            return { success: true }
          }
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.error || "Registration failed",
          }))
          return { success: false, error: response.error || "Registration failed" }
        }
      } catch (error: any) {
        const errorMessage = error.message || "Registration failed"
        setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
        return { success: false, error: errorMessage }
      }
    },
    [router],
  )

  // Verify email function
  const verifyEmail = useCallback(
    async (token: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.post<{
          user: User
          access_token: string
          refresh_token?: string
          message: string
          success: boolean
        }>(`/api/v1/auth/verify-email?token=${token}`)

        if (response.success && response.data) {
          const { user, access_token, refresh_token } = response.data

          // Store tokens
          storeTokens(access_token, refresh_token)

          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })

          const redirectPath =
            user.role === "creator"
              ? "/creator-dashboard"
              : user.role === "agency"
                ? "/agency-dashboard"
                : user.role === "brand"
                  ? "/client-dashboard"
                  : "/dashboard"

          router.push(redirectPath)
          return { success: true }
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.error || "Email verification failed",
          }))
          return { success: false, error: response.error || "Email verification failed" }
        }
      } catch (error: any) {
        const errorMessage = error.message || "Email verification failed"
        setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
        return { success: false, error: errorMessage }
      }
    },
    [router],
  )

  // Resend verification email
  const resendVerification = useCallback(
    async (email: string) => {
      try {
        const response = await userServiceClient.get<{
          message: string
          success: boolean
          verification_token?: string
        }>(`/api/v1/auth/resend-verification?email=${encodeURIComponent(email)}`)

        if (response.success) {
          return { 
            success: true, 
            message: response.data?.message || "Verification email sent!",
            verification_token: response.data?.verification_token
          }
        } else {
          return { success: false, error: response.error || "Failed to resend verification" }
        }
      } catch (error: any) {
        return { success: false, error: error.message || "Failed to resend verification" }
      }
    },
    [],
  )

  // Logout function
  const logout = useCallback(async () => {
    console.log("🚪 [useAuth] Logging out...")
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await userServiceClient.post(ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      clearTokens()

      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      })

      router.push("/auth")
    }
  }, [router])

  // Update profile function
  const updateProfile = useCallback(
    async (profileData: Partial<User>) => {
      if (!state.user) return { success: false, error: "Not authenticated" }

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.put<User>(ENDPOINTS.USERS.UPDATE_PROFILE, profileData)

        if (response.success && response.data) {
          setState((prev) => ({
            ...prev,
            user: response.data!,
            isLoading: false,
          }))
          return { success: true }
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.error || "Profile update failed",
          }))
          return { success: false, error: response.error || "Profile update failed" }
        }
      } catch (error: any) {
        const errorMessage = error.message || "Profile update failed"
        setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
        return { success: false, error: errorMessage }
      }
    },
    [state.user],
  )

  // Clear error
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Refresh auth state
  const refreshAuth = useCallback(async () => {
    console.log("🔄 [useAuth] Refreshing auth state...")
    const token = localStorage.getItem("auth_token") || 
                 localStorage.getItem("access_token") ||
                 sessionStorage.getItem("auth_token") ||
                 sessionStorage.getItem("access_token")
                 
    if (!token) {
      console.log("❌ [useAuth] No token found during refresh")
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      })
      return
    }

    try {
      // Try multiple endpoints
      let response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
      
      if (!response.success) {
        response = await userServiceClient.get<User>('/api/v1/me')
      }
      
      if (!response.success && response.error?.includes('401')) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
          response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
          if (!response.success) {
            response = await userServiceClient.get<User>('/api/v1/me')
          }
        }
      }
      
      if (response.success && response.data) {
        const userData = ((response.data && typeof response.data === 'object' && 'data' in response.data) 
          ? response.data.data 
          : response.data) as User
          
        console.log("✅ [useAuth] Auth refreshed successfully")
        setState({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        })
      } else {
        console.log("❌ [useAuth] Failed to refresh auth")
        clearTokens()
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        })
      }
    } catch (error) {
      console.error("❌ [useAuth] Auth refresh error:", error)
      clearTokens()
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      })
    }
  }, [])

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    verifyEmail,
    resendVerification,
    refreshAuth,
  }
}