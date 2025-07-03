"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronDown, Home, Package, Settings, Users, FileText, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ClientSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/client-dashboard",
      icon: Home,
      current: pathname === "/client-dashboard",
    },
    {
      name: "Campaign Analytics",
      href: "/client-dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/client-dashboard/analytics",
    },
    {
      name: "Creator Management",
      href: "/client-dashboard/creator-management",
      icon: Users,
      current: pathname === "/client-dashboard/creator-management",
    },
    {
      name: "Posts & Content",
      href: "/client-dashboard/posts-content",
      icon: FileText,
      current: pathname === "/client-dashboard/posts-content",
    },
    {
      name: "Shipping Center",
      href: "/client-dashboard/shipping-center",
      icon: Package,
      current: pathname === "/client-dashboard/shipping-center",
    },
    {
      name: "Settings",
      href: "/client-dashboard/settings",
      icon: Settings,
      current: pathname === "/client-dashboard/settings",
    },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-black border-r border-gray-800 flex flex-col transition-all duration-300 z-40",
        isCollapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <Link href="/client-dashboard" className="flex items-center">
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
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  item.current ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {!isCollapsed && (
          <div className="mt-8 px-4">
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Campaign Info</div>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300">
                <span className="text-gray-500">Campaign:</span> Summer Fashion 2024
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">Agency:</span> Creator Circle Agency
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-400 ml-1">Active</span>
              </div>
            </div>
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
                  <div className="font-medium">Sarah Chen</div>
                  <div className="text-xs text-gray-400">Brand Manager</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-3 pl-12 space-y-1">
                <Link
                  href="/client-dashboard/settings"
                  className="flex items-center gap-2 text-sm text-purple-400 font-medium py-1.5"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
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
