"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Heart, Share, Download, Eye, TrendingUp } from "lucide-react"

export function ContentPerformanceGrid() {
  const contentData = [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "video",
      creator: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 125400,
        engagement: 8.2,
        gmv: 2340,
        conversion: 4.1,
      },
      performance: "viral",
      title: "Summer Styling Tips",
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "video",
      creator: {
        name: "Jake Thompson",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 89200,
        engagement: 6.8,
        gmv: 1890,
        conversion: 3.2,
      },
      performance: "high-converting",
      title: "Product Unboxing",
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "image",
      creator: {
        name: "Sofia Chen",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 67800,
        engagement: 7.5,
        gmv: 1560,
        conversion: 2.8,
      },
      performance: "trending",
      title: "Outfit of the Day",
    },
    {
      id: 4,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "video",
      creator: {
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 45600,
        engagement: 5.4,
        gmv: 980,
        conversion: 2.1,
      },
      performance: "standard",
      title: "Fashion Haul",
    },
    {
      id: 5,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "video",
      creator: {
        name: "Aria Patel",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 34200,
        engagement: 4.2,
        gmv: 720,
        conversion: 1.9,
      },
      performance: "standard",
      title: "Accessories Guide",
    },
    {
      id: 6,
      thumbnail: "/placeholder.svg?height=120&width=120",
      type: "image",
      creator: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      metrics: {
        views: 28900,
        engagement: 3.8,
        gmv: 540,
        conversion: 1.6,
      },
      performance: "underperforming",
      title: "Behind the Scenes",
    },
  ]

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "viral":
        return <Badge className="bg-red-600 text-white">Viral</Badge>
      case "high-converting":
        return <Badge className="bg-green-600 text-white">High Converting</Badge>
      case "trending":
        return <Badge className="bg-purple-600 text-white">Trending</Badge>
      case "underperforming":
        return <Badge className="bg-gray-600 text-white">Needs Boost</Badge>
      default:
        return <Badge className="bg-blue-600 text-white">Standard</Badge>
    }
  }

  const contentCategories = [
    { label: "Viral Content (>100K views)", count: 3, color: "text-red-400" },
    { label: "High Converting (>5% conversion)", count: 12, color: "text-green-400" },
    { label: "Trending (rapid growth)", count: 8, color: "text-purple-400" },
    { label: "Underperforming (<1K views)", count: 2, color: "text-gray-400" },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Content Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Categories */}
        <div className="grid grid-cols-2 gap-4">
          {contentCategories.map((category, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded-lg">
              <div className={`text-sm font-medium ${category.color}`}>{category.label}</div>
              <div className="text-xl font-bold text-white">{category.count}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentData.map((content) => (
            <div
              key={content.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-700">
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                {content.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2">{getPerformanceBadge(content.performance)}</div>
              </div>

              {/* Content Info */}
              <div className="p-4 space-y-3">
                {/* Creator */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={content.creator.avatar || "/placeholder.svg"} alt={content.creator.name} />
                    <AvatarFallback className="text-xs">
                      {content.creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">{content.creator.name}</span>
                </div>

                {/* Title */}
                <h4 className="font-medium text-white text-sm">{content.title}</h4>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-400">Views</div>
                    <div className="text-white font-medium">
                      {content.metrics.views > 1000
                        ? `${(content.metrics.views / 1000).toFixed(1)}K`
                        : content.metrics.views}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Engagement</div>
                    <div className="text-white font-medium">{content.metrics.engagement}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">GMV</div>
                    <div className="text-white font-medium">${content.metrics.gmv.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Conversion</div>
                    <div className="text-white font-medium">{content.metrics.conversion}%</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    <Eye className="h-4 w-4 mr-1" />
                    View Post
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Trends Analysis */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="font-medium text-white mb-3">Content Trends Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400 mb-1">Best Performing Content Types</div>
              <div className="text-white">Product demos, styling videos</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Optimal Posting Times</div>
              <div className="text-white">2-4 PM, 7-9 PM EST</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Top Hashtags</div>
              <div className="text-white">#SummerFashion, #StyleTips, #OOTD</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Format Performance</div>
              <div className="text-white">Video: 73% higher engagement</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
