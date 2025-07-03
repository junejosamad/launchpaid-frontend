"use client"

import { useState } from "react"
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

type CampaignStatus = "active" | "paused" | "completed" | "overdue"
type CampaignProgress = "ahead" | "on-track" | "behind"

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

const campaigns: Campaign[] = [
  {
    id: "NG001",
    name: "Neuro Gum Month 1",
    brand: { name: "Neuro Gum", logo: "/placeholder.svg?height=32&width=32" },
    status: "active",
    progress: "ahead",
    gmv: 1818.99,
    creators: { active: 19, total: 25 },
    posts: { completed: 460, target: 450 },
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "DBC002",
    name: "DrBioCare Health Campaign",
    brand: { name: "DrBioCare", logo: "/placeholder.svg?height=32&width=32" },
    status: "active",
    progress: "on-track",
    gmv: 89.98,
    creators: { active: 12, total: 15 },
    posts: { completed: 24, target: 30 },
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: "FPM003",
    name: "FlexProMeals Fitness",
    brand: { name: "FlexProMeals", logo: "/placeholder.svg?height=32&width=32" },
    status: "overdue",
    progress: "behind",
    gmv: 0,
    creators: { active: 4, total: 10 },
    posts: { completed: 15, target: 50 },
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    daysOverdue: 3,
  },
  {
    id: "GP004",
    name: "Golf Partner Program",
    brand: { name: "Golf Partner", logo: "/placeholder.svg?height=32&width=32" },
    status: "active",
    progress: "ahead",
    gmv: 2450.0,
    creators: { active: 8, total: 12 },
    posts: { completed: 28, target: 20 },
    startDate: "2024-01-10",
    endDate: "2024-02-10",
  },
  {
    id: "FN005",
    name: "Fashion Nova Collab",
    brand: { name: "Fashion Nova", logo: "/placeholder.svg?height=32&width=32" },
    status: "paused",
    progress: "on-track",
    gmv: 1250.5,
    creators: { active: 0, total: 20 },
    posts: { completed: 24, target: 30 },
    startDate: "2024-01-05",
    endDate: "2024-02-05",
  },
  {
    id: "GH006",
    name: "Global Healing Campaign",
    brand: { name: "Global Healing", logo: "/placeholder.svg?height=32&width=32" },
    status: "completed",
    progress: "on-track",
    gmv: 3500.0,
    creators: { active: 0, total: 15 },
    posts: { completed: 85, target: 90 },
    startDate: "2023-12-01",
    endDate: "2023-12-31",
  },
]

export default function CampaignsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [detailsModalTab, setDetailsModalTab] = useState("overview")

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-green-100"
      case "paused":
        return "bg-yellow-500 text-yellow-100"
      case "completed":
        return "bg-blue-500 text-blue-100"
      case "overdue":
        return "bg-red-500 text-red-100"
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

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      if (selectedBrand !== "all" && campaign.brand.name.toLowerCase() !== selectedBrand) return false
      if (statusFilter !== "all" && campaign.status !== statusFilter) return false
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
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setDetailsModalTab("analytics")
    }
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
                    <DropdownMenuItem onClick={() => setStatusFilter("overdue")}>Overdue</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
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
                          <div className="text-sm text-gray-400">ID: {campaign.id}</div>
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
                            value={(campaign.posts.completed / campaign.posts.target) * 100}
                            className="h-2"
                            indicatorClassName={getProgressColor(campaign.progress)}
                          />
                          <div className="text-xs text-gray-400">
                            {campaign.posts.completed}/{campaign.posts.target} posts
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {campaign.endDate}
                          {campaign.daysOverdue && (
                            <div className="text-red-400 text-xs">{campaign.daysOverdue} days overdue</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <CampaignActionsDropdown
                          campaign={campaign}
                          onEdit={(id) => console.log("Edit campaign:", id)}
                          onToggleStatus={(id) => console.log("Toggle status:", id)}
                          onViewAnalytics={handleAnalyticsClick}
                          onMessageCreators={(id) => console.log("Message creators:", id)}
                          onDelete={(id) => console.log("Delete campaign:", id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      <CampaignCreationModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />

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
