"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target } from "lucide-react"

interface GMVPerformanceChartProps {
  dateRange: string
  compareMode: boolean
}

export function GMVPerformanceChart({ dateRange, compareMode }: GMVPerformanceChartProps) {
  const data = [
    { date: "Mar 1", gmv: 1200, goal: 1500, projected: 1400 },
    { date: "Mar 3", gmv: 2100, goal: 3000, projected: 2800 },
    { date: "Mar 5", gmv: 3800, goal: 4500, projected: 4200 },
    { date: "Mar 7", gmv: 5200, goal: 6000, projected: 5800 },
    { date: "Mar 9", gmv: 7100, goal: 7500, projected: 7300 },
    { date: "Mar 11", gmv: 9800, goal: 9000, projected: 9500 },
    { date: "Mar 13", gmv: 12400, goal: 10500, projected: 12000 },
    { date: "Mar 15", gmv: 15600, goal: 12000, projected: 15200 },
    { date: "Mar 17", gmv: 18900, goal: 13500, projected: 18500 },
    { date: "Mar 19", gmv: 22300, goal: 15000, projected: 22000 },
    { date: "Mar 21", gmv: 26800, goal: 16500, projected: 26400 },
    { date: "Mar 23", gmv: 31200, goal: 18000, projected: 30800 },
    { date: "Mar 25", gmv: 35900, goal: 19500, projected: 35500 },
    { date: "Mar 27", gmv: 40100, goal: 21000, projected: 40000 },
    { date: "Mar 29", gmv: 45230, goal: 22500, projected: 45000 },
  ]

  const insights = [
    { label: "Best Performing Day", value: "March 15 - $3,240 GMV" },
    { label: "Average Daily GMV", value: "$1,507" },
    { label: "Growth Rate", value: "+25% week-over-week" },
    { label: "Goal Achievement", value: "On track to exceed by 12%" },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              GMV Performance Tracking
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">Last 30 days with goal comparison</p>
          </div>
          <Badge className="bg-green-600/20 text-green-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            +18% vs target
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => value.split(" ")[1]} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  formatter={(value: any, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "gmv" ? "Actual GMV" : name === "goal" ? "Target GMV" : "Projected GMV",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="gmv"
                  stroke="#A819FF"
                  strokeWidth={3}
                  dot={{ fill: "#A819FF", strokeWidth: 2, r: 4 }}
                  name="gmv"
                />
                <Line
                  type="monotone"
                  dataKey="goal"
                  stroke="#6B7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="goal"
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                  name="projected"
                />
                <ReferenceLine x="Mar 15" stroke="#EF4444" strokeDasharray="2 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">{insight.label}</div>
                <div className="text-sm font-semibold text-white">{insight.value}</div>
              </div>
            ))}
          </div>

          {/* Milestone Markers */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="text-gray-400">Actual GMV</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-gray-500 rounded"></div>
              <span className="text-gray-400">Target GMV</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-green-500 rounded"></div>
              <span className="text-gray-400">Projected Final</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-red-500 rounded"></div>
              <span className="text-gray-400">Peak Performance Day</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
