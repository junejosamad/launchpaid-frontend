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
    rememberMe: false,
    acceptTerms: false,
  })

  // Use the auth hook
  const { login, register, isLoading, error, clearError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Clear error when switching between forms
    clearError()
  }, [formType, clearError])

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as Role)
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Fixed handleSubmit function that actually calls the API
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

      // Prepare registration data
      const registerData = {
        email: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        username: formData.tiktokUsername || formData.email.split("@")[0], // Use email prefix if no username
        role: selectedRole,
      }

      console.log("Attempting registration with data:", registerData)

      try {
        const result = await register(registerData)
        if (result.success) {
          console.log("Registration successful!")
          // Router will redirect automatically based on role
        } else {
          console.error("Registration failed:", result.error)
        }
      } catch (error) {
        console.error("Registration error:", error)
      }
    } else {
      // Login
      const loginData = {
        email: formData.email,
        password: formData.password,
      }

      console.log("Attempting login with data:", loginData)

      try {
        const result = await login(loginData)
        if (result.success) {
          console.log("Login successful!")
          // Router will redirect automatically based on role
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

  if (!mounted) return null

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

                {/* Role Selection (only for signup) */}
                {formType === "signup" && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">I am a...</Label>
                    <RadioGroup
                      defaultValue="creator"
                      value={selectedRole}
                      onValueChange={handleRoleChange}
                      className="grid grid-cols-3 gap-3"
                    >
                      {[
                        { value: "creator", label: "Creator", icon: <User className="h-4 w-4" /> },
                        { value: "agency", label: "Agency", icon: <Users className="h-4 w-4" /> },
                        { value: "brand", label: "Brand", icon: <Building className="h-4 w-4" /> },
                      ].map((role) => (
                        <Label
                          key={role.value}
                          htmlFor={`role-${role.value}-${formType}`}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02]
                                    ${
                                      selectedRole === role.value
                                        ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                                        : "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600"
                                    }`}
                        >
                          <RadioGroupItem value={role.value} id={`role-${role.value}-${formType}`} className="sr-only" />
                          {role.icon}
                          <span className="text-xs mt-1">{role.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Sign Up Specific Fields */}
                  {formType === "signup" && (
                    <>
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
                    </>
                  )}

                  {/* Email */}
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