"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, Filter } from "lucide-react"

interface GlobalFilterPanelProps {
  dateRange: string
  onDateRangeChange: (range: string) => void
  segment: string
  onSegmentChange: (segment: string) => void
  metricView: string
  onMetricViewChange: (view: string) => void
  compareMode: boolean
  onCompareModeChange: (compare: boolean) => void
}

export function GlobalFilterPanel({
  dateRange,
  onDateRangeChange,
  segment,
  onSegmentChange,
  metricView,
  onMetricViewChange,
  compareMode,
  onCompareModeChange,
}: GlobalFilterPanelProps) {
  return (
    <div className="bg-gray-900/50 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Select value={dateRange} onValueChange={onDateRangeChange}>
              <SelectTrigger className="w-[160px] bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1d">Yesterday</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="campaign">Campaign start</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Segment Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={segment} onValueChange={onSegmentChange}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="male-18-24">Male Creators (18-24)</SelectItem>
                <SelectItem value="female-25-34">Female Creators (25-34)</SelectItem>
                <SelectItem value="custom">Custom Segments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Compare Toggle */}
          <div className="flex items-center gap-2">
            <Switch id="compare-mode" checked={compareMode} onCheckedChange={onCompareModeChange} />
            <Label htmlFor="compare-mode" className="text-sm text-gray-400">
              Compare to previous period
            </Label>
          </div>
        </div>

        {/* Metric View Toggle */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
          {["performance", "financial", "creator"].map((view) => (
            <Button
              key={view}
              variant={metricView === view ? "default" : "ghost"}
              size="sm"
              onClick={() => onMetricViewChange(view)}
              className={
                metricView === view ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }
            >
              {view === "performance" && "Performance View"}
              {view === "financial" && "Financial View"}
              {view === "creator" && "Creator View"}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
