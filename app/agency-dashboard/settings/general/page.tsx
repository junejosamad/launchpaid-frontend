"use client"

import { useState } from "react"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  Upload,
  Shield,
  Bell,
  Globe,
  Database,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Trash2,
  Key,
  Smartphone,
  Mail,
  Zap,
  ChevronRight,
  Save,
  RotateCcw,
  ExternalLink,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function GeneralSettingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [notifications, setNotifications] = useState({
    campaignEmail: true,
    campaignSMS: false,
    campaignInApp: true,
    financialEmail: true,
    financialSMS: true,
    financialInApp: true,
    systemEmail: true,
    systemSMS: false,
    systemInApp: true,
  })

  const integrationStatus = [
    { name: "TikTok Shop", status: "connected", lastSync: "2 minutes ago", icon: "🛍️" },
    { name: "Discord", status: "connected", lastSync: "Server: Creator Circle Agency", icon: "💬" },
    { name: "SendBlue", status: "connected", lastSync: "Credits remaining: 1,247", icon: "📱" },
    { name: "Stripe", status: "connected", lastSync: "Last payout: 3 hours ago", icon: "💳" },
    { name: "Fanbasis", status: "disconnected", lastSync: "Setup recommended", icon: "👥" },
  ]

  const recentLogins = [
    { device: "Chrome on Windows", location: "New York, NY", ip: "192.168.1.1", date: "2 hours ago" },
    { device: "Safari on iPhone", location: "New York, NY", ip: "192.168.1.2", date: "1 day ago" },
    { device: "Chrome on MacOS", location: "Los Angeles, CA", ip: "10.0.0.1", date: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:pl-60">
        <AgencyHeader onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Link href="/agency-dashboard/settings" className="hover:text-white">
                Settings
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>General</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">General Settings</h1>
            <p className="text-gray-400">Manage your agency profile, account security, and preferences</p>
          </div>

          {/* Settings Tabs */}
          <div className="space-y-8">
            {/* Agency Profile Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  Agency Information
                </CardTitle>
                <CardDescription>Basic information about your agency and brand identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Agency Name *</Label>
                    <Input id="agencyName" defaultValue="Creator Circle Agency" className="bg-black border-gray-700" />
                    <p className="text-xs text-gray-400">This appears on invoices and client communications</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="flex gap-2">
                      <Input id="website" placeholder="https://your-agency.com" className="bg-black border-gray-700" />
                      <Button variant="outline" size="icon" className="border-gray-700">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Agency Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-purple-600/20 flex items-center justify-center border-2 border-dashed border-gray-600">
                      <Building2 className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="border-gray-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-400">PNG, JPG up to 2MB, recommended 400x400px</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Agency Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your agency for creator applications and partnerships"
                    className="bg-black border-gray-700 min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-400">0/500 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Primary Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="contact@creatorcircle.com"
                      className="bg-black border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="us">
                        <SelectTrigger className="w-20 bg-black border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">🇺🇸 +1</SelectItem>
                          <SelectItem value="uk">🇬🇧 +44</SelectItem>
                          <SelectItem value="ca">🇨🇦 +1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input id="phone" placeholder="(555) 123-4567" className="bg-black border-gray-700" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Business St, City, State 12345"
                    className="bg-black border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger className="bg-black border-gray-700">
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
              </CardContent>
            </Card>

            {/* Account Security Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Account Security
                </CardTitle>
                <CardDescription>Protect your account with advanced security features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-400">Last changed 30 days ago</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-gray-700">
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800">
                        <DialogHeader>
                          <DialogTitle>Change Password</DialogTitle>
                          <DialogDescription>Enter your current password and choose a new one</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" className="bg-black border-gray-700" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" className="bg-black border-gray-700" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" className="bg-black border-gray-700" />
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Update Password</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">
                        {twoFactorEnabled ? "Enabled with authenticator app" : "Add an extra layer of security"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                      {!twoFactorEnabled && (
                        <Button variant="outline" className="border-gray-700">
                          <Smartphone className="h-4 w-4 mr-2" />
                          Setup 2FA
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Login Activity</h4>
                    <div className="space-y-2">
                      {recentLogins.map((login, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-700"
                        >
                          <div>
                            <p className="text-sm font-medium">{login.device}</p>
                            <p className="text-xs text-gray-400">
                              {login.location} • {login.ip}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400">{login.date}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="border-gray-700">
                      Sign Out All Devices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-400" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Campaign Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: "applications", label: "New creator applications" },
                        { key: "milestones", label: "Campaign milestones reached" },
                        { key: "behind", label: "Creator behind schedule" },
                        { key: "completion", label: "Campaign completion" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <span className="text-sm">{item.label}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" defaultChecked />
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" defaultChecked />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h4 className="font-medium mb-4">Financial Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: "payouts", label: "Payout processing updates" },
                        { key: "failed", label: "Failed payments" },
                        { key: "invoices", label: "Invoice generation" },
                        { key: "billing", label: "Billing issues" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <span className="text-sm">{item.label}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" defaultChecked />
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" defaultChecked />
                            </div>
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-gray-400" />
                              <Switch size="sm" defaultChecked />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h4 className="font-medium mb-4">Notification Timing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Quiet Hours</Label>
                        <div className="flex items-center gap-2">
                          <Select defaultValue="22">
                            <SelectTrigger className="bg-black border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i.toString().padStart(2, "0")}:00
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-gray-400">to</span>
                          <Select defaultValue="8">
                            <SelectTrigger className="bg-black border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i.toString().padStart(2, "0")}:00
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Digest Frequency</Label>
                        <Select defaultValue="weekly">
                          <SelectTrigger className="bg-black border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Summary</SelectItem>
                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                            <SelectItem value="monthly">Monthly Summary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm">Weekend notifications</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regional & Localization */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-400" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Configure regional preferences and compliance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="bg-black border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">🇺🇸 USD - US Dollar</SelectItem>
                        <SelectItem value="eur">🇪🇺 EUR - Euro</SelectItem>
                        <SelectItem value="gbp">🇬🇧 GBP - British Pound</SelectItem>
                        <SelectItem value="cad">🇨🇦 CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Preview: $1,234.56</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="bg-black border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Format</Label>
                    <Select defaultValue="12">
                      <SelectTrigger className="bg-black border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12-hour (2:30 PM)</SelectItem>
                        <SelectItem value="24">24-hour (14:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Week Starts On</Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger className="bg-black border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <h4 className="font-medium">Compliance Settings</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">GDPR Compliance</p>
                        <p className="text-sm text-gray-400">European data protection compliance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label>Data Retention Period</Label>
                      <Select defaultValue="90">
                        <SelectTrigger className="bg-black border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Business Tax ID / VAT Number</Label>
                      <Input placeholder="Enter your tax identification number" className="bg-black border-gray-700" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-400" />
                  Data Management
                </CardTitle>
                <CardDescription>Control your data, privacy, and account lifecycle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium">Export All Data</h4>
                      <p className="text-sm text-gray-400">Download a comprehensive export of all your agency data</p>
                    </div>
                    <Button variant="outline" className="border-gray-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium">Agency Profile Visibility</h4>
                      <p className="text-sm text-gray-400">Control how your agency appears to creators</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Alert className="border-red-800 bg-red-900/20">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-400">Danger Zone</p>
                          <p className="text-sm">Permanently delete your agency account and all associated data</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-800">
                            <DialogHeader>
                              <DialogTitle className="text-red-400">Delete Agency Account</DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will permanently delete your agency account and
                                remove all data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Alert className="border-red-800 bg-red-900/20">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  All campaigns, creator data, and financial records will be permanently deleted.
                                </AlertDescription>
                              </Alert>
                              <div className="space-y-2">
                                <Label>Type "DELETE" to confirm</Label>
                                <Input placeholder="DELETE" className="bg-black border-gray-700" />
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  Cancel
                                </Button>
                                <Button variant="destructive" className="flex-1">
                                  Delete Account
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Integration Status Overview */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Integration Health
                </CardTitle>
                <CardDescription>Quick overview of your connected services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrationStatus.map((integration, index) => (
                    <div key={index} className="p-4 bg-black rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{integration.icon}</span>
                          <h4 className="font-medium">{integration.name}</h4>
                        </div>
                        {integration.status === "connected" ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{integration.lastSync}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="border-gray-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage All Integrations
                  </Button>
                  <Button variant="outline" className="border-gray-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Test Connections
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="border-gray-700">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Discard Changes
                </Button>
              </div>
              <p className="text-xs text-gray-400">Changes saved automatically • Last saved 2 minutes ago</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
