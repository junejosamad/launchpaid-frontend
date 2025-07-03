"use client"

import { ClientSidebar } from "@/components/client/client-sidebar"
import { ShippingOverview } from "@/components/client/shipping-overview"
import { ShippingFilterControls } from "@/components/client/shipping-filter-controls"
import { ShippingManagementTabs } from "@/components/client/shipping-management-tabs"
import { Button } from "@/components/ui/button"
import { Download, Package, FileText, MessageSquare } from "lucide-react"

export default function ShippingCenterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />

      <div className="ml-[250px] min-h-screen">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span>Shipping Center</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Shipping Center</h1>
                <p className="text-gray-400">Manage sample distribution and tracking for approved creators</p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  SMS Updates
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Package className="h-4 w-4 mr-2" />
                  Bulk Add Tracking
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Labels
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          <ShippingOverview />
          <ShippingFilterControls />
          <ShippingManagementTabs />
        </div>
      </div>
    </div>
  )
}
