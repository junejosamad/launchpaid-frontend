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

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }))
        return
      }

      try {
        const response = await userServiceClient.get<User>(ENDPOINTS.AUTH.PROFILE)
        if (response.success && response.data) {
          setState({
            user: response.data,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
        } else {
          // Invalid token
          localStorage.removeItem("auth_token")
          localStorage.removeItem("refresh_token")
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("refresh_token")
        setState((prev) => ({ ...prev, isLoading: false, error: "Authentication failed" }))
      }
    }

    initAuth()
  }, [])

  // Listen for auth expiration events
  useEffect(() => {
    const handleAuthExpired = () => {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: "Session expired",
      })
      router.push("/auth")
    }

    window.addEventListener("auth:expired", handleAuthExpired)
    return () => window.removeEventListener("auth:expired", handleAuthExpired)
  }, [router])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.post<{
          user: User
          access_token: string
          refresh_token: string
        }>(ENDPOINTS.AUTH.LOGIN, credentials)

        if (response.success && response.data) {
          const { user, access_token, refresh_token } = response.data

          localStorage.setItem("auth_token", access_token)
          localStorage.setItem("refresh_token", refresh_token)

          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })

          // Redirect based on user role
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
            error: response.error || "Login failed",
          }))
          return { success: false, error: response.error || "Login failed" }
        }
      } catch (error: any) {
        const errorMessage = error.message || "Login failed"
        setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
        return { success: false, error: errorMessage }
      }
    },
    [router],
  )

  const register = useCallback(
    async (data: RegisterData) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await userServiceClient.post<{
          user: User
          access_token: string
          refresh_token: string
        }>(ENDPOINTS.AUTH.REGISTER, data)

        if (response.success && response.data) {
          const { user, access_token, refresh_token } = response.data

          localStorage.setItem("auth_token", access_token)
          localStorage.setItem("refresh_token", refresh_token)

          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })

          // Redirect to profile completion
          router.push("/profile/setup")
          return { success: true }
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

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await userServiceClient.post(ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")

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

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  }
}
