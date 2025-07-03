"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreatorApprovalCard } from "./creator-approval-card"
import { CreatorProfileModal } from "./creator-profile-modal"
import { Search, Filter, Users } from "lucide-react"

interface PendingApprovalTabProps {
  selectedCreators: string[]
  setSelectedCreators: (creators: string[]) => void
}

export function PendingApprovalTab({ selectedCreators, setSelectedCreators }: PendingApprovalTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCreator, setSelectedCreator] = useState<any>(null)

  const pendingCreators = [
    {
      id: "1",
      name: "Emma Rodriguez",
      handle: "@emmarod_style",
      followers: "125.4K",
      engagementRate: 4.7,
      previousGMV: 8540,
      contentScore: 4.8,
      demographics: { male: 35, female: 65 },
      primaryAge: "18-24 (68%)",
      location: "Los Angeles, CA",
      brandFit: 92,
      priority: "High Priority",
      agencyNotes:
        "Strong audience alignment with target demo. Previous fashion campaigns performed exceptionally well.",
      recentPosts: [
        "/placeholder.svg?height=80&width=80&text=Post1",
        "/placeholder.svg?height=80&width=80&text=Post2",
        "/placeholder.svg?height=80&width=80&text=Post3",
      ],
      contentTags: ["Fashion", "Lifestyle", "Product Reviews"],
      avgViews: "45K",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      handle: "@marcusjfit",
      followers: "89.2K",
      engagementRate: 5.2,
      previousGMV: 6200,
      contentScore: 4.5,
      demographics: { male: 60, female: 40 },
      primaryAge: "18-24 (72%)",
      location: "Miami, FL",
      brandFit: 88,
      priority: "Recommended",
      agencyNotes: "High engagement rate and strong male audience. Great for athletic wear segments.",
      recentPosts: [
        "/placeholder.svg?height=80&width=80&text=Fitness1",
        "/placeholder.svg?height=80&width=80&text=Fitness2",
        "/placeholder.svg?height=80&width=80&text=Fitness3",
      ],
      contentTags: ["Fitness", "Fashion", "Lifestyle"],
      avgViews: "38K",
    },
    {
      id: "3",
      name: "Sophia Chen",
      handle: "@sophiastyle",
      followers: "156.8K",
      engagementRate: 3.9,
      previousGMV: 9800,
      contentScore: 4.9,
      demographics: { male: 25, female: 75 },
      primaryAge: "25-34 (55%)",
      location: "New York, NY",
      brandFit: 95,
      priority: "High Priority",
      agencyNotes: "Premium audience with high purchasing power. Excellent content quality and brand alignment.",
      recentPosts: [
        "/placeholder.svg?height=80&width=80&text=Style1",
        "/placeholder.svg?height=80&width=80&text=Style2",
        "/placeholder.svg?height=80&width=80&text=Style3",
      ],
      contentTags: ["High Fashion", "Luxury", "Lifestyle"],
      avgViews: "52K",
    },
  ]

  const handleCreatorSelect = (creatorId: string, selected: boolean) => {
    if (selected) {
      setSelectedCreators([...selectedCreators, creatorId])
    } else {
      setSelectedCreators(selectedCreators.filter((id) => id !== creatorId))
    }
  }

  const handleSelectAll = () => {
    if (selectedCreators.length === pendingCreators.length) {
      setSelectedCreators([])
    } else {
      setSelectedCreators(pendingCreators.map((c) => c.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, handle, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Select value={audienceFilter} onValueChange={setAudienceFilter}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue placeholder="Audience Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">{"<10K"}</SelectItem>
              <SelectItem value="medium">10K-50K</SelectItem>
              <SelectItem value="large">50K-100K</SelectItem>
              <SelectItem value="mega">100K+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-gray-700 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCreators.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-purple-600/10 border border-purple-600/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300">
              {selectedCreators.length} creator{selectedCreators.length !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              Request More Info
            </Button>
            <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900 bg-transparent">
              Reject Selected
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Approve Selected
            </Button>
          </div>
        </div>
      )}

      {/* Select All Toggle */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleSelectAll} className="text-purple-400 hover:text-purple-300">
          {selectedCreators.length === pendingCreators.length ? "Deselect All" : "Select All"}
        </Button>
        <div className="text-sm text-gray-400">{pendingCreators.length} creators pending approval</div>
      </div>

      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pendingCreators.map((creator) => (
          <CreatorApprovalCard
            key={creator.id}
            creator={creator}
            isSelected={selectedCreators.includes(creator.id)}
            onSelect={(selected) => handleCreatorSelect(creator.id, selected)}
            onViewProfile={() => setSelectedCreator(creator)}
          />
        ))}
      </div>

      {/* Creator Profile Modal */}
      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          isOpen={!!selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}
    </div>
  )
}
