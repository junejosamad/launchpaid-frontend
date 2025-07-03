"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New campaign invitation",
      description: "FashionBrand invited you to their new campaign",
      time: "10m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Content approved",
      description: "Your video for TechGadget Pro was approved",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Bonus achieved",
      description: "You've earned a $250 bonus for reaching your GMV target",
      time: "3h ago",
      unread: false,
    },
  ])

  return (
    <header className="h-16 border-b border-gray-800 bg-gray-950 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[240px] pl-9 bg-gray-900 border-gray-800 focus-visible:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-600"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-800 text-white">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-purple-400">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 py-3 px-4 cursor-pointer focus:bg-gray-800 focus:text-white"
              >
                <div
                  className={`h-2 w-2 rounded-full mt-1.5 ${notification.unread ? "bg-purple-600" : "bg-transparent"}`}
                ></div>
                <div>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-gray-400">{notification.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="justify-center focus:bg-gray-800 focus:text-white">
              <Link href="/dashboard/notifications" className="text-sm text-purple-400">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                <span className="font-medium text-sm">AJ</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
            <DropdownMenuLabel>
              <div className="font-medium">Alex Johnson</div>
              <div className="text-xs text-gray-400">alex@example.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
              <Link href="/dashboard/profile" className="flex items-center gap-2 w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
              <Link href="/dashboard/settings" className="flex items-center gap-2 w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
              <Link href="/logout" className="flex items-center gap-2 w-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
