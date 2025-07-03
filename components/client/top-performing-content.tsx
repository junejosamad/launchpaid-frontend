"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share, Download, ExternalLink, Play } from "lucide-react"

export function TopPerformingContent() {
  const topContent = [
    {
      id: 1,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Emma Rodriguez",
        handle: "@emmarod",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "125.4K",
        gmv: "$2,340",
        engagement: "8.2%",
      },
      url: "https://tiktok.com/@emmarod/video/123",
    },
    {
      id: 2,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Sofia Chen",
        handle: "@sofiastyle",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "98.7K",
        gmv: "$1,890",
        engagement: "7.5%",
      },
      url: "https://tiktok.com/@sofiastyle/video/456",
    },
    {
      id: 3,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Jake Thompson",
        handle: "@jakethompson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "87.2K",
        gmv: "$1,650",
        engagement: "6.9%",
      },
      url: "https://tiktok.com/@jakethompson/video/789",
    },
    {
      id: 4,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Maya Patel",
        handle: "@mayastyle",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "76.8K",
        gmv: "$1,420",
        engagement: "6.3%",
      },
      url: "https://tiktok.com/@mayastyle/video/101",
    },
    {
      id: 5,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Alex Kim",
        handle: "@alexkimstyle",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "65.3K",
        gmv: "$1,280",
        engagement: "5.8%",
      },
      url: "https://tiktok.com/@alexkimstyle/video/112",
    },
    {
      id: 6,
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=120",
      creator: {
        name: "Zoe Williams",
        handle: "@zoewilliams",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      metrics: {
        views: "58.9K",
        gmv: "$1,150",
        engagement: "5.4%",
      },
      url: "https://tiktok.com/@zoewilliams/video/131",
    },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Top Campaign Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {topContent.map((content) => (
            <div key={content.id} className="group relative">
              <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt="Content thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">{content.type}</Badge>
              </div>

              <div className="mt-3 space-y-2">
                {/* Creator Info */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={content.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {content.creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white truncate">{content.creator.name}</div>
                    <div className="text-xs text-gray-400">{content.creator.handle}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Views</span>
                    <span className="text-white font-medium">{content.metrics.views}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">GMV</span>
                    <span className="text-green-400 font-medium">{content.metrics.gmv}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Engagement</span>
                    <span className="text-purple-400 font-medium">{content.metrics.engagement}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                    <Share className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            View All Content
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
