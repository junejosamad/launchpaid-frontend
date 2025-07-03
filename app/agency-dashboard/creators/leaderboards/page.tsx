"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  MessageSquare,
  Plus,
  MoreHorizontal,
  Download,
  RefreshCw,
  Filter,
  Users,
  DollarSign,
  BarChart3,
  Target,
  Crown,
  Star,
  ChevronRight,
  Home,
  ArrowUp,
  ArrowDown,
  Send,
  Zap,
  CheckCircle,
} from "lucide-react"

// Mock data for creators
const mockCreators = [
  {
    id: 1,
    rank: 1,
    previousRank: 2,
    name: "Emma Rodriguez",
    handle: "@emma_lifestyle",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    gmv: 125000,
    gmvGrowth: 15.2,
    posts: 28,
    engagementRate: 8.4,
    followers: 245000,
    followerGrowth: 12.5,
    networkScore: 98,
    consistency: 95,
    rating: 4.9,
    badges: ["$100K+", "Consistent", "Top Performer"],
    trending: "up",
    lastActive: "2 hours ago",
    campaigns: 5,
    avgViews: 85000,
    demographics: { female: 65, age: "18-24" },
  },
  {
    id: 2,
    rank: 2,
    previousRank: 1,
    name: "Marcus Chen",
    handle: "@marcus_tech",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    gmv: 118500,
    gmvGrowth: -2.1,
    posts: 32,
    engagementRate: 7.8,
    followers: 189000,
    followerGrowth: 8.3,
    networkScore: 96,
    consistency: 92,
    rating: 4.8,
    badges: ["$100K+", "Tech Expert"],
    trending: "down",
    lastActive: "1 hour ago",
    campaigns: 4,
    avgViews: 72000,
    demographics: { female: 45, age: "25-34" },
  },
  {
    id: 3,
    rank: 3,
    previousRank: 4,
    name: "Sophia Williams",
    handle: "@sophia_beauty",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: false,
    gmv: 95000,
    gmvGrowth: 22.8,
    posts: 24,
    engagementRate: 9.2,
    followers: 156000,
    followerGrowth: 18.7,
    networkScore: 94,
    consistency: 88,
    rating: 4.7,
    badges: ["$50K+", "Rising Star"],
    trending: "up",
    lastActive: "30 minutes ago",
    campaigns: 3,
    avgViews: 68000,
    demographics: { female: 78, age: "18-24" },
  },
  {
    id: 4,
    rank: 4,
    previousRank: 3,
    name: "Jake Thompson",
    handle: "@jake_fitness",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    gmv: 87500,
    gmvGrowth: -5.3,
    posts: 35,
    engagementRate: 6.9,
    followers: 198000,
    followerGrowth: 5.2,
    networkScore: 91,
    consistency: 94,
    rating: 4.6,
    badges: ["$50K+", "Fitness Pro"],
    trending: "down",
    lastActive: "4 hours ago",
    campaigns: 6,
    avgViews: 55000,
    demographics: { female: 52, age: "18-34" },
  },
  {
    id: 5,
    rank: 5,
    previousRank: 6,
    name: "Aria Patel",
    handle: "@aria_food",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: false,
    gmv: 76200,
    gmvGrowth: 11.4,
    posts: 29,
    engagementRate: 7.5,
    followers: 134000,
    followerGrowth: 14.2,
    networkScore: 89,
    consistency: 86,
    rating: 4.5,
    badges: ["$50K+", "Food Creator"],
    trending: "up",
    lastActive: "1 day ago",
    campaigns: 4,
    avgViews: 48000,
    demographics: { female: 68, age: "25-34" },
  },
]

// Additional creators for the extended table
const extendedCreators = [
  ...mockCreators,
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    rank: i + 6,
    previousRank: i + 5,
    name: `Creator ${i + 6}`,
    handle: `@creator${i + 6}`,
    avatar: `/placeholder.svg?height=40&width=40`,
    verified: Math.random() > 0.5,
    gmv: Math.floor(Math.random() * 50000) + 20000,
    gmvGrowth: (Math.random() - 0.5) * 30,
    posts: Math.floor(Math.random() * 20) + 10,
    engagementRate: Math.random() * 5 + 4,
    followers: Math.floor(Math.random() * 100000) + 50000,
    followerGrowth: (Math.random() - 0.5) * 20,
    networkScore: Math.floor(Math.random() * 20) + 70,
    consistency: Math.floor(Math.random() * 20) + 75,
    rating: Math.random() * 1.5 + 3.5,
    badges: ["$10K+"],
    trending: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
    lastActive: `${Math.floor(Math.random() * 7) + 1} days ago`,
    campaigns: Math.floor(Math.random() * 5) + 1,
    avgViews: Math.floor(Math.random() * 30000) + 10000,
    demographics: { female: Math.floor(Math.random() * 40) + 40, age: "18-34" },
  })),
]

export default function CreatorLeaderboards() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<any>(null)
  const [rankingType, setRankingType] = useState("paid")
  const [timePeriod, setTimePeriod] = useState("30")
  const [rankingCriteria, setRankingCriteria] = useState("gmv")
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("table")

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return { type: "up", value: previous - current }
    if (current > previous) return { type: "down", value: current - previous }
    return { type: "stable", value: 0 }
  }

  const getTrendingIcon = (trending: string, size = "h-4 w-4") => {
    switch (trending) {
      case "up":
        return <TrendingUp className={`${size} text-green-400`} />
      case "down":
        return <TrendingDown className={`${size} text-red-400`} />
      default:
        return <Minus className={`${size} text-gray-400`} />
    }
  }

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  const getBadgeColor = (badge: string) => {
    if (badge.includes("$100K+")) return "bg-purple-600/20 text-purple-400 border-purple-600/30"
    if (badge.includes("$50K+")) return "bg-blue-600/20 text-blue-400 border-blue-600/30"
    if (badge.includes("$10K+")) return "bg-green-600/20 text-green-400 border-green-600/30"
    return "bg-gray-600/20 text-gray-400 border-gray-600/30"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />

      <div className="lg:ml-60 flex flex-col min-h-screen">
        <AgencyHeader onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>Creators</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-purple-400">Leaderboards</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Creator Leaderboards</h1>
                <p className="text-gray-400">Top performing creators in your network</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Primary Controls */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-400">Ranking Type:</span>
                    <Tabs value={rankingType} onValueChange={setRankingType}>
                      <TabsList className="bg-gray-800">
                        <TabsTrigger value="paid" className="data-[state=active]:bg-purple-600">
                          Paid Content
                        </TabsTrigger>
                        <TabsTrigger value="organic" className="data-[state=active]:bg-purple-600">
                          Organic Growth
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-400">Time Period:</span>
                    <Select value={timePeriod} onValueChange={setTimePeriod}>
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="1">Today</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="all">All-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-400">Criteria:</span>
                    <Select value={rankingCriteria} onValueChange={setRankingCriteria}>
                      <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="gmv">GMV Generated</SelectItem>
                        <SelectItem value="posts">Total Posts</SelectItem>
                        <SelectItem value="engagement">Engagement Rate</SelectItem>
                        <SelectItem value="growth">Follower Growth</SelectItem>
                        <SelectItem value="consistency">Consistency Rating</SelectItem>
                        <SelectItem value="overall">Overall Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search and Advanced Filters */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Input
                    placeholder="Search creators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-gray-800 border-gray-700"
                  />
                  <Button variant="outline" size="sm" className="border-gray-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Creators</p>
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-sm text-green-400">+12 this month</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Average GMV</p>
                    <p className="text-2xl font-bold">$45.2K</p>
                    <p className="text-sm text-green-400">+8.3% vs last period</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Top Performer GMV</p>
                    <p className="text-2xl font-bold">$125K</p>
                    <p className="text-sm text-purple-400">Emma Rodriguez</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Engagement</p>
                    <p className="text-2xl font-bold">7.8%</p>
                    <p className="text-sm text-blue-400">Network average</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Top Performers - Podium */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockCreators.slice(0, 3).map((creator, index) => {
                  const rankChange = getRankChange(creator.rank, creator.previousRank)
                  return (
                    <Card
                      key={creator.id}
                      className={`relative overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-600/30 ring-2 ring-yellow-600/20"
                          : index === 1
                            ? "bg-gradient-to-br from-gray-700/20 to-gray-600/10 border-gray-500/30"
                            : "bg-gradient-to-br from-amber-900/20 to-amber-800/10 border-amber-600/30"
                      }`}
                      onClick={() => setSelectedCreator(creator)}
                    >
                      {index === 0 && (
                        <div className="absolute top-2 right-2">
                          <Crown className="h-6 w-6 text-yellow-400" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {creator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm">
                              {creator.rank}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">{creator.name}</h3>
                              {creator.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                            </div>
                            <p className="text-gray-400">{creator.handle}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {getMedalIcon(creator.rank)}
                              <span className="text-sm font-medium">
                                {index === 0 ? "Network Champion" : `#${creator.rank} Performer`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-green-400">${creator.gmv.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">GMV Generated</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              {getTrendingIcon(creator.trending)}
                              <span className={`text-sm ${creator.gmvGrowth > 0 ? "text-green-400" : "text-red-400"}`}>
                                {creator.gmvGrowth > 0 ? "+" : ""}
                                {creator.gmvGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Posts</p>
                              <p className="font-semibold">{creator.posts}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Engagement</p>
                              <p className="font-semibold">{creator.engagementRate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Followers</p>
                              <p className="font-semibold">{(creator.followers / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Score</p>
                              <p className="font-semibold">{creator.networkScore}/100</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {creator.badges.map((badge) => (
                              <Badge key={badge} variant="outline" className={getBadgeColor(badge)}>
                                {badge}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-700">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-700">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Extended Leaderboard Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Full Leaderboard</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-800">
                    <tr className="text-left">
                      <th className="p-3 text-sm font-medium text-gray-400">Rank</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Creator</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Performance</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Content</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Audience</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Score</th>
                      <th className="p-3 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extendedCreators.slice(0, 20).map((creator) => {
                      const rankChange = getRankChange(creator.rank, creator.previousRank)
                      return (
                        <tr
                          key={creator.id}
                          className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                          onClick={() => setSelectedCreator(creator)}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{creator.rank}</span>
                              {rankChange.type === "up" && (
                                <div className="flex items-center gap-1 text-green-400">
                                  <ArrowUp className="h-3 w-3" />
                                  <span className="text-xs">+{rankChange.value}</span>
                                </div>
                              )}
                              {rankChange.type === "down" && (
                                <div className="flex items-center gap-1 text-red-400">
                                  <ArrowDown className="h-3 w-3" />
                                  <span className="text-xs">-{rankChange.value}</span>
                                </div>
                              )}
                              {rankChange.type === "stable" && <Minus className="h-3 w-3 text-gray-400" />}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {creator.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{creator.name}</p>
                                  {creator.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                                </div>
                                <p className="text-sm text-gray-400">{creator.handle}</p>
                                <div className="flex gap-1 mt-1">
                                  {creator.badges.slice(0, 2).map((badge) => (
                                    <Badge key={badge} variant="outline" className={`text-xs ${getBadgeColor(badge)}`}>
                                      {badge}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-bold text-green-400">${creator.gmv.toLocaleString()}</p>
                              <div className="flex items-center gap-1">
                                {getTrendingIcon(creator.trending, "h-3 w-3")}
                                <span
                                  className={`text-xs ${creator.gmvGrowth > 0 ? "text-green-400" : "text-red-400"}`}
                                >
                                  {creator.gmvGrowth > 0 ? "+" : ""}
                                  {creator.gmvGrowth.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <p>{creator.posts} posts</p>
                              <p className="text-gray-400">{(creator.avgViews / 1000).toFixed(0)}K avg views</p>
                              <p className="text-gray-400">{creator.engagementRate.toFixed(1)}% engagement</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <p>{(creator.followers / 1000).toFixed(0)}K followers</p>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`text-xs ${
                                    creator.followerGrowth > 0 ? "text-green-400" : "text-red-400"
                                  }`}
                                >
                                  {creator.followerGrowth > 0 ? "+" : ""}
                                  {creator.followerGrowth.toFixed(1)}%
                                </span>
                              </div>
                              <p className="text-gray-400">
                                {creator.demographics.female}% F, {creator.demographics.age}
                              </p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <p className="font-bold">{creator.networkScore}/100</p>
                              <p className="text-gray-400">{creator.consistency}% consistent</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span>{creator.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Plus className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                  <DropdownMenuItem>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send SMS
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Target className="h-4 w-4 mr-2" />
                                    Add to Campaign
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Zap className="h-4 w-4 mr-2" />
                                    Send Bonus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Creator Quick View Modal */}
      <Dialog open={!!selectedCreator} onOpenChange={() => setSelectedCreator(null)}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
          {selectedCreator && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedCreator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedCreator.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{selectedCreator.name}</span>
                      {selectedCreator.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                    </div>
                    <p className="text-sm text-gray-400">{selectedCreator.handle}</p>
                    <p className="text-sm text-purple-400">#{selectedCreator.rank} in Network</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">${selectedCreator.gmv.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">GMV Generated</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold">{(selectedCreator.followers / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-gray-400">Followers</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold">{selectedCreator.consistency}%</p>
                    <p className="text-sm text-gray-400">Consistency</p>
                  </div>
                </div>

                {/* Performance Chart Placeholder */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">30-day performance chart would display here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Campaign
                  </Button>
                  <Button variant="outline" className="border-gray-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Full Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
