"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, AlertCircle, Users } from "lucide-react"

export function CreatorPipelineOverview() {
  const pendingCreators = [
    {
      id: 1,
      name: "Emma Rodriguez",
      handle: "@emmarod",
      followers: "125K",
      engagement: "6.8%",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jake Thompson",
      handle: "@jakethompson",
      followers: "89K",
      engagement: "5.2%",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sofia Chen",
      handle: "@sofiastyle",
      followers: "156K",
      engagement: "7.1%",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          Creator Management Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Breakdown */}
        <div className="space-y-4">
          {/* Pending Approval */}
          <div className="p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-yellow-400">Pending Your Approval (8)</span>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                Review All
              </Button>
            </div>
            <p className="text-sm text-gray-400 mb-3">Agency has pre-approved these creators for your review</p>

            {/* Creator Preview Cards */}
            <div className="space-y-2">
              {pendingCreators.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-white">{creator.name}</div>
                      <div className="text-xs text-gray-400">{creator.handle}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      {creator.followers} • {creator.engagement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmed & Active */}
          <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="font-medium text-green-400">Confirmed & Active (17)</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                View Performance
              </Button>
            </div>
            <p className="text-sm text-gray-400">Creators you've approved and are creating content</p>
          </div>

          {/* Shipping Required */}
          <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="font-medium text-red-400">Shipping Required (12)</span>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                Manage Shipping
              </Button>
            </div>
            <p className="text-sm text-gray-400">Approved creators awaiting sample shipment</p>
            <div className="mt-2">
              <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">3 overdue (3+ days)</Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            Bulk Approve
          </Button>
          <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            Quick Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
