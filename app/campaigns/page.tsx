"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Search,
  Calendar,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react"

import { useCampaigns } from "@/hooks/useCampaigns"
import { useAuth } from "@/hooks/useAuth"
import type { Campaign } from "@/lib/types/api"

export default function CampaignsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [payoutFilter, setPayoutFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const { campaigns, loading, error, applyCampaign, refetch } = useCampaigns({
    search: searchQuery,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
    payoutType: payoutFilter !== "all" ? payoutFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  })

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showCapacityModal, setShowCapacityModal] = useState(false)
  const [appliedCampaigns, setAppliedCampaigns] = useState<string[]>([])

  const handleApply = async (campaignId: string) => {
    if (!user) {
      setShowProfileModal(true)
      return
    }

    const result = await applyCampaign(campaignId)
    if (result.success) {
      setAppliedCampaigns([...appliedCampaigns, campaignId])
    } else {
      // Handle error - could show a toast notification
      console.error("Application failed:", result.error)
    }
  }

  const getStatusBadge = (campaign: Campaign) => {
    switch (campaign.status) {
      case "active":
        return <Badge className="bg-green-600 hover:bg-green-700">Open</Badge>
      case "paused":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Closing Soon</Badge>
      case "completed":
        return <Badge className="bg-gray-600 hover:bg-gray-700">Full</Badge>
      default:
        return <Badge className="bg-blue-600 hover:bg-blue-700">{campaign.status}</Badge>
    }
  }

  const getActionButton = (campaign: Campaign) => {
    if (appliedCampaigns.includes(campaign.id)) {
      return (
        <Button disabled className="w-full bg-blue-600/20 text-blue-400 border border-blue-600/30">
          <Clock className="h-4 w-4 mr-2" />
          Application Pending
        </Button>
      )
    }

    if (campaign.capacity.filled >= campaign.capacity.total) {
      return (
        <Button disabled className="w-full bg-gray-600/20 text-gray-400 border border-gray-600/30">
          Campaign Full
        </Button>
      )
    }

    return (
      <Button onClick={() => handleApply(campaign.id)} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Apply Now
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px] min-h-screen">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading campaigns...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px] min-h-screen">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-400 mb-4">Error loading campaigns: {error}</p>
                <Button onClick={refetch} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Available Campaigns</h1>
            <p className="text-gray-400 text-lg">Discover brand partnerships and start earning</p>
          </div>

          {/* Filters & Search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-800 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={payoutFilter} onValueChange={setPayoutFilter}>
                  <SelectTrigger className="w-[140px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Payout Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="per-post">Per Post</SelectItem>
                    <SelectItem value="gmv">GMV Based</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px] bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Open</SelectItem>
                    <SelectItem value="paused">Closing Soon</SelectItem>
                    <SelectItem value="completed">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-800 overflow-hidden">
                        <Image
                          src={campaign.brand.logo || "/placeholder.svg"}
                          alt={campaign.brand.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                        <p className="text-gray-400 text-sm">{campaign.brand.name}</p>
                      </div>
                    </div>
                    {getStatusBadge(campaign)}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-500">
                      {Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                      days left to apply
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{campaign.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">
                        {campaign.requirements.deliverables.length} deliverables required
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">
                        {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">
                        {campaign.capacity.filled}/{campaign.capacity.total} creators
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-400">
                        {campaign.payoutStructure.type === "per-post" &&
                          `$${campaign.payoutStructure.baseRate} per post`}
                        {campaign.payoutStructure.type === "gmv" &&
                          `${campaign.payoutStructure.commissionRate}% commission`}
                        {campaign.payoutStructure.type === "hybrid" &&
                          `$${campaign.payoutStructure.baseRate} + ${campaign.payoutStructure.commissionRate}% commission`}
                      </span>
                    </div>

                    {campaign.payoutStructure.bonusTiers && campaign.payoutStructure.bonusTiers.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">Bonus tiers available</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-purple-400">Budget: ${campaign.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 space-y-3">
                  {getActionButton(campaign)}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCampaign(campaign)}
                    className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>

      {/* Campaign Detail Modal */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-gray-800 overflow-hidden">
                    <Image
                      src={selectedCampaign.brand.logo || "/placeholder.svg"}
                      alt={selectedCampaign.brand.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedCampaign.title}</DialogTitle>
                    <p className="text-gray-400">{selectedCampaign.brand.name}</p>
                  </div>
                </div>
              </DialogHeader>

              <DialogDescription asChild>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">{selectedCampaign.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Campaign Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-400" />
                          <span>{selectedCampaign.requirements.deliverables.length} deliverables required</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          <span>
                            {new Date(selectedCampaign.startDate).toLocaleDateString()} -{" "}
                            {new Date(selectedCampaign.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>
                            {selectedCampaign.capacity.filled}/{selectedCampaign.capacity.total} creators
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Payout Structure</h4>
                      <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">
                            {selectedCampaign.payoutStructure.type === "per-post" &&
                              `$${selectedCampaign.payoutStructure.baseRate} per post`}
                            {selectedCampaign.payoutStructure.type === "gmv" &&
                              `${selectedCampaign.payoutStructure.commissionRate}% commission`}
                            {selectedCampaign.payoutStructure.type === "hybrid" &&
                              `$${selectedCampaign.payoutStructure.baseRate} + ${selectedCampaign.payoutStructure.commissionRate}% commission`}
                          </span>
                        </div>
                        {selectedCampaign.payoutStructure.bonusTiers &&
                          selectedCampaign.payoutStructure.bonusTiers.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="text-yellow-400 text-sm">Bonus tiers available</span>
                            </div>
                          )}
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-400 text-sm">
                            Budget: ${selectedCampaign.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogDescription>

              <DialogFooter>{getActionButton(selectedCampaign)}</DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Completion Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Complete Your Profile
            </DialogTitle>
            <DialogDescription>
              Finish your profile to apply for brand deals and start earning with top campaigns.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>
              Cancel
            </Button>
            <Link href="/profile">
              <Button className="bg-purple-600 hover:bg-purple-700">Complete Profile</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Capacity Warning Modal */}
      <Dialog open={showCapacityModal} onOpenChange={setShowCapacityModal}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              You're at Campaign Capacity
            </DialogTitle>
            <DialogDescription>
              You're registered for the maximum number of campaigns. Complete current campaigns or request a capacity
              increase.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCapacityModal(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Request Capacity Increase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
