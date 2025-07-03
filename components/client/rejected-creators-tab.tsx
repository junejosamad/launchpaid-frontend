"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RotateCcw, MessageSquare, BarChart3 } from "lucide-react"

export function RejectedCreatorsTab() {
  const rejectedCreators = [
    {
      id: "1",
      name: "Alex Thompson",
      handle: "@alexthompson",
      rejectionDate: "2024-03-12",
      rejectionReason: "Audience demographic mismatch",
      agencyResponse: "Acknowledged. Will focus on better demographic alignment for future recommendations.",
      canReconsider: true,
    },
    {
      id: "2",
      name: "Jessica Park",
      handle: "@jessicapark",
      rejectionDate: "2024-03-11",
      rejectionReason: "Content style not aligned",
      agencyResponse: "Understood. Will provide more brand-aligned alternatives.",
      canReconsider: false,
    },
  ]

  const rejectionReasons = [
    { reason: "Audience demographic mismatch", percentage: 40, color: "bg-red-500" },
    { reason: "Content style not aligned", percentage: 25, color: "bg-orange-500" },
    { reason: "Engagement rate too low", percentage: 20, color: "bg-yellow-500" },
    { reason: "Brand safety concerns", percentage: 15, color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Rejection Analytics */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rejection Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-gray-400 mb-3">Most Common Rejection Reasons:</div>
            {rejectionReasons.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.reason}</span>
                  <span className="text-sm font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <div className="text-sm font-semibold text-blue-400 mb-1">Agency Learning</div>
            <div className="text-xs text-gray-400">
              Feedback has been shared with the agency to improve future creator recommendations and better align with
              your brand requirements.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rejected Creator List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Rejected Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rejectedCreators.map((creator) => (
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
                    <div className="text-xs text-gray-400">Rejected {creator.rejectionDate}</div>
                  </div>
                </div>

                <div className="flex-1 mx-6">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-gray-400">Rejection Reason:</div>
                      <Badge variant="outline" className="border-red-700 text-red-400">
                        {creator.rejectionReason}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Agency Response:</div>
                      <div className="text-sm text-gray-300">{creator.agencyResponse}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Agency
                  </Button>
                  {creator.canReconsider && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-700 text-purple-400 hover:bg-purple-900 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reconsider
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
