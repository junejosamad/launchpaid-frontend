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
import { DashboardMetricsSkeleton, CampaignCardSkeleton, ApiErrorDisplay } from "@/components/ui/loading-skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useCampaigns } from "@/hooks/useCampaigns"
import { useDashboardAnalytics } from "@/hooks/useAnalytics"
import { useRealTimeNotifications } from "@/hooks/useNotifications"
import type { Campaign } from "@/lib/types/api"

export default function CreatorDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [dateRange, setDateRange] = useState("30d")

  // Real-time notifications
  useRealTimeNotifications()

  // Calculate date range
  const getDateRange = (range: string) => {
    const endDate = new Date().toISOString().split("T")[0]
    const startDate = new Date()

    switch (range) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(startDate.getDate() - 30)
        break
      case "90d":
        startDate.setDate(startDate.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setDate(startDate.getDate() - 30)
    }

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate,
    }
  }

  const { startDate, endDate } = getDateRange(dateRange)

  // Fetch creator's campaigns
  const {
    campaigns,
    loading: campaignsLoading,
    error: campaignsError,
    refetch: refetchCampaigns,
  } = useCampaigns({
    // Filter for creator's campaigns only
    status: ["active", "completed"],
    enabled: isAuthenticated,
  })

  // Fetch dashboard analytics
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useDashboardAnalytics({
    startDate,
    endDate,
    enabled: isAuthenticated,
  })

  // Sort campaigns by priority (overdue -> active -> completed)
  const sortedCampaigns = campaigns.sort((a, b) => {
    const now = new Date()
    const aEndDate = new Date(a.endDate)
    const bEndDate = new Date(b.endDate)

    // Check if overdue
    const aOverdue = aEndDate < now && a.status === "active"
    const bOverdue = bEndDate < now && b.status === "active"

    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1

    // Then by status priority
    const statusPriority = { active: 1, paused: 2, completed: 3, draft: 4, cancelled: 5 }
    return statusPriority[a.status] - statusPriority[b.status]
  })

  const handleViewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`
    }
    return views.toString()
  }

  const calculateGMVProgress = (currentGMV: number, targetGMV = 10000) => {
    return Math.min((currentGMV / targetGMV) * 100, 100)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
          <Button onClick={() => (window.location.href = "/auth")}>Go to Login</Button>
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
                <div className="flex flex-col min-w-[300px]">
                  <div className="text-sm text-gray-400 mb-2">Progress to $10K GMV Badge</div>
                  <div className="flex items-center gap-4">
                    <Progress
                      value={calculateGMVProgress(analytics?.overview.totalGMV || 0)}
                      className="h-4 flex-1 bg-gray-700"
                      indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
                    />
                    <span className="text-lg font-bold text-purple-400">
                      {calculateGMVProgress(analytics?.overview.totalGMV || 0).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    ${Math.max(0, 10000 - (analytics?.overview.totalGMV || 0)).toLocaleString()} left to unlock premium
                    tier!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics with Date Range */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Performance Overview</h2>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32 bg-gray-900 border-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {analyticsLoading ? (
              <DashboardMetricsSkeleton />
            ) : analyticsError ? (
              <ApiErrorDisplay error={analyticsError} retry={refetchAnalytics} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Total GMV
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">${(analytics?.overview.totalGMV || 0).toLocaleString()}</div>
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700">
                        +{analytics?.trends.gmvGrowth || 0}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. previous period</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Total Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">{formatViews(analytics?.overview.totalViews || 0)}</div>
                      <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">
                        +{analytics?.trends.engagementGrowth || 0}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. previous period</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">{campaigns.filter((c) => c.status === "active").length}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {campaigns.filter((c) => new Date(c.endDate) < new Date() && c.status === "active").length}{" "}
                      overdue,{" "}
                      {campaigns.filter((c) => new Date(c.endDate) >= new Date() && c.status === "active").length} on
                      track
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">
                        ${(analytics?.overview.totalPayouts || 0).toLocaleString()}
                      </div>
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700">+25%</Badge>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. previous period</div>
                  </CardContent>
                </Card>
              </div>
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
                  {sortedCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      title={campaign.title}
                      brand={campaign.brand.name}
                      logo={campaign.brand.logo}
                      deliverables={campaign.requirements.deliverables.length}
                      completed={Math.floor(campaign.requirements.deliverables.length * 0.6)} // This should come from API
                      gmv={campaign.metrics.totalGMV}
                      target={campaign.budget}
                      daysLeft={Math.ceil(
                        (new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )}
                      status={
                        new Date(campaign.endDate) < new Date() && campaign.status === "active"
                          ? "overdue"
                          : campaign.status === "active"
                            ? "active"
                            : "completed"
                      }
                      onViewDetails={() => handleViewCampaignDetails(campaign)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
                  <p className="text-gray-400 mb-4">Start applying to campaigns to see them here</p>
                  <Button
                    onClick={() => (window.location.href = "/campaigns")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Browse Campaigns
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    Global Leaderboard
                  </CardTitle>
                  <CardDescription>Top performing creators across all campaigns this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeaderboardTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Badges & Achievements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Badges & Achievements</h2>
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Dynamic badge rendering based on user achievements */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                    (analytics?.overview.totalGMV || 0) >= 5000 ? "bg-purple-600" : "bg-gray-800"
                  }`}
                >
                  <Trophy
                    className={`h-8 w-8 ${
                      (analytics?.overview.totalGMV || 0) >= 5000 ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="font-medium text-sm">$5K GMV</h3>
                <p className="text-xs text-gray-400">
                  {(analytics?.overview.totalGMV || 0) >= 5000 ? "Achieved" : "Locked"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mb-3 relative">
                  <Trophy className="h-8 w-8 text-gray-600" />
                  {(analytics?.overview.totalGMV || 0) > 5000 && (analytics?.overview.totalGMV || 0) < 10000 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm">$10K GMV</h3>
                <p className="text-xs text-gray-400">
                  {(analytics?.overview.totalGMV || 0) >= 10000
                    ? "Achieved"
                    : `${calculateGMVProgress(analytics?.overview.totalGMV || 0).toFixed(0)}% Complete`}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  <Trophy className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-medium text-sm">$25K GMV</h3>
                <p className="text-xs text-gray-400">Locked</p>
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
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          campaign={selectedCampaign}
        />
      )}
    </div>
  )
}
