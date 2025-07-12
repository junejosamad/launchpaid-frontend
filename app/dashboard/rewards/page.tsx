// app/dashboard/rewards/page.tsx
// Updated version with API integration

"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  RefreshCcw,
  AlertCircle,
  Loader2
} from "lucide-react"
import { useRewardsData } from "@/hooks/useRewardsData"
import { formatCurrency } from "@/lib/utils"

export default function RewardsPage() {
  const { data, isLoading, hasError, errors, refetchAll } = useRewardsData();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchAll();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px]">
          <DashboardHeader />
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px]">
          <DashboardHeader />
          <div className="p-6">
            <Card className="bg-red-900/20 border-red-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-semibold">Error Loading Rewards</h3>
                    <p className="text-sm text-gray-400">
                      {errors.badges?.message || errors.progress?.message || 'Failed to load rewards data'}
                    </p>
                  </div>
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline" 
                    size="sm"
                    className="ml-auto"
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentBadge = data.allBadges.find(b => b.status === 'earned' && b.tier === data.highestTier);
  const nextBadge = data.allBadges.find(b => b.name === data.nextBadge);

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Rewards & Badges</h1>
              <p className="text-gray-400">Track your achievements and climb the leaderboard</p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              size="sm"
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total GMV</p>
                    <p className="text-2xl font-bold">{formatCurrency(data.currentGMV)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Badges Earned</p>
                    <p className="text-2xl font-bold">{data.totalEarned}/{data.allBadges.length}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Badge</p>
                    <p className="text-xl font-bold">{currentBadge?.name || 'None'}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">To Next Badge</p>
                    <p className="text-2xl font-bold">{formatCurrency(data.remainingGMV)}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Badge */}
          {nextBadge && (
            <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-600/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-400">
                        Progress to {nextBadge.name}
                      </h3>
                      <p className="text-gray-300">
                        {formatCurrency(data.remainingGMV)} more to unlock
                      </p>
                    </div>
                    <div className={`p-4 rounded-full ${nextBadge.bg_color}`}>
                      <Trophy className={`h-8 w-8 ${nextBadge.color}`} />
                    </div>
                  </div>
                  <Progress value={data.progressToNext} className="h-3 bg-gray-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                      style={{ width: `${data.progressToNext}%` }}
                    />
                  </Progress>
                  <p className="text-sm text-gray-400">
                    {data.progressToNext.toFixed(1)}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="badges" className="space-y-6">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="badges">All Badges</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* All Badges Tab */}
            <TabsContent value="badges">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.allBadges.map((badge) => (
                  <Card 
                    key={badge.id}
                    className={`border-gray-800 transition-all ${
                      badge.status === 'earned' 
                        ? 'bg-gradient-to-br from-purple-900/30 to-purple-600/20' 
                        : badge.status === 'in-progress'
                        ? 'bg-gray-900/50 hover:bg-gray-900/70'
                        : 'bg-gray-900/30 opacity-60'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-full ${badge.bg_color}`}>
                          <Trophy className={`h-6 w-6 ${badge.color}`} />
                        </div>
                        {badge.status === 'earned' && (
                          <Badge className="bg-green-600/20 text-green-400">Earned</Badge>
                        )}
                        {badge.status === 'in-progress' && (
                          <Badge className="bg-yellow-600/20 text-yellow-400">In Progress</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{badge.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Required GMV:</span>
                          <span className="font-medium">{formatCurrency(badge.gmv_requirement)}</span>
                        </div>
                        {badge.status !== 'earned' && (
                          <>
                            <Progress value={badge.progress} className="h-2 bg-gray-800" />
                            <p className="text-xs text-gray-500">{badge.progress.toFixed(1)}% Complete</p>
                          </>
                        )}
                        {badge.earned_date && (
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(badge.earned_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="space-y-4">
                {data.achievements.length === 0 ? (
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-12 text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400">No achievements yet. Keep selling to earn badges!</p>
                    </CardContent>
                  </Card>
                ) : (
                  data.achievements.map((achievement, index) => (
                    <Card key={index} className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${achievement.color}`}>
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.badge_name}</h4>
                            <p className="text-sm text-gray-400">{achievement.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              GMV at achievement: {formatCurrency(achievement.gmv_at_time)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topCreators.map((creator, index) => (
                      <div 
                        key={creator.creator_id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                      >
                        <div className="text-2xl font-bold text-gray-500">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{creator.username}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-400">
                              GMV: {formatCurrency(creator.total_gmv)}
                            </span>
                            <span className="text-sm text-gray-400">
                              Badges: {creator.badges_earned}
                            </span>
                            {creator.highest_badge && (
                              <Badge className="text-xs">{creator.highest_badge}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}