import { Button } from "@/components/ui/button"
import { Download, UserPlus, Settings } from "lucide-react"

interface ApplicationsHeaderProps {
  applicationsCount: number
  isLoading: boolean
  onInviteClick: () => void
}

export function ApplicationsHeader({ 
  applicationsCount, 
  isLoading, 
  onInviteClick 
}: ApplicationsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <p className="text-gray-400 mt-1">
          {isLoading 
            ? "Loading applications..." 
            : `${applicationsCount} applications to review`
          }
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onInviteClick}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Creators
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}