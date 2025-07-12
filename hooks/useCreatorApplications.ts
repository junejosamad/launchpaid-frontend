import { useState, useMemo, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Import the existing hooks from useApplications
import {
  useCampaignApplications,
  useCampaigns,
  useReviewApplication,
  useBulkReviewApplications,
  useApplicationStats,
  type Application,
  type ApplicationFilters
} from "@/hooks/useApplications"

interface DateRange {
  from?: Date
  to?: Date
}

interface UseCreatorApplicationsReturn {
  // State
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  campaignFilter: string
  setCampaignFilter: (campaign: string) => void
  selectedCampaignId: string
  setSelectedCampaignId: (id: string) => void
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  selectedApplications: string[]
  setSelectedApplications: (apps: string[]) => void
  selectedApplication: Application | null
  setSelectedApplication: (app: Application | null) => void
  showInviteModal: boolean
  setShowInviteModal: (show: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  inviteEmails: string
  setInviteEmails: (emails: string) => void
  selectedCampaignForInvite: string
  setSelectedCampaignForInvite: (campaign: string) => void
  
  // Data
  campaigns: any[]
  applications: Application[]
  filteredApplications: Application[]
  stats: any
  
  // Loading states
  campaignsLoading: boolean
  applicationsLoading: boolean
  statsLoading: boolean
  applicationsError: any
  
  // Mutations
  reviewMutation: any
  bulkReviewMutation: any
  
  // Statistics
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  approvalRate: number
  
  // Actions
  handleSelectAll: () => void
  handleSelectApplication: (id: string) => void
  handleBulkApprove: () => Promise<void>
  handleBulkReject: () => Promise<void>
  handleApproveApplication: (id: string) => Promise<void>
  handleRejectApplication: (id: string) => Promise<void>
  handleSendInvites: () => void
  copyToClipboard: (text: string) => void
  refetchApplications: () => void
  
  // Utilities
  formatNumber: (num: number) => string
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getStatusIcon: (status: string) => React.ComponentType<{ className?: string }>
}

export function useCreatorApplications(): UseCreatorApplicationsReturn {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns")
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [selectedCampaignForInvite, setSelectedCampaignForInvite] = useState("")

  // Use the existing API hooks
  const { data: campaigns = [], isLoading: campaignsLoading } = useCampaigns()
  const { data: stats, isLoading: statsLoading } = useApplicationStats(selectedCampaignId)
  
  // Create filters object for the API
  const filters: ApplicationFilters = useMemo(() => ({
    status: statusFilter === "All" ? undefined : statusFilter,
    search: searchQuery,
    campaign_id: selectedCampaignId,
  }), [statusFilter, searchQuery, selectedCampaignId])
  
  // Get applications for the selected campaign
  const { 
    data: applications = [], 
    isLoading: applicationsLoading, 
    refetch: refetchApplications,
    error: applicationsError 
  } = useCampaignApplications(selectedCampaignId, filters)

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
  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }, [])

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  const getStatusColor = useCallback((status: string): string => {
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
  }, [])

  const getStatusIcon = useCallback((status: string): React.ComponentType<{ className?: string }> => {
    switch (status) {
      case "pending":
        return Clock
      case "approved":
        return CheckCircle
      case "rejected":
        return XCircle
      default:
        return AlertCircle
    }
  }, [])

  // Filter applications locally for search functionality
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

      const matchesDateRange = !dateRange?.from || !dateRange?.to || 
        (new Date(app.applied_at) >= dateRange.from && new Date(app.applied_at) <= dateRange.to)

      return matchesSearch && matchesCampaign && matchesDateRange
    })
  }, [applications, searchQuery, campaignFilter, dateRange])

  // Event handlers
  const handleSelectAll = useCallback(() => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    }
  }, [selectedApplications.length, filteredApplications])

  const handleSelectApplication = useCallback((id: string) => {
    setSelectedApplications((prev) => 
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    )
  }, [])

  const handleBulkApprove = useCallback(async () => {
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
  }, [bulkReviewMutation, selectedApplications])

  const handleBulkReject = useCallback(async () => {
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
  }, [bulkReviewMutation, selectedApplications])

  const handleApproveApplication = useCallback(async (id: string) => {
    try {
      await reviewMutation.mutateAsync({
        applicationId: id,
        reviewData: { status: 'approved' }
      })
      toast({
        title: "Success",
        description: "Application approved",
      })
      
      // Close modal if this was the selected application
      if (selectedApplication?.id === id) {
        setSelectedApplication(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      })
    }
  }, [reviewMutation, selectedApplication])

  const handleRejectApplication = useCallback(async (id: string) => {
    try {
      await reviewMutation.mutateAsync({
        applicationId: id,
        reviewData: { status: 'rejected' }
      })
      toast({
        title: "Success",
        description: "Application rejected",
      })
      
      // Close modal if this was the selected application
      if (selectedApplication?.id === id) {
        setSelectedApplication(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      })
    }
  }, [reviewMutation, selectedApplication])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    })
  }, [])

  const handleSendInvites = useCallback(() => {
    const emails = inviteEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    
    // TODO: Implement actual invite API call
    console.log("Sending invites to:", emails, "for campaign:", selectedCampaignForInvite)
    
    setShowInviteModal(false)
    setInviteEmails("")
    setSelectedCampaignForInvite("")
    toast({
      title: "Success",
      description: `Invites sent to ${emails.length} creators`,
    })
  }, [inviteEmails, selectedCampaignForInvite])

  // Calculate statistics
  const totalApplications = applications?.length || 0
  const pendingApplications = applications?.filter((app) => app.status === "pending").length || 0
  const approvedApplications = applications?.filter((app) => app.status === "approved").length || 0
  const approvalRate = totalApplications > 0 
    ? Math.round((approvedApplications / totalApplications) * 100)
    : 0

  return {
    // State
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    campaignFilter,
    setCampaignFilter,
    selectedCampaignId,
    setSelectedCampaignId,
    dateRange,
    setDateRange,
    showFilters,
    setShowFilters,
    selectedApplications,
    setSelectedApplications,
    selectedApplication,
    setSelectedApplication,
    showInviteModal,
    setShowInviteModal,
    sidebarOpen,
    setSidebarOpen,
    inviteEmails,
    setInviteEmails,
    selectedCampaignForInvite,
    setSelectedCampaignForInvite,
    
    // Data
    campaigns,
    applications,
    filteredApplications,
    stats,
    
    // Loading states
    campaignsLoading,
    applicationsLoading,
    statsLoading,
    applicationsError,
    
    // Mutations
    reviewMutation,
    bulkReviewMutation,
    
    // Statistics
    totalApplications,
    pendingApplications,
    approvedApplications,
    approvalRate,
    
    // Actions
    handleSelectAll,
    handleSelectApplication,
    handleBulkApprove,
    handleBulkReject,
    handleApproveApplication,
    handleRejectApplication,
    handleSendInvites,
    copyToClipboard,
    refetchApplications,
    
    // Utilities
    formatNumber,
    formatCurrency,
    getStatusColor,
    getStatusIcon,
  }
}