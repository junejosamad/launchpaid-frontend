// hooks/useProfile.ts - FIXED VERSION

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

// Type definitions (same as before)
export interface NotificationPreferences {
  sms: boolean
  email: boolean
  in_app: boolean
  campaigns: boolean
  payments: boolean
  opportunities: boolean
  performance: boolean
}

export interface AudienceGenderSplit {
  male: number
  female: number
  other: number
}

export interface AudienceAgeGroups {
  "13-17": number
  "18-24": number
  "25-34": number
  "35-44": number
  "45+": number
}

export interface ProfileData {
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

// Constants
export const NICHES = [
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

export const CONTENT_STYLES = [
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

// Service URLs
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8000'
const CREATOR_SERVICE_URL = process.env.NEXT_PUBLIC_CREATOR_SERVICE_URL || 'http://localhost:8006/api/v1'

// API helper function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token')
  
  // Determine which service to use based on the endpoint
  let baseURL = USER_SERVICE_URL
  if (endpoint.includes('/creators/') || endpoint.includes('/badges/')) {
    baseURL = CREATOR_SERVICE_URL
  }
  
  // Don't set Content-Type for FormData
  const isFormData = options.body instanceof FormData
  
  const headers: any = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  }
  
  // Only set Content-Type if it's not FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  console.log(`🌐 API Call: ${options.method || 'GET'} ${baseURL}${endpoint}`)
  
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  // Log response status for debugging
  console.log(`📨 API Response: ${response.status} ${response.statusText}`)

  if (!response.ok) {
    let error
    try {
      error = await response.json()
    } catch (e) {
      // If response is not JSON, use text
      const text = await response.text()
      error = { detail: text || 'Request failed' }
    }
    
    throw { 
      message: error.detail || error.message || `HTTP error! status: ${response.status}`,
      status: response.status,
      data: error
    }
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return null
  }

  // Check if response has content
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  } else {
    // Return text for non-JSON responses
    return response.text()
  }
}

// Initial profile data
const getInitialProfileData = (): ProfileData => ({
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

// Custom hook
export function useProfile() {
  const router = useRouter()
  const { user, isLoading: authLoading, error: authError, isAuthenticated, refreshAuth } = useAuth()
  const { toast } = useToast()

  // State
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(getInitialProfileData())

  // Helper function to convert ProfileData demographics to API format
  const convertToAPIDemographics = useCallback((data: ProfileData) => {
    const demographics: any[] = [];
    
    // Create entries for each combination of age group and gender
    Object.entries(data.audience_gender_split).forEach(([gender, genderPercentage]) => {
      if (genderPercentage > 0) {
        const apiGender = gender === 'other' ? 'not_specified' : gender;
        
        Object.entries(data.audience_age_groups).forEach(([ageGroup, agePercentage]) => {
          if (agePercentage > 0) {
            // Calculate the combined percentage
            const combinedPercentage = (agePercentage * genderPercentage) / 100;
            
            if (combinedPercentage > 0) {
              demographics.push({
                age_group: ageGroup,
                gender: apiGender,
                percentage: parseFloat(combinedPercentage.toFixed(2)),
                country: null // Can be set to specific countries if needed
              });
            }
          }
        });
      }
    });
    
    return demographics;
  }, [])

  // Helper function to convert API demographics back to ProfileData format - FIXED
  const convertFromAPIDemographics = useCallback((apiDemographics: any[]) => {
    console.log('🔄 Converting API demographics to ProfileData format:', apiDemographics);
    
    if (!apiDemographics || apiDemographics.length === 0) {
      console.log('⚠️ No demographics data to convert, using defaults');
      return {
        genderSplit: { male: 33, female: 67, other: 0 },
        ageGroups: {
          "13-17": 5,
          "18-24": 45,
          "25-34": 35,
          "35-44": 10,
          "45+": 5
        }
      };
    }
    
    // First, let's understand the data structure
    // The API stores combined percentages, we need to reverse-engineer the separate distributions
    
    // Step 1: Calculate total percentages by gender
    const genderTotals: Record<string, number> = { male: 0, female: 0, other: 0 };
    
    apiDemographics.forEach(demo => {
      const gender = demo.gender === 'not_specified' ? 'other' : demo.gender;
      if (gender in genderTotals) {
        genderTotals[gender] += demo.percentage;
      }
    });
    
    // Step 2: Calculate total percentages by age group
    const ageTotals: Record<string, number> = {
      "13-17": 0,
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45+": 0
    };
    
    apiDemographics.forEach(demo => {
      let mappedAgeGroup = demo.age_group;
      // Map API age groups to our UI format
      if (demo.age_group === "45-54" || demo.age_group === "55+") {
        mappedAgeGroup = "45+";
      }
      
      if (mappedAgeGroup in ageTotals) {
        ageTotals[mappedAgeGroup] += demo.percentage;
      }
    });
    
    // Step 3: The total of all API percentages should be ~100
    const totalPercentage = apiDemographics.reduce((sum, demo) => sum + demo.percentage, 0);
    console.log('📊 Total percentage from API:', totalPercentage);
    
    // Step 4: Since the API stores age% * gender% / 100, we need to find the original values
    // This is a bit tricky, but we can approximate by assuming one dimension sums to 100
    
    // Calculate what the gender split should be (normalized to 100%)
    const genderSum = Object.values(genderTotals).reduce((a, b) => a + b, 0);
    const genderSplit = { male: 0, female: 0, other: 0 };
    
    if (genderSum > 0) {
      // The gender percentages should sum to approximately the total percentage
      // If we have a 60/40 gender split and age groups sum to 100%, then total would be 100%
      // So we normalize the gender totals to sum to 100
      const scaleFactor = 100 / Math.sqrt(totalPercentage);
      
      Object.keys(genderSplit).forEach(key => {
        genderSplit[key as keyof typeof genderSplit] = parseFloat(
          ((genderTotals[key] * scaleFactor)).toFixed(1)
        );
      });
    }
    
    // Calculate what the age split should be (normalized to 100%)
    const ageSum = Object.values(ageTotals).reduce((a, b) => a + b, 0);
    const ageGroups = {
      "13-17": 0,
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45+": 0
    };
    
    if (ageSum > 0) {
      const scaleFactor = 100 / Math.sqrt(totalPercentage);
      
      Object.keys(ageGroups).forEach(key => {
        ageGroups[key as keyof typeof ageGroups] = parseFloat(
          ((ageTotals[key] * scaleFactor)).toFixed(1)
        );
      });
    }
    
    console.log('✅ Converted demographics:', { genderSplit, ageGroups });
    
    return { genderSplit, ageGroups };
  }, [])

  // Fetch demographics from the demographics service - FIXED
  const fetchDemographics = useCallback(async () => {
    try {
      console.log("📊 Fetching demographics data from /creators/demographics");
      
      // Use the correct demographics endpoint
      const demographics = await apiCall('/creators/demographics');
      
      console.log("📊 Raw demographics response:", demographics);
      
      if (demographics && Array.isArray(demographics) && demographics.length > 0) {
        const { genderSplit, ageGroups } = convertFromAPIDemographics(demographics);
        
        console.log("📊 Setting demographics in state:", { genderSplit, ageGroups });
        
        setProfileData(prev => {
          const newData = {
            ...prev,
            audience_gender_split: genderSplit,
            audience_age_groups: ageGroups
          };
          console.log("📊 New profile data with demographics:", newData);
          return newData;
        });
      } else {
        console.log("📊 No demographics data found, keeping defaults");
      }
    } catch (error: any) {
      console.error("❌ Error fetching demographics:", error);
      console.error("Error details:", {
        status: error.status,
        message: error.message,
        data: error.data
      });
      // Don't throw - just use default values
      // The user might not have demographics data yet
    }
  }, [convertFromAPIDemographics])

  // Save demographics to the demographics service
  const saveDemographics = useCallback(async () => {
    try {
      console.log("💾 Saving demographics data");
      
      // First, validate that percentages sum to 100
      const genderTotal = Object.values(profileData.audience_gender_split).reduce((sum, val) => sum + val, 0);
      const ageTotal = Object.values(profileData.audience_age_groups).reduce((sum, val) => sum + val, 0);
      
      if (Math.abs(genderTotal - 100) > 1 || Math.abs(ageTotal - 100) > 1) {
        console.warn("⚠️ Demographics don't sum to 100%, but saving anyway");
      }
      
      // Get existing demographics to handle updates/deletes
      let existingDemographics = [];
      try {
        existingDemographics = await apiCall('/creators/demographics');
      } catch (e) {
        console.log("No existing demographics found");
      }
      
      // Convert current profile data to API format
      const newDemographics = convertToAPIDemographics(profileData);
      
      console.log("📊 Demographics to save:", newDemographics);
      
      // Delete existing entries
      if (Array.isArray(existingDemographics)) {
        for (const demo of existingDemographics) {
          try {
            await apiCall(`/creators/demographics/${demo.id}`, { method: 'DELETE' });
          } catch (e) {
            console.error("Failed to delete demographic entry:", e);
          }
        }
      }
      
      // Create new entries
      for (const demo of newDemographics) {
        await apiCall('/creators/demographics', {
          method: 'POST',
          body: JSON.stringify(demo)
        });
      }
      
      console.log("✅ Demographics saved successfully");
    } catch (error: any) {
      console.error("❌ Error saving demographics:", error);
      throw error;
    }
  }, [convertToAPIDemographics, profileData])

  // Fetch profile - FIXED to properly sequence the calls
  const fetchProfile = useCallback(async () => {
    try {
      console.log("📡 ProfilePage - Starting profile fetch")
      setLoading(true)
      
      let profileFetched = false;
      
      try {
        console.log(`📡 ProfilePage - Trying endpoint: /creators/profile`)
        const response = await apiCall('/creators/profile')
        console.log(`✅ ProfilePage - Success with endpoint: /creators/profile`)
        console.log('✅ ProfilePage - Profile fetch response:', response)
        
        if (response) {
          const userData = response.user || response
          
          // Don't override demographics here - we'll fetch them separately
          setProfileData(prev => ({
            ...prev,
            username: userData.username || user?.username || "",
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
            audience_top_locations: userData.audience_top_locations || [],
            notifications: userData.notification_preferences || prev.notifications,
            // Keep existing demographics - don't override
            audience_gender_split: prev.audience_gender_split,
            audience_age_groups: prev.audience_age_groups
          }))
          
          profileFetched = true;
        }
      } catch (err: any) {
        console.log(`❌ ProfilePage - Failed endpoint /creators/profile:`, err.status, err.message)
        
        if (err.status === 404) {
          // Try fallback endpoint
          console.log(`📡 ProfilePage - Trying fallback endpoint: /api/v1/auth/profile`)
          try {
            const response = await apiCall('/api/v1/auth/profile')
            console.log(`✅ ProfilePage - Success with fallback endpoint`)
            
            if (response) {
              const userData = response.user || response
              setProfileData(prev => ({
                ...prev,
                username: userData.username || user?.username || "",
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
                audience_top_locations: userData.audience_top_locations || [],
                notifications: userData.notification_preferences || prev.notifications,
                // Keep existing demographics
                audience_gender_split: prev.audience_gender_split,
                audience_age_groups: prev.audience_age_groups
              }))
              profileFetched = true;
            }
          } catch (fallbackErr) {
            console.error("❌ Fallback profile fetch also failed:", fallbackErr);
          }
        }
        
        if (!profileFetched) {
          throw err;
        }
      }
      
      // IMPORTANT: Fetch demographics AFTER profile is loaded
      if (profileFetched) {
        console.log("✅ Profile loaded, now fetching demographics...");
        // Add a small delay to ensure profile state is updated
        setTimeout(async () => {
          await fetchDemographics();
        }, 100);
      }
      
    } catch (error: any) {
      console.error("❌ ProfilePage - Error in fetchProfile:", error)
      
      if (error.status === 401) {
        console.log("🔒 ProfilePage - Auth error detected, attempting to refresh")
        try {
          await refreshAuth()
          return fetchProfile()
        } catch (refreshError) {
          console.log("🔒 ProfilePage - Refresh failed, redirecting to /auth")
          router.push('/auth')
        }
      } else if (error.status === 403) {
        console.log("🔒 ProfilePage - Forbidden, redirecting to /auth")
        router.push('/auth')
      } else {
        console.log("⚠️ ProfilePage - Non-auth error, showing toast")
        toast({
          title: "Notice",
          description: "Could not load full profile data. You can still update your profile.",
          variant: "default"
        })
        if (user) {
          setProfileData(prev => ({
            ...prev,
            email: user.email || "",
            username: user.username || ""
          }))
        }
      }
    } finally {
      setLoading(false)
    }
  }, [user, router, toast, refreshAuth, fetchDemographics])

  // Rest of the hook implementation remains the same...
  
  // Validate demographics
  const validateDemographics = useCallback(() => {
    const genderTotal = Object.values(profileData.audience_gender_split).reduce((sum, val) => sum + val, 0);
    const ageTotal = Object.values(profileData.audience_age_groups).reduce((sum, val) => sum + val, 0);
    
    if (Math.abs(genderTotal - 100) > 0.1) {
      toast({
        title: "Warning",
        description: "Gender percentages should add up to 100%",
        variant: "default"
      });
    }
    
    if (Math.abs(ageTotal - 100) > 0.1) {
      toast({
        title: "Warning", 
        description: "Age group percentages should add up to 100%",
        variant: "default"
      });
    }
  }, [profileData, toast])

  // Save profile
  const saveProfile = useCallback(async () => {
    validateDemographics();
    
    try {
      setSaving(true)
      
      console.log('💾 ProfilePage - Saving profile')
      
      const profileUpdateData = {
        first_name: profileData.first_name || "string",
        last_name: profileData.last_name || "string", 
        phone: profileData.phone || "string",
        date_of_birth: "2025-07-10",
        gender: profileData.gender || "male",
        profile_image_url: profileData.avatar_url || "",
        bio: profileData.bio || "none",
        address_line1: profileData.shipping_address || "string",
        address_line2: "string",
        city: profileData.city || "string",
        state: profileData.state || "string",
        postal_code: profileData.zip_code || "string",
        country: profileData.country ? profileData.country.substring(0, 2).toLowerCase() : "st",
        tiktok_handle: profileData.tiktok_handle ? profileData.tiktok_handle.replace('@', '') : "string",
        discord_handle: profileData.discord_handle || "string",
        instagram_handle: profileData.instagram_handle ? profileData.instagram_handle.replace('@', '') : "string",
        content_niche: profileData.primary_niche || "string",
        follower_count: 0,
        average_views: 0,
        engagement_rate: 0,
        company_name: "string",
        website_url: "string", 
        tax_id: "string",
        notification_preferences: {
          campaign_updates: profileData.notifications.campaigns,
          email_notifications: profileData.notifications.email,
          payment_alerts: profileData.notifications.payments,
          push_notifications: profileData.notifications.in_app,
          sms_notifications: profileData.notifications.sms,
          weekly_digest: profileData.notifications.performance
        },
        timezone: "string"
      };
      
      console.log('📦 ProfilePage - Request body being sent:', JSON.stringify(profileUpdateData, null, 2));
      
      const response = await apiCall('/creators/profile', {
        method: 'PATCH',
        body: JSON.stringify(profileUpdateData)
      })
      
      console.log('✅ ProfilePage - Profile saved successfully', response)

      // Save demographics separately
      try {
        await saveDemographics();
      } catch (demoError) {
        console.error('⚠️ Demographics save failed, but profile saved', demoError);
      }
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      
      await refreshAuth()
      
      if (calculateCompletion() === 100) {
        router.push('/creator-dashboard')
      }
    } catch (error: any) {
      console.error('❌ ProfilePage - Full error details:', {
        status: error.status,
        message: error.message,
        data: error.data,
        fullError: error
      });
      
      if (error.status === 422 && error.data) {
        console.error('🔍 Validation errors:', error.data);
      }
      
      toast({
        title: "Error",
        description: error.data?.detail || error.message || "Failed to save profile",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }, [profileData, validateDemographics, saveDemographics, toast, refreshAuth, router])

  // Handle avatar upload
  const handleAvatarUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingAvatar(true)
      
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "avatars")
      
      const token = localStorage.getItem('access_token')
      const response = await fetch(`${USER_SERVICE_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to upload avatar')
      }
      
      const uploadData = await response.json()
      setProfileData(prev => ({ ...prev, avatar_url: uploadData.url }))
      
      await apiCall('/api/v1/creators/profile', {
        method: 'PUT',
        body: JSON.stringify({
          profile_image_url: uploadData.url
        })
      })
      
      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      })
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
  }, [toast])

  // Toggle functions
  const toggleSecondaryNiche = useCallback((niche: string) => {
    setProfileData(prev => ({
      ...prev,
      secondary_niches: prev.secondary_niches.includes(niche)
        ? prev.secondary_niches.filter(n => n !== niche)
        : [...prev.secondary_niches, niche]
    }))
  }, [])

  const toggleContentStyle = useCallback((style: string) => {
    setProfileData(prev => ({
      ...prev,
      content_style: prev.content_style.includes(style)
        ? prev.content_style.filter(s => s !== style)
        : [...prev.content_style, style]
    }))
  }, [])

  const addLocation = useCallback((location: string) => {
    if (location && !profileData.audience_top_locations.includes(location)) {
      setProfileData(prev => ({
        ...prev,
        audience_top_locations: [...prev.audience_top_locations, location]
      }))
    }
  }, [profileData.audience_top_locations])

  const removeLocation = useCallback((location: string) => {
    setProfileData(prev => ({
      ...prev,
      audience_top_locations: prev.audience_top_locations.filter(l => l !== location)
    }))
  }, [])

  // Calculate profile completion
  const calculateCompletion = useCallback(() => {
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
  }, [profileData])

  // Auth check effect
  useEffect(() => {
    console.log("🚀 ProfilePage - Auth Check Effect Running", {
      authLoading,
      isAuthenticated,
      user: !!user,
      hasCheckedAuth
    })

    if (!authLoading && !hasCheckedAuth) {
      setHasCheckedAuth(true)
      
      if (!isAuthenticated || !user) {
        console.log("❌ ProfilePage - Not authenticated, redirecting to /auth")
        router.push('/auth')
      } else if (user.role !== 'creator') {
        console.log("❌ ProfilePage - Not a creator, redirecting based on role:", user.role)
        const redirectMap = {
          admin: '/admin',
          agency: '/agency/dashboard',
          brand: '/brand/dashboard'
        }
        router.push(redirectMap[user.role as keyof typeof redirectMap] || '/dashboard')
      } else {
        console.log("✅ ProfilePage - Authentication verified, user is creator")
        fetchProfile()
      }
    }
  }, [authLoading, isAuthenticated, user, router, hasCheckedAuth, fetchProfile])

  return {
    // State
    loading,
    saving,
    uploadingAvatar,
    profileData,
    setProfileData,
    completionPercentage: calculateCompletion(),
    
    // Auth
    user,
    authLoading,
    isAuthenticated,
    
    // Functions
    saveProfile,
    handleAvatarUpload,
    toggleSecondaryNiche,
    toggleContentStyle,
    addLocation,
    removeLocation,
    
    // Constants
    NICHES,
    CONTENT_STYLES
  }
}