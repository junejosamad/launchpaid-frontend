"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Clock, CheckCircle, DollarSign, Truck, MapPin, Star, AlertTriangle } from "lucide-react"

export function ShippingAnalyticsTab() {
  // Sample data for charts
  const deliveryTimeData = [
    { date: "Jan 15", avgDays: 2.8 },
    { date: "Jan 16", avgDays: 3.2 },
    { date: "Jan 17", avgDays: 2.9 },
    { date: "Jan 18", avgDays: 3.1 },
    { date: "Jan 19", avgDays: 2.7 },
    { date: "Jan 20", avgDays: 3.0 },
    { date: "Jan 21", avgDays: 2.9 },
  ]

  const carrierPerformanceData = [
    { carrier: "FedEx", deliveries: 45, avgDays: 2.8, cost: 12.5 },
    { carrier: "UPS", deliveries: 32, avgDays: 3.1, cost: 11.8 },
    { carrier: "USPS", deliveries: 28, avgDays: 3.4, cost: 8.9 },
  ]

  const geographicData = [
    { region: "West Coast", count: 35, avgDays: 2.9 },
    { region: "East Coast", count: 28, avgDays: 3.2 },
    { region: "Midwest", count: 22, avgDays: 3.0 },
    { region: "South", count: 20, avgDays: 3.1 },
  ]

  const costAnalysisData = [
    { name: "Standard", value: 60, cost: 8.9 },
    { name: "Express", value: 25, cost: 15.5 },
    { name: "Priority", value: 15, cost: 22.0 },
  ]

  const COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"]

  const metricsOverview = [
    {
      title: "Average Delivery Time",
      value: "3.2 days",
      change: "-0.3 days vs last week",
      trend: "down",
      icon: Clock,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
    },
    {
      title: "Delivery Success Rate",
      value: "98.5%",
      change: "+1.2% vs last week",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
    },
    {
      title: "Creator Satisfaction",
      value: "4.8/5",
      change: "+0.2 vs last week",
      trend: "up",
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
    },
    {
      title: "Average Shipping Cost",
      value: "$12.40",
      change: "-$0.80 vs last week",
      trend: "down",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Shipping Performance Analytics</h3>
        <p className="text-gray-400">Comprehensive insights into shipping efficiency and creator satisfaction</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsOverview.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <Badge className={`${metric.bgColor} ${metric.color} border-0`}>
                    {metric.trend === "up" ? "↗️" : "↘️"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-gray-400">{metric.title}</p>
                  <p className={`text-xs ${metric.color}`}>{metric.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Time Trends */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Delivery Time Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deliveryTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgDays"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Carrier Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Carrier Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carrierPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="carrier" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="deliveries" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {geographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Shipping Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costAnalysisData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${item.cost}</div>
                    <div className="text-sm text-gray-400">{item.value}% of shipments</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Response Analysis */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Creator Response Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">92%</div>
                  <div className="text-sm text-gray-400">Confirmation Rate</div>
                  <div className="text-xs text-green-400">+5% vs last month</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">2.3 days</div>
                  <div className="text-sm text-gray-400">Avg Response Time</div>
                  <div className="text-xs text-blue-400">-0.5 days improvement</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content Creation Timeline</span>
                  <span className="text-white font-medium">4.2 days avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sample Satisfaction Score</span>
                  <span className="text-yellow-400 font-medium">4.8/5 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Issue Resolution Rate</span>
                  <span className="text-green-400 font-medium">98.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Top Performing</span>
                </div>
                <p className="text-sm text-gray-300">
                  FedEx Express showing best delivery times (2.8 days avg) with 98% success rate
                </p>
              </div>

              <div className="p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Optimization Opportunity</span>
                </div>
                <p className="text-sm text-gray-300">
                  USPS showing higher costs per delivery time ratio - consider route optimization
                </p>
              </div>

              <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Trend Analysis</span>
                </div>
                <p className="text-sm text-gray-300">
                  West Coast deliveries 15% faster than average - leverage for urgent shipments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
