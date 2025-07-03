"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"
import { CampaignOverviewCards } from "@/components/client/campaign-overview-cards"
import { GMVPerformanceChart } from "@/components/client/gmv-performance-chart"
import { CreatorPerformanceTable } from "@/components/client/creator-performance-table"
import { ContentPerformanceGrid } from "@/components/client/content-performance-grid"
import { AudienceInsights } from "@/components/client/audience-insights"
import { FinancialDeepDive } from "@/components/client/financial-deep-dive"
import { GlobalFilterPanel } from "@/components/client/global-filter-panel"
import { Button } from "@/components/ui/button"
import { Download, Share, Calendar } from "lucide-react"

export default function CampaignAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [segment, setSegment] = useState("all")
  const [metricView, setMetricView] = useState("performance")
  const [compareMode, setCompareMode] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <ClientSidebar />
      <div className="ml-[250px]">
        <ClientHeader />

        {/* Page Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-sm text-gray-400 mb-1">
                <span>Campaign Analytics</span>
              </nav>
              <h1 className="text-2xl font-bold text-white">Campaign Analytics</h1>
              <p className="text-gray-400">Detailed performance insights for Summer Fashion 2024</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
              <Button variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800">
                <Share className="mr-2 h-4 w-4" />
                Share Analytics
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Global Filter Panel */}
        <GlobalFilterPanel
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          segment={segment}
          onSegmentChange={setSegment}
          metricView={metricView}
          onMetricViewChange={setMetricView}
          compareMode={compareMode}
          onCompareModeChange={setCompareMode}
        />

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Performance Overview */}
          <CampaignOverviewCards />

          {/* Analytics Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GMV Performance */}
            <div className="lg:col-span-1">
              <GMVPerformanceChart dateRange={dateRange} compareMode={compareMode} />
            </div>

            {/* Creator Performance */}
            <div className="lg:col-span-1">
              <CreatorPerformanceTable segment={segment} />
            </div>
          </div>

          {/* Content & Audience Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Performance */}
            <div className="lg:col-span-1">
              <ContentPerformanceGrid />
            </div>

            {/* Audience Insights */}
            <div className="lg:col-span-1">
              <AudienceInsights />
            </div>
          </div>

          {/* Financial Deep Dive */}
          <FinancialDeepDive metricView={metricView} />
        </div>
      </div>
    </div>
  )
}
