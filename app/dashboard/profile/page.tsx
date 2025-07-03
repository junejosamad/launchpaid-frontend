"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Settings,
  Shield,
  Bell,
  LinkIcon,
  Star,
  Target,
  Calendar,
} from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    age: "25",
    gender: "Female",
    ethnicity: "Hispanic",
    address: "",
    tiktokHandle: "@alexjohnson",
    discordHandle: "alexjohnson#1234",
    primaryNiche: "",
    secondaryNiches: ["Fashion", "Lifestyle"],
    audienceDemographics: false,
  })

  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    inApp: true,
    campaigns: true,
    payments: true,
    opportunities: true,
    performance: false,
  })

  const completionPercentage = 75
  const incompleteItems = 3

  const performanceMetrics = {
    totalGMV: "$8,750",
    consistency: "95%",
    rating: "4.8",
    campaignsCompleted: 15,
    activeCampaigns: 3,
    followers: "25,644",
  }

  const badges = [
    { name: "$5K GMV Badge", earned: true, color: "bg-purple-600" },
    { name: "$10K GMV Badge", earned: false, progress: 87.5, color: "bg-gray-600" },
    { name: "Consistency Pro", earned: true, color: "bg-green-600" },
    { name: "Top Performer", earned: false, progress: 60, color: "bg-gray-600" },
  ]

  const completionItems = [
    { name: "Basic Info Complete", completed: true, description: "Name, email, phone" },
    { name: "TikTok Connected", completed: true, description: "Handle and account verification" },
    { name: "Discord Connected", completed: true, description: "Handle and server membership" },
    { name: "Shipping Address", completed: false, description: "Required for sample shipping" },
    { name: "Audience Demographics", completed: false, description: "Required for campaign matching" },
    { name: "Content Niches", completed: false, description: "Required for campaign targeting" },
  ]

  const audienceData = {
    gender: { female: 67, male: 33 },
    age: { "18-24": 45, "25-34": 35, "35-44": 15, "45+": 5 },
    locations: "United States (78%), Canada (12%), UK (10%)",
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-gray-400">Complete your profile to unlock all campaign opportunities</p>
            </div>

            {/* Profile Completion Progress */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">{completionPercentage}% Profile Complete</h3>
                    <p className="text-gray-300">{incompleteItems} items left to complete</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">Complete Profile</Button>
                </div>
                <Progress value={completionPercentage} className="h-3 bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </Progress>
                <p className="text-sm text-gray-400 mt-2">Complete your profile to apply for premium campaigns</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Input id="email" value={profileData.email} className="bg-gray-800 border-gray-700" disabled />
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={profileData.gender}>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Select value={profileData.ethnicity}>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hispanic">Hispanic</SelectItem>
                          <SelectItem value="White">White</SelectItem>
                          <SelectItem value="Black">Black</SelectItem>
                          <SelectItem value="Asian">Asian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member since March 2025
                  </div>
                </CardContent>
              </Card>

              {/* Location & Shipping */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Shipping
                    {!profileData.address && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, Los Angeles, CA 90210"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                    <p className="text-sm text-gray-400 mt-1">Required for shipping product samples</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Location</Label>
                      <p className="text-gray-300">Los Angeles, California</p>
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <p className="text-gray-300">Pacific Time (PT)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Account Connections */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Social Account Connections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* TikTok Accounts Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">TikTok Accounts</h4>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        + Add Account
                      </Button>
                    </div>

                    {/* Primary Account */}
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">TT</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">@devangoickenbach</span>
                            <Badge className="bg-purple-600/20 text-purple-400">Primary</Badge>
                            <Badge className="bg-green-600/20 text-green-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">25,644 followers • $8,750 GMV</p>
                          <p className="text-sm text-gray-400">📊 Analytics Connected</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Secondary Account */}
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">TT</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">@devan_fitness</span>
                            <Badge className="bg-green-600/20 text-green-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">12,300 followers • $2,100 GMV</p>
                          <p className="text-sm text-gray-400">📊 Analytics Connected</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Third Account - Pending */}
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">TT</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">@lifestyle_devan</span>
                            <Badge className="bg-yellow-600/20 text-yellow-400">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Pending Verification
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">8,900 followers • $0 GMV</p>
                          <p className="text-sm text-gray-400">⚠️ Verification Required</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Verify
                        </Button>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Discord Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">D</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Discord</span>
                          <Badge className="bg-green-600/20 text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{profileData.discordHandle}</p>
                        <p className="text-sm text-gray-400">Member of LaunchPaid Community • Creator Role</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Content Niche Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Content Niche Preferences
                    {!profileData.primaryNiche && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryNiche">Primary Niche</Label>
                    <Select value={profileData.primaryNiche}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select your primary niche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beauty & Care">Beauty & Care</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Fitness & Health">Fitness & Health</SelectItem>
                        <SelectItem value="Food & Cooking">Food & Cooking</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Home & Living">Home & Living</SelectItem>
                        <SelectItem value="Outdoor & Sports">Outdoor & Sports</SelectItem>
                        <SelectItem value="Collectibles & Toys">Collectibles & Toys</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Secondary Niches</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.secondaryNiches.map((niche) => (
                        <Badge key={niche} variant="secondary" className="bg-purple-600/20 text-purple-400">
                          {niche}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-6">
                        + Add Niche
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Content Style</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Educational</Badge>
                      <Badge variant="secondary">Entertainment</Badge>
                      <Badge variant="outline">Reviews</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Demographics */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Audience Demographics
                    {!profileData.audienceDemographics && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Gender Distribution</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Female</span>
                        <span className="text-sm">{audienceData.gender.female}%</span>
                      </div>
                      <Progress value={audienceData.gender.female} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Male</span>
                        <span className="text-sm">{audienceData.gender.male}%</span>
                      </div>
                      <Progress value={audienceData.gender.male} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Age Distribution</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {Object.entries(audienceData.age).map(([range, percentage]) => (
                        <div key={range} className="text-center p-3 bg-gray-800/50 rounded-lg">
                          <div className="text-lg font-semibold">{percentage}%</div>
                          <div className="text-sm text-gray-400">{range}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Top Locations</Label>
                    <p className="text-sm text-gray-300 mt-1">{audienceData.locations}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Total Audience Size</Label>
                    <p className="text-lg font-semibold text-purple-400">{performanceMetrics.followers} followers</p>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-400">Receive text messages for urgent updates</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive email updates and summaries</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>In-app Notifications</Label>
                        <p className="text-sm text-gray-400">Show notifications within the app</p>
                      </div>
                      <Switch
                        checked={notifications.inApp}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, inApp: checked })}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Notification Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Campaign deadlines</span>
                        <Switch
                          checked={notifications.campaigns}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, campaigns: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment confirmations</span>
                        <Switch
                          checked={notifications.payments}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New opportunities</span>
                        <Switch
                          checked={notifications.opportunities}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, opportunities: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Performance updates</span>
                        <Switch
                          checked={notifications.performance}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, performance: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Password</Label>
                        <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Export</Label>
                        <p className="text-sm text-gray-400">Download your account data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Profile Completion Checklist */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {completionItems.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.description}</div>
                        {!item.completed && (
                          <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{performanceMetrics.totalGMV}</div>
                      <div className="text-xs text-gray-400">Total GMV</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{performanceMetrics.consistency}</div>
                      <div className="text-xs text-gray-400">Consistency</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold">{performanceMetrics.rating}</span>
                      </div>
                      <div className="text-xs text-gray-400">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{performanceMetrics.campaignsCompleted}</div>
                      <div className="text-xs text-gray-400">Campaigns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Badges & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {badges.map((badge) => (
                    <div key={badge.name} className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full ${badge.color} flex items-center justify-center`}>
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{badge.name}</div>
                        {badge.earned ? (
                          <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                            Earned
                          </Badge>
                        ) : (
                          <div className="text-xs text-gray-400">{badge.progress}% progress</div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Integration Status */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Integration Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">TikTok Shop API</span>
                    <Badge className="bg-green-600/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Discord Integration</span>
                    <Badge className="bg-green-600/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Service</span>
                    <Badge className="bg-green-600/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Method</span>
                    <Badge className="bg-green-600/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Stripe Connected
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
