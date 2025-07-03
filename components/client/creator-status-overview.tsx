"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, Package, XCircle, AlertTriangle } from "lucide-react"

export function CreatorStatusOverview() {
  const statusCards = [
    {
      title: "Pending Your Approval",
      count: 8,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      details: "3 urgent (agency recommended)",
      action: "Review within 24 hours",
      buttonText: "Review All",
      buttonVariant: "default" as const,
    },
    {
      title: "Approved & Active",
      count: 17,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      details: "Creating content",
      action: "Avg GMV: $2,660",
      buttonText: "View Performance",
      buttonVariant: "outline" as const,
    },
    {
      title: "Shipped Samples",
      count: 12,
      icon: Package,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      details: "Samples delivered",
      action: "Content due in 5 days",
      buttonText: "Track Progress",
      buttonVariant: "outline" as const,
    },
    {
      title: "Rejected",
      count: 5,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      details: "Most common: Audience mismatch",
      action: "Feedback sent to agency",
      buttonText: "View Rejections",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statusCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                {card.title === "Pending Your Approval" && card.count > 0 && (
                  <div className="flex items-center text-yellow-400">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Urgent</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-200">{card.title}</h3>
                <div className="text-3xl font-bold">{card.count}</div>
                <div className="text-sm text-gray-400">{card.details}</div>
                <div className="text-sm text-gray-300">{card.action}</div>
              </div>

              <Button variant={card.buttonVariant} size="sm" className="w-full mt-4">
                {card.buttonText}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
