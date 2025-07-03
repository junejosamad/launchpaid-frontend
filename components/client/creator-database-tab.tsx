"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Users, TrendingUp, Star, MapPin } from "lucide-react"

export function CreatorDatabaseTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])

  const databaseCreators = [
    {
      id: "1",
      name: "Riley Martinez",
      handle: "@rileymart",
      followers: "78.3K",
      engagementRate: 6.1,
      contentScore: 4.3,
      demographics: { male: 45, female: 55 },
      primaryAge: "18-24 (75%)",
      location: "Austin, TX",
      brandFit: 85,
      contentTags: ["Fashion", "Music", "Lifestyle"],
      avgViews: "32K",
    },
    {
      id: "2",
      name: "David Kim",
      handle: "@davidkimstyle",
      followers: "142.7K",
      engagementRate: 4.8,
      contentScore: 4.7,
      demographics: { male: 40, female: 60 },
      primaryAge: "25-34 (60%)",
      location: "Seattle, WA",
      brandFit: 91,
      contentTags: ["Tech Fashion", "Minimalist", "Urban"],
      avgViews: "48K",
    },
    {
      id: "3",
      name: "Zoe Williams",
      handle: "@zoewilliams",
      followers: "95.1K",
      engagementRate: 5.4,
      contentScore: 4.6,
      demographics: { male: 30, female: 70 },
      primaryAge: "18-24 (68%)",
      location: "Chicago, IL",
      brandFit: 88,
      contentTags: ["Sustainable Fashion", "Lifestyle", "Beauty"],
      avgViews: "41K",
    },
  ]

  const handleCreatorCompare = (creatorId: string) => {
    if (selectedCreators.includes(creatorId)) {
      setSelectedCreators(selectedCreators.filter((id) => id !== creatorId))
    } else if (selectedCreators.length < 3) {
      setSelectedCreators([...selectedCreators, creatorId])
    }
  }

  return (
    <div className="space-y-6">
      {/* Advanced Search & Filter System */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Creator Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search creators by name, handle, location, or content type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Audience Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="micro">1K-10K</SelectItem>
                  <SelectItem value="small">10K-50K</SelectItem>
                  <SelectItem value="medium">50K-100K</SelectItem>
                  <SelectItem value="large">100K-500K</SelectItem>
                  <SelectItem value="mega">500K+</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-gray-700 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-purple-700 text-purple-400 bg-transparent">
              Save Search
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              Load Saved Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Creator Comparison Tool */}
      {selectedCreators.length > 0 && (
        <Card className="bg-purple-900/20 border-purple-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Creator Comparison ({selectedCreators.length}/3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Compare selected creators side-by-side to make informed decisions
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedCreators([])} className="border-gray-700">
                  Clear Selection
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700" disabled={selectedCreators.length < 2}>
                  Compare Creators
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Creator Database Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {databaseCreators.map((creator) => (
          <Card key={creator.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${creator.name.split(" ")[0]}`} />
                    <AvatarFallback>
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{creator.name}</h3>
                    <p className="text-purple-400 text-sm">{creator.handle}</p>
                  </div>
                </div>
                <Button
                  variant={selectedCreators.includes(creator.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCreatorCompare(creator.id)}
                  disabled={!selectedCreators.includes(creator.id) && selectedCreators.length >= 3}
                  className={selectedCreators.includes(creator.id) ? "bg-purple-600" : "border-gray-700"}
                >
                  {selectedCreators.includes(creator.id) ? "Selected" : "Compare"}
                </Button>
              </div>

              <div className="space-y-3">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-800">
                  <div>
                    <div className="text-sm text-gray-400">Followers</div>
                    <div className="font-semibold">{creator.followers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Engagement</div>
                    <div className="font-semibold flex items-center gap-1">
                      {creator.engagementRate}%
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Content Score</div>
                    <div className="font-semibold flex items-center gap-1">
                      {creator.contentScore}
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Brand Fit</div>
                    <div className="font-semibold text-purple-400">{creator.brandFit}%</div>
                  </div>
                </div>

                {/* Demographics */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Demographics:</span>
                    <span>
                      👨 {creator.demographics.male}% / 👩 {creator.demographics.female}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Primary Age:</span>
                    <span>{creator.primaryAge}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400">{creator.location}</span>
                  </div>
                </div>

                {/* Content Tags */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Content Focus:</div>
                  <div className="flex flex-wrap gap-1">
                    {creator.contentTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">Avg {creator.avgViews} views per post</div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-700 text-purple-400 hover:bg-purple-900 bg-transparent"
                  >
                    Request Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendation Engine */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="text-sm font-semibold text-blue-400 mb-2">Recommended for You</div>
              <div className="text-sm text-gray-300 mb-3">
                Based on your previous approvals and campaign performance, these creators might be a great fit:
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-blue-600 text-blue-400">
                  Riley Martinez
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-400">
                  David Kim
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-400">
                  Zoe Williams
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                <div className="text-sm font-semibold text-green-400 mb-1">Similar to Top Performers</div>
                <div className="text-xs text-gray-400">
                  Creators with similar audience and performance metrics to your best performers
                </div>
              </div>
              <div className="p-3 bg-purple-900/20 border border-purple-700 rounded-lg">
                <div className="text-sm font-semibold text-purple-400 mb-1">Trending Creators</div>
                <div className="text-xs text-gray-400">
                  Rising creators in your target demographic with strong growth potential
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
