"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bell,
  User,
  Shield,
  Target,
  BarChart3,
  LinkIcon,
  CreditCard,
  Eye,
  Globe,
  Search,
  ChevronRight,
} from "lucide-react"

const settingsCategories = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Select the kinds of notifications you get about your activities, campaigns, and opportunities.",
    href: "/dashboard/settings/notifications",
  },
  {
    icon: User,
    title: "Your account",
    description:
      "See information about your account, download an archive of your data, or learn about account deactivation options.",
    href: "/dashboard/settings/account",
  },
  {
    icon: Shield,
    title: "Security and account access",
    description:
      "Manage your account's security and keep track of your account's usage including apps that you have connected to your account.",
    href: "/dashboard/settings/security",
  },
  {
    icon: Target,
    title: "Campaign preferences",
    description: "Configure your campaign discovery settings, content preferences, and application settings.",
    href: "/dashboard/settings/campaigns",
  },
  {
    icon: BarChart3,
    title: "Performance and analytics",
    description: "Manage how your performance data is displayed and tracked across the platform.",
    href: "/dashboard/settings/analytics",
  },
  {
    icon: LinkIcon,
    title: "Connected accounts",
    description: "Manage your linked TikTok accounts, Discord, and other social platform connections.",
    href: "/dashboard/settings/accounts",
  },
  {
    icon: CreditCard,
    title: "Payment settings",
    description: "Manage your Stripe connection, payout preferences, and financial information.",
    href: "/dashboard/settings/payments",
  },
  {
    icon: Eye,
    title: "Privacy and safety",
    description: "Manage what information you see and share on LaunchPaid.",
    href: "/dashboard/settings/privacy",
  },
  {
    icon: Globe,
    title: "Accessibility, display, and languages",
    description: "Manage how LaunchPaid content is displayed to you.",
    href: "/dashboard/settings/accessibility",
  },
]

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = settingsCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-400">@alexjohnson</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search settings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 focus:border-purple-500 h-12"
              />
            </div>
          </div>

          {/* Settings Categories */}
          <div className="space-y-1">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.title}
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-colors cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <IconComponent className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {category.title}
                          </h3>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mt-1">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No settings found</h3>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 justify-start bg-gray-900 border-gray-800 hover:bg-gray-800">
                <Shield className="h-4 w-4 mr-3" />
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="h-12 justify-start bg-gray-900 border-gray-800 hover:bg-gray-800">
                <LinkIcon className="h-4 w-4 mr-3" />
                Add TikTok Account
              </Button>
              <Button variant="outline" className="h-12 justify-start bg-gray-900 border-gray-800 hover:bg-gray-800">
                <CreditCard className="h-4 w-4 mr-3" />
                Update Payment Method
              </Button>
              <Button variant="outline" className="h-12 justify-start bg-gray-900 border-gray-800 hover:bg-gray-800">
                <BarChart3 className="h-4 w-4 mr-3" />
                Download Data Archive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
