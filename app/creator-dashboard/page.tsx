"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Trophy, Eye, TrendingUp, Sparkles } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CampaignCard } from "@/components/campaign-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { CampaignDetailsModal } from "@/components/campaign-details-modal"
import { DashboardMetricsSkeleton, CampaignCardSkeleton } from "@/components/ui/loading-skeleton"
import { ApiErrorDisplay } from "@/components/ui/error-boundary"
import { useAuth } from "@/hooks/useAuth"
import { useCampaigns } from "@/hooks/useCampaigns"
import { useDashboardAnalytics } from "@/hooks/useAnalytics"
import { useRealTimeNotifications } from "@/hooks/useNotifications"
import type { Campaign } from "@/lib/types/api"

// Transform API campaign to frontend campaign format
const transformCampaign = (apiCampaign: any): Campaign => {
  return {
    id: apiCampaign.id,
    title: apiCampaign.name || apiCampaign.title || 'Untitled Campaign',
    brand: {
      id: apiCampaign.brand_id || '',
      name: apiCampaign.brand_name || 'Unknown Brand',
      logo: apiCampaign.brand_logo || '/placeholder.svg'
    },
    category: apiCampaign.category || 'general',
    startDate: apiCampaign.start_date || apiCampaign.startDate,
    endDate: apiCampaign.end_date || apiCampaign.endDate,
    status: apiCampaign.status || 'active',
    visibility: apiCampaign.visibility || 'public',
    budget: apiCampaign.budget || 0,
    requirements: {
      minimumFollowers: apiCampaign.min_followers || 0,
      location: apiCampaign.location || [],
      gender: apiCampaign.gender || 'all',
      age: apiCampaign.age_range || { min: 18, max: 65 },
      deliverables: apiCampaign.deliverables || [],
      targetAudience: apiCampaign.target_audience || [],
      contentGuidelines: apiCampaign.content_guidelines || '',
      hashtags: apiCampaign.hashtags || [],
      mentions: apiCampaign.mentions || [],
      allowedPlatforms: apiCampaign.allowed_platforms || ['tiktok']
    },
    metrics: {
      totalApplications: apiCampaign.applications_count || 0,
      approvedCreators: apiCampaign.approved_count || 0,
      totalPosts: apiCampaign.total_posts || 0,
      totalViews: apiCampaign.total_views || 0,
      totalLikes: apiCampaign.total_likes || 0,
      totalComments: apiCampaign.total_comments || 0,
      totalShares: apiCampaign.total_shares || 0,
      totalGMV: apiCampaign.total_gmv || apiCampaign.current_gmv || 0,
      averageEngagementRate: apiCampaign.avg_engagement_rate || 0
    },
    thumbnail: apiCampaign.thumbnail,
    description: apiCampaign.description || ''
  }
}

// Transform campaign for CampaignDetailsModal
const transformCampaignForModal = (campaign: Campaign) => {
  return {
    id: campaign.id,
    title: campaign.title,
    brand: campaign.brand.name,
    brandLogo: campaign.brand.logo,
    currentGmv: campaign.metrics.totalGMV,
    gmvTarget: 10000, // Default target, should come from API
    totalDeliverables: campaign.requirements.deliverables.length,
    completedDeliverables: 0, // Should come from API
    daysLeft: Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
    deliverables: campaign.requirements.deliverables,
    description: campaign.description
  }
}

export default function CreatorDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState("last_30_days")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Hooks for data fetching
  const { campaigns: rawCampaigns = [], loading: campaignsLoading, error: campaignsError, refetch: refetchCampaigns } = useCampaigns('active')
  const { analytics, loading: analyticsLoading, error: analyticsError } = useDashboardAnalytics({ timeframe: dateRange })
  const { isConnected } = useRealTimeNotifications()

  // Transform campaigns to match the expected type
  const campaigns = rawCampaigns.map(transformCampaign)

  // Sort campaigns by urgency (overdue first, then by days left)
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const daysLeftA = Math.ceil((new Date(a.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    const daysLeftB = Math.ceil((new Date(b.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    
    // Overdue campaigns first
    if (daysLeftA < 0 && daysLeftB >= 0) return -1
    if (daysLeftB < 0 && daysLeftA >= 0) return 1
    
    // Then by days left (ascending)
    return daysLeftA - daysLeftB
  })

  const handleViewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedCampaign(null)
    }, 200)
  }

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      creator: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40", username: "@sarahstyle" },
      gmv: 45250,
      campaigns: 12,
      isCurrentUser: false,
    },
    {
      rank: 2,
      creator: { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=40&width=40", username: "@mikefit" },
      gmv: 38900,
      campaigns: 10,
      isCurrentUser: false,
    },
    {
      rank: 3,
      creator: { name: "You", avatar: user?.avatar || "/placeholder.svg?height=40&width=40", username: "@" + (user?.username || "creator") },
      gmv: analytics?.overview.totalGMV || 0,
      campaigns: analytics?.overview.totalCampaigns || 0,
      isCurrentUser: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-60"}`}>
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="p-6">
          {/* Enhanced Gamified Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-gray-900 via-purple-900/40 to-pink-900/30 p-8 rounded-xl border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/15 rounded-full filter blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                      <Sparkles className="h-4 w-4 text-black" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || "Creator"}!</h1>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-lg px-4 py-1">
                        ${analytics?.overview.totalGMV ? Math.floor(analytics.overview.totalGMV / 1000) : 0}K GMV
                      </Badge>
                      <span className="text-xl font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        {analytics?.overview.totalGMV && analytics.overview.totalGMV >= 10000
                          ? "Premium Creator!"
                          : "Unlock Higher Paying Deals!"}
                      </span>
                    </div>
                    <p className="text-gray-300">
                      {analytics?.overview.totalGMV && analytics.overview.totalGMV >= 10000
                        ? "You've unlocked premium campaigns!"
                        : "Keep going to unlock premium campaigns."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-gray-400">
                    ${analytics?.overview.totalGMV || 0} / $10,000 to premium tier
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    View Available Campaigns <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {analyticsLoading ? (
              <DashboardMetricsSkeleton />
            ) : analyticsError ? (
              <div className="col-span-4">
                <ApiErrorDisplay error={analyticsError} retry={() => window.location.reload()} />
              </div>
            ) : (
              <>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Total GMV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${(analytics?.overview.totalGMV || 0).toLocaleString()}</div>
                    <div className="text-sm text-green-500">+{analytics?.overview.gmvGrowth || 0}% from previous period</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics?.overview.activeCampaigns || 0}</div>
                    <div className="text-sm text-gray-500">{analytics?.overview.pendingApplications || 0} pending</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{((analytics?.overview.totalViews || 0) / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-green-500">+{analytics?.overview.viewsGrowth || 0}% from previous period</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics?.overview.avgEngagementRate || 0}%</div>
                    <div className="text-sm text-green-500">+{analytics?.overview.engagementGrowth || 0}% from previous period</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Campaigns & Global Leaderboard Tabs */}
          <Tabs defaultValue="campaigns" className="mb-8">
            <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto w-full justify-start rounded-none mb-6">
              <TabsTrigger
                value="campaigns"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none py-3 px-6"
              >
                My Campaigns
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none py-3 px-6"
              >
                Global Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Campaigns</h2>
                <div className="text-sm text-gray-400">
                  Sorted by priority •{" "}
                  {campaigns.filter((c) => new Date(c.endDate) < new Date() && c.status === "active").length} overdue,{" "}
                  {campaigns.filter((c) => c.status === "active").length} active
                </div>
              </div>

              {campaignsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <CampaignCardSkeleton key={i} />
                  ))}
                </div>
              ) : campaignsError ? (
                <ApiErrorDisplay error={campaignsError} retry={refetchCampaigns} />
              ) : sortedCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedCampaigns.map((campaign) => {
                    const rawCampaign = rawCampaigns.find(c => c.id === campaign.id)
                    const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    const isOverdue = daysLeft < 0
                    const isUrgent = daysLeft <= 3 && daysLeft >= 0

                    return (
                      <CampaignCard
                        key={campaign.id}
                        title={campaign.title}
                        brand={campaign.brand.name}
                        image={campaign.brand.logo || '/placeholder.svg'}
                        completedDeliverables={rawCampaign?.completed_deliverables || 0}
                        totalDeliverables={rawCampaign?.total_deliverables || campaign.requirements.deliverables.length}
                        currentGmv={campaign.metrics.totalGMV}
                        target={rawCampaign?.gmv_target || 10000}
                        daysLeft={Math.max(0, daysLeft)}
                        status={isOverdue ? "overdue" as const : campaign.status as any}
                        endDate={new Date(campaign.endDate)}
                        isUrgent={isUrgent || isOverdue}
                        onClick={() => handleViewCampaignDetails(campaign)}
                      />
                    )
                  })}
                </div>
              ) : (
                <Card className="bg-gray-900 border-gray-800 p-8 text-center">
                  <p className="text-gray-400 mb-4">No active campaigns yet.</p>
                  <Button>Browse Campaigns</Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-0">
              <div className="space-y-6">
                {/* Leaderboard Filters */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Global Leaderboard</h2>
                  <Select defaultValue="all-time">
                    <SelectTrigger className="w-48 bg-gray-900 border-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">All Time</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Your Rank Card */}
                <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/30 border-purple-600/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-purple-400">#{leaderboardData.find(l => l.isCurrentUser)?.rank || 'N/A'}</div>
                        <div>
                          <p className="font-semibold">Your Global Ranking</p>
                          <p className="text-sm text-gray-400">Keep creating to climb the ranks!</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${(analytics?.overview.totalGMV || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Total GMV</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Leaderboard Table */}
                <LeaderboardTable />
              </div>
            </TabsContent>
          </Tabs>

          {/* Achievement & Milestones */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Achievements & Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                    (analytics?.overview.totalGMV || 0) >= 1000 ? "bg-purple-600" : "bg-gray-800"
                  }`}
                >
                  <Trophy
                    className={`h-8 w-8 ${
                      (analytics?.overview.totalGMV || 0) >= 1000 ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="font-medium text-sm">First $1K</h3>
                <p className="text-xs text-gray-400">
                  {(analytics?.overview.totalGMV || 0) >= 1000 ? "Achieved" : "Locked"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                    (analytics?.overview.totalViews || 0) >= 1000000 ? "bg-purple-600" : "bg-gray-800"
                  }`}
                >
                  <Eye
                    className={`h-8 w-8 ${
                      (analytics?.overview.totalViews || 0) >= 1000000 ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="font-medium text-sm">1M Views</h3>
                <p className="text-xs text-gray-400">
                  {(analytics?.overview.totalViews || 0) >= 1000000 ? "Achieved" : "Locked"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                    (analytics?.overview.totalCampaigns || 0) >= 5 ? "bg-purple-600" : "bg-gray-800"
                  }`}
                >
                  <TrendingUp
                    className={`h-8 w-8 ${
                      (analytics?.overview.totalCampaigns || 0) >= 5 ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="font-medium text-sm">Rising Star</h3>
                <p className="text-xs text-gray-400">
                  {(analytics?.overview.totalCampaigns || 0) >= 5 ? "Achieved" : "Locked"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  <Sparkles className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-medium text-sm">Top Earner</h3>
                <p className="text-xs text-gray-400">Locked</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <CampaignDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          campaign={transformCampaignForModal(selectedCampaign)}
        />
      )}
    </div>
  )
}