"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, MessageSquare, Camera, TrendingUp, Calendar } from "lucide-react"

export function DeliveredTab() {
  const deliveredPackages = [
    {
      id: 1,
      creator: {
        name: "Zoe Williams",
        handle: "@zoewilliams",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      delivery: {
        date: "Jan 20, 2024",
        time: "2:34 PM",
        location: "Front door",
        photo: true,
        signature: false,
      },
      confirmation: {
        status: "confirmed",
        acknowledgedAt: "Jan 20, 2024 3:15 PM",
        condition: "Package in good condition",
      },
      content: {
        deadline: "Content due in 5 days",
        expected: "3 TikTok posts, 2 Instagram posts",
        progress: "Planning phase",
        unboxingShared: true,
      },
      feedback: {
        creatorNotes: "Love the summer collection! Perfect fit and colors are amazing.",
        productRating: 5,
        unboxingContent: "Shared unboxing story",
        issues: null,
      },
    },
    {
      id: 2,
      creator: {
        name: "Ryan Davis",
        handle: "@ryandavis",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      delivery: {
        date: "Jan 19, 2024",
        time: "11:22 AM",
        location: "Mailbox",
        photo: false,
        signature: true,
      },
      confirmation: {
        status: "confirmed",
        acknowledgedAt: "Jan 19, 2024 6:45 PM",
        condition: "All items received",
      },
      content: {
        deadline: "Content due in 6 days",
        expected: "2 TikTok posts, 1 Instagram reel",
        progress: "Content creation started",
        unboxingShared: false,
      },
      feedback: {
        creatorNotes: "Great quality products. Excited to create content!",
        productRating: 4,
        unboxingContent: null,
        issues: null,
      },
    },
    {
      id: 3,
      creator: {
        name: "Mia Johnson",
        handle: "@miajohnson",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      delivery: {
        date: "Jan 18, 2024",
        time: "4:15 PM",
        location: "Reception desk",
        photo: true,
        signature: true,
      },
      confirmation: {
        status: "pending",
        acknowledgedAt: null,
        condition: null,
      },
      content: {
        deadline: "Content due in 7 days",
        expected: "4 TikTok posts, 3 Instagram posts",
        progress: "Awaiting confirmation",
        unboxingShared: false,
      },
      feedback: {
        creatorNotes: null,
        productRating: null,
        unboxingContent: null,
        issues: null,
      },
    },
  ]

  const getConfirmationBadge = (status: string) => {
    if (status === "confirmed") {
      return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">✅ Confirmed</Badge>
    }
    return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">⏳ Pending</Badge>
  }

  const getProgressBadge = (progress: string) => {
    const progressMap = {
      "Planning phase": { color: "bg-blue-600/20 text-blue-400 border-blue-600/30", icon: "📋" },
      "Content creation started": { color: "bg-purple-600/20 text-purple-400 border-purple-600/30", icon: "🎬" },
      "Awaiting confirmation": { color: "bg-gray-600/20 text-gray-400 border-gray-600/30", icon: "⏳" },
    }
    const config = progressMap[progress as keyof typeof progressMap] || progressMap["Awaiting confirmation"]
    return (
      <Badge className={config.color}>
        {config.icon} {progress}
      </Badge>
    )
  }

  const renderStarRating = (rating: number | null) => {
    if (!rating) return <span className="text-gray-500">No rating</span>
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-600"}>
            ⭐
          </span>
        ))}
        <span className="text-sm text-gray-400 ml-1">({rating}/5)</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Delivered Packages</h3>
          <p className="text-gray-400">8 packages successfully delivered to creators</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            <MessageSquare className="h-4 w-4 mr-2" />
            Request All Confirmations
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Send Content Reminders
          </Button>
        </div>
      </div>

      {/* Delivered Package Cards */}
      <div className="space-y-4">
        {deliveredPackages.map((pkg) => (
          <Card key={pkg.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Creator & Delivery Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={pkg.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {pkg.creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{pkg.creator.name}</h4>
                      <p className="text-sm text-gray-400">{pkg.creator.handle}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Delivered</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {pkg.delivery.date} at {pkg.delivery.time}
                    </div>
                    <div className="text-xs text-gray-500">📍 {pkg.delivery.location}</div>
                    <div className="flex items-center gap-2 text-xs">
                      {pkg.delivery.photo && <span className="text-green-400">📷 Photo</span>}
                      {pkg.delivery.signature && <span className="text-blue-400">✍️ Signature</span>}
                    </div>
                  </div>
                </div>

                {/* Confirmation Status */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Confirmation</span>
                    </div>
                    <div className="space-y-2">
                      {getConfirmationBadge(pkg.confirmation.status)}
                      {pkg.confirmation.acknowledgedAt && (
                        <div className="text-xs text-gray-400">Confirmed: {pkg.confirmation.acknowledgedAt}</div>
                      )}
                      {pkg.confirmation.condition && (
                        <div className="text-xs text-green-400">✅ {pkg.confirmation.condition}</div>
                      )}
                      {pkg.confirmation.status === "pending" && (
                        <div className="text-xs text-yellow-400">⏳ Awaiting creator confirmation</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Timeline */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Content Timeline</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-white font-medium">{pkg.content.deadline}</div>
                      <div className="text-xs text-gray-400">Expected: {pkg.content.expected}</div>
                      {getProgressBadge(pkg.content.progress)}
                      {pkg.content.unboxingShared && (
                        <div className="text-xs text-purple-400">📦 Unboxing content shared</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback & Actions */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Sample Feedback</span>
                    </div>
                    <div className="space-y-2">
                      {renderStarRating(pkg.feedback.productRating)}
                      {pkg.feedback.creatorNotes && (
                        <div className="text-xs text-gray-300 bg-gray-800 p-2 rounded">
                          💬 "{pkg.feedback.creatorNotes}"
                        </div>
                      )}
                      {pkg.feedback.unboxingContent && (
                        <div className="text-xs text-purple-400">🎥 {pkg.feedback.unboxingContent}</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {pkg.confirmation.status === "pending" ? (
                      <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Request Confirmation
                      </Button>
                    ) : (
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Calendar className="h-3 w-3 mr-1" />
                        Content Reminder
                      </Button>
                    )}
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                      >
                        <Camera className="h-3 w-3 mr-1" />
                        Unboxing
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Progress
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
