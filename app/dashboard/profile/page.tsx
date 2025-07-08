"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { sharedServiceClient } from "@/lib/api/client"
import { ENDPOINTS, API_CONFIG } from "@/lib/api/config"
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Settings,
  Shield,
  Bell,
  Link,
  Star,
  Target,
  Calendar,
  Upload,
  Camera,
  Loader2,
} from "lucide-react"

// Type definitions
interface NotificationPreferences {
  sms: boolean
  email: boolean
  in_app: boolean
  campaigns: boolean
  payments: boolean
  opportunities: boolean
  performance: boolean
}

interface AudienceGenderSplit {
  male: number
  female: number
  other: number
}

interface AudienceAgeGroups {
  "13-17": number
  "18-24": number
  "25-34": number
  "35-44": number
  "45+": number
}

interface ProfileData {
  // Basic Info
  username: string
  first_name: string
  last_name: string
  email: string
  phone: string
  age: string
  gender: string
  ethnicity: string
  bio: string
  avatar_url?: string
  
  // Location
  shipping_address: string
  city: string
  state: string
  country: string
  zip_code: string
  
  // Social Media
  tiktok_handle: string
  instagram_handle: string
  youtube_handle: string
  discord_handle: string
  
  // Creator Specific
  primary_niche: string
  secondary_niches: string[]
  content_style: string[]
  
  // Audience Demographics
  audience_gender_split: AudienceGenderSplit
  audience_age_groups: AudienceAgeGroups
  audience_top_locations: string[]
  
  // Notification Preferences
  notifications: NotificationPreferences
}

// API Response type - matches backend field names
interface UserProfileResponse {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  age?: string
  gender?: string
  ethnicity?: string
  bio?: string
  profile_image_url?: string
  
  // Address fields
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  
  // Social media
  tiktok_handle?: string
  instagram_handle?: string
  youtube_handle?: string
  discord_handle?: string
  
  // Creator specific
  primary_niche?: string
  secondary_niches?: string[]
  content_style?: string[]
  audience_gender_split?: AudienceGenderSplit
  audience_age_groups?: AudienceAgeGroups
  audience_top_locations?: string[]
  notification_preferences?: NotificationPreferences
}

interface FileUploadResponse {
  url: string
  file_id: string
  file_name: string
  file_size: number
}

const NICHES = [
  "Beauty & Care",
  "Fashion",
  "Fitness & Health", 
  "Food & Cooking",
  "Technology",
  "Home & Living",
  "Outdoor & Sports",
  "Collectibles & Toys",
  "Entertainment",
  "Education",
  "Lifestyle",
  "Travel",
  "Gaming",
  "DIY & Crafts",
  "Parenting",
  "Finance",
  "Art & Design",
  "Music",
  "Pets",
  "Business"
]

const CONTENT_STYLES = [
  "Educational",
  "Entertainment", 
  "Reviews",
  "Tutorials",
  "Vlogs",
  "Comedy",
  "Inspirational",
  "Behind the Scenes",
  "Product Demos",
  "Unboxing",
  "Challenges",
  "Q&A"
]

export default function ProfilePage() {
  // Enhanced debug logging
  console.log("🔍 ProfilePage - Component Render Start", {
    timestamp: new Date().toISOString(),
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    tokens: {
      access_token: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false,
      auth_token: typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false,
    }
  })

  const router = useRouter()
  const authState = useAuth()
  const { user, isLoading: authLoading, isAuthenticated, refreshAuth } = authState
  const { toast } = useToast()

  // Log auth state
  console.log("🔐 ProfilePage - Auth State:", {
    user: user ? { id: user.id, email: user.email, role: user.role } : null,
    authLoading,
    isAuthenticated,
    authStateKeys: Object.keys(authState),
  })

  // All useState hooks
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [authCheckDone, setAuthCheckDone] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    ethnicity: "",
    bio: "",
    shipping_address: "",
    city: "",
    state: "",
    country: "United States",
    zip_code: "",
    tiktok_handle: "",
    instagram_handle: "",
    youtube_handle: "",
    discord_handle: "",
    primary_niche: "",
    secondary_niches: [],
    content_style: [],
    audience_gender_split: { male: 33, female: 67, other: 0 },
    audience_age_groups: {
      "13-17": 5,
      "18-24": 45,
      "25-34": 35,
      "35-44": 10,
      "45+": 5
    },
    audience_top_locations: [],
    notifications: {
      sms: true,
      email: true,
      in_app: true,
      campaigns: true,
      payments: true,
      opportunities: true,
      performance: false,
    }
  })

  // Auth check effect
  useEffect(() => {
    console.log("🚀 ProfilePage - Auth Check Effect Running", {
      authLoading,
      isAuthenticated,
      user: !!user,
      authCheckDone
    })

    if (!authLoading && !authCheckDone) {
      setAuthCheckDone(true)
      
      if (!isAuthenticated || !user) {
        console.log("❌ ProfilePage - Not authenticated, redirecting to /auth")
        router.push('/auth')
      } else if (user.role !== 'creator') {
        console.log("❌ ProfilePage - Not a creator, redirecting based on role:", user.role)
        router.push(user.role === 'admin' ? '/admin' : user.role === 'agency' ? '/agency' : '/dashboard')
      } else {
        console.log("✅ ProfilePage - Authentication verified, user is creator")
      }
    }
  }, [authLoading, isAuthenticated, user, router, authCheckDone])

  // Fetch profile when user is available
  useEffect(() => {
    console.log("📊 ProfilePage - Profile Fetch Effect", {
      user: !!user,
      isAuthenticated,
      loading
    })

    if (user && isAuthenticated) {
      fetchProfile()
    }
  }, [user, isAuthenticated])

  const fetchProfile = async () => {
    try {
      console.log("📡 ProfilePage - Starting profile fetch")
      setLoading(true)
      
      // Check tokens
      const accessToken = localStorage.getItem('access_token')
      const authToken = localStorage.getItem('auth_token')
      console.log('🔑 ProfilePage - Tokens available:', {
        hasAccessToken: !!accessToken,
        hasAuthToken: !!authToken,
        usingToken: accessToken ? 'access_token' : authToken ? 'auth_token' : 'none'
      })
      
      const response = await sharedServiceClient.get<UserProfileResponse>('/api/v1/me')
      
      console.log('✅ ProfilePage - Profile fetch response:', {
        success: response.success,
        hasData: !!response.data,
        dataKeys: response.data ? Object.keys(response.data) : [],
        error: response.error
      })
      
      if (response.success && response.data) {
        const userData = response.data as UserProfileResponse
        setProfileData(prev => ({
          ...prev,
          username: userData.username || "",
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || user?.email || "",
          phone: userData.phone || "",
          age: userData.age || "",
          gender: userData.gender || "",
          ethnicity: userData.ethnicity || "",
          bio: userData.bio || "",
          avatar_url: userData.profile_image_url || "",
          shipping_address: userData.address_line1 || "",
          city: userData.city || "",
          state: userData.state || "",
          country: userData.country || "United States",
          zip_code: userData.postal_code || "",
          tiktok_handle: userData.tiktok_handle || "",
          instagram_handle: userData.instagram_handle || "",
          youtube_handle: userData.youtube_handle || "",
          discord_handle: userData.discord_handle || "",
          primary_niche: userData.primary_niche || "",
          secondary_niches: userData.secondary_niches || [],
          content_style: userData.content_style || [],
          audience_gender_split: userData.audience_gender_split || { male: 33, female: 67, other: 0 },
          audience_age_groups: userData.audience_age_groups || {
            "13-17": 5,
            "18-24": 45,
            "25-34": 35,
            "35-44": 10,
            "45+": 5
          },
          audience_top_locations: userData.audience_top_locations || [],
          notifications: userData.notification_preferences || {
            sms: true,
            email: true,
            in_app: true,
            campaigns: true,
            payments: true,
            opportunities: true,
            performance: false,
          }
        }))
      } else {
        console.log("⚠️ ProfilePage - No profile data or unsuccessful response")
      }
    } catch (error: any) {
      console.error("❌ ProfilePage - Error fetching profile:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      })
      
      // Check if it's an auth error
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("🔒 ProfilePage - Auth error detected, redirecting to /auth")
        router.push('/auth')
      } else {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Save profile
  const saveProfile = async () => {
    try {
      setSaving(true)
      
      console.log('💾 ProfilePage - Saving profile')
      const response = await sharedServiceClient.patch('/api/v1/profile', {
        username: profileData.username,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        age: profileData.age,
        gender: profileData.gender,
        ethnicity: profileData.ethnicity,
        bio: profileData.bio,
        
        // Address fields
        address_line1: profileData.shipping_address,
        city: profileData.city,
        state: profileData.state,
        country: profileData.country,
        postal_code: profileData.zip_code,
        
        // Social media (without @ symbols)
        tiktok_handle: profileData.tiktok_handle.replace('@', ''),
        instagram_handle: profileData.instagram_handle.replace('@', ''),
        youtube_handle: profileData.youtube_handle.replace('@', ''),
        discord_handle: profileData.discord_handle,
        
        // Creator specific fields
        primary_niche: profileData.primary_niche,
        secondary_niches: profileData.secondary_niches,
        content_style: profileData.content_style,
        audience_gender_split: profileData.audience_gender_split,
        audience_age_groups: profileData.audience_age_groups,
        audience_top_locations: profileData.audience_top_locations,
        
        // Notification preferences  
        notification_preferences: profileData.notifications
      })
      
      if (response.success) {
        console.log('✅ ProfilePage - Profile saved successfully')
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
        
        // Refresh auth to update user data
        await refreshAuth()
        
        // If profile is complete, redirect to dashboard
        if (completionPercentage === 100) {
          router.push('/creator-dashboard')
        }
      } else {
        throw new Error(response.error || "Failed to update profile")
      }
    } catch (error: any) {
      console.error("❌ ProfilePage - Error saving profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingAvatar(true)
      
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "avatars")
      
      const response = await sharedServiceClient.upload<FileUploadResponse>(ENDPOINTS.SHARED.UPLOAD_FILE, formData)
      
      if (response.success && response.data) {
        const uploadData = response.data as FileUploadResponse
        setProfileData(prev => ({ ...prev, avatar_url: uploadData.url }))
        
        // Update profile with new avatar using shared-types service
        await sharedServiceClient.patch('/api/v1/profile', {
          profile_image_url: uploadData.url
        })
        
        toast({
          title: "Success",
          description: "Avatar uploaded successfully",
        })
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive"
      })
    } finally {
      setUploadingAvatar(false)
    }
  }

  // Add/Remove secondary niche
  const toggleSecondaryNiche = (niche: string) => {
    setProfileData(prev => ({
      ...prev,
      secondary_niches: prev.secondary_niches.includes(niche)
        ? prev.secondary_niches.filter(n => n !== niche)
        : [...prev.secondary_niches, niche]
    }))
  }

  // Add/Remove content style
  const toggleContentStyle = (style: string) => {
    setProfileData(prev => ({
      ...prev,
      content_style: prev.content_style.includes(style)
        ? prev.content_style.filter(s => s !== style)
        : [...prev.content_style, style]
    }))
  }

  // Add location
  const addLocation = (location: string) => {
    if (location && !profileData.audience_top_locations.includes(location)) {
      setProfileData(prev => ({
        ...prev,
        audience_top_locations: [...prev.audience_top_locations, location]
      }))
    }
  }

  // Remove location
  const removeLocation = (location: string) => {
    setProfileData(prev => ({
      ...prev,
      audience_top_locations: prev.audience_top_locations.filter(l => l !== location)
    }))
  }

  // Calculate profile completion
  const calculateCompletion = () => {
    const requiredFields = [
      profileData.first_name,
      profileData.last_name,
      profileData.phone,
      profileData.age,
      profileData.gender,
      profileData.shipping_address,
      profileData.city,
      profileData.state,
      profileData.zip_code,
      profileData.tiktok_handle,
      profileData.primary_niche,
      profileData.audience_top_locations.length > 0
    ]
    
    const completedFields = requiredFields.filter(field => !!field).length
    return Math.round((completedFields / requiredFields.length) * 100)
  }

  const completionPercentage = calculateCompletion()

  // Show loading state while auth is being checked
  if (authLoading || loading) {
    console.log("⏳ ProfilePage - Showing loading state", { authLoading, loading })
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Don't render the full page if not authenticated
  if (!user || !isAuthenticated) {
    console.log("🚫 ProfilePage - Not rendering, user not authenticated")
    return null
  }

  console.log("✨ ProfilePage - Rendering full page")

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="text-gray-400">Fill in your information to start earning with campaigns</p>
            </div>

            {/* Profile Completion Progress */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">{completionPercentage}% Profile Complete</h3>
                    <p className="text-gray-300">
                      {completionPercentage === 100 
                        ? "Your profile is complete!" 
                        : `${Math.ceil((100 - completionPercentage) / 10)} more sections to complete`}
                    </p>
                  </div>
                  <Button 
                    onClick={saveProfile}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
                <Progress value={completionPercentage} className="h-3 bg-gray-800" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Avatar Upload */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {profileData.avatar_url ? (
                          <img 
                            src={profileData.avatar_url} 
                            alt="Avatar" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                          <Upload className="h-4 w-4" />
                          Upload new photo
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                      />
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, username: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="email" 
                          value={profileData.email} 
                          className="bg-gray-800 border-gray-700" 
                          disabled 
                        />
                        {user?.isVerified && (
                          <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={profileData.first_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, first_name: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={profileData.last_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, last_name: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={profileData.age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, age: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={profileData.gender}
                        onValueChange={(value: string) => setProfileData({ ...profileData, gender: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Select 
                        value={profileData.ethnicity}
                        onValueChange={(value: string) => setProfileData({ ...profileData, ethnicity: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select ethnicity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="black">Black/African American</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="native">Native American</SelectItem>
                          <SelectItem value="pacific">Pacific Islander</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Tell brands about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Shipping */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Shipping
                    {!profileData.shipping_address && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shipping_address">Street Address</Label>
                    <Input
                      id="shipping_address"
                      placeholder="123 Main St"
                      value={profileData.shipping_address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, shipping_address: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Los Angeles"
                        value={profileData.city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, city: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="CA"
                        value={profileData.state}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, state: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input
                        id="zip_code"
                        placeholder="90210"
                        value={profileData.zip_code}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, zip_code: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={profileData.country}
                        onValueChange={(value: string) => setProfileData({ ...profileData, country: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Required for shipping product samples</p>
                </CardContent>
              </Card>

              {/* Social Media Handles */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Social Media Handles
                    {!profileData.tiktok_handle && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        TikTok Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tiktok_handle">TikTok Username</Label>
                    <Input
                      id="tiktok_handle"
                      value={profileData.tiktok_handle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, tiktok_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourtiktok"
                    />
                    <p className="text-sm text-gray-400 mt-1">Required for campaign participation</p>
                  </div>
                  <div>
                    <Label htmlFor="instagram_handle">Instagram Username</Label>
                    <Input
                      id="instagram_handle"
                      value={profileData.instagram_handle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, instagram_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourinstagram"
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube_handle">YouTube Channel</Label>
                    <Input
                      id="youtube_handle"
                      value={profileData.youtube_handle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, youtube_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourchannel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discord_handle">Discord Username</Label>
                    <Input
                      id="discord_handle"
                      value={profileData.discord_handle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({ ...profileData, discord_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="username#1234"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Niche Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Content Niche Preferences
                    {!profileData.primary_niche && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary_niche">Primary Niche</Label>
                    <Select 
                      value={profileData.primary_niche}
                      onValueChange={(value: string) => setProfileData({ ...profileData, primary_niche: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select your primary niche" />
                      </SelectTrigger>
                      <SelectContent>
                        {NICHES.map(niche => (
                          <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Secondary Niches</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {NICHES.filter(n => n !== profileData.primary_niche).map((niche) => (
                        <Badge 
                          key={niche} 
                          variant={profileData.secondary_niches.includes(niche) ? "default" : "outline"}
                          className={profileData.secondary_niches.includes(niche) 
                            ? "bg-purple-600/20 text-purple-400 cursor-pointer" 
                            : "cursor-pointer hover:bg-gray-800"
                          }
                          onClick={() => toggleSecondaryNiche(niche)}
                        >
                          {niche}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Content Style</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {CONTENT_STYLES.map((style) => (
                        <Badge 
                          key={style} 
                          variant={profileData.content_style.includes(style) ? "default" : "outline"}
                          className={profileData.content_style.includes(style) 
                            ? "bg-purple-600/20 text-purple-400 cursor-pointer" 
                            : "cursor-pointer hover:bg-gray-800"
                          }
                          onClick={() => toggleContentStyle(style)}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Demographics */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Audience Demographics
                    {profileData.audience_top_locations.length === 0 && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Gender Distribution (%)</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="gender_male" className="text-xs">Male</Label>
                        <Input
                          id="gender_male"
                          type="number"
                          min="0"
                          max="100"
                          value={profileData.audience_gender_split.male}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              male: parseInt(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender_female" className="text-xs">Female</Label>
                        <Input
                          id="gender_female"
                          type="number"
                          min="0"
                          max="100"
                          value={profileData.audience_gender_split.female}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              female: parseInt(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender_other" className="text-xs">Other</Label>
                        <Input
                          id="gender_other"
                          type="number"
                          min="0"
                          max="100"
                          value={profileData.audience_gender_split.other}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              other: parseInt(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Age Distribution (%)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(profileData.audience_age_groups).map(([range, percentage]) => (
                        <div key={range}>
                          <Label htmlFor={`age_${range}`} className="text-xs">{range}</Label>
                          <Input
                            id={`age_${range}`}
                            type="number"
                            min="0"
                            max="100"
                            value={percentage}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({
                              ...prev,
                              audience_age_groups: {
                                ...prev.audience_age_groups,
                                [range]: parseInt(e.target.value) || 0
                              } as AudienceAgeGroups
                            }))}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Top Audience Locations</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="add-location"
                          placeholder="Add a country (e.g., United States)"
                          className="bg-gray-800 border-gray-700"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement
                              addLocation(input.value)
                              input.value = ''
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById('add-location') as HTMLInputElement
                            if (input) {
                              addLocation(input.value)
                              input.value = ''
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.audience_top_locations.map(location => (
                          <Badge 
                            key={location} 
                            variant="secondary" 
                            className="bg-purple-600/20 text-purple-400"
                          >
                            {location}
                            <button
                              onClick={() => removeLocation(location)}
                              className="ml-2 hover:text-red-400"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-400">Receive text messages for urgent updates</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive email updates and summaries</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>In-app Notifications</Label>
                        <p className="text-sm text-gray-400">Show notifications within the app</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.in_app}
                        onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, in_app: checked }
                        }))}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Notification Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Campaign opportunities</span>
                        <Switch
                          checked={profileData.notifications.campaigns}
                          onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, campaigns: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment confirmations</span>
                        <Switch
                          checked={profileData.notifications.payments}
                          onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, payments: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New opportunities</span>
                        <Switch
                          checked={profileData.notifications.opportunities}
                          onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, opportunities: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Performance updates</span>
                        <Switch
                          checked={profileData.notifications.performance}
                          onCheckedChange={(checked: boolean) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, performance: checked }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Profile Completion Checklist */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    {profileData.first_name && profileData.last_name ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Basic Information</div>
                      <div className="text-xs text-gray-400">Name, age, contact details</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.shipping_address && profileData.city && profileData.state && profileData.zip_code ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Shipping Address</div>
                      <div className="text-xs text-gray-400">Required for product samples</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.tiktok_handle ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">TikTok Handle</div>
                      <div className="text-xs text-gray-400">Main platform for campaigns</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.primary_niche ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Content Niche</div>
                      <div className="text-xs text-gray-400">For campaign matching</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.audience_top_locations.length > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Audience Demographics</div>
                      <div className="text-xs text-gray-400">Help brands understand your reach</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/campaigns')}
                    disabled={completionPercentage < 100}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Browse Campaigns
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/integrations')}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Connect TikTok Shop
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/help')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Tips */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-400">
                  <p>• Use a clear profile picture that shows your face</p>
                  <p>• Be specific about your content niches to get matched with relevant campaigns</p>
                  <p>• Keep your audience demographics updated for better campaign opportunities</p>
                  <p>• Connect all your social media accounts to show your full reach</p>
                  <p>• Write a compelling bio that showcases your unique value</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}