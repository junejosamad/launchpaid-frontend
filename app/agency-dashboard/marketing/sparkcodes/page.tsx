"use client"

import { useState } from "react"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Zap,
  TrendingUp,
  Clock,
  Target,
  Download,
  Settings,
  Search,
  Copy,
  ExternalLink,
  Send,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Heart,
  Play,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  FileText,
  ArrowUpRight,
  Sparkles,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for spark codes
const sparkCodeData = [
  {
    id: 1,
    creator: {
      name: "Emma Rodriguez",
      handle: "@emmarod",
      avatar: "/placeholder.svg?height=40&width=40",
      responseRate: 92,
    },
    campaign: {
      name: "Summer Fashion 2024",
      brand: "StyleCo",
      color: "bg-blue-500",
    },
    content: {
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "video",
      views: 125400,
      likes: 8200,
      comments: 847,
      gmv: 2345,
    },
    sparkCode: "SC_ABC123XYZ",
    status: "collected",
    postDate: "2024-01-15",
    collectionDate: "2024-01-17",
    adStatus: "ready",
  },
  {
    id: 2,
    creator: {
      name: "Jake Thompson",
      handle: "@jakethompson",
      avatar: "/placeholder.svg?height=40&width=40",
      responseRate: 78,
    },
    campaign: {
      name: "Tech Gadgets Q1",
      brand: "TechFlow",
      color: "bg-green-500",
    },
    content: {
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "video",
      views: 89300,
      likes: 5600,
      comments: 423,
      gmv: 1890,
    },
    sparkCode: "SC_DEF456ABC",
    status: "collected",
    postDate: "2024-01-12",
    collectionDate: "2024-01-14",
    adStatus: "used",
  },
  {
    id: 3,
    creator: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/placeholder.svg?height=40&width=40",
      responseRate: 85,
    },
    campaign: {
      name: "Beauty Essentials",
      brand: "GlowUp",
      color: "bg-pink-500",
    },
    content: {
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "video",
      views: 67800,
      likes: 4300,
      comments: 289,
      gmv: 1567,
    },
    sparkCode: null,
    status: "pending",
    postDate: "2024-01-18",
    requestDate: "2024-01-19",
    daysOverdue: 2,
    lastReminder: "2024-01-20",
  },
]

const campaignData = [
  {
    id: 1,
    name: "Summer Fashion 2024",
    brand: "StyleCo",
    totalPosts: 45,
    codesCollected: 32,
    codesPending: 8,
    totalGMV: 45600,
    adSpendValue: 12300,
    completionRate: 71,
  },
  {
    id: 2,
    name: "Tech Gadgets Q1",
    brand: "TechFlow",
    totalPosts: 28,
    codesCollected: 24,
    codesPending: 3,
    totalGMV: 38900,
    adSpendValue: 9800,
    completionRate: 86,
  },
]

export default function SparkCodesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeView, setActiveView] = useState("collected")
  const [selectedCampaign, setSelectedCampaign] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCreators, setSelectedCreators] = useState<number[]>([])
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isBulkRequestModalOpen, setIsBulkRequestModalOpen] = useState(false)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCreators(sparkCodeData.map((item) => item.id))
    } else {
      setSelectedCreators([])
    }
  }

  const handleSelectCreator = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCreators([...selectedCreators, id])
    } else {
      setSelectedCreators(selectedCreators.filter((creatorId) => creatorId !== id))
    }
  }

  const filteredData = sparkCodeData.filter((item) => {
    if (activeView === "collected" && item.status !== "collected") return false
    if (activeView === "pending" && item.status !== "pending") return false
    if (selectedCampaign !== "all" && item.campaign.name !== selectedCampaign) return false
    if (selectedStatus !== "all" && item.status !== selectedStatus) return false
    return true
  })

  return (
    <div className="min-h-screen bg-black">
      <AgencySidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:pl-60">
        <AgencyHeader onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>Marketing</span>
              <span>/</span>
              <span className="text-purple-400">Spark Codes</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Spark Codes Management</h1>
                <p className="text-gray-400">Collect and manage creator spark codes for paid advertising campaigns</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Auto-Request Settings
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export Spark Codes
                </Button>
                <Dialog open={isBulkRequestModalOpen} onOpenChange={setIsBulkRequestModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10">
                      <Users className="h-4 w-4 mr-2" />
                      Bulk Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Bulk Spark Code Request</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Send spark code requests to multiple creators at once
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-white mb-2 block">Audience Selection</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select creator group" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all">All creators in campaign</SelectItem>
                            <SelectItem value="top">Top performing creators</SelectItem>
                            <SelectItem value="custom">Custom creator list</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Content Criteria</Label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="recent" />
                            <Label htmlFor="recent" className="text-gray-300">
                              Posts from last 30 days
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="performance" />
                            <Label htmlFor="performance" className="text-gray-300">
                              Posts above 50K views
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="gmv" />
                            <Label htmlFor="gmv" className="text-gray-300">
                              Posts with GMV above $1000
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Request Message</Label>
                        <Textarea
                          placeholder="Hi [Creator Name], we'd love to use your amazing content for our paid campaigns..."
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={4}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Enable auto-reminders</Label>
                        <Switch />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsBulkRequestModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Send Bulk Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Request Spark Codes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Request Spark Code</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Request a spark code from a creator for their content
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-white mb-2 block">Creator</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Search and select creator" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="emma">Emma Rodriguez (@emmarod)</SelectItem>
                            <SelectItem value="jake">Jake Thompson (@jakethompson)</SelectItem>
                            <SelectItem value="sarah">Sarah Chen (@sarahchen)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Content Selection</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Choose specific post" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="post1">Summer outfit haul - 125K views</SelectItem>
                            <SelectItem value="post2">Beach day essentials - 89K views</SelectItem>
                            <SelectItem value="post3">Styling tips video - 67K views</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Campaign Context</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select related campaign" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="summer">Summer Fashion 2024</SelectItem>
                            <SelectItem value="tech">Tech Gadgets Q1</SelectItem>
                            <SelectItem value="beauty">Beauty Essentials</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Request Method</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms" defaultChecked />
                            <Label htmlFor="sms" className="text-gray-300">
                              SMS
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email" defaultChecked />
                            <Label htmlFor="email" className="text-gray-300">
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="inapp" defaultChecked />
                            <Label htmlFor="inapp" className="text-gray-300">
                              In-app
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Custom Message</Label>
                        <Textarea
                          placeholder="Hi Emma! We'd love to use your summer outfit haul video for our paid campaigns..."
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={4}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">High Priority Request</Label>
                        <Switch />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsRequestModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Send Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Collected</CardTitle>
                <Zap className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">247 codes</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 this week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">34 pending</div>
                <div className="text-sm text-gray-400">8 overdue</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Collection Rate</CardTitle>
                <Target className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">78%</div>
                <div className="text-sm text-gray-400">success rate</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg Collection Time</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2.3 days</div>
                <div className="text-sm text-green-400">-0.5 days vs last month</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="collection" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="collection" className="data-[state=active]:bg-purple-600">
                Spark Code Collection
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-purple-600">
                Request Management
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600">
                Campaign Organization
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                Analytics & Performance
              </TabsTrigger>
              <TabsTrigger value="export" className="data-[state=active]:bg-purple-600">
                Export & Integration
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Spark Code Collection */}
            <TabsContent value="collection" className="space-y-6">
              {/* View Toggle */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={activeView === "collected" ? "default" : "outline"}
                    onClick={() => setActiveView("collected")}
                    className={cn(
                      activeView === "collected"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-gray-700 text-gray-300 hover:bg-gray-800",
                    )}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Collected Codes
                  </Button>
                  <Button
                    variant={activeView === "pending" ? "default" : "outline"}
                    onClick={() => setActiveView("pending")}
                    className={cn(
                      activeView === "pending"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-gray-700 text-gray-300 hover:bg-gray-800",
                    )}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Requests
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search creators..."
                      className="pl-10 bg-gray-800 border-gray-700 text-white w-64"
                    />
                  </div>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="All Campaigns" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="Summer Fashion 2024">Summer Fashion 2024</SelectItem>
                      <SelectItem value="Tech Gadgets Q1">Tech Gadgets Q1</SelectItem>
                      <SelectItem value="Beauty Essentials">Beauty Essentials</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="collected">Collected</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedCreators.length > 0 && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">{selectedCreators.length} items selected</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                          <Send className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Collected
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="h-4 w-4 mr-2" />
                          Export Selected
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Data Table */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedCreators.length === filteredData.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="text-gray-400">Creator</TableHead>
                        <TableHead className="text-gray-400">Campaign</TableHead>
                        <TableHead className="text-gray-400">Content</TableHead>
                        <TableHead className="text-gray-400">Performance</TableHead>
                        {activeView === "collected" ? (
                          <>
                            <TableHead className="text-gray-400">Spark Code</TableHead>
                            <TableHead className="text-gray-400">Collection Date</TableHead>
                            <TableHead className="text-gray-400">Ad Status</TableHead>
                          </>
                        ) : (
                          <>
                            <TableHead className="text-gray-400">Request Date</TableHead>
                            <TableHead className="text-gray-400">Days Overdue</TableHead>
                            <TableHead className="text-gray-400">Response Rate</TableHead>
                          </>
                        )}
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.id} className="border-gray-800">
                          <TableCell>
                            <Checkbox
                              checked={selectedCreators.includes(item.id)}
                              onCheckedChange={(checked) => handleSelectCreator(item.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.creator.avatar || "/placeholder.svg"}
                                alt={item.creator.name}
                                className="h-10 w-10 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-white">{item.creator.name}</div>
                                <div className="text-sm text-gray-400">{item.creator.handle}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={cn("h-3 w-3 rounded-full", item.campaign.color)} />
                              <div>
                                <div className="font-medium text-white">{item.campaign.name}</div>
                                <div className="text-sm text-gray-400">{item.campaign.brand}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={item.content.thumbnail || "/placeholder.svg"}
                                  alt="Content thumbnail"
                                  className="h-12 w-12 rounded-lg object-cover"
                                />
                                {item.content.type === "video" && (
                                  <Play className="absolute inset-0 m-auto h-4 w-4 text-white" />
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Eye className="h-3 w-3 text-gray-400" />
                                <span className="text-white">{(item.content.views / 1000).toFixed(1)}K</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Heart className="h-3 w-3 text-gray-400" />
                                <span className="text-white">{(item.content.likes / 1000).toFixed(1)}K</span>
                              </div>
                              {item.content.gmv && (
                                <div className="flex items-center gap-1 text-sm">
                                  <DollarSign className="h-3 w-3 text-green-400" />
                                  <span className="text-green-400">${item.content.gmv}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          {activeView === "collected" ? (
                            <>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <code className="bg-gray-800 px-2 py-1 rounded text-sm text-purple-400">
                                    {item.sparkCode?.replace(/(.{6}).*(.{3})/, "$1***$2")}
                                  </code>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-gray-300">{item.collectionDate}</span>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    item.adStatus === "ready" && "bg-green-600/20 text-green-400",
                                    item.adStatus === "used" && "bg-purple-600/20 text-purple-400",
                                  )}
                                >
                                  {item.adStatus === "ready" && <Rocket className="h-3 w-3 mr-1" />}
                                  {item.adStatus === "used" && <Sparkles className="h-3 w-3 mr-1" />}
                                  {item.adStatus === "ready" ? "Ready for Ads" : "Used in Ads"}
                                </Badge>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>
                                <span className="text-gray-300">{item.requestDate}</span>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    item.daysOverdue && item.daysOverdue < 3 && "bg-green-600/20 text-green-400",
                                    item.daysOverdue &&
                                      item.daysOverdue >= 3 &&
                                      item.daysOverdue <= 7 &&
                                      "bg-yellow-600/20 text-yellow-400",
                                    item.daysOverdue && item.daysOverdue > 7 && "bg-red-600/20 text-red-400",
                                  )}
                                >
                                  {item.daysOverdue} days
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-white">{item.creator.responseRate}%</span>
                                  <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-purple-600 rounded-full"
                                      style={{ width: `${item.creator.responseRate}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                            </>
                          )}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Content
                                </DropdownMenuItem>
                                {activeView === "collected" ? (
                                  <>
                                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy Code
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                      <Rocket className="h-4 w-4 mr-2" />
                                      Use in Campaign
                                    </DropdownMenuItem>
                                  </>
                                ) : (
                                  <>
                                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                      <Send className="h-4 w-4 mr-2" />
                                      Send Reminder
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark Complete
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="text-red-400 hover:bg-red-600/20">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Request
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Request Management */}
            <TabsContent value="requests" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Single Request Form */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Single Request</CardTitle>
                    <CardDescription className="text-gray-400">
                      Request spark codes from individual creators
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">Creator</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Search creators..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="emma">Emma Rodriguez (@emmarod)</SelectItem>
                          <SelectItem value="jake">Jake Thompson (@jakethompson)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Campaign</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select campaign..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="summer">Summer Fashion 2024</SelectItem>
                          <SelectItem value="tech">Tech Gadgets Q1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Request Method</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sms-single" defaultChecked />
                          <Label htmlFor="sms-single" className="text-gray-300">
                            SMS
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="email-single" />
                          <Label htmlFor="email-single" className="text-gray-300">
                            Email
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </Button>
                  </CardContent>
                </Card>

                {/* Automated Rules */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Automated Request Rules</CardTitle>
                    <CardDescription className="text-gray-400">Set up automatic spark code requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-white">High-performing posts (&gt;100K views)</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Viral content detection</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Weekly top performers</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div>
                      <Label className="text-white mb-2 block">Minimum Performance Threshold</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-sm text-gray-400">Views</Label>
                          <Input placeholder="50000" className="bg-gray-800 border-gray-700 text-white" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-400">GMV</Label>
                          <Input placeholder="1000" className="bg-gray-800 border-gray-700 text-white" />
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Rules
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Campaign Organization */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid gap-6">
                {campaignData.map((campaign) => (
                  <Card key={campaign.id} className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white">{campaign.name}</CardTitle>
                          <CardDescription className="text-gray-400">{campaign.brand}</CardDescription>
                        </div>
                        <Badge className="bg-purple-600/20 text-purple-400">{campaign.completionRate}% Complete</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{campaign.totalPosts}</div>
                          <div className="text-sm text-gray-400">Total Posts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{campaign.codesCollected}</div>
                          <div className="text-sm text-gray-400">Codes Collected</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{campaign.codesPending}</div>
                          <div className="text-sm text-gray-400">Pending</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            ${(campaign.totalGMV / 1000).toFixed(1)}K
                          </div>
                          <div className="text-sm text-gray-400">Total GMV</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Collection Progress</span>
                          <span className="text-white">{campaign.completionRate}%</span>
                        </div>
                        <Progress value={campaign.completionRate} className="h-2" />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Send className="h-4 w-4 mr-2" />
                          Request Missing Codes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab 4: Analytics & Performance */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Collection Performance */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Collection Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Collection Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">78%</span>
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: "78%" }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Response Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">85%</span>
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Avg Response Time</span>
                        <span className="text-white">2.3 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Performance */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Content Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">High-Value Content</span>
                        <span className="text-green-400">156 posts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Viral Content</span>
                        <span className="text-purple-400">23 posts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Avg GMV per Code</span>
                        <span className="text-white">$1,847</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Performers Table */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Spark Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-400">Creator</TableHead>
                        <TableHead className="text-gray-400">Content</TableHead>
                        <TableHead className="text-gray-400">Organic Performance</TableHead>
                        <TableHead className="text-gray-400">Ad Performance</TableHead>
                        <TableHead className="text-gray-400">ROI</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-800">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt="Creator"
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="text-white">Emma Rodriguez</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt="Content"
                              className="h-8 w-8 rounded object-cover"
                            />
                            <span className="text-gray-300">Summer outfit haul</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-white">125K views</div>
                            <div className="text-gray-400">$2,345 GMV</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-white">89K impressions</div>
                            <div className="text-green-400">$4,567 revenue</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-600/20 text-green-400">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            285%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 5: Export & Integration */}
            <TabsContent value="export" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Export Options */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Export Options</CardTitle>
                    <CardDescription className="text-gray-400">Export spark codes and performance data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Spark Code List (CSV)
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Campaign Performance Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        Creator Attribution Report
                      </Button>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div>
                      <Label className="text-white mb-2 block">Custom Export</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-performance" defaultChecked />
                          <Label htmlFor="include-performance" className="text-gray-300">
                            Include performance metrics
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-codes" defaultChecked />
                          <Label htmlFor="include-codes" className="text-gray-300">
                            Include spark codes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-dates" />
                          <Label htmlFor="include-dates" className="text-gray-300">
                            Include collection dates
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Custom Export
                    </Button>
                  </CardContent>
                </Card>

                {/* Platform Integration */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Platform Integration</CardTitle>
                    <CardDescription className="text-gray-400">Connect with advertising platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-black rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TT</span>
                          </div>
                          <span className="text-white">TikTok Ads Manager</span>
                        </div>
                        <Badge className="bg-green-600/20 text-green-400">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">FB</span>
                          </div>
                          <span className="text-white">Facebook Ads</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                          Connect
                        </Button>
                      </div>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div>
                      <Label className="text-white mb-2 block">Auto-Export Settings</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Daily export to TikTok</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Weekly performance reports</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
