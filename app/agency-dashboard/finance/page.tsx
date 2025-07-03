"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  ExternalLink,
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Send,
  RefreshCw,
  Plus,
  Settings,
} from "lucide-react"

// Mock data for demonstration
const mockFinanceData = {
  kpis: {
    totalRevenue: { amount: 124350, growth: 25, period: "vs last 30 days" },
    outstandingPayouts: { amount: 45860, count: 127, average: 361 },
    totalPaidOut: { amount: 89240, count: 234, growth: 18, successRate: 98.5 },
    agencyBalance: { amount: 34190, available: 28450, reserved: 5740 },
  },
  revenueBreakdown: [
    { name: "Campaign Management", value: 60, amount: 74610 },
    { name: "GMV Commissions", value: 25, amount: 31087 },
    { name: "Setup Fees", value: 10, amount: 12435 },
    { name: "Other", value: 5, amount: 6218 },
  ],
  payoutStatus: [
    { status: "Completed", amount: 89240, count: 234, color: "green" },
    { status: "Processing", amount: 12560, count: 43, color: "blue" },
    { status: "Pending", amount: 45860, count: 127, color: "yellow" },
    { status: "Failed", amount: 2340, count: 8, color: "red" },
  ],
  topCampaigns: [
    { name: "Golf Partner Program", revenue: 24560, growth: 15 },
    { name: "Fashion Nova Collab", revenue: 18230, growth: 8 },
    { name: "Tech Gadget Pro", revenue: 15890, growth: 22 },
    { name: "Global Healing", revenue: 12340, growth: -5 },
  ],
  payouts: [
    {
      id: "1",
      creator: { name: "Sarah Johnson", handle: "@sarahj", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Golf Partner Program",
      type: "Base Pay",
      amount: 300,
      calculation: "20 posts × $15",
      status: "pending",
      paymentMethod: "Stripe",
      scheduledDate: "2024-01-15",
    },
    {
      id: "2",
      creator: { name: "Mike Chen", handle: "@mikechen", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Fashion Nova Collab",
      type: "GMV Commission",
      amount: 125.5,
      calculation: "GMV $2,510 × 5%",
      status: "processing",
      paymentMethod: "Fanbasis",
      scheduledDate: "2024-01-14",
    },
    {
      id: "3",
      creator: { name: "Emma Davis", handle: "@emmad", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Tech Gadget Pro",
      type: "Performance Bonus",
      amount: 450,
      calculation: "Leaderboard #1",
      status: "completed",
      paymentMethod: "Stripe",
      scheduledDate: "2024-01-13",
    },
  ],
  invoices: [
    {
      id: "INV-001",
      client: "TechCorp Inc.",
      description: "Campaign Management - Q1 2024",
      amount: 15000,
      status: "paid",
      issueDate: "2024-01-01",
      dueDate: "2024-01-31",
      paymentMethod: "Stripe",
    },
    {
      id: "INV-002",
      client: "Fashion Brand Co.",
      description: "Influencer Campaign Setup",
      amount: 8500,
      status: "sent",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      paymentMethod: "Bank Transfer",
    },
  ],
  activities: [
    {
      id: "1",
      timestamp: "2024-01-15 14:30",
      type: "payout_processed",
      description: "Payout of $300 processed for Sarah Johnson",
      status: "success",
      user: "System",
    },
    {
      id: "2",
      timestamp: "2024-01-15 13:45",
      type: "invoice_paid",
      description: "Invoice INV-001 marked as paid - $15,000",
      status: "success",
      user: "Admin",
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:20",
      type: "payment_failed",
      description: "Payout failed for Mike Chen - $125.50",
      status: "error",
      user: "System",
    },
  ],
}

export default function FinancePage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
      case "sent":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
      case "overdue":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
      case "sent":
        return <AlertCircle className="h-4 w-4" />
      case "failed":
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>Finance</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Finance Dashboard</h1>
            <p className="text-gray-400">Manage payouts, payments, and financial reporting</p>
          </div>

          {/* Global Filter Panel */}
          <Card className="bg-gray-900/50 border-gray-800 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="date-range" className="text-sm text-gray-400">
                    Date Range:
                  </Label>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Yesterday</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                      <SelectItem value="all">All-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="campaign-filter" className="text-sm text-gray-400">
                    Campaign:
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="golf">Golf Partner Program</SelectItem>
                      <SelectItem value="fashion">Fashion Nova Collab</SelectItem>
                      <SelectItem value="tech">Tech Gadget Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="payment-method" className="text-sm text-gray-400">
                    Payment:
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="fanbasis">Fanbasis</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Stripe Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="payouts" className="data-[state=active]:bg-purple-600">
                Payouts
              </TabsTrigger>
              <TabsTrigger value="invoicing" className="data-[state=active]:bg-purple-600">
                Payments & Invoicing
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
                Activity Log
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600">
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(mockFinanceData.kpis.totalRevenue.amount)}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">+{mockFinanceData.kpis.totalRevenue.growth}%</span>
                      <span className="text-gray-400">{mockFinanceData.kpis.totalRevenue.period}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Outstanding Payouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(mockFinanceData.kpis.outstandingPayouts.amount)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{mockFinanceData.kpis.outstandingPayouts.count} payments</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-6 text-xs">
                        Process All
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Paid Out</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(mockFinanceData.kpis.totalPaidOut.amount)}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">+{mockFinanceData.kpis.totalPaidOut.growth}%</span>
                      <span className="text-gray-400">Success: {mockFinanceData.kpis.totalPaidOut.successRate}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Agency Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(mockFinanceData.kpis.agencyBalance.amount)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Available: {formatCurrency(mockFinanceData.kpis.agencyBalance.available)}
                      </span>
                      <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800 h-6 text-xs">
                        Withdraw
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Overview */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockFinanceData.revenueBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0
                                  ? "bg-purple-500"
                                  : index === 1
                                    ? "bg-blue-500"
                                    : index === 2
                                      ? "bg-green-500"
                                      : "bg-yellow-500"
                              }`}
                            />
                            <span className="text-gray-300">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{formatCurrency(item.amount)}</div>
                            <div className="text-sm text-gray-400">{item.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payout Status */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Payout Status Tracker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockFinanceData.payoutStatus.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                item.color === "green"
                                  ? "bg-green-500"
                                  : item.color === "blue"
                                    ? "bg-blue-500"
                                    : item.color === "yellow"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                              }`}
                            />
                            <span className="text-gray-300">{item.status}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{formatCurrency(item.amount)}</div>
                            <div className="text-sm text-gray-400">{item.count} payments</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-2">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        Process Pending Payouts
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                        Retry Failed Payments
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Automatic Payouts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Campaigns */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Revenue by Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinanceData.topCampaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <div className="font-medium text-white">{campaign.name}</div>
                          <div className="text-sm text-gray-400">Campaign Revenue</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(campaign.revenue)}</div>
                          <div
                            className={`text-sm flex items-center gap-1 ${
                              campaign.growth > 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {campaign.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(campaign.growth)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Trends Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Financial Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg mb-4">
                      <div className="text-center text-gray-400">
                        <div className="text-sm mb-2">Multi-line Chart Placeholder</div>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Revenue</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Payouts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Net Profit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-400">Profit Margin</div>
                        <div className="text-lg font-semibold text-green-400">34.2%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Payout Ratio</div>
                        <div className="text-lg font-semibold text-red-400">65.8%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Growth Rate</div>
                        <div className="text-lg font-semibold text-blue-400">+25% MoM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payouts Tab */}
            <TabsContent value="payouts" className="space-y-6">
              {/* Payout Control Panel */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Payout Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Process Selected ({selectedPayouts.length})
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Payout
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                      <Send className="h-4 w-4 mr-2" />
                      Send Notifications
                    </Button>
                    <div className="ml-auto flex items-center gap-2">
                      <Label className="text-sm text-gray-400">Auto-process:</Label>
                      <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automation Settings */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Automation Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-400">Auto-process</Label>
                      <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                        ON
                      </Button>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Minimum Threshold</Label>
                      <Input value="$50" className="bg-gray-800 border-gray-700 mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Processing Day</Label>
                      <Select defaultValue="friday">
                        <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friday">Fridays</SelectItem>
                          <SelectItem value="monday">Mondays</SelectItem>
                          <SelectItem value="wednesday">Wednesdays</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Filtering */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Advanced Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label className="text-sm text-gray-400">Status</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Amount Range</Label>
                      <div className="mt-1 text-xs text-gray-400">$0 - $5,000+</div>
                      <input type="range" min="0" max="5000" className="w-full mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Payment Method</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="fanbasis">Fanbasis</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Creator Search</Label>
                      <Input placeholder="Name or handle" className="bg-gray-800 border-gray-700 mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Campaign</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Campaigns</SelectItem>
                          <SelectItem value="golf">Golf Partner</SelectItem>
                          <SelectItem value="fashion">Fashion Nova</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payout Table */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">Payout Details</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search creators..." className="pl-10 bg-gray-800 border-gray-700 w-64" />
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="w-12">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead className="text-gray-400">Creator</TableHead>
                        <TableHead className="text-gray-400">Campaign</TableHead>
                        <TableHead className="text-gray-400">Type</TableHead>
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Payment Method</TableHead>
                        <TableHead className="text-gray-400">Scheduled</TableHead>
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFinanceData.payouts.map((payout) => (
                        <TableRow key={payout.id} className="border-gray-800">
                          <TableCell>
                            <input
                              type="checkbox"
                              className="rounded"
                              checked={selectedPayouts.includes(payout.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPayouts([...selectedPayouts, payout.id])
                                } else {
                                  setSelectedPayouts(selectedPayouts.filter((id) => id !== payout.id))
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={payout.creator.avatar || "/placeholder.svg"}
                                alt={payout.creator.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-white">{payout.creator.name}</div>
                                <div className="text-sm text-gray-400">{payout.creator.handle}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">{payout.campaign}</TableCell>
                          <TableCell className="text-gray-300">{payout.type}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-white">{formatCurrency(payout.amount)}</div>
                              <div className="text-sm text-gray-400">{payout.calculation}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(payout.status)} border`}>
                              {getStatusIcon(payout.status)}
                              <span className="ml-1 capitalize">{payout.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{payout.paymentMethod}</TableCell>
                          <TableCell className="text-gray-300">{payout.scheduledDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Process Now
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Amount
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Resend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoicing Tab */}
            <TabsContent value="invoicing" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">Invoice Management</CardTitle>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate New Invoice
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-400">Invoice #</TableHead>
                        <TableHead className="text-gray-400">Client</TableHead>
                        <TableHead className="text-gray-400">Description</TableHead>
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Issue Date</TableHead>
                        <TableHead className="text-gray-400">Due Date</TableHead>
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFinanceData.invoices.map((invoice) => (
                        <TableRow key={invoice.id} className="border-gray-800">
                          <TableCell className="font-medium text-purple-400">{invoice.id}</TableCell>
                          <TableCell className="text-gray-300">{invoice.client}</TableCell>
                          <TableCell className="text-gray-300">{invoice.description}</TableCell>
                          <TableCell className="font-medium text-white">{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(invoice.status)} border`}>
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1 capitalize">{invoice.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{invoice.issueDate}</TableCell>
                          <TableCell className="text-gray-300">{invoice.dueDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Payment Methods Management */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Payment Methods Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Stripe Account</div>
                          <div className="text-sm text-gray-400">acct_xxxxxxxxx</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                          Manage in Stripe
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Fanbasis Account</div>
                          <div className="text-sm text-gray-400">Enhanced creator payouts</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                          Manage in Fanbasis
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">B</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Bank Account</div>
                          <div className="text-sm text-gray-400">Primary account: ****1234</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                          Add Account
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                          Edit Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Log Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Financial Activity Stream</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinanceData.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === "success"
                              ? "bg-green-500"
                              : activity.status === "error"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-white">{activity.description}</span>
                            <span className="text-sm text-gray-400">{activity.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Type: {activity.type.replace("_", " ")}</span>
                            <span>•</span>
                            <span>User: {activity.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audit Trail */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Transaction History & Audit Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-gray-400">Event Type</Label>
                        <Select defaultValue="all">
                          <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="payouts">Payouts</SelectItem>
                            <SelectItem value="invoices">Invoices</SelectItem>
                            <SelectItem value="transfers">Transfers</SelectItem>
                            <SelectItem value="errors">Errors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-400">Date Range</Label>
                        <Input type="date" className="bg-gray-800 border-gray-700 mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-400">Amount Range</Label>
                        <Input placeholder="Min - Max" className="bg-gray-800 border-gray-700 mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-400">User Filter</Label>
                        <Select defaultValue="all">
                          <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gray-800/50 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">Payout Modification - Sarah Johnson</span>
                          <span className="text-sm text-gray-400">2024-01-15 14:30</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Amount changed from $300.00 to $347.50 (Performance bonus added)
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Modified by: Admin User | Reason: Leaderboard bonus
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-800/50 border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">Failed Payment Retry - Mike Chen</span>
                          <span className="text-sm text-gray-400">2024-01-15 13:45</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Payment failed: Insufficient funds in Stripe account. Auto-retry scheduled.
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          System Generated | Next retry: 2024-01-16 09:00
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-800/50 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">Invoice Payment Received - TechCorp Inc.</span>
                          <span className="text-sm text-gray-400">2024-01-15 12:20</span>
                        </div>
                        <div className="text-sm text-gray-400">Invoice INV-001 paid via Stripe: $15,000.00</div>
                        <div className="text-xs text-gray-500 mt-1">
                          System Generated | Transaction ID: txn_xxxxxxxxx
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Quick Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Weekly Payout Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Monthly Revenue Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Campaign Profitability Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Creator Earnings Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Custom Report Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-400">Report Type</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Analysis</SelectItem>
                          <SelectItem value="payouts">Payout Summary</SelectItem>
                          <SelectItem value="campaigns">Campaign Performance</SelectItem>
                          <SelectItem value="creators">Creator Earnings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Date Range</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Generate Custom Report</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Profitability Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <div className="text-sm text-gray-400">Revenue vs Costs</div>
                        <div className="text-lg font-semibold text-white">$124,350 / $89,240</div>
                        <div className="text-xs text-green-400">Margin: 28.2%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <div className="text-sm text-gray-400">Campaign ROI</div>
                        <div className="text-lg font-semibold text-white">4.2x</div>
                        <div className="text-xs text-green-400">Above target</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Golf Partner Program</span>
                        <span className="text-white">ROI: 5.1x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fashion Nova Collab</span>
                        <span className="text-white">ROI: 3.8x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Tech Gadget Pro</span>
                        <span className="text-white">ROI: 4.5x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Cash Flow Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <div className="text-sm text-gray-400">Incoming Revenue</div>
                        <div className="text-lg font-semibold text-white">$67,890</div>
                        <div className="text-xs text-blue-400">Next 30 days</div>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <div className="text-sm text-gray-400">Scheduled Payouts</div>
                        <div className="text-lg font-semibold text-white">$45,860</div>
                        <div className="text-xs text-yellow-400">Next 7 days</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Working Capital</span>
                        <span className="text-white">$34,190</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Cash Flow Forecast</span>
                        <span className="text-green-400">+$22,030</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Burn Rate</span>
                        <span className="text-white">$15,287/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
