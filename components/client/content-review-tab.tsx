"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle, XCircle, MessageSquare, Eye, Play } from "lucide-react"

export function ContentReviewTab() {
  const [selectedContent, setSelectedContent] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")

  const pendingReviewContent = [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=200&width=200",
      creator: {
        name: "Jessica Liu",
        handle: "@jessicafashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      caption: "Loving this new summer collection! Perfect for beach days ☀️ #SummerFashion2024 #LaunchPaid #ad",
      platform: "tiktok",
      duration: "0:18",
      submittedDate: "2 hours ago",
      agencyNotes: "Strong audience alignment, good product showcase. Recommend approval.",
      priority: "High",
      isVideo: true,
      complianceChecks: {
        productFeatured: true,
        brandHashtags: true,
        ftcDisclosure: true,
        brandGuidelines: true,
      },
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=200&width=200",
      creator: {
        name: "Marcus Johnson",
        handle: "@marcusstyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      caption: "These pieces are incredible! Can't wait to style them for summer events 🔥",
      platform: "instagram",
      submittedDate: "4 hours ago",
      agencyNotes: "Missing FTC disclosure. Creator has been notified to update.",
      priority: "Medium",
      isVideo: false,
      complianceChecks: {
        productFeatured: true,
        brandHashtags: true,
        ftcDisclosure: false,
        brandGuidelines: true,
      },
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=200&width=200",
      creator: {
        name: "Aria Patel",
        handle: "@ariafashion",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      caption:
        "Summer haul! These pieces are so versatile and perfect for any occasion ✨ #SummerFashion2024 #sponsored",
      platform: "youtube",
      duration: "3:24",
      submittedDate: "6 hours ago",
      agencyNotes: "Excellent content quality. Minor concern about lighting in middle section.",
      priority: "Standard",
      isVideo: true,
      complianceChecks: {
        productFeatured: true,
        brandHashtags: true,
        ftcDisclosure: true,
        brandGuidelines: true,
      },
    },
  ]

  const handleApprove = (contentId: number) => {
    console.log(`Approved content ${contentId}`)
  }

  const handleReject = (contentId: number) => {
    console.log(`Rejected content ${contentId}`)
  }

  const handleRequestChanges = (contentId: number) => {
    console.log(`Requested changes for content ${contentId}`)
  }

  return (
    <div className="space-y-6">
      {/* Pending Review Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Content Awaiting Review ({pendingReviewContent.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pendingReviewContent.map((content) => (
              <div key={content.id} className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Content Preview */}
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={content.thumbnail || "/placeholder.svg"}
                        alt="Content preview"
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      {content.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-purple-600/20 text-purple-300">
                        {content.platform}
                      </Badge>
                      {content.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {content.duration}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={content.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{content.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{content.creator.name}</div>
                        <div className="text-sm text-gray-400">{content.creator.handle}</div>
                      </div>
                      <Badge
                        variant={
                          content.priority === "High"
                            ? "destructive"
                            : content.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {content.priority} Priority
                      </Badge>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Caption</h4>
                      <p className="text-sm text-gray-300 bg-gray-800 p-3 rounded-md">{content.caption}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Compliance Checks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {content.complianceChecks.productFeatured ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm">Product featured prominently</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {content.complianceChecks.brandHashtags ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm">Brand hashtags included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {content.complianceChecks.ftcDisclosure ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm">FTC disclosure present</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {content.complianceChecks.brandGuidelines ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm">Brand guidelines followed</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Agency Notes</h4>
                      <p className="text-sm text-gray-300 bg-gray-800 p-3 rounded-md">{content.agencyNotes}</p>
                    </div>

                    <div className="text-sm text-gray-400">Submitted: {content.submittedDate}</div>
                  </div>

                  {/* Review Actions */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Review Actions</h4>
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(content.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600/20 bg-transparent"
                          onClick={() => handleRequestChanges(content.id)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Request Changes
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-red-600 text-red-400 hover:bg-red-600/20 bg-transparent"
                          onClick={() => handleReject(content.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Add Feedback</h4>
                      <Textarea
                        placeholder="Provide specific feedback for the creator..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="bg-gray-800 border-gray-700 min-h-[100px]"
                      />
                      <Button size="sm" className="mt-2 w-full bg-transparent" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Feedback
                      </Button>
                    </div>

                    <Button variant="ghost" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback History */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Recent Feedback History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-black rounded-lg border border-gray-800">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Emma Rodriguez</span>
                  <Badge className="bg-green-600/20 text-green-300">Approved</Badge>
                  <span className="text-sm text-gray-400">2 days ago</span>
                </div>
                <p className="text-sm text-gray-300">
                  "Great content! Love how you showcased the versatility of the pieces. The lighting and styling were
                  perfect."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-black rounded-lg border border-gray-800">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Alex Chen</span>
                  <Badge className="bg-yellow-600/20 text-yellow-300">Changes Requested</Badge>
                  <span className="text-sm text-gray-400">3 days ago</span>
                </div>
                <p className="text-sm text-gray-300">
                  "Please add the FTC disclosure as required. Also, could you include more shots of the product details?
                  Otherwise looks great!"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
