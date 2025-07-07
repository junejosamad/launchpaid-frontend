// app/client-dashboard/page.tsx
"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/client/navigation/client-sidebar"
import { ClientHeader } from "@/components/client/navigation/client-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  DollarSign,
  Eye,
  Target,
  Users,
  BarChart3,
  Plus,
  RefreshCw,
  Calendar,
  ShoppingBag,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardAnalytics, useCampaigns, useCreatorPerformance } from "@/hooks/useDashboard"
import { useAuth } from "@/hooks/useAuth"

export default function ClientDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [timeframe, setTimeframe] = useState("last_30_days")
  const { user } = useAuth()

  // Fetch dashboard data
  const {
    data: analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useDashboardAnalytics(timeframe)

  const {
    campaigns,
    loading: campaignsLoading,
    error: campaignsError,
  } = useCampaigns(undefined, 5) // All campaigns for brands

  const {
    performance: topCreators,
    loading: creatorsLoading,
    error: creatorsError,
  } = useCreatorPerformance(undefined, timeframe, 5)

  const handleRefreshData = () => {
    refetchAnalytics()
  }

  const formatNumber = (num: number, type: "currency" | "number" | "percentage" = "number") => {
    if (type === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    } else if (type === "percentage") {
      return `${num.toFixed(1)}%`
    } else {
      return new Intl.NumberFormat("en-US").format(num)
    }
  }

  const formatGrowth = (growth: number) => {
    const icon = growth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
    const color = growth > 0 ? "text-green-400" : "text-red-400"
    return (
      <span className={cn("flex items-center gap-1 text-xs", color)}>
        {icon}
        {Math.abs(growth).toFixed(1)}%
      </span>
    )
  }

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400"
      case "completed":
        return "bg-blue-500/10 text-blue-400"
      case "paused":
        return "bg-yellow-500/10 text-yellow-400"
      case "draft":
        return "bg-gray-500/10 text-gray-400"
      case "cancelled":
        return "bg-red-500/10 text-red-400"
      default:
        return "bg-gray-500/10 text-gray-400"
    }
  }

  const getCampaignStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "paused":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (analyticsLoading || campaignsLoading || creatorsLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <ClientSidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />
        <div className="lg:pl-60">
          <ClientHeader onMobileMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />

      <div className="lg:pl-60">
        <ClientHeader onMobileMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.first_name || "Brand"}! 🚀
              </h1>
              <p className="text-gray-400">
                Monitor your campaigns and track ROI across all influencer partnerships.
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-40 bg-gray-900 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                  <SelectItem value="last_90_days">Last 90 days</SelectItem>
                  <SelectItem value="this_month">This month</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleRefreshData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Error States */}
          {(analyticsError || campaignsError || creatorsError) && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400">
                Error loading dashboard data: {analyticsError || campaignsError || creatorsError}
              </p>
            </div>
          )}

          {/* KPI Cards */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">
                        {formatNumber(analytics.kpis.total_gmv.value, "currency")}
                      </p>
                      {formatGrowth(analytics.kpis.total_gmv.growth || 0)}
                    </div>
                    <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total Reach</p>
                      <p className="text-2xl font-bold text-white">
                        {formatNumber(analytics.kpis.total_views.value)}
                      </p>
                      {formatGrowth(analytics.kpis.total_views.growth || 0)}
                    </div>
                    <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">ROI</p>
                      <p className="text-2xl font-bold text-white">
                        {formatNumber(analytics.kpis.roi.value, "percentage")}
                      </p>
                      {formatGrowth(analytics.kpis.roi.growth || 0)}
                    </div>
                    <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Active Creators</p>
                      <p className="text-2xl font-bold text-white">
                        {formatNumber(analytics.kpis.active_creators.value)}
                      </p>
                      {formatGrowth(analytics.kpis.active_creators.growth || 0)}
                    </div>
                    <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Performance */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </CardHeader>
              <CardContent>
                {campaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No campaigns yet</p>
                    <p className="text-sm text-gray-500">Create your first campaign to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campaigns.slice(0, 5).map((campaign) => (
                      <div key={campaign.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", getCampaignStatusColor(campaign.status))}>
                              {getCampaignStatusIcon(campaign.status)}
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{campaign.name}</h3>
                              <p className="text-sm text-gray-400">
                                {campaign.current_creators || 0} creators • {campaign.current_posts || 0} posts
                              </p>
                            </div>
                          </div>
                          <Badge className={getCampaignStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-400">Revenue Generated</p>
                            <p className="text-lg font-semibold text-white">
                              {formatNumber(campaign.current_gmv || 0, "currency")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Total Reach</p>
                            <p className="text-lg font-semibold text-white">
                              {formatNumber(campaign.total_views || 0)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress to Goal</span>
                            <span className="text-white">
                              {campaign.target_gmv ? Math.round((campaign.current_gmv || 0) / campaign.target_gmv * 100) : 0}%
                            </span>
                          </div>
                          <Progress
                            value={campaign.target_gmv ? (campaign.current_gmv || 0) / campaign.target_gmv * 100 : 0}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Performing Creators */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Top Performing Creators</CardTitle>
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {topCreators.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No creator data</p>
                    <p className="text-sm text-gray-500">Creator performance will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topCreators.slice(0, 5).map((creator, index) => (
                      <div key={creator.creator_id} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium">
                          #{index + 1}
                        </div>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={creator.creator.avatar_url} />
                          <AvatarFallback className="bg-gray-700">
                            {creator.creator.first_name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {creator.creator.first_name} {creator.creator.last_name}
                          </p>
                          <p className="text-sm text-gray-400">
                            @{creator.creator.username || "username"}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500">
                              {creator.total_posts} posts
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatNumber(creator.engagement_rate, "percentage")} engagement
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-green-400">
                            {formatNumber(creator.total_gmv, "currency")}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatNumber(creator.total_views)} views
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Campaign Analytics Overview */}
          <Card className="bg-gray-900 border-gray-800 mt-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Campaign Analytics Overview
              </CardTitle>
              <CardDescription>Detailed performance metrics across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Advanced analytics coming soon</p>
                <p className="text-sm text-gray-500">
                  Track conversion rates, customer acquisition costs, and detailed attribution
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}