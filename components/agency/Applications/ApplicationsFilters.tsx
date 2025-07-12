import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Calendar, SlidersHorizontal } from "lucide-react"

interface ApplicationsFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  selectedCampaignId: string
  onCampaignChange: (value: string) => void
  campaigns: Array<{ id: string; name: string }>
  dateRange: { from?: Date; to?: Date } | undefined
  onDateRangeChange: (range: { from?: Date; to?: Date } | undefined) => void
  showFilters: boolean
  onShowFiltersChange: (show: boolean) => void
  statusOptions: string[]
}

export function ApplicationsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  selectedCampaignId,
  onCampaignChange,
  campaigns,
  dateRange,
  onDateRangeChange,
  showFilters,
  onShowFiltersChange,
  statusOptions
}: ApplicationsFiltersProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status} className="text-gray-300 hover:text-white">
              {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCampaignId} onValueChange={onCampaignChange}>
        <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
          <SelectValue placeholder="Select Campaign" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {campaigns.map((campaign) => (
            <SelectItem key={campaign.id} value={campaign.id} className="text-gray-300 hover:text-white">
              {campaign.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
            <Calendar className="h-4 w-4 mr-2" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </>
              ) : (
                dateRange.from.toLocaleDateString()
              )
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
          <div className="p-3">
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-300">From</label>
                  <Input
                    type="date"
                    className="bg-gray-700 border-gray-600 text-white"
                    value={dateRange?.from ? dateRange.from.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined
                      onDateRangeChange({ ...dateRange, from: date })
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">To</label>
                  <Input
                    type="date"
                    className="bg-gray-700 border-gray-600 text-white"
                    value={dateRange?.to ? dateRange.to.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined
                      onDateRangeChange({ ...dateRange, to: date })
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600"
                  onClick={() => onDateRangeChange(undefined)}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Sheet open={showFilters} onOpenChange={onShowFiltersChange}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className={`border-gray-700 ${showFilters ? "bg-purple-600/20 border-purple-500/30 text-purple-400" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-96 bg-gray-900 border-gray-800">
          <SheetHeader>
            <SheetTitle className="text-white">Advanced Filters</SheetTitle>
            <SheetDescription className="text-gray-400">
              Filter applications by detailed criteria
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div>
              <Label className="text-sm font-medium text-white mb-3 block">Audience Gender</Label>
              <div className="space-y-2">
                {["Male Majority", "Female Majority", "Mixed"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={`gender-${option}`} />
                    <Label htmlFor={`gender-${option}`} className="text-sm text-gray-300">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-white mb-3 block">Primary Age Group</Label>
              <div className="space-y-2">
                {["13-17", "18-24", "25-34", "35-44", "45+"].map((age) => (
                  <div key={age} className="flex items-center space-x-2">
                    <Checkbox id={`age-${age}`} />
                    <Label htmlFor={`age-${age}`} className="text-sm text-gray-300">
                      {age}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}