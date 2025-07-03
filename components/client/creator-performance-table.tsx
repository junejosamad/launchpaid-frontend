"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, Users, Crown, Star } from "lucide-react"

interface CreatorPerformanceTableProps {
  segment: string
}

export function CreatorPerformanceTable({ segment }: CreatorPerformanceTableProps) {
  const [activeTab, setActiveTab] = useState("performance")

  const creators = [
    {
      rank: 1,
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      gmv: 8540,
      gmvPercent: 18.9,
      posts: 12,
      consistency: 100,
      engagement: 8.2,
      conversion: 4.1,
      trend: "up",
      change: "+15%",
      tier: "top",
      demographics: { age: "22", gender: "F" },
    },
    {
      rank: 2,
      name: "Jake Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      gmv: 7230,
      gmvPercent: 16.0,
      posts: 10,
      consistency: 90,
      engagement: 6.8,
      conversion: 3.8,
      trend: "up",
      change: "+8%",
      tier: "top",
      demographics: { age: "25", gender: "M" },
    },
    {
      rank: 3,
      name: "Sofia Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      gmv: 6890,
      gmvPercent: 15.2,
      posts: 14,
      consistency: 95,
      engagement: 7.5,
      conversion: 3.2,
      trend: "up",
      change: "+12%",
      tier: "top",
      demographics: { age: "28", gender: "F" },
    },
    {
      rank: 4,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      gmv: 4560,
      gmvPercent: 10.1,
      posts: 8,
      consistency: 85,
      engagement: 5.4,
      conversion: 2.9,
      trend: "down",
      change: "-3%",
      tier: "medium",
      demographics: { age: "31", gender: "M" },
    },
    {
      rank: 5,
      name: "Aria Patel",
      avatar: "/placeholder.svg?height=32&width=32",
      gmv: 3420,
      gmvPercent: 7.6,
      posts: 9,
      consistency: 78,
      engagement: 4.2,
      conversion: 2.1,
      trend: "stable",
      change: "0%",
      tier: "medium",
      demographics: { age: "24", gender: "F" },
    },
  ]

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "top":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "medium":
        return <Star className="h-4 w-4 text-blue-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          Creator Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">
              By Performance
            </TabsTrigger>
            <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-600">
              By Demographics
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
              By Content Type
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="space-y-3">
              {creators.map((creator) => (
                <div
                  key={creator.rank}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400 w-6">#{creator.rank}</span>
                      {getTierIcon(creator.tier)}
                    </div>

                    <Avatar className="h-10 w-10">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                      <AvatarFallback>
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-medium text-white">{creator.name}</div>
                      <div className="text-xs text-gray-400">
                        {creator.demographics.age}y • {creator.demographics.gender}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-white">${creator.gmv.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">{creator.gmvPercent}% of total</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-white">{creator.posts}</div>
                      <div className="text-xs text-gray-400">{creator.consistency}% consistent</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-white">{creator.engagement}%</div>
                      <div className="text-xs text-gray-400">engagement</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-white">{creator.conversion}%</div>
                      <div className="text-xs text-gray-400">conversion</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getTrendIcon(creator.trend)}
                      <span
                        className={`text-sm font-medium ${
                          creator.trend === "up"
                            ? "text-green-400"
                            : creator.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {creator.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-2">Male vs Female Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Female Creators</span>
                    <span className="text-white">$28,850 (63.8%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Male Creators</span>
                    <span className="text-white">$16,380 (36.2%)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-2">Age Group Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">18-24</span>
                    <span className="text-white">$19,560 (43.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">25-34</span>
                    <span className="text-white">$25,670 (56.7%)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="text-center text-gray-400 py-8">Content type analysis coming soon...</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
