"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Mail, Smartphone, Clock } from "lucide-react"
import Link from "next/link"

export default function NotificationsSettingsPage() {
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [inAppEnabled, setInAppEnabled] = useState(true)
  const [quietHours, setQuietHours] = useState(true)

  const [smsSettings, setSmsSettings] = useState({
    campaignDeadlines: true,
    paymentConfirmations: true,
    newOpportunities: true,
    performanceUpdates: false,
  })

  const [emailSettings, setEmailSettings] = useState({
    weeklySummaries: true,
    campaignAcceptance: true,
    badgeAchievements: true,
    marketingUpdates: false,
  })

  const [inAppSettings, setInAppSettings] = useState({
    campaignUpdates: true,
    systemNotifications: true,
    achievementAlerts: true,
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Settings
            </Link>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-gray-400">Configure your notification preferences</p>
          </div>

          <div className="space-y-6">
            {/* SMS Notifications */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">SMS Notifications</h3>
                    <p className="text-sm text-gray-400 font-normal">Send messages for urgent updates</p>
                  </div>
                  <div className="ml-auto">
                    <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                  </div>
                </CardTitle>
              </CardHeader>
              {smsEnabled && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campaign deadlines</span>
                      <Switch
                        checked={smsSettings.campaignDeadlines}
                        onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, campaignDeadlines: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment confirmations</span>
                      <Switch
                        checked={smsSettings.paymentConfirmations}
                        onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, paymentConfirmations: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New opportunities</span>
                      <Switch
                        checked={smsSettings.newOpportunities}
                        onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, newOpportunities: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Performance updates</span>
                      <Switch
                        checked={smsSettings.performanceUpdates}
                        onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, performanceUpdates: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Email Notifications */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email Notifications</h3>
                    <p className="text-sm text-gray-400 font-normal">Receive updates via email</p>
                  </div>
                  <div className="ml-auto">
                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                  </div>
                </CardTitle>
              </CardHeader>
              {emailEnabled && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly summaries</span>
                      <Switch
                        checked={emailSettings.weeklySummaries}
                        onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, weeklySummaries: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campaign acceptance</span>
                      <Switch
                        checked={emailSettings.campaignAcceptance}
                        onCheckedChange={(checked) =>
                          setEmailSettings({ ...emailSettings, campaignAcceptance: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Badge achievements</span>
                      <Switch
                        checked={emailSettings.badgeAchievements}
                        onCheckedChange={(checked) =>
                          setEmailSettings({ ...emailSettings, badgeAchievements: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing updates</span>
                      <Switch
                        checked={emailSettings.marketingUpdates}
                        onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, marketingUpdates: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* In-App Notifications */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">In-App Notifications</h3>
                    <p className="text-sm text-gray-400 font-normal">Show notifications within the app</p>
                  </div>
                  <div className="ml-auto">
                    <Switch checked={inAppEnabled} onCheckedChange={setInAppEnabled} />
                  </div>
                </CardTitle>
              </CardHeader>
              {inAppEnabled && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">All campaign updates</span>
                      <Switch
                        checked={inAppSettings.campaignUpdates}
                        onCheckedChange={(checked) => setInAppSettings({ ...inAppSettings, campaignUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System notifications</span>
                      <Switch
                        checked={inAppSettings.systemNotifications}
                        onCheckedChange={(checked) =>
                          setInAppSettings({ ...inAppSettings, systemNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Achievement alerts</span>
                      <Switch
                        checked={inAppSettings.achievementAlerts}
                        onCheckedChange={(checked) =>
                          setInAppSettings({ ...inAppSettings, achievementAlerts: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Quiet Hours */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-600/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Quiet Hours</h3>
                    <p className="text-sm text-gray-400 font-normal">No notifications during specified hours</p>
                  </div>
                  <div className="ml-auto">
                    <Switch checked={quietHours} onCheckedChange={setQuietHours} />
                  </div>
                </CardTitle>
              </CardHeader>
              {quietHours && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Start Time</label>
                      <Select defaultValue="22:00">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">End Time</label>
                      <Select defaultValue="08:00">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
