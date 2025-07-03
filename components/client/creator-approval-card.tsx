"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Eye, MessageSquare, Star, TrendingUp, MapPin } from "lucide-react"

interface CreatorApprovalCardProps {
  creator: any
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onViewProfile: () => void
}

export function CreatorApprovalCard({ creator, isSelected, onSelect, onViewProfile }: CreatorApprovalCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleApprove = async () => {
    setIsApproving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsApproving(false)
    // Handle approval logic
  }

  const handleReject = async () => {
    setIsRejecting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRejecting(false)
    // Handle rejection logic
  }

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={isSelected} onCheckedChange={onSelect} className="border-gray-600" />
            <Avatar className="h-16 w-16">
              <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${creator.name.split(" ")[0]}`} />
              <AvatarFallback>
                {creator.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <Badge
            variant={creator.priority === "High Priority" ? "default" : "secondary"}
            className={creator.priority === "High Priority" ? "bg-red-600" : "bg-yellow-600"}
          >
            {creator.priority}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{creator.name}</h3>
            <p className="text-purple-400">{creator.handle}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-800">
            <div>
              <div className="text-sm text-gray-400">Followers</div>
              <div className="font-semibold">{creator.followers}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Engagement</div>
              <div className="font-semibold flex items-center gap-1">
                {creator.engagementRate}%
                <TrendingUp className="h-3 w-3 text-green-400" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Previous GMV</div>
              <div className="font-semibold text-green-400">${creator.previousGMV.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Content Score</div>
              <div className="font-semibold flex items-center gap-1">
                {creator.contentScore}
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>

          {/* Audience Insights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Demographics:</span>
              <span>
                👨 {creator.demographics.male}% / 👩 {creator.demographics.female}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Primary Age:</span>
              <span>{creator.primaryAge}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400">{creator.location}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Brand Fit:</span>
              <span className="text-green-400 font-semibold">{creator.brandFit}%</span>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Recent Posts:</div>
            <div className="flex gap-2">
              {creator.recentPosts.map((post: string, index: number) => (
                <div key={index} className="w-12 h-12 bg-gray-800 rounded border border-gray-700">
                  <img
                    src={post || "/placeholder.svg"}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {creator.contentTags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-gray-400">Avg {creator.avgViews} views per post</div>
          </div>

          {/* Agency Notes */}
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Agency Notes:</div>
            <div className="text-sm">{creator.agencyNotes}</div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewProfile}
              className="border-gray-700 hover:bg-gray-800 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Info
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              disabled={isRejecting}
              className="border-red-700 text-red-400 hover:bg-red-900 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              {isRejecting ? "Rejecting..." : "Reject"}
            </Button>
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={isApproving}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              {isApproving ? "Approving..." : "Approve"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
