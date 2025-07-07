"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Plus, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { campaignServiceClient } from "@/lib/api/client"
import { useAuth } from "@/hooks/useAuth"

interface CampaignCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

const brands = [
  { id: "neuro-gum", name: "Neuro Gum", logo: "/placeholder.svg?height=32&width=32" },
  { id: "drbioccare", name: "DrBioCare", logo: "/placeholder.svg?height=32&width=32" },
  { id: "flexpromeals", name: "FlexProMeals", logo: "/placeholder.svg?height=32&width=32" },
  { id: "golf-partner", name: "Golf Partner", logo: "/placeholder.svg?height=32&width=32" },
  { id: "fashion-nova", name: "Fashion Nova", logo: "/placeholder.svg?height=32&width=32" },
]

export function CampaignCreationModal({ isOpen, onClose }: CampaignCreationModalProps) {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    campaignName: "",
    brandId: "",
    thumbnail: null as File | null,
    description: "",
    campaignType: "one-time",
    startDate: "",
    endDate: "",
    gracePeriod: 3,

    // Step 2: Payout Structure
    payoutType: "pay-per-post",
    baseRate: 0,
    minimumPosts: 1,
    commissionPercentage: 0,
    minimumGmv: 0,
    bonusTiers: [] as Array<{ threshold: number; bonus: number; type: "flat" | "percentage" }>,
    leaderboardBonus: false,
    topCreatorsCount: 3,
    referralProgram: false,
    referralRate: 0,

    // Step 3: Creator Management
    totalCapacity: 25,
    segments: [] as Array<{ name: string; limit: number; deliverables: number }>,
    maxCampaignsPerCreator: 3,
    autoApproval: false,

    // Step 4: Tracking & Integrations
    trackingMethod: "hashtag",
    hashtags: [""],
    productUrls: [""],
    discordRoles: false,
    discordRequired: false,
    discordChannel: false,
    requireApproval: true,
    autoSms: true,
    emailNotifications: true,

    // Step 5: Goals & Launch
    goalType: "gmv",
    targetGmv: 0,
    targetPosts: 0,
    trackMetrics: [] as string[],
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  // Test Authentication Function
  const testAuthentication = async () => {
    setShowDebugInfo(true)
    const debug: any = {
      timestamp: new Date().toISOString(),
      tokens: {},
      tests: []
    }

    try {
      // Check current tokens
      const authToken = localStorage.getItem("auth_token")
      const accessToken = localStorage.getItem("access_token")
      debug.tokens = {
        hasAuthToken: !!authToken,
        hasAccessToken: !!accessToken,
        authTokenPreview: authToken ? `${authToken.substring(0, 30)}...` : null,
        accessTokenPreview: accessToken ? `${accessToken.substring(0, 30)}...` : null,
      }

      // Test 1: Create test token
      console.log("🧪 Test 1: Creating test token...")
      const testTokenResponse = await campaignServiceClient.post("/api/v1/auth/test-token")
      debug.tests.push({
        name: "Create Test Token",
        success: testTokenResponse.success,
        data: testTokenResponse.data,
        error: testTokenResponse.error
      })

      // Test 2: Verify current token
      console.log("🧪 Test 2: Verifying current token...")
      const verifyResponse = await campaignServiceClient.get("/api/v1/auth/verify")
      debug.tests.push({
        name: "Verify Current Token",
        success: verifyResponse.success,
        data: verifyResponse.data,
        error: verifyResponse.error
      })

      // Test 3: Test campaign endpoint
      console.log("🧪 Test 3: Testing campaign endpoint...")
      const testEndpointResponse = await campaignServiceClient.get("/api/v1/test")
      debug.tests.push({
        name: "Test Campaign Endpoint",
        success: testEndpointResponse.success,
        data: testEndpointResponse.data,
        error: testEndpointResponse.error
      })

      // Test 4: Test creating a campaign with test data
      if (testTokenResponse.success && testTokenResponse.data?.tokens?.agency) {
        console.log("🧪 Test 4: Testing campaign creation with agency token...")
        
        // Temporarily set the test token
        const originalToken = localStorage.getItem("auth_token")
        campaignServiceClient.setAuthTokens(testTokenResponse.data.tokens.agency)
        
        const testCampaignResponse = await campaignServiceClient.post("/api/v1/debug/test-campaign", {
          name: "Test Campaign from Modal",
          payout_model: "fixed_per_post",
          tracking_method: "hashtag",
          budget: 1000
        })
        
        debug.tests.push({
          name: "Test Campaign Creation",
          success: testCampaignResponse.success,
          data: testCampaignResponse.data,
          error: testCampaignResponse.error
        })
        
        // Restore original token
        if (originalToken) {
          campaignServiceClient.setAuthTokens(originalToken)
        }
      }

      setDebugInfo(debug)
      
      // Show results in toast
      const failedTests = debug.tests.filter((t: any) => !t.success)
      if (failedTests.length === 0) {
        toast({
          title: "✅ All authentication tests passed!",
          description: "Your authentication is working correctly.",
        })
      } else {
        toast({
          title: "⚠️ Some authentication tests failed",
          description: `${failedTests.length} out of ${debug.tests.length} tests failed. Check console for details.`,
          variant: "destructive"
        })
      }

    } catch (error: any) {
      console.error("❌ Authentication test error:", error)
      debug.error = error.message
      setDebugInfo(debug)
      
      toast({
        title: "❌ Authentication test failed",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  // Convert form data to API format
  const formatCampaignData = () => {
    // Map payout types to backend enum values
    const payoutModelMap: { [key: string]: string } = {
      "pay-per-post": "fixed_per_post",
      "gmv-retainer": "gmv_commission",
      "hybrid": "hybrid"
    }

    // Map tracking method
    const trackingMethodMap: { [key: string]: string } = {
      "hashtag": "hashtag",
      "product-links": "product_link"
    }

    const data = {
      // Basic Information
      name: formData.campaignName,
      description: formData.description || "",
      payout_model: payoutModelMap[formData.payoutType] || "fixed_per_post",
      tracking_method: trackingMethodMap[formData.trackingMethod] || "hashtag",
      type: "performance", // Default type
      start_date: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
      end_date: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
      grace_period_days: formData.gracePeriod,
      is_rolling_30_day: formData.campaignType === "rolling",

      // Creator Management
      max_creators: formData.totalCapacity,
      min_deliverables_per_creator: formData.minimumPosts,
      require_approval: !formData.autoApproval,
      require_discord_join: formData.discordRequired,

      // Payout Configuration
      base_payout_per_post: formData.baseRate,
      gmv_commission_rate: formData.commissionPercentage,
      retainer_amount: formData.payoutType === "gmv-retainer" ? formData.baseRate : 0,
      
      // Budget and Goals
      budget: formData.targetGmv || 0,
      total_budget: formData.targetGmv || 0,
      target_gmv: formData.goalType === "gmv" ? formData.targetGmv : undefined,
      target_posts: formData.goalType === "posts" ? formData.targetPosts : undefined,
      target_creators: formData.totalCapacity,

      // Tracking
      hashtag: formData.hashtags.filter(h => h).join(" "),
      tiktok_product_links: formData.productUrls.filter(url => url),

      // Referral
      referral_bonus_enabled: formData.referralProgram,
      referral_bonus_amount: formData.referralRate,

      // Brand ID if selected
      brand_id: formData.brandId || undefined,
    }

    console.log('📊 Final campaign data being sent:', {
      ...data,
      hasToken: !!localStorage.getItem('auth_token'),
      currentPath: window.location.pathname,
      timestamp: new Date().toISOString()
    })

    return data
  }

  const validateForm = () => {
    const errors = []

    // Step 1 validation
    if (!formData.campaignName) errors.push("Campaign name is required")
    if (!formData.startDate) errors.push("Start date is required")
    if (!formData.endDate) errors.push("End date is required")
    
    // Step 2 validation
    if (formData.payoutType === "pay-per-post" && formData.baseRate <= 0) {
      errors.push("Base rate must be greater than 0")
    }
    if (formData.payoutType === "gmv-retainer" && formData.commissionPercentage <= 0) {
      errors.push("Commission percentage must be greater than 0")
    }

    // Step 5 validation
    if (formData.goalType === "gmv" && formData.targetGmv <= 0) {
      errors.push("Target GMV must be greater than 0")
    }
    if (formData.goalType === "posts" && formData.targetPosts <= 0) {
      errors.push("Target posts must be greater than 0")
    }

    return errors
  }

  const handleLaunchCampaign = async () => {
    // Validate form
    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Refresh auth first to ensure token is valid
      console.log("🔄 Refreshing authentication...")
      await refreshAuth()

      // Check if we have a valid token
      const token = localStorage.getItem("auth_token") || localStorage.getItem("access_token")
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in again to continue.",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      // Format data for API
      const campaignData = formatCampaignData()
      
      console.log("🚀 Creating campaign with data:", campaignData)

      // Call API
      const response = await campaignServiceClient.post("/api/v1/campaigns/", campaignData)

      console.log("📡 Campaign creation response:", response)

      if (response.success && response.data) {
        toast({
          title: "Campaign Created!",
          description: `${formData.campaignName} has been successfully launched.`,
          duration: 5000,
        })

        // Reset form and close modal
        setCurrentStep(1)
        setFormData({
          campaignName: "",
          brandId: "",
          thumbnail: null,
          description: "",
          campaignType: "one-time",
          startDate: "",
          endDate: "",
          gracePeriod: 3,
          payoutType: "pay-per-post",
          baseRate: 0,
          minimumPosts: 1,
          commissionPercentage: 0,
          minimumGmv: 0,
          bonusTiers: [],
          leaderboardBonus: false,
          topCreatorsCount: 3,
          referralProgram: false,
          referralRate: 0,
          totalCapacity: 25,
          segments: [],
          maxCampaignsPerCreator: 3,
          autoApproval: false,
          trackingMethod: "hashtag",
          hashtags: [""],
          productUrls: [""],
          discordRoles: false,
          discordRequired: false,
          discordChannel: false,
          requireApproval: true,
          autoSms: true,
          emailNotifications: true,
          goalType: "gmv",
          targetGmv: 0,
          targetPosts: 0,
          trackMetrics: [],
        })
        
        // Refresh the page if we're on campaigns page
        if (typeof window !== 'undefined' && window.location.pathname.includes('campaigns')) {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
        
        onClose()
      } else {
        throw new Error(response.error || "Failed to create campaign")
      }
    } catch (error: any) {
      console.error("❌ Campaign creation error:", error)
      
      // Check if it's an auth error
      if (error.message?.toLowerCase().includes('auth') || 
          error.message?.includes('401') || 
          error.message?.includes('unauthorized')) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
        
        // Clear tokens and redirect
        localStorage.removeItem("auth_token")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        sessionStorage.clear()
        
        setTimeout(() => {
          router.push("/auth")
        }, 1000)
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to create campaign. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUseTestToken = async () => {
    try {
      console.log("🎟️ Getting test token...")
      const response = await campaignServiceClient.post("/api/v1/auth/test-token")
      
      if (response.success && response.data?.tokens?.agency) {
        // Set the test token
        campaignServiceClient.setAuthTokens(response.data.tokens.agency)
        localStorage.setItem("auth_token", response.data.tokens.agency)
        localStorage.setItem("access_token", response.data.tokens.agency)
        
        toast({
          title: "Test Token Applied",
          description: "You can now create campaigns with the test agency token.",
        })
        
        // Close debug panel
        setShowDebugInfo(false)
      } else {
        throw new Error("Failed to get test token")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to get test token: " + error.message,
        variant: "destructive",
      })
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
  }

  const addBonusTier = () => {
    setFormData({
      ...formData,
      bonusTiers: [...formData.bonusTiers, { threshold: 0, bonus: 0, type: "flat" }],
    })
  }

  const addSegment = () => {
    setFormData({
      ...formData,
      segments: [...formData.segments, { name: "", limit: 0, deliverables: 1 }],
    })
  }

  const addHashtag = () => {
    setFormData({
      ...formData,
      hashtags: [...formData.hashtags, ""],
    })
  }

  // Render functions for each step (renderStep1 through renderStep5) remain the same
  // ... [Include all the render step functions from the original code]

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      default:
        return renderStep1()
    }
  }

  // Include all the renderStep functions from the original code here
  // For brevity, I'm not repeating them, but they should be included

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="campaignName">Campaign Name *</Label>
          <Input
            id="campaignName"
            value={formData.campaignName}
            onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
            placeholder="Enter campaign name"
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Select value={formData.brandId} onValueChange={(value) => setFormData({ ...formData, brandId: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  <div className="flex items-center gap-2">
                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-4 w-4 rounded" />
                    {brand.name}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="new">+ Add New Brand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Campaign Thumbnail</Label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">Drag and drop an image, or click to browse</p>
          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the campaign for creators..."
          className="bg-gray-800 border-gray-700 min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Campaign Type</Label>
        <RadioGroup
          value={formData.campaignType}
          onValueChange={(value) => setFormData({ ...formData, campaignType: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time">One-time Campaign (specific start/end dates)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rolling" id="rolling" />
            <Label htmlFor="rolling">Rolling 30-Day Campaign</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gracePeriod">Grace Period (days)</Label>
          <Input
            id="gracePeriod"
            type="number"
            value={formData.gracePeriod || 3}
            onChange={(e) => setFormData({ ...formData, gracePeriod: Number.parseInt(e.target.value) || 3 })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Payout Structure</Label>
        <RadioGroup
          value={formData.payoutType}
          onValueChange={(value) => setFormData({ ...formData, payoutType: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="pay-per-post" id="pay-per-post" />
                <Label htmlFor="pay-per-post" className="font-semibold">
                  Pay Per Post
                </Label>
              </div>
              <p className="text-sm text-gray-400">Fixed amount per approved post</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="gmv-retainer" id="gmv-retainer" />
                <Label htmlFor="gmv-retainer" className="font-semibold">
                  GMV Retainer
                </Label>
              </div>
              <p className="text-sm text-gray-400">Commission-based on sales</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="font-semibold">
                  Hybrid Model
                </Label>
              </div>
              <p className="text-sm text-gray-400">Base rate + commission</p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Payout Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(formData.payoutType === "pay-per-post" || formData.payoutType === "hybrid") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="baseRate">Base Rate ($) *</Label>
              <Input
                id="baseRate"
                type="number"
                value={formData.baseRate || 0}
                onChange={(e) => setFormData({ ...formData, baseRate: Number.parseFloat(e.target.value) || 0 })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumPosts">Minimum Posts Required</Label>
              <Input
                id="minimumPosts"
                type="number"
                value={formData.minimumPosts || 1}
                onChange={(e) => setFormData({ ...formData, minimumPosts: Number.parseInt(e.target.value) || 1 })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </>
        )}

        {(formData.payoutType === "gmv-retainer" || formData.payoutType === "hybrid") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="commissionPercentage">Commission Percentage (%) *</Label>
              <Input
                id="commissionPercentage"
                type="number"
                value={formData.commissionPercentage || 0}
                onChange={(e) => setFormData({ ...formData, commissionPercentage: Number.parseFloat(e.target.value) || 0 })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumGmv">Minimum GMV Threshold ($)</Label>
              <Input
                id="minimumGmv"
                type="number"
                value={formData.minimumGmv || 0}
                onChange={(e) => setFormData({ ...formData, minimumGmv: Number.parseFloat(e.target.value) || 0 })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="totalCapacity">Total Creator Capacity</Label>
        <Input
          id="totalCapacity"
          type="number"
          value={formData.totalCapacity || 25}
          onChange={(e) => setFormData({ ...formData, totalCapacity: Number.parseInt(e.target.value) || 25 })}
          className="bg-gray-800 border-gray-700"
        />
        <p className="text-sm text-gray-400">Maximum number of creators for this campaign</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Creator Segments</Label>
          <Button onClick={addSegment} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Segment
          </Button>
        </div>
        {formData.segments.map((segment, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Segment Name</Label>
                  <Input
                    value={segment.name}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].name = e.target.value
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    placeholder="e.g., Male, Female, 18-24"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Creator Limit</Label>
                  <Input
                    type="number"
                    value={segment.limit}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].limit = Number.parseInt(e.target.value)
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Required Deliverables</Label>
                  <Input
                    type="number"
                    value={segment.deliverables}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].deliverables = Number.parseInt(e.target.value)
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxCampaignsPerCreator">Max Active Campaigns per Creator</Label>
        <Input
          id="maxCampaignsPerCreator"
          type="number"
          value={formData.maxCampaignsPerCreator || 3}
          onChange={(e) => setFormData({ ...formData, maxCampaignsPerCreator: Number.parseInt(e.target.value) || 3 })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Auto-Approval</Label>
          <p className="text-sm text-gray-400">Automatically accept qualified creators</p>
        </div>
        <Switch
          checked={formData.autoApproval}
          onCheckedChange={(checked) => setFormData({ ...formData, autoApproval: checked })}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Tracking Method</Label>
        <RadioGroup
          value={formData.trackingMethod}
          onValueChange={(value) => setFormData({ ...formData, trackingMethod: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hashtag" id="hashtag" />
            <Label htmlFor="hashtag">Hashtag Tracking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="product-links" id="product-links" />
            <Label htmlFor="product-links">TikTok Shop Product Links</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.trackingMethod === "hashtag" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Campaign Hashtags</Label>
            <Button onClick={addHashtag} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Hashtag
            </Button>
          </div>
          {formData.hashtags.map((hashtag, index) => (
            <Input
              key={index}
              value={hashtag}
              onChange={(e) => {
                const newHashtags = [...formData.hashtags]
                newHashtags[index] = e.target.value
                setFormData({ ...formData, hashtags: newHashtags })
              }}
              placeholder="#campaignhashtag"
              className="bg-gray-800 border-gray-700"
            />
          ))}
        </div>
      )}
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Campaign Goal</Label>
        <RadioGroup value={formData.goalType} onValueChange={(value) => setFormData({ ...formData, goalType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gmv" id="gmv-goal" />
            <Label htmlFor="gmv-goal">Target GMV</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="posts" id="posts-goal" />
            <Label htmlFor="posts-goal">Total Posts</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.goalType === "gmv" && (
          <div className="space-y-2">
            <Label htmlFor="targetGmv">Target GMV ($) *</Label>
            <Input
              id="targetGmv"
              type="number"
              value={formData.targetGmv || 0}
              onChange={(e) => setFormData({ ...formData, targetGmv: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}

        {formData.goalType === "posts" && (
          <div className="space-y-2">
            <Label htmlFor="targetPosts">Target Posts *</Label>
            <Input
              id="targetPosts"
              type="number"
              value={formData.targetPosts || 0}
              onChange={(e) => setFormData({ ...formData, targetPosts: Number.parseInt(e.target.value) || 0 })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Campaign Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <h3 className="font-semibold">{formData.campaignName || "Campaign Name"}</h3>
                <p className="text-sm text-gray-400">
                  {brands.find((b) => b.id === formData.brandId)?.name || "Brand Name"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              {formData.description || "Campaign description will appear here..."}
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">
                {formData.payoutType === "pay-per-post"
                  ? `$${formData.baseRate}/post`
                  : formData.payoutType === "gmv-retainer"
                    ? `${formData.commissionPercentage}% commission`
                    : "Hybrid payout"}
              </Badge>
              <Badge variant="outline">{formData.totalCapacity} spots</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Create New Campaign</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={testAuthentication}
              className="bg-purple-600/20 border-purple-600/50 hover:bg-purple-600/30"
            >
              🧪 Test Auth
            </Button>
          </div>
        </DialogHeader>

        {/* Debug Information Panel */}
        {showDebugInfo && debugInfo && (
          <div className="bg-gray-800 rounded-lg p-4 mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-purple-400">Authentication Debug Info</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDebugInfo(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Timestamp:</span>
                <span className="text-white">{debugInfo.timestamp}</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-gray-400">Current Tokens:</span>
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={debugInfo.tokens.hasAuthToken ? "text-green-400" : "text-red-400"}>
                      {debugInfo.tokens.hasAuthToken ? "✓" : "✗"} Auth Token
                    </span>
                    {debugInfo.tokens.authTokenPreview && (
                      <code className="text-xs bg-gray-700 px-2 py-1 rounded">
                        {debugInfo.tokens.authTokenPreview}
                      </code>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-gray-400">Test Results:</span>
                {debugInfo.tests.map((test: any, index: number) => (
                  <div key={index} className="pl-4">
                    <div className="flex items-center gap-2">
                      <span className={test.success ? "text-green-400" : "text-red-400"}>
                        {test.success ? "✓" : "✗"} {test.name}
                      </span>
                    </div>
                    {test.error && (
                      <div className="text-xs text-red-400 pl-6 mt-1">
                        Error: {test.error}
                      </div>
                    )}
                    {test.data && (
                      <details className="pl-6 mt-1">
                        <summary className="text-xs text-gray-400 cursor-pointer">View Response</summary>
                        <pre className="text-xs bg-gray-700 p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(test.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>

              {debugInfo.error && (
                <div className="text-red-400">
                  <span className="font-semibold">Error:</span> {debugInfo.error}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-700">
              <Button
                onClick={handleUseTestToken}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                Use Test Agency Token
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => handleStepClick(step)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  step === currentStep
                    ? "bg-purple-600 text-white"
                    : step < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {step < currentStep ? <Check className="h-4 w-4" /> : step}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="bg-gray-800 border-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep === totalSteps ? (
              <div className="flex gap-2">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700" 
                  onClick={handleLaunchCampaign}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Creating...
                    </>
                  ) : (
                    "Launch Campaign"
                  )}
                </Button>
              </div>
            ) : (
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}