"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUp,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  Users,
  Target,
  FileText,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Play,
  MessageCircle,
  Share,
  Crown,
  Medal,
  Award,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardAnalytics, useCreatorPerformance } from "@/hooks/useAnalytics"

// Mock data for the analytics dashboard
const mockData = {
  kpis: {
    totalGMV: { value: 124350, growth: 25, trend: "up" },
    totalViews: { value: 2400000, growth: 8, trend: "up" },
    engagement: { value: 4.7, growth: 12, trend: "up" },
    activeCreators: { value: 156, growth: 23, trend: "up" },
    campaignProgress: { value: 78, status: "on-track" },
    contentDelivery: { value: 94, avgPosts: 45.2 },
    roi: { value: 4.2, cpa: 12.5, growth: 18 },
  },
  campaigns: [
    { name: "Golf Partner Program", progress: 120, status: "ahead", gmv: 2500, goal: 2000, creators: 25, posts: 460 },
    { name: "Fashion Nova Collab", progress: 85, status: "on-track", gmv: 1819, goal: 2000, creators: 19, posts: 380 },
    { name: "Global Healing Campaign", progress: 45, status: "behind", gmv: 900, goal: 2000, creators: 12, posts: 220 },
    { name: "Tech Gadget Pro", progress: 78, status: "on-track", gmv: 1560, goal: 2000, creators: 22, posts: 340 },
  ],
  topCreators: [
    {
      rank: 1,
      name: "Sarah Johnson",
      handle: "@sarahj",
      gmv: 8450,
      posts: 24,
      engagement: 6.8,
      consistency: 98,
      change: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 2,
      name: "Mike Chen",
      handle: "@mikechen",
      gmv: 7230,
      posts: 22,
      engagement: 5.9,
      consistency: 95,
      change: -1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 3,
      name: "Emma Davis",
      handle: "@emmad",
      gmv: 6890,
      posts: 26,
      engagement: 7.2,
      consistency: 92,
      change: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 4,
      name: "Alex Rodriguez",
      handle: "@alexr",
      gmv: 6120,
      posts: 20,
      engagement: 5.4,
      consistency: 89,
      change: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 5,
      name: "Lisa Wang",
      handle: "@lisawang",
      gmv: 5780,
      posts: 18,
      engagement: 6.1,
      consistency: 94,
      change: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  demographics: {
    gender: { male: 61.2, female: 38.8 },
    age: [
      { range: "18-24", percentage: 45 },
      { range: "25-34", percentage: 30 },
      { range: "35-44", percentage: 15 },
      { range: "45+", percentage: 10 },
    ],
  },
}

export default function AnalyticsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("default") // Initialize selectedPeriod with a default value
  const [selectedCampaign, setSelectedCampaign] = useState("all")

  const { data: analyticsData } = useDashboardAnalytics()
  const { data: creatorPerformanceData } = useCreatorPerformance()

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:ml-60">
        <AgencyHeader onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <span>Analytics</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                <p className="text-gray-400 mt-1">Real-time performance insights and campaign analytics</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Global Filters */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Filters:</span>
                </div>
                <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Campaigns" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="golf">Golf Partner Program</SelectItem>
                    <SelectItem value="fashion">Fashion Nova Collab</SelectItem>
                    <SelectItem value="healing">Global Healing Campaign</SelectItem>
                    <SelectItem value="tech">Tech Gadget Pro</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="1d">Yesterday</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Segments" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="18-24">18-24 years</SelectItem>
                    <SelectItem value="25-34">25-34 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards - Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total GMV</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(analyticsData?.kpis.totalGMV.value || mockData.kpis.totalGMV.value)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">
                    +{analyticsData?.kpis.totalGMV.growth || mockData.kpis.totalGMV.growth}%
                  </span>
                  <span className="text-sm text-gray-400 ml-2">vs last 30 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <p className="text-2xl font-bold text-white">
                      {formatNumber(analyticsData?.kpis.totalViews.value || mockData.kpis.totalViews.value)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">
                    +{analyticsData?.kpis.totalViews.growth || mockData.kpis.totalViews.growth}%
                  </span>
                  <span className="text-sm text-gray-400 ml-2">vs last 30 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Engagement Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {analyticsData?.kpis.engagement.value || mockData.kpis.engagement.value}%
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-pink-600/20 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">
                    +{analyticsData?.kpis.engagement.growth || mockData.kpis.engagement.growth}%
                  </span>
                  <span className="text-sm text-gray-400 ml-2">vs last 30 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Creators</p>
                    <p className="text-2xl font-bold text-white">
                      {analyticsData?.kpis.activeCreators.value || mockData.kpis.activeCreators.value}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-green-400">
                    +{analyticsData?.kpis.activeCreators.growth || mockData.kpis.activeCreators.growth} new
                  </span>
                  <span className="text-sm text-gray-400 ml-2">this period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Campaign Progress</h3>
                  <Target className="h-5 w-5 text-purple-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {analyticsData?.kpis.campaignProgress.value || mockData.kpis.campaignProgress.value}%
                    </span>
                    <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                      {analyticsData?.kpis.campaignProgress.status || mockData.kpis.campaignProgress.status}
                    </Badge>
                  </div>
                  <Progress
                    value={analyticsData?.kpis.campaignProgress.value || mockData.kpis.campaignProgress.value}
                    className="h-2"
                  />
                  <p className="text-sm text-gray-400">Overall network progress</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Content Delivery</h3>
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {analyticsData?.kpis.contentDelivery.value || mockData.kpis.contentDelivery.value}%
                    </span>
                    <span className="text-sm text-gray-400">
                      {analyticsData?.kpis.contentDelivery.avgPosts || mockData.kpis.contentDelivery.avgPosts} posts/day
                    </span>
                  </div>
                  <Progress
                    value={analyticsData?.kpis.contentDelivery.value || mockData.kpis.contentDelivery.value}
                    className="h-2"
                  />
                  <p className="text-sm text-gray-400">On-time delivery rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">ROI Metrics</h3>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {analyticsData?.kpis.roi.value || mockData.kpis.roi.value}x
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        CPA: ${analyticsData?.kpis.roi.cpa || mockData.kpis.roi.cpa}
                      </p>
                      <p className="text-sm text-green-400">
                        +{analyticsData?.kpis.roi.growth || mockData.kpis.roi.growth}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Return on ad spend</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GMV Performance Chart */}
            <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">GMV Performance</CardTitle>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400">GMV Performance Chart</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Interactive line chart showing GMV progression over time
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Total GMV</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency(analyticsData?.kpis.totalGMV.value || 124350)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Daily Avg</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency((analyticsData?.kpis.totalGMV.value || 124350) / 30)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Goal Progress</p>
                    <p className="text-lg font-semibold text-white">
                      {analyticsData?.kpis.campaignProgress.value || 78}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Projected</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency((analyticsData?.kpis.totalGMV.value || 124350) * 1.25)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Progress Tracker */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData?.campaigns ||
                  mockData.campaigns.map((campaign, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              campaign.status === "ahead"
                                ? "bg-green-400"
                                : campaign.status === "on-track"
                                  ? "bg-yellow-400"
                                  : "bg-red-400",
                            )}
                          />
                          <span className="text-sm font-medium text-white truncate">{campaign.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{campaign.progress}%</span>
                      </div>
                      <Progress value={Math.min(campaign.progress, 100)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>GMV: {formatCurrency(campaign.gmv)}</span>
                        <span>{campaign.creators} creators</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Creator Performance & Content Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Top Performers</CardTitle>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analyticsData?.topCreators || mockData.topCreators).slice(0, 5).map((creator, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span
                            className={cn(
                              "text-sm font-bold",
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                  ? "text-gray-300"
                                  : index === 2
                                    ? "text-orange-400"
                                    : "text-gray-400",
                            )}
                          >
                            #{creator.rank}
                          </span>
                          {index < 3 && (
                            <div className="absolute -top-1 -right-1">
                              {index === 0 && <Crown className="h-3 w-3 text-yellow-400" />}
                              {index === 1 && <Medal className="h-3 w-3 text-gray-300" />}
                              {index === 2 && <Award className="h-3 w-3 text-orange-400" />}
                            </div>
                          )}
                        </div>
                        <img
                          src={creator.avatar || "/placeholder.svg"}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-white">{creator.name}</p>
                          <p className="text-sm text-gray-400">{creator.handle}</p>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="font-semibold text-white">{formatCurrency(creator.gmv)}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{creator.posts} posts</span>
                          <span>{creator.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Audience Demographics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Audience Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gender Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Gender Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Male</span>
                      <span className="text-sm font-medium text-white">
                        {analyticsData?.demographics.gender.male || mockData.demographics.gender.male}%
                      </span>
                    </div>
                    <Progress
                      value={analyticsData?.demographics.gender.male || mockData.demographics.gender.male}
                      className="h-2"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Female</span>
                      <span className="text-sm font-medium text-white">
                        {analyticsData?.demographics.gender.female || mockData.demographics.gender.female}%
                      </span>
                    </div>
                    <Progress
                      value={analyticsData?.demographics.gender.female || mockData.demographics.gender.female}
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Age Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Age Distribution</h4>
                  <div className="space-y-3">
                    {(analyticsData?.demographics.age || mockData.demographics.age).map((age, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{age.range}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-800 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${age.percentage}%` }} />
                          </div>
                          <span className="text-sm font-medium text-white w-8">{age.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Performance Analytics */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Content Analytics</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-4">Posts per Day</h4>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Daily Posting Volume Chart</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-4">Top Posts by GMV</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Play className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Post #{i}</p>
                          <p className="text-xs text-gray-400">@creator{i} • 2.4K views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">{formatCurrency(1200 - i * 100)}</p>
                          <p className="text-xs text-gray-400">GMV</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Deep Dive */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Engagement Deep Dive</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Compare Periods
                  </Button>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg mb-6">
                <div className="text-center">
                  <Heart className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400">Multi-metric Engagement Chart</p>
                  <p className="text-sm text-gray-500 mt-2">Views, Likes, Comments, Shares over time</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Views</p>
                  <p className="text-lg font-semibold text-white">2.4M</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Likes</p>
                  <p className="text-lg font-semibold text-white">112K</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Comments</p>
                  <p className="text-lg font-semibold text-white">8.9K</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Share className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Shares</p>
                  <p className="text-lg font-semibold text-white">3.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
