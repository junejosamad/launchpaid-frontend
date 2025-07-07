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
  }

  // Helper function to clear all tokens
  const clearTokens = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
  }

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token") || 
                   localStorage.getItem("access_token") ||
                   sessionStorage.getItem("auth_token") ||
                   sessionStorage.getItem("access_token")
                   
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }))
        return
      }

      try {
        console.log("🔐 Fetching user profile from backend...")
        const response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
        console.log("📡 Profile API Response:", response)
        
        if (response.success && response.data) {
          // Check if the response has a nested data structure
          const userData = response.data.data || response.data
          
          console.log("👤 User data received:", userData)
          console.log("🎭 User role from backend:", userData.role)
          console.log("🎭 Alternative role field (userRole):", userData.userRole)
          console.log("🎭 Alternative role field (type):", userData.type)
          console.log("🎭 All user fields:", Object.keys(userData))
          
          setState({
            user: userData,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
        } else {
          console.log("❌ Invalid profile response, clearing tokens")
          clearTokens()
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error)
        clearTokens()
        setState((prev) => ({ ...prev, isLoading: false, error: "Authentication failed" }))
      }
    }

    initAuth()
  }, [])

  // Listen for auth expiration events
  useEffect(() => {
    const handleAuthExpired = () => {
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
          // Token was removed in another tab
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
          router.push("/auth")
        }
      }
    }

    window.addEventListener("auth:expired", handleAuthExpired)
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("auth:expired", handleAuthExpired)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  // Updated login function with better token handling
  // const login = useCallback(
  //   async (credentials: LoginCredentials) => {
  //     setState((prev) => ({ ...prev, isLoading: true, error: null }))

  //     try {
  //       const response = await userServiceClient.post<any>(ENDPOINTS.AUTH.LOGIN, credentials)

  //       console.log("Login response:", response)

  //       if (response.success && response.data) {
  //         // Handle the nested data structure
  //         const responseData = response.data.data || response.data
  //         const { user, access_token, refresh_token } = responseData

  //         if (!user || !access_token) {
  //           throw new Error("Invalid response structure from server")
  //         }

  //         // Store tokens in multiple locations
  //         storeTokens(access_token, refresh_token)

  //         setState({
  //           user,
  //           isLoading: false,
  //           isAuthenticated: true,
  //           error: null,
  //         })

  //         // Redirect based on user role
  //         const userRole = user.role || user.userRole
  //         const redirectPath =
  //           userRole === "creator"
  //             ? "/dashboard-creator"
  //             : userRole === "agency"
  //               ? "/dashboard-agency"
  //               : userRole === "brand"
  //                 ? "/dashboard-brand"
  //                 : "/dashboard"

  //         router.push(redirectPath)
  //         return { success: true }
  //       } else {
  //         const errorMessage = response.error || response.message || "Login failed"
  //         setState((prev) => ({
  //           ...prev,
  //           isLoading: false,
  //           error: errorMessage,
  //         }))
  //         return { success: false, error: errorMessage }
  //       }
  //     } catch (error: any) {
  //       console.error("Login error details:", error)
  //       const errorMessage = error.message || "Login failed"
  //       setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
  //       return { success: false, error: errorMessage }
  //     }
  //   },
  //   [router],
  // )

  // In useAuth.ts, update the login response handling
const login = useCallback(
  async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await userServiceClient.post<any>(ENDPOINTS.AUTH.LOGIN, credentials)

      console.log("Login response:", response)

      if (response.success && response.data) {
        const responseData = response.data.data || response.data
        const { user, access_token, refresh_token } = responseData

        // Check if we got a JWT token or need to request one
        if (access_token && access_token.startsWith('eyJ')) {
          // This is a JWT token
          storeTokens(access_token, refresh_token)
        } else {
          // This is a session token, we might need to exchange it for a JWT
          console.warn("Received non-JWT token:", access_token)
          // For now, store it anyway
          storeTokens(access_token, refresh_token)
        }

        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        })

        // Redirect based on user role
        const userRole = user.role || user.userRole
        const redirectPath =
          userRole === "creator"
            ? "/dashboard-creator"
            : userRole === "agency"
              ? "/dashboard-agency"
              : userRole === "brand"
                ? "/dashboard-brand"
                : "/dashboard"

        router.push(redirectPath)
        return { success: true }
      } else {
        const errorMessage = response.error || response.message || "Login failed"
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        return { success: false, error: errorMessage }
      }
    } catch (error: any) {
      console.error("Login error details:", error)
      const errorMessage = error.message || "Login failed"
      setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  },
  [router],
)

  // Updated register function with better token handling
  const register = useCallback(
    async (data: RegisterData) => {
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

  // Updated verify email function with better token handling
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

  const logout = useCallback(async () => {
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

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Helper function to refresh auth state
  const refreshAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token") || 
                 localStorage.getItem("access_token") ||
                 sessionStorage.getItem("auth_token") ||
                 sessionStorage.getItem("access_token")
                 
    if (!token) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      })
      return
    }

    try {
      const response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
      if (response.success && response.data) {
        // Handle nested data structure
        const userData = response.data.data || response.data
        
        setState({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        })
      } else {
        clearTokens()
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        })
      }
    } catch (error) {
      console.error("Auth refresh error:", error)
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