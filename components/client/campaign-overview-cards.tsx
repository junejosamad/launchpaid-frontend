"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Users, DollarSign, Eye } from "lucide-react"

export function CampaignOverviewCards() {
  const kpiData = [
    {
      title: "Total GMV Generated",
      value: "$45,230",
      progress: 78,
      goal: "$58,000",
      growth: "+18%",
      trend: "up",
      subtitle: "On track to exceed goal",
      icon: DollarSign,
    },
    {
      title: "Campaign ROI",
      value: "4.2x",
      subtitle: "+15% vs industry average",
      cost: "$10,770 total spend",
      revenue: "$45,230 generated",
      growth: "+0.3x",
      trend: "up",
      icon: Target,
    },
    {
      title: "Creator Performance",
      value: "17",
      subtitle: "Active creators",
      avgGmv: "$2,660 avg GMV per creator",
      topPerformer: "Emma Rodriguez - $8,540",
      consistency: "94% on-time delivery",
      icon: Users,
    },
    {
      title: "Content Reach",
      value: "2.4M",
      subtitle: "Total views",
      engagement: "4.7% engagement rate",
      uniqueReach: "1.8M unique viewers",
      viral: "3 posts >100K views",
      icon: Eye,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-400">{kpi.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{kpi.value}</span>
                {kpi.growth && (
                  <Badge
                    variant="secondary"
                    className={`${
                      kpi.trend === "up" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.growth}
                  </Badge>
                )}
              </div>

              {kpi.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress vs Goal</span>
                    <span className="text-white">{kpi.progress}%</span>
                  </div>
                  <Progress value={kpi.progress} className="h-2" />
                  <div className="text-xs text-gray-500">Target: {kpi.goal}</div>
                </div>
              )}

              <div className="space-y-1 text-sm">
                <div className="text-gray-300">{kpi.subtitle}</div>
                {kpi.cost && <div className="text-gray-500">{kpi.cost}</div>}
                {kpi.revenue && <div className="text-gray-500">{kpi.revenue}</div>}
                {kpi.avgGmv && <div className="text-gray-500">{kpi.avgGmv}</div>}
                {kpi.topPerformer && <div className="text-gray-500">{kpi.topPerformer}</div>}
                {kpi.consistency && <div className="text-gray-500">{kpi.consistency}</div>}
                {kpi.engagement && <div className="text-gray-500">{kpi.engagement}</div>}
                {kpi.uniqueReach && <div className="text-gray-500">{kpi.uniqueReach}</div>}
                {kpi.viral && <div className="text-gray-500">{kpi.viral}</div>}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
