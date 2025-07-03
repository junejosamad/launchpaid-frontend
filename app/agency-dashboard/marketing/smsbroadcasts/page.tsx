"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  Plus,
  MessageSquare,
  FileText,
  Settings,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Star,
  Phone,
  Paperclip,
  BarChart3,
  Zap,
  Smartphone,
  ArrowUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const smsStats = {
  messagesSentToday: { count: 127, growth: 15, successRate: 98.5 },
  responseRate: { percentage: 24.3, benchmark: "2x average" },
  activeConversations: { count: 18, pending: 5 },
  campaignPerformance: { bestCampaign: "Golf Partner Program", ctr: 12.8 },
}

const smsCampaigns = [
  {
    id: 1,
    name: "Golf Partner Launch",
    preview: "Hey {{creator_name}}! New golf campaign is live...",
    audience: "Campaign: Golf Partner",
    recipients: 156,
    status: "sent",
    deliveryRate: 98.5,
    responseRate: 24.3,
    sentDate: "2024-01-15 10:30 AM",
    method: "sendblue",
  },
  {
    id: 2,
    name: "Weekly Performance Update",
    preview: "Great work this week! Your GMV is up 15%...",
    audience: "All Creators",
    recipients: 234,
    status: "sending",
    deliveryRate: 87.2,
    responseRate: 18.7,
    sentDate: "2024-01-15 2:15 PM",
    method: "standard",
  },
  {
    id: 3,
    name: "Payment Confirmation",
    preview: "Your payout of $347.50 has been processed...",
    audience: "Segment: Top Performers",
    recipients: 45,
    status: "scheduled",
    deliveryRate: 0,
    responseRate: 0,
    sentDate: "2024-01-16 9:00 AM",
    method: "sendblue",
  },
]

const conversations = [
  {
    id: 1,
    creator: { name: "Sarah Johnson", handle: "@sarahjfit", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Thanks for the update! I'll have the posts ready by Friday.",
    timestamp: "2 min ago",
    unread: true,
    campaign: "Golf Partner Program",
  },
  {
    id: 2,
    creator: { name: "Mike Chen", handle: "@mikecooks", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Can you extend the deadline by 2 days?",
    timestamp: "1 hour ago",
    unread: true,
    campaign: "Fashion Nova Collab",
  },
  {
    id: 3,
    creator: { name: "Emma Davis", handle: "@emmastyle", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Perfect! Just submitted my content.",
    timestamp: "3 hours ago",
    unread: false,
    campaign: "Tech Gadget Pro",
  },
]

export default function SMSBroadcastsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("campaigns")
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState("")
  const [sendMethod, setSendMethod] = useState("sendblue")
  const [audienceType, setAudienceType] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500"
      case "sending":
        return "bg-blue-500"
      case "scheduled":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "sent":
        return "Sent"
      case "sending":
        return "Sending"
      case "scheduled":
        return "Scheduled"
      case "failed":
        return "Failed"
      default:
        return "Draft"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />

      <div className="lg:ml-60">
        <AgencyHeader onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <span>Marketing</span>
              <span className="mx-2">/</span>
              <span className="text-purple-400">SMS Broadcasts</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">SMS Broadcasts</h1>
                <p className="text-gray-400 mt-1">Manage SMS campaigns and creator communications via SendBlue</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Inbox
                  <Badge className="ml-2 bg-red-600 text-white">3</Badge>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <FileText className="h-4 w-4 mr-2" />
                  SMS Templates
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create SMS Blast
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Messages Sent Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{smsStats.messagesSentToday.count}</div>
                <div className="flex items-center mt-2 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+{smsStats.messagesSentToday.growth}%</span>
                  <span className="text-gray-400 ml-2">vs yesterday</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Success rate: {smsStats.messagesSentToday.successRate}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{smsStats.responseRate.percentage}%</div>
                <div className="flex items-center mt-2">
                  <Badge className="bg-blue-600 text-white text-xs">SendBlue</Badge>
                  <span className="text-green-500 ml-2 text-sm">{smsStats.responseRate.benchmark}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Active Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{smsStats.activeConversations.count}</div>
                <div className="flex items-center mt-2 text-sm">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-400">{smsStats.activeConversations.pending} pending replies</span>
                </div>
                <Button variant="link" className="p-0 h-auto text-purple-400 text-xs mt-1">
                  Quick access to inbox
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-white">{smsStats.campaignPerformance.bestCampaign}</div>
                <div className="text-2xl font-bold text-green-500 mt-1">{smsStats.campaignPerformance.ctr}%</div>
                <div className="text-xs text-gray-400 mt-1">Click-through rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600">
                SMS Campaigns
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">
                Create SMS Blast
              </TabsTrigger>
              <TabsTrigger value="inbox" className="data-[state=active]:bg-purple-600">
                SMS Inbox
              </TabsTrigger>
              <TabsTrigger value="reminders" className="data-[state=active]:bg-purple-600">
                Automated Reminders
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SMS Campaigns */}
            <TabsContent value="campaigns" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <CardTitle className="text-white">SMS Campaign Management</CardTitle>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <Input placeholder="Search campaigns..." className="w-64 bg-gray-800 border-gray-700" />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="border-gray-700">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Campaign</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Audience</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Recipients</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Delivery</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Response</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Sent</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {smsCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-4 px-4">
                              <div>
                                <div className="font-medium text-white flex items-center gap-2">
                                  {campaign.name}
                                  {campaign.method === "sendblue" && (
                                    <Badge className="bg-blue-600 text-white text-xs">SendBlue</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">{campaign.preview}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{campaign.audience}</td>
                            <td className="py-4 px-4 text-gray-300">{campaign.recipients} creators</td>
                            <td className="py-4 px-4">
                              <Badge className={cn("text-white", getStatusColor(campaign.status))}>
                                {getStatusText(campaign.status)}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Progress value={campaign.deliveryRate} className="w-16 h-2" />
                                <span className="text-sm text-gray-300">{campaign.deliveryRate}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-300">{campaign.responseRate}%</span>
                                {campaign.method === "sendblue" && <Zap className="h-3 w-3 text-blue-500" />}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">{campaign.sentDate}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: Create SMS Blast */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Step 1: Message Composition */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Step 1: Message Composition</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Message Content</Label>
                        <Textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type your message here..."
                          className="mt-2 bg-gray-800 border-gray-700 text-white min-h-[120px]"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-400">{messageText.length}/160 characters</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-gray-700">
                              📱 Emoji
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-700">
                              🔗 Shorten Link
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-300">Message Templates</Label>
                        <Select>
                          <SelectTrigger className="mt-2 bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Choose a template..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="launch">Campaign Launch Announcement</SelectItem>
                            <SelectItem value="reminder">Posting Reminder</SelectItem>
                            <SelectItem value="performance">Performance Update</SelectItem>
                            <SelectItem value="payment">Payment Confirmation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-gray-300">Send Method</Label>
                        <RadioGroup value={sendMethod} onValueChange={setSendMethod} className="mt-2">
                          <div className="flex items-center space-x-2 p-3 border border-blue-600 rounded-lg bg-blue-600/10">
                            <RadioGroupItem value="sendblue" id="sendblue" />
                            <Label htmlFor="sendblue" className="flex-1">
                              <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-blue-500" />
                                <span className="font-medium text-white">SendBlue (Recommended)</span>
                                <Badge className="bg-blue-600 text-white text-xs">2x Response Rate</Badge>
                              </div>
                              <div className="text-sm text-gray-400 mt-1">Blue bubble delivery, premium appearance</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex-1">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-green-500" />
                                <span className="font-medium text-white">Standard SMS</span>
                              </div>
                              <div className="text-sm text-gray-400 mt-1">Regular green bubble, lower cost</div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 2: Audience Selection */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Step 2: Audience Selection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup value={audienceType} onValueChange={setAudienceType}>
                        <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all" className="flex-1">
                            <div className="font-medium text-white">All Network Creators</div>
                            <div className="text-sm text-gray-400">234 creators (opt-outs excluded)</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                          <RadioGroupItem value="campaign" id="campaign" />
                          <Label htmlFor="campaign" className="flex-1">
                            <div className="font-medium text-white">Campaign-Specific</div>
                            <Select>
                              <SelectTrigger className="mt-2 bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Select campaign..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="golf">Golf Partner Program (156 creators)</SelectItem>
                                <SelectItem value="fashion">Fashion Nova Collab (89 creators)</SelectItem>
                                <SelectItem value="tech">Tech Gadget Pro (67 creators)</SelectItem>
                              </SelectContent>
                            </Select>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom" className="flex-1">
                            <div className="font-medium text-white">Custom Segments</div>
                            <div className="text-sm text-gray-400">Advanced targeting options</div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {audienceType === "custom" && (
                        <div className="space-y-4 p-4 border border-gray-700 rounded-lg">
                          <div>
                            <Label className="text-gray-300">Demographics</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <Select>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                  <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All</SelectItem>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                  <SelectValue placeholder="Age Range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="18-24">18-24</SelectItem>
                                  <SelectItem value="25-34">25-34</SelectItem>
                                  <SelectItem value="35-44">35-44</SelectItem>
                                  <SelectItem value="45+">45+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label className="text-gray-300">Performance Filters</Label>
                            <div className="space-y-2 mt-2">
                              <div>
                                <Label className="text-sm text-gray-400">GMV Range</Label>
                                <Slider defaultValue={[0, 10000]} max={10000} step={100} className="mt-2" />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>$0</span>
                                  <span>$10,000+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Step 3: Delivery Settings */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Step 3: Delivery Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Timing Options</Label>
                        <RadioGroup defaultValue="now" className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="now" id="now" />
                            <Label htmlFor="now" className="text-white">
                              Send Now
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="schedule" id="schedule" />
                            <Label htmlFor="schedule" className="text-white">
                              Schedule
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="optimal" id="optimal" />
                            <Label htmlFor="optimal" className="text-white">
                              Optimal Timing (AI-suggested)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Personalization</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Enable Replies</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Link Tracking</Label>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Panel */}
                <div className="space-y-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Message Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* SendBlue Preview */}
                        <div>
                          <Label className="text-sm text-gray-400">SendBlue (Blue Bubble)</Label>
                          <div className="mt-2 p-3 bg-blue-600 rounded-2xl rounded-bl-sm max-w-xs ml-auto">
                            <p className="text-white text-sm">{messageText || "Your message will appear here..."}</p>
                          </div>
                        </div>

                        {/* Standard SMS Preview */}
                        <div>
                          <Label className="text-sm text-gray-400">Standard SMS (Green Bubble)</Label>
                          <div className="mt-2 p-3 bg-green-600 rounded-2xl rounded-bl-sm max-w-xs ml-auto">
                            <p className="text-white text-sm">{messageText || "Your message will appear here..."}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Audience Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recipients:</span>
                          <span className="text-white">234 creators</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Method:</span>
                          <Badge className={sendMethod === "sendblue" ? "bg-blue-600" : "bg-green-600"}>
                            {sendMethod === "sendblue" ? "SendBlue" : "Standard SMS"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Est. Cost:</span>
                          <span className="text-white">${sendMethod === "sendblue" ? "23.40" : "11.70"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full border-gray-700">
                      <Eye className="h-4 w-4 mr-2" />
                      Send Test
                    </Button>
                    <Button variant="outline" className="w-full border-gray-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Broadcast
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: SMS Inbox */}
            <TabsContent value="inbox" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Conversations List */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Conversations</CardTitle>
                      <Badge className="bg-red-600 text-white">3</Badge>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search conversations..." className="pl-10 bg-gray-800 border-gray-700" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation)}
                          className={cn(
                            "p-4 cursor-pointer hover:bg-gray-800 border-b border-gray-800",
                            selectedConversation.id === conversation.id && "bg-gray-800",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <img
                                src={conversation.creator.avatar || "/placeholder.svg"}
                                alt={conversation.creator.name}
                                className="w-10 h-10 rounded-full"
                              />
                              {conversation.unread && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-white truncate">{conversation.creator.name}</h4>
                                <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-400 truncate">{conversation.creator.handle}</p>
                              <p className="text-sm text-gray-300 truncate mt-1">{conversation.lastMessage}</p>
                              {conversation.campaign && (
                                <Badge className="bg-purple-600/20 text-purple-400 text-xs mt-1">
                                  {conversation.campaign}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Message Thread */}
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800 h-full flex flex-col">
                    <CardHeader className="pb-3 border-b border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedConversation.creator.avatar || "/placeholder.svg"}
                            alt={selectedConversation.creator.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium text-white">{selectedConversation.creator.name}</h3>
                            <p className="text-sm text-gray-400">{selectedConversation.creator.handle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {selectedConversation.campaign && (
                        <Badge className="bg-purple-600/20 text-purple-400 w-fit">
                          {selectedConversation.campaign}
                        </Badge>
                      )}
                    </CardHeader>

                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {/* Sample messages */}
                        <div className="flex justify-end">
                          <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-br-sm max-w-xs">
                            <p className="text-sm">
                              Hey Sarah! Just wanted to check in on the Golf Partner campaign. How are the posts coming
                              along?
                            </p>
                            <p className="text-xs opacity-75 mt-1">2:30 PM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-800 text-white p-3 rounded-2xl rounded-bl-sm max-w-xs">
                            <p className="text-sm">
                              Thanks for checking in! I've got 3 posts ready and will have the remaining 2 done by
                              Friday. The engagement has been great so far!
                            </p>
                            <p className="text-xs opacity-75 mt-1">2:45 PM</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-br-sm max-w-xs">
                            <p className="text-sm">
                              That's awesome! Your GMV is already at $847 for this campaign. Keep up the great work! 🎉
                            </p>
                            <p className="text-xs opacity-75 mt-1">3:00 PM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-800 text-white p-3 rounded-2xl rounded-bl-sm max-w-xs">
                            <p className="text-sm">{selectedConversation.lastMessage}</p>
                            <p className="text-xs opacity-75 mt-1">{selectedConversation.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <div className="p-4 border-t border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Switch id="sendblue-reply" />
                        <Label htmlFor="sendblue-reply" className="text-sm text-gray-300">
                          Send via SendBlue
                        </Label>
                        <Badge className="bg-blue-600 text-white text-xs">2x Response Rate</Badge>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Textarea
                            placeholder="Type your reply..."
                            className="bg-gray-800 border-gray-700 text-white resize-none"
                            rows={2}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700 h-8 w-8 p-0">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="border-gray-700 text-xs">
                          Thanks for the update!
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-xs">
                          Great work!
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-xs">
                          Keep it up!
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: Automated Reminders */}
            <TabsContent value="reminders" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Reminder Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">Post Deadline Reminders</h4>
                          <p className="text-sm text-gray-400">For creators approaching deadlines</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">Performance Alerts</h4>
                          <p className="text-sm text-gray-400">For creators falling behind schedule</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">Payment Notifications</h4>
                          <p className="text-sm text-gray-400">Payout confirmations and updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">Campaign Updates</h4>
                          <p className="text-sm text-gray-400">New campaign opportunities</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Automation Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Trigger Conditions</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="deadline" defaultChecked />
                          <Label htmlFor="deadline" className="text-sm text-gray-300">
                            2 days before deadline
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="inactive" defaultChecked />
                          <Label htmlFor="inactive" className="text-sm text-gray-300">
                            Creator hasn't posted in 3 days
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="behind" defaultChecked />
                          <Label htmlFor="behind" className="text-sm text-gray-300">
                            Creator is 2+ posts behind schedule
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300">Timing Rules</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-300">Business hours only</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-300">Timezone considerations</Label>
                          <Switch defaultChecked />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-300">Max reminders per week</Label>
                          <Select defaultValue="3">
                            <SelectTrigger className="mt-1 bg-gray-800 border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 reminder</SelectItem>
                              <SelectItem value="2">2 reminders</SelectItem>
                              <SelectItem value="3">3 reminders</SelectItem>
                              <SelectItem value="5">5 reminders</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Active Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Creator</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Reminder Type</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Trigger</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Next Send</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                src="/placeholder.svg?height=32&width=32"
                                alt="Creator"
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-white">Mike Chen</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">Deadline Reminder</td>
                          <td className="py-4 px-4 text-gray-300">2 days before deadline</td>
                          <td className="py-4 px-4 text-gray-300">Jan 17, 9:00 AM</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-green-600 text-white">Active</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Switch defaultChecked />
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                src="/placeholder.svg?height=32&width=32"
                                alt="Creator"
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-white">Emma Davis</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">Performance Alert</td>
                          <td className="py-4 px-4 text-gray-300">2+ posts behind</td>
                          <td className="py-4 px-4 text-gray-300">Jan 16, 2:00 PM</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-yellow-600 text-white">Scheduled</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Switch defaultChecked />
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">SMS Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border border-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-white">1,247</div>
                        <div className="text-sm text-gray-400">Messages Sent</div>
                        <div className="text-xs text-green-500 mt-1">+18% this month</div>
                      </div>
                      <div className="text-center p-4 border border-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-white">22.4%</div>
                        <div className="text-sm text-gray-400">Avg Response Rate</div>
                        <div className="text-xs text-green-500 mt-1">+5.2% vs last month</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-3">SendBlue vs Standard SMS</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-blue-600/30 rounded-lg bg-blue-600/10">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            <span className="text-white">SendBlue</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">28.7%</div>
                            <div className="text-xs text-gray-400">Response Rate</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-green-500" />
                            <span className="text-white">Standard SMS</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">14.2%</div>
                            <div className="text-xs text-gray-400">Response Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-3">Cost Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">SendBlue cost per response:</span>
                          <span className="text-white">$0.42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Standard SMS cost per response:</span>
                          <span className="text-white">$0.28</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span className="text-gray-400">ROI improvement with SendBlue:</span>
                          <span className="text-green-500">+102%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Top Performing Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-3">Best Message Templates</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-white">Campaign Launch</span>
                            <Badge className="bg-green-600 text-white text-xs">34.2%</Badge>
                          </div>
                          <p className="text-xs text-gray-400">{"Hey {{ creator_name }}! New campaign is live..."}</p>
                        </div>
                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-white">Performance Update</span>
                            <Badge className="bg-blue-600 text-white text-xs">28.9%</Badge>
                          </div>
                          <p className="text-xs text-gray-400">{"Great work! Your GMV is up {{ percentage }}%..."}</p>
                        </div>
                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-white">Payment Confirmation</span>
                            <Badge className="bg-purple-600 text-white text-xs">25.1%</Badge>
                          </div>
                          <p className="text-xs text-gray-400">
                            {"Your payout of ${{ amount }} has been processed..."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-3">Optimal Send Times</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Best day:</span>
                          <span className="text-white">Tuesday</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Best time:</span>
                          <span className="text-white">2:00 PM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Avg response time:</span>
                          <span className="text-white">47 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Response Rate Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-400">Interactive chart showing response rate trends</p>
                        <p className="text-sm text-gray-500 mt-1">SendBlue vs Standard SMS over time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Response Rate Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-400">Interactive chart showing response rate trends</p>
                      <p className="text-sm text-gray-500 mt-1">SendBlue vs Standard SMS over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
