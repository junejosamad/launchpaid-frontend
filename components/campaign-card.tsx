"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, FileText, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CampaignCardProps {
  title: string
  brand: string
  logo: string
  deliverables: number
  completed: number
  gmv: number
  target: number
  daysLeft: number
  status: "active" | "completed" | "pending" | "overdue"
  onViewDetails?: () => void
}

export function CampaignCard({
  title,
  brand,
  logo,
  deliverables,
  completed,
  gmv,
  target,
  daysLeft,
  status,
  onViewDetails,
}: CampaignCardProps) {
  const deliverableProgress = Math.round((completed / deliverables) * 100)
  const circumference = 2 * Math.PI * 16 // radius of 16
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (deliverableProgress / 100) * circumference

  return (
    <Card
      className={cn(
        "bg-gray-900 border-gray-800 overflow-hidden transition-all duration-200 hover:border-purple-500/50",
        status === "overdue" && "border-red-500/50 bg-red-900/10",
      )}
    >
      <CardHeader className="pb-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Picture with Circular Progress */}
            <div className="relative h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gray-800 overflow-hidden">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={brand}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Circular Progress Ring */}
              <svg className="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-700"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className={cn(
                    "transition-all duration-300",
                    status === "completed" && "text-green-500",
                    status === "active" && "text-purple-500",
                    status === "overdue" && "text-red-500",
                  )}
                />
              </svg>
              {/* Progress Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white bg-black/50 rounded-full px-1">
                  {deliverableProgress}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-400">{brand}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status === "overdue" && <AlertTriangle className="h-4 w-4 text-red-500" />}
            {status === "active" && <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>}
            {status === "completed" && <Badge className="bg-blue-600 hover:bg-blue-700">Completed</Badge>}
            {status === "pending" && <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge>}
            {status === "overdue" && <Badge className="bg-red-600 hover:bg-red-700">Overdue</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-4">
          {/* GMV Counter (No Progress Bar) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-sm font-medium">GMV Generated</div>
              <div className="text-lg font-bold text-purple-400">${gmv.toLocaleString()}</div>
            </div>
            <div className="text-xs text-gray-400">Target: ${target.toLocaleString()}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <FileText className="h-4 w-4" />
              <span>
                {completed}/{deliverables} Deliverables
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span
                className={cn(
                  daysLeft < 0 && "text-red-400 font-medium",
                  daysLeft === 0 && "text-gray-400",
                  daysLeft > 0 && daysLeft <= 3 && "text-yellow-400",
                  daysLeft > 3 && "text-gray-400",
                )}
              >
                {daysLeft < 0
                  ? `${Math.abs(daysLeft)} days overdue`
                  : daysLeft === 0
                    ? "Ended"
                    : `${daysLeft} days left`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full border-gray-800 hover:bg-gray-800 hover:text-white"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
