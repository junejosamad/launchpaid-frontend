"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Package,
  MapPin,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Edit,
  MessageSquare,
  SkipForward,
  Truck,
} from "lucide-react"

export function ToShipTab() {
  const [selectedCreators, setSelectedCreators] = useState<number[]>([])

  const creatorsToShip = [
    {
      id: 1,
      creator: {
        name: "Emma Rodriguez",
        handle: "@emmarod",
        avatar: "/placeholder.svg?height=60&width=60",
        approvalDate: "Approved 2 days ago",
      },
      address: {
        full: "1234 Fashion Blvd, Apt 5B\nLos Angeles, CA 90210\nUnited States",
        phone: "+1 (555) 123-4567",
        verified: true,
        specialInstructions: "Leave at front door",
      },
      samples: {
        productName: "Summer Collection Bundle",
        quantity: 3,
        value: 125,
        skus: ["SC-001", "SC-002", "SC-003"],
        weight: "2.5 lbs",
        shippingMethod: "Standard",
      },
      timeline: {
        daysSinceApproval: 2,
        contentDeadline: "Content due in 10 days",
        urgency: "standard",
        recommendedShipDate: "Ship by Jan 25",
      },
    },
    {
      id: 2,
      creator: {
        name: "Jake Thompson",
        handle: "@jakethompson",
        avatar: "/placeholder.svg?height=60&width=60",
        approvalDate: "Approved 4 days ago",
      },
      address: {
        full: "456 Oak Avenue, Suite 12\nNew York, NY 10001\nUnited States",
        phone: "+1 (555) 987-6543",
        verified: true,
        specialInstructions: "Buzz apartment 12B",
      },
      samples: {
        productName: "Summer Collection Bundle",
        quantity: 3,
        value: 125,
        skus: ["SC-001", "SC-002", "SC-003"],
        weight: "2.5 lbs",
        shippingMethod: "Express",
      },
      timeline: {
        daysSinceApproval: 4,
        contentDeadline: "Content due in 8 days",
        urgency: "urgent",
        recommendedShipDate: "Ship TODAY",
      },
    },
    {
      id: 3,
      creator: {
        name: "Sofia Chen",
        handle: "@sofiastyle",
        avatar: "/placeholder.svg?height=60&width=60",
        approvalDate: "Approved 1 day ago",
      },
      address: {
        full: "789 Pine Street\nMiami, FL 33101\nUnited States",
        phone: "+1 (555) 456-7890",
        verified: false,
        specialInstructions: "Call before delivery",
      },
      samples: {
        productName: "Summer Collection Bundle",
        quantity: 3,
        value: 125,
        skus: ["SC-001", "SC-002", "SC-003"],
        weight: "2.5 lbs",
        shippingMethod: "Standard",
      },
      timeline: {
        daysSinceApproval: 1,
        contentDeadline: "Content due in 11 days",
        urgency: "recent",
        recommendedShipDate: "Ship by Jan 26",
      },
    },
  ]

  const toggleCreatorSelection = (creatorId: number) => {
    setSelectedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId],
    )
  }

  const getPriorityBadge = (urgency: string, days: number) => {
    if (urgency === "urgent" || days >= 3) {
      return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">🔴 Urgent</Badge>
    } else if (urgency === "recent") {
      return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">🟢 Recent</Badge>
    }
    return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">🟡 Standard</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Shipping Queue</h3>
          <p className="text-gray-400">12 creators awaiting sample shipments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            disabled={selectedCreators.length === 0}
          >
            Bulk Actions ({selectedCreators.length})
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Generate Selected Labels</Button>
        </div>
      </div>

      {/* Creator Shipping Cards */}
      <div className="space-y-4">
        {creatorsToShip.map((item) => (
          <Card key={item.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Selection Checkbox */}
                <Checkbox
                  checked={selectedCreators.includes(item.id)}
                  onCheckedChange={() => toggleCreatorSelection(item.id)}
                  className="mt-2"
                />

                {/* Creator Info */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Creator Profile */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={item.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {item.creator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-white">{item.creator.name}</h4>
                        <p className="text-sm text-gray-400">{item.creator.handle}</p>
                        <p className="text-xs text-gray-500">{item.creator.approvalDate}</p>
                      </div>
                    </div>
                    {getPriorityBadge(item.timeline.urgency, item.timeline.daysSinceApproval)}
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Shipping Address</span>
                      {item.address.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400 whitespace-pre-line">{item.address.full}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="h-3 w-3" />
                      {item.address.phone}
                    </div>
                    {item.address.specialInstructions && (
                      <p className="text-xs text-yellow-400">📝 {item.address.specialInstructions}</p>
                    )}
                  </div>

                  {/* Sample Information */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Sample Details</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="text-white font-medium">{item.samples.productName}</div>
                      <div className="text-gray-400">Quantity: {item.samples.quantity} items</div>
                      <div className="text-gray-400">Value: ${item.samples.value}</div>
                      <div className="text-gray-400">Weight: {item.samples.weight}</div>
                      <div className="text-gray-400">Method: {item.samples.shippingMethod}</div>
                      <div className="text-xs text-gray-500">SKUs: {item.samples.skus.join(", ")}</div>
                    </div>
                  </div>

                  {/* Timeline & Actions */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Timeline</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="text-gray-400">{item.timeline.daysSinceApproval} days since approval</div>
                      <div className="text-gray-400">{item.timeline.contentDeadline}</div>
                      <div
                        className={`font-medium ${
                          item.timeline.urgency === "urgent" ? "text-red-400" : "text-gray-300"
                        }`}
                      >
                        {item.timeline.recommendedShipDate}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                        <Package className="h-3 w-3 mr-1" />
                        Generate Label
                      </Button>
                      <div className="grid grid-cols-2 gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                        >
                          <Truck className="h-3 w-3 mr-1" />
                          Mark Shipped
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                        >
                          <SkipForward className="h-3 w-3 mr-1" />
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
