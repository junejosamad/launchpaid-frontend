"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Users,
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  AtSign,
  Check,
  X,
  Globe,
  AlertCircle,
} from "lucide-react"
// Import the useAuth hook
import { useAuth } from "@/hooks/useAuth"

type FormType = "signup" | "login"
type Role = "creator" | "agency" | "brand"

// Fixed AnimatedBackground component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-purple-900/30"></div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-500/20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
  const getStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 8) score += 25
    if (/[A-Z]/.test(pass)) score += 25
    if (/[0-9]/.test(pass)) score += 25
    if (/[^A-Za-z0-9]/.test(pass)) score += 25
    return score
  }

  const strength = getStrength(password)
  const getStrengthText = () => {
    if (strength < 50) return "Weak"
    if (strength < 75) return "Medium"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (strength < 50) return "bg-red-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  if (!password) return null

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">Password strength</span>
        <span
          className={`font-medium ${
            strength < 50 ? "text-red-400" : strength < 75 ? "text-yellow-400" : "text-green-400"
          }`}
        >
          {getStrengthText()}
        </span>
      </div>
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${strength}%` }} />
      </div>
    </div>
  )
}

// Role Selection Component - Reusable for both signup and login
function RoleSelection({ selectedRole, onRoleChange }: { selectedRole: Role; onRoleChange: (role: Role) => void }) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-white">I am a...</Label>
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "creator" as Role, label: "Creator", icon: <User className="h-5 w-5" /> },
          { value: "agency" as Role, label: "Agency", icon: <Users className="h-5 w-5" /> },
          { value: "brand" as Role, label: "Brand", icon: <Building className="h-5 w-5" /> },
        ].map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onRoleChange(role.value)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] min-h-[100px]
              ${
                selectedRole === role.value
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-gray-300"
              }`}
          >
            <div className="mb-2">{role.icon}</div>
            <span className="text-sm font-medium">{role.label}</span>
            {selectedRole === role.value && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AuthPage() {
  const [formType, setFormType] = useState<FormType>("signup")
  const [selectedRole, setSelectedRole] = useState<Role>("creator")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    tiktokUsername: "",
    companyName: "",
    websiteUrl: "",
    contentNiche: "",
    rememberMe: false,
    acceptTerms: false,
  })

  // Use the auth hook
  const { login, register, isLoading, error, clearError, user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // IMPORTANT: Check if user is already authenticated and redirect
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("🔐 User is already authenticated, redirecting...")
      const redirectPath =
        user.role === "creator"
          ? "/creator-dashboard"
          : user.role === "agency"
            ? "/agency-dashboard"
            : user.role === "brand"
              ? "/client-dashboard"
              : "/dashboard"
      
      router.push(redirectPath)
    }
  }, [isLoading, isAuthenticated, user, router])

  useEffect(() => {
    // Clear error when switching between forms
    clearError()
  }, [formType, clearError])

  const handleRoleChange = (value: Role) => {
    setSelectedRole(value)
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    // Validation
    if (!formData.email || !formData.password) {
      alert("Please fill in all required fields")
      return
    }

    if (formType === "signup") {
      if (!formData.fullName) {
        alert("Please enter your full name")
        return
      }
      
      // Additional validation for agencies/brands
      if ((selectedRole === "agency" || selectedRole === "brand") && !formData.companyName) {
        alert("Please enter your company name")
        return
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      if (!formData.acceptTerms) {
        alert("Please accept the terms of service")
        return
      }

      // Parse full name into first and last name
      const nameParts = formData.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      // Prepare registration data with role-specific fields
      const registerData: any = {
        email: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        username: formData.tiktokUsername || formData.email.split("@")[0],
        role: selectedRole,
      }

      // Add role-specific fields
      if (selectedRole === "agency" || selectedRole === "brand") {
        registerData.companyName = formData.companyName
        registerData.websiteUrl = formData.websiteUrl
      } else if (selectedRole === "creator") {
        registerData.tiktokHandle = formData.tiktokUsername
        registerData.contentNiche = formData.contentNiche
      }

      console.log("Attempting registration with data:", registerData)

      try {
        const result = await register(registerData)
        if (result.success) {
          console.log("Registration successful!")
          // The useAuth hook should handle the redirect
        } else {
          console.error("Registration failed:", result.error)
        }
      } catch (error) {
        console.error("Registration error:", error)
      }
    } else {
      // Login logic - DON'T include role since backend doesn't use it
      const loginData = {
        email: formData.email,
        password: formData.password,
      }

      console.log("Attempting login with data:", loginData)

      try {
        const result = await login(loginData)
        if (result.success) {
          console.log("Login successful!")
          // The redirect will be handled by useAuth based on the user's actual role from the backend
        } else {
          console.error("Login failed:", result.error)
        }
      } catch (error) {
        console.error("Login error:", error)
      }
    }
  }

  const getRoleContent = () => {
    switch (selectedRole) {
      case "creator":
        return "Join thousands of creators earning with brands"
      case "agency":
        return "Manage campaigns and scale your creator network"
      case "brand":
        return "Connect with top-performing creators"
      default:
        return "Join LaunchPaid and start growing"
    }
  }

  // Show loading state while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated, show loading while redirect happens
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link href="/" className="mb-8 animate-fade-in">
          <Image src="/logo.png" alt="LaunchPAID Logo" width={180} height={40} className="h-10 w-auto" />
        </Link>

        {/* Main Auth Container */}
        <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Tabs
            defaultValue="signup"
            value={formType}
            onValueChange={(value) => setFormType(value as FormType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200"
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200"
              >
                Log In
              </TabsTrigger>
            </TabsList>

            {/* Glassmorphism Card */}
            <Card className="bg-gray-900/80 border border-gray-700/50 backdrop-blur-xl mt-1 shadow-2xl shadow-purple-500/10">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">
                  {formType === "signup" ? "Create Your Account" : "Welcome Back!"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {formType === "signup" ? "Create your account to get started" : "Log in to access your dashboard"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Display */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Role Selection - Only show for signup */}
                {formType === "signup" && (
                  <RoleSelection selectedRole={selectedRole} onRoleChange={handleRoleChange} />
                )}

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Sign Up Specific Fields */}
                  {formType === "signup" && (
                    <>
                      {/* Full Name - Always shown for signup */}
                      <div className="space-y-2">
                        <Label htmlFor="full-name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="full-name"
                            placeholder="Your Name"
                            value={formData.fullName}
                            onChange={(e) => updateFormData("fullName", e.target.value)}
                            className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      {/* TikTok Username - Only for creators */}
                      {selectedRole === "creator" && (
                        <div className="space-y-2">
                          <Label htmlFor="tiktok-username" className="text-sm font-medium">
                            TikTok Username <span className="text-gray-400">(optional)</span>
                          </Label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="tiktok-username"
                              placeholder="yourusername"
                              value={formData.tiktokUsername}
                              onChange={(e) => updateFormData("tiktokUsername", e.target.value)}
                              className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                            />
                          </div>
                        </div>
                      )}

                      {/* Company fields - Only for agencies and brands */}
                      {(selectedRole === "agency" || selectedRole === "brand") && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="company-name" className="text-sm font-medium">
                              Company Name
                            </Label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="company-name"
                                placeholder="Your Company Name"
                                value={formData.companyName}
                                onChange={(e) => updateFormData("companyName", e.target.value)}
                                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website-url" className="text-sm font-medium">
                              Website <span className="text-gray-400">(optional)</span>
                            </Label>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="website-url"
                                placeholder="https://example.com"
                                value={formData.websiteUrl}
                                onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Email - Always shown */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        className="pl-10 pr-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-2 text-gray-400 hover:text-white"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formType === "signup" && <PasswordStrength password={formData.password} />}
                  </div>

                  {/* Confirm Password (Sign Up Only) */}
                  {formType === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-2 text-gray-400 hover:text-white"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        {formData.confirmPassword && (
                          <div className="absolute right-10 top-1/2 -translate-y-1/2">
                            {formData.password === formData.confirmPassword ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Remember Me / Terms */}
                  <div className="space-y-3">
                    {formType === "login" ? (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => updateFormData("rememberMe", checked as boolean)}
                          className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <Label htmlFor="remember-me" className="text-sm text-gray-300">
                          Remember me
                        </Label>
                        <div className="flex-1" />
                        <Link href="#" className="text-sm text-purple-400 hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="accept-terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                          className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                        />
                        <Label htmlFor="accept-terms" className="text-sm text-gray-300 leading-relaxed">
                          I agree to the{" "}
                          <Link href="#" className="text-purple-400 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-purple-400 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {formType === "signup" ? "Creating Account..." : "Signing In..."}
                      </div>
                    ) : formType === "signup" ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Security Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield className="h-3 w-3" />
                  <span>Secure connection</span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-400">
                  {formType === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setFormType("login")}
                        className="text-purple-400 hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setFormType("signup")}
                        className="text-purple-400 hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </CardFooter>
            </Card>
          </Tabs>
        </div>

        {/* Role-specific messaging */}
        <div className="text-center mt-6 text-gray-400 max-w-md">
          <p className="text-sm">{getRoleContent()}</p>
        </div>
      </div>
    </div>
  )
}