// components/client/navigation/client-sidebar.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Target,
  BarChart3,
  Users,
  Settings,
  LogOut,
  X,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  MessageSquare,
  FileText,
  Zap,
} from "lucide-react"

interface ClientSidebarProps {
  isMobileOpen: boolean
  onMobileClose: () => void
}

const navigation = [
  { name: "Dashboard", href: "/client-dashboard", icon: Home },
  { name: "Campaigns", href: "/client-dashboard/campaigns", icon: Target },
  { name: "Creator Network", href: "/client-dashboard/creators", icon: Users },
  { name: "Analytics", href: "/client-dashboard/analytics", icon: BarChart3 },
  { name: "ROI Tracking", href: "/client-dashboard/roi", icon: TrendingUp },
  { name: "Brand Assets", href: "/client-dashboard/assets", icon: ShoppingBag },
  { name: "Performance", href: "/client-dashboard/performance", icon: Zap },
  { name: "Reports", href: "/client-dashboard/reports", icon: FileText },
]

const secondaryNavigation = [
  { name: "Messages", href: "/client-dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/client-dashboard/settings", icon: Settings },
]

export function ClientSidebar({ isMobileOpen, onMobileClose }: ClientSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="absolute top-0 right-0 -mr-12 pt-2 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose}
            className="text-white hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          {/* Logo and user info */}
          <div className="flex items-center px-6 py-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-600 text-white">
                  B
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold text-white">Brand Hub</h2>
                <p className="text-xs text-gray-400">@brand</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                  onClick={onMobileClose}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}

            {/* Divider */}
            <div className="border-t border-gray-800 my-4" />

            {/* Secondary navigation */}
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                  onClick={onMobileClose}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-gray-800 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
