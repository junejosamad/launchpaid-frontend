// app/auth/verify-email/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle, XCircle, Loader2, ArrowRight, RefreshCw } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail, resendVerification } = useAuth()

  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending")
  const [message, setMessage] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const token = searchParams.get("token")
  const email = searchParams.get("email")

  // Auto-verify if token is present
  useEffect(() => {
    if (token) {
      handleVerification(token)
    }
  }, [token])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerification = async (verificationToken: string) => {
    setVerificationStatus("pending")
    setMessage("Verifying your email...")

    try {
      const result = await verifyEmail(verificationToken)
      
      if (result.success) {
        setVerificationStatus("success")
        setMessage("Email verified successfully! Redirecting to dashboard...")
        
        // Redirect will be handled by the auth hook
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setVerificationStatus("error")
        setMessage(result.error || "Verification failed. The link may be expired or invalid.")
      }
    } catch (error) {
      setVerificationStatus("error")
      setMessage("An error occurred during verification. Please try again.")
    }
  }

  const handleResendVerification = async () => {
    if (!email || isResending || resendCooldown > 0) return

    setIsResending(true)
    
    try {
      const result = await resendVerification(email)
      
      if (result.success) {
        setMessage("Verification email sent! Check your inbox.")
        setResendCooldown(60) // 60 second cooldown
        
        // Show verification token for testing if provided
        if (result.verification_token) {
          console.log("Test verification token:", result.verification_token)
        }
      } else {
        setMessage(result.error || "Failed to resend verification email.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <Image src="/logo.png" alt="LaunchPAID" width={180} height={40} className="h-10 w-auto" />
        </Link>

        <Card className="bg-gray-900/80 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <div className={`inline-flex p-3 rounded-full mb-4 ${
              verificationStatus === "success" 
                ? "bg-green-500/20" 
                : verificationStatus === "error" 
                ? "bg-red-500/20" 
                : "bg-purple-500/20"
            }`}>
              {verificationStatus === "pending" && (
                <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
              )}
              {verificationStatus === "success" && (
                <CheckCircle className="h-8 w-8 text-green-400" />
              )}
              {verificationStatus === "error" && (
                <XCircle className="h-8 w-8 text-red-400" />
              )}
            </div>

            <CardTitle className="text-2xl font-bold">
              {verificationStatus === "success" 
                ? "Email Verified!" 
                : verificationStatus === "error"
                ? "Verification Failed"
                : "Verifying Email..."}
            </CardTitle>

            <CardDescription className="text-gray-400 mt-2">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Show email if available */}
            {email && !token && (
              <Alert className="bg-gray-800/50 border-gray-700">
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  We sent a verification link to <strong>{email}</strong>
                </AlertDescription>
              </Alert>
            )}

            {/* Manual token input for testing */}
            {!token && verificationStatus !== "success" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 text-center">
                  Check your email for the verification link, or enter the verification token manually:
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter verification token"
                    className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        handleVerification(e.currentTarget.value)
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      if (input?.value) {
                        handleVerification(input.value)
                      }
                    }}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2">
              {verificationStatus === "success" && (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {verificationStatus === "error" && email && (
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || resendCooldown > 0}
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    `Resend in ${resendCooldown}s`
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              )}

              <Button
                onClick={() => router.push("/auth")}
                variant="ghost"
                className="w-full hover:bg-gray-800"
              >
                Back to Login
              </Button>
            </div>

            {/* Help text */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={handleResendVerification}
                  disabled={!email || isResending || resendCooldown > 0}
                  className="text-purple-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  request a new one
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}