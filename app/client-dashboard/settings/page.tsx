"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  Download,
  Shield,
  Bell,
  Users,
  CreditCard,
  SettingsIcon,
  Check,
  X,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  FileText,
  BarChart3,
  Package,
} from "lucide-react"

export default function ClientSettings() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState("2 minutes ago")

  const handleSave = () => {
    setHasUnsavedChanges(false)
    setLastSaved("Just now")
  }

  const handleDiscard = () => {
    setHasUnsavedChanges(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />
      
      <div className="ml-[250px] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Settings</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and campaign settings</p>
        </div>

        {/* Save Actions Bar */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg z-50">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">You have unsaved changes</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDiscard}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="account" className="data-[state=active]:bg-purple-600">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="campaign" className="data-[state=active]:bg-purple-600">
              Campaign
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="agency" className="data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Agency
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-purple-600">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Account Information Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your brand profile and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Brand Profile */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Brand Profile</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brandName">Brand Name</Label>
                      <Input 
                        id="brandName" 
                        defaultValue="StyleForward Brand"
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                      <p className="text-xs text-gray-400">This appears on all communications with creators</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry Category</Label>
                      <Select onValueChange={() => setHasUnsavedChanges(true)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Fashion" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="beauty">Beauty</SelectItem>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="health">Health & Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Helps agencies find better creator matches</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Logo</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback>SF</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Logo
                        </Button>
                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB, recommended 400x400px</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Brand Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Brief description of your brand for creator context"
                      className="bg-gray-800 border-gray-600 min-h-[100px]"
                      maxLength={500}
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                    <p className="text-xs text-gray-400">0/500 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="website" 
                        type="url"
                        defaultValue="https://styleforward.com"
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Primary Contact Name</Label>
                      <Input 
                        id="contactName" 
                        defaultValue="Sarah Chen"
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="email" 
                          type="email"
                          defaultValue="sarah@styleforward.com"
                          className="bg-gray-800 border-gray-600"
                          onChange={() => setHasUnsavedChanges(true)}
                        />
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="w-20 bg-gray-800 border-gray-600">
                            <SelectValue placeholder="+1" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                            <SelectItem value="+33">+33</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          id="phone" 
                          placeholder="(555) 123-4567"
                          className="bg-gray-800 border-gray-600"
                          onChange={() => setHasUnsavedChanges(true)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select onValueChange={() => setHasUnsavedChanges(true)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Pacific Time (PT)" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                          <SelectItem value="mt">Mountain Time (MT)</SelectItem>
                          <SelectItem value="ct">Central Time (CT)</SelectItem>
                          <SelectItem value="et">Eastern Time (ET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea 
                      id="address"
                      placeholder="123 Fashion Street, Los Angeles, CA 90210"
                      className="bg-gray-800 border-gray-600"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Preferences Tab */}
          <TabsContent value="campaign" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Campaign Preferences</CardTitle>
                <CardDescription>Configure your campaign management preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Creator Approval Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Creator Approval Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable smart auto-approval for returning creators</Label>
                        <p className="text-sm text-gray-400">Automatically approve creators who have performed well in previous campaigns</p>
                      </div>
                      <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Minimum creator score threshold</Label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="1" 
                          max="100" 
                          defaultValue="75"
                          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          onChange={() => setHasUnsavedChanges(true)}
                        />
                        <span className="text-sm font-medium w-12">75</span>
                      </div>
                      <p className="text-xs text-gray-400">Only creators with scores above this threshold will be auto-approved</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="autoApprovalLimit">Auto-approval spending limits</Label>
                      <Input 
                        id="autoApprovalLimit" 
                        type="number"
                        placeholder="1000"
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                      <p className="text-xs text-gray-400">Maximum amount that can be auto-approved per creator</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Approval Workflow */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Approval Workflow</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email notifications for new creator applications</Label>
                        <p className="text-sm text-gray-400">Get notified when new creators apply to your campaign</p>
                      </div>
                      <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS alerts for urgent approvals (&gt;3 days)</Label>
                        <p className="text-sm text-gray-400">Receive SMS when creator applications are pending for more than 3 days</p>
                      </div>
                      <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Daily approval summary emails</Label>
                        <p className="text-sm text-gray-400">Daily digest of pending approvals and recent activity</p>
                      </div>
                      <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Content Guidelines */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Content Guidelines</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Brand Guidelines Upload</Label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 p-4 border-2 border-dashed border-gray-600 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-600/20 rounded">
                              <Download className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium">Brand_Guidelines_v2.pdf</p>
                              <p className="text-sm text-gray-400">Updated 2 weeks ago</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Update Guidelines
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require client approval for all content</Label>
                          <p className="text-sm text-gray-400">All creator content must be approved before posting</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto-approve content from top performers</Label>
                          <p className="text-sm text-gray-400">Skip approval for creators with high performance scores</p>
                        </div>
                        <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Flag content with potential issues</Label>
                          <p className="text-sm text-gray-400">AI-powered content review for brand safety</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Shipping Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Shipping Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Default Shipping Method</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="standard" name="shipping" className="text-purple-600" defaultChecked />
                          <Label htmlFor="standard" className="flex-1">
                            <div className="flex justify-between">
                              <span>Standard Ground</span>
                              <span className="text-gray-400">$8.99 (5-7 days)</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="express" name="shipping" className="text-purple-600" />
                          <Label htmlFor="express" className="flex-1">
                            <div className="flex justify-between">
                              <span>Express</span>
                              <span className="text-gray-400">$15.99 (2-3 days)</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="priority" name="shipping" className="text-purple-600" />
                          <Label htmlFor="priority" className="flex-1">
                            <div className="flex justify-between">
                              <span>Priority</span>
                              <span className="text-gray-400">$24.99 (1-2 days)</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingAddress">Primary Shipping Address</Label>
                      <Textarea 
                        id="shippingAddress"
                        defaultValue="StyleForward Warehouse&#10;1234 Distribution Blvd&#10;Los Angeles, CA 90210"
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Additional Shipping Location
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="packagingInstructions">Custom Packaging Instructions</Label>
                      <Textarea 
                        id="packagingInstructions"
                        placeholder="Special packaging requirements or instructions..."
                        className="bg-gray-800 border-gray-600"
                        onChange={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Include brand materials</Label>
                        <p className="text-sm text-gray-400">Include branded packaging and promotional materials</p>
                      </div>
                      <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control how and when you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Categories */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Campaign Updates</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>New creator applications</Label>
                          <p className="text-sm text-gray-400">When creators apply to join your campaign</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Campaign milestones reached</Label>
                          <p className="text-sm text-gray-400">When your campaign hits important milestones</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Performance alerts (goals at risk)</Label>
                          <p className="text-sm text-gray-400">When campaign performance is below targets</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Weekly performance summaries</Label>
                          <p className="text-sm text-gray-400">Weekly digest of campaign performance</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Creator Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Creator approval pending</Label>
                          <p className="text-sm text-gray-400">When creators are waiting for approval</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Creator performance issues</Label>
                          <p className="text-sm text-gray-400">When creators are underperforming</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Content submissions for review</Label>
                          <p className="text-sm text-gray-400">When creators submit content for approval</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Shipping & Logistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Samples ready to ship</Label>
                          <p className="text-sm text-gray-400">When samples are prepared for shipping</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Shipping delays or issues</Label>
                          <p className="text-sm text-gray-400">When there are problems with shipments</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Overdue shipping alerts (&gt;3 days)</Label>
                          <p className="text-sm text-gray-400">When shipments are delayed beyond 3 days</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Financial & Reporting</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Campaign budget alerts</Label>
                          <p className="text-sm text-gray-400">When approaching budget limits</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>Monthly campaign reports</Label>
                          <p className="text-sm text-gray-400">Monthly performance and analytics reports</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label>ROI milestone achievements</Label>
                          <p className="text-sm text-gray-400">When ROI targets are reached</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch size="sm" />
                            <span className="text-xs">SMS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked size="sm" />
                            <span className="text-xs">In-app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Notification Timing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notification Timing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Quiet Hours</Label>
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600">
                            <SelectValue placeholder="10:00 PM" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                            <SelectItem value="00:00">12:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="flex items-center text-gray-400">to</span>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600">
                            <SelectValue placeholder="8:00 AM" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-gray-400">No notifications during these hours</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Digest Frequency</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Daily" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">How often to group notifications</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekend Notifications</Label>
                      <p className="text-sm text-gray-400">Disable non-urgent notifications on weekends</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>Protect your account and manage data privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <Label>Password</Label>
                        <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-600/20 text-red-400">
                          <X className="h-3 w-3 mr-1" />
                          Disabled
                        </Badge>
                        <Button variant="outline">Setup 2FA</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Login Activity */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Login Activity</h3>
                    <Button variant="outline" size="sm">Sign out all devices</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600/20 rounded">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium">Chrome on MacOS</p>
                          <p className="text-sm text-gray-400">Los Angeles, CA • Current session</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">Now</span>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-600/20 rounded">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-sm text-gray-400">Los Angeles, CA • 192.168.1.100</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">2 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-600/20 rounded">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-gray-400">New York, NY • 203.0.113.1</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">1 day ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login notifications</Label>
                      <p className="text-sm text-gray-400">Get notified of new login attempts</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Privacy Controls */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Privacy Controls</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Data Sharing</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Share performance data with agency</Label>
                            <p className="text-sm text-gray-400">Allow your agency to access detailed campaign analytics</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow agency to showcase campaign results</Label>
                            <p className="text-sm text-gray-400">Let your agency use anonymized results in their marketing</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Include brand in LaunchPaid case studies</Label>
                            <p className="text-sm text-gray-400">Feature your campaign in LaunchPaid success stories</p>
                          </div>
                          <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Creator Communication</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow direct creator contact</Label>
                            <p className="text-sm text-gray-400">Let creators contact you directly through the platform</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Share contact information with approved creators</Label>
                            <p className="text-sm text-gray-400">Provide your contact details to creators you approve</p>
                          </div>
                          <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Include brand details in creator communications</Label>
                            <p className="text-sm text-gray-400">Share brand information in automated messages</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Data Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Data Export</h4>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div>
                          <Label>Export All Data</Label>
                          <p className="text-sm text-gray-400">Download a complete copy of your campaign data</p>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Recent Exports</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium">Campaign_Data_2024-01-15.zip</p>
                              <p className="text-sm text-gray-400">Exported 2 weeks ago</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Data Retention</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Campaign Data</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="2 years" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="1year">1 year</SelectItem>
                              <SelectItem value="2years">2 years</SelectItem>
                              <SelectItem value="indefinite">Indefinite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Creator Data</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="1 year" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="1year">1 year</SelectItem>
                              <SelectItem value="2years">2 years</SelectItem>
                              <SelectItem value="indefinite">Indefinite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Content Data</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="2 years" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="1year">1 year</SelectItem>
                              <SelectItem value="2years">2 years</SelectItem>
                              <SelectItem value="indefinite">Indefinite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agency Partnership Tab */}
          <TabsContent value="agency" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Agency Partnership</CardTitle>
                <CardDescription>Manage your relationship with Creator Circle Agency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agency Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Agency Information</h3>
                  
                  <div className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>CC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xl font-semibold">Creator Circle Agency</h4>
                        <p className="text-gray-400">Partnership since January 2024</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Primary Contact</Label>
                        <p className="font-medium">John Smith, Account Manager</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Email</Label>
                        <p className="font-medium">john@creatorcircle.com</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Phone</Label>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Partnership Status</Label>
                        <Badge className="bg-green-600/20 text-green-400">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Partnership Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Partnership Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Communication Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Preferred Contact Method</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Email" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="inapp">In-app messaging</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Meeting Frequency</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Weekly" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="biweekly">Bi-weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Reporting Schedule</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Weekly" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Agency Permissions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow agency to approve creators on your behalf</Label>
                            <p className="text-sm text-gray-400">Agency can approve creators based on your criteria</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Enable agency to make campaign adjustments</Label>
                            <p className="text-sm text-gray-400">Allow minor campaign modifications without approval</p>
                          </div>
                          <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Grant access to detailed performance analytics</Label>
                            <p className="text-sm text-gray-400">Share comprehensive campaign performance data</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow agency to communicate directly with creators</Label>
                            <p className="text-sm text-gray-400">Agency can message creators on your behalf</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Collaboration Tools */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Collaboration Tools</h3>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Contact Agency
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Shared Documents</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600/20 rounded">
                              <FileText className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium">Campaign Brief - Summer Fashion 2024</p>
                              <p className="text-sm text-gray-400">Updated 3 days ago</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600/20 rounded">
                              <BarChart3 className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium">Weekly Performance Report</p>
                              <p className="text-sm text-gray-400">Updated 1 day ago</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600/20 rounded">
                              <Users className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium">Creator Database Access</p>
                              <p className="text-sm text-gray-400">Shared creator profiles and analytics</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Request Access
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Communication History</h4>
                      <div className="space-y-2">
                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Weekly Check-in Meeting</p>
                            <span className="text-sm text-gray-400">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-400">Discussed campaign performance and upcoming creator approvals. Next meeting scheduled for Friday.</p>
                        </div>

                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Campaign Strategy Update</p>
                            <span className="text-sm text-gray-400">1 week ago</span>
                          </div>
                          <p className="text-sm text-gray-400">Reviewed Q1 performance metrics and adjusted targeting strategy for improved ROI. Campaign budget increased by 15%.</p>
                        </div>

                        <div className="p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Creator Onboarding Process</p>
                            <span className="text-sm text-gray-400">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-gray-400">Streamlined creator approval workflow and updated brand guidelines. Reduced approval time from 48 to 24 hours.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage billing through your agency partner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Plan</h3>
                  
                  <div className="p-4 border border-gray-700 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Plan Type</Label>
                        <p className="font-medium text-lg">Agency Managed</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Billing Contact</Label>
                        <p className="font-medium">Creator Circle Agency</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Your Investment</Label>
                        <p className="font-medium text-lg">$5,000/month campaign budget</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Payment Method</Label>
                        <p className="font-medium">Managed by agency</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Usage Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Usage Overview</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <Label className="text-gray-400">Campaign Duration</Label>
                      <p className="text-2xl font-bold">3 months</p>
                      <p className="text-sm text-gray-400">active</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <Label className="text-gray-400">Creators Approved</Label>
                      <p className="text-2xl font-bold">17</p>
                      <p className="text-sm text-gray-400">creators</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <Label className="text-gray-400">Content Generated</Label>
                      <p className="text-2xl font-bold">145</p>
                      <p className="text-sm text-gray-400">posts</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <Label className="text-gray-400">GMV Tracked</Label>
                      <p className="text-2xl font-bold">$45,230</p>
                      <p className="text-sm text-gray-400">revenue</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Billing History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing History</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">March 2024</p>
                        <p className="text-sm text-gray-400">Campaign budget payment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$5,000</p>
                        <Badge className="bg-yellow-600/20 text-yellow-400">Current</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">February 2024</p>
                        <p className="text-sm text-gray-400">Campaign budget payment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$5,000</p>
                        <Badge className="bg-green-600/20 text-green-400">
                          <Check className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">January 2024</p>
                        <p className="text-sm text-gray-400">Campaign budget payment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$5,000</p>
                        <Badge className="bg-green-600/20 text-green-400">
                          <Check className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Campaign Access Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Campaign Access Management</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Current Campaign Access</h4>
                      <p className="text-purple-400 font-medium mb-4">Summer Fashion 2024 - Your primary campaign</p>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium">Team Members with Access</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>SC</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Sarah Chen</p>
                                <p className="text-sm text-gray-400">Brand Manager</p>
                              </div>
                            </div>
                            <Badge className="bg-purple-600/20 text-purple-400">Full Access</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>MJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Mike Johnson</p>
                                <p className="text-sm text-gray-400">Marketing Director</p>
                              </div>
                            </div>
                            <Badge variant="secondary">View Only</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>LW</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Lisa Wang</p>
                                <p className="text-sm text-gray-400">Product Manager</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Creator Approval Only</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Invite Team Members</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="inviteEmail">Email Address</Label>
                          <Input 
                            id="inviteEmail" 
                            type="email"
                            placeholder="colleague@company.com"
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Role Selection</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="full">Full Access</SelectItem>
                              <SelectItem value="view">View Only</SelectItem>
                              <SelectItem value="approval">Creator Approval</SelectItem>
                              <SelectItem value="shipping">Shipping Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Access Duration</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Permanent" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="permanent">Permanent</SelectItem>
                              <SelectItem value="30days">30 days</SelectItem>
                              <SelectItem value="60days">60 days</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Send Invitation
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Role Definitions</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Full Access:</span>
                          <span className="text-gray-400">All campaign management features</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">View Only:</span>
                          <span className="text-gray-400">Analytics and reporting access only</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Creator Approval:</span>
                          <span className="text-gray-400">Creator review and approval only</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Shipping Only:</span>
                          <span className="text-gray-400">Sample shipping management only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Integration & API */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Integrations</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Analytics & Reporting</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-600/20 rounded">
                              <BarChart3 className="h-4 w-4 text-orange-400" />
                            </div>
                            <div>
                              <p className="font-medium">Google Analytics</p>
                              <p className="text-sm text-gray-400">Track campaign traffic and conversions</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600/20 rounded">
                              <BarChart3 className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">Facebook Pixel</p>
                              <p className="text-sm text-gray-400">Track social media conversions</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600/20 text-green-400">
                              <Check className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">E-commerce Platforms</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-600/20 rounded">
                              <Package className="h-4 w-4 text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">Shopify Connection</p>
                              <p className="text-sm text-gray-400">StyleForward Store - Track sales and inventory</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600/20 text-green-400">
                              <Check className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Communication Tools</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600/20 rounded">
                              <Bell className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium">Slack Integration</p>
                              <p className="text-sm text-gray-400">Receive campaign notifications in Slack</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-600/20 rounded">
                              <Bell className="h-4 w-4 text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium">Email Marketing</p>
                              <p className="text-sm text-gray-400">Sync with Mailchimp or Klaviyo</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Auto-save indicator */}
        <div className="fixed bottom-6 left-6 text-sm text-gray-400">
          <span>Changes saved automatically • Last saved {lastSaved}</span>
        </div>
      </div>
    </div>
  )\
}
