"use client"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"
import { ContentOverview } from "@/components/client/content-overview"
import { ContentFilterSystem } from "@/components/client/content-filter-system"
import { ContentManagementTabs } from "@/components/client/content-management-tabs"
import { Download, Share2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PostsContentPage() {
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
                <nav className="text-sm text-gray-400 mb-2">Posts & Content</nav>
                <h1 className="text-3xl font-bold mb-2">Posts & Content</h1>
                <p className="text-gray-400">Monitor and manage all campaign content from your approved creators</p>
              </div>

              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Content Report
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Media
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Best Performers
                </Button>
              </div>
            </div>
          </div>

          {/* Content Overview Cards */}
          <ContentOverview />

          {/* Filter System */}
          <ContentFilterSystem />

          {/* Main Content Tabs */}
          <ContentManagementTabs />
        </div>
      </div>
    </div>
  )
}
