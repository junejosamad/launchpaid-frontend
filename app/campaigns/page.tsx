"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Search,
  Calendar,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  Star,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { campaignServiceClient } from "@/lib/api/client"
import { toast } from "@/components/ui/use-toast"

interface Campaign {
  id: string
  title: string
  brand: string
  logo: string
  description: string
  requirements: string
  deliverables: string
  duration: string
  payout: string
  bonus?: string
  gmvTarget?: string
  status: "open" | "closing-soon" | "full"
  creatorCount: { current: number; max: number }
  daysLeft?: number
  category: string
  payoutType: "per-post" | "gmv" | "hybrid"
}

// Mock data for development/fallback
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Summer Fashion Campaign 2025",
    brand: "Fashion Brand",
    logo: "/placeholder.svg?height=60&width=60",
    description: "Promote our summer collection to your audience.",
    requirements: "3 posts, use #SummerStyle",
    deliverables: "3 posts required",
    duration: "May 1 - June 30, 2025",
    payout: "$75 per post + 15% commission",
    bonus: "Top performers get $200 bonus",
    gmvTarget: "Generate $1,500+ for bonuses",
    status: "open",
    creatorCount: { current: 25, max: 100 },
    daysLeft: 15,
    category: "Fashion",
    payoutType: "hybrid",
  },
  {
    id: "2",
    title: "Tech Product Launch",
    brand: "TechCorp",
    logo: "/placeholder.svg?height=60&width=60",
    description: "Launch our revolutionary new tech gadget.",
    requirements: "2 unboxing videos + 1 review",
    deliverables: "3 videos required",
    duration: "June 20 - July 20, 2025",
    payout: "GMV-based: 20% commission",
    gmvTarget: "Generate $2,000+ for tier bonuses",
    status: "open",
    creatorCount: { current: 8, max: 30 },
    daysLeft: 25,
    category: "Tech",
    payoutType: "gmv",
  },
]

export default function CampaignsPage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOffline, setIsOffline] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [payoutFilter, setPayoutFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showCapacityModal, setShowCapacityModal] = useState(false)
  const [appliedCampaigns, setAppliedCampaigns] = useState<string[]>([])
  const [applyingTo, setApplyingTo] = useState<string | null>(null)

  // Transform backend campaign to frontend format
  const transformCampaign = (backendCampaign: any): Campaign => {
    const startDate = new Date(backendCampaign.start_date || Date.now())
    const endDate = new Date(backendCampaign.end_date || Date.now() + 30 * 24 * 60 * 60 * 1000)
    const now = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    // Determine status
    let status: "open" | "closing-soon" | "full" = "open"
    if (backendCampaign.current_creators >= backendCampaign.max_creators) {
      status = "full"
    } else if (daysLeft <= 7 && daysLeft > 0) {
      status = "closing-soon"
    }

    // Determine payout type
    let payoutType: "per-post" | "gmv" | "hybrid" = "per-post"
    if (backendCampaign.payout_model === "retainer_gmv" || backendCampaign.payout_model === "gmv_commission") {
      payoutType = "gmv"
    } else if (backendCampaign.payout_model === "hybrid") {
      payoutType = "hybrid"
    }

    // Format payout string
    let payout = ""
    if (backendCampaign.base_payout_per_post > 0) {
      payout = `$${backendCampaign.base_payout_per_post} per post`
    }
    if (backendCampaign.gmv_commission_rate > 0) {
      if (payout) payout += " + "
      payout += `${backendCampaign.gmv_commission_rate}% commission`
    }
    if (backendCampaign.retainer_amount > 0) {
      payout = `$${backendCampaign.retainer_amount} retainer + ${backendCampaign.gmv_commission_rate || 0}% commission`
    }

    return {
      id: backendCampaign.id,
      title: backendCampaign.name || "Untitled Campaign",
      brand: backendCampaign.brand_name || backendCampaign.agency_name || "Unknown Brand",
      logo: backendCampaign.thumbnail_url || "/placeholder.svg",
      description: backendCampaign.description || "",
      requirements: `${backendCampaign.min_deliverables_per_creator || 1} posts, ${backendCampaign.hashtag ? `use ${backendCampaign.hashtag}` : 'follow guidelines'}`,
      deliverables: `${backendCampaign.min_deliverables_per_creator || 1} posts required`,
      duration: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
      payout: payout || "Contact for details",
      bonus: backendCampaign.referral_bonus_enabled ? `Referral bonus: $${backendCampaign.referral_bonus_amount}` : undefined,
      gmvTarget: backendCampaign.target_gmv ? `Generate $${backendCampaign.target_gmv}+ for bonuses` : undefined,
      status,
      creatorCount: {
        current: backendCampaign.current_creators || 0,
        max: backendCampaign.max_creators || 100
      },
      daysLeft: daysLeft > 0 ? daysLeft : undefined,
      category: backendCampaign.type || "general",
      payoutType
    }
  }

  // Fetch campaigns from backend
  // In campaigns/page.tsx, update the fetchCampaigns function

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)
      setIsOffline(false)

      const response = await campaignServiceClient.get('/api/v1/campaigns', {
        status: 'active',
        limit: 100
      })

      if (response.success && response.data) {
        let campaignData = []
        
        // Handle different response formats
        if (Array.isArray(response.data)) {
          campaignData = response.data
        } else if (response.data.campaigns) {
          campaignData = response.data.campaigns
        }

        // Only transform campaigns that have required fields
        const transformedCampaigns = campaignData
          .filter((c: any) => c.id && c.name) // Basic validation
          .map(transformCampaign)
        
        setCampaigns(transformedCampaigns)
      } else {
        // If no campaigns, show empty state instead of error
        setCampaigns([])
      }
    } catch (err: any) {
      console.error("Error fetching campaigns:", err)
      
      // More user-friendly error handling
      if (err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError")) {
        setIsOffline(true)
        setError("Unable to connect to the server. Please check your connection.")
        
        // Use mock data in development
        if (process.env.NODE_ENV === 'development') {
          setCampaigns(mockCampaigns)
        }
      } else {
        setError("Unable to load campaigns. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch user's applied campaigns
  const fetchAppliedCampaigns = async () => {
    if (!user) return

    try {
      const response = await campaignServiceClient.get('/api/v1/applications/my-applications')
      
      if (response.success && response.data) {
        const appliedIds = response.data.map((app: any) => app.campaign_id)
        setAppliedCampaigns(appliedIds)
      }
    } catch (err) {
      console.error("Error fetching applications:", err)
      // Don't show error for this, it's not critical
    }
  }

  useEffect(() => {
    fetchCampaigns()
    if (user) {
      fetchAppliedCampaigns()
    }
  }, [user])

  // Handle campaign application
  const handleApply = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for campaigns",
        variant: "destructive"
      })
      return
    }

    // Check if offline
    if (isOffline) {
      toast({
        title: "Offline Mode",
        description: "Cannot apply while offline. Please check your connection.",
        variant: "destructive"
      })
      return
    }

    // Check profile completion
    const profileComplete = user.profile_completion_percentage >= 80

    if (!profileComplete) {
      setShowProfileModal(true)
      return
    }

    // Check capacity (mock check - replace with actual logic)
    const atCapacity = appliedCampaigns.length >= 10

    if (atCapacity) {
      setShowCapacityModal(true)
      return
    }

    try {
      setApplyingTo(campaignId)
      
      const response = await campaignServiceClient.post('/api/v1/applications', {
        campaign_id: campaignId,
        application_data: {
          message: "I'm interested in this campaign!",
          follower_count: user.follower_count || 0,
          engagement_rate: user.engagement_rate || 0
        }
      })

      if (response.success) {
        setAppliedCampaigns([...appliedCampaigns, campaignId])
        toast({
          title: "Application Submitted!",
          description: "Your application has been submitted successfully.",
        })
      } else {
        throw new Error(response.error || "Failed to submit application")
      }
    } catch (err: any) {
      toast({
        title: "Application Failed",
        description: err.message || "Failed to submit application",
        variant: "destructive"
      })
    } finally {
      setApplyingTo(null)
    }
  }

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || 
      campaign.category.toLowerCase() === categoryFilter.toLowerCase()
    
    const matchesPayout = payoutFilter === "all" || 
      campaign.payoutType === payoutFilter
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "open" && campaign.status === "open") ||
      (statusFilter === "closing-soon" && campaign.status === "closing-soon") ||
      (statusFilter === "full" && campaign.status === "full")

    return matchesSearch && matchesCategory && matchesPayout && matchesStatus
  })

  const getStatusBadge = (campaign: Campaign) => {
    switch (campaign.status) {
      case "open":
        return <Badge className="bg-green-600 hover:bg-green-700">Open</Badge>
      case "closing-soon":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Closing Soon</Badge>
      case "full":
        return <Badge className="bg-gray-600 hover:bg-gray-700">Full</Badge>
    }
  }

  const getActionButton = (campaign: Campaign) => {
    const isApplying = applyingTo === campaign.id

    if (appliedCampaigns.includes(campaign.id)) {
      return (
        <Button disabled className="w-full bg-blue-600/20 text-blue-400 border border-blue-600/30">
          <Clock className="h-4 w-4 mr-2" />
          Application Pending
        </Button>
      )
    }

    if (campaign.status === "full") {
      return (
        <Button disabled className="w-full bg-gray-600/20 text-gray-400 border border-gray-600/30">
          Campaign Full
        </Button>
      )
    }

    return (
      <Button 
        onClick={() => handleApply(campaign.id)} 
        disabled={isApplying || isOffline}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
      >
        {isApplying ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Applying...
          </>
        ) : (
          <>
            Apply Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px] min-h-screen">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading campaigns...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Available Campaigns</h1>
            <p className="text-gray-400 text-lg">Discover brand partnerships and start earning</p>
          </div>

          {/* Offline/Error Banner */}
          {(isOffline || error) && (
            <div className="mb-6 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-yellow-500 font-medium">
                  {isOffline ? "Connection Error" : "Error"}
                </p>
                <p className="text-yellow-400/80 text-sm">{error}</p>
              </div>
              <Button 
                onClick={fetchCampaigns} 
                variant="outline" 
                size="sm"
                className="border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/10"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Filters & Search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-800 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={payoutFilter} onValueChange={setPayoutFilter}>
                  <SelectTrigger className="w-[140px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Payout Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="per-post">Per Post</SelectItem>
                    <SelectItem value="gmv">GMV Based</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closing-soon">Closing Soon</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-800 overflow-hidden">
                        <Image
                          src={campaign.logo || "/placeholder.svg"}
                          alt={campaign.brand}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                        <p className="text-gray-400 text-sm">{campaign.brand}</p>
                      </div>
                    </div>
                    {getStatusBadge(campaign)}
                  </div>

                  {campaign.daysLeft && campaign.status !== "full" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-500">{campaign.daysLeft} days left to apply</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{campaign.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">{campaign.deliverables}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">{campaign.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">
                        {campaign.creatorCount.current}/{campaign.creatorCount.max} creators
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-400">{campaign.payout}</span>
                    </div>

                    {campaign.bonus && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">{campaign.bonus}</span>
                      </div>
                    )}

                    {campaign.gmvTarget && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-400">{campaign.gmvTarget}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0 space-y-3">
                  {getActionButton(campaign)}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCampaign(campaign)}
                    className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>

      {/* Campaign Detail Modal */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-gray-800 overflow-hidden">
                    <Image
                      src={selectedCampaign.logo || "/placeholder.svg"}
                      alt={selectedCampaign.brand}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedCampaign.title}</DialogTitle>
                    <p className="text-gray-400">{selectedCampaign.brand}</p>
                  </div>
                </div>
              </DialogHeader>

              <DialogDescription asChild>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">{selectedCampaign.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Campaign Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-400" />
                          <span>{selectedCampaign.requirements}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          <span>{selectedCampaign.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>
                            {selectedCampaign.creatorCount.current}/{selectedCampaign.creatorCount.max} creators
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Payout Structure</h4>
                      <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">{selectedCampaign.payout}</span>
                        </div>
                        {selectedCampaign.bonus && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{selectedCampaign.bonus}</span>
                          </div>
                        )}
                        {selectedCampaign.gmvTarget && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-purple-400" />
                            <span className="text-purple-400 text-sm">{selectedCampaign.gmvTarget}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogDescription>

              <DialogFooter>{getActionButton(selectedCampaign)}</DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Completion Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Complete Your Profile
            </DialogTitle>
            <DialogDescription>
              Finish your profile to apply for brand deals and start earning with top campaigns.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>
              Cancel
            </Button>
            <Link href="/dashboard/profile/">
              <Button className="bg-purple-600 hover:bg-purple-700">Complete Profile</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Capacity Warning Modal */}
      <Dialog open={showCapacityModal} onOpenChange={setShowCapacityModal}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              You're at Campaign Capacity
            </DialogTitle>
            <DialogDescription>
              You're registered for the maximum number of campaigns. Complete current campaigns or request a capacity
              increase.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCapacityModal(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Request Capacity Increase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}