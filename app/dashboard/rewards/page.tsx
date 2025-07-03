"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Trophy,
  Star,
  Crown,
  Diamond,
  Zap,
  Sparkles,
  Lock,
  CheckCircle,
  TrendingUp,
  Target,
  Calendar,
  Award,
  ExternalLink,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BadgeData {
  id: string
  name: string
  tier: string
  gmvRequirement: number
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  status: "earned" | "in-progress" | "locked"
  earnedDate?: string
  progress?: number
  benefits: string[]
  description: string
}

const badgeData: BadgeData[] = [
  {
    id: "1k",
    name: "Rising Star",
    tier: "$1K GMV",
    gmvRequirement: 1000,
    icon: <Star className="h-8 w-8" />,
    color: "text-amber-600",
    bgColor: "bg-amber-600/20",
    borderColor: "border-amber-600/30",
    status: "earned",
    earnedDate: "March 15, 2025",
    benefits: ["Access to starter campaigns", "Basic creator support", "Community access"],
    description:
      "Welcome to the creator community! You've taken your first step into the world of TikTok Shop partnerships.",
  },
  {
    id: "5k",
    name: "Emerging Creator",
    tier: "$5K GMV",
    gmvRequirement: 5000,
    icon: <Trophy className="h-8 w-8" />,
    color: "text-gray-400",
    bgColor: "bg-gray-400/20",
    borderColor: "border-gray-400/30",
    status: "earned",
    earnedDate: "May 20, 2025",
    benefits: ["Access to mid-tier campaigns", "Priority support", "Performance analytics", "15% bonus rate"],
    description: "You're building momentum! Your consistent performance is opening doors to better opportunities.",
  },
  {
    id: "10k",
    name: "Proven Performer",
    tier: "$10K GMV",
    gmvRequirement: 10000,
    icon: <Crown className="h-8 w-8" />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
    status: "in-progress",
    progress: 87.5,
    benefits: ["Access to premium campaigns", "Dedicated account manager", "25% bonus rate", "Early campaign access"],
    description:
      "Almost there! Join the elite group of proven performers who consistently deliver exceptional results.",
  },
  {
    id: "50k",
    name: "Top Creator",
    tier: "$50K GMV",
    gmvRequirement: 50000,
    icon: <Diamond className="h-8 w-8" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    status: "locked",
    benefits: ["VIP campaign access", "Custom deal structures", "35% bonus rate", "Brand partnership priority"],
    description: "Elite status awaits! Top creators enjoy exclusive partnerships and premium earning opportunities.",
  },
  {
    id: "100k",
    name: "Elite Performer",
    tier: "$100K GMV",
    gmvRequirement: 100000,
    icon: <Zap className="h-8 w-8" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    status: "locked",
    benefits: ["Exclusive brand partnerships", "Revenue sharing deals", "50% bonus rate", "Creator advisory board"],
    description: "Join the ranks of elite performers who shape the future of creator commerce.",
  },
  {
    id: "500k",
    name: "Creator Legend",
    tier: "$500K GMV",
    gmvRequirement: 500000,
    icon: <Sparkles className="h-8 w-8" />,
    color: "text-pink-500",
    bgColor: "bg-gradient-to-r from-pink-500/20 to-purple-500/20",
    borderColor: "border-pink-500/30",
    status: "locked",
    benefits: ["Legendary status", "Custom campaign creation", "Revenue sharing", "Platform influence"],
    description: "Legendary creators who have redefined what's possible in the creator economy.",
  },
  {
    id: "1m",
    name: "Hall of Fame",
    tier: "$1M+ GMV",
    gmvRequirement: 1000000,
    icon: <Award className="h-8 w-8" />,
    color: "text-gradient",
    bgColor: "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20",
    borderColor: "border-gradient",
    status: "locked",
    benefits: ["Lifetime VIP status", "Equity opportunities", "Platform partnership", "Legacy recognition"],
    description: "The ultimate achievement. Hall of Fame creators are the legends who built the creator economy.",
  },
]

export default function RewardsPage() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Current user stats
  const currentGMV = 8750
  const totalCampaigns = 15
  const completionRate = 95
  const networkRanking = 15 // Top 15%

  const nextBadge = badgeData.find((badge) => badge.status === "in-progress")
  const earnedBadges = badgeData.filter((badge) => badge.status === "earned")
  const currentProgress = nextBadge ? (currentGMV / nextBadge.gmvRequirement) * 100 : 0
  const remainingGMV = nextBadge ? nextBadge.gmvRequirement - currentGMV : 0

  const getStatusIcon = (status: BadgeData["status"]) => {
    switch (status) {
      case "earned":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      case "locked":
        return <Lock className="h-5 w-5 text-gray-500" />
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    if (progress >= 40) return "bg-orange-500"
    return "bg-purple-500"
  }

  const achievementHistory = [
    {
      date: "May 20, 2025",
      badge: "Emerging Creator",
      gmv: "$5,000",
      message: "You're building momentum!",
      icon: <Trophy className="h-5 w-5 text-gray-400" />,
    },
    {
      date: "March 15, 2025",
      badge: "Rising Star",
      gmv: "$1,000",
      message: "Welcome to the creator community!",
      icon: <Star className="h-5 w-5 text-amber-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Rewards & Badges</h1>
                <p className="text-gray-400 text-lg">Unlock achievements and showcase your success</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-600 hover:bg-purple-700 text-lg px-4 py-2">
                  {earnedBadges.length} Badges Earned
                </Badge>
                <Button variant="outline" size="sm" className="border-purple-500 text-purple-400">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Progress Section */}
          {nextBadge && (
            <Card className="mb-8 bg-gradient-to-r from-gray-900 to-purple-900/30 border-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(162,89,255,0.15),transparent_70%)]"></div>
              <CardContent className="p-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("p-3 rounded-full", nextBadge.bgColor)}>
                        <div className={nextBadge.color}>{nextBadge.icon}</div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Next: {nextBadge.name}</h2>
                        <p className="text-gray-400">{nextBadge.tier} Badge</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">{nextBadge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {nextBadge.tier}</span>
                        <span className="font-medium">{currentProgress.toFixed(1)}%</span>
                      </div>
                      <Progress
                        value={currentProgress}
                        className="h-3 bg-gray-800"
                        indicatorClassName={getProgressColor(currentProgress)}
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>${currentGMV.toLocaleString()} current GMV</span>
                        <span>${nextBadge.gmvRequirement.toLocaleString()} target</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="text-4xl font-bold text-purple-400 mb-2">${remainingGMV.toLocaleString()}</div>
                    <p className="text-gray-300 mb-4">left to unlock the next badge!</p>
                    <div className="text-sm text-gray-400 mb-6">
                      At current pace: <span className="text-purple-400 font-medium">~12 days</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Target className="h-4 w-4 mr-2" />
                      View Available Campaigns
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="badges" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="badges" className="data-[state=active]:bg-purple-600">
                Badge Collection
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
                Achievement History
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-purple-600">
                Performance Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges">
              {/* Badge Collection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badgeData.map((badge) => (
                  <Card
                    key={badge.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:scale-105",
                      badge.status === "earned" && "bg-gray-900 border-green-500/30 shadow-lg shadow-green-500/10",
                      badge.status === "in-progress" &&
                        "bg-gray-900 border-purple-500/50 shadow-lg shadow-purple-500/20",
                      badge.status === "locked" && "bg-gray-950 border-gray-800 opacity-60",
                    )}
                    onClick={() => setSelectedBadge(badge)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="relative mx-auto mb-4">
                        <div
                          className={cn(
                            "h-20 w-20 rounded-full flex items-center justify-center mx-auto relative",
                            badge.status === "earned" && badge.bgColor,
                            badge.status === "in-progress" && badge.bgColor,
                            badge.status === "locked" && "bg-gray-800",
                          )}
                        >
                          <div
                            className={cn(
                              badge.status === "earned" && badge.color,
                              badge.status === "in-progress" && badge.color,
                              badge.status === "locked" && "text-gray-600",
                            )}
                          >
                            {badge.icon}
                          </div>
                          <div className="absolute -top-2 -right-2">{getStatusIcon(badge.status)}</div>
                        </div>
                        {badge.status === "earned" && (
                          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <p className="text-sm text-gray-400">{badge.tier}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {badge.status === "earned" && (
                        <div className="text-center">
                          <Badge className="bg-green-600 hover:bg-green-700 mb-2">EARNED</Badge>
                          <p className="text-xs text-gray-400">Earned on {badge.earnedDate}</p>
                        </div>
                      )}
                      {badge.status === "in-progress" && (
                        <div className="space-y-2">
                          <Badge className="bg-purple-600 hover:bg-purple-700 w-full justify-center">
                            {badge.progress?.toFixed(1)}% COMPLETE
                          </Badge>
                          <Progress
                            value={badge.progress}
                            className="h-2 bg-gray-800"
                            indicatorClassName="bg-purple-500"
                          />
                          <p className="text-xs text-gray-400 text-center">
                            ${currentGMV.toLocaleString()} / ${badge.gmvRequirement.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {badge.status === "locked" && (
                        <div className="text-center">
                          <Badge className="bg-gray-600 hover:bg-gray-700 mb-2">LOCKED</Badge>
                          <p className="text-xs text-gray-400">${badge.gmvRequirement.toLocaleString()} GMV required</p>
                          <div className="mt-2">
                            <Progress
                              value={(currentGMV / badge.gmvRequirement) * 100}
                              className="h-1 bg-gray-800"
                              indicatorClassName="bg-gray-600"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              {/* Achievement History */}
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      Achievement Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Current Progress */}
                      <div className="flex items-start gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <div className="h-6 w-6 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Proven Performer Badge</h3>
                            <Badge className="bg-purple-600">IN PROGRESS</Badge>
                          </div>
                          <p className="text-gray-300 mb-2">
                            ${currentGMV.toLocaleString()} / $10,000 GMV ({currentProgress.toFixed(1)}% complete)
                          </p>
                          <p className="text-sm text-purple-400">"Almost there! Keep pushing!"</p>
                        </div>
                      </div>

                      {/* Achievement History */}
                      {achievementHistory.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{achievement.badge} Badge Earned!</h3>
                              <Badge className="bg-green-600">EARNED</Badge>
                            </div>
                            <p className="text-gray-300 mb-1">Reached {achievement.gmv} GMV milestone</p>
                            <p className="text-sm text-green-400 mb-2">"{achievement.message}"</p>
                            <p className="text-xs text-gray-500">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total GMV Generated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${currentGMV.toLocaleString()}</div>
                    <p className="text-xs text-gray-400 mt-1">Across all campaigns</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Badge Progression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{earnedBadges.length}/7</div>
                    <p className="text-xs text-gray-400 mt-1">Badges earned</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCampaigns}</div>
                    <p className="text-xs text-gray-400 mt-1">Campaigns completed</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Consistency Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <p className="text-xs text-gray-400 mt-1">Deliverable completion</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Network Ranking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Top {networkRanking}%</div>
                    <p className="text-xs text-gray-400 mt-1">Of all creators</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Achievement Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">+20%</div>
                    <p className="text-xs text-gray-400 mt-1">Faster than average</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$420</div>
                    <p className="text-xs text-gray-400 mt-1">GMV this week</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Next Badge ETA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">12 days</div>
                    <p className="text-xs text-gray-400 mt-1">At current pace</p>
                  </CardContent>
                </Card>
              </div>

              {/* Motivational Section */}
              <Card className="mt-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Complete 2 more campaigns to reach $10K!</h3>
                    <p className="text-gray-300 mb-4">
                      You've generated $420 this week toward your goal. Keep up the momentum!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Active Campaigns
                      </Button>
                      <Button variant="outline" className="border-purple-500 text-purple-400">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Track Progress
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Badge Detail Modal */}
      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-md">
          {selectedBadge && (
            <>
              <DialogHeader>
                <div className="text-center mb-4">
                  <div
                    className={cn(
                      "h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4",
                      selectedBadge.status === "earned" && selectedBadge.bgColor,
                      selectedBadge.status === "in-progress" && selectedBadge.bgColor,
                      selectedBadge.status === "locked" && "bg-gray-800",
                    )}
                  >
                    <div
                      className={cn(
                        "text-4xl",
                        selectedBadge.status === "earned" && selectedBadge.color,
                        selectedBadge.status === "in-progress" && selectedBadge.color,
                        selectedBadge.status === "locked" && "text-gray-600",
                      )}
                    >
                      {selectedBadge.icon}
                    </div>
                  </div>
                  <DialogTitle className="text-2xl">{selectedBadge.name}</DialogTitle>
                  <p className="text-gray-400">{selectedBadge.tier} Badge</p>
                </div>
              </DialogHeader>

              <DialogDescription asChild>
                <div className="space-y-4">
                  <p className="text-gray-300 text-center">{selectedBadge.description}</p>

                  {selectedBadge.status === "earned" && (
                    <div className="text-center p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <Badge className="bg-green-600 hover:bg-green-700 mb-2">EARNED</Badge>
                      <p className="text-sm text-gray-300">Earned on {selectedBadge.earnedDate}</p>
                    </div>
                  )}

                  {selectedBadge.status === "in-progress" && (
                    <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                      <div className="text-center mb-3">
                        <Badge className="bg-purple-600 hover:bg-purple-700">
                          {selectedBadge.progress?.toFixed(1)}% COMPLETE
                        </Badge>
                      </div>
                      <Progress
                        value={selectedBadge.progress}
                        className="h-3 bg-gray-800 mb-2"
                        indicatorClassName="bg-purple-500"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>${currentGMV.toLocaleString()}</span>
                        <span>${selectedBadge.gmvRequirement.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {selectedBadge.status === "locked" && (
                    <div className="text-center p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                      <Badge className="bg-gray-600 hover:bg-gray-700 mb-2">LOCKED</Badge>
                      <p className="text-sm text-gray-400">
                        Requires ${selectedBadge.gmvRequirement.toLocaleString()} GMV
                      </p>
                      <div className="mt-2">
                        <Progress
                          value={(currentGMV / selectedBadge.gmvRequirement) * 100}
                          className="h-2 bg-gray-800"
                          indicatorClassName="bg-gray-600"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Badge Benefits:</h4>
                    <ul className="space-y-1">
                      {selectedBadge.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
