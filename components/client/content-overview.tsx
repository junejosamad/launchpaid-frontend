"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, TrendingUp, Clock, DollarSign } from "lucide-react"

export function ContentOverview() {
  const overviewCards = [
    {
      title: "Total Content Published",
      count: "145",
      subtitle: "posts",
      growth: "+23 new posts",
      growthLabel: "This Week",
      trend: "+18% vs last week",
      icon: Eye,
      action: "View Latest",
      color: "text-blue-400",
    },
    {
      title: "Performance Highlights",
      count: "2.4M",
      subtitle: "views",
      growth: "Avg Engagement: 4.7%",
      growthLabel: "Viral Posts",
      trend: "3 posts >100K views",
      icon: TrendingUp,
      action: "Top Performers",
      color: "text-green-400",
    },
    {
      title: "Content Pipeline",
      count: "145",
      subtitle: "posted",
      growth: "8 pending review",
      growthLabel: "12 scheduled",
      trend: "Pipeline Status",
      icon: Clock,
      action: "Review Pending",
      color: "text-yellow-400",
    },
    {
      title: "GMV Generated",
      count: "$45,230",
      subtitle: "total GMV",
      growth: "Avg per Post: $312",
      growthLabel: "Top Performing",
      trend: "$2,340 single post",
      icon: DollarSign,
      action: "GMV Breakdown",
      color: "text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${card.color}`} />
                <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-600/20">
                  {card.action}
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">{card.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{card.count}</span>
                  <span className="text-sm text-gray-500">{card.subtitle}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-gray-300">{card.growth}</div>
                  <div className="text-xs text-gray-500">
                    <span className="text-gray-400">{card.growthLabel}:</span> {card.trend}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
