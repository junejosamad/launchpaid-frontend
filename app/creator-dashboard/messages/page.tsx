"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Bell,
  Search,
  Settings,
  MessageSquare,
  Target,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Trophy,
  Smartphone,
  Mail,
  ExternalLink,
} from "lucide-react"

interface Message {
  id: string
  type: "campaign" | "system" | "sms" | "payout"
  title: string
  preview: string
  content: string
  timestamp: string
  isRead: boolean
  channels: ("in-app" | "sms" | "email")[]
  actionButton?: {
    text: string
    action: string
  }
  icon: React.ReactNode
}

const sampleMessages: Message[] = [
  {
    id: "1",
    type: "campaign",
    title: "Campaign Acceptance",
    preview: "You've been accepted! Check your deliverables to get started.",
    content:
      "Congratulations! You've been accepted to the Summer Fashion Collection campaign. Your first deliverable is due in 3 days. Click below to view your campaign dashboard and get started.",
    timestamp: "2 hours ago",
    isRead: false,
    channels: ["in-app"],
    actionButton: {
      text: "View Campaign",
      action: "view-campaign",
    },
    icon: <Target className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "2",
    type: "campaign",
    title: "Deliverable Reminder",
    preview: "Product Review Video due tomorrow - don't miss the deadline!",
    content:
      "This is a friendly reminder that your Product Review Video for the Tech Gadget Pro Launch campaign is due tomorrow. Make sure to follow the brand guidelines and submit before the deadline.",
    timestamp: "1 day ago",
    isRead: false,
    channels: ["in-app", "sms"],
    actionButton: {
      text: "Upload Content",
      action: "upload-content",
    },
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
  },
  {
    id: "3",
    type: "campaign",
    title: "Content Approved",
    preview: "Your tutorial video has been approved and is live!",
    content:
      "Great news! Your tutorial video for the Beauty Essentials Kit campaign has been approved by the brand team. It's now live and generating engagement. Keep up the excellent work!",
    timestamp: "2 days ago",
    isRead: true,
    channels: ["in-app"],
    actionButton: {
      text: "View Performance",
      action: "view-performance",
    },
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
  },
  {
    id: "4",
    type: "system",
    title: "Badge Earned",
    preview: "Congratulations! You earned the $5K GMV Badge",
    content:
      "🏆 Amazing achievement! You've successfully earned the $5K GMV Badge by generating over $5,000 in gross merchandise value across your campaigns. This unlocks new opportunities and higher-tier campaigns.",
    timestamp: "3 days ago",
    isRead: true,
    channels: ["in-app", "email"],
    actionButton: {
      text: "View Badges",
      action: "view-badges",
    },
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: "5",
    type: "payout",
    title: "Payment Processed",
    preview: "Payment of $300 for completed deliverables has been sent",
    content:
      "Your payment of $300.00 for completed deliverables in the Spring Collection campaign has been processed and sent to your linked payment method. It should appear in your account within 1-3 business days.",
    timestamp: "1 week ago",
    isRead: true,
    channels: ["in-app", "email"],
    actionButton: {
      text: "View Earnings",
      action: "view-earnings",
    },
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
  },
  {
    id: "6",
    type: "sms",
    title: "SMS Reminder Sent",
    preview: "SMS sent to your phone: 'Reminder: Post due today for Summer Fashion'",
    content:
      "An SMS reminder was automatically sent to your phone number ending in ****1234: 'Reminder: Post due today for Summer Fashion Collection. Upload at launchpaid.com'",
    timestamp: "3 hours ago",
    isRead: true,
    channels: ["sms"],
    icon: <Smartphone className="h-5 w-5 text-blue-500" />,
  },
]

export default function MessagesPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [messages, setMessages] = useState(sampleMessages)

  // Notification preferences state
  const [smsNotifications, setSmsNotifications] = useState({
    deliverableReminders: true,
    campaignDeadlines: true,
    badgeAchievements: false,
    paymentNotifications: false,
  })

  const [emailNotifications, setEmailNotifications] = useState({
    campaignAcceptance: true,
    paymentConfirmations: true,
    weeklySummaries: true,
    marketingUpdates: false,
  })

  const [inAppNotifications, setInAppNotifications] = useState({
    allCampaignUpdates: true,
    systemNotifications: true,
    achievementAlerts: true,
  })

  const unreadCount = messages.filter((m) => !m.isRead).length

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "campaign" && message.type === "campaign") ||
      (selectedTab === "system" && message.type === "system") ||
      (selectedTab === "sms" && message.type === "sms") ||
      (selectedTab === "notifications" && message.type !== "sms")

    return matchesSearch && matchesTab
  })

  const markAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, isRead: true })))
  }

  const getChannelIcons = (channels: Message["channels"]) => {
    return channels.map((channel) => {
      switch (channel) {
        case "sms":
          return <Smartphone key={channel} className="h-3 w-3 text-blue-400" />
        case "email":
          return <Mail key={channel} className="h-3 w-3 text-green-400" />
        case "in-app":
          return <Bell key={channel} className="h-3 w-3 text-purple-400" />
      }
    })
  }

  const getRelativeTime = (timestamp: string) => {
    // Simple relative time formatting for demo
    return timestamp
  }

  const handleMessageClick = (message: Message) => {
    if (!message.isRead) {
      markAsRead(message.id)
    }
    setSelectedMessage(message)
  }

  const handleActionClick = (action: string) => {
    // Handle different action types
    console.log("Action clicked:", action)
    setSelectedMessage(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Messages</h1>
              <p className="text-gray-400 text-lg">Stay connected with your campaigns</p>
            </div>
            <div className="flex items-center gap-4">
              {unreadCount > 0 && <Badge className="bg-purple-600 hover:bg-purple-700">{unreadCount} unread</Badge>}
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Notification Preferences</DialogTitle>
                    <DialogDescription>
                      Configure how you want to receive notifications across different channels.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* SMS Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Smartphone className="h-5 w-5 text-blue-400" />
                        <h3 className="font-semibold">SMS Notifications</h3>
                      </div>
                      <div className="space-y-3 pl-7">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-deliverables">Deliverable reminders</Label>
                          <Switch
                            id="sms-deliverables"
                            checked={smsNotifications.deliverableReminders}
                            onCheckedChange={(checked) =>
                              setSmsNotifications((prev) => ({ ...prev, deliverableReminders: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-deadlines">Campaign deadlines</Label>
                          <Switch
                            id="sms-deadlines"
                            checked={smsNotifications.campaignDeadlines}
                            onCheckedChange={(checked) =>
                              setSmsNotifications((prev) => ({ ...prev, campaignDeadlines: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-badges">Badge achievements</Label>
                          <Switch
                            id="sms-badges"
                            checked={smsNotifications.badgeAchievements}
                            onCheckedChange={(checked) =>
                              setSmsNotifications((prev) => ({ ...prev, badgeAchievements: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-payments">Payment notifications</Label>
                          <Switch
                            id="sms-payments"
                            checked={smsNotifications.paymentNotifications}
                            onCheckedChange={(checked) =>
                              setSmsNotifications((prev) => ({ ...prev, paymentNotifications: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="h-5 w-5 text-green-400" />
                        <h3 className="font-semibold">Email Notifications</h3>
                      </div>
                      <div className="space-y-3 pl-7">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-acceptance">Campaign acceptance</Label>
                          <Switch
                            id="email-acceptance"
                            checked={emailNotifications.campaignAcceptance}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({ ...prev, campaignAcceptance: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-payments">Payment confirmations</Label>
                          <Switch
                            id="email-payments"
                            checked={emailNotifications.paymentConfirmations}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({ ...prev, paymentConfirmations: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-summaries">Weekly summaries</Label>
                          <Switch
                            id="email-summaries"
                            checked={emailNotifications.weeklySummaries}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({ ...prev, weeklySummaries: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-marketing">Marketing updates</Label>
                          <Switch
                            id="email-marketing"
                            checked={emailNotifications.marketingUpdates}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({ ...prev, marketingUpdates: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* In-App Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Bell className="h-5 w-5 text-purple-400" />
                        <h3 className="font-semibold">In-App Notifications</h3>
                      </div>
                      <div className="space-y-3 pl-7">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-campaigns">All campaign updates</Label>
                          <Switch
                            id="app-campaigns"
                            checked={inAppNotifications.allCampaignUpdates}
                            onCheckedChange={(checked) =>
                              setInAppNotifications((prev) => ({ ...prev, allCampaignUpdates: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-system">System notifications</Label>
                          <Switch
                            id="app-system"
                            checked={inAppNotifications.systemNotifications}
                            onCheckedChange={(checked) =>
                              setInAppNotifications((prev) => ({ ...prev, systemNotifications: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-achievements">Achievement alerts</Label>
                          <Switch
                            id="app-achievements"
                            checked={inAppNotifications.achievementAlerts}
                            onCheckedChange={(checked) =>
                              setInAppNotifications((prev) => ({ ...prev, achievementAlerts: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm text-gray-400">
                        <strong>Quiet Hours:</strong> 10:00 PM - 8:00 AM
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-800 focus:border-purple-500"
                  />
                </div>

                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
                      All Messages
                    </TabsTrigger>
                    <TabsTrigger value="campaign" className="data-[state=active]:bg-purple-600">
                      Campaign Updates
                    </TabsTrigger>
                    <TabsTrigger value="system" className="data-[state=active]:bg-purple-600">
                      System Alerts
                    </TabsTrigger>
                    <TabsTrigger value="sms" className="data-[state=active]:bg-purple-600">
                      SMS History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {unreadCount > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">{filteredMessages.length} messages</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Mark all as read
                    </Button>
                  </div>
                )}

                {filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer transition-colors ${
                      message.isRead
                        ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                        : "bg-gray-800 border-purple-500/30 hover:border-purple-500/50"
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{message.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-medium ${!message.isRead ? "text-white" : "text-gray-300"}`}>
                                  {message.title}
                                </h3>
                                {!message.isRead && <div className="w-2 h-2 rounded-full bg-purple-500"></div>}
                              </div>
                              <p className="text-sm text-gray-400 line-clamp-2">{message.preview}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-xs text-gray-500">{getRelativeTime(message.timestamp)}</span>
                              <div className="flex gap-1">{getChannelIcons(message.channels)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredMessages.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No messages found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message Detail / Quick Stats */}
            <div>
              {selectedMessage ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {selectedMessage.icon}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{selectedMessage.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-400">{selectedMessage.timestamp}</span>
                          <div className="flex gap-1">{getChannelIcons(selectedMessage.channels)}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">{selectedMessage.content}</p>

                    {selectedMessage.actionButton && (
                      <Button
                        onClick={() => handleActionClick(selectedMessage.actionButton!.action)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {selectedMessage.actionButton.text}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-purple-400" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total messages:</span>
                      <span className="font-medium">{messages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Unread:</span>
                      <span className="font-medium text-purple-400">{unreadCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign updates:</span>
                      <span className="font-medium">{messages.filter((m) => m.type === "campaign").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">System alerts:</span>
                      <span className="font-medium">{messages.filter((m) => m.type === "system").length}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
