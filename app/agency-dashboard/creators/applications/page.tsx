"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Download,
  UserPlus,
  Settings,
  Calendar,
  Eye,
  MessageSquare,
  Check,
  X,
  Copy,
  Star,
  TrendingUp,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  BarChart3,
  Send,
  Home,
  ChevronRight,
  SlidersHorizontal,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock applications data
const applications = [
  {
    id: 1,
    creatorName: "Emma Rodriguez",
    email: "emma@email.com",
    phone: "+1 (555) 123-4567",
    discord: "emma_lifestyle#1234",
    avatar: "/placeholder.svg?height=40&width=40",
    applicationDate: "2024-01-20",
    campaignName: "Summer Fashion 2024",
    campaignId: 1,
    status: "Pending",
    direction: "Incoming",
    totalGMV: 125000,
    tiktokHandle: "@emmalifestyle",
    tiktokFollowers: 2400000,
    instagramHandle: "@emma.lifestyle",
    instagramFollowers: 1800000,
    youtubeHandle: "@EmmaLifestyle",
    youtubeFollowers: 850000,
    audienceGender: { male: 25, female: 75 },
    primaryAge: "18-24",
    profileCompletion: 95,
    engagementRate: 7.2,
    consistencyRating: 95,
    averageRating: 4.9,
    location: "Los Angeles, CA",
    age: 24,
    ethnicity: "Hispanic",
    niche: "Fashion",
    shippingAddress: "123 Fashion Ave, LA, CA 90210",
  },
  {
    id: 2,
    creatorName: "Marcus Chen",
    email: "marcus@email.com",
    phone: "+1 (555) 234-5678",
    discord: "techmarcos#5678",
    avatar: "/placeholder.svg?height=40&width=40",
    applicationDate: "2024-01-19",
    campaignName: "Tech Gadgets Q1",
    campaignId: 2,
    status: "Approved",
    direction: "Incoming",
    totalGMV: 89000,
    tiktokHandle: "@techmarcos",
    tiktokFollowers: 1800000,
    instagramHandle: "@marcus.tech",
    instagramFollowers: 950000,
    youtubeHandle: null,
    youtubeFollowers: 0,
    audienceGender: { male: 65, female: 35 },
    primaryAge: "25-34",
    profileCompletion: 88,
    engagementRate: 6.8,
    consistencyRating: 88,
    averageRating: 4.7,
    location: "San Francisco, CA",
    age: 28,
    ethnicity: "Asian",
    niche: "Technology",
    shippingAddress: "456 Tech St, SF, CA 94105",
  },
  {
    id: 3,
    creatorName: "Sophia Williams",
    email: "sophia@email.com",
    phone: "+1 (555) 345-6789",
    discord: "beautysofia#9012",
    avatar: "/placeholder.svg?height=40&width=40",
    applicationDate: "2024-01-18",
    campaignName: "Beauty Essentials 2024",
    campaignId: 3,
    status: "Rejected",
    direction: "Incoming",
    totalGMV: 156000,
    tiktokHandle: "@beautysofia",
    tiktokFollowers: 3200000,
    instagramHandle: "@sofia.beauty",
    instagramFollowers: 2100000,
    youtubeHandle: "@SofiaBeauty",
    youtubeFollowers: 1200000,
    audienceGender: { male: 15, female: 85 },
    primaryAge: "18-24",
    profileCompletion: 92,
    engagementRate: 8.1,
    consistencyRating: 92,
    averageRating: 4.8,
    location: "Miami, FL",
    age: 22,
    ethnicity: "Mixed",
    niche: "Beauty",
    shippingAddress: "789 Beauty Blvd, Miami, FL 33101",
  },
]

const campaigns = [
  { id: 1, name: "Summer Fashion 2024", status: "Active" },
  { id: 2, name: "Tech Gadgets Q1", status: "Active" },
  { id: 3, name: "Beauty Essentials 2024", status: "Active" },
  { id: 4, name: "Fitness Revolution", status: "Upcoming" },
]

const statusOptions = ["All", "Pending", "Approved", "Rejected", "Incoming", "Outgoing"]

export default function CreatorApplications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApplications, setSelectedApplications] = useState<number[]>([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [selectedCampaignForInvite, setSelectedCampaignForInvite] = useState("")

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
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
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-3 w-3" />
      case "Approved":
        return <CheckCircle className="h-3 w-3" />
      case "Rejected":
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "All" || app.status === statusFilter
      const matchesCampaign = campaignFilter === "All Campaigns" || app.campaignName === campaignFilter

      return matchesSearch && matchesStatus && matchesCampaign
    })
  }, [searchQuery, statusFilter, campaignFilter, applications])

  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    }
  }

  const handleSelectApplication = (id: number) => {
    setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
  }

  const handleBulkApprove = () => {
    console.log("Bulk approving applications:", selectedApplications)
    setSelectedApplications([])
  }

  const handleBulkReject = () => {
    console.log("Bulk rejecting applications:", selectedApplications)
    setSelectedApplications([])
  }

  const handleApproveApplication = (id: number) => {
    console.log("Approving application:", id)
  }

  const handleRejectApplication = (id: number) => {
    console.log("Rejecting application:", id)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSendInvites = () => {
    const emails = inviteEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    console.log("Sending invites to:", emails, "for campaign:", selectedCampaignForInvite)
    setShowInviteModal(false)
    setInviteEmails("")
    setSelectedCampaignForInvite("")
  }

  // Statistics
  const totalApplications = applications.length
  const pendingApplications = applications.filter((app) => app.status === "Pending").length
  const approvalRate = Math.round(
    (applications.filter((app) => app.status === "Approved").length / totalApplications) * 100,
  )

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
              <span className="text-purple-400">Applications</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Applications</h1>
                <p className="text-gray-400 mt-1">{filteredApplications.length} applications to review</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowInviteModal(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Creators
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Applications</p>
                      <p className="text-2xl font-bold text-white">{totalApplications}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-400">{pendingApplications}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Approval Rate</p>
                      <p className="text-2xl font-bold text-green-400">{approvalRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Avg Response Time</p>
                      <p className="text-2xl font-bold text-blue-400">2.3h</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} className="text-gray-300 hover:text-white">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="All Campaigns" className="text-gray-300 hover:text-white">
                    All Campaigns
                  </SelectItem>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.name} className="text-gray-300 hover:text-white">
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    className="rounded-md border-0"
                  />
                </PopoverContent>
              </Popover>

              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className={`border-gray-700 ${showFilters ? "bg-purple-600/20 border-purple-500/30 text-purple-400" : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96 bg-gray-900 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Advanced Filters</SheetTitle>
                    <SheetDescription className="text-gray-400">
                      Filter applications by detailed criteria
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Audience Gender</Label>
                      <div className="space-y-2">
                        {["Male Majority", "Female Majority", "Mixed"].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox id={`gender-${option}`} />
                            <Label htmlFor={`gender-${option}`} className="text-sm text-gray-300">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">Primary Age Group</Label>
                      <div className="space-y-2">
                        {["13-17", "18-24", "25-34", "35-44", "45+"].map((age) => (
                          <div key={age} className="flex items-center space-x-2">
                            <Checkbox id={`age-${age}`} />
                            <Label htmlFor={`age-${age}`} className="text-sm text-gray-300">
                              {age}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Bulk Actions */}
            {selectedApplications.length > 0 && (
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400 font-medium">
                      {selectedApplications.length} applications selected
                    </span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleBulkApprove}>
                      <Check className="h-4 w-4 mr-2" />
                      Bulk Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleBulkReject}>
                      <X className="h-4 w-4 mr-2" />
                      Bulk Reject
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Selected
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedApplications([])}
                    className="text-gray-400 hover:text-white"
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Applications Table */}
        <div className="p-6">
          <Card className="bg-gray-900 border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedApplications.length === filteredApplications.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-400">Creator Info</TableHead>
                  <TableHead className="text-gray-400">Campaign</TableHead>
                  <TableHead className="text-gray-400">Creator Metrics</TableHead>
                  <TableHead className="text-gray-400">Audience</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedApplications.includes(application.id)}
                        onCheckedChange={() => handleSelectApplication(application.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.creatorName} />
                          <AvatarFallback className="bg-gray-800 text-white text-sm">
                            {application.creatorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <button
                            className="font-semibold text-white hover:text-purple-400 transition-colors underline"
                            onClick={() => setSelectedApplication(application)}
                          >
                            {application.creatorName}
                          </button>
                          <p className="text-xs text-gray-400">{application.applicationDate}</p>
                          {application.profileCompletion < 100 && (
                            <div className="flex items-center gap-1 mt-1">
                              <AlertCircle className="h-3 w-3 text-yellow-400" />
                              <span className="text-xs text-yellow-400">
                                Profile {application.profileCompletion}% complete
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <button className="font-medium text-purple-400 hover:text-purple-300 underline">
                          {application.campaignName}
                        </button>
                        <p className="text-xs text-gray-400">GMV Tier: Premium</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total GMV:</span>
                          <span className="text-green-400 font-semibold">{formatCurrency(application.totalGMV)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">TikTok:</span>
                          <span className="text-white">
                            {application.tiktokHandle} ({formatNumber(application.tiktokFollowers)})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Discord:</span>
                          <span className="text-white">{application.discord || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Instagram:</span>
                          <span className="text-white">{application.instagramHandle || "N/A"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-blue-400" />
                          <span className="text-white">{application.audienceGender.male}%</span>
                          <Users className="h-3 w-3 text-pink-400" />
                          <span className="text-white">{application.audienceGender.female}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Primary: </span>
                          <span className="text-white">{application.primaryAge}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                          {application.direction}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {application.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveApplication(application.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectApplication(application.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 bg-gray-800 hover:bg-gray-700"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* No Results */}
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No applications found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find applications.</p>
            </div>
          )}
        </div>

        {/* Creator Profile Review Modal */}
        {selectedApplication && (
          <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl text-white">Application Review</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      {selectedApplication.creatorName} applied for {selectedApplication.campaignName}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedApplication.status)}>
                      {getStatusIcon(selectedApplication.status)}
                      <span className="ml-1">{selectedApplication.status}</span>
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {/* Creator Profile Overview */}
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={selectedApplication.avatar || "/placeholder.svg"}
                      alt={selectedApplication.creatorName}
                    />
                    <AvatarFallback className="bg-gray-700 text-white text-xl">
                      {selectedApplication.creatorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{selectedApplication.creatorName}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{selectedApplication.email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => copyToClipboard(selectedApplication.email)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{selectedApplication.phone}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => copyToClipboard(selectedApplication.phone)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-400">Profile Completion:</span>
                        <span className="text-white font-semibold">{selectedApplication.profileCompletion}%</span>
                      </div>
                      <Progress value={selectedApplication.profileCompletion} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-white">
                        {formatNumber(
                          selectedApplication.tiktokFollowers +
                            selectedApplication.instagramFollowers +
                            selectedApplication.youtubeFollowers,
                        )}
                      </div>
                      <div className="text-xs text-gray-400">Total Followers</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-green-400">
                        {formatCurrency(selectedApplication.totalGMV)}
                      </div>
                      <div className="text-xs text-gray-400">Historical GMV</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-blue-400">{selectedApplication.engagementRate}%</div>
                      <div className="text-xs text-gray-400">Engagement Rate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-yellow-400">{selectedApplication.consistencyRating}%</div>
                      <div className="text-xs text-gray-400">Consistency</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold text-white">{selectedApplication.averageRating}</span>
                      </div>
                      <div className="text-xs text-gray-400">Average Rating</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Information Tabs */}
                <Tabs defaultValue="demographics" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-600">
                      Demographics
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">
                      Performance
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="data-[state=active]:bg-purple-600">
                      Contact & Logistics
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="demographics" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white">Creator Demographics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Age</span>
                            <span className="text-white">{selectedApplication.age} years old</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location</span>
                            <span className="text-white">{selectedApplication.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Ethnicity</span>
                            <span className="text-white">{selectedApplication.ethnicity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Content Niche</span>
                            <span className="text-white">{selectedApplication.niche}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white">Audience Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Gender Split</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-300">Female</span>
                                <span className="text-white">{selectedApplication.audienceGender.female}%</span>
                              </div>
                              <Progress value={selectedApplication.audienceGender.female} className="h-2" />
                              <div className="flex justify-between items-center">
                                <span className="text-gray-300">Male</span>
                                <span className="text-white">{selectedApplication.audienceGender.male}%</span>
                              </div>
                              <Progress value={selectedApplication.audienceGender.male} className="h-2" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Primary Age Group</h4>
                            <div className="text-white font-semibold">{selectedApplication.primaryAge}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4 mt-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                              {formatCurrency(selectedApplication.totalGMV)}
                            </div>
                            <div className="text-sm text-gray-400">Total GMV</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                              {selectedApplication.engagementRate}%
                            </div>
                            <div className="text-sm text-gray-400">Engagement Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">
                              {selectedApplication.consistencyRating}%
                            </div>
                            <div className="text-sm text-gray-400">Consistency</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-2xl font-bold text-white">{selectedApplication.averageRating}</span>
                            </div>
                            <div className="text-sm text-gray-400">Average Rating</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4 mt-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300">{selectedApplication.email}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(selectedApplication.email)}
                              >
                                <Copy className="h-3 w-3 text-gray-400" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300">{selectedApplication.phone}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(selectedApplication.phone)}
                              >
                                <Copy className="h-3 w-3 text-gray-400" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-300">{selectedApplication.discord}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-400">Shipping Address</p>
                                <p className="text-gray-300">{selectedApplication.shippingAddress}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Application Decision Panel */}
                {selectedApplication.status === "Pending" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 h-12"
                      onClick={() => handleApproveApplication(selectedApplication.id)}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Accept Application
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-12"
                      onClick={() => handleRejectApplication(selectedApplication.id)}
                    >
                      <X className="h-5 w-5 mr-2" />
                      Reject Application
                    </Button>
                    <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 h-12">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Request More Info
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Invite Creators Modal */}
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Invite Affiliates or Creators</DialogTitle>
              <DialogDescription className="text-gray-400">
                Send invitations to potential creators to join your campaigns
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Campaign Selection */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Select Campaign</Label>
                <Select value={selectedCampaignForInvite} onValueChange={setSelectedCampaignForInvite}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.name} className="text-gray-300 hover:text-white">
                        {campaign.name} ({campaign.status})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Email Invitation */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Email Addresses</Label>
                <Textarea
                  placeholder="Enter a comma-separated list of emails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Provide a list of emails separated by commas to invite multiple users at once
                </p>
              </div>

              {/* Invitation Settings */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-assign" />
                  <Label htmlFor="auto-assign" className="text-sm text-gray-300">
                    Auto-assign to campaign when they join
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="discord-invite" />
                  <Label htmlFor="discord-invite" className="text-sm text-gray-300">
                    Include Discord server invitation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-approve" />
                  <Label htmlFor="auto-approve" className="text-sm text-gray-300">
                    Enable auto-approval for invited creators
                  </Label>
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <Label className="text-sm font-medium text-white mb-2 block">Custom Message (Optional)</Label>
                <Textarea
                  placeholder="Add a personalized message to your invitation..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={handleSendInvites}
                  disabled={!selectedCampaignForInvite || !inviteEmails.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitations
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 bg-gray-800 hover:bg-gray-700"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
