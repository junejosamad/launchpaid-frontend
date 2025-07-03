"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToShipTab } from "./to-ship-tab"
import { InTransitTab } from "./in-transit-tab"
import { DeliveredTab } from "./delivered-tab"
import { ShippingAnalyticsTab } from "./shipping-analytics-tab"
import { Package, Truck, CheckCircle, BarChart3 } from "lucide-react"

export function ShippingManagementTabs() {
  const [activeTab, setActiveTab] = useState("to-ship")

  const tabs = [
    {
      value: "to-ship",
      label: "To Ship",
      count: 12,
      icon: Package,
      color: "text-orange-400",
    },
    {
      value: "in-transit",
      label: "In Transit",
      count: 17,
      icon: Truck,
      color: "text-blue-400",
    },
    {
      value: "delivered",
      label: "Delivered",
      count: 8,
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      value: "analytics",
      label: "Analytics",
      count: null,
      icon: BarChart3,
      color: "text-purple-400",
    },
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Icon className={`h-4 w-4 ${activeTab === tab.value ? "text-white" : tab.color}`} />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.value ? "bg-white/20 text-white" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          )
        })}
      </TabsList>

      <div className="mt-6">
        <TabsContent value="to-ship" className="space-y-6">
          <ToShipTab />
        </TabsContent>

        <TabsContent value="in-transit" className="space-y-6">
          <InTransitTab />
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          <DeliveredTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <ShippingAnalyticsTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}
