import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Check, X, Eye, MessageSquare, Loader2, AlertCircle, User } from "lucide-react"
import type { Application } from "@/hooks/useApplications"

interface ApplicationsTableProps {
  applications: Application[]
  selectedApplications: string[]
  onSelectAll: () => void
  onSelectApplication: (id: string) => void
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
  onViewDetails: (application: Application) => void
  isLoading: boolean
  reviewMutation: any
  formatNumber: (num: number) => string
  formatCurrency: (amount: number) => string
  getStatusColor?: (status: string) => string   // now optional, included default below
}

const defaultGetStatusColor = (status: string) => {
  if (status === "approved") return "bg-green-800 text-green-400";
  if (status === "rejected") return "bg-red-800 text-red-400";
  if (status === "pending") return "bg-yellow-800 text-yellow-400";
  return "bg-gray-700 text-gray-400";
};

const getStatusIcon = (status: string): JSX.Element => {
  if (status === "approved") return <Check className="h-3 w-3 text-green-400" />;
  if (status === "rejected") return <X className="h-3 w-3 text-red-400" />;
  if (status === "pending") return <Loader2 className="h-3 w-3 text-yellow-400 animate-spin" />;
  return <AlertCircle className="h-3 w-3 text-gray-400" />;
};

export function ApplicationsTable({
  applications,
  selectedApplications,
  onSelectAll,
  onSelectApplication,
  onApprove,
  onReject,
  onViewDetails,
  isLoading,
  reviewMutation,
  formatNumber,
  formatCurrency,
  getStatusColor = defaultGetStatusColor,  // use default if not passed
}: ApplicationsTableProps) {
  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <div className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-400">Loading applications...</p>
        </div>
      </Card>
    )
  }

  if (applications.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No applications found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to find applications.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-800/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedApplications.length === applications.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="text-gray-400">Creator Info</TableHead>
            <TableHead className="text-gray-400">Campaign</TableHead>
            <TableHead className="text-gray-400">Creator Metrics</TableHead>
            <TableHead className="text-gray-400">Audience</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} className="border-gray-800 hover:bg-gray-800/50">
              <TableCell>
                <Checkbox
                  checked={selectedApplications.includes(application.id)}
                  onCheckedChange={() => onSelectApplication(application.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={application.creator?.avatar || "/placeholder.svg"} 
                      alt={`${application.creator?.first_name} ${application.creator?.last_name}`} 
                    />
                    <AvatarFallback className="bg-gray-800 text-white text-sm">
                      {(application.creator?.first_name?.[0] || '') + (application.creator?.last_name?.[0] || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <button
                      className="font-semibold text-white hover:text-purple-400 transition-colors underline"
                      onClick={() => onViewDetails(application)}
                    >
                      {application.creator?.first_name} {application.creator?.last_name}
                    </button>
                    <p className="text-xs text-gray-400">
                      {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                    {application.creator?.profile_completion && application.creator.profile_completion < 100 && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">
                          Profile {application.creator.profile_completion}% complete
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <button className="font-medium text-purple-400 hover:text-purple-300 underline">
                    {application.campaign?.name}
                  </button>
                  <p className="text-xs text-gray-400">
                    Status: {application.campaign?.status}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Previous GMV:</span>
                    <span className="text-green-400 font-semibold">
                      {application.previous_gmv ? formatCurrency(application.previous_gmv) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TikTok:</span>
                    <span className="text-white">
                      {application.creator?.tiktok_handle || 'N/A'} 
                      {application.creator?.tiktok_followers && ` (${formatNumber(application.creator.tiktok_followers)})`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instagram:</span>
                    <span className="text-white">
                      {application.creator?.instagram_handle || 'N/A'}
                      {application.creator?.instagram_followers && ` (${formatNumber(application.creator.instagram_followers)})`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engagement:</span>
                    <span className="text-white">
                      {application.engagement_rate ? `${application.engagement_rate}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {application.creator?.audience_gender && (
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-blue-400" />
                      <span className="text-white">{application.creator.audience_gender.male}%</span>
                      <Users className="h-3 w-3 text-pink-400" />
                      <span className="text-white">{application.creator.audience_gender.female}%</span>
                    </div>
                  )}
                  {application.creator?.primary_age && (
                    <div>
                      <span className="text-gray-400">Primary: </span>
                      <span className="text-white">{application.creator.primary_age}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">{application.status}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                    Application
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {application.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onApprove(application.id)}
                        disabled={reviewMutation.isPending}
                      >
                        {reviewMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onReject(application.id)}
                        disabled={reviewMutation.isPending}
                      >
                        {reviewMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 bg-gray-800 hover:bg-gray-700"
                    onClick={() => onViewDetails(application)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
