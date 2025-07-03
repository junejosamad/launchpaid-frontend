"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CreditCard,
  Download,
  Plus,
  Users,
  MessageSquare,
  HardDrive,
  DollarSign,
  Settings,
  FileText,
  Building,
  Mail,
  BarChart3,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Eye,
  Send,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"

export default function BillingPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar />
      <div className="lg:ml-60">
        <AgencyHeader />
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <Link href="/agency-dashboard/settings" className="hover:text-white">
                Settings
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Billing</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2">Billing & Invoicing</h1>
            <p className="text-gray-400">Manage client invoicing, payment methods, and billing history</p>
          </div>

          <div className="space-y-8">
            {/* Payment Methods */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
                  <p className="text-gray-400">Manage your payment methods for processing transactions</p>
                </div>
                <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>Add a new credit card or bank account</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" className="bg-gray-800 border-gray-700" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="bg-gray-800 border-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" className="bg-gray-800 border-gray-700" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">Add Payment Method</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-blue-400" />
                        <div>
                          <div className="font-medium">•••• •••• •••• 4242</div>
                          <div className="text-sm text-gray-400">Visa • Expires 12/27</div>
                        </div>
                        <Badge className="bg-green-600 hover:bg-green-700">Primary</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Building className="h-8 w-8 text-gray-400" />
                        <div>
                          <div className="font-medium">••••••1234</div>
                          <div className="text-sm text-gray-400">Chase Business • Backup</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Set as Primary
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Usage Analytics */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Usage & Analytics</h2>
                <p className="text-gray-400">Track your platform usage and performance metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-purple-400" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">8</div>
                    <div className="text-sm text-gray-400 mb-3">Active team members</div>
                    <div className="text-xs text-green-400">+2 members this month</div>
                    <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                      Invite Team Members
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      Active Campaigns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">12</div>
                    <div className="text-sm text-gray-400 mb-3">Running campaigns</div>
                    <div className="text-xs text-blue-400">Peak: 28 campaigns</div>
                    <div className="text-xs text-gray-500 mt-1">Strong performance</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-green-400" />
                      SMS Credits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">1,247</div>
                    <div className="text-sm text-gray-400 mb-3">Credits remaining</div>
                    <div className="text-xs text-yellow-400">42 messages/day avg</div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Buy Additional Credits
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <HardDrive className="h-4 w-4 text-orange-400" />
                      Storage Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">45GB</div>
                    <div className="text-sm text-gray-400 mb-3">Data stored</div>
                    <div className="text-xs text-gray-400">+3GB per month</div>
                    <div className="text-xs text-gray-500 mt-1">Sufficient capacity</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Client Invoice Management */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Client Invoices</h2>
                  <p className="text-gray-400">Generate and manage invoices for your brand clients</p>
                </div>
                <div className="flex gap-3">
                  <Dialog open={showInvoiceGenerator} onOpenChange={setShowInvoiceGenerator}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Generate Client Invoice</DialogTitle>
                        <DialogDescription>Create a custom invoice for your brand clients</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="clientSelect">Select Client</Label>
                            <Select>
                              <SelectTrigger className="bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Choose client" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="nike">Nike</SelectItem>
                                <SelectItem value="adidas">Adidas</SelectItem>
                                <SelectItem value="puma">Puma</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="invoiceDate">Invoice Date</Label>
                            <Input type="date" className="bg-gray-800 border-gray-700" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="serviceDescription">Service Description</Label>
                          <Textarea
                            placeholder="Describe the services provided..."
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input placeholder="$0.00" className="bg-gray-800 border-gray-700" />
                          </div>
                          <div>
                            <Label htmlFor="tax">Tax Rate</Label>
                            <Input placeholder="8.5%" className="bg-gray-800 border-gray-700" />
                          </div>
                          <div>
                            <Label htmlFor="paymentTerms">Payment Terms</Label>
                            <Select>
                              <SelectTrigger className="bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Net 30" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="net15">Net 15</SelectItem>
                                <SelectItem value="net30">Net 30</SelectItem>
                                <SelectItem value="net60">Net 60</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setShowInvoiceGenerator(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700">Generate Invoice</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </div>

              {/* Invoice Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("all")}
                  className={
                    activeFilter === "all" ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700 hover:bg-gray-800"
                  }
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === "paid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("paid")}
                  className={
                    activeFilter === "paid" ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700 hover:bg-gray-800"
                  }
                >
                  Paid
                </Button>
                <Button
                  variant={activeFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("pending")}
                  className={
                    activeFilter === "pending"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-gray-700 hover:bg-gray-800"
                  }
                >
                  Pending
                </Button>
                <Button
                  variant={activeFilter === "overdue" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("overdue")}
                  className={
                    activeFilter === "overdue"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-gray-700 hover:bg-gray-800"
                  }
                >
                  Overdue
                </Button>
              </div>

              {/* Invoice Table */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-400">Invoice #</th>
                          <th className="text-left p-4 font-medium text-gray-400">Client</th>
                          <th className="text-left p-4 font-medium text-gray-400">Amount</th>
                          <th className="text-left p-4 font-medium text-gray-400">Date</th>
                          <th className="text-left p-4 font-medium text-gray-400">Status</th>
                          <th className="text-left p-4 font-medium text-gray-400">Payment Method</th>
                          <th className="text-left p-4 font-medium text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="p-4">
                            <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                              INV-2025-001
                            </Button>
                          </td>
                          <td className="p-4">Nike Campaign Services</td>
                          <td className="p-4 font-medium">$15,000.00</td>
                          <td className="p-4 text-gray-400">Jan 1, 2025</td>
                          <td className="p-4">
                            <Badge className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Paid
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-400">Wire Transfer</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-4">
                            <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                              INV-2024-012
                            </Button>
                          </td>
                          <td className="p-4">Adidas Influencer Campaign</td>
                          <td className="p-4 font-medium">$8,500.00</td>
                          <td className="p-4 text-gray-400">Dec 15, 2024</td>
                          <td className="p-4">
                            <Badge className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Paid
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-400">ACH Transfer</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-4">
                            <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                              INV-2024-011
                            </Button>
                          </td>
                          <td className="p-4">Puma Creator Management</td>
                          <td className="p-4 font-medium">$12,000.00</td>
                          <td className="p-4 text-gray-400">Dec 1, 2024</td>
                          <td className="p-4">
                            <Badge className="bg-yellow-600 hover:bg-yellow-700">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-400">Check</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Billing Preferences */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Billing Preferences</h2>
                <p className="text-gray-400">Configure your billing settings and notifications</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      Billing Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="billingEmail">Billing Email</Label>
                      <Input
                        id="billingEmail"
                        defaultValue="accounting@creatorcircle.com"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="taxId">Business Tax ID</Label>
                      <Input id="taxId" placeholder="12-3456789" className="bg-gray-800 border-gray-700" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-400" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Invoice Generation</div>
                        <div className="text-sm text-gray-400">Get notified when invoices are created</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Payment Received</div>
                        <div className="text-sm text-gray-400">Alert when payments are received</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Overdue Invoices</div>
                        <div className="text-sm text-gray-400">Notify when invoices become overdue</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Payment Processing Settings */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Payment Processing</h2>
                <p className="text-gray-400">Configure how you process payments and payouts</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      Stripe Integration
                    </CardTitle>
                    <CardDescription>
                      <Badge className="bg-green-600 hover:bg-green-700 mr-2">Connected</Badge>
                      Processing Volume: $89,240 this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Transaction Fees</div>
                        <div className="font-medium">2.9% + $0.30</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Payout Schedule</div>
                        <div className="font-medium">Daily automatic</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        View Dashboard
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        Update Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                      </div>
                      Fanbasis Integration
                    </CardTitle>
                    <CardDescription>
                      <Badge className="bg-green-600 hover:bg-green-700 mr-2">Connected</Badge>
                      Processing Volume: $45,890 this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Custom Fee Rate</div>
                        <div className="font-medium">2.5% (negotiated)</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Payout Schedule</div>
                        <div className="font-medium">Weekly batch</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        Custom Features
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Financial Analytics */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Financial Analytics</h2>
                <p className="text-gray-400">Track your revenue and payment performance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Monthly Revenue</div>
                        <div className="text-2xl font-bold">$35,500</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Outstanding Invoices</div>
                        <div className="text-2xl font-bold">$12,000</div>
                      </div>
                      <BarChart3 className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Payment Success Rate</div>
                        <div className="text-2xl font-bold">98.5%</div>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Avg Payment Time</div>
                        <div className="text-2xl font-bold">1.2 days</div>
                      </div>
                      <Clock className="h-8 w-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
