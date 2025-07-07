"use client"

import { CardDescription } from "@/components/ui/card"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadButton } from "@/utils/uploadthing"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award } from "lucide-react"

interface CampaignDetailsModalProps {
  campaign: {
    currentGmv?: number
    gmvTarget?: number
    totalDeliverables?: number
    completedDeliverables?: number
    daysLeft?: number
    deliverables?: any[]
    title?: string
    brand?: string
    [key: string]: any // Allow other properties
  }
  isOpen: boolean
  onClose: () => void
}

const formatNumber = (n?: number) => (n ?? 0).toLocaleString()

// Sample campaign-specific leaderboard data
const campaignLeaderboard = [
  {
    rank: 1,
    creator: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    username: "@sarahstyle",
    gmv: 4200,
    deliverables: "5/5",
    engagement: "12.5%",
    views: "850K",
    isCurrentUser: false,
  },
  {
    rank: 2,
    creator: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    username: "@mikefit",
    gmv: 3800,
    deliverables: "4/5",
    engagement: "11.2%",
    views: "720K",
    isCurrentUser: false,
  },
  {
    rank: 3,
    creator: "Alex Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    username: "@alexcreates",
    gmv: 850,
    deliverables: "2/5",
    engagement: "9.8%",
    views: "320K",
    isCurrentUser: true, // Current user
  },
  {
    rank: 4,
    creator: "Emma Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    username: "@emmastyle",
    gmv: 650,
    deliverables: "2/5",
    engagement: "8.9%",
    views: "280K",
    isCurrentUser: false,
  },
  {
    rank: 5,
    creator: "James Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    username: "@jamestrends",
    gmv: 420,
    deliverables: "1/5",
    engagement: "7.5%",
    views: "180K",
    isCurrentUser: false,
  },
]

export function CampaignDetailsModal(props: CampaignDetailsModalProps) {
  const { campaign, isOpen, onClose } = props
  const {
    currentGmv = 0,
    gmvTarget = 0,
    totalDeliverables = 0,
    completedDeliverables = 0,
    daysLeft = 0,
    deliverables = [],
    title = "Campaign",
    brand = "Brand",
    ...rest
  } = props.campaign

  const gmvProgress = gmvTarget ? Math.min((currentGmv / gmvTarget) * 100, 100) : 0
  const deliverableProgress =
    totalDeliverables && totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-gray-400 font-bold">#{rank}</span>
    }
  }

  return (
    <Dialog 
      open={props.isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          props.onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto dark:bg-zinc-900 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-xl">{title} - Campaign Details</DialogTitle>
          <DialogDescription>
            Track your progress, manage deliverables, and see how you rank against other creators in this campaign.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="leaderboard">Campaign Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* GMV Progress */}
              <div className="bg-gray-100 rounded-lg p-4 dark:bg-zinc-800">
                <h3 className="text-lg font-semibold mb-2">GMV Progress</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>Current GMV:</span>
                  <span className="font-bold">${formatNumber(currentGmv)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>GMV Target:</span>
                  <span>${formatNumber(gmvTarget)}</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${gmvProgress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{gmvProgress.toFixed(1)}% complete</span>
              </div>

              {/* Deliverables Progress */}
              <div className="bg-gray-100 rounded-lg p-4 dark:bg-zinc-800">
                <h3 className="text-lg font-semibold mb-2">Deliverables Progress</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>Completed:</span>
                  <span className="font-bold">{completedDeliverables}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Total:</span>
                  <span>{totalDeliverables}</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${deliverableProgress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {deliverableProgress.toFixed(1)}% complete
                </span>
              </div>

              {/* Campaign Timeline */}
              <div className="bg-gray-100 rounded-lg p-4 dark:bg-zinc-800">
                <h3 className="text-lg font-semibold mb-2">Campaign Timeline</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>Days Remaining:</span>
                  <span className="font-bold text-purple-600">{daysLeft > 0 ? daysLeft : "Ended"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <Badge className={daysLeft > 7 ? "bg-green-600" : daysLeft > 0 ? "bg-yellow-600" : "bg-gray-600"}>
                    {daysLeft > 7 ? "Active" : daysLeft > 0 ? "Ending Soon" : "Completed"}
                  </Badge>
                </div>
              </div>

              {/* Your Ranking */}
              <div className="bg-gray-100 rounded-lg p-4 dark:bg-zinc-800">
                <h3 className="text-lg font-semibold mb-2">Your Campaign Ranking</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold">
                    #3
                  </div>
                  <div>
                    <p className="font-medium">3rd place</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Out of 12 creators</p>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-green-600">↗ Moved up 2 positions this week!</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deliverables">
            <Table>
              <TableCaption>Your deliverables for this campaign</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliverables.length > 0 ? (
                  deliverables.map((deliverable, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {deliverable.status === "complete" ? (
                          <Badge className="bg-green-600 hover:bg-green-700">Complete</Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </TableCell>
                      <TableCell>{deliverable.title}</TableCell>
                      <TableCell>{deliverable.description}</TableCell>
                      <TableCell className="text-right">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res)
                            alert("Upload Completed!")
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Default deliverables when none provided
                  <>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Badge className="bg-green-600 hover:bg-green-700">Complete</Badge>
                      </TableCell>
                      <TableCell>Unboxing Video</TableCell>
                      <TableCell>Create an engaging unboxing video showcasing the product</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">Submitted</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Badge className="bg-green-600 hover:bg-green-700">Complete</Badge>
                      </TableCell>
                      <TableCell>Styling Tutorial</TableCell>
                      <TableCell>Show different ways to style the summer collection</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">Submitted</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell>Product Review</TableCell>
                      <TableCell>Honest review after using products for a week</TableCell>
                      <TableCell className="text-right">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res)
                            alert("Upload Completed!")
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="dark:bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-400" />
                  {title} Campaign Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against other creators in this specific campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaignLeaderboard.map((creator, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        creator.isCurrentUser
                          ? "bg-purple-500/10 border-purple-500/30 dark:bg-purple-500/20"
                          : "bg-gray-50 border-gray-200 dark:bg-zinc-700 dark:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(creator.rank)}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.creator} />
                          <AvatarFallback>
                            {creator.creator
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{creator.creator}</p>
                            {creator.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{creator.username}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-green-600">${creator.gmv.toLocaleString()}</p>
                          <p className="text-gray-500">GMV</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{creator.deliverables}</p>
                          <p className="text-gray-500">Posts</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{creator.views}</p>
                          <p className="text-gray-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{creator.engagement}</p>
                          <p className="text-gray-500">Engagement</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campaign Leaderboard Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t dark:border-zinc-600">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Creators</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">$18.2K</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Campaign GMV</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">2.1M</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
