"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from "lucide-react"

export function ContentCalendarTab() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const calendarData = [
    {
      date: "2024-03-15",
      posts: [
        {
          id: 1,
          creator: "Emma Rodriguez",
          avatar: "/placeholder.svg?height=32&width=32",
          platform: "tiktok",
          time: "7:00 PM",
          status: "published",
          title: "Summer styling video",
        },
        {
          id: 2,
          creator: "Alex Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          platform: "instagram",
          time: "2:00 PM",
          status: "published",
          title: "Product showcase post",
        },
      ],
    },
    {
      date: "2024-03-16",
      posts: [
        {
          id: 3,
          creator: "Maya Patel",
          avatar: "/placeholder.svg?height=32&width=32",
          platform: "youtube",
          time: "12:00 PM",
          status: "scheduled",
          title: "Fashion haul video",
        },
      ],
    },
    {
      date: "2024-03-17",
      posts: [
        {
          id: 4,
          creator: "Sophie Kim",
          avatar: "/placeholder.svg?height=32&width=32",
          platform: "tiktok",
          time: "6:00 PM",
          status: "scheduled",
          title: "Get ready with me",
        },
        {
          id: 5,
          creator: "Zoe Martinez",
          avatar: "/placeholder.svg?height=32&width=32",
          platform: "instagram",
          time: "8:00 PM",
          status: "draft",
          title: "Outfit inspiration",
        },
      ],
    },
  ]

  const upcomingPosts = [
    {
      id: 1,
      creator: {
        name: "Maya Patel",
        handle: "@mayafashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      platform: "youtube",
      scheduledDate: "March 16, 2024",
      scheduledTime: "12:00 PM",
      title: "Summer Fashion Haul - 10 Must-Have Pieces",
      status: "scheduled",
      deliverable: "Product haul video",
    },
    {
      id: 2,
      creator: {
        name: "Sophie Kim",
        handle: "@sophiestyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      platform: "tiktok",
      scheduledDate: "March 17, 2024",
      scheduledTime: "6:00 PM",
      title: "Get Ready With Me - Summer Date Night",
      status: "scheduled",
      deliverable: "Styling video",
    },
    {
      id: 3,
      creator: {
        name: "Zoe Martinez",
        handle: "@zoefashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      platform: "instagram",
      scheduledDate: "March 17, 2024",
      scheduledTime: "8:00 PM",
      title: "5 Ways to Style This Dress",
      status: "draft",
      deliverable: "Styling carousel",
    },
  ]

  const creatorDeadlines = [
    {
      creator: "Jessica Liu",
      avatar: "/placeholder.svg?height=40&width=40",
      deliverable: "Product showcase video",
      dueDate: "March 18, 2024",
      status: "on-track",
      daysLeft: 2,
    },
    {
      creator: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      deliverable: "Styling photos (3 posts)",
      dueDate: "March 20, 2024",
      status: "behind",
      daysLeft: 4,
    },
    {
      creator: "Aria Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      deliverable: "Unboxing video",
      dueDate: "March 22, 2024",
      status: "ahead",
      daysLeft: 6,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600/20 text-green-300"
      case "scheduled":
        return "bg-blue-600/20 text-blue-300"
      case "draft":
        return "bg-yellow-600/20 text-yellow-300"
      case "on-track":
        return "bg-green-600/20 text-green-300"
      case "behind":
        return "bg-red-600/20 text-red-300"
      case "ahead":
        return "bg-purple-600/20 text-purple-300"
      default:
        return "bg-gray-600/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Calendar */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Content Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {calendarData.map((day) => (
                <div key={day.date} className="p-3 bg-black rounded-lg border border-gray-800">
                  <div className="font-medium mb-2">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="space-y-1">
                    {day.posts.map((post) => (
                      <div key={post.id} className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.creator[0]}</AvatarFallback>
                        </Avatar>
                        <span className="flex-1 truncate">{post.title}</span>
                        <Badge className={getStatusColor(post.status)} size="sm">
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 bg-black rounded-lg border border-gray-800">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{post.creator.name}</span>
                      <span className="text-sm text-gray-400">{post.creator.handle}</span>
                      <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                    </div>
                    <h4 className="font-medium mb-1">{post.title}</h4>
                    <div className="text-sm text-gray-400">
                      {post.deliverable} • {post.platform} • {post.scheduledDate} at {post.scheduledTime}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      Message Creator
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Creator Deadlines */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Creator Deadlines & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creatorDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-black rounded-lg border border-gray-800">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={deadline.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{deadline.creator[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{deadline.creator}</span>
                    <Badge className={getStatusColor(deadline.status)}>{deadline.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-300 mb-1">{deadline.deliverable}</div>
                  <div className="text-sm text-gray-400">
                    Due: {deadline.dueDate} ({deadline.daysLeft} days left)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {deadline.status === "on-track" && <CheckCircle className="h-5 w-5 text-green-400" />}
                  {deadline.status === "behind" && <AlertCircle className="h-5 w-5 text-red-400" />}
                  {deadline.status === "ahead" && <CheckCircle className="h-5 w-5 text-purple-400" />}

                  <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                    Check Progress
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">145</div>
            <div className="text-sm text-gray-400">Published</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
            <div className="text-sm text-gray-400">Scheduled</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">8</div>
            <div className="text-sm text-gray-400">In Review</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">23</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
