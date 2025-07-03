"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Grid3X3,
  List,
  Play,
  Eye,
  MessageSquare,
  ExternalLink,
  Check,
  X,
  Clock,
  Send,
  Save,
  Flag,
  Download,
  Settings,
  ChevronDown,
  TrendingUp,
  Users,
  FileText,
  Mic,
  Video,
  AlertCircle,
  CheckCircle,
  XCircle,
  PauseCircle,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for content submissions
const mockContent = [
  {
    id: 1,
    thumbnail: "/placeholder.svg?height=200&width=200",
    title: "Golf swing tips for beginners",
    creator: {
      name: "Sarah Johnson",
      handle: "@sarahgolf",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Golf Partner Program",
    uploadDate: "2024-01-15T10:30:00Z",
    performance: {
      views: "125.4K",
      likes: "8.2K",
      comments: "847",
      gmv: "$2,345",
    },
    status: "pending",
    lastAction: "Submitted for review",
    brandCompliance: {
      guidelines: true,
      hashtags: true,
      mentions: true,
      quality: false,
      community: true,
    },
  },
  {
    id: 2,
    thumbnail: "/placeholder.svg?height=200&width=200",
    title: "Fashion Nova winter collection haul",
    creator: {
      name: "Emma Davis",
      handle: "@emmastyle",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Fashion Nova Collab",
    uploadDate: "2024-01-15T09:15:00Z",
    performance: {
      views: "89.2K",
      likes: "5.7K",
      comments: "423",
      gmv: "$1,890",
    },
    status: "approved",
    lastAction: "Approved by team",
    brandCompliance: {
      guidelines: true,
      hashtags: true,
      mentions: true,
      quality: true,
      community: true,
    },
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?height=200&width=200",
    title: "Latest tech gadget unboxing",
    creator: {
      name: "Mike Chen",
      handle: "@techreview",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Tech Gadget Pro",
    uploadDate: "2024-01-15T08:45:00Z",
    performance: {
      views: "67.8K",
      likes: "4.1K",
      comments: "289",
      gmv: "$987",
    },
    status: "rejected",
    lastAction: "Rejected - brand compliance",
    brandCompliance: {
      guidelines: false,
      hashtags: true,
      mentions: false,
      quality: true,
      community: true,
    },
  },
]

const mockConversations = [
  {
    id: 1,
    creator: {
      name: "Sarah Johnson",
      handle: "@sarahgolf",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    contentThumbnail: "/placeholder.svg?height=60&width=60",
    lastMessage: "Thanks for the feedback! I'll make those changes.",
    timestamp: "2024-01-15T14:30:00Z",
    unread: false,
    campaign: "Golf Partner Program",
  },
  {
    id: 2,
    creator: {
      name: "Emma Davis",
      handle: "@emmastyle",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    contentThumbnail: "/placeholder.svg?height=60&width=60",
    lastMessage: "Could you clarify the brand guideline issue?",
    timestamp: "2024-01-15T13:15:00Z",
    unread: true,
    campaign: "Fashion Nova Collab",
  },
]

export default function ContentReviewPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedContent, setSelectedContent] = useState<number[]>([])
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedContentForReview, setSelectedContentForReview] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("review")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "revision":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "revision":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <PauseCircle className="h-4 w-4" />
    }
  }

  const handleContentSelect = (contentId: number) => {
    setSelectedContent((prev) =>
      prev.includes(contentId) ? prev.filter((id) => id !== contentId) : [...prev, contentId],
    )
  }

  const openReviewModal = (content: any) => {
    setSelectedContentForReview(content)
    setReviewModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:ml-60">
        <AgencyHeader onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <span>Marketing</span>
              <ChevronDown className="h-4 w-4 mx-2 rotate-[-90deg]" />
              <span className="text-purple-400">Content Review</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Content Review & Feedback</h1>
                <p className="text-gray-400">Review, approve, and provide feedback on creator content submissions</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Review Inbox
                  <Badge className="ml-2 bg-purple-600 text-white">3</Badge>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Review Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Reviews</p>
                    <p className="text-2xl font-bold text-white">23</p>
                    <p className="text-xs text-orange-400 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />5 urgent
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Approved Today</p>
                    <p className="text-2xl font-bold text-white">45</p>
                    <p className="text-xs text-green-400 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      87% rate
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Response Rate</p>
                    <p className="text-2xl font-bold text-white">76%</p>
                    <p className="text-xs text-purple-400 flex items-center mt-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Creator feedback
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Review Time</p>
                    <p className="text-2xl font-bold text-white">4.2</p>
                    <p className="text-xs text-blue-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      minutes
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger value="review" className="data-[state=active]:bg-purple-600">
                Content Review
              </TabsTrigger>
              <TabsTrigger value="inbox" className="data-[state=active]:bg-purple-600">
                Review Inbox
              </TabsTrigger>
              <TabsTrigger value="workflows" className="data-[state=active]:bg-purple-600">
                Approval Workflows
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                Performance Analytics
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="data-[state=active]:bg-purple-600">
                Guidelines & Templates
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: Content Review */}
            <TabsContent value="review" className="space-y-6">
              {/* Filters */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="All Campaigns" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Campaigns</SelectItem>
                          <SelectItem value="golf">Golf Partner Program</SelectItem>
                          <SelectItem value="fashion">Fashion Nova Collab</SelectItem>
                          <SelectItem value="tech">Tech Gadget Pro</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Review Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Posts</SelectItem>
                          <SelectItem value="pending">Pending Review</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="revision">Needs Revision</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Content Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Content</SelectItem>
                          <SelectItem value="tiktok">TikTok Videos</SelectItem>
                          <SelectItem value="images">Images</SelectItem>
                          <SelectItem value="stories">Stories</SelectItem>
                          <SelectItem value="reels">Reels</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search creators..." className="pl-10 bg-gray-800 border-gray-700" />
                      </div>

                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700"}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700"}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {selectedContent.length > 0 && (
                    <div className="mt-4 p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">
                          {selectedContent.length} post{selectedContent.length !== 1 ? "s" : ""} selected
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 mr-2" />
                            Bulk Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4 mr-2" />
                            Bulk Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Content Display */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockContent.map((content) => (
                    <Card key={content.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                      <div className="relative">
                        <img
                          src={content.thumbnail || "/placeholder.svg"}
                          alt={content.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Checkbox
                            checked={selectedContent.includes(content.id)}
                            onCheckedChange={() => handleContentSelect(content.id)}
                            className="bg-black/50 border-white/50"
                          />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className={cn("border", getStatusColor(content.status))}>
                            {getStatusIcon(content.status)}
                            <span className="ml-1 capitalize">{content.status}</span>
                          </Badge>
                        </div>
                        <Button size="sm" className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={content.creator.avatar || "/placeholder.svg"}
                            alt={content.creator.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{content.creator.name}</p>
                            <p className="text-sm text-gray-400 truncate">{content.creator.handle}</p>
                          </div>
                        </div>

                        <Badge className="mb-3 bg-purple-600/20 text-purple-400 border-purple-600/30">
                          {content.campaign}
                        </Badge>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                          <div>Views: {content.performance.views}</div>
                          <div>Likes: {content.performance.likes}</div>
                          <div>Comments: {content.performance.comments}</div>
                          <div className="text-green-400">GMV: {content.performance.gmv}</div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled={content.status === "approved"}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" disabled={content.status === "rejected"}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => openReviewModal(content)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-gray-800">
                          <tr className="text-left">
                            <th className="p-4 text-gray-400 font-medium">
                              <Checkbox />
                            </th>
                            <th className="p-4 text-gray-400 font-medium">Content</th>
                            <th className="p-4 text-gray-400 font-medium">Creator</th>
                            <th className="p-4 text-gray-400 font-medium">Campaign</th>
                            <th className="p-4 text-gray-400 font-medium">Upload Date</th>
                            <th className="p-4 text-gray-400 font-medium">Performance</th>
                            <th className="p-4 text-gray-400 font-medium">Status</th>
                            <th className="p-4 text-gray-400 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockContent.map((content) => (
                            <tr key={content.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                              <td className="p-4">
                                <Checkbox
                                  checked={selectedContent.includes(content.id)}
                                  onCheckedChange={() => handleContentSelect(content.id)}
                                />
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={content.thumbnail || "/placeholder.svg"}
                                    alt={content.title}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                  <div>
                                    <p className="font-medium text-white">{content.title}</p>
                                    <p className="text-sm text-gray-400">TikTok Video</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={content.creator.avatar || "/placeholder.svg"}
                                    alt={content.creator.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium text-white">{content.creator.name}</p>
                                    <p className="text-sm text-gray-400">{content.creator.handle}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                                  {content.campaign}
                                </Badge>
                              </td>
                              <td className="p-4 text-gray-400">{new Date(content.uploadDate).toLocaleDateString()}</td>
                              <td className="p-4">
                                <div className="text-sm">
                                  <div className="text-white">{content.performance.views} views</div>
                                  <div className="text-gray-400">
                                    {content.performance.likes} likes • {content.performance.comments} comments
                                  </div>
                                  <div className="text-green-400">{content.performance.gmv} GMV</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className={cn("border", getStatusColor(content.status))}>
                                  {getStatusIcon(content.status)}
                                  <span className="ml-1 capitalize">{content.status}</span>
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                    onClick={() => openReviewModal(content)}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <ExternalLink className="h-4 w-4" />
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
              )}
            </TabsContent>

            {/* TAB 2: Review Inbox */}
            <TabsContent value="inbox" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Review Conversations</CardTitle>
                  <p className="text-gray-400 text-sm">
                    Note: Inboxes are separate per account. Only the team member who sends feedback can see that
                    conversation thread.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[600px]">
                    {/* Conversation List */}
                    <div className="w-80 border-r border-gray-800">
                      <div className="p-4 border-b border-gray-800">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search feedback conversations..."
                            className="pl-10 bg-gray-800 border-gray-700"
                          />
                        </div>
                      </div>
                      <ScrollArea className="h-full">
                        <div className="p-2">
                          {mockConversations.map((conversation) => (
                            <div key={conversation.id} className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer mb-2">
                              <div className="flex items-center gap-3 mb-2">
                                <img
                                  src={conversation.creator.avatar || "/placeholder.svg"}
                                  alt={conversation.creator.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <img
                                  src={conversation.contentThumbnail || "/placeholder.svg"}
                                  alt="Content"
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-white truncate">{conversation.creator.name}</p>
                                  <p className="text-xs text-gray-400">{conversation.campaign}</p>
                                </div>
                                {conversation.unread && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                              </div>
                              <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(conversation.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Message Thread */}
                    <div className="flex-1 flex flex-col">
                      <div className="p-4 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="Creator"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-white">Sarah Johnson</p>
                            <p className="text-sm text-gray-400">Golf Partner Program • Approved</p>
                          </div>
                        </div>
                      </div>

                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          <div className="flex justify-end">
                            <div className="bg-purple-600 text-white p-3 rounded-lg max-w-xs">
                              <p className="text-sm">
                                Great content! The golf tips are clear and engaging. Just need to add the required
                                hashtags #GolfPartner #LaunchPaid
                              </p>
                              <p className="text-xs opacity-75 mt-1">2:30 PM</p>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gray-800 text-white p-3 rounded-lg max-w-xs">
                              <p className="text-sm">Thanks for the feedback! I'll make those changes.</p>
                              <p className="text-xs opacity-75 mt-1">2:45 PM</p>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>

                      <div className="p-4 border-t border-gray-800">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your feedback..."
                            className="flex-1 bg-gray-800 border-gray-700 resize-none"
                            rows={2}
                          />
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-700">
                              <Mic className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: Approval Workflows */}
            <TabsContent value="workflows" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Campaign Approval Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">Golf Partner Program</p>
                          <p className="text-sm text-gray-400">Require post approval</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">Fashion Nova Collab</p>
                          <p className="text-sm text-gray-400">Require post approval</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">Tech Gadget Pro</p>
                          <p className="text-sm text-gray-400">Require post approval</p>
                        </div>
                        <Checkbox />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Review Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src="/placeholder.svg?height=32&width=32"
                            alt="Team member"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-white">Alex Johnson</p>
                            <p className="text-sm text-gray-400">3.2 min avg • 94% approval</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src="/placeholder.svg?height=32&width=32"
                            alt="Team member"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-white">Sarah Davis</p>
                            <p className="text-sm text-gray-400">4.8 min avg • 89% approval</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Automatic Approval Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Creator Performance Tier</h4>
                      <p className="text-sm text-gray-400 mb-3">Auto-approve content from top-tier creators</p>
                      <Checkbox /> <span className="text-sm text-gray-300 ml-2">Enable auto-approval</span>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Content Compliance Score</h4>
                      <p className="text-sm text-gray-400 mb-3">Auto-approve content with high compliance scores</p>
                      <Checkbox /> <span className="text-sm text-gray-300 ml-2">Enable auto-approval</span>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Previous Approval History</h4>
                      <p className="text-sm text-gray-400 mb-3">Auto-approve from creators with good history</p>
                      <Checkbox /> <span className="text-sm text-gray-300 ml-2">Enable auto-approval</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: Performance Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Review Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-white">156</p>
                        <p className="text-sm text-gray-400">Total Reviewed</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-green-400">87%</p>
                        <p className="text-sm text-gray-400">Approval Rate</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">4.2</p>
                        <p className="text-sm text-gray-400">Avg Review Time</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-purple-400">76%</p>
                        <p className="text-sm text-gray-400">Response Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Content Quality Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Brand Guidelines</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="text-green-400 text-sm">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Required Hashtags</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                          </div>
                          <span className="text-yellow-400 text-sm">78%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Content Quality</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <span className="text-blue-400 text-sm">85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Campaign-Specific Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-800">
                        <tr className="text-left">
                          <th className="p-3 text-gray-400 font-medium">Campaign</th>
                          <th className="p-3 text-gray-400 font-medium">Total Posts</th>
                          <th className="p-3 text-gray-400 font-medium">Approval Rate</th>
                          <th className="p-3 text-gray-400 font-medium">Avg GMV</th>
                          <th className="p-3 text-gray-400 font-medium">Quality Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="p-3 text-white">Golf Partner Program</td>
                          <td className="p-3 text-gray-400">45</td>
                          <td className="p-3 text-green-400">94%</td>
                          <td className="p-3 text-green-400">$2,340</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                              </div>
                              <span className="text-green-400 text-sm">9.4</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-3 text-white">Fashion Nova Collab</td>
                          <td className="p-3 text-gray-400">32</td>
                          <td className="p-3 text-yellow-400">81%</td>
                          <td className="p-3 text-green-400">$1,890</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "81%" }}></div>
                              </div>
                              <span className="text-yellow-400 text-sm">8.1</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-3 text-white">Tech Gadget Pro</td>
                          <td className="p-3 text-gray-400">28</td>
                          <td className="p-3 text-blue-400">89%</td>
                          <td className="p-3 text-green-400">$987</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                              </div>
                              <span className="text-blue-400 text-sm">8.9</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: Guidelines & Templates */}
            <TabsContent value="guidelines" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Brand Guidelines Repository</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="font-medium text-white">Golf Partner Brand Guidelines</p>
                            <p className="text-sm text-gray-400">Updated 2 days ago</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-purple-400" />
                          <div>
                            <p className="font-medium text-white">Fashion Nova Style Guide</p>
                            <p className="text-sm text-gray-400">Updated 1 week ago</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="font-medium text-white">Tech Review Standards</p>
                            <p className="text-sm text-gray-400">Updated 3 days ago</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Upload New Guidelines</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Feedback Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="font-medium text-white mb-1">Positive Reinforcement</p>
                        <p className="text-sm text-gray-400">
                          "Great work! Your content perfectly aligns with our brand guidelines and shows excellent
                          engagement."
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="font-medium text-white mb-1">Brand Compliance Issue</p>
                        <p className="text-sm text-gray-400">
                          "Please review our brand guidelines and ensure all required hashtags are included in your
                          post."
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="font-medium text-white mb-1">Content Quality Improvement</p>
                        <p className="text-sm text-gray-400">
                          "The content concept is great! Consider improving the lighting and audio quality for better
                          engagement."
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Create New Template</Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Review Training Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <Video className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <p className="font-medium text-white mb-1">Review Process Training</p>
                      <p className="text-sm text-gray-400">15 min video</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="font-medium text-white mb-1">Brand Guidelines Overview</p>
                      <p className="text-sm text-gray-400">Documentation</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <MessageSquare className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <p className="font-medium text-white mb-1">Feedback Best Practices</p>
                      <p className="text-sm text-gray-400">Guide</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                      <p className="font-medium text-white mb-1">Creator Communication</p>
                      <p className="text-sm text-gray-400">Best practices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Content Review Modal */}
          <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Content Review & Feedback</DialogTitle>
              </DialogHeader>

              {selectedContentForReview && (
                <div className="flex gap-6 h-[70vh]">
                  {/* Content Preview Section */}
                  <div className="flex-1 space-y-4">
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <img
                        src={selectedContentForReview.thumbnail || "/placeholder.svg"}
                        alt={selectedContentForReview.title}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-white">{selectedContentForReview.title}</h3>
                      <p className="text-sm text-gray-400">Original caption and hashtags would appear here...</p>
                      <Button variant="outline" size="sm" className="border-gray-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original Post
                      </Button>
                    </div>
                  </div>

                  {/* Review Panel */}
                  <div className="w-96 space-y-6">
                    {/* Creator Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Creator Information</h4>
                      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <img
                          src={selectedContentForReview.creator.avatar || "/placeholder.svg"}
                          alt={selectedContentForReview.creator.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-white">{selectedContentForReview.creator.name}</p>
                          <p className="text-sm text-gray-400">{selectedContentForReview.creator.handle}</p>
                          <p className="text-xs text-purple-400">{selectedContentForReview.campaign}</p>
                        </div>
                      </div>
                    </div>

                    {/* Brand Compliance Checklist */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Brand Compliance Checklist</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Brand guidelines adherence</span>
                          <Checkbox checked={selectedContentForReview.brandCompliance.guidelines} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Required hashtags included</span>
                          <Checkbox checked={selectedContentForReview.brandCompliance.hashtags} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Product mentions</span>
                          <Checkbox checked={selectedContentForReview.brandCompliance.mentions} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Content quality</span>
                          <Checkbox checked={selectedContentForReview.brandCompliance.quality} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Community guidelines</span>
                          <Checkbox checked={selectedContentForReview.brandCompliance.community} />
                        </div>
                      </div>
                    </div>

                    {/* Review Actions */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Review Decision</h4>
                      <RadioGroup defaultValue="approve">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="approve" id="approve" />
                          <Label htmlFor="approve" className="text-green-400">
                            ✅ Approve
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reject" id="reject" />
                          <Label htmlFor="reject" className="text-red-400">
                            ❌ Reject
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="revision" id="revision" />
                          <Label htmlFor="revision" className="text-orange-400">
                            🔄 Request Revision
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hold" id="hold" />
                          <Label htmlFor="hold" className="text-gray-400">
                            ⏸️ Hold for Review
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Feedback Section */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Feedback</h4>
                      <Textarea
                        placeholder="Provide detailed feedback..."
                        className="bg-gray-800 border-gray-700 resize-none"
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Mic className="h-4 w-4 mr-2" />
                          Voice Note
                        </Button>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Quick templates" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="great">Great work!</SelectItem>
                            <SelectItem value="improvement">Needs improvement</SelectItem>
                            <SelectItem value="compliance">Brand compliance issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Review
                      </Button>
                      <Button variant="outline" className="border-gray-700">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-gray-700">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
