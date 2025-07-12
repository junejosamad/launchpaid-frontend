import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, Copy, Check, X, AlertCircle, Loader2 } from "lucide-react"
import type { Application } from "@/hooks/useApplications"

interface ApplicationReviewModalProps {
  application: Application | null
  isOpen: boolean
  onClose: () => void
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
  reviewMutation: any
  formatNumber: (num: number) => string
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getStatusIcon: (status: string) => JSX.Element
  copyToClipboard: (text: string) => void
}

export function ApplicationReviewModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  reviewMutation,
  formatNumber,
  formatCurrency,
  getStatusColor,
  getStatusIcon,
  copyToClipboard,
}: ApplicationReviewModalProps) {
  if (!application) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">Application Review</DialogTitle>
              <DialogDescription className="text-gray-400">
                {application.creator?.first_name} {application.creator?.last_name} applied for {application.campaign?.name}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(application.status)}>
                {getStatusIcon(application.status)}
                <span className="ml-1 capitalize">{application.status}</span>
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Creator Profile Overview */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={application.creator?.avatar || "/placeholder.svg"}
                alt={`${application.creator?.first_name} ${application.creator?.last_name}`}
              />
              <AvatarFallback className="bg-gray-700 text-white text-xl">
                {(application.creator?.first_name?.[0] || '') + (application.creator?.last_name?.[0] || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">
                {application.creator?.first_name} {application.creator?.last_name}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                {application.creator?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{application.creator.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => copyToClipboard(application.creator!.email!)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {application.creator?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{application.creator.phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => copyToClipboard(application.creator!.phone!)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              {application.creator?.profile_completion && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Profile Completion:</span>
                    <span className="text-white font-semibold">{application.creator.profile_completion}%</span>
                  </div>
                  <Progress value={application.creator.profile_completion} className="h-2" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-white">
                  {application.creator?.total_followers ? 
                    formatNumber(application.creator.total_followers) : 
                    formatNumber(
                      (application.creator?.tiktok_followers || 0) +
                      (application.creator?.instagram_followers || 0) +
                      (application.creator?.youtube_followers || 0)
                    )
                  }
                </div>
                <div className="text-xs text-gray-400">Total Followers</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-400">
                  {application.previous_gmv ? 
                    formatCurrency(application.previous_gmv) : 
                    'N/A'
                  }
                </div>
                <div className="text-xs text-gray-400">Previous GMV</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-400">
                  {application.engagement_rate ? `${application.engagement_rate}%` : 'N/A'}
                </div>
                <div className="text-xs text-gray-400">Engagement Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-400">
                  {new Date(application.applied_at).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-400">Applied Date</div>
              </CardContent>
            </Card>
          </div>

          {/* Application Message */}
          {application.application_message && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Application Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{application.application_message}</p>
              </CardContent>
            </Card>
          )}

          {/* Social Media Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Social Media Presence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {application.creator?.tiktok_handle && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">TikTok</div>
                    <div className="font-medium text-white">@{application.creator.tiktok_handle}</div>
                    {application.creator.tiktok_followers && (
                      <div className="text-sm text-gray-400">
                        {formatNumber(application.creator.tiktok_followers)} followers
                      </div>
                    )}
                  </div>
                )}
                {application.creator?.instagram_handle && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Instagram</div>
                    <div className="font-medium text-white">@{application.creator.instagram_handle}</div>
                    {application.creator.instagram_followers && (
                      <div className="text-sm text-gray-400">
                        {formatNumber(application.creator.instagram_followers)} followers
                      </div>
                    )}
                  </div>
                )}
                {application.creator?.youtube_handle && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">YouTube</div>
                    <div className="font-medium text-white">@{application.creator.youtube_handle}</div>
                    {application.creator.youtube_followers && (
                      <div className="text-sm text-gray-400">
                        {formatNumber(application.creator.youtube_followers)} subscribers
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          {(application.creator?.audience_gender || application.creator?.primary_age) && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {application.creator.audience_gender && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Gender Distribution</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white">Male</span>
                          <span className="text-blue-400 font-medium">{application.creator.audience_gender.male}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">Female</span>
                          <span className="text-pink-400 font-medium">{application.creator.audience_gender.female}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {application.creator.primary_age && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Primary Age Group</div>
                      <div className="text-white font-medium">{application.creator.primary_age}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Decision Panel */}
          {application.status === "pending" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 h-12"
                onClick={() => onApprove(application.id)}
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Check className="h-5 w-5 mr-2" />
                )}
                Accept Application
              </Button>
              <Button
                variant="destructive"
                className="h-12"
                onClick={() => onReject(application.id)}
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <X className="h-5 w-5 mr-2" />
                )}
                Reject Application
              </Button>
              <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 h-12">
                <AlertCircle className="h-5 w-5 mr-2" />
                Request More Info
              </Button>
            </div>
          )}

          {/* Review Notes for reviewed applications */}
          {application.status !== "pending" && (application.review_notes || application.rejection_reason) && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Review Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{application.review_notes || application.rejection_reason}</p>
                {application.reviewed_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    Reviewed on {new Date(application.reviewed_at).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}