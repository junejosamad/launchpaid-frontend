"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Play,
  MessageCircle,
  Mail,
  Calendar,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  Webhook,
  Palette,
  Users,
  Book,
  Video,
  Settings,
  HelpCircle,
  Upload,
  Loader2,
  Phone,
  CreditCard,
  Bot,
  TestTube,
  Copy,
  Download,
  FileText,
  Globe,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"

// Mock data for setup status
const setupData = {
  overallProgress: 50,
  completedSteps: 3,
  totalSteps: 6,
  estimatedTime: 5,
  quickStatus: {
    profile: { status: "complete", description: "Basic agency information and branding" },
    integrations: { status: "partial", description: "TikTok Shop, Discord, SendBlue, Stripe", connected: 3, total: 4 },
    campaign: { status: "incomplete", description: "Create your first creator campaign" },
  },
  checklist: [
    {
      id: "profile",
      title: "Complete Agency Profile",
      description: "Add your agency name, logo, and contact information",
      status: "complete",
      time: "2 minutes",
      action: "View Profile",
      link: "/agency-dashboard/settings/general",
    },
    {
      id: "tiktok",
      title: "Connect TikTok Shop",
      description: "Essential for GMV tracking and sales attribution",
      status: "complete",
      time: "3 minutes",
      priority: "critical",
      action: "Connected",
      benefits: "Real-time sales tracking, automated attribution",
    },
    {
      id: "discord",
      title: "Setup Discord Integration",
      description: "Auto-assign roles and manage creator communities",
      status: "incomplete",
      time: "4 minutes",
      action: "Setup Discord Bot",
      benefits: "Automate role management, create private channels",
    },
    {
      id: "sms",
      title: "Configure SendBlue SMS",
      description: "2x higher response rates with blue bubble messaging",
      status: "incomplete",
      time: "2 minutes",
      action: "Connect SendBlue",
      benefits: "Premium SMS delivery, higher open rates",
    },
    {
      id: "payments",
      title: "Setup Payment Processing",
      description: "Automate creator payouts and financial management",
      status: "complete",
      time: "5 minutes",
      action: "Connected",
      options: "Stripe (standard) or Fanbasis (premium features)",
    },
    {
      id: "product",
      title: "Create Your First Product",
      description: "Creator registration pages for your agency campaigns",
      status: "incomplete",
      time: "3 minutes",
      action: "Add Product",
      benefits: "Custom registration links, Discord role assignment",
      count: 0,
    },
  ],
  integrations: {
    tiktok: { status: "connected", lastSync: "2 minutes ago", uptime: "99.8%" },
    discord: { status: "disconnected", server: "Creator Circle Agency", roles: 12 },
    sendblue: { status: "disconnected", credits: 0, responseRate: "24.3%" },
    stripe: { status: "connected", lastPayout: "3 hours ago" },
    fanbasis: { status: "disconnected" },
  },
}

export default function AgencySetupPage() {
  const router = useRouter()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false)
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false)
  const [isSendBlueModalOpen, setIsSendBlueModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isTikTokModalOpen, setIsTikTokModalOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isTeamPodsModalOpen, setIsTeamPodsModalOpen] = useState(false)
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false)
  const [isBrandingModalOpen, setIsBrandingModalOpen] = useState(false)
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState("")
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState("")

  const [wizardStep, setWizardStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, string>>({})

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "incomplete":
        return <Circle className="h-5 w-5 text-gray-400" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getIntegrationStatus = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-600 text-white">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "issues":
        return <Badge className="bg-yellow-600 text-white">Issues</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleTestConnection = async (integration: string) => {
    setIsLoading(true)
    setTestResults({ ...testResults, [integration]: "testing" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = Math.random() > 0.3 // 70% success rate for demo
    setTestResults({ ...testResults, [integration]: success ? "success" : "error" })
    setIsLoading(false)

    toast({
      title: success ? "Connection Successful" : "Connection Failed",
      description: success
        ? `${integration} is working properly`
        : `Failed to connect to ${integration}. Please check your settings.`,
      variant: success ? "default" : "destructive",
    })
  }

  const handleCreateCampaign = () => {
    router.push("/agency-dashboard/campaigns?create=true&firstCampaign=true")
  }

  const handleViewProfile = () => {
    window.open("/agency-dashboard/settings/general", "_blank")
  }

  const handleStartWizard = () => {
    setIsWizardOpen(true)
    setWizardStep(1)
  }

  const handleWizardNext = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1)
    } else {
      // Complete wizard
      setIsWizardOpen(false)
      toast({
        title: "Setup Complete!",
        description: "Your agency is now ready to start creating campaigns.",
      })
    }
  }

  const handleWizardPrevious = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1)
    }
  }

  const openVideoModal = (videoTitle: string) => {
    setSelectedVideo(videoTitle)
    setIsVideoModalOpen(true)
  }

  const openGuideModal = (guideTitle: string) => {
    setSelectedGuide(guideTitle)
    setIsGuideModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />

      <div className="lg:pl-60">
        <AgencyHeader onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <span>Settings</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-purple-400">Setup</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Setup & Configuration</h1>
                <p className="text-gray-400 mt-1">Complete your agency setup and configure essential features</p>
              </div>
            </div>

            {/* Setup Progress Tracker */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Setup Progress</CardTitle>
                    <CardDescription>
                      {setupData.completedSteps}/{setupData.totalSteps} steps completed • {setupData.estimatedTime}{" "}
                      minutes remaining
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">{setupData.overallProgress}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={setupData.overallProgress} className="h-3" />

                {/* Quick Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(setupData.quickStatus.profile.status)}
                        <div className="flex-1">
                          <div className="font-medium text-white">Agency Profile</div>
                          <div className="text-sm text-gray-400">{setupData.quickStatus.profile.description}</div>
                        </div>
                      </div>
                      {setupData.quickStatus.profile.status !== "complete" && (
                        <Button size="sm" className="w-full mt-3" onClick={handleViewProfile}>
                          Complete Profile
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(setupData.quickStatus.integrations.status)}
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            Integrations ({setupData.quickStatus.integrations.connected}/
                            {setupData.quickStatus.integrations.total})
                          </div>
                          <div className="text-sm text-gray-400">{setupData.quickStatus.integrations.description}</div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" onClick={() => setIsIntegrationModalOpen(true)}>
                        Setup Integrations
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(setupData.quickStatus.campaign.status)}
                        <div className="flex-1">
                          <div className="font-medium text-white">First Campaign</div>
                          <div className="text-sm text-gray-400">{setupData.quickStatus.campaign.description}</div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" onClick={handleCreateCampaign}>
                        Create Campaign
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Quick Start Wizard */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Setup Wizard</CardTitle>
                <CardDescription>Complete essential setup in under 5 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-300">Agency Information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-300">Primary Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-400">Payment Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-400">First Product</span>
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleStartWizard}>
                    <Play className="h-4 w-4 mr-2" />
                    Start 5-Minute Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Onboarding Checklist */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Essential Setup Steps</CardTitle>
                <CardDescription>Complete these steps to get the most out of LaunchPaid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {setupData.checklist.map((item) => (
                  <Card key={item.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {getStatusIcon(item.status)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white">{item.title}</h3>
                            {item.priority === "critical" && (
                              <Badge className="bg-red-600 text-white text-xs">Critical</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                          {item.benefits && <p className="text-xs text-purple-400">✨ {item.benefits}</p>}
                          {item.options && <p className="text-xs text-gray-500">{item.options}</p>}
                          {item.count !== undefined && (
                            <p className="text-xs text-gray-500">{item.count} products created</p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant={item.status === "complete" ? "secondary" : "default"}
                          disabled={item.status === "complete" && item.id !== "tiktok" && item.id !== "payments"}
                          onClick={() => {
                            switch (item.id) {
                              case "profile":
                                handleViewProfile()
                                break
                              case "tiktok":
                                setIsTikTokModalOpen(true)
                                break
                              case "discord":
                                setIsDiscordModalOpen(true)
                                break
                              case "sms":
                                setIsSendBlueModalOpen(true)
                                break
                              case "payments":
                                setIsPaymentModalOpen(true)
                                break
                              case "product":
                                setIsProductModalOpen(true)
                                break
                            }
                          }}
                        >
                          {item.action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Integration Health Dashboard */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">System Status</CardTitle>
                <CardDescription>Real-time integration monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* TikTok Shop */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">TikTok Shop API</h4>
                        {getIntegrationStatus(setupData.integrations.tiktok.status)}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">Last Sync: {setupData.integrations.tiktok.lastSync}</div>
                        <div className="text-gray-400">Health: {setupData.integrations.tiktok.uptime} uptime</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleTestConnection("TikTok Shop")}
                        disabled={isLoading}
                      >
                        {isLoading && testResults["TikTok Shop"] === "testing" ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <TestTube className="h-4 w-4 mr-2" />
                        )}
                        Test Connection
                      </Button>
                      {testResults["TikTok Shop"] && testResults["TikTok Shop"] !== "testing" && (
                        <div
                          className={`text-xs ${testResults["TikTok Shop"] === "success" ? "text-green-400" : "text-red-400"}`}
                        >
                          {testResults["TikTok Shop"] === "success" ? "✓ Connection successful" : "✗ Connection failed"}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Discord Bot */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">Discord Bot</h4>
                        {getIntegrationStatus(setupData.integrations.discord.status)}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">Server: {setupData.integrations.discord.server}</div>
                        <div className="text-gray-400">Roles: {setupData.integrations.discord.roles} automated</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsDiscordModalOpen(true)}
                      >
                        <Bot className="h-4 w-4 mr-2" />
                        Setup Bot
                      </Button>
                    </CardContent>
                  </Card>

                  {/* SendBlue SMS */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">SendBlue SMS</h4>
                        {getIntegrationStatus(setupData.integrations.sendblue.status)}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">
                          Credits: {setupData.integrations.sendblue.credits} remaining
                        </div>
                        <div className="text-gray-400">
                          Response: {setupData.integrations.sendblue.responseRate} (2.1x avg)
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsSendBlueModalOpen(true)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Connect SendBlue
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Payment Processing */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">Payments</h4>
                        <div className="flex gap-1">{getIntegrationStatus(setupData.integrations.stripe.status)}</div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">Stripe: Connected</div>
                        <div className="text-gray-400">Last Payout: {setupData.integrations.stripe.lastPayout}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleTestConnection("Payment")}
                        disabled={isLoading}
                      >
                        {isLoading && testResults["Payment"] === "testing" ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CreditCard className="h-4 w-4 mr-2" />
                        )}
                        Test Payment
                      </Button>
                      {testResults["Payment"] && testResults["Payment"] !== "testing" && (
                        <div
                          className={`text-xs ${testResults["Payment"] === "success" ? "text-green-400" : "text-red-400"}`}
                        >
                          {testResults["Payment"] === "success" ? "✓ Payment test successful" : "✗ Payment test failed"}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Help & Documentation */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Setup Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Getting Started Guides */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-purple-400" />
                      <h3 className="font-medium text-white">Getting Started Guides</h3>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openGuideModal("Quick Start Guide")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Quick Start Guide
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openGuideModal("Campaign Creation Tutorial")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Campaign Creation Tutorial
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openGuideModal("Creator Onboarding")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Creator Onboarding
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openGuideModal("Best Practices")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Best Practices
                      </Button>
                    </div>
                  </div>

                  {/* Video Tutorials */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-purple-400" />
                      <h3 className="font-medium text-white">Video Tutorials</h3>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openVideoModal("Platform Overview")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Platform Overview (5:30)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openVideoModal("Integration Setup")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Integration Setup (3:45)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openVideoModal("Campaign Management")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Campaign Management (7:20)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openVideoModal("Analytics Deep Dive")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Analytics Deep Dive (4:15)
                      </Button>
                    </div>
                  </div>

                  {/* Technical Setup */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      <h3 className="font-medium text-white">Technical Setup</h3>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => window.open("https://docs.launchpaid.com/api", "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        API Documentation
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => setIsWebhookModalOpen(true)}
                      >
                        <Webhook className="h-4 w-4 mr-2" />
                        Webhook Configuration
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => window.open("/agency-dashboard/settings/general#security", "_blank")}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => openGuideModal("Troubleshooting")}
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Troubleshooting
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support & Contact */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center space-y-3">
                      <MessageCircle className="h-8 w-8 text-green-500 mx-auto" />
                      <div>
                        <h3 className="font-medium text-white">Live Chat Support</h3>
                        <p className="text-sm text-gray-400">Online now • Avg response: 2 min</p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsChatOpen(true)}>
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center space-y-3">
                      <Mail className="h-8 w-8 text-blue-500 mx-auto" />
                      <div>
                        <h3 className="font-medium text-white">Email Support</h3>
                        <p className="text-sm text-gray-400">Response within 6 hours</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsEmailModalOpen(true)}
                      >
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center space-y-3">
                      <Calendar className="h-8 w-8 text-purple-500 mx-auto" />
                      <div>
                        <h3 className="font-medium text-white">Setup Call</h3>
                        <p className="text-sm text-gray-400">15-minute assistance call</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsScheduleModalOpen(true)}
                      >
                        Schedule Call
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Configuration */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <Card className="bg-gray-900 border-gray-800">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Advanced Settings</CardTitle>
                      {isAdvancedOpen ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-purple-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">Workspace Management</h4>
                              <p className="text-sm text-gray-400 mt-1">
                                Create team 'pods' that cap at 10 clients each
                              </p>
                              <p className="text-xs text-gray-500 mt-2">1 main workspace, 0 additional pods</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-3 bg-transparent"
                                onClick={() => setIsTeamPodsModalOpen(true)}
                              >
                                Setup Team Pods
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-purple-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">Automation Rules</h4>
                              <p className="text-sm text-gray-400 mt-1">
                                Configure automated creator approvals and notifications
                              </p>
                              <p className="text-xs text-gray-500 mt-2">Basic automation enabled</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-3 bg-transparent"
                                onClick={() => setIsAutomationModalOpen(true)}
                              >
                                Configure Automation
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Palette className="h-5 w-5 text-purple-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">Custom Branding</h4>
                              <p className="text-sm text-gray-400 mt-1">White-label creator registration pages</p>
                              <p className="text-xs text-gray-500 mt-2">Default LaunchPaid branding</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-3 bg-transparent"
                                onClick={() => setIsBrandingModalOpen(true)}
                              >
                                Customize Branding
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Webhook className="h-5 w-5 text-purple-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">API & Webhooks</h4>
                              <p className="text-sm text-gray-400 mt-1">
                                Advanced integrations and custom notifications
                              </p>
                              <p className="text-xs text-gray-500 mt-2">0 webhooks configured</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-3 bg-transparent"
                                onClick={() => setIsWebhookModalOpen(true)}
                              >
                                Setup Webhooks
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </main>
      </div>

      {/* Setup Wizard Modal */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Setup Wizard - Step {wizardStep} of 4</DialogTitle>
            <DialogDescription>Complete your agency setup in just a few minutes</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Bar */}
            <Progress value={(wizardStep / 4) * 100} className="h-2" />

            {/* Step Content */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Agency Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencyName" className="text-white">
                      Agency Name *
                    </Label>
                    <Input id="agencyName" placeholder="Your Agency Name" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-white">
                      Contact Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@agency.com"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Agency Logo</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-400">Upload your agency logo</p>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Connect TikTok Shop</h3>
                <p className="text-gray-400">
                  Connect your TikTok Shop account for GMV tracking and sales attribution.
                </p>
                <Button className="w-full bg-black text-white border border-gray-700 hover:bg-gray-800">
                  <Globe className="h-4 w-4 mr-2" />
                  Connect TikTok Shop Account
                </Button>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">What you'll get:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Real-time sales tracking</li>
                    <li>• Automated creator attribution</li>
                    <li>• Performance analytics</li>
                    <li>• Revenue optimization insights</li>
                  </ul>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Payment Setup</h3>
                <p className="text-gray-400">Choose your payment processor for creator payouts.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-white">Stripe</h4>
                      <p className="text-sm text-gray-400">Standard payment processing</p>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        Connect Stripe
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-white">Fanbasis</h4>
                      <p className="text-sm text-gray-400">Premium creator payouts</p>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        Connect Fanbasis
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Create Your First Product</h3>
                <p className="text-gray-400">Products are registration pages for your campaigns.</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-white">
                      Product Name *
                    </Label>
                    <Input
                      id="productName"
                      placeholder="Creator Registration"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Join our creator program..."
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="discordRole" />
                    <Label htmlFor="discordRole" className="text-white">
                      Auto-assign Discord role
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-700">
              <Button
                variant="outline"
                onClick={handleWizardPrevious}
                disabled={wizardStep === 1}
                className="bg-transparent border-gray-700"
              >
                Previous
              </Button>
              <Button onClick={handleWizardNext} className="bg-purple-600 hover:bg-purple-700">
                {wizardStep === 4 ? "Complete Setup" : "Next"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Integration Setup Modal */}
      <Dialog open={isIntegrationModalOpen} onOpenChange={setIsIntegrationModalOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Integration Setup</DialogTitle>
            <DialogDescription>Connect your essential integrations</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="tiktok" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="tiktok">TikTok Shop</TabsTrigger>
              <TabsTrigger value="discord">Discord</TabsTrigger>
              <TabsTrigger value="sendblue">SendBlue</TabsTrigger>
              <TabsTrigger value="stripe">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="tiktok" className="space-y-4">
              <div className="text-center space-y-4">
                <Globe className="h-12 w-12 mx-auto text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Connect TikTok Shop</h3>
                <p className="text-gray-400">Essential for GMV tracking and sales attribution</p>
                <Button className="bg-black text-white border border-gray-700 hover:bg-gray-800">
                  Connect TikTok Shop Account
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="discord" className="space-y-4">
              <div className="text-center space-y-4">
                <Bot className="h-12 w-12 mx-auto text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Setup Discord Bot</h3>
                <p className="text-gray-400">Automate role management and creator communities</p>
                <Button onClick={() => setIsDiscordModalOpen(true)}>Setup Discord Integration</Button>
              </div>
            </TabsContent>

            <TabsContent value="sendblue" className="space-y-4">
              <div className="text-center space-y-4">
                <Phone className="h-12 w-12 mx-auto text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Connect SendBlue</h3>
                <p className="text-gray-400">2x higher response rates with blue bubble messaging</p>
                <Button onClick={() => setIsSendBlueModalOpen(true)}>Connect SendBlue</Button>
              </div>
            </TabsContent>

            <TabsContent value="stripe" className="space-y-4">
              <div className="text-center space-y-4">
                <CreditCard className="h-12 w-12 mx-auto text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Payment Processing</h3>
                <p className="text-gray-400">Automate creator payouts and financial management</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-transparent border-gray-700">
                    Connect Stripe
                  </Button>
                  <Button variant="outline" className="bg-transparent border-gray-700">
                    Connect Fanbasis
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* TikTok Shop Management Modal */}
      <Dialog open={isTikTokModalOpen} onOpenChange={setIsTikTokModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">TikTok Shop Management</DialogTitle>
            <DialogDescription>Manage your TikTok Shop integration</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Connection Status</h3>
                <p className="text-sm text-gray-400">Connected to Shop ID: 12345678</p>
              </div>
              <Badge className="bg-green-600 text-white">Connected</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Last Sync</Label>
                <p className="text-gray-400">2 minutes ago</p>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Health Status</Label>
                <p className="text-green-400">99.8% uptime</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={() => handleTestConnection("TikTok Shop")}
                disabled={isLoading}
              >
                {isLoading && testResults["TikTok Shop"] === "testing" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <TestTube className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>
              <Button variant="outline" className="w-full bg-transparent border-gray-700">
                Reconnect Account
              </Button>
              <Button variant="destructive" className="w-full">
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discord Setup Modal */}
      <Dialog open={isDiscordModalOpen} onOpenChange={setIsDiscordModalOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Discord Integration Setup</DialogTitle>
            <DialogDescription>Setup your Discord bot for automated role management</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-white">Install Bot</h3>
                  <p className="text-sm text-gray-400">Add bot to your Discord server</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-white">Configure</h3>
                  <p className="text-sm text-gray-400">Setup roles and permissions</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-white">Test</h3>
                  <p className="text-sm text-gray-400">Verify bot functionality</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Discord Server</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select your Discord server" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server1">Creator Circle Agency</SelectItem>
                    <SelectItem value="server2">My Other Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Auto-assign Role</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select role for new creators" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Bot className="h-4 w-4 mr-2" />
                Install Discord Bot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SendBlue Setup Modal */}
      <Dialog open={isSendBlueModalOpen} onOpenChange={setIsSendBlueModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">SendBlue SMS Setup</DialogTitle>
            <DialogDescription>Connect SendBlue for premium SMS delivery</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <h3 className="font-medium text-blue-400 mb-2">Why SendBlue?</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 2x higher response rates with blue bubble messaging</li>
                <li>• Premium SMS delivery through iMessage</li>
                <li>• Better creator engagement and communication</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">
                  Phone Number
                </Label>
                <Input id="phoneNumber" placeholder="+1 (555) 123-4567" className="bg-gray-800 border-gray-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-white">
                  SendBlue API Key
                </Label>
                <Input id="apiKey" placeholder="Enter your SendBlue API key" className="bg-gray-800 border-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-transparent border-gray-700">
                  Test SMS
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Connect SendBlue</Button>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Credit Packages</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="text-gray-400">Starter</p>
                  <p className="font-bold text-white">1,000 SMS</p>
                  <p className="text-purple-400">$29</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Pro</p>
                  <p className="font-bold text-white">5,000 SMS</p>
                  <p className="text-purple-400">$99</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Enterprise</p>
                  <p className="font-bold text-white">25,000 SMS</p>
                  <p className="text-purple-400">$399</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Management Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Payment Processing Management</DialogTitle>
            <DialogDescription>Manage your payment processors and payout settings</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Stripe</h3>
                    <Badge className="bg-green-600 text-white">Connected</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Standard payment processing</p>
                  <Button variant="outline" className="w-full bg-transparent border-gray-700">
                    Manage in Stripe
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Fanbasis</h3>
                    <Badge variant="secondary">Disconnected</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Premium creator payouts</p>
                  <Button variant="outline" className="w-full bg-transparent border-gray-700">
                    Connect Fanbasis
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-white">Payout Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Payout Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Minimum Payout</Label>
                  <Input placeholder="$50" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={() => handleTestConnection("Payment")}
                disabled={isLoading}
              >
                {isLoading && testResults["Payment"] === "testing" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <TestTube className="h-4 w-4 mr-2" />
                )}
                Test Payment Processing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Creation Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Create Your First Product</DialogTitle>
            <DialogDescription>Products are registration pages for your creator campaigns</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-white">
                  Product Name *
                </Label>
                <Input
                  id="productName"
                  placeholder="Creator Registration"
                  className="bg-gray-800 border-gray-700"
                  placeholder="Creator Registration"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="productDescription"
                  placeholder="Join our creator program and start earning..."
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Product Type</Label>
                <Select defaultValue="free">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free Registration</SelectItem>
                    <SelectItem value="paid">Paid Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Creator Capacity</Label>
                <Input placeholder="25" className="bg-gray-800 border-gray-700" />
              </div>

              <div className="space-y-3">
                <Label className="text-white">Discord Integration</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="autoRole" />
                    <Label htmlFor="autoRole" className="text-white">
                      Auto-assign Discord role
                    </Label>
                  </div>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select role to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage" className="text-white">
                  Welcome Message
                </Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Welcome to our creator program! We're excited to work with you..."
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent border-gray-700">
                Save Draft
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Create Product</Button>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Registration Link Preview</h4>
              <div className="flex items-center gap-2">
                <Input
                  value="https://launchpaid.com/register/creator-registration"
                  readOnly
                  className="bg-gray-700 border-gray-600 text-gray-300"
                />
                <Button size="sm" variant="outline" className="bg-transparent border-gray-700">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Chat Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-md bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Live Chat Support</DialogTitle>
            <DialogDescription>Get instant help with your setup</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="h-64 bg-gray-800 rounded-lg p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-green-600 text-white p-2 rounded-lg max-w-xs">
                  <p className="text-sm">
                    Hi! I'm here to help with your LaunchPaid setup. What can I assist you with?
                  </p>
                </div>
                <div className="bg-purple-600 text-white p-2 rounded-lg max-w-xs ml-auto">
                  <p className="text-sm">I need help setting up my integrations</p>
                </div>
                <div className="bg-green-600 text-white p-2 rounded-lg max-w-xs">
                  <p className="text-sm">I'd be happy to help! Which integration are you having trouble with?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="bg-gray-800 border-gray-700" />
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Support Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Email Support</DialogTitle>
            <DialogDescription>Send us an email and we'll respond within 6 hours</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="text-white">
                  Your Email
                </Label>
                <Input
                  id="supportEmail"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportSubject" className="text-white">
                  Subject
                </Label>
                <Input
                  id="supportSubject"
                  placeholder="Setup Assistance Request"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportMessage" className="text-white">
                Message
              </Label>
              <Textarea
                id="supportMessage"
                placeholder="Hi, I need help with..."
                className="bg-gray-800 border-gray-700 min-h-[120px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="includeProgress" />
              <Label htmlFor="includeProgress" className="text-white">
                Include setup progress report
              </Label>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Call Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Setup Call</DialogTitle>
            <DialogDescription>Book a 15-minute call with our setup specialist</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Date</Label>
                <Input type="date" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Time</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9am">9:00 AM</SelectItem>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="11am">11:00 AM</SelectItem>
                    <SelectItem value="2pm">2:00 PM</SelectItem>
                    <SelectItem value="3pm">3:00 PM</SelectItem>
                    <SelectItem value="4pm">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Timezone</Label>
              <Select defaultValue="est">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="callTopics" className="text-white">
                What would you like help with?
              </Label>
              <Textarea
                id="callTopics"
                placeholder="Integration setup, campaign creation, general questions..."
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Tutorial Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedVideo}</DialogTitle>
            <DialogDescription>Learn how to use LaunchPaid effectively</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">Video player would be embedded here</p>
                <p className="text-sm text-gray-500">Playing: {selectedVideo}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="sm" className="bg-transparent border-gray-700">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-gray-700">
                <Copy className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Transcript
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-gray-700">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guide Modal */}
      <Dialog open={isGuideModalOpen} onOpenChange={setIsGuideModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedGuide}</DialogTitle>
            <DialogDescription>Step-by-step instructions and best practices</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-white">Getting Started with LaunchPaid</h3>
              <p className="text-gray-300">
                Welcome to LaunchPaid! This guide will walk you through the essential steps to get your agency up and
                running.
              </p>

              <h4 className="text-white">Step 1: Complete Your Profile</h4>
              <p className="text-gray-300">
                Start by adding your agency information, logo, and contact details. This information will be visible to
                creators and clients.
              </p>

              <h4 className="text-white">Step 2: Connect Integrations</h4>
              <p className="text-gray-300">
                Connect your essential integrations like TikTok Shop for GMV tracking, Discord for community management,
                and payment processors for automated payouts.
              </p>

              <h4 className="text-white">Step 3: Create Your First Campaign</h4>
              <p className="text-gray-300">
                Set up your first creator campaign with clear objectives, payout structures, and creator requirements.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="bg-transparent border-gray-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="bg-transparent border-gray-700">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Advanced Settings Modals */}

      {/* Team Pods Modal */}
      <Dialog open={isTeamPodsModalOpen} onOpenChange={setIsTeamPodsModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Workspace Management</DialogTitle>
            <DialogDescription>Create team 'pods' that cap at 10 clients each</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="podName" className="text-white">
                  Pod Name
                </Label>
                <Input id="podName" placeholder="Marketing Team Pod" className="bg-gray-800 border-gray-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="podDescription" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="podDescription"
                  placeholder="Dedicated team for marketing campaigns..."
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Client Capacity</Label>
                  <Select defaultValue="10">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 clients</SelectItem>
                      <SelectItem value="10">10 clients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Team Lead</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select team lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user1">John Doe</SelectItem>
                      <SelectItem value="user2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Create Pod</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Automation Rules Modal */}
      <Dialog open={isAutomationModalOpen} onOpenChange={setIsAutomationModalOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Automation Rules</DialogTitle>
            <DialogDescription>Configure automated creator approvals and notifications</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-white">Creator Auto-Approval</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Auto-approve creators with 10K+ followers</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white">Auto-approve verified creators</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white">Auto-approve returning creators</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-white">Notification Triggers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Notify when creator is behind schedule</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white">Notify on campaign milestones</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white">Notify on payment failures</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Automation Rules</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Branding Modal */}
      <Dialog open={isBrandingModalOpen} onOpenChange={setIsBrandingModalOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Custom Branding</DialogTitle>
            <DialogDescription>White-label creator registration pages</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input placeholder="#A819FF" className="bg-gray-800 border-gray-700" />
                    <div className="w-10 h-10 bg-purple-600 rounded border border-gray-700"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input placeholder="#000000" className="bg-gray-800 border-gray-700" />
                    <div className="w-10 h-10 bg-black rounded border border-gray-700"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Custom Domain</Label>
                  <Input placeholder="creators.youragency.com" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-400">Upload your logo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Preview</h4>
              <div className="bg-white p-4 rounded border">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded mx-auto mb-2"></div>
                  <h3 className="font-bold text-gray-900">Join Our Creator Program</h3>
                  <p className="text-gray-600">Start earning with your content</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Branding Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Webhook Configuration Modal */}
      <Dialog open={isWebhookModalOpen} onOpenChange={setIsWebhookModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Webhook Configuration</DialogTitle>
            <DialogDescription>Setup webhooks for advanced integrations and notifications</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl" className="text-white">
                  Webhook URL
                </Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-app.com/webhooks/launchpaid"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Events to Subscribe</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "creator.applied",
                    "creator.approved",
                    "campaign.created",
                    "campaign.completed",
                    "payout.processed",
                    "payout.failed",
                  ].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch id={event} />
                      <Label htmlFor={event} className="text-sm text-gray-300">
                        {event}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookSecret" className="text-white">
                  Webhook Secret
                </Label>
                <Input
                  id="webhookSecret"
                  placeholder="Enter a secret for webhook verification"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent border-gray-700">
                Test Webhook
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Save Webhook</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
