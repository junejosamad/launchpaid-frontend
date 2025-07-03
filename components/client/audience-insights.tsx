"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Users, MapPin, Clock, Smartphone } from "lucide-react"

export function AudienceInsights() {
  const genderData = [
    { name: "Female", value: 62, color: "#A819FF" },
    { name: "Male", value: 38, color: "#6B7280" },
  ]

  const ageData = [
    { age: "18-24", percentage: 45, engagement: 6.8 },
    { age: "25-34", percentage: 35, engagement: 7.2 },
    { age: "35-44", percentage: 15, engagement: 5.4 },
    { age: "45+", percentage: 5, engagement: 4.1 },
  ]

  const locationData = [
    { state: "California", percentage: 22 },
    { state: "New York", percentage: 18 },
    { state: "Texas", percentage: 12 },
    { state: "Florida", percentage: 10 },
    { state: "Illinois", percentage: 8 },
  ]

  const deviceData = [
    { device: "Mobile", percentage: 78 },
    { device: "Desktop", percentage: 22 },
  ]

  const platformData = [
    { platform: "TikTok", reach: 1200000 },
    { platform: "Instagram", reach: 800000 },
    { platform: "YouTube", reach: 400000 },
  ]

  const audienceGrowth = [
    { metric: "New Followers Gained", value: "12.5K", growth: "+23%" },
    { metric: "Brand Mention Increase", value: "+340%", growth: "+15%" },
    { metric: "Hashtag Reach", value: "2.8M", growth: "+45%" },
    { metric: "Cross-Platform Growth", value: "+18%", growth: "+8%" },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          Audience Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Split */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Gender Distribution</h4>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-400">Female 62%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400">Male 38%</span>
              </div>
            </div>
          </div>

          {/* Age Distribution */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Age Distribution</h4>
            <div className="space-y-2">
              {ageData.map((age) => (
                <div key={age.age} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{age.age}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${age.percentage}%` }}></div>
                    </div>
                    <span className="text-white text-sm w-8">{age.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic & Device Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Locations */}
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Top Locations
            </h4>
            <div className="space-y-2">
              {locationData.map((location) => (
                <div key={location.state} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{location.state}</span>
                  <span className="text-white text-sm">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Device Usage
            </h4>
            <div className="space-y-2">
              {deviceData.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{device.device}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${device.percentage}%` }}></div>
                    </div>
                    <span className="text-white text-sm w-8">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="space-y-3">
          <h4 className="font-medium text-white">Platform Reach</h4>
          <div className="grid grid-cols-3 gap-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="p-3 bg-gray-800 rounded-lg text-center">
                <div className="text-sm text-gray-400">{platform.platform}</div>
                <div className="text-lg font-bold text-white">{(platform.reach / 1000000).toFixed(1)}M</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Growth */}
        <div className="space-y-3">
          <h4 className="font-medium text-white">Audience Growth</h4>
          <div className="grid grid-cols-2 gap-4">
            {audienceGrowth.map((metric) => (
              <div key={metric.metric} className="p-3 bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">{metric.metric}</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{metric.value}</span>
                  <span className="text-sm text-green-400">{metric.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Activity Times */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Peak Activity Times
          </h4>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="text-center">
              <div className="text-gray-400">Morning</div>
              <div className="text-white">6-9 AM</div>
              <div className="text-purple-400">Low</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Afternoon</div>
              <div className="text-white">2-4 PM</div>
              <div className="text-green-400">High</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Evening</div>
              <div className="text-white">7-9 PM</div>
              <div className="text-green-400">Peak</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Night</div>
              <div className="text-white">10-12 PM</div>
              <div className="text-yellow-400">Medium</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
