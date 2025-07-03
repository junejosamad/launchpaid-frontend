"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"
import { CreatorStatusOverview } from "@/components/client/creator-status-overview"
import { CreatorManagementTabs } from "@/components/client/creator-management-tabs"
import { Button } from "@/components/ui/button"
import { Download, MessageSquare, Users } from "lucide-react"

export default function CreatorManagementPage() {
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />

      <div className="ml-[250px]">
        <ClientHeader />

        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <nav className="text-sm text-gray-400 mb-2">Creator Management</nav>
                <h1 className="text-3xl font-bold">Creator Management</h1>
                <p className="text-gray-400 mt-1">Review and approve creators for your Summer Fashion 2024 campaign</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Agency
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Creator List
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" disabled={selectedCreators.length === 0}>
                  <Users className="h-4 w-4 mr-2" />
                  Bulk Approve ({selectedCreators.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Creator Status Overview */}
          <CreatorStatusOverview />

          {/* Creator Management Tabs */}
          <CreatorManagementTabs selectedCreators={selectedCreators} setSelectedCreators={setSelectedCreators} />
        </div>
      </div>
    </div>
  )
}
