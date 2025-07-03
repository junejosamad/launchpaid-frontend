"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export function ContentFilterSystem() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
      {/* Primary Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Select defaultValue="all-posts">
          <SelectTrigger className="bg-black border-gray-700">
            <SelectValue placeholder="Content Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-posts">All Posts</SelectItem>
            <SelectItem value="live">Live/Published</SelectItem>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-creators">
          <SelectTrigger className="bg-black border-gray-700">
            <SelectValue placeholder="Creator Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-creators">All Creators</SelectItem>
            <SelectItem value="top-performers">Top Performers</SelectItem>
            <SelectItem value="emma-rodriguez">Emma Rodriguez</SelectItem>
            <SelectItem value="alex-chen">Alex Chen</SelectItem>
            <SelectItem value="maya-patel">Maya Patel</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-performance">
          <SelectTrigger className="bg-black border-gray-700">
            <SelectValue placeholder="Performance Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-performance">All Performance</SelectItem>
            <SelectItem value="viral">Viral (&gt;100K views)</SelectItem>
            <SelectItem value="high-converting">High Converting (&gt;$500 GMV)</SelectItem>
            <SelectItem value="high-engagement">High Engagement (&gt;5%)</SelectItem>
            <SelectItem value="underperforming">Underperforming (&lt;1K views)</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
        <CollapsibleContent>
          <div className="border-t border-gray-800 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Date Range</label>
                <Select>
                  <SelectTrigger className="bg-black border-gray-700">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Platform</label>
                <Select>
                  <SelectTrigger className="bg-black border-gray-700">
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Content Type</label>
                <Select>
                  <SelectTrigger className="bg-black border-gray-700">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by caption, hashtag, or creator..." className="pl-10 bg-black border-gray-700" />
        </div>

        <Select defaultValue="latest">
          <SelectTrigger className="w-48 bg-black border-gray-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="most-views">Most Views</SelectItem>
            <SelectItem value="highest-gmv">Highest GMV</SelectItem>
            <SelectItem value="most-engagement">Most Engagement</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800">
          <span className="text-sm text-gray-400">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-300">
              {filter}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter(filter)} />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
