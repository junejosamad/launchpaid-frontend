"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingApprovalTab } from "./pending-approval-tab"
import { ApprovedActiveTab } from "./approved-active-tab"
import { RejectedCreatorsTab } from "./rejected-creators-tab"
import { CreatorDatabaseTab } from "./creator-database-tab"

interface CreatorManagementTabsProps {
  selectedCreators: string[]
  setSelectedCreators: (creators: string[]) => void
}

export function CreatorManagementTabs({ selectedCreators, setSelectedCreators }: CreatorManagementTabsProps) {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-800">
        <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          Pending Approval (8)
        </TabsTrigger>
        <TabsTrigger value="approved" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          Approved & Active (17)
        </TabsTrigger>
        <TabsTrigger value="rejected" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          Rejected (5)
        </TabsTrigger>
        <TabsTrigger value="database" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          Creator Database
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="mt-6">
        <PendingApprovalTab selectedCreators={selectedCreators} setSelectedCreators={setSelectedCreators} />
      </TabsContent>

      <TabsContent value="approved" className="mt-6">
        <ApprovedActiveTab />
      </TabsContent>

      <TabsContent value="rejected" className="mt-6">
        <RejectedCreatorsTab />
      </TabsContent>

      <TabsContent value="database" className="mt-6">
        <CreatorDatabaseTab />
      </TabsContent>
    </Tabs>
  )
}
