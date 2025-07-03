"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, MessageCircle } from "lucide-react"

export function ClientHeader() {
  const [selectedCampaign, setSelectedCampaign] = useState("Summer Fashion 2024")

  const campaigns = [
    { name: "Summer Fashion 2024", status: "active" },
    { name: "Winter Collection 2024", status: "planning" },
    { name: "Spring Accessories", status: "completed" },
  ]

  return (
    <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Client Dashboard</h1>
            <p className="text-gray-400">Campaign performance overview and creator management</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Campaign Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800">
                  {selectedCampaign}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                {campaigns.map((campaign) => (
                  <DropdownMenuItem
                    key={campaign.name}
                    onClick={() => setSelectedCampaign(campaign.name)}
                    className="text-white hover:bg-gray-800"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{campaign.name}</span>
                      <Badge
                        variant={campaign.status === "active" ? "default" : "secondary"}
                        className={campaign.status === "active" ? "bg-green-600" : ""}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Actions */}
            <Button variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Agency
            </Button>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Client Info Card */}
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <span className="text-purple-400 font-bold text-lg">SF</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">StyleForward Brand</h3>
                <p className="text-sm text-gray-400">Summer Fashion 2024 Campaign</p>
                <p className="text-xs text-gray-500">Managed by Creator Circle Agency</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Campaign Status</div>
              <Badge className="bg-green-600 text-white">Active</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
