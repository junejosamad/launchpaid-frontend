"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Award,
  BarChart3,
  Calendar,
  ChevronDown,
  DollarSign,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePathname } from "next/navigation"

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-gray-950 border-r border-gray-800 flex flex-col transition-all duration-300 z-40",
        isCollapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <Link href="/creator-dashboard" className="flex items-center">
          {isCollapsed ? (
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">LP</span>
            </div>
          ) : (
            <Image src="/logo.png" alt="LaunchPAID Logo" width={130} height={30} className="h-8 w-auto" />
          )}
        </Link>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", isCollapsed ? "-rotate-90" : "")} />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <nav className="space-y-1 px-2">
          <Link
            href="/creator-dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/creator-dashboard"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link
            href="/campaigns"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/campaigns"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <BarChart3 className="h-5 w-5" />
            {!isCollapsed && <span>Campaigns</span>}
          </Link>

          <Link
            href="/dashboard/calendar"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/dashboard/calendar"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <Calendar className="h-5 w-5" />
            {!isCollapsed && <span>Calendar</span>}
          </Link>

          <Link
            href="/creator-dashboard/messages"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/creator-dashboard/messages"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <MessageSquare className="h-5 w-5" />
            {!isCollapsed && <span>Messages</span>}
          </Link>

          <Link
            href="/dashboard/profile"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/dashboard/profile"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <User className="h-5 w-5" />
            {!isCollapsed && <span>Profile</span>}
          </Link>

          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <Settings className="h-5 w-5" />
            {!isCollapsed && <span>Settings</span>}
          </Link>

          <Link
            href="/dashboard/rewards"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/dashboard/rewards"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <Award className="h-5 w-5" />
            {!isCollapsed && <span>Rewards & Badges</span>}
          </Link>

          <Link
            href="/dashboard/earnings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/dashboard/earnings"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white",
            )}
          >
            <DollarSign className="h-5 w-5" />
            {!isCollapsed && <span>Earnings</span>}
          </Link>
        </nav>

        {!isCollapsed && (
          <div className="mt-8 px-4">
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Recent Campaigns</div>
            <nav className="space-y-1">
              <Link
                href="/dashboard/campaigns/1"
                className="block px-2 py-1.5 text-sm text-gray-300 hover:text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Summer Fashion Collection
              </Link>
              <Link
                href="/dashboard/campaigns/2"
                className="block px-2 py-1.5 text-sm text-gray-300 hover:text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Tech Gadget Pro Launch
              </Link>
              <Link
                href="/dashboard/campaigns/3"
                className="block px-2 py-1.5 text-sm text-gray-300 hover:text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Beauty Essentials Kit
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
              <User className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        ) : (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Alex Johnson</div>
                  <div className="text-xs text-gray-400">Creator</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-3 pl-12 space-y-1">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 text-sm text-purple-400 font-medium py-1.5"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link href="/logout" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white py-1.5">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}
