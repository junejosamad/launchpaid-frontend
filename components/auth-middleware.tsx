// components/auth-middleware.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { checkAuthStatus } from '@/lib/api/client'

interface AuthMiddlewareProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthMiddleware({ 
  children, 
  requireAuth = true,
  redirectTo = '/auth'
}: AuthMiddlewareProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && requireAuth && !user) {
      // Double-check auth status
      const hasValidToken = checkAuthStatus()
      
      if (!hasValidToken) {
        console.log('🔒 No valid auth token, redirecting to login...')
        router.push(redirectTo)
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If auth is required but user is not authenticated, show nothing (redirect will happen)
  if (requireAuth && !user) {
    return null
  }

  return <>{children}</>
}

// Higher-order component version
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: { redirectTo?: string }
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthMiddleware redirectTo={options?.redirectTo}>
        <Component {...props} />
      </AuthMiddleware>
    )
  }
}