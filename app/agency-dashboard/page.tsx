"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  ChevronDown,
  CircleDollarSign,
  Eye,
  Heart,
  Menu,
  MoreHorizontal,
  Plus,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { RevenueGrowthChart } from "@/components/charts/revenue-growth-chart"
import { PostsPerDayChart } from "@/components/charts/posts-per-day-chart"
import { EngagementChart } from "@/components/charts/engagement-chart"

type CampaignStatus = "ahead" | "on-track" | "behind"

const campaignProgress: {
  name: string
  posts: number
  goal: number
  status: CampaignStatus
}[] = [
  { name: "Golf Partner Program", posts: 28, goal: 20, status: "ahead" },
  { name: "Fashion Nova Collab", posts: 24, goal: 30, status: "on-track" },
  { name: "Global Healing Campaign", posts: 15, goal: 50, status: "behind" },
  { name: "Tech Gadget Pro", posts: 18, goal: 25, status: "on-track" },
]

const topCreatorsByPosts = [
  { name: "Ty Anderson", handle: "@tyanderson", posts: 76, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Jana Burkett", handle: "@janaburkett", posts: 74, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Chloe VanScoder", handle: "@chloevs", posts: 65, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Lamieria Burns", handle: "@lamieriaburns", posts: 58, avatar: "/placeholder.svg?height=32&width=32" },
]

const activeCampaigns = [
  {
    id: 1,
    name: "Neuro Gum Month 1",
    status: "Active",
    gmv: "$1,818.99",
    creators: 19,
    description: "Monthly campaign promoting Neuro Gum products with focus on cognitive benefits",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    totalPosts: 45,
    completedPosts: 38,
  },
  {
    id: 2,
    name: "DrBioCare",
    status: "Active",
    gmv: "$89.98",
    creators: 12,
    description: "Health and wellness campaign featuring DrBioCare supplements",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    totalPosts: 30,
    completedPosts: 12,
  },
  {
    id: 3,
    name: "FlexProMeals",
    status: "Active",
    gmv: "$0.00",
    creators: 4,
    description: "Meal prep and fitness nutrition campaign",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    totalPosts: 20,
    completedPosts: 5,
  },
  {
    id: 4,
    name: "Test Campaign",
    status: "Active",
    gmv: "$0.00",
    creators: 1,
    description: "Test campaign for new product launch",
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    totalPosts: 10,
    completedPosts: 2,
  },
  {
    id: 5,
    name: "Golf Partner Program",
    status: "Active",
    gmv: "$2,450.00",
    creators: 8,
    description: "Golf equipment and accessories promotion campaign",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    totalPosts: 25,
    completedPosts: 22,
  },
]

export default function AgencyDashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<(typeof activeCampaigns)[0] | null>(null)

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case "ahead":
        return "bg-green-500"
      case "on-track":
        return "bg-yellow-500"
      case "behind":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: CampaignStatus) => {
    switch (status) {
      case "ahead":
        return "AHEAD"
      case "on-track":
        return "ON-TRACK"
      case "behind":
        return "BEHIND"
      default:
        return "UNKNOWN"
    }
  }

  const getStatusTextColor = (status: CampaignStatus) => {
    switch (status) {
      case "ahead":
        return "text-green-400"
      case "on-track":
        return "text-yellow-400"
      case "behind":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />

      <div className="lg:ml-16 xl:ml-60 min-h-screen transition-all duration-300">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Agency Dashboard</h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        <AgencyHeader />
        <main className="p-4 sm:p-6">
          {/* Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Agency Dashboard</h1>
              <p className="text-gray-400">Welcome back, here's your agency's performance overview</p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-900 border-gray-800 hover:bg-gray-800">
                    Last 30 days <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuCheckboxItem>Last 7 days</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Last 30 days</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Last 90 days</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Custom range</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-900 border-gray-800 hover:bg-gray-800">
                    All Campaigns <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Campaign</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Golf Partner Program</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Fashion Nova Collab</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Global Healing Campaign</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Neuro Gum Month 1</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-purple-600 hover:bg-purple-700">Apply</Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4M</div>
                <p className="text-xs text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145K</div>
                <p className="text-xs text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Payouts</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,860</div>
                <p className="text-xs text-gray-400">pending this period</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">New Creators</CardTitle>
                <UserPlus className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+23</div>
                <p className="text-xs text-gray-400">joined this period</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Financial Overview */}
            <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Total GMV Generated</p>
                      <p className="text-4xl font-bold">$124,350</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Revenue Growth</p>
                      <p className="text-2xl font-bold text-green-400 flex items-center">
                        +25% <ArrowUpRight className="h-5 w-5 ml-1" />
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-2/3 h-48">
                    <RevenueGrowthChart />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Progress */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaignProgress.map((campaign) => (
                  <div key={campaign.name}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium truncate">{campaign.name}</p>
                      <p className={`text-xs font-bold uppercase ${getStatusTextColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </p>
                    </div>
                    <Progress
                      value={(campaign.posts / campaign.goal) * 100}
                      className="h-2 mb-1"
                      indicatorClassName={getStatusColor(campaign.status)}
                    />
                    <p className="text-xs text-gray-400">
                      {campaign.posts}/{campaign.goal} posts
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top Creators */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Creators by Posts</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Top Creators Leaderboard</DialogTitle>
                      <DialogDescription>Detailed performance metrics for top-performing creators</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Creator</TableHead>
                            <TableHead>Posts</TableHead>
                            <TableHead>GMV</TableHead>
                            <TableHead>Engagement</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topCreatorsByPosts.map((creator, index) => (
                            <TableRow key={creator.name}>
                              <TableCell>#{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={creator.avatar || "/placeholder.svg"}
                                    alt={creator.name}
                                    className="h-8 w-8 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium">{creator.name}</p>
                                    <p className="text-xs text-gray-400">{creator.handle}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{creator.posts}</TableCell>
                              <TableCell>${(Math.random() * 5000 + 1000).toFixed(0)}</TableCell>
                              <TableCell>{(Math.random() * 10 + 5).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCreatorsByPosts.map((creator, index) => (
                    <div key={creator.name} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-700 overflow-hidden">
                        <img
                          src={creator.avatar || "/placeholder.svg"}
                          alt={creator.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{creator.name}</p>
                        <p className="text-xs text-gray-400">{creator.handle}</p>
                      </div>
                      <div className="text-sm font-bold">{creator.posts}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts per Day */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Posts per Day</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Daily Posting Analytics</DialogTitle>
                      <DialogDescription>Detailed breakdown of daily posting activity and trends</DialogDescription>
                    </DialogHeader>
                    <div className="h-96">
                      <PostsPerDayChart />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PostsPerDayChart />
              </CardContent>
            </Card>

            {/* Engagement Trends */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Engagement</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Engagement Analytics</DialogTitle>
                      <DialogDescription>Comprehensive engagement metrics and trends analysis</DialogDescription>
                    </DialogHeader>
                    <div className="h-96">
                      <EngagementChart />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EngagementChart />
              </CardContent>
            </Card>
          </div>

          {/* Active Campaigns */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Campaigns</CardTitle>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Campaign
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>GMV</TableHead>
                    <TableHead className="text-right">Creators</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCampaigns.map((campaign) => (
                    <TableRow key={campaign.name} className="hover:bg-gray-800/50">
                      <TableCell className="font-medium">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="text-left hover:text-purple-400 transition-colors"
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              {campaign.name}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
                            <DialogHeader>
                              <DialogTitle>{selectedCampaign?.name}</DialogTitle>
                              <DialogDescription>{selectedCampaign?.description}</DialogDescription>
                            </DialogHeader>
                            {selectedCampaign && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-400">Start Date</p>
                                    <p className="font-medium">{selectedCampaign.startDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">End Date</p>
                                    <p className="font-medium">{selectedCampaign.endDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">Total GMV</p>
                                    <p className="font-medium text-green-400">{selectedCampaign.gmv}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">Creators</p>
                                    <p className="font-medium">{selectedCampaign.creators}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400 mb-2">Post Progress</p>
                                  <Progress
                                    value={(selectedCampaign.completedPosts / selectedCampaign.totalPosts) * 100}
                                    className="h-2"
                                  />
                                  <p className="text-xs text-gray-400 mt-1">
                                    {selectedCampaign.completedPosts}/{selectedCampaign.totalPosts} posts completed
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold">{campaign.gmv}</TableCell>
                      <TableCell className="text-right">{campaign.creators}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Copy Link</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
