"use client"

import { useState, useMemo, useEffect } from "react"
import { DateRange } from "react-day-picker"
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
  Loader2,
  RefreshCw,
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
import { toast } from "@/components/ui/use-toast"

// Import our custom hooks
import {
  useCampaignApplications,
  useCampaigns,
  useReviewApplication,
  useBulkReviewApplications,
  useApplicationStats,
  type Application
} from "@/hooks/useApplications"

const statusOptions = ["All", "pending", "approved", "rejected"]

export default function CreatorApplications() {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns")
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [selectedCampaignForInvite, setSelectedCampaignForInvite] = useState("")

  // API hooks
  const { data: campaigns = [], isLoading: campaignsLoading } = useCampaigns()
  const { data: stats, isLoading: statsLoading } = useApplicationStats()
  
  // Get applications for the selected campaign
  const { 
    data: applications = [], 
    isLoading: applicationsLoading, 
    refetch: refetchApplications,
    error: applicationsError 
  } = useCampaignApplications(selectedCampaignId, {
    status: statusFilter === "All" ? undefined : statusFilter,
    search: searchQuery,
  })

  // Mutations
  const reviewMutation = useReviewApplication()
  const bulkReviewMutation = useBulkReviewApplications()

  // Set default campaign if available
  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(campaigns[0].id)
    }
  }, [campaigns, selectedCampaignId])

  // Utility functions
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "approved":
        return <CheckCircle className="h-3 w-3" />
      case "rejected":
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  // Filter applications
  const filteredApplications = useMemo(() => {
    if (!applications) return []
    
    return applications.filter((app) => {
      const matchesSearch = !searchQuery || 
        app.creator?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.creator?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.creator?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.creator?.email?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCampaign = campaignFilter === "All Campaigns" || 
        app.campaign?.name === campaignFilter

      return matchesSearch && matchesCampaign
    })
  }, [applications, searchQuery, campaignFilter])

  // Event handlers
  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    }
  }

  const handleSelectApplication = (id: string) => {
    setSelectedApplications((prev) => 
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    )
  }

  const handleBulkApprove = async () => {
    try {
      await bulkReviewMutation.mutateAsync({
        applicationIds: selectedApplications,
        action: 'approved',
        notes: 'Bulk approved'
      })
      setSelectedApplications([])
      toast({
        title: "Success",
        description: `${selectedApplications.length} applications approved`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve applications",
        variant: "destructive",
      })
    }
  }

  const handleBulkReject = async () => {
    try {
      await bulkReviewMutation.mutateAsync({
        applicationIds: selectedApplications,
        action: 'rejected',
        notes: 'Bulk rejected'
      })
      setSelectedApplications([])
      toast({
        title: "Success",
        description: `${selectedApplications.length} applications rejected`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject applications",
        variant: "destructive",
      })
    }
  }

  const handleApproveApplication = async (id: string) => {
    try {
      await reviewMutation.mutateAsync({
        applicationId: id,
        reviewData: { status: 'approved' }
      })
      toast({
        title: "Success",
        description: "Application approved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      })
    }
  }

  const handleRejectApplication = async (id: string) => {
    try {
      await reviewMutation.mutateAsync({
        applicationId: id,
        reviewData: { status: 'rejected' }
      })
      toast({
        title: "Success",
        description: "Application rejected",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    })
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
    toast({
      title: "Success",
      description: `Invites sent to ${emails.length} creators`,
    })
  }

  // Calculate statistics
  const totalApplications = applications?.length || 0
  const pendingApplications = applications?.filter((app) => app.status === "pending").length || 0
  const approvedApplications = applications?.filter((app) => app.status === "approved").length || 0
  const approvalRate = totalApplications > 0 
    ? Math.round((approvedApplications / totalApplications) * 100)
    : 0

  // Loading state
  if (campaignsLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading campaigns...</span>
        </div>
      </div>
    )
  }

  // Error state
  if (applicationsError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Applications</h3>
          <p className="text-gray-400 mb-4">Failed to load applications. Please try again.</p>
          <Button 
            onClick={() => refetchApplications()}
            variant="outline"
            className="border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
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
              <span className="text-purple-400">Applications</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Applications</h1>
                <p className="text-gray-400 mt-1">
                  {applicationsLoading 
                    ? "Loading applications..." 
                    : `${filteredApplications.length} applications to review`
                  }
                </p>
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
                      <p className="text-2xl font-bold text-white">
                        {applicationsLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          totalApplications
                        )}
                      </p>
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
                      <p className="text-2xl font-bold text-yellow-400">
                        {applicationsLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          pendingApplications
                        )}
                      </p>
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
                      <p className="text-2xl font-bold text-green-400">
                        {applicationsLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          `${approvalRate}%`
                        )}
                      </p>
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
                      {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedCampaignId} 
                onValueChange={(value) => {
                  setSelectedCampaignId(value)
                  setCampaignFilter(campaigns.find(c => c.id === value)?.name || "All Campaigns")
                }}
              >
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select Campaign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id} className="text-gray-300 hover:text-white">
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                        </>
                      ) : (
                        dateRange.from.toLocaleDateString()
                      )
                    ) : (
                      "Date Range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <div className="p-3">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium text-gray-300">From</label>
                          <Input
                            type="date"
                            className="bg-gray-700 border-gray-600 text-white"
                            value={dateRange?.from ? dateRange.from.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined
                              setDateRange(prev => ({ ...prev, from: date }))
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">To</label>
                          <Input
                            type="date"
                            className="bg-gray-700 border-gray-600 text-white"
                            value={dateRange?.to ? dateRange.to.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined
                              setDateRange(prev => ({ ...prev, to: date }))
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600"
                          onClick={() => setDateRange(undefined)}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
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
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700" 
                      onClick={handleBulkApprove}
                      disabled={bulkReviewMutation.isPending}
                    >
                      {bulkReviewMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Bulk Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={handleBulkReject}
                      disabled={bulkReviewMutation.isPending}
                    >
                      {bulkReviewMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <X className="h-4 w-4 mr-2" />
                      )}
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
            {applicationsLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
                <p className="text-gray-400">Loading applications...</p>
              </div>
            ) : (
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
                            <AvatarImage 
                              src={application.creator?.avatar || "/placeholder.svg"} 
                              alt={`${application.creator?.first_name} ${application.creator?.last_name}`} 
                            />
                            <AvatarFallback className="bg-gray-800 text-white text-sm">
                              {(application.creator?.first_name?.[0] || '') + (application.creator?.last_name?.[0] || '')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <button
                              className="font-semibold text-white hover:text-purple-400 transition-colors underline"
                              onClick={() => setSelectedApplication(application)}
                            >
                              {application.creator?.first_name} {application.creator?.last_name}
                            </button>
                            <p className="text-xs text-gray-400">
                              {new Date(application.applied_at).toLocaleDateString()}
                            </p>
                            {application.creator?.profile_completion && application.creator.profile_completion < 100 && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertCircle className="h-3 w-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400">
                                  Profile {application.creator.profile_completion}% complete
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <button className="font-medium text-purple-400 hover:text-purple-300 underline">
                            {application.campaign?.name}
                          </button>
                          <p className="text-xs text-gray-400">
                            Status: {application.campaign?.status}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Previous GMV:</span>
                            <span className="text-green-400 font-semibold">
                              {application.previous_gmv ? formatCurrency(application.previous_gmv) : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">TikTok:</span>
                            <span className="text-white">
                              {application.creator?.tiktok_handle || 'N/A'} 
                              {application.creator?.tiktok_followers && ` (${formatNumber(application.creator.tiktok_followers)})`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Instagram:</span>
                            <span className="text-white">
                              {application.creator?.instagram_handle || 'N/A'}
                              {application.creator?.instagram_followers && ` (${formatNumber(application.creator.instagram_followers)})`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Engagement:</span>
                            <span className="text-white">
                              {application.engagement_rate ? `${application.engagement_rate}%` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          {application.creator?.audience_gender && (
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-blue-400" />
                              <span className="text-white">{application.creator.audience_gender.male}%</span>
                              <Users className="h-3 w-3 text-pink-400" />
                              <span className="text-white">{application.creator.audience_gender.female}%</span>
                            </div>
                          )}
                          {application.creator?.primary_age && (
                            <div>
                              <span className="text-gray-400">Primary: </span>
                              <span className="text-white">{application.creator.primary_age}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">{application.status}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                            Application
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {application.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveApplication(application.id)}
                                disabled={reviewMutation.isPending}
                              >
                                {reviewMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectApplication(application.id)}
                                disabled={reviewMutation.isPending}
                              >
                                {reviewMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
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
            )}

            {/* No Results */}
            {!applicationsLoading && filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No applications found</h3>
                <p className="text-gray-500">
                  {!selectedCampaignId 
                    ? "Please select a campaign to view applications."
                    : "Try adjusting your search or filters to find applications."
                  }
                </p>
              </div>
            )}
          </Card>
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
                      {selectedApplication.creator?.first_name} {selectedApplication.creator?.last_name} applied for {selectedApplication.campaign?.name}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedApplication.status)}>
                      {getStatusIcon(selectedApplication.status)}
                      <span className="ml-1 capitalize">{selectedApplication.status}</span>
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
                      src={selectedApplication.creator?.avatar || "/placeholder.svg"}
                      alt={`${selectedApplication.creator?.first_name} ${selectedApplication.creator?.last_name}`}
                    />
                    <AvatarFallback className="bg-gray-700 text-white text-xl">
                      {(selectedApplication.creator?.first_name?.[0] || '') + (selectedApplication.creator?.last_name?.[0] || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">
                      {selectedApplication.creator?.first_name} {selectedApplication.creator?.last_name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      {selectedApplication.creator?.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{selectedApplication.creator.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(selectedApplication.creator!.email!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {selectedApplication.creator?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{selectedApplication.creator.phone}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(selectedApplication.creator!.phone!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {selectedApplication.creator?.profile_completion && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-400">Profile Completion:</span>
                          <span className="text-white font-semibold">{selectedApplication.creator.profile_completion}%</span>
                        </div>
                        <Progress value={selectedApplication.creator.profile_completion} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-white">
                        {selectedApplication.creator?.total_followers ? 
                          formatNumber(selectedApplication.creator.total_followers) : 
                          formatNumber(
                            (selectedApplication.creator?.tiktok_followers || 0) +
                            (selectedApplication.creator?.instagram_followers || 0) +
                            (selectedApplication.creator?.youtube_followers || 0)
                          )
                        }
                      </div>
                      <div className="text-xs text-gray-400">Total Followers</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-green-400">
                        {selectedApplication.previous_gmv ? 
                          formatCurrency(selectedApplication.previous_gmv) : 
                          'N/A'
                        }
                      </div>
                      <div className="text-xs text-gray-400">Previous GMV</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-blue-400">
                        {selectedApplication.engagement_rate ? `${selectedApplication.engagement_rate}%` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-400">Engagement Rate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-purple-400">
                        {new Date(selectedApplication.applied_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">Applied Date</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Application Message */}
                {selectedApplication.application_message && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Application Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{selectedApplication.application_message}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Application Decision Panel */}
                {selectedApplication.status === "pending" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 h-12"
                      onClick={() => handleApproveApplication(selectedApplication.id)}
                      disabled={reviewMutation.isPending}
                    >
                      {reviewMutation.isPending ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Check className="h-5 w-5 mr-2" />
                      )}
                      Accept Application
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-12"
                      onClick={() => handleRejectApplication(selectedApplication.id)}
                      disabled={reviewMutation.isPending}
                    >
                      {reviewMutation.isPending ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <X className="h-5 w-5 mr-2" />
                      )}
                      Reject Application
                    </Button>
                    <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 h-12">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Request More Info
                    </Button>
                  </div>
                )}

                {/* Review Notes for reviewed applications */}
                {selectedApplication.status !== "pending" && selectedApplication.review_notes && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Review Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{selectedApplication.review_notes}</p>
                      {selectedApplication.reviewed_at && (
                        <p className="text-xs text-gray-400 mt-2">
                          Reviewed on {new Date(selectedApplication.reviewed_at).toLocaleString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
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