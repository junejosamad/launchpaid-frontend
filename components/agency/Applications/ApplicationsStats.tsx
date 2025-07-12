import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, TrendingUp, BarChart3, Loader2 } from "lucide-react"

interface ApplicationsStatsProps {
  totalApplications: number
  pendingApplications: number
  approvalRate: number
  isLoading: boolean
}

export function ApplicationsStats({
  totalApplications,
  pendingApplications,
  approvalRate,
  isLoading
}: ApplicationsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold text-white">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  totalApplications
                )}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-400">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  pendingApplications
                )}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Approval Rate</p>
              <p className="text-2xl font-bold text-green-400">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `${approvalRate}%`
                )}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-400">2.3h</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}