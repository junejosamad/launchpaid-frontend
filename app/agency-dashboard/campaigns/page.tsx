"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Filter, Plus, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { CampaignCreationModal } from "@/components/agency/campaign-creation-modal"
import { CampaignActionsDropdown } from "@/components/agency/campaign-actions-dropdown"
import { CampaignDetailsModal } from "@/components/agency/campaign-details-modal"
import { useCampaigns } from "@/hooks/useDashboard"
import router from "next/router"

// Match the exact types expected by the components
type CampaignStatus = "active" | "paused" | "completed" | "overdue"
type CampaignProgress = "ahead" | "on-track" | "behind"

// This matches the Campaign type expected by CampaignDetailsModal
interface Campaign {
  id: string
  name: string
  brand: {
    name: string
    logo: string
  }
  status: CampaignStatus
  progress: CampaignProgress
  gmv: number
  creators: {
    active: number
    total: number
  }
  posts: {
    completed: number
    target: number
  }
  startDate: string
  endDate: string
  daysOverdue?: number
}

export default function CampaignsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [detailsModalTab, setDetailsModalTab] = useState("overview")
  const [displayCampaigns, setDisplayCampaigns] = useState<Campaign[]>([])

  // Fetch campaigns from backend - handle draft status separately
  const { campaigns, loading, error, refetch } = useCampaigns(
    statusFilter !== "all" && statusFilter !== "draft" ? statusFilter : undefined,
    50, // limit
    0   // offset
  )

  // Transform backend campaigns to display format
  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      const transformed = campaigns
        .filter(campaign => {
          // Filter draft campaigns if needed
          if (statusFilter === "draft") return campaign.status === "draft"
          if (statusFilter !== "all") return campaign.status === statusFilter
          return true
        })
        .map((campaign) => {
          // Calculate progress based on posts or GMV
          const postsProgress = campaign.target_posts 
            ? (campaign.current_posts || 0) / campaign.target_posts 
            : 0
          const gmvProgress = campaign.target_gmv 
            ? (Number(campaign.current_gmv || 0) / Number(campaign.target_gmv)) 
            : 0
          
          // Determine overall progress
          const overallProgress = Math.max(postsProgress, gmvProgress)
          let progress: CampaignProgress = "on-track"
          if (overallProgress >= 1.1) progress = "ahead"
          else if (overallProgress < 0.8) progress = "behind"

          // Check if overdue
          const endDate = campaign.end_date ? new Date(campaign.end_date) : null
          const now = new Date()
          const isOverdue = endDate && endDate < now && campaign.status === "active"
          const daysOverdue = isOverdue && endDate
            ? Math.floor((now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24))
            : undefined

          // Map backend status to frontend status (excluding draft)
          let displayStatus: CampaignStatus = "active"
          if (isOverdue) {
            displayStatus = "overdue"
          } else if (campaign.status === "active") {
            displayStatus = "active"
          } else if (campaign.status === "paused") {
            displayStatus = "paused"
          } else if (campaign.status === "completed") {
            displayStatus = "completed"
          }

          return {
            id: campaign.id,
            name: campaign.name,
            brand: {
              name: campaign.name.split(" ")[0], // Extract brand name from campaign name
              logo: "/placeholder.svg?height=32&width=32"
            },
            status: displayStatus,
            progress: progress,
            gmv: Number(campaign.current_gmv || 0),
            creators: {
              active: campaign.current_creators || 0,
              total: campaign.target_creators || 0
            },
            posts: {
              completed: campaign.current_posts || 0,
              target: campaign.target_posts || 0
            },
            startDate: campaign.start_date || "",
            endDate: campaign.end_date || "",
            daysOverdue: daysOverdue
          }
        })
      setDisplayCampaigns(transformed)
    }
  }, [campaigns, statusFilter])

  const getStatusColor = (status: CampaignStatus | "draft") => {
    switch (status) {
      case "active":
        return "bg-green-500 text-green-100"
      case "paused":
        return "bg-yellow-500 text-yellow-100"
      case "completed":
        return "bg-blue-500 text-blue-100"
      case "overdue":
        return "bg-red-500 text-red-100"
      case "draft":
        return "bg-gray-500 text-gray-100"
      default:
        return "bg-gray-500 text-gray-100"
    }
  }

  const getProgressColor = (progress: CampaignProgress) => {
    switch (progress) {
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

  const filteredCampaigns = displayCampaigns
    .filter((campaign) => {
      if (selectedBrand !== "all" && campaign.brand.name.toLowerCase() !== selectedBrand) return false
      if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      // Priority: overdue > behind > on-track > ahead
      const priorityOrder = { overdue: 0, behind: 1, "on-track": 2, ahead: 3 }
      const aPriority = a.status === "overdue" ? 0 : priorityOrder[a.progress]
      const bPriority = b.status === "overdue" ? 0 : priorityOrder[b.progress]
      return aPriority - bPriority
    })

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId)
  }

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setDetailsModalTab("overview")
  }

  const handleAnalyticsClick = (campaignId: string) => {
    const campaign = displayCampaigns.find((c) => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setDetailsModalTab("analytics")
    }
  }

  const handleCampaignCreated = () => {
    setShowCreateModal(false)
    refetch() // Refresh campaigns list
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading campaigns: {error}</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />

      <div className="lg:ml-16 xl:ml-60 min-h-screen transition-all duration-300">
        <AgencyHeader selectedBrand={selectedBrand} onBrandChange={handleBrandChange} />

        <main className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Campaigns</h1>
              <p className="text-gray-400">
                {filteredCampaigns.length} campaigns {selectedBrand !== "all" && `for ${selectedBrand}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-600/25 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Campaign
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by campaign name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-gray-800 border-gray-700">
                      <Filter className="h-4 w-4 mr-2" />
                      Status: {statusFilter === "all" ? "All" : statusFilter}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("paused")}>Paused</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              {filteredCampaigns.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-400 mb-4">No campaigns found</p>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create your first campaign
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead>Campaign</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>GMV</TableHead>
                      <TableHead>Creators</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <button
                            onClick={() => handleCampaignClick(campaign)}
                            className="text-left hover:text-purple-400 transition-colors"
                          >
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-gray-400">ID: {campaign.id.slice(0, 8)}...</div>
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={campaign.brand.logo || "/placeholder.svg"}
                              alt={campaign.brand.name}
                              className="h-6 w-6 rounded"
                            />
                            <span className="font-medium">{campaign.brand.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                            {campaign.daysOverdue && ` (${campaign.daysOverdue}d overdue)`}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold">${campaign.gmv.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>
                              {campaign.creators.active}/{campaign.creators.total}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={(campaign.posts.completed / (campaign.posts.target || 1)) * 100}
                              className={`h-2 [&>div]:${getProgressColor(campaign.progress)}`}
                            />
                            <div className="text-xs text-gray-400">
                              {campaign.posts.completed}/{campaign.posts.target} posts
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(campaign.endDate)}
                            {campaign.daysOverdue && (
                              <div className="text-red-400 text-xs">{campaign.daysOverdue} days overdue</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <CampaignActionsDropdown
                            campaign={campaign}
                            onEdit={(id) => {
                              // Option 1: Navigate to edit page
                              router.push(`/agency-dashboard/campaigns/${id}/edit`)
                              
                              // Option 2: Open edit modal (you'll need to implement this)
                              // setEditingCampaign(campaign)
                              // setShowEditModal(true)
                            }}
                            onToggleStatus={(id) => {
                              // Refresh the campaigns list after status update
                              refetch()
                            }}
                            onViewAnalytics={handleAnalyticsClick}
                            onMessageCreators={(id) => {
                              // Navigate to messaging or open messaging modal
                              router.push(`/agency-dashboard/campaigns/${id}/messages`)
                            }}
                            onDelete={(id) => {
                              // Refresh the campaigns list after deletion
                              refetch()
                            }}
                            onRefresh={refetch} // Pass the refetch function
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      <CampaignCreationModal 
        isOpen={showCreateModal} 
        onClose={handleCampaignCreated}
      />

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          defaultTab={detailsModalTab}
        />
      )}
    </div>
  )
}