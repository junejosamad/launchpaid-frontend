"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { DollarSign, TrendingUp, Target, Zap } from "lucide-react"

interface FinancialDeepDiveProps {
  metricView: string
}

export function FinancialDeepDive({ metricView }: FinancialDeepDiveProps) {
  const revenueAttribution = [
    { tier: "Top Creators", gmv: 25600, percentage: 56.6, cost: 4200 },
    { tier: "Mid Creators", gmv: 15400, percentage: 34.1, cost: 3800 },
    { tier: "New Creators", gmv: 4230, percentage: 9.3, cost: 2770 },
  ]

  const contentTypeRevenue = [
    { type: "Product Demos", gmv: 18500, percentage: 40.9 },
    { type: "Styling Videos", gmv: 14200, percentage: 31.4 },
    { type: "Unboxing", gmv: 8900, percentage: 19.7 },
    { type: "Lifestyle", gmv: 3630, percentage: 8.0 },
  ]

  const conversionFunnel = [
    { stage: "Awareness", value: 2400000, color: "#A819FF" },
    { stage: "Consideration", value: 480000, color: "#8B5CF6" },
    { stage: "Purchase Intent", value: 96000, color: "#7C3AED" },
    { stage: "Conversion", value: 19200, color: "#6D28D9" },
  ]

  const budgetUtilization = [
    { category: "Creator Payments", amount: 6500, percentage: 60.4, budget: 7000 },
    { category: "Product Samples", amount: 2800, percentage: 26.0, budget: 3000 },
    { category: "Shipping Costs", amount: 980, percentage: 9.1, budget: 1200 },
    { category: "Platform Fees", amount: 490, percentage: 4.5, budget: 500 },
  ]

  const competitiveMetrics = [
    { metric: "Industry Avg ROI", value: "3.6x", ourValue: "4.2x", status: "above" },
    { metric: "Avg Conversion Rate", value: "2.8%", ourValue: "3.2%", status: "above" },
    { metric: "Cost Per Acquisition", value: "$15.20", ourValue: "$12.30", status: "below" },
    { metric: "Engagement Rate", value: "3.9%", ourValue: "4.7%", status: "above" },
  ]

  return (
    <div className="space-y-6">
      {/* Financial Performance Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Performance Deep Dive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Attribution */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Revenue Attribution by Creator Tier</h4>
              <div className="space-y-3">
                {revenueAttribution.map((tier) => (
                  <div key={tier.tier} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{tier.tier}</span>
                      <Badge className="bg-purple-600">{tier.percentage}%</Badge>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">GMV Generated</span>
                      <span className="text-white">${tier.gmv.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Cost</span>
                      <span className="text-white">${tier.cost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">ROI</span>
                      <span className="text-green-400">{(tier.gmv / tier.cost).toFixed(1)}x</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Type Revenue */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Revenue by Content Type</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentTypeRevenue}>
                    <XAxis dataKey="type" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                      }}
                    />
                    <Bar dataKey="gmv" fill="#A819FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{stage.stage}</span>
                    <span className="text-white">{stage.value.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={index === 0 ? 100 : (stage.value / conversionFunnel[0].value) * 100}
                    className="h-3"
                  />
                  {index > 0 && (
                    <div className="text-xs text-gray-500">
                      {((stage.value / conversionFunnel[index - 1].value) * 100).toFixed(1)}% conversion rate
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Utilization */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetUtilization.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{item.category}</span>
                    <span className="text-white">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(item.amount / item.budget) * 100} className="flex-1 h-2" />
                    <span className="text-xs text-gray-400 w-12">{Math.round((item.amount / item.budget) * 100)}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    ${item.amount.toLocaleString()} of ${item.budget.toLocaleString()} budget
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Analysis */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Competitive Analysis & Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitiveMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">{metric.metric}</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Industry</span>
                    <span className="text-sm text-gray-300">{metric.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Our Campaign</span>
                    <span
                      className={`text-sm font-medium ${
                        metric.status === "above"
                          ? "text-green-400"
                          : metric.status === "below" && metric.metric.includes("Cost")
                            ? "text-green-400"
                            : "text-red-400"
                      }`}
                    >
                      {metric.ourValue}
                    </span>
                  </div>
                </div>
                <Badge
                  className={`mt-2 ${
                    metric.status === "above"
                      ? "bg-green-600/20 text-green-400"
                      : metric.status === "below" && metric.metric.includes("Cost")
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {metric.status === "above"
                    ? "Above Average"
                    : metric.status === "below" && metric.metric.includes("Cost")
                      ? "Below Average"
                      : "Below Average"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
