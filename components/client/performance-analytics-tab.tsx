"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Eye, Play } from "lucide-react"

export function PerformanceAnalyticsTab() {
  const topPerformingContent = [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=120&width=120",
      title: "Summer Haul - You won't believe these pieces!",
      creator: "Zoe Martinez",
      views: "156.7K",
      engagement: "4.3%",
      gmv: "$3,120",
      badge: "Viral",
      isVideo: true,
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=120&width=120",
      title: "3 ways to style this amazing dress!",
      creator: "Emma Rodriguez",
      views: "125.4K",
      engagement: "4.7%",
      gmv: "$2,340",
      badge: "High Converting",
      isVideo: true,
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=120&width=120",
      title: "This collection has my heart! Perfect summer essentials",
      creator: "Sophie Kim",
      views: "89.2K",
      engagement: "6.1%",
      gmv: "$1,890",
      badge: "High Engagement",
      isVideo: false,
    },
  ]

  const performanceData = [
    {
      title: "Views Over Time",
      description: "Content performance trends",
      chart: "line",
      data: "2.4M total views this month",
    },
    {
      title: "Engagement by Creator",
      description: "Creator performance comparison",
      chart: "bar",
      data: "17 active creators",
    },
    {
      title: "GMV Attribution",
      description: "Revenue by creator breakdown",
      chart: "pie",
      data: "$45,230 total GMV",
    },
    {
      title: "Content Type Performance",
      description: "Video vs Image analysis",
      chart: "comparison",
      data: "Video: 78% of GMV",
    },
  ]

  const contentAnalyticsData = [
    {
      thumbnail: "/placeholder.svg?height=60&width=60",
      creator: "Emma Rodriguez",
      published: "2 days ago",
      views: "125.4K",
      engagement: "4.7%",
      gmv: "$2,340",
      conversion: "3.2%",
      trend: "+12%",
      isVideo: true,
    },
    {
      thumbnail: "/placeholder.svg?height=60&width=60",
      creator: "Alex Chen",
      published: "1 day ago",
      views: "89.2K",
      engagement: "5.2%",
      gmv: "$1,890",
      conversion: "4.1%",
      trend: "+8%",
      isVideo: false,
    },
    {
      thumbnail: "/placeholder.svg?height=60&width=60",
      creator: "Zoe Martinez",
      published: "5 days ago",
      views: "156.7K",
      engagement: "4.3%",
      gmv: "$3,120",
      conversion: "3.8%",
      trend: "+15%",
      isVideo: true,
    },
    {
      thumbnail: "/placeholder.svg?height=60&width=60",
      creator: "Maya Patel",
      published: "3 days ago",
      views: "67.8K",
      engagement: "3.9%",
      gmv: "$1,456",
      conversion: "2.8%",
      trend: "+5%",
      isVideo: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Performing Content */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            Top Performing Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformingContent.map((content) => (
              <div key={content.id} className="bg-black rounded-lg p-4 border border-gray-800">
                <div className="relative mb-3">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt="Content thumbnail"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {content.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 bg-purple-600/20 text-purple-300">{content.badge}</Badge>
                </div>
                <h4 className="font-medium text-sm mb-2 line-clamp-2">{content.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{content.creator}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-semibold">{content.views}</div>
                    <div className="text-gray-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{content.engagement}</div>
                    <div className="text-gray-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-400">{content.gmv}</div>
                    <div className="text-gray-400">GMV</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceData.map((chart, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">{chart.title}</CardTitle>
              <p className="text-sm text-gray-400">{chart.description}</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-black rounded-lg border border-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{chart.data}</div>
                  <div className="text-sm text-gray-400">Chart visualization would go here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Analytics Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Content Analytics Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-2">Post</th>
                  <th className="text-left py-3 px-2">Creator</th>
                  <th className="text-left py-3 px-2">Published</th>
                  <th className="text-left py-3 px-2">Views</th>
                  <th className="text-left py-3 px-2">Engagement</th>
                  <th className="text-left py-3 px-2">GMV</th>
                  <th className="text-left py-3 px-2">Conversion</th>
                  <th className="text-left py-3 px-2">Trend</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentAnalyticsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt="Content"
                            className="w-full h-full object-cover rounded"
                          />
                          {item.isVideo && <Play className="absolute inset-0 m-auto h-4 w-4 text-white" />}
                        </div>
                        <div className="text-sm line-clamp-2 max-w-32">Content preview...</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm">{item.creator}</td>
                    <td className="py-3 px-2 text-sm text-gray-400">{item.published}</td>
                    <td className="py-3 px-2 text-sm font-semibold">{item.views}</td>
                    <td className="py-3 px-2 text-sm">{item.engagement}</td>
                    <td className="py-3 px-2 text-sm font-semibold text-green-400">{item.gmv}</td>
                    <td className="py-3 px-2 text-sm">{item.conversion}</td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-green-400">{item.trend}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <TrendingUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
