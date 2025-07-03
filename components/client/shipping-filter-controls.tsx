"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, MessageSquare, CheckSquare, X } from "lucide-react"

export function ShippingFilterControls() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      {/* Primary Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters:</span>
        </div>

        <Select>
          <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Shipping Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="to-ship">To Ship</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Priority Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent &gt;3 days)</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="recent">Recent Approvals</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Creator Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Creators</SelectItem>
            <SelectItem value="top-performers">Top Performers</SelectItem>
            <SelectItem value="location">Filter by Location</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by creator name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {(activeFilters.length > 0 || searchQuery) && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-purple-600/20 text-purple-400 border-purple-600/30 pr-1"
            >
              {filter}
              <button onClick={() => removeFilter(filter)} className="ml-1 hover:bg-purple-600/30 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Quick Actions:</span>
        </div>

        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          <CheckSquare className="h-4 w-4 mr-2" />
          Select All Pending
        </Button>

        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Generate Labels
        </Button>

        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          <MessageSquare className="h-4 w-4 mr-2" />
          Bulk SMS
        </Button>

        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export Addresses
        </Button>
      </div>
    </div>
  )
}
