"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MessageSquare, TrendingUp, Package, Clock, CheckCircle } from "lucide-react"

export function ApprovedActiveTab() {
  const approvedCreators = [
    {
      id: "1",
      name: "Emma Rodriguez",
      handle: "@emmarod_style",
      approvalDate: "2024-03-10",
      sampleStatus: "Delivered",
      contentStatus: "In Progress",
      postsCompleted: 3,
      postsRequired: 5,
      gmvGenerated: 2340,
      totalViews: "125K",
      daysUntilDeadline: 5,
    },
    {
      id: "2",
      name: "Marcus Johnson",
      handle: "@marcusjfit",
      approvalDate: "2024-03-08",
      sampleStatus: "Shipped",
      contentStatus: "Posted",
      postsCompleted: 5,
      postsRequired: 5,
      gmvGenerated: 3200,
      totalViews: "89K",
      daysUntilDeadline: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-400"
      case "Shipped":
        return "text-blue-400"
      case "Posted":
        return "text-green-400"
      case "In Progress":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      case "Shipped":
        return <Package className="h-4 w-4" />
      case "Posted":
        return <CheckCircle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Top Performer</div>
            <div className="text-lg font-bold">Emma Rodriguez</div>
            <div className="text-sm text-green-400">$8,540 GMV</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Average Performance</div>
            <div className="text-lg font-bold">$2,660</div>
            <div className="text-sm text-gray-400">GMV per creator</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Content Completion</div>
            <div className="text-lg font-bold">78%</div>
            <div className="text-sm text-gray-400">of required posts</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Sample Delivery</div>
            <div className="text-lg font-bold">12/17</div>
            <div className="text-sm text-gray-400">samples delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Creators</SelectItem>
            <SelectItem value="high-performers">High Performers</SelectItem>
            <SelectItem value="on-track">On Track</SelectItem>
            <SelectItem value="behind">Behind Schedule</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
            <SelectValue placeholder="Content progress" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Progress</SelectItem>
            <SelectItem value="ahead">Ahead</SelectItem>
            <SelectItem value="on-time">On Time</SelectItem>
            <SelectItem value="behind">Behind</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Creator Performance Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Active Creator Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvedCreators.map((creator) => (
              <div
                key={creator.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${creator.name.split(" ")[0]}`} />
                    <AvatarFallback>
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{creator.name}</div>
                    <div className="text-sm text-purple-400">{creator.handle}</div>
                    <div className="text-xs text-gray-400">Approved {creator.approvalDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Sample Status</div>
                    <div
                      className={`text-sm font-semibold flex items-center gap-1 ${getStatusColor(creator.sampleStatus)}`}
                    >
                      {getStatusIcon(creator.sampleStatus)}
                      {creator.sampleStatus}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Content Status</div>
                    <div
                      className={`text-sm font-semibold flex items-center gap-1 ${getStatusColor(creator.contentStatus)}`}
                    >
                      {getStatusIcon(creator.contentStatus)}
                      {creator.contentStatus}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Posts</div>
                    <div className="text-sm font-semibold">
                      {creator.postsCompleted}/{creator.postsRequired}
                    </div>
                    <div className="w-16 bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(creator.postsCompleted / creator.postsRequired) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">GMV Generated</div>
                    <div className="text-sm font-semibold text-green-400">${creator.gmvGenerated.toLocaleString()}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Views</div>
                    <div className="text-sm font-semibold">{creator.totalViews}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Timeline</div>
                    <div
                      className={`text-sm font-semibold ${creator.daysUntilDeadline <= 2 ? "text-red-400" : creator.daysUntilDeadline <= 5 ? "text-yellow-400" : "text-green-400"}`}
                    >
                      {creator.daysUntilDeadline === 0 ? "Complete" : `${creator.daysUntilDeadline} days`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
