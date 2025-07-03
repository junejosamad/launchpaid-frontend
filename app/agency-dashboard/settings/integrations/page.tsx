"use client"

import { useState } from "react"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Play,
  Settings,
  Zap,
  BarChart3,
  Link,
  Plus,
  RefreshCw,
  Eye,
  AlertTriangle,
  Server,
  Wifi,
} from "lucide-react"

export default function IntegrationsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  // Mock data for integrations
  const integrations = [
    {
      id: "tiktok-shop",
      name: "TikTok Shop",
      logo: "🎵",
      status: "connected",
      priority: "critical",
      description: "Connect your TikTok Shop to track GMV, sales data, and attribution per creator automatically",
      features: [
        "Real-time GMV tracking per creator",
        "Sales attribution to campaigns",
        "Product performance analytics",
        "Automated commission calculations",
      ],
      connectionInfo: {
        shopName: "Creator Circle Store",
        lastSync: "2 minutes ago",
        totalGMV: "$124,350 this month",
        productsConnected: "47 active products",
      },
      metrics: {
        uptime: "99.8%",
        responseTime: "120ms",
        dataPoints: "2.4M",
      },
    },
    {
      id: "discord",
      name: "Discord",
      logo: "💬",
      status: "connected",
      priority: "essential",
      description: "Automate Discord role management, channel creation, and creator communication",
      features: [
        "Auto-assign roles upon campaign approval",
        "Create private campaign channels",
        "Send automated performance updates",
        "Manage creator Discord permissions",
      ],
      connectionInfo: {
        server: "Creator Circle Agency",
        botStatus: "Active and operational",
        rolesManaged: "12 automated roles",
        channelsCreated: "8 campaign channels",
      },
      metrics: {
        uptime: "99.9%",
        responseTime: "85ms",
        automations: "23 active",
      },
    },
    {
      id: "sendblue",
      name: "SendBlue",
      logo: "📱",
      status: "connected",
      priority: "high",
      badge: "2x Response Rate",
      description: "Send SMS messages with blue bubble appearance for 2x higher response rates",
      features: [
        "Blue bubble messaging (iPhone users)",
        "2x higher response rates",
        "Bulk SMS campaigns",
        "Automated reminders and notifications",
      ],
      connectionInfo: {
        accountStatus: "Active Premium",
        creditsRemaining: "1,247 messages",
        responseRate: "24.3% (2.1x industry average)",
        messagesSent: "1,823 this month",
      },
      metrics: {
        uptime: "99.5%",
        responseTime: "200ms",
        deliveryRate: "98.7%",
      },
    },
    {
      id: "stripe",
      name: "Stripe",
      logo: "💳",
      status: "connected",
      priority: "high",
      description: "Process automated creator payouts and handle financial transactions",
      features: [
        "Automated creator payouts",
        "International payment support",
        "Dispute management",
        "Tax reporting and 1099 generation",
      ],
      connectionInfo: {
        account: "acct_1234567890",
        processingVolume: "$89,240 this month",
        successRate: "98.5%",
        nextPayout: "Tomorrow at 3 PM",
      },
      metrics: {
        uptime: "99.9%",
        responseTime: "150ms",
        transactions: "1,247",
      },
    },
    {
      id: "fanbasis",
      name: "Fanbasis",
      logo: "🏦",
      status: "disconnected",
      priority: "medium",
      badge: "Custom Features",
      description: "Alternative payment processor with custom features and direct owner relationship",
      features: [
        "Custom payout configurations",
        "Enhanced creator onboarding",
        "Specialized commission structures",
        "Direct support and customizations",
      ],
      connectionInfo: null,
      metrics: {
        uptime: "N/A",
        responseTime: "N/A",
        transactions: "0",
      },
    },
    {
      id: "gmail",
      name: "Gmail",
      logo: "📧",
      status: "connected",
      priority: "medium",
      description: "Send automated emails, campaigns, and creator communications through Gmail",
      features: [
        "Automated email campaigns",
        "Creator onboarding emails",
        "Performance notifications",
        "Campaign updates and announcements",
      ],
      connectionInfo: {
        account: "agency@creatorcircle.com",
        emailsSent: "456 this month",
        openRate: "67.3%",
        clickRate: "12.8%",
      },
      metrics: {
        uptime: "99.7%",
        responseTime: "300ms",
        deliveryRate: "97.2%",
      },
    },
  ]

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const totalCount = integrations.length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "essential":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      case "high":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "medium":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    return status === "connected" ? (
      <CheckCircle className="h-5 w-5 text-green-400" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-400" />
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <AgencySidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:pl-60">
        <AgencyHeader onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />

        <main className="p-6 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <span>Settings</span>
              <span className="mx-2">/</span>
              <span className="text-white">Integrations</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Integrations</h1>
              <p className="text-gray-400 mt-1">
                Connect your essential services for seamless automation and data flow
              </p>
            </div>
          </div>

          {/* Integration Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Connected Services</p>
                    <p className="text-2xl font-bold text-white">
                      {connectedCount}/{totalCount}
                    </p>
                    <p className="text-xs text-green-400">services active</p>
                  </div>
                  <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Data Sync Status</p>
                    <p className="text-2xl font-bold text-white">All Synced</p>
                    <p className="text-xs text-green-400">last: 2 min ago</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">API Health</p>
                    <p className="text-2xl font-bold text-white">99.8%</p>
                    <p className="text-xs text-green-400">uptime this month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Automation Status</p>
                    <p className="text-2xl font-bold text-white">23</p>
                    <p className="text-xs text-purple-400">automations running</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-400/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Integration Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Core Platform Integrations</h2>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2" />
                Request Integration
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{integration.logo}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-white">{integration.name}</CardTitle>
                            {integration.badge && (
                              <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                                {integration.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(integration.status)}
                            <span
                              className={`text-sm ${integration.status === "connected" ? "text-green-400" : "text-red-400"}`}
                            >
                              {integration.status === "connected" ? "Connected" : "Not Connected"}
                            </span>
                            <Badge className={`text-xs ${getPriorityColor(integration.priority)}`}>
                              {integration.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-400">{integration.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {integration.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                            <div className="h-1 w-1 bg-purple-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connection Info */}
                    {integration.connectionInfo && (
                      <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                        <h4 className="text-sm font-medium text-white">Connection Info:</h4>
                        {Object.entries(integration.connectionInfo).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">{integration.metrics.uptime}</div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">{integration.metrics.responseTime}</div>
                        <div className="text-xs text-gray-400">Response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">
                          {integration.metrics.dataPoints ||
                            integration.metrics.automations ||
                            integration.metrics.deliveryRate ||
                            integration.metrics.transactions}
                        </div>
                        <div className="text-xs text-gray-400">
                          {integration.metrics.dataPoints
                            ? "Data Points"
                            : integration.metrics.automations
                              ? "Automations"
                              : integration.metrics.deliveryRate
                                ? "Delivery"
                                : "Transactions"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {integration.status === "connected" ? (
                        <>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                                <Link className="h-4 w-4 mr-2" />
                                Connect {integration.name}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
                              <DialogHeader>
                                <DialogTitle>Connect {integration.name}</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Set up your {integration.name} integration to enable automated workflows.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="api-key">API Key</Label>
                                  <Input
                                    id="api-key"
                                    placeholder="Enter your API key"
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="webhook-url">Webhook URL</Label>
                                  <Input
                                    id="webhook-url"
                                    placeholder="https://api.launchpaid.com/webhooks"
                                    className="bg-gray-800 border-gray-700 text-white"
                                    readOnly
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch id="auto-sync" />
                                  <Label htmlFor="auto-sync" className="text-sm">
                                    Enable automatic data synchronization
                                  </Label>
                                </div>
                                <div className="flex gap-2">
                                  <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                                    Connect Integration
                                  </Button>
                                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    Test Connection
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Docs
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Integration Marketplace */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Integration Marketplace</h2>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Coming Soon</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Shopify", logo: "🛍️", description: "E-commerce platform connection" },
                { name: "Instagram", logo: "📸", description: "Cross-platform creator management" },
                { name: "YouTube", logo: "📺", description: "Multi-platform campaigns" },
                { name: "Slack", logo: "💬", description: "Team communication automation" },
              ].map((integration) => (
                <Card key={integration.name} className="bg-gray-900/50 border-gray-800 opacity-60">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{integration.logo}</div>
                    <h3 className="font-medium text-white mb-1">{integration.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{integration.description}</p>
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-400" disabled>
                      <Clock className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* System Health */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Server className="h-5 w-5 text-green-400" />
                System Health & Monitoring
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time status of all integration connections and data flows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">API Response Time</span>
                    <span className="text-sm text-green-400">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <span className="text-xs text-gray-500">Average: 150ms</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Data Sync Success</span>
                    <span className="text-sm text-green-400">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                  <span className="text-xs text-gray-500">Last 30 days</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Error Rate</span>
                    <span className="text-sm text-green-400">0.2%</span>
                  </div>
                  <Progress value={0.2} className="h-2" />
                  <span className="text-xs text-gray-500">Well below threshold</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Activity className="h-4 w-4 mr-2" />
                  View Detailed Logs
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Configure Alerts
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
