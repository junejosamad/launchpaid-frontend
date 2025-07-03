"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
  DollarSign,
  TrendingUp,
  Download,
  Search,
  CheckCircle,
  Clock,
  CreditCard,
  Users,
  Copy,
  BarChart3,
  PieChart,
  FileText,
  Banknote,
  Trophy,
  Target,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEarnings, usePaymentHistory } from "@/hooks/usePayments"
import { useAuth } from "@/hooks/useAuth"

interface PaymentRecord {
  id: string
  date: string
  campaign: string
  paymentType: "Base Pay" | "Bonus" | "Commission" | "Leaderboard" | "Referral"
  amount: number
  status: "Completed" | "Processing" | "Pending" | "Failed"
  method: "Stripe" | "Bank Transfer"
  transactionId: string
}

interface PendingPayout {
  id: string
  campaign: string
  amount: number
  status: "Pending Approval" | "Processing" | "Ready for Payout"
  completedDate: string
  estimatedPayout: string
}

interface ActiveCampaignEarning {
  id: string
  campaign: string
  earned: number
  projected: number
  progress: string
  status: "Active" | "Completed"
}

const paymentHistory: PaymentRecord[] = [
  {
    id: "TXN789",
    date: "June 15, 2025",
    campaign: "Home Decor Makeover",
    paymentType: "Base Pay",
    amount: 400,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN789",
  },
  {
    id: "TXN790",
    date: "June 15, 2025",
    campaign: "Home Decor Makeover",
    paymentType: "Bonus",
    amount: 120,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN790",
  },
  {
    id: "TXN785",
    date: "June 10, 2025",
    campaign: "Fitness Challenge",
    paymentType: "Commission",
    amount: 280,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN785",
  },
  {
    id: "TXN786",
    date: "June 10, 2025",
    campaign: "Fitness Challenge",
    paymentType: "Base Pay",
    amount: 100,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN786",
  },
  {
    id: "TXN782",
    date: "June 5, 2025",
    campaign: "Beauty Essentials",
    paymentType: "Leaderboard",
    amount: 300,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN782",
  },
  {
    id: "TXN780",
    date: "June 1, 2025",
    campaign: "Spring Collection",
    paymentType: "Commission",
    amount: 450,
    status: "Completed",
    method: "Stripe",
    transactionId: "#TXN780",
  },
]

const pendingPayouts: PendingPayout[] = [
  {
    id: "1",
    campaign: "Summer Fashion Collection",
    amount: 450,
    status: "Processing",
    completedDate: "June 20, 2025",
    estimatedPayout: "June 30, 2025",
  },
  {
    id: "2",
    campaign: "Tech Gadget Pro Launch",
    amount: 300,
    status: "Pending Approval",
    completedDate: "June 22, 2025",
    estimatedPayout: "July 2, 2025",
  },
  {
    id: "3",
    campaign: "Beauty Essentials Kit",
    amount: 450,
    status: "Processing",
    completedDate: "June 25, 2025",
    estimatedPayout: "July 1, 2025",
  },
]

const activeCampaignEarnings: ActiveCampaignEarning[] = [
  {
    id: "1",
    campaign: "Summer Fashion Collection",
    earned: 450,
    projected: 150,
    progress: "3/5 posts complete",
    status: "Active",
  },
  {
    id: "2",
    campaign: "Tech Gadget Pro Launch",
    earned: 300,
    projected: 200,
    progress: "2/3 videos complete",
    status: "Active",
  },
  {
    id: "3",
    campaign: "Beauty Essentials Kit",
    earned: 450,
    projected: 0,
    progress: "5/5 posts complete",
    status: "Completed",
  },
]

export default function EarningsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all")
  const [showReferralModal, setShowReferralModal] = useState(false)

  const { earnings, loading: earningsLoading, error: earningsError } = useEarnings(user?.id || "")

  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
  } = usePaymentHistory(user?.id || "", {
    search: searchQuery,
    status: statusFilter !== "all" ? statusFilter : undefined,
    type: paymentTypeFilter !== "all" ? paymentTypeFilter : undefined,
  })

  // Use real earnings data
  const totalLifetimeEarnings = earnings?.totalLifetime || 0
  const thisMonthEarnings = earnings?.thisMonth || 0
  const pendingPayoutsTotal = earnings?.pendingPayouts || 0
  const availableBalance = earnings?.availableBalance || 0

  const earningsBreakdown = earnings?.breakdown || {
    basePay: 0,
    bonuses: 0,
    commissions: 0,
    leaderboard: 0,
    referrals: 0,
  }

  const totalGMV = 1000000 // Placeholder value
  const campaignsCompleted = 5 // Placeholder value
  const averageEarningsPerCampaign = 200000 // Placeholder value
  const successRate = 85 // Placeholder value
  const referralData = {
    linksGenerated: 10,
    successfulReferrals: 3,
    referralEarnings: 1500,
    pendingReferrals: 2,
  } // Placeholder data

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = paymentTypeFilter === "all" || payment.type === paymentTypeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
      case "Processing":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Processing</Badge>
      case "Pending":
      case "Pending Approval":
        return <Badge className="bg-orange-600 hover:bg-orange-700">Pending</Badge>
      case "Failed":
        return <Badge className="bg-red-600 hover:bg-red-700">Failed</Badge>
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">{status}</Badge>
    }
  }

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "Base Pay":
        return "text-blue-400"
      case "Bonus":
        return "text-green-400"
      case "Commission":
        return "text-purple-400"
      case "Leaderboard":
        return "text-yellow-400"
      case "Referral":
        return "text-pink-400"
      default:
        return "text-gray-400"
    }
  }

  const generateReferralLink = () => {
    const link = `https://launchpaid.com/join?ref=alex-johnson-${Date.now()}`
    navigator.clipboard.writeText(link)
    // Show success message
  }

  if (earningsLoading || paymentsLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardSidebar />
        <div className="ml-[250px] min-h-screen">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Earnings</h1>
                <p className="text-gray-400 text-lg">Track your payments and financial performance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-400">Stripe Connected</span>
                </div>
                <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Lifetime Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalLifetimeEarnings.toLocaleString()}</div>
                <p className="text-xs text-gray-400 mt-1">All-time earnings</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold">${thisMonthEarnings.toLocaleString()}</div>
                  <Badge className="ml-2 bg-green-600 hover:bg-green-700">+15%</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-1">vs. previous month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Pending Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">${pendingPayoutsTotal.toLocaleString()}</div>
                <p className="text-xs text-gray-400 mt-1">{pendingPayouts.length} payments pending</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">${availableBalance.toLocaleString()}</div>
                <p className="text-xs text-gray-400 mt-1">Ready for withdrawal</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">${totalGMV.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total GMV Generated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold">{campaignsCompleted}</div>
                    <div className="text-sm text-gray-400">Campaigns Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">${averageEarningsPerCampaign.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Avg per Campaign</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-semibold">{successRate}%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
                Payment History
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600">
                Pending Payouts
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-purple-600">
                Referrals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Earnings Breakdown */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-purple-400" />
                      Earnings Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Base Pay</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${earningsBreakdown.basePay.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">49.8%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Bonuses</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${earningsBreakdown.bonuses.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">25.3%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Commissions</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${earningsBreakdown.commissions.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">22.5%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Leaderboard</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${earningsBreakdown.leaderboard.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">2.4%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className="text-sm">Referrals</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${earningsBreakdown.referrals.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">0%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Campaign Earnings */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-400" />
                      Active Campaign Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeCampaignEarnings.map((campaign) => (
                      <div key={campaign.id} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{campaign.campaign}</h4>
                            <p className="text-sm text-gray-400">{campaign.progress}</p>
                          </div>
                          <Badge
                            className={campaign.status === "Active" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600"}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Earned: ${campaign.earned}</span>
                          <span className="text-purple-400">Projected: ${campaign.projected}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex justify-between font-semibold">
                        <span>Total Projected This Month:</span>
                        <span className="text-purple-400">$350</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Setup */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                      Payment Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Stripe Account</span>
                      </div>
                      <Badge className="bg-green-600 hover:bg-green-700">Connected</Badge>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Bank Account:</span>
                      <span className="text-sm">****1234 - Wells Fargo</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Payment Schedule:</span>
                      <span className="text-sm">Weekly automatic payouts</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Next Payout Date:</span>
                      <span className="text-sm text-purple-400">June 30, 2025</span>
                    </div>

                    <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                      Update Payment Method
                    </Button>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-400" />
                      Export Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Tax Report
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Payment History
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Campaign Earnings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              {/* Payment History */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-purple-400" />
                    Payment History
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search payments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={paymentTypeFilter} onValueChange={setPaymentTypeFilter}>
                      <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Base Pay">Base Pay</SelectItem>
                        <SelectItem value="Bonus">Bonus</SelectItem>
                        <SelectItem value="Commission">Commission</SelectItem>
                        <SelectItem value="Leaderboard">Leaderboard</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800">
                          <TableHead>Date</TableHead>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Transaction ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id} className="border-gray-800">
                            <TableCell className="text-gray-300">{payment.date}</TableCell>
                            <TableCell className="font-medium">{payment.campaign}</TableCell>
                            <TableCell>
                              <span className={cn("font-medium", getPaymentTypeColor(payment.paymentType))}>
                                {payment.paymentType}
                              </span>
                            </TableCell>
                            <TableCell className="font-semibold">${payment.amount}</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell className="text-gray-400">{payment.method}</TableCell>
                            <TableCell className="text-gray-400 font-mono text-sm">{payment.transactionId}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              {/* Pending Payouts */}
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      Pending Payouts (${pendingPayoutsTotal.toLocaleString()})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingPayouts.map((payout) => (
                      <div key={payout.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{payout.campaign}</h4>
                            <p className="text-sm text-gray-400">Completed {payout.completedDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">${payout.amount}</div>
                            {getStatusBadge(payout.status)}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Estimated payout:</span>
                          <span className="text-purple-400">{payout.estimatedPayout}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      Processing Payouts ($600)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Goli Partner Program</h4>
                          <p className="text-sm text-gray-400">Stripe processing</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">$600</div>
                          <Badge className="bg-yellow-600 hover:bg-yellow-700">Processing</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-green-400">ETA: 2-3 business days</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="referrals">
              {/* Referral Program */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      Referral Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold">{referralData.linksGenerated}</div>
                        <div className="text-sm text-gray-400">Links Generated</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold">{referralData.successfulReferrals}</div>
                        <div className="text-sm text-gray-400">Successful Referrals</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold">${referralData.referralEarnings}</div>
                        <div className="text-sm text-gray-400">Referral Earnings</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold">{referralData.pendingReferrals}</div>
                        <div className="text-sm text-gray-400">Pending Referrals</div>
                      </div>
                    </div>

                    <Dialog open={showReferralModal} onOpenChange={setShowReferralModal}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Share2 className="h-4 w-4 mr-2" />
                          Generate New Referral Link
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800">
                        <DialogHeader>
                          <DialogTitle>Generate Referral Link</DialogTitle>
                          <DialogDescription>
                            Share this link with other creators to earn referral bonuses when they join LaunchPaid.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                            <div className="text-sm text-gray-400 mb-1">Your referral link:</div>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 text-sm bg-gray-700 p-2 rounded">
                                https://launchpaid.com/join?ref=alex-johnson
                              </code>
                              <Button size="sm" onClick={generateReferralLink}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            <strong>How it works:</strong>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Share your referral link with other creators</li>
                              <li>When they sign up and complete their first campaign, you earn a bonus</li>
                              <li>Track your referral earnings in this dashboard</li>
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Referral Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Sarah M.</span>
                          <Badge className="bg-orange-600 hover:bg-orange-700">Under Review</Badge>
                        </div>
                        <div className="text-sm text-gray-400">Applied 3 days ago</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Mike R.</span>
                          <Badge className="bg-orange-600 hover:bg-orange-700">Under Review</Badge>
                        </div>
                        <div className="text-sm text-gray-400">Applied 1 week ago</div>
                      </div>

                      <div className="text-center py-4 text-gray-400">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No successful referrals yet</p>
                        <p className="text-xs">Start sharing your link to earn bonuses!</p>
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
