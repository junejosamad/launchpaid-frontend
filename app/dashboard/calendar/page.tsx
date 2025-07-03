"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CampaignDetailsModal } from "@/components/campaign-details-modal"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Upload,
  Smartphone,
  Zap,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarDeliverable {
  id: string
  date: string
  campaign: string
  deliverableType: string
  requirements: string
  deadline: string
  timeRemaining: string
  status: "overdue" | "due-today" | "due-tomorrow" | "due-this-week" | "due-next-week" | "completed"
  gracePeriod?: {
    originalDeadline: string
    graceUntil: string
  }
  smsReminderSent?: boolean
  campaignData?: any
}

const sampleDeliverables: CalendarDeliverable[] = [
  {
    id: "1",
    date: "2025-06-21", // 2 days ago - overdue
    campaign: "Summer Fashion Collection",
    deliverableType: "Product Review Video",
    requirements: "Use #SummerStyle, showcase 3 outfits",
    deadline: "June 21, 2025",
    timeRemaining: "2 days overdue",
    status: "overdue",
    gracePeriod: {
      originalDeadline: "June 21, 2025",
      graceUntil: "June 24, 2025",
    },
    smsReminderSent: true,
  },
  {
    id: "2",
    date: "2025-06-23", // Today
    campaign: "Tech Gadget Pro Launch",
    deliverableType: "Unboxing Video",
    requirements: "Launch our revolutionary new tech gadget",
    deadline: "June 23, 2025",
    timeRemaining: "Due today",
    status: "due-today",
    smsReminderSent: true,
  },
  {
    id: "3",
    date: "2025-06-24", // Tomorrow
    campaign: "Beauty Essentials Kit",
    deliverableType: "Tutorial Video",
    requirements: "Feature our complete beauty essentials kit with tutorials",
    deadline: "June 24, 2025",
    timeRemaining: "Due tomorrow",
    status: "due-tomorrow",
    smsReminderSent: false,
  },
  {
    id: "4",
    date: "2025-06-26", // In 3 days
    campaign: "Home Decor Makeover",
    deliverableType: "Makeover Post",
    requirements: "Transform spaces with our premium home decor collection",
    deadline: "June 26, 2025",
    timeRemaining: "3 days left",
    status: "due-this-week",
  },
  {
    id: "5",
    date: "2025-06-30", // Next week
    campaign: "Fitness Challenge Series",
    deliverableType: "Workout Video",
    requirements: "Join our 30-day fitness challenge and inspire your audience",
    deadline: "June 30, 2025",
    timeRemaining: "7 days left",
    status: "due-next-week",
  },
  {
    id: "6",
    date: "2025-06-20", // Completed
    campaign: "Goli Partner Program",
    deliverableType: "Review Post",
    requirements: "Promote our premium apple cider vinegar gummies",
    deadline: "June 20, 2025",
    timeRemaining: "Completed",
    status: "completed",
  },
  {
    id: "7",
    date: "2025-06-19", // Completed
    campaign: "Tech Gadget Pro Launch",
    deliverableType: "First Impression Video",
    requirements: "Initial unboxing and first impressions",
    deadline: "June 19, 2025",
    timeRemaining: "Completed",
    status: "completed",
  },
]

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 23)) // June 23, 2025
  const [viewMode, setViewMode] = useState<"month" | "week" | "agenda">("month")
  const [selectedDeliverable, setSelectedDeliverable] = useState<CalendarDeliverable | null>(null)

  const today = new Date(2025, 5, 23) // June 23, 2025 for demo

  const getStatusConfig = (status: CalendarDeliverable["status"]) => {
    switch (status) {
      case "overdue":
        return {
          color: "bg-red-500",
          textColor: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          icon: <AlertCircle className="h-3 w-3" />,
          badge: "OVERDUE",
        }
      case "due-today":
        return {
          color: "bg-orange-500",
          textColor: "text-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30",
          icon: <Clock className="h-3 w-3" />,
          badge: "DUE TODAY",
        }
      case "due-tomorrow":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          icon: <Clock className="h-3 w-3" />,
          badge: "DUE TOMORROW",
        }
      case "due-this-week":
        return {
          color: "bg-blue-500",
          textColor: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30",
          icon: <Target className="h-3 w-3" />,
          badge: "THIS WEEK",
        }
      case "due-next-week":
        return {
          color: "bg-purple-500",
          textColor: "text-purple-500",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/30",
          icon: <Target className="h-3 w-3" />,
          badge: "NEXT WEEK",
        }
      case "completed":
        return {
          color: "bg-green-500",
          textColor: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          icon: <CheckCircle className="h-3 w-3" />,
          badge: "COMPLETED",
        }
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-500",
          bgColor: "bg-gray-500/10",
          borderColor: "border-gray-500/30",
          icon: <Clock className="h-3 w-3" />,
          badge: "PENDING",
        }
    }
  }

  const getDeliverablesForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return sampleDeliverables.filter((deliverable) => deliverable.date === dateString)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date(today))
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === today.toDateString()
  }

  const handleDeliverableClick = (deliverable: CalendarDeliverable) => {
    // Mock campaign data for the modal
    const mockCampaign = {
      id: deliverable.id,
      title: deliverable.campaign,
      brand: deliverable.campaign.includes("Fashion")
        ? "FashionBrand"
        : deliverable.campaign.includes("Tech")
          ? "TechCorp"
          : deliverable.campaign.includes("Beauty")
            ? "BeautyBrand"
            : deliverable.campaign.includes("Home")
              ? "HomeStyle"
              : deliverable.campaign.includes("Fitness")
                ? "FitLife"
                : "Goli",
      logo: "/placeholder.svg?height=40&width=40",
      status: deliverable.status === "completed" ? ("completed" as const) : ("active" as const),
      duration: "June 15 - July 15, 2025",
      description: `Campaign for ${deliverable.campaign} featuring ${deliverable.deliverableType}`,
      requirements: deliverable.requirements,
      payout: "$100 per post + performance bonuses",
      gmvTarget: 5000,
      currentGmv: deliverable.status === "completed" ? 5200 : 850,
      totalDeliverables: 5,
      completedDeliverables: deliverable.status === "completed" ? 5 : 2,
      daysLeft: deliverable.status === "completed" ? 0 : 13,
    }
    setSelectedDeliverable(deliverable)
  }

  const getUpcomingStats = () => {
    const upcoming = sampleDeliverables.filter((d) => d.status !== "completed")
    const completed = sampleDeliverables.filter((d) => d.status === "completed")

    return {
      dueToday: upcoming.filter((d) => d.status === "due-today").length,
      dueTomorrow: upcoming.filter((d) => d.status === "due-tomorrow").length,
      dueThisWeek: upcoming.filter((d) => d.status === "due-this-week").length,
      overdue: upcoming.filter((d) => d.status === "overdue").length,
      completedThisMonth: completed.length,
      totalUpcoming: upcoming.length,
      completionRate: Math.round((completed.length / sampleDeliverables.length) * 100),
    }
  }

  const stats = getUpcomingStats()

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate)

    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-gray-800">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-400 bg-gray-800">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => {
            const deliverables = date ? getDeliverablesForDate(date) : []
            const isCurrentDay = isToday(date)
            const isWeekend = date && (date.getDay() === 0 || date.getDay() === 6)

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[120px] p-2 border-r border-b border-gray-800",
                  !date && "bg-gray-950",
                  date && !isCurrentDay && !isWeekend && "bg-gray-900",
                  date && !isCurrentDay && isWeekend && "bg-gray-900/50",
                  isCurrentDay && "bg-purple-900/20 border-purple-500",
                )}
              >
                {date && (
                  <>
                    <div
                      className={cn(
                        "text-sm font-medium mb-2 flex items-center justify-between",
                        isCurrentDay ? "text-purple-400" : "text-white",
                      )}
                    >
                      <span>{date.getDate()}</span>
                      {deliverables.some((d) => d.smsReminderSent) && <Smartphone className="h-3 w-3 text-blue-400" />}
                    </div>
                    <div className="space-y-1">
                      {deliverables.slice(0, 2).map((deliverable) => {
                        const config = getStatusConfig(deliverable.status)
                        return (
                          <div
                            key={deliverable.id}
                            onClick={() => handleDeliverableClick(deliverable)}
                            className={cn(
                              "text-xs p-1.5 rounded cursor-pointer hover:opacity-80 transition-all border",
                              config.bgColor,
                              config.borderColor,
                              config.textColor,
                            )}
                          >
                            <div className="font-medium truncate flex items-center gap-1">
                              {config.icon}
                              {deliverable.campaign}
                            </div>
                            <div className="truncate opacity-90">{deliverable.deliverableType}</div>
                            {deliverable.gracePeriod && deliverable.status === "overdue" && (
                              <div className="text-amber-400 text-[10px]">
                                Grace until {deliverable.gracePeriod.graceUntil}
                              </div>
                            )}
                          </div>
                        )
                      })}
                      {deliverables.length > 2 && (
                        <div className="text-xs text-gray-400 p-1 text-center">+{deliverables.length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderAgendaView = () => {
    const groupedDeliverables = {
      Overdue: sampleDeliverables.filter((d) => d.status === "overdue"),
      "Due Today": sampleDeliverables.filter((d) => d.status === "due-today"),
      "Due Tomorrow": sampleDeliverables.filter((d) => d.status === "due-tomorrow"),
      "Due This Week": sampleDeliverables.filter((d) => d.status === "due-this-week"),
      "Due Next Week": sampleDeliverables.filter((d) => d.status === "due-next-week"),
      Completed: sampleDeliverables.filter((d) => d.status === "completed"),
    }

    return (
      <div className="space-y-6">
        {Object.entries(groupedDeliverables).map(
          ([title, deliverables]) =>
            deliverables.length > 0 && (
              <div key={title}>
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                  {title}
                  <Badge
                    className={cn(
                      "text-xs",
                      title === "Overdue" && "bg-red-600",
                      title === "Due Today" && "bg-orange-600",
                      title === "Due Tomorrow" && "bg-yellow-600",
                      title === "Due This Week" && "bg-blue-600",
                      title === "Due Next Week" && "bg-purple-600",
                      title === "Completed" && "bg-green-600",
                    )}
                  >
                    {deliverables.length}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {deliverables.map((deliverable) => {
                    const config = getStatusConfig(deliverable.status)
                    return (
                      <Card
                        key={deliverable.id}
                        className={cn(
                          "cursor-pointer hover:border-purple-500/50 transition-colors border",
                          config.bgColor,
                          config.borderColor,
                        )}
                        onClick={() => handleDeliverableClick(deliverable)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={cn("mt-1", config.textColor)}>{config.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-medium text-white">{deliverable.campaign}</h4>
                                  <p className="text-sm text-gray-400">{deliverable.deliverableType}</p>
                                </div>
                                <div className="text-right">
                                  <Badge className={cn("text-xs", config.color.replace("bg-", "bg-"))}>
                                    {config.badge}
                                  </Badge>
                                  {deliverable.smsReminderSent && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Smartphone className="h-3 w-3 text-blue-400" />
                                      <span className="text-xs text-blue-400">SMS sent</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 mb-2">{deliverable.requirements}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Due: {deliverable.deadline}</span>
                                <span className={cn("text-xs font-medium", config.textColor)}>
                                  {deliverable.timeRemaining}
                                </span>
                              </div>
                              {deliverable.gracePeriod && deliverable.status === "overdue" && (
                                <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded text-xs">
                                  <div className="text-amber-400">
                                    <strong>Grace Period:</strong> Original deadline{" "}
                                    {deliverable.gracePeriod.originalDeadline}, extended until{" "}
                                    {deliverable.gracePeriod.graceUntil}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ),
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />

      <div className="ml-[250px] min-h-screen">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-gray-400 text-lg">Track your deliverables and deadlines</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Calendar */}
            <div className="lg:col-span-3">
              {/* Calendar Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="h-8 w-8 p-0">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold min-w-[200px] text-center">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToToday}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Today
                  </Button>
                </div>

                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger value="month" className="data-[state=active]:bg-purple-600">
                      Month
                    </TabsTrigger>
                    <TabsTrigger value="agenda" className="data-[state=active]:bg-purple-600">
                      Agenda
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Calendar Content */}
              {viewMode === "month" ? renderMonthView() : renderAgendaView()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Due today:</span>
                    <span className="font-medium text-orange-400">{stats.dueToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Due tomorrow:</span>
                    <span className="font-medium text-yellow-400">{stats.dueTomorrow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This week:</span>
                    <span className="font-medium text-blue-400">{stats.dueThisWeek}</span>
                  </div>
                  {stats.overdue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Overdue:</span>
                      <span className="font-medium text-red-400">{stats.overdue}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completed:</span>
                    <span className="font-medium text-green-400">{stats.completedThisMonth}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Completion rate:</span>
                    <span className="font-medium">{stats.completionRate}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deliverables */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-purple-400" />
                    Urgent
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sampleDeliverables
                    .filter((d) => ["overdue", "due-today", "due-tomorrow"].includes(d.status))
                    .slice(0, 3)
                    .map((deliverable) => {
                      const config = getStatusConfig(deliverable.status)
                      return (
                        <div
                          key={deliverable.id}
                          onClick={() => handleDeliverableClick(deliverable)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:opacity-80 transition-colors",
                            config.bgColor,
                            config.borderColor,
                          )}
                        >
                          <div className={config.textColor}>{config.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{deliverable.campaign}</div>
                            <div className="text-xs text-gray-400 truncate">{deliverable.deliverableType}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={cn("text-xs", config.color.replace("bg-", "bg-"))}>{config.badge}</Badge>
                            {deliverable.smsReminderSent && <Smartphone className="h-3 w-3 text-blue-400" />}
                          </div>
                        </div>
                      )
                    })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Content
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800">
                    View All Campaigns
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Badges
                  </Button>
                </CardContent>
              </Card>

              {/* Status Legend */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-sm">Status Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span>Overdue</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Due Today</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-yellow-500"></div>
                    <span>Due Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span>Due This Week</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-purple-500"></div>
                    <span>Due Next Week</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs pt-2 border-t border-gray-700">
                    <Smartphone className="h-3 w-3 text-blue-400" />
                    <span>SMS Reminder Sent</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Campaign Details Modal */}
      {selectedDeliverable && (
        <CampaignDetailsModal
          isOpen={!!selectedDeliverable}
          onClose={() => setSelectedDeliverable(null)}
          campaign={{
            id: selectedDeliverable.id,
            title: selectedDeliverable.campaign,
            brand: selectedDeliverable.campaign.includes("Fashion")
              ? "FashionBrand"
              : selectedDeliverable.campaign.includes("Tech")
                ? "TechCorp"
                : selectedDeliverable.campaign.includes("Beauty")
                  ? "BeautyBrand"
                  : selectedDeliverable.campaign.includes("Home")
                    ? "HomeStyle"
                    : selectedDeliverable.campaign.includes("Fitness")
                      ? "FitLife"
                      : "Goli",
            logo: "/placeholder.svg?height=40&width=40",
            status: selectedDeliverable.status === "completed" ? ("completed" as const) : ("active" as const),
            duration: "June 15 - July 15, 2025",
            description: `Campaign for ${selectedDeliverable.campaign} featuring ${selectedDeliverable.deliverableType}`,
            requirements: selectedDeliverable.requirements,
            payout: "$100 per post + performance bonuses",
            gmvTarget: 5000,
            currentGmv: selectedDeliverable.status === "completed" ? 5200 : 850,
            totalDeliverables: 5,
            completedDeliverables: selectedDeliverable.status === "completed" ? 5 : 2,
            daysLeft: selectedDeliverable.status === "completed" ? 0 : 13,
          }}
        />
      )}
    </div>
  )
}
