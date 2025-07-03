"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, BarChart3, MessageCircle, Download, Play, Heart, MessageSquare, Share2 } from "lucide-react"

interface ContentCardProps {
  post: any
  viewMode: "grid" | "list" | "performance"
  onViewPost: () => void
}

export function ContentCard({ post, viewMode, onViewPost }: ContentCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "🎵"
      case "instagram":
        return "📷"
      case "youtube":
        return "📺"
      default:
        return "📱"
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Viral":
        return "bg-red-600/20 text-red-300"
      case "High Converting":
        return "bg-green-600/20 text-green-300"
      case "Top Performer":
        return "bg-purple-600/20 text-purple-300"
      case "High Engagement":
        return "bg-blue-600/20 text-blue-300"
      case "Trending":
        return "bg-yellow-600/20 text-yellow-300"
      default:
        return "bg-gray-600/20 text-gray-300"
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={post.thumbnail || "/placeholder.svg"}
                alt="Content thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
              )}
              <div className="absolute top-1 right-1">
                <span className="text-xs">{getPlatformIcon(post.platform)}</span>
              </div>
              {post.duration && (
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {post.duration}
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.creator.name}</span>
                  <span className="text-gray-400 text-sm">{post.creator.handle}</span>
                  <Badge className={getBadgeColor(post.performanceBadge)}>{post.performanceBadge}</Badge>
                </div>
                <span className="text-sm text-gray-400">{post.postDate}</span>
              </div>

              <p className="text-sm text-gray-300 mb-3 line-clamp-2">{post.caption}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-semibold">{post.metrics.views}</div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{post.metrics.engagementRate}</div>
                  <div className="text-xs text-gray-400">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-400">{post.business.gmv}</div>
                  <div className="text-xs text-gray-400">GMV</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-400">{post.business.roi}</div>
                  <div className="text-xs text-gray-400">ROI</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={onViewPost}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Post
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <CardContent className="p-0">
        {/* Media Preview */}
        <div className="relative aspect-square">
          <img
            src={post.thumbnail || "/placeholder.svg"}
            alt="Content thumbnail"
            className="w-full h-full object-cover"
          />

          {/* Platform Badge */}
          <div className="absolute top-2 left-2">
            <span className="text-lg">{getPlatformIcon(post.platform)}</span>
          </div>

          {/* Performance Badge */}
          <div className="absolute top-2 right-2">
            <Badge className={getBadgeColor(post.performanceBadge)}>{post.performanceBadge}</Badge>
          </div>

          {/* Video Duration */}
          {post.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {post.duration}
            </div>
          )}

          {/* Play Button for Videos */}
          {post.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 rounded-full p-3">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="p-4">
          {/* Creator Attribution */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{post.creator.name}</div>
              <div className="text-xs text-gray-400">{post.creator.handle}</div>
            </div>
            <div className="text-xs text-gray-400">{post.postDate}</div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-gray-400" />
              <span>{post.metrics.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-gray-400" />
              <span>{post.metrics.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-gray-400" />
              <span>{post.metrics.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-3 w-3 text-gray-400" />
              <span>{post.metrics.shares}</span>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="text-center mb-3">
            <div className="text-lg font-semibold text-purple-400">{post.metrics.engagementRate}</div>
            <div className="text-xs text-gray-400">Engagement Rate</div>
          </div>

          {/* Business Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-400">{post.business.gmv}</div>
              <div className="text-xs text-gray-400">GMV</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{post.business.conversionRate}</div>
              <div className="text-xs text-gray-400">Conversion</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={onViewPost}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
