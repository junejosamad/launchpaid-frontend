"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"
import { CampaignOverviewCards } from "@/components/client/campaign-overview-cards"
import { CampaignAnalyticsChart } from "@/components/client/campaign-analytics-chart"
import { CreatorPipelineOverview } from "@/components/client/creator-pipeline-overview"
import { RecentActivityFeed } from "@/components/client/recent-activity-feed"
import { TopPerformingContent } from "@/components/client/top-performing-content"
import { ShippingOverview } from "@/components/client/shipping-overview"

export default function ClientDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")

  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />

      <div className="ml-[250px] flex flex-col">
        <ClientHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Campaign Overview KPI Cards */}
          <CampaignOverviewCards />

          {/* Campaign Analytics Chart */}
          <CampaignAnalyticsChart timeRange={selectedTimeRange} onTimeRangeChange={setSelectedTimeRange} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Creator Pipeline */}
            <CreatorPipelineOverview />

            {/* Recent Activity Feed */}
            <RecentActivityFeed />
          </div>

          {/* Bottom Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Content */}
            <TopPerformingContent />

            {/* Shipping Overview */}
            <ShippingOverview />
          </div>
        </main>
      </div>
    </div>
  )
}
