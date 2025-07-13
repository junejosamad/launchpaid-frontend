"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Eye,
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  Edit,
  Trash2,
  Download,
  Settings,
  BarChart3,
  LineChart,
  Target,
  Award,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Copy,
  ExternalLink,
  Upload,
} from "lucide-react"

type CampaignStatus = "active" | "paused" | "completed" | "overdue"
type CampaignProgress = "ahead" | "on-track" | "behind"

export interface Campaign {
  id: string
  name: string
  brand: { name: string; logo: string }
  status: CampaignStatus
  progress: CampaignProgress
  gmv: number
  creators: { active: number; total: number }
  posts: { completed: number; target: number }
  startDate: string
  endDate: string
}

interface CampaignDetailsModalProps {
  campaign: Campaign
  isOpen: boolean
  onClose: () => void
  defaultTab?: string
}

// Mock data for comprehensive display
const mockCreators = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahj_fit",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "on-track",
    posts: { completed: 18, target: 20 },
    gmv: 1250.5,
    joinDate: "2024-01-15",
    lastPost: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikec_lifestyle",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "behind",
    posts: { completed: 12, target: 20 },
    gmv: 890.25,
    joinDate: "2024-01-18",
    lastPost: "5 days ago",
  },
  {
    id: 3,
    name: "Emma Davis",
    handle: "@emmad_beauty",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "ahead",
    posts: { completed: 22, target: 20 },
    gmv: 1680.75,
    joinDate: "2024-01-12",
    lastPost: "1 day ago",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    handle: "@alexr_tech",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "overdue",
    posts: { completed: 8, target: 20 },
    gmv: 420.0,
    joinDate: "2024-01-20",
    lastPost: "8 days ago",
  },
]

const mockMessages = [
  {
    id: 1,
    type: "announcement",
    title: "Campaign Launch",
    content: "Welcome to the FlexProMeals campaign! Please review the guidelines.",
    date: "2024-01-20",
    recipients: "All Creators",
  },
  {
    id: 2,
    type: "individual",
    title: "Content Approval",
    content: "Your latest post has been approved!",
    date: "2024-01-22",
    recipients: "Sarah Johnson",
  },
  {
    id: 3,
    type: "reminder",
    title: "Deadline Reminder",
    content: "Don't forget - 3 posts due this week!",
    date: "2024-01-23",
    recipients: "Behind Schedule",
  },
]

const mockPayouts = [
  { creator: "Sarah Johnson", baseRate: 50, bonuses: 25, commissions: 62.25, total: 137.25, status: "pending" },
  { creator: "Emma Davis", baseRate: 50, bonuses: 40, commissions: 84.04, total: 174.04, status: "processed" },
  { creator: "Mike Chen", baseRate: 30, bonuses: 0, commissions: 44.51, total: 74.51, status: "pending" },
  { creator: "Alex Rodriguez", baseRate: 20, bonuses: 0, commissions: 21.0, total: 41.0, status: "upcoming" },
]

export function CampaignDetailsModal({
  campaign,
  isOpen,
  onClose,
  defaultTab = "overview",
}: CampaignDetailsModalProps) {
  const [selectedCreators, setSelectedCreators] = useState<number[]>([])
  const [creatorFilter, setCreatorFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (isOpen) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesFilter = creatorFilter === "all" || creator.status === creatorFilter
    const matchesSearch =
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-yellow-400 border-yellow-400"
      case "ahead":
        return "text-green-400 border-green-400"
      case "behind":
        return "text-orange-400 border-orange-400"
      case "overdue":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ahead":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "on-track":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "behind":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-7xl bg-gray-900 border-gray-800 text-white overflow-y-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <img
              src={campaign.brand.logo || "/placeholder.svg?height=40&width=40"}
              alt={campaign.brand.name}
              className="h-10 w-10 rounded"
            />
            {campaign.name}
            <Badge
              variant="outline"
              className={`ml-2 uppercase text-sm ${
                campaign.status === "active"
                  ? "text-green-400 border-green-400"
                  : campaign.status === "paused"
                    ? "text-yellow-400 border-yellow-400"
                    : campaign.status === "completed"
                      ? "text-blue-400 border-blue-400"
                      : "text-red-400 border-red-400"
              }`}
            >
              {campaign.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Campaign ID: {campaign.id} • {campaign.brand.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="mt-6">
          <TabsList className="grid grid-cols-7 bg-gray-800 w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="creators" className="data-[state=active]:bg-purple-600">
              Creators
            </TabsTrigger>
            <TabsTrigger value="deliverables" className="data-[state=active]:bg-purple-600">
              Deliverables
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-purple-600">
              Financial
            </TabsTrigger>
            <TabsTrigger value="communications" className="data-[state=active]:bg-purple-600">
              Comms
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 pt-6">
            {/* Enhanced KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total GMV</p>
                      <p className="text-2xl font-bold">${campaign.gmv.toLocaleString()}</p>
                      <p className="text-sm text-green-400">+12% vs target</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active Creators</p>
                      <p className="text-2xl font-bold">
                        {campaign.creators.active}/{campaign.creators.total}
                      </p>
                      <p className="text-sm text-blue-400">spots filled</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Posts Completed</p>
                      <p className="text-2xl font-bold">
                        {campaign.posts.completed}/{campaign.posts.target}
                      </p>
                      <p className="text-sm text-green-400">102% - ahead of schedule</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Completion Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-sm text-yellow-400">on-time delivery</p>
                    </div>
                    <Target className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Tracking */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Campaign Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="text-green-400">🟢 Ahead of Schedule</span>
                  </div>
                  <Progress
                    value={(campaign.posts.completed / campaign.posts.target) * 100}
                    className="h-4"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{campaign.posts.completed} posts completed</span>
                    <span>{campaign.posts.target} posts target</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-sm text-gray-400">Start Date</p>
                    <p className="font-semibold">{campaign.startDate}</p>
                  </div>
                  <div className="text-center">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
                    <p className="text-sm text-gray-400">Pace Indicator</p>
                    <p className="font-semibold text-green-400">On track to exceed goal by 15%</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-red-400" />
                    <p className="text-sm text-gray-400">End Date</p>
                    <p className="font-semibold">{campaign.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Settings Summary */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Campaign Settings Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Payout Structure</p>
                      <p className="font-semibold">Hybrid Model - $50 base + 5% commission</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold">30 days • 3-day grace period</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Tracking Method</p>
                      <p className="font-semibold">#FlexProMeals #FitnessGoals</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Creator Limits</p>
                      <p className="font-semibold">10 total • No segments • Max 2 active campaigns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CREATORS TAB */}
          <TabsContent value="creators" className="space-y-6 pt-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-4 items-center">
                <Select value={creatorFilter} onValueChange={setCreatorFilter}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="on-track">On Track</SelectItem>
                    <SelectItem value="ahead">Ahead</SelectItem>
                    <SelectItem value="behind">Behind</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Search creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Bulk Message
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Reminders
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Creator Table */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-700">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium text-gray-400">
                          <Checkbox />
                        </th>
                        <th className="p-4 text-sm font-medium text-gray-400">Creator</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Progress</th>
                        <th className="p-4 text-sm font-medium text-gray-400">GMV</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Join Date</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Last Post</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCreators.map((creator) => (
                        <tr key={creator.id} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-4">
                            <Checkbox />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {creator.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white cursor-pointer hover:text-purple-400">
                                  {creator.name}
                                </p>
                                <p className="text-sm text-gray-400">{creator.handle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(creator.status)}
                              <Badge variant="outline" className={`text-xs ${getStatusColor(creator.status)}`}>
                                {creator.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>
                                  {creator.posts.completed}/{creator.posts.target}
                                </span>
                                <span>{Math.round((creator.posts.completed / creator.posts.target) * 100)}%</span>
                              </div>
                              <Progress
                                value={(creator.posts.completed / creator.posts.target) * 100}
                                className="h-2"
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">${creator.gmv.toFixed(2)}</p>
                              <p className="text-xs text-gray-400">
                                {((creator.gmv / campaign.gmv) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-400">{creator.joinDate}</td>
                          <td className="p-4 text-sm text-gray-400">{creator.lastPost}</td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DELIVERABLES TAB */}
          <TabsContent value="deliverables" className="space-y-6 pt-6">
            {/* Deliverables Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="h-8 w-8 mx-auto mb-2 bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-400">Pending Review</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="h-8 w-8 mx-auto mb-2 bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-400">Approved</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="h-8 w-8 mx-auto mb-2 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-400">Rejected</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="h-8 w-8 mx-auto mb-2 bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-400">Overdue</p>
                </CardContent>
              </Card>
            </div>

            {/* Deliverables Management */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Deliverables Management
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 bg-gray-750 border-gray-600">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Search deliverables..."
                      className="w-64 bg-gray-750 border-gray-600"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-700">
                      <tr className="text-left">
                        <th className="p-3 text-sm font-medium text-gray-400">Creator</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Deliverable</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Status</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Due Date</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Performance</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sample deliverables data - will be replaced with real data */}
                      <tr className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Sarah Johnson</p>
                              <p className="text-sm text-gray-400">@sarahj_fit</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">Unboxing Video</p>
                            <p className="text-sm text-gray-400">Deliverable #1</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            Pending Review
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-400">2024-01-25</td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p>Views: 2.4K</p>
                            <p>Likes: 156</p>
                            <p>GMV: $125.50</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-400">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400">
                              <XCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Mike Chen</p>
                              <p className="text-sm text-gray-400">@mikec_lifestyle</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">Product Review</p>
                            <p className="text-sm text-gray-400">Deliverable #2</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Approved
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-400">2024-01-23</td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p>Views: 1.8K</p>
                            <p>Likes: 98</p>
                            <p>GMV: $89.25</p>
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
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>ED</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Emma Davis</p>
                              <p className="text-sm text-gray-400">@emmad_beauty</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">Styling Tutorial</p>
                            <p className="text-sm text-gray-400">Deliverable #3</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-orange-400 border-orange-400">
                            Overdue
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-red-400">2024-01-20</td>
                        <td className="p-3">
                          <div className="text-sm text-gray-400">
                            <p>Not submitted</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-gray-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Selected
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Reminders
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GMV Chart */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    GMV by Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>GMV trend chart would display here</p>
                      <p className="text-sm">Daily revenue: $0 - $500 range</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts per Day */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Posts per Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Daily posting frequency chart</p>
                      <p className="text-sm">Average: 2.3 posts/day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Leaderboard */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Creator Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCreators
                      .sort((a, b) => b.gmv - a.gmv)
                      .map((creator, index) => (
                        <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-xs font-bold">
                              {index + 1}
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {creator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{creator.name}</p>
                              <p className="text-sm text-gray-400">{creator.handle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${creator.gmv.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">{creator.posts.completed} posts</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Engagement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Views</span>
                      <span className="font-bold">2.4M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Likes</span>
                      <span className="font-bold">145K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Comments</span>
                      <span className="font-bold">12.3K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Avg. Engagement Rate</span>
                      <span className="font-bold text-green-400">6.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FINANCIAL TAB */}
          <TabsContent value="financial" className="space-y-6 pt-6">
            {/* Payout Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold">$426.80</p>
                  <p className="text-sm text-gray-400">Total Payouts</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold">$211.76</p>
                  <p className="text-sm text-gray-400">Pending</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold">$174.04</p>
                  <p className="text-sm text-gray-400">Processed</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl font-bold">$41.00</p>
                  <p className="text-sm text-gray-400">Upcoming</p>
                </CardContent>
              </Card>
            </div>

            {/* Creator Earnings Breakdown */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Creator Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-700">
                      <tr className="text-left">
                        <th className="p-3 text-sm font-medium text-gray-400">Creator</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Base Rate</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Bonuses</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Commissions</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Total</th>
                        <th className="p-3 text-sm font-medium text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayouts.map((payout, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="p-3 font-medium">{payout.creator}</td>
                          <td className="p-3">${payout.baseRate.toFixed(2)}</td>
                          <td className="p-3">${payout.bonuses.toFixed(2)}</td>
                          <td className="p-3">${payout.commissions.toFixed(2)}</td>
                          <td className="p-3 font-bold">${payout.total.toFixed(2)}</td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={
                                payout.status === "processed"
                                  ? "text-green-400 border-green-400"
                                  : payout.status === "pending"
                                    ? "text-yellow-400 border-yellow-400"
                                    : "text-blue-400 border-blue-400"
                              }
                            >
                              {payout.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Financial Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>ROI Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Revenue</span>
                    <span className="font-bold">${campaign.gmv.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Payouts</span>
                    <span className="font-bold">$426.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Campaign Profit</span>
                    <span className="font-bold text-green-400">-$426.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="font-bold text-red-400">-100%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Budget Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Allocated Budget</span>
                    <span className="font-bold">$2,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Spent</span>
                    <span className="font-bold">$426.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining</span>
                    <span className="font-bold text-green-400">$1,573.20</span>
                  </div>
                  <Progress value={21.34} className="h-3" />
                  <p className="text-sm text-gray-400">21.34% of budget used</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* COMMUNICATIONS TAB */}
          <TabsContent value="communications" className="space-y-6 pt-6">
            {/* Message Center */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Message Center
                  </CardTitle>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="p-4 bg-gray-750 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{message.title}</h4>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">{message.date}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {message.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{message.content}</p>
                      <p className="text-xs text-gray-400">To: {message.recipients}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Review */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Content Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-700">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-400">Pending Approval</p>
                  </div>
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-700">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-400">Approved</p>
                  </div>
                  <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-700">
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-gray-400">Rejected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SMS History */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  SMS History (SendBlue)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                    <div>
                      <p className="font-medium">Deadline Reminder</p>
                      <p className="text-sm text-gray-400">Sent to 2 creators behind schedule</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">2024-01-23</p>
                      <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                        Delivered
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                    <div>
                      <p className="font-medium">Welcome Message</p>
                      <p className="text-sm text-gray-400">Sent to all new creators</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">2024-01-20</p>
                      <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                        Delivered
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-6 pt-6">
            {/* Campaign Configuration */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Campaign Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Campaign Name</label>
                    <Input defaultValue={campaign.name} className="mt-1 bg-gray-750 border-gray-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Status</label>
                    <Select defaultValue={campaign.status}>
                      <SelectTrigger className="mt-1 bg-gray-750 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Discord Integration</p>
                      <p className="text-sm text-gray-400">Auto-assign roles and create channels</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SMS (SendBlue)</p>
                      <p className="text-sm text-gray-400">Automated reminders and notifications</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">TikTok Shop</p>
                      <p className="text-sm text-gray-400">Product link tracking and analytics</p>
                    </div>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      Pending
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-red-400">Advanced Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Campaign Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Audit Log
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-yellow-600 text-yellow-400">
                    <Pause className="h-4 w-4 mr-2" />
                    Archive Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-600 text-red-400">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
