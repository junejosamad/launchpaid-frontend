"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  Grid3X3,
  LogOut,
  Megaphone,
  Settings,
  Target,
  User,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/agency-dashboard",
    icon: Grid3X3,
    tooltip: "Main analytics overview",
    active: true,
  },
  {
    name: "Management",
    href: "/agency-dashboard/campaigns",
    icon: Target,
    tooltip: "Campaign creation and management",
    dropdown: [{ name: "Campaigns", href: "/agency-dashboard/campaigns" }],
  },
  {
    name: "Creators",
    href: "/agency-dashboard/creators",
    icon: Users,
    tooltip: "Creator database and management",
    dropdown: [
      { name: "Database", href: "/agency-dashboard/creators/database" },
      { name: "Applications", href: "/agency-dashboard/creators/applications" },
      { name: "Leaderboards", href: "/agency-dashboard/creators/leaderboards" },
    ],
  },
  {
    name: "Analytics",
    href: "/agency-dashboard/analytics",
    icon: BarChart3,
    tooltip: "Performance analytics and reporting",
    active: false, // This will be dynamically set based on current route
  },
  {
    name: "Finance",
    href: "/agency-dashboard/finance",
    icon: DollarSign,
    tooltip: "Payouts and financial management",
    active: false, // This will be dynamically set based on current route
  },
  {
    name: "Marketing",
    href: "/agency-dashboard/marketing",
    icon: Megaphone,
    tooltip: "SMS campaigns and marketing tools",
    dropdown: [
      { name: "SMS Broadcasts", href: "/agency-dashboard/marketing/smsbroadcasts" },
      { name: "Content Review", href: "/agency-dashboard/marketing/contentreview" },
      { name: "Spark Codes", href: "/agency-dashboard/marketing/sparkcodes" },
    ],
  },
  {
    name: "Applications",
    href: "/agency-dashboard/creators/applications",
    icon: FileText,
    tooltip: "Creator application review",
    badge: 12,
  },
  {
    name: "Settings",
    href: "/agency-dashboard/settings",
    icon: Settings,
    tooltip: "Team, integrations, billing",
    dropdown: [
      { name: "General", href: "/agency-dashboard/settings/general" },
      { name: "Team", href: "/agency-dashboard/settings/team" },
      { name: "Integrations", href: "/agency-dashboard/settings/integrations" },
      { name: "Billing", href: "/agency-dashboard/settings/billing" },
      { name: "Setup", href: "/agency-dashboard/settings/setup" },
    ],
  },
]

// In a real app, you'd get this from usePathname() from next/navigation
const currentPath = "/agency-dashboard/settings/setup" // This would be dynamic

// Update navigation items with active states
const updatedNavigationItems = navigationItems.map((item) => {
  if (item.dropdown) {
    const isAnyDropdownActive = item.dropdown.some((dropdownItem) => currentPath === dropdownItem.href)
    return {
      ...item,
      active: isAnyDropdownActive || currentPath === item.href,
    }
  }
  return {
    ...item,
    active: currentPath === item.href,
  }
})

interface AgencySidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function AgencySidebar({ isMobileOpen = false, onMobileClose }: AgencySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    // Close all dropdowns when collapsing
    if (!isCollapsed) {
      setOpenDropdowns([])
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileClose} />}

      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-black border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-50",
          // Desktop behavior
          "hidden lg:flex",
          isCollapsed ? "lg:w-16" : "lg:w-60",
          // Mobile behavior
          "lg:translate-x-0",
          isMobileOpen ? "flex w-60 translate-x-0" : "lg:flex -translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed ? (
            <Link href="/agency-dashboard" className="flex items-center">
              <Image src="/logo.png" alt="LaunchPAID" width={120} height={28} className="h-7 w-auto" />
            </Link>
          ) : (
            <div className="flex justify-center w-full">
              <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <span className="font-bold text-sm text-white">LP</span>
              </div>
            </div>
          )}

          {/* Desktop toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-800 hidden lg:flex"
            onClick={handleToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            )}
          </Button>

          {/* Mobile close */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-800 lg:hidden" onClick={onMobileClose}>
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <nav className="space-y-1 px-2">
            {updatedNavigationItems.map((item) => {
              const Icon = item.icon
              const hasDropdown = item.dropdown && item.dropdown.length > 0
              const isDropdownOpen = openDropdowns.includes(item.name)

              if (isCollapsed) {
                const navItem = (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition-colors relative mx-auto",
                      item.active
                        ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs h-4 w-4 rounded-full p-0 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )

                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <div key={item.name}>
                  {hasDropdown ? (
                    <Collapsible open={isDropdownOpen} onOpenChange={() => toggleDropdown(item.name)}>
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full",
                            item.active
                              ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="truncate flex-1 text-left">{item.name}</span>
                          {item.badge && (
                            <Badge className="bg-red-600 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-8 mt-1 space-y-1">
                          {item.dropdown?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                              onClick={onMobileClose}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                        item.active
                          ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      )}
                      onClick={onMobileClose}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-red-600 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-800 p-4">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-gray-800">
                      <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-purple-400" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <div className="font-medium">Creator Circle</div>
                        <div className="text-xs text-gray-400">Agency</div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Building2 className="h-4 w-4 mr-2" />
                      Team Management
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">Creator Circle - Agency</TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">Creator Circle</div>
                    <div className="text-xs text-gray-400">Agency</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuLabel>Agency Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="h-4 w-4 mr-2" />
                  Team Management
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
