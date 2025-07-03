"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Grid3X3,
  List,
  Download,
  Plus,
  MessageSquare,
  UserPlus,
  Star,
  TrendingUp,
  Users,
  Eye,
  Copy,
  Phone,
  Mail,
  MapPin,
  Award,
  BarChart3,
  PieChart,
  Edit,
  Send,
  X,
  ChevronRight,
  Home,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Enhanced mock creator data
const creators = [
  {
    id: 1,
    name: "Emma Rodriguez",
    handle: "@emmalifestyle",
    email: "emma@email.com",
    phone: "+1 (555) 123-4567",
    discord: "emma_lifestyle#1234",
    avatar: "/placeholder.svg?height=80&width=80",
    followers: 2400000,
    totalGMV: 125000,
    rating: 4.9,
    consistency: 95,
    status: "Active",
    badges: ["$100K+ GMV", "Top Performer", "Consistency Champion", "Rising Star"],
    niche: "Fashion",
    audienceGender: { male: 25, female: 75 },
    audienceAge: { "13-17": 15, "18-24": 45, "25-34": 30, "35-44": 10 },
    activeCampaigns: 3,
    totalCampaigns: 28,
    joinDate: "2023-01-15",
    lastActive: "2024-01-20",
    trending: true,
    location: "Los Angeles, CA",
    age: 24,
    ethnicity: "Hispanic",
    shippingAddress: "123 Fashion Ave, LA, CA 90210",
    internalNotes: "Excellent performer, always delivers on time. Great for fashion campaigns.",
    agencyRating: 5,
    campaigns: [
      {
        id: 1,
        name: "Summer Fashion 2024",
        status: "active",
        progress: 85,
        gmv: 15000,
        posts: { completed: 17, target: 20 },
        rating: 4.8,
      },
      {
        id: 2,
        name: "FlexProMeals Campaign",
        status: "completed",
        progress: 100,
        gmv: 8500,
        posts: { completed: 15, target: 15 },
        rating: 4.9,
      },
    ],
    recentPosts: [
      {
        id: 1,
        thumbnail: "/placeholder.svg?height=100&width=100",
        views: 2400000,
        likes: 180000,
        comments: 12000,
        gmv: 2500,
        date: "2024-01-20",
      },
    ],
  },
  {
    id: 2,
    name: "Marcus Chen",
    handle: "@techmarcos",
    email: "marcus@email.com",
    phone: "+1 (555) 234-5678",
    discord: "techmarcos#5678",
    avatar: "/placeholder.svg?height=80&width=80",
    followers: 1800000,
    totalGMV: 89000,
    rating: 4.7,
    consistency: 88,
    status: "Active",
    badges: ["$50K+ GMV", "Tech Expert", "Reliable Creator"],
    niche: "Technology",
    audienceGender: { male: 65, female: 35 },
    audienceAge: { "13-17": 20, "18-24": 40, "25-34": 25, "35-44": 15 },
    activeCampaigns: 2,
    totalCampaigns: 22,
    joinDate: "2023-03-10",
    lastActive: "2024-01-19",
    trending: false,
    location: "San Francisco, CA",
    age: 28,
    ethnicity: "Asian",
    shippingAddress: "456 Tech St, SF, CA 94105",
    internalNotes: "Great for tech products, strong male audience engagement.",
    agencyRating: 4,
    campaigns: [
      {
        id: 3,
        name: "Tech Gadgets Q1",
        status: "active",
        progress: 60,
        gmv: 12000,
        posts: { completed: 12, target: 20 },
        rating: 4.6,
      },
    ],
    recentPosts: [
      {
        id: 2,
        thumbnail: "/placeholder.svg?height=100&width=100",
        views: 1200000,
        likes: 95000,
        comments: 8500,
        gmv: 1800,
        date: "2024-01-19",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia Williams",
    handle: "@beautysofia",
    email: "sophia@email.com",
    phone: "+1 (555) 345-6789",
    discord: "beautysofia#9012",
    avatar: "/placeholder.svg?height=80&width=80",
    followers: 3200000,
    totalGMV: 156000,
    rating: 4.8,
    consistency: 92,
    status: "Active",
    badges: ["$100K+ GMV", "Beauty Guru", "Rising Star", "Engagement Queen"],
    niche: "Beauty",
    audienceGender: { male: 15, female: 85 },
    audienceAge: { "13-17": 25, "18-24": 50, "25-34": 20, "35-44": 5 },
    activeCampaigns: 4,
    totalCampaigns: 31,
    joinDate: "2022-11-20",
    lastActive: "2024-01-20",
    trending: true,
    location: "Miami, FL",
    age: 22,
    ethnicity: "Mixed",
    shippingAddress: "789 Beauty Blvd, Miami, FL 33101",
    internalNotes: "Top beauty influencer, excellent engagement rates. Premium tier creator.",
    agencyRating: 5,
    campaigns: [
      {
        id: 4,
        name: "Beauty Essentials 2024",
        status: "active",
        progress: 90,
        gmv: 25000,
        posts: { completed: 18, target: 20 },
        rating: 4.9,
      },
    ],
    recentPosts: [
      {
        id: 3,
        thumbnail: "/placeholder.svg?height=100&width=100",
        views: 3500000,
        likes: 280000,
        comments: 15000,
        gmv: 3200,
        date: "2024-01-20",
      },
    ],
  },
]

const filterOptions = {
  gmv: [
    { label: "$1K+", value: 1000 },
    { label: "$5K+", value: 5000 },
    { label: "$10K+", value: 10000 },
    { label: "$50K+", value: 50000 },
    { label: "$100K+", value: 100000 },
    { label: "$500K+", value: 500000 },
    { label: "$1M+", value: 1000000 },
  ],
  status: ["Active", "Inactive", "Pending Approval"],
  niche: ["Fashion", "Beauty", "Technology", "Fitness", "Food", "Travel", "Gaming", "Lifestyle"],
  badges: [
    "$1K+ GMV",
    "$5K+ GMV",
    "$10K+ GMV",
    "$50K+ GMV",
    "$100K+ GMV",
    "$500K+ GMV",
    "$1M+ GMV",
    "Top Performer",
    "Rising Star",
    "Consistency Champion",
  ],
  audienceGender: ["Male Majority", "Female Majority", "Mixed"],
  audienceAge: ["13-17", "18-24", "25-34", "35-44", "45+"],
}

export default function CreatorDatabase() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    gmvRange: [0, 1000000],
    status: [] as string[],
    niche: [] as string[],
    badges: [] as string[],
    audienceGender: [] as string[],
    audienceAge: [] as string[],
    consistencyRange: [0, 100],
    ratingRange: [0, 5],
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "Pending Approval":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Inactive":
        return "bg-gray-500"
      case "Pending Approval":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getGMVBadgeColor = (gmv: number) => {
    if (gmv >= 1000000) return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    if (gmv >= 500000) return "bg-pink-500/20 text-pink-400 border-pink-500/30"
    if (gmv >= 100000) return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    if (gmv >= 50000) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (gmv >= 10000) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    if (gmv >= 5000) return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const getGMVBadgeText = (gmv: number) => {
    if (gmv >= 1000000) return "$1M+ GMV"
    if (gmv >= 500000) return "$500K+ GMV"
    if (gmv >= 100000) return "$100K+ GMV"
    if (gmv >= 50000) return "$50K+ GMV"
    if (gmv >= 10000) return "$10K+ GMV"
    if (gmv >= 5000) return "$5K+ GMV"
    if (gmv >= 1000) return "$1K+ GMV"
    return "New Creator"
  }

  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGMV = creator.totalGMV >= filters.gmvRange[0] && creator.totalGMV <= filters.gmvRange[1]
      const matchesStatus = filters.status.length === 0 || filters.status.includes(creator.status)
      const matchesNiche = filters.niche.length === 0 || filters.niche.includes(creator.niche)
      const matchesBadges =
        filters.badges.length === 0 || filters.badges.some((badge) => creator.badges.includes(badge))
      const matchesConsistency =
        creator.consistency >= filters.consistencyRange[0] && creator.consistency <= filters.consistencyRange[1]
      const matchesRating = creator.rating >= filters.ratingRange[0] && creator.rating <= filters.ratingRange[1]

      return (
        matchesSearch &&
        matchesGMV &&
        matchesStatus &&
        matchesNiche &&
        matchesBadges &&
        matchesConsistency &&
        matchesRating
      )
    })
  }, [searchQuery, filters, creators])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AgencySidebar isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-60">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-6 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>Creators</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-purple-400">Database</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Creator Database</h1>
                <p className="text-gray-400 mt-1">{filteredCreators.length} creators in your network</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Creator
                </Button>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search creators by name, handle, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className={`border-gray-700 ${showFilters ? "bg-purple-600/20 border-purple-500/30 text-purple-400" : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {(filters.status.length > 0 || filters.niche.length > 0 || filters.badges.length > 0) && (
                      <Badge className="ml-2 bg-purple-600 text-white">
                        {filters.status.length + filters.niche.length + filters.badges.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96 bg-gray-900 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Advanced Filters</SheetTitle>
                    <SheetDescription className="text-gray-400">
                      Filter creators by performance, demographics, and more
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* GMV Range */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">GMV Performance</Label>
                      <div className="space-y-3">
                        <Slider
                          value={filters.gmvRange}
                          onValueChange={(value) => setFilters((prev) => ({ ...prev, gmvRange: value }))}
                          max={1000000}
                          step={1000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{formatCurrency(filters.gmvRange[0])}</span>
                          <span>{formatCurrency(filters.gmvRange[1])}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.gmv.map((option) => (
                            <Button
                              key={option.label}
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-700 bg-gray-800 hover:bg-purple-600/20 hover:border-purple-500/30"
                              onClick={() => setFilters((prev) => ({ ...prev, gmvRange: [option.value, 1000000] }))}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Creator Status</Label>
                      <div className="space-y-2">
                        {filterOptions.status.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilters((prev) => ({ ...prev, status: [...prev.status, status] }))
                                } else {
                                  setFilters((prev) => ({ ...prev, status: prev.status.filter((s) => s !== status) }))
                                }
                              }}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm text-gray-300">
                              {status}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Niche */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Content Niche</Label>
                      <div className="space-y-2">
                        {filterOptions.niche.map((niche) => (
                          <div key={niche} className="flex items-center space-x-2">
                            <Checkbox
                              id={`niche-${niche}`}
                              checked={filters.niche.includes(niche)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilters((prev) => ({ ...prev, niche: [...prev.niche, niche] }))
                                } else {
                                  setFilters((prev) => ({ ...prev, niche: prev.niche.filter((n) => n !== niche) }))
                                }
                              }}
                            />
                            <Label htmlFor={`niche-${niche}`} className="text-sm text-gray-300">
                              {niche}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Earned Badges */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Earned Badges</Label>
                      <div className="space-y-2">
                        {filterOptions.badges.map((badge) => (
                          <div key={badge} className="flex items-center space-x-2">
                            <Checkbox
                              id={`badge-${badge}`}
                              checked={filters.badges.includes(badge)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilters((prev) => ({ ...prev, badges: [...prev.badges, badge] }))
                                } else {
                                  setFilters((prev) => ({ ...prev, badges: prev.badges.filter((b) => b !== badge) }))
                                }
                              }}
                            />
                            <Label htmlFor={`badge-${badge}`} className="text-sm text-gray-300">
                              {badge}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Consistency Rate */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Consistency Rate</Label>
                      <Slider
                        value={filters.consistencyRange}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, consistencyRange: value }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{filters.consistencyRange[0]}%</span>
                        <span>{filters.consistencyRange[1]}%</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Average Rating</Label>
                      <Slider
                        value={filters.ratingRange}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, ratingRange: value }))}
                        max={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{filters.ratingRange[0].toFixed(1)} ⭐</span>
                        <span>{filters.ratingRange[1].toFixed(1)} ⭐</span>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700"
                      onClick={() =>
                        setFilters({
                          gmvRange: [0, 1000000],
                          status: [],
                          niche: [],
                          badges: [],
                          audienceGender: [],
                          audienceAge: [],
                          consistencyRange: [0, 100],
                          ratingRange: [0, 5],
                        })
                      }
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-r-none ${viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-700"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={`rounded-l-none ${viewMode === "table" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-700"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Creator Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.map((creator) => (
                <Card
                  key={creator.id}
                  className="bg-gray-900 border-gray-800 hover:border-purple-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <CardContent className="p-6">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                            <AvatarFallback className="bg-gray-800 text-white">
                              {creator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusIndicator(creator.status)}`}
                          />
                        </div>
                        <div>
                          <button
                            className="font-semibold text-white hover:text-purple-400 transition-colors text-left"
                            onClick={() => setSelectedCreator(creator)}
                          >
                            {creator.name}
                          </button>
                          <div className="flex items-center gap-1">
                            <p className="text-sm text-gray-400">{creator.handle}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => copyToClipboard(creator.handle)}
                            >
                              <Copy className="h-3 w-3 text-gray-500 hover:text-gray-300" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {creator.trending && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-800">
                          <MessageSquare className="h-4 w-4 text-gray-400 hover:text-white" />
                        </Button>
                      </div>
                    </div>

                    {/* GMV Badge */}
                    <div className="mb-4">
                      <Badge className={`${getGMVBadgeColor(creator.totalGMV)} font-semibold`}>
                        <Award className="h-3 w-3 mr-1" />
                        {getGMVBadgeText(creator.totalGMV)}
                      </Badge>
                    </div>

                    {/* Metrics Section */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total GMV</span>
                        <span className="font-bold text-green-400">{formatCurrency(creator.totalGMV)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Followers</span>
                        <span className="font-semibold text-white">{formatNumber(creator.followers)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-white">{creator.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Consistency</span>
                        <span
                          className={`font-semibold ${creator.consistency >= 90 ? "text-green-400" : creator.consistency >= 70 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {creator.consistency}%
                        </span>
                      </div>
                    </div>

                    {/* Badge Collection */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {creator.badges.slice(0, 2).map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs border-gray-700 text-gray-300">
                            {badge}
                          </Badge>
                        ))}
                        {creator.badges.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                            +{creator.badges.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => setSelectedCreator(creator)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add to Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            <Users className="h-4 w-4 mr-2" />
                            Add to Collection
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Creator Table View */}
          {viewMode === "table" && (
            <Card className="bg-gray-900 border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400">Creator</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Followers</TableHead>
                    <TableHead className="text-gray-400">Total GMV</TableHead>
                    <TableHead className="text-gray-400">Rating</TableHead>
                    <TableHead className="text-gray-400">Consistency</TableHead>
                    <TableHead className="text-gray-400">Badges</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreators.map((creator) => (
                    <TableRow key={creator.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                              <AvatarFallback className="bg-gray-800 text-white text-xs">
                                {creator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-gray-900 ${getStatusIndicator(creator.status)}`}
                            />
                          </div>
                          <div>
                            <button
                              className="font-medium text-white hover:text-purple-400 transition-colors text-left"
                              onClick={() => setSelectedCreator(creator)}
                            >
                              {creator.name}
                            </button>
                            <p className="text-sm text-gray-400">{creator.handle}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(creator.status)}>{creator.status}</Badge>
                      </TableCell>
                      <TableCell className="text-white">{formatNumber(creator.followers)}</TableCell>
                      <TableCell className="text-green-400 font-semibold">{formatCurrency(creator.totalGMV)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">{creator.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${creator.consistency >= 90 ? "text-green-400" : creator.consistency >= 70 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {creator.consistency}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {creator.badges.slice(0, 2).map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs border-gray-700 text-gray-300">
                              {badge}
                            </Badge>
                          ))}
                          {creator.badges.length > 2 && (
                            <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                              +{creator.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-gray-800"
                            >
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem
                              className="text-gray-300 hover:text-white hover:bg-gray-700"
                              onClick={() => setSelectedCreator(creator)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add to Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* No Results */}
          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No creators found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find creators.</p>
            </div>
          )}
        </div>

        {/* Creator Profile Modal */}
        {selectedCreator && (
          <Dialog open={!!selectedCreator} onOpenChange={() => setSelectedCreator(null)}>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl text-white">Creator Profile</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Detailed information and analytics for {selectedCreator.name}
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCreator(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-gray-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600">
                    Campaigns
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="management" className="data-[state=active]:bg-purple-600">
                    Management
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Profile Overview */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Header Section */}
                  <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedCreator.avatar || "/placeholder.svg"} alt={selectedCreator.name} />
                        <AvatarFallback className="bg-gray-700 text-white text-xl">
                          {selectedCreator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-gray-900 ${getStatusIndicator(selectedCreator.status)}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{selectedCreator.name}</h3>
                      <p className="text-lg text-purple-400">{selectedCreator.handle}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{selectedCreator.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(selectedCreator.email)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{selectedCreator.phone}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(selectedCreator.phone)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add to Campaign
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                          <Users className="h-4 w-4 mr-2" />
                          Add to Collection
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Key Information Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {formatCurrency(selectedCreator.totalGMV)}
                        </div>
                        <div className="text-sm text-gray-400">Total GMV</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedCreator.activeCampaigns}</div>
                        <div className="text-sm text-gray-400">Active Campaigns</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {formatNumber(selectedCreator.followers)}
                        </div>
                        <div className="text-sm text-gray-400">Followers</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{selectedCreator.consistency}%</div>
                        <div className="text-sm text-gray-400">Consistency</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact & Demographics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Contact Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">{selectedCreator.phone}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(selectedCreator.phone)}
                          >
                            <Copy className="h-3 w-3 text-gray-400" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">{selectedCreator.email}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(selectedCreator.email)}
                          >
                            <Copy className="h-3 w-3 text-gray-400" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{selectedCreator.discord}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{selectedCreator.shippingAddress}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Demographics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Age</span>
                          <span className="text-white">{selectedCreator.age} years old</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location</span>
                          <span className="text-white">{selectedCreator.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ethnicity</span>
                          <span className="text-white">{selectedCreator.ethnicity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Join Date</span>
                          <span className="text-white">{selectedCreator.joinDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Badge Collection */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Earned Badges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {selectedCreator.badges.map((badge) => (
                          <Badge
                            key={badge}
                            className="px-3 py-2 bg-purple-600/20 text-purple-400 border-purple-500/30"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Campaign History */}
                <TabsContent value="campaigns" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    {/* Active Campaigns */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Active Campaigns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCreator.campaigns
                            .filter((campaign) => campaign.status === "active")
                            .map((campaign) => (
                              <div key={campaign.id} className="p-4 bg-gray-750 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-white">{campaign.name}</h4>
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                  <div>
                                    <p className="text-sm text-gray-400">Progress</p>
                                    <p className="font-semibold text-white">{campaign.progress}%</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">GMV</p>
                                    <p className="font-semibold text-green-400">{formatCurrency(campaign.gmv)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">Posts</p>
                                    <p className="font-semibold text-white">
                                      {campaign.posts.completed}/{campaign.posts.target}
                                    </p>
                                  </div>
                                </div>
                                <Progress value={campaign.progress} className="h-2" />
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Previous Campaigns */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Previous Campaigns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCreator.campaigns
                            .filter((campaign) => campaign.status === "completed")
                            .map((campaign) => (
                              <div key={campaign.id} className="p-4 bg-gray-750 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-white">{campaign.name}</h4>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-white">{campaign.rating}</span>
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-400">Final GMV</p>
                                    <p className="font-semibold text-green-400">{formatCurrency(campaign.gmv)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">Posts Delivered</p>
                                    <p className="font-semibold text-white">
                                      {campaign.posts.completed}/{campaign.posts.target}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">Completion Rate</p>
                                    <p className="font-semibold text-green-400">100%</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab 3: Analytics & Audience */}
                <TabsContent value="analytics" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Audience Demographics */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <PieChart className="h-5 w-5" />
                          Audience Demographics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Gender Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Female</span>
                              <span className="text-white">{selectedCreator.audienceGender.female}%</span>
                            </div>
                            <Progress value={selectedCreator.audienceGender.female} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Male</span>
                              <span className="text-white">{selectedCreator.audienceGender.male}%</span>
                            </div>
                            <Progress value={selectedCreator.audienceGender.male} className="h-2" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Age Distribution</h4>
                          <div className="space-y-2">
                            {Object.entries(selectedCreator.audienceAge).map(([age, percentage]) => (
                              <div key={age}>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-300">{age}</span>
                                  <span className="text-white">{percentage}%</span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Analytics */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Performance Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg. Views per Post</span>
                            <span className="text-white font-semibold">2.1M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg. Engagement Rate</span>
                            <span className="text-green-400 font-semibold">7.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg. GMV per Post</span>
                            <span className="text-green-400 font-semibold">
                              {formatCurrency(selectedCreator.totalGMV / selectedCreator.totalCampaigns)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Best Performing Niche</span>
                            <span className="text-white font-semibold">{selectedCreator.niche}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab 4: Content & Posts */}
                <TabsContent value="content" className="space-y-6 mt-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCreator.recentPosts.map((post) => (
                          <div key={post.id} className="bg-gray-750 rounded-lg p-4">
                            <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                              <img
                                src={post.thumbnail || "/placeholder.svg"}
                                alt="Post thumbnail"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Views</span>
                                <span className="text-white">{formatNumber(post.views)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Likes</span>
                                <span className="text-white">{formatNumber(post.likes)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">GMV</span>
                                <span className="text-green-400">{formatCurrency(post.gmv)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Date</span>
                                <span className="text-white">{post.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 5: Internal Management */}
                <TabsContent value="management" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Internal Notes */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Internal Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder="Add internal notes about this creator..."
                          defaultValue={selectedCreator.internalNotes}
                          className="bg-gray-750 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                        />
                        <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Save Notes
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Agency Rating */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Agency Rating</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 cursor-pointer ${
                                star <= selectedCreator.agencyRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-white ml-2">{selectedCreator.agencyRating}/5</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Consistency Rate</span>
                            <span className="text-green-400">{selectedCreator.consistency}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Communication</span>
                            <span className="text-green-400">Excellent</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Content Quality</span>
                            <span className="text-green-400">High</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Management Actions */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Management Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Select>
                          <SelectTrigger className="bg-gray-750 border-gray-600">
                            <SelectValue placeholder="Invite to Campaign" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="campaign1">Summer Fashion 2024</SelectItem>
                            <SelectItem value="campaign2">Tech Gadgets Q2</SelectItem>
                            <SelectItem value="campaign3">Beauty Essentials</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Send className="h-4 w-4 mr-2" />
                          Send Campaign Invite
                        </Button>
                        <Select>
                          <SelectTrigger className="bg-gray-750 border-gray-600">
                            <SelectValue placeholder="Add to Collection" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="collection1">Top Performers</SelectItem>
                            <SelectItem value="collection2">Fashion Creators</SelectItem>
                            <SelectItem value="collection3">High GMV</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700">
                          <Users className="h-4 w-4 mr-2" />
                          Add to Collection
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Communication Log */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Communication Log</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-750 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium text-white">Campaign Invite Sent</span>
                              <span className="text-xs text-gray-400">2024-01-20</span>
                            </div>
                            <p className="text-sm text-gray-300">Invited to Summer Fashion 2024 campaign</p>
                          </div>
                          <div className="p-3 bg-gray-750 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium text-white">SMS Reminder</span>
                              <span className="text-xs text-gray-400">2024-01-18</span>
                            </div>
                            <p className="text-sm text-gray-300">Reminder about upcoming deadline</p>
                          </div>
                          <div className="p-3 bg-gray-750 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium text-white">Profile Updated</span>
                              <span className="text-xs text-gray-400">2024-01-15</span>
                            </div>
                            <p className="text-sm text-gray-300">Creator profile information updated</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
