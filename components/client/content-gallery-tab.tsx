"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentCard } from "./content-card"
import { PostAnalysisModal } from "./post-analysis-modal"
import { Grid, List, BarChart3 } from "lucide-react"

export function ContentGalleryTab() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "performance">("grid")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  // Mock content data
  const contentData = [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "tiktok",
      duration: "0:15",
      performanceBadge: "Viral",
      creator: {
        name: "Emma Rodriguez",
        handle: "@emmarod",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "2 days ago",
      metrics: {
        views: "125.4K",
        likes: "8.2K",
        comments: "847",
        shares: "234",
        engagementRate: "4.7%",
      },
      business: {
        gmv: "$2,340",
        conversionRate: "3.2%",
        costPerView: "$0.08",
        roi: "4.2x",
      },
      caption: "Summer vibes with this amazing collection! 🌞 #SummerFashion2024 #LaunchPaid",
      isVideo: true,
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "instagram",
      performanceBadge: "High Converting",
      creator: {
        name: "Alex Chen",
        handle: "@alexstyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "1 day ago",
      metrics: {
        views: "89.2K",
        likes: "6.1K",
        comments: "523",
        shares: "156",
        engagementRate: "5.2%",
      },
      business: {
        gmv: "$1,890",
        conversionRate: "4.1%",
        costPerView: "$0.06",
        roi: "3.8x",
      },
      caption: "Obsessed with these pieces! Perfect for any occasion ✨",
      isVideo: false,
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "tiktok",
      duration: "0:30",
      performanceBadge: "Top Performer",
      creator: {
        name: "Maya Patel",
        handle: "@mayafashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "3 days ago",
      metrics: {
        views: "67.8K",
        likes: "4.3K",
        comments: "312",
        shares: "89",
        engagementRate: "3.9%",
      },
      business: {
        gmv: "$1,456",
        conversionRate: "2.8%",
        costPerView: "$0.09",
        roi: "3.2x",
      },
      caption: "Get ready with me using these stunning pieces! 💫",
      isVideo: true,
    },
    {
      id: 4,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "instagram",
      performanceBadge: "High Engagement",
      creator: {
        name: "Sophie Kim",
        handle: "@sophiestyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "4 days ago",
      metrics: {
        views: "45.6K",
        likes: "3.8K",
        comments: "267",
        shares: "78",
        engagementRate: "6.1%",
      },
      business: {
        gmv: "$987",
        conversionRate: "2.1%",
        costPerView: "$0.07",
        roi: "2.9x",
      },
      caption: "This collection has my heart! 💕 Perfect summer essentials",
      isVideo: false,
    },
    {
      id: 5,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "youtube",
      duration: "2:45",
      performanceBadge: "Trending",
      creator: {
        name: "Zoe Martinez",
        handle: "@zoefashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "5 days ago",
      metrics: {
        views: "156.7K",
        likes: "12.4K",
        comments: "1.2K",
        shares: "445",
        engagementRate: "4.3%",
      },
      business: {
        gmv: "$3,120",
        conversionRate: "3.8%",
        costPerView: "$0.05",
        roi: "5.1x",
      },
      caption: "HUGE Summer Fashion Haul! You won't believe these pieces 🔥",
      isVideo: true,
    },
    {
      id: 6,
      thumbnail: "/placeholder.svg?height=300&width=300",
      platform: "tiktok",
      duration: "0:22",
      performanceBadge: "High Converting",
      creator: {
        name: "Lily Zhang",
        handle: "@lilystyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      postDate: "6 days ago",
      metrics: {
        views: "78.3K",
        likes: "5.9K",
        comments: "423",
        shares: "167",
        engagementRate: "4.8%",
      },
      business: {
        gmv: "$1,678",
        conversionRate: "3.5%",
        costPerView: "$0.08",
        roi: "3.7x",
      },
      caption: "3 ways to style this amazing dress! Which is your fave? 👗",
      isVideo: true,
    },
  ]

  const openPostModal = (post: any) => {
    setSelectedPost(post)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Display Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">View:</span>
            <div className="flex border border-gray-700 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={`rounded-r-none ${viewMode === "grid" ? "bg-purple-600" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={`rounded-none border-x border-gray-700 ${viewMode === "list" ? "bg-purple-600" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "performance" ? "default" : "ghost"}
                size="sm"
                className={`rounded-l-none ${viewMode === "performance" ? "bg-purple-600" : ""}`}
                onClick={() => setViewMode("performance")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Select defaultValue="12">
            <SelectTrigger className="w-32 bg-black border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 per page</SelectItem>
              <SelectItem value="24">24 per page</SelectItem>
              <SelectItem value="48">48 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-400">Showing 1-6 of 145 posts</div>
      </div>

      {/* Content Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {contentData.map((post) => (
          <ContentCard key={post.id} post={post} viewMode={viewMode} onViewPost={() => openPostModal(post)} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
          Previous
        </Button>
        <Button variant="default" size="sm" className="bg-purple-600">
          1
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
          2
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
          3
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
          Next
        </Button>
      </div>

      {/* Post Analysis Modal */}
      {showModal && selectedPost && (
        <PostAnalysisModal post={selectedPost} isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
