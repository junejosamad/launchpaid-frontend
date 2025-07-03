"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, UserPlus, FileText, Package, TrendingUp, MessageSquare } from "lucide-react"

export function RecentActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "creator_application",
      icon: UserPlus,
      title: "New Creator Applications",
      description: "3 new creators pending your approval",
      time: "2 hours ago",
      priority: "high",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      type: "content_published",
      icon: FileText,
      title: "Content Published",
      description: "Jana B. posted new TikTok - 15K views in 2 hours",
      time: "4 hours ago",
      priority: "medium",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      type: "shipping_update",
      icon: Package,
      title: "Shipping Update",
      description: "Tracking added for Tyler A. - SMS sent automatically",
      time: "6 hours ago",
      priority: "low",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      type: "performance_milestone",
      icon: TrendingUp,
      title: "Performance Milestone",
      description: "Campaign reached 75% of GMV goal",
      time: "1 day ago",
      priority: "high",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      type: "agency_update",
      icon: MessageSquare,
      title: "Agency Update",
      description: "Creator Circle updated campaign guidelines",
      time: "1 day ago",
      priority: "medium",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "creator_application":
        return "text-purple-400"
      case "content_published":
        return "text-blue-400"
      case "shipping_update":
        return "text-orange-400"
      case "performance_milestone":
        return "text-green-400"
      case "agency_update":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Campaign Activity
          </CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Activity</SelectItem>
              <SelectItem value="approvals">Creator Approvals</SelectItem>
              <SelectItem value="content">Content Updates</SelectItem>
              <SelectItem value="shipping">Shipping Events</SelectItem>
              <SelectItem value="performance">Performance Alerts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className={`p-4 bg-gray-800 rounded-lg border-l-4 ${getPriorityColor(activity.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gray-700 rounded-lg ${getIconColor(activity.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{activity.title}</h4>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                    {activity.type === "creator_application" && (
                      <div className="mt-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Review Now
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
