"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star, MapPin, Users, Calendar, TrendingUp, Shield, AlertTriangle } from "lucide-react"

interface CreatorProfileModalProps {
  creator: any
  isOpen: boolean
  onClose: () => void
}

export function CreatorProfileModal({ creator, isOpen, onClose }: CreatorProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">Creator Profile Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Header */}
          <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${creator.name.split(" ")[0]}`} />
              <AvatarFallback className="text-2xl">
                {creator.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-2xl font-bold">{creator.name}</h2>
                <p className="text-purple-400 text-lg">{creator.handle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-green-600 text-green-400">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge
                    variant={creator.priority === "High Priority" ? "default" : "secondary"}
                    className={creator.priority === "High Priority" ? "bg-red-600" : "bg-yellow-600"}
                  >
                    {creator.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Followers</div>
                  <div className="text-xl font-bold">{creator.followers}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Engagement</div>
                  <div className="text-xl font-bold text-green-400">{creator.engagementRate}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Content Score</div>
                  <div className="text-xl font-bold flex items-center gap-1">
                    {creator.contentScore}
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Brand Fit</div>
                  <div className="text-xl font-bold text-purple-400">{creator.brandFit}%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-2" />
                Approve Creator
              </Button>
              <Button variant="outline" className="border-red-700 text-red-400 hover:bg-red-900 bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Reject Creator
              </Button>
            </div>
          </div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="overview">Profile Overview</TabsTrigger>
              <TabsTrigger value="audience">Audience Analysis</TabsTrigger>
              <TabsTrigger value="content">Content Analysis</TabsTrigger>
              <TabsTrigger value="brand-fit">Brand Fit Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Creator Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {creator.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Account Age</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          2.5 years
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Contact Information</div>
                      <div className="space-y-1 text-sm">
                        <div>📧 emma.rodriguez@email.com</div>
                        <div>📱 +1 (555) 123-4567</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400">Previous Campaigns</div>
                      <div className="text-lg font-semibold">12 successful campaigns</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total GMV Generated</div>
                      <div className="text-lg font-semibold text-green-400">$45,230</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Average Campaign ROI</div>
                      <div className="text-lg font-semibold text-purple-400">4.2x</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Reliability Score</div>
                      <div className="text-lg font-semibold">98% on-time delivery</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Demographics Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Gender Distribution</div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full"
                            style={{ width: `${creator.demographics.male}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          👨 {creator.demographics.male}% / 👩 {creator.demographics.female}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Age Distribution</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">18-24</span>
                          <span className="text-sm font-semibold">68%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">25-34</span>
                          <span className="text-sm font-semibold">22%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">35-44</span>
                          <span className="text-sm font-semibold">8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">45+</span>
                          <span className="text-sm font-semibold">2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Audience Quality</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Engagement Authenticity</span>
                      <span className="text-sm font-semibold text-green-400">94% Real</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Follower Growth Rate</span>
                      <span className="text-sm font-semibold text-green-400">+12% (Organic)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Target Audience Match</span>
                      <span className="text-sm font-semibold text-purple-400">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Purchasing Power</span>
                      <span className="text-sm font-semibold text-yellow-400">High</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Content Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-700 rounded border border-gray-600">
                          <img
                            src={`/placeholder.svg?height=80&width=80&text=Post${i + 1}`}
                            alt={`Content ${i + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Fashion Content</span>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Lifestyle Content</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Product Reviews</span>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400">Best Performing Content</div>
                      <div className="text-sm font-semibold">Fashion hauls & styling tips</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Optimal Posting Times</div>
                      <div className="text-sm font-semibold">6-8 PM EST weekdays</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Top Hashtags</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["#fashion", "#ootd", "#style", "#outfit"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Viral Content</div>
                      <div className="text-sm font-semibold text-green-400">3 posts &gt;100K views</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="brand-fit" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      Brand Safety Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Content Appropriateness</span>
                      <span className="text-sm font-semibold text-green-400">Excellent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Brand Value Alignment</span>
                      <span className="text-sm font-semibold text-green-400">95% Match</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">FTC Compliance</span>
                      <span className="text-sm font-semibold text-green-400">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Controversy Risk</span>
                      <span className="text-sm font-semibold text-green-400">Very Low</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                      <div className="text-sm font-semibold text-green-400 mb-1">Low Risk Profile</div>
                      <div className="text-xs text-gray-400">
                        No significant brand safety concerns identified. Strong track record of professional
                        collaborations.
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Reliability Score</div>
                      <div className="text-sm font-semibold text-green-400">98% (Excellent)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Competition Conflicts</div>
                      <div className="text-sm font-semibold text-green-400">None Detected</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
