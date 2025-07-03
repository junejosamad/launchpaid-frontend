"use client"

import { useState } from "react"
import { Upload, Plus, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface CampaignCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

const brands = [
  { id: "neuro-gum", name: "Neuro Gum", logo: "/placeholder.svg?height=32&width=32" },
  { id: "drbioccare", name: "DrBioCare", logo: "/placeholder.svg?height=32&width=32" },
  { id: "flexpromeals", name: "FlexProMeals", logo: "/placeholder.svg?height=32&width=32" },
  { id: "golf-partner", name: "Golf Partner", logo: "/placeholder.svg?height=32&width=32" },
  { id: "fashion-nova", name: "Fashion Nova", logo: "/placeholder.svg?height=32&width=32" },
]

export function CampaignCreationModal({ isOpen, onClose }: CampaignCreationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    campaignName: "",
    brandId: "",
    thumbnail: null as File | null,
    description: "",
    campaignType: "one-time",
    startDate: "",
    endDate: "",
    gracePeriod: 3,

    // Step 2: Payout Structure
    payoutType: "pay-per-post",
    baseRate: 0,
    minimumPosts: 1,
    commissionPercentage: 0,
    minimumGmv: 0,
    bonusTiers: [] as Array<{ threshold: number; bonus: number; type: "flat" | "percentage" }>,
    leaderboardBonus: false,
    topCreatorsCount: 3,
    referralProgram: false,
    referralRate: 0,

    // Step 3: Creator Management
    totalCapacity: 25,
    segments: [] as Array<{ name: string; limit: number; deliverables: number }>,
    maxCampaignsPerCreator: 3,
    autoApproval: false,

    // Step 4: Tracking & Integrations
    trackingMethod: "hashtag",
    hashtags: [""],
    productUrls: [""],
    discordRoles: false,
    discordRequired: false,
    discordChannel: false,
    requireApproval: true,
    autoSms: true,
    emailNotifications: true,

    // Step 5: Goals & Launch
    goalType: "gmv",
    targetGmv: 0,
    targetPosts: 0,
    trackMetrics: [] as string[],
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
  }

  const addBonusTier = () => {
    setFormData({
      ...formData,
      bonusTiers: [...formData.bonusTiers, { threshold: 0, bonus: 0, type: "flat" }],
    })
  }

  const addSegment = () => {
    setFormData({
      ...formData,
      segments: [...formData.segments, { name: "", limit: 0, deliverables: 1 }],
    })
  }

  const addHashtag = () => {
    setFormData({
      ...formData,
      hashtags: [...formData.hashtags, ""],
    })
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="campaignName">Campaign Name *</Label>
          <Input
            id="campaignName"
            value={formData.campaignName}
            onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
            placeholder="Enter campaign name"
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Select value={formData.brandId} onValueChange={(value) => setFormData({ ...formData, brandId: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  <div className="flex items-center gap-2">
                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-4 w-4 rounded" />
                    {brand.name}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="new">+ Add New Brand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Campaign Thumbnail</Label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">Drag and drop an image, or click to browse</p>
          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the campaign for creators..."
          className="bg-gray-800 border-gray-700 min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Campaign Type</Label>
        <RadioGroup
          value={formData.campaignType}
          onValueChange={(value) => setFormData({ ...formData, campaignType: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time">One-time Campaign (specific start/end dates)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rolling" id="rolling" />
            <Label htmlFor="rolling">Rolling 30-Day Campaign</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gracePeriod">Grace Period (days)</Label>
          <Input
            id="gracePeriod"
            type="number"
            value={formData.gracePeriod}
            onChange={(e) => setFormData({ ...formData, gracePeriod: Number.parseInt(e.target.value) })}
            className="bg-gray-800 border-gray-700"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Payout Structure</Label>
        <RadioGroup
          value={formData.payoutType}
          onValueChange={(value) => setFormData({ ...formData, payoutType: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="pay-per-post" id="pay-per-post" />
                <Label htmlFor="pay-per-post" className="font-semibold">
                  Pay Per Post
                </Label>
              </div>
              <p className="text-sm text-gray-400">Fixed amount per approved post</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="gmv-retainer" id="gmv-retainer" />
                <Label htmlFor="gmv-retainer" className="font-semibold">
                  GMV Retainer
                </Label>
              </div>
              <p className="text-sm text-gray-400">Commission-based on sales</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="font-semibold">
                  Hybrid Model
                </Label>
              </div>
              <p className="text-sm text-gray-400">Base rate + commission</p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Payout Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(formData.payoutType === "pay-per-post" || formData.payoutType === "hybrid") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="baseRate">Base Rate ($)</Label>
              <Input
                id="baseRate"
                type="number"
                value={formData.baseRate}
                onChange={(e) => setFormData({ ...formData, baseRate: Number.parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumPosts">Minimum Posts Required</Label>
              <Input
                id="minimumPosts"
                type="number"
                value={formData.minimumPosts}
                onChange={(e) => setFormData({ ...formData, minimumPosts: Number.parseInt(e.target.value) })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </>
        )}

        {(formData.payoutType === "gmv-retainer" || formData.payoutType === "hybrid") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="commissionPercentage">Commission Percentage (%)</Label>
              <Input
                id="commissionPercentage"
                type="number"
                value={formData.commissionPercentage}
                onChange={(e) => setFormData({ ...formData, commissionPercentage: Number.parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumGmv">Minimum GMV Threshold ($)</Label>
              <Input
                id="minimumGmv"
                type="number"
                value={formData.minimumGmv}
                onChange={(e) => setFormData({ ...formData, minimumGmv: Number.parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </>
        )}
      </div>

      {/* Bonus Tiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Bonus Tiers</Label>
          <Button onClick={addBonusTier} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tier
          </Button>
        </div>
        {formData.bonusTiers.map((tier, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>GMV Threshold ($)</Label>
                  <Input
                    type="number"
                    value={tier.threshold}
                    onChange={(e) => {
                      const newTiers = [...formData.bonusTiers]
                      newTiers[index].threshold = Number.parseFloat(e.target.value)
                      setFormData({ ...formData, bonusTiers: newTiers })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bonus Amount</Label>
                  <Input
                    type="number"
                    value={tier.bonus}
                    onChange={(e) => {
                      const newTiers = [...formData.bonusTiers]
                      newTiers[index].bonus = Number.parseFloat(e.target.value)
                      setFormData({ ...formData, bonusTiers: newTiers })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={tier.type}
                    onValueChange={(value: "flat" | "percentage") => {
                      const newTiers = [...formData.bonusTiers]
                      newTiers[index].type = value
                      setFormData({ ...formData, bonusTiers: newTiers })
                    }}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Amount ($)</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Leaderboard Bonuses</Label>
            <p className="text-sm text-gray-400">Reward top performing creators</p>
          </div>
          <Switch
            checked={formData.leaderboardBonus}
            onCheckedChange={(checked) => setFormData({ ...formData, leaderboardBonus: checked })}
          />
        </div>

        {formData.leaderboardBonus && (
          <div className="space-y-2">
            <Label htmlFor="topCreatorsCount">Top Creators to Reward</Label>
            <Input
              id="topCreatorsCount"
              type="number"
              value={formData.topCreatorsCount}
              onChange={(e) => setFormData({ ...formData, topCreatorsCount: Number.parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <Label>Referral Program</Label>
            <p className="text-sm text-gray-400">Reward creators for referrals</p>
          </div>
          <Switch
            checked={formData.referralProgram}
            onCheckedChange={(checked) => setFormData({ ...formData, referralProgram: checked })}
          />
        </div>

        {formData.referralProgram && (
          <div className="space-y-2">
            <Label htmlFor="referralRate">Referral Rate (%)</Label>
            <Input
              id="referralRate"
              type="number"
              value={formData.referralRate}
              onChange={(e) => setFormData({ ...formData, referralRate: Number.parseFloat(e.target.value) })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="totalCapacity">Total Creator Capacity</Label>
        <Input
          id="totalCapacity"
          type="number"
          value={formData.totalCapacity}
          onChange={(e) => setFormData({ ...formData, totalCapacity: Number.parseInt(e.target.value) })}
          className="bg-gray-800 border-gray-700"
        />
        <p className="text-sm text-gray-400">Maximum number of creators for this campaign</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Creator Segments</Label>
          <Button onClick={addSegment} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Segment
          </Button>
        </div>
        {formData.segments.map((segment, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Segment Name</Label>
                  <Input
                    value={segment.name}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].name = e.target.value
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    placeholder="e.g., Male, Female, 18-24"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Creator Limit</Label>
                  <Input
                    type="number"
                    value={segment.limit}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].limit = Number.parseInt(e.target.value)
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Required Deliverables</Label>
                  <Input
                    type="number"
                    value={segment.deliverables}
                    onChange={(e) => {
                      const newSegments = [...formData.segments]
                      newSegments[index].deliverables = Number.parseInt(e.target.value)
                      setFormData({ ...formData, segments: newSegments })
                    }}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxCampaignsPerCreator">Max Active Campaigns per Creator</Label>
        <Input
          id="maxCampaignsPerCreator"
          type="number"
          value={formData.maxCampaignsPerCreator}
          onChange={(e) => setFormData({ ...formData, maxCampaignsPerCreator: Number.parseInt(e.target.value) })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Auto-Approval</Label>
          <p className="text-sm text-gray-400">Automatically accept qualified creators</p>
        </div>
        <Switch
          checked={formData.autoApproval}
          onCheckedChange={(checked) => setFormData({ ...formData, autoApproval: checked })}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Tracking Method</Label>
        <RadioGroup
          value={formData.trackingMethod}
          onValueChange={(value) => setFormData({ ...formData, trackingMethod: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hashtag" id="hashtag" />
            <Label htmlFor="hashtag">Hashtag Tracking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="product-links" id="product-links" />
            <Label htmlFor="product-links">TikTok Shop Product Links</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.trackingMethod === "hashtag" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Campaign Hashtags</Label>
            <Button onClick={addHashtag} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Hashtag
            </Button>
          </div>
          {formData.hashtags.map((hashtag, index) => (
            <Input
              key={index}
              value={hashtag}
              onChange={(e) => {
                const newHashtags = [...formData.hashtags]
                newHashtags[index] = e.target.value
                setFormData({ ...formData, hashtags: newHashtags })
              }}
              placeholder="#campaignhashtag"
              className="bg-gray-800 border-gray-700"
            />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <Label>Discord Integration</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-assign Discord Roles</Label>
              <p className="text-sm text-gray-400">Automatically assign campaign roles</p>
            </div>
            <Switch
              checked={formData.discordRoles}
              onCheckedChange={(checked) => setFormData({ ...formData, discordRoles: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Required Discord Membership</Label>
              <p className="text-sm text-gray-400">Creators must be in Discord server</p>
            </div>
            <Switch
              checked={formData.discordRequired}
              onCheckedChange={(checked) => setFormData({ ...formData, discordRequired: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Create Campaign Channel</Label>
              <p className="text-sm text-gray-400">Create dedicated Discord channel</p>
            </div>
            <Switch
              checked={formData.discordChannel}
              onCheckedChange={(checked) => setFormData({ ...formData, discordChannel: checked })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Content & Communication</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Post Approval</Label>
              <p className="text-sm text-gray-400">Manual approval before posts go live</p>
            </div>
            <Switch
              checked={formData.requireApproval}
              onCheckedChange={(checked) => setFormData({ ...formData, requireApproval: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto SMS Reminders</Label>
              <p className="text-sm text-gray-400">SendBlue integration for reminders</p>
            </div>
            <Switch
              checked={formData.autoSms}
              onCheckedChange={(checked) => setFormData({ ...formData, autoSms: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-400">Send email updates to creators</p>
            </div>
            <Switch
              checked={formData.emailNotifications}
              onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Campaign Goal</Label>
        <RadioGroup value={formData.goalType} onValueChange={(value) => setFormData({ ...formData, goalType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gmv" id="gmv-goal" />
            <Label htmlFor="gmv-goal">Target GMV</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="posts" id="posts-goal" />
            <Label htmlFor="posts-goal">Total Posts</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.goalType === "gmv" && (
          <div className="space-y-2">
            <Label htmlFor="targetGmv">Target GMV ($)</Label>
            <Input
              id="targetGmv"
              type="number"
              value={formData.targetGmv}
              onChange={(e) => setFormData({ ...formData, targetGmv: Number.parseFloat(e.target.value) })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}

        {formData.goalType === "posts" && (
          <div className="space-y-2">
            <Label htmlFor="targetPosts">Target Posts</Label>
            <Input
              id="targetPosts"
              type="number"
              value={formData.targetPosts}
              onChange={(e) => setFormData({ ...formData, targetPosts: Number.parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label>Success Metrics to Track</Label>
        <div className="grid grid-cols-2 gap-4">
          {["GMV", "Posts", "Engagement", "Views", "Clicks", "Conversions"].map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={metric}
                checked={formData.trackMetrics.includes(metric)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({ ...formData, trackMetrics: [...formData.trackMetrics, metric] })
                  } else {
                    setFormData({
                      ...formData,
                      trackMetrics: formData.trackMetrics.filter((m) => m !== metric),
                    })
                  }
                }}
                className="rounded border-gray-700 bg-gray-800"
              />
              <Label htmlFor={metric}>{metric}</Label>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Campaign Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <h3 className="font-semibold">{formData.campaignName || "Campaign Name"}</h3>
                <p className="text-sm text-gray-400">
                  {brands.find((b) => b.id === formData.brandId)?.name || "Brand Name"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              {formData.description || "Campaign description will appear here..."}
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">
                {formData.payoutType === "pay-per-post"
                  ? `$${formData.baseRate}/post`
                  : formData.payoutType === "gmv-retainer"
                    ? `${formData.commissionPercentage}% commission`
                    : "Hybrid payout"}
              </Badge>
              <Badge variant="outline">{formData.totalCapacity} spots</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      default:
        return renderStep1()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Campaign</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => handleStepClick(step)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  step === currentStep
                    ? "bg-purple-600 text-white"
                    : step < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {step < currentStep ? <Check className="h-4 w-4" /> : step}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="bg-gray-800 border-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-800 border-gray-700">
              Save Draft
            </Button>
            {currentStep === totalSteps ? (
              <div className="flex gap-2">
                <Button variant="outline" className="bg-gray-800 border-gray-700">
                  Preview
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Launch Campaign</Button>
              </div>
            ) : (
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
