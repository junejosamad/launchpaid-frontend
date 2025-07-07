// app/dashboard-agency/layout.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function AgencyDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("🏢 Agency Dashboard Layout - Auth Check")
    console.log("  - isLoading:", isLoading)
    console.log("  - isAuthenticated:", isAuthenticated)
    console.log("  - user:", user)
    console.log("  - user.role:", user?.role)
    console.log("  - user.userRole:", user?.userRole)
    console.log("  - user.type:", user?.type)
    
    // Only redirect if we're done loading and user is not authenticated
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        console.log("🔒 User not authenticated, redirecting to /auth")
        router.push("/auth")
      } else if (user.role !== "agency") {
        console.log("🔒 User role:", user.role, "- not an agency, redirecting")
        const redirectPath =
          user.role === "creator"
            ? "/dashboard-creator"
            : user.role === "brand"
              ? "/dashboard-brand"
              : "/dashboard"
        router.push(redirectPath)
      } else {
        console.log("✅ User is authenticated as agency:", user)
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated or wrong role
  if (!isAuthenticated || !user || (user.role !== "agency" && user.data?.role !== "agency")) {
    // Check for nested role structure as well
    const userRole = user?.role || user?.data?.role
    console.log("🚫 Blocking render - Auth:", isAuthenticated, "User:", !!user, "Role:", userRole)
    return null
  }

  // Render children if authenticated and correct role
  return <>{children}</>
}