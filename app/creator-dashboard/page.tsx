// app/(dashboard)/dashboard-creator/page.tsx - Fixed campaign mapping
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Trophy, Eye, TrendingUp, Sparkles } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CampaignCard } from "@/components/campaign-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { CampaignDetailsModal } from "@/components/campaign-details-modal"
import { DashboardMetricsSkeleton, CampaignCardSkeleton } from "@/components/ui/loading-skeleton"
import { ApiErrorDisplay } from "@/components/ui/error-boundary"
import { useAuth } from "@/hooks/useAuth"
import { useCreatorCampaigns } from "@/hooks/userCreatorCampaigns"
import { useDashboardAnalytics } from "@/hooks/useDashboard"

export default function CreatorDashboard() {
  const { user } = useAuth()
  const { campaigns, loading: campaignsLoading, error: campaignsError, refetch: refetchCampaigns } = useCreatorCampaigns()
  const { data: analytics, loading: analyticsLoading, error: analyticsError } = useDashboardAnalytics()
  
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const loading = campaignsLoading || analyticsLoading
  const error = campaignsError || analyticsError

  const handleViewCampaignDetails = (campaignId: string) => {
    const campaign = campaigns.find(c => c.campaign.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedCampaign(null)
    }, 200)
  }

  // Calculate metrics from campaigns - with safety checks
  const metrics = {
    totalGMV: campaigns?.reduce((sum, c) => sum + (c?.campaign?.current_gmv || 0), 0) || 0,
    activeCampaigns: campaigns?.length || 0,
    totalViews: campaigns?.reduce((sum, c) => sum + (c?.campaign?.total_views || 0), 0) || 0,
    avgEngagementRate: analytics?.kpis?.avg_engagement_rate?.value || 0
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <DashboardSidebar />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-60"}`}>
        <DashboardHeader />

        <main className="p-6">
          {/* Welcome Banner */}
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
                        ${Math.floor(metrics.totalGMV / 1000)}K GMV
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => window.location.href = '/campaigns'}
                >
                  View Available Campaigns <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {loading ? (
              <DashboardMetricsSkeleton />
            ) : (
              <>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Total GMV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${metrics.totalGMV.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.activeCampaigns}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(metrics.totalViews / 1000).toFixed(1)}K</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-gray-400">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.avgEngagementRate.toFixed(1)}%</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Campaigns */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">My Campaigns</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CampaignCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <ApiErrorDisplay error={error} retry={refetchCampaigns} />
            ) : campaigns && campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map((item) => {
                  // Ensure we have valid campaign data
                  if (!item?.campaign) {
                    console.warn('Invalid campaign item:', item)
                    return null
                  }
                  
                  return (
                    <CampaignCard
                      key={item.id}
                      campaign={item.campaign}
                      onViewDetails={handleViewCampaignDetails}
                    />
                  )
                })}
              </div>
            ) : (
              <Card className="bg-gray-900 border-gray-800 p-8 text-center">
                <p className="text-gray-400 mb-4">No active campaigns yet.</p>
                <Button onClick={() => window.location.href = '/campaigns'}>Browse Campaigns</Button>
              </Card>
            )}
          </div>
        </main>
      </div>

      {selectedCampaign && (
        <CampaignDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          campaign={{
            id: selectedCampaign.id,
            title: selectedCampaign.campaign.name,
            brand: selectedCampaign.campaign.brand_name || "Unknown",
            brandLogo: selectedCampaign.campaign.thumbnail_url || "/placeholder.svg",
            currentGmv: selectedCampaign.campaign.current_gmv || 0,
            gmvTarget: selectedCampaign.campaign.target_gmv || 10000,
            totalDeliverables: selectedCampaign.campaign.min_deliverables_per_creator || 1,
            completedDeliverables: selectedCampaign.campaign.current_posts || 0,
            daysLeft: Math.max(0, Math.ceil((new Date(selectedCampaign.campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
            deliverables: selectedCampaign.deliverables || [],
            description: selectedCampaign.campaign.description || ""
          }}
        />
      )}
    </div>
  )
}