"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Download, ExternalLink, Play, TrendingUp, Users, Eye, Heart, MessageSquare, Share2 } from "lucide-react"

interface PostAnalysisModalProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

export function PostAnalysisModal({ post, isOpen, onClose }: PostAnalysisModalProps) {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Viral":
        return "bg-red-600/20 text-red-300"
      case "High Converting":
        return "bg-green-600/20 text-green-300"
      case "Top Performer":
        return "bg-purple-600/20 text-purple-300"
      case "High Engagement":
        return "bg-blue-600/20 text-blue-300"
      case "Trending":
        return "bg-yellow-600/20 text-yellow-300"
      default:
        return "bg-gray-600/20 text-gray-300"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Post Analysis</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview">Post Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            <TabsTrigger value="audience">Audience Insights</TabsTrigger>
            <TabsTrigger value="strategy">Content Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Display */}
              <Card className="bg-black border-gray-800">
                <CardContent className="p-6">
                  <div className="relative aspect-square mb-4">
                    <img
                      src={post.thumbnail || "/placeholder.svg"}
                      alt="Content"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-4">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className={getBadgeColor(post.performanceBadge)}>{post.performanceBadge}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Original Caption</h3>
                      <p className="text-gray-300">{post.caption}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Platform:</span>
                        <span className="ml-2 capitalize">{post.platform}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Published:</span>
                        <span className="ml-2">{post.postDate}</span>
                      </div>
                      {post.duration && (
                        <div>
                          <span className="text-gray-400">Duration:</span>
                          <span className="ml-2">{post.duration}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400">Type:</span>
                        <span className="ml-2">{post.isVideo ? "Video" : "Image"}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Context */}
              <Card className="bg-black border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={post.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{post.creator.name}</h3>
                      <p className="text-gray-400">{post.creator.handle}</p>
                      <Badge variant="secondary" className="mt-1">
                        Summer Fashion 2024
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Campaign Context</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Campaign: Summer Fashion 2024</div>
                        <div>Deliverable: Product showcase video</div>
                        <div>Status: ✅ Approved by client</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Content Requirements</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>✅ Product featured prominently</div>
                        <div>✅ Brand hashtags included</div>
                        <div>✅ FTC disclosure present</div>
                        <div>✅ Brand guidelines followed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detailed Metrics */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Engagement Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span>Likes</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{post.metrics.likes}</div>
                        <div className="text-xs text-green-400">+2.4% vs avg</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span>Comments</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{post.metrics.comments}</div>
                        <div className="text-xs text-green-400">+1.8% vs avg</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-purple-400" />
                        <span>Shares</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{post.metrics.shares}</div>
                        <div className="text-xs text-green-400">+5.2% vs avg</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span>Saves</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">156</div>
                        <div className="text-xs text-gray-400">Platform dependent</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Performance */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Business Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>GMV Generated</span>
                      <div className="text-right">
                        <div className="font-semibold text-green-400">{post.business.gmv}</div>
                        <div className="text-xs text-gray-400">Direct attribution</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Conversion Rate</span>
                      <div className="text-right">
                        <div className="font-semibold">{post.business.conversionRate}</div>
                        <div className="text-xs text-gray-400">Click to purchase</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Cost per View</span>
                      <div className="text-right">
                        <div className="font-semibold">{post.business.costPerView}</div>
                        <div className="text-xs text-gray-400">Campaign cost basis</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>ROI</span>
                      <div className="text-right">
                        <div className="font-semibold text-purple-400">{post.business.roi}</div>
                        <div className="text-xs text-gray-400">Return on investment</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reach & Impressions */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Reach & Impressions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Reach</span>
                      <div className="text-right">
                        <div className="font-semibold">180K</div>
                        <div className="text-xs text-gray-400">Unique users</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Impressions</span>
                      <div className="text-right">
                        <div className="font-semibold">245K</div>
                        <div className="text-xs text-gray-400">Total views</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Impression/Reach Ratio</span>
                      <div className="text-right">
                        <div className="font-semibold">1.36</div>
                        <div className="text-xs text-gray-400">Avg views per user</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Journey */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Customer Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Profile Visits</span>
                      <span className="font-semibold">2.4K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Link Clicks</span>
                      <span className="font-semibold">1.8K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cart Additions</span>
                      <span className="font-semibold">456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Purchases (24h)</span>
                      <span className="font-semibold text-green-400">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Purchases (48h)</span>
                      <span className="font-semibold text-green-400">127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Purchases (72h)</span>
                      <span className="font-semibold text-green-400">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Demographics */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Gender Split</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Female</span>
                            <span>62%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "62%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Male</span>
                            <span>38%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "38%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Age Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">18-24</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">25-34</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">35-44</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">45+</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Patterns */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Engagement Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Peak Activity Times</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Morning: 8-10 AM (23% of engagement)</div>
                        <div>Afternoon: 2-4 PM (31% of engagement)</div>
                        <div>Evening: 7-9 PM (46% of engagement)</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Device Usage</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Mobile: 87%</div>
                        <div>Desktop: 13%</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Geographic Reach</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>California: 28%</div>
                        <div>New York: 15%</div>
                        <div>Texas: 12%</div>
                        <div>Florida: 10%</div>
                        <div>Other: 35%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Analysis */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Hashtag Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>#SummerFashion2024</span>
                          <span className="text-green-400">High impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span>#LaunchPaid</span>
                          <span className="text-green-400">High impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span>#OOTD</span>
                          <span className="text-yellow-400">Medium impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span>#Fashion</span>
                          <span className="text-yellow-400">Medium impact</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Content Elements</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>✅ Clear product showcase</div>
                        <div>✅ Authentic styling</div>
                        <div>✅ Good lighting and quality</div>
                        <div>✅ Engaging caption</div>
                        <div>✅ Trending audio (TikTok)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Suggestions */}
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Optimization Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-400">What Worked Well</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>• High-quality video production</div>
                        <div>• Authentic product integration</div>
                        <div>• Optimal posting time (7 PM)</div>
                        <div>• Strong call-to-action</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-purple-400">Replication Strategy</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>• Use similar styling approach</div>
                        <div>• Maintain video quality standards</div>
                        <div>• Post during peak engagement hours</div>
                        <div>• Include trending audio elements</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-blue-400">Cross-Platform Potential</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>• Adapt for Instagram Reels</div>
                        <div>• Create YouTube Shorts version</div>
                        <div>• Use stills for Instagram posts</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
