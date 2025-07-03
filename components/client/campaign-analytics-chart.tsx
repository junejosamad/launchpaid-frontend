"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CampaignAnalyticsChartProps {
  timeRange: string
  onTimeRangeChange: (range: string) => void
}

export function CampaignAnalyticsChart({ timeRange, onTimeRangeChange }: CampaignAnalyticsChartProps) {
  const data = [
    { date: "Jan 1", gmv: 1200, goal: 1500 },
    { date: "Jan 8", gmv: 2100, goal: 3000 },
    { date: "Jan 15", gmv: 3800, goal: 4500 },
    { date: "Jan 22", gmv: 5200, goal: 6000 },
    { date: "Jan 29", gmv: 7100, goal: 7500 },
    { date: "Feb 5", gmv: 9800, goal: 9000 },
    { date: "Feb 12", gmv: 12400, goal: 10500 },
    { date: "Feb 19", gmv: 15600, goal: 12000 },
    { date: "Feb 26", gmv: 18900, goal: 13500 },
    { date: "Mar 5", gmv: 22300, goal: 15000 },
    { date: "Mar 12", gmv: 26800, goal: 16500 },
    { date: "Mar 19", gmv: 31200, goal: 18000 },
    { date: "Mar 26", gmv: 35900, goal: 19500 },
    { date: "Apr 2", gmv: 40100, goal: 21000 },
    { date: "Apr 9", gmv: 45230, goal: 22500 },
  ]

  const performanceMetrics = [
    { label: "Conversion Rate", value: "3.2%", change: "+0.4%" },
    { label: "Average Order Value", value: "$67.50", change: "+$5.20" },
    { label: "Cost Per Acquisition", value: "$12.30", change: "-$1.80" },
    { label: "Return on Ad Spend", value: "4.2x", change: "+0.3x" },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Campaign Performance Analytics</CardTitle>
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="gmv"
                  stroke="#A819FF"
                  strokeWidth={3}
                  dot={{ fill: "#A819FF", strokeWidth: 2, r: 4 }}
                  name="Actual GMV"
                />
                <Line
                  type="monotone"
                  dataKey="goal"
                  stroke="#6B7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target GMV"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="p-4 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400">{metric.label}</div>
                <div className="text-xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-green-400">{metric.change}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
