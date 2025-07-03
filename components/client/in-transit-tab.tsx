"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, MapPin, Clock, RefreshCw, MessageSquare, Phone, ExternalLink } from "lucide-react"

export function InTransitTab() {
  const shipmentsInTransit = [
    {
      id: 1,
      creator: {
        name: "Maya Patel",
        handle: "@mayastyle",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      shipping: {
        date: "Shipped 2 days ago",
        carrier: "FedEx",
        service: "Ground",
        trackingNumber: "1Z12345E1234567890",
      },
      status: {
        current: "In transit to destination",
        location: "Phoenix, AZ",
        lastUpdate: "2 hours ago",
        progress: 65,
      },
      delivery: {
        estimated: "Jan 28, 2024 by 8:00 PM",
        attempts: 0,
        signature: false,
      },
      communication: {
        smsStatus: "Tracking sent to creator",
        creatorResponse: null,
      },
    },
    {
      id: 2,
      creator: {
        name: "Alex Kim",
        handle: "@alexkimstyle",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      shipping: {
        date: "Shipped 1 day ago",
        carrier: "UPS",
        service: "Express",
        trackingNumber: "1Z999AA1234567891",
      },
      status: {
        current: "Out for delivery",
        location: "New York, NY",
        lastUpdate: "30 minutes ago",
        progress: 90,
      },
      delivery: {
        estimated: "Jan 24, 2024 by 3:00 PM",
        attempts: 0,
        signature: true,
      },
      communication: {
        smsStatus: "Delivery alert sent",
        creatorResponse: "Thanks! I'll be home",
      },
    },
    {
      id: 3,
      creator: {
        name: "Jordan Lee",
        handle: "@jordanstyle",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      shipping: {
        date: "Shipped 3 days ago",
        carrier: "USPS",
        service: "Priority",
        trackingNumber: "9405511206213123456789",
      },
      status: {
        current: "Package picked up",
        location: "Los Angeles, CA",
        lastUpdate: "1 day ago",
        progress: 25,
      },
      delivery: {
        estimated: "Jan 29, 2024 by 6:00 PM",
        attempts: 0,
        signature: false,
      },
      communication: {
        smsStatus: "Initial tracking sent",
        creatorResponse: null,
      },
    },
  ]

  const getCarrierLogo = (carrier: string) => {
    const logos = {
      FedEx: "🚚",
      UPS: "📦",
      USPS: "📮",
    }
    return logos[carrier as keyof typeof logos] || "📦"
  }

  const getStatusColor = (progress: number) => {
    if (progress >= 90) return "text-green-400"
    if (progress >= 50) return "text-blue-400"
    return "text-yellow-400"
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-600"
    if (progress >= 50) return "bg-blue-600"
    return "bg-yellow-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Active Shipments</h3>
          <p className="text-gray-400">17 packages currently in transit</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All Tracking
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Bulk SMS Updates
          </Button>
        </div>
      </div>

      {/* Shipment Tracking Cards */}
      <div className="space-y-4">
        {shipmentsInTransit.map((shipment) => (
          <Card key={shipment.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Creator & Shipment Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={shipment.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {shipment.creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{shipment.creator.name}</h4>
                      <p className="text-sm text-gray-400">{shipment.creator.handle}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">{shipment.shipping.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCarrierLogo(shipment.shipping.carrier)}</span>
                      <span className="text-sm font-medium text-white">{shipment.shipping.carrier}</span>
                      <Badge className="bg-gray-700 text-gray-300">{shipment.shipping.service}</Badge>
                    </div>
                  </div>
                </div>

                {/* Tracking Information */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Tracking Details</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded text-blue-400">
                          {shipment.shipping.trackingNumber}
                        </code>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className={`text-sm font-medium ${getStatusColor(shipment.status.progress)}`}>
                        {shipment.status.current}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {shipment.status.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        Last update: {shipment.status.lastUpdate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Delivery Progress</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{shipment.status.progress}%</span>
                        </div>
                        <Progress value={shipment.status.progress} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-white font-medium">ETA: {shipment.delivery.estimated}</div>
                        {shipment.delivery.signature && (
                          <div className="text-xs text-yellow-400">📝 Signature required</div>
                        )}
                        {shipment.delivery.attempts > 0 && (
                          <div className="text-xs text-orange-400">
                            ⚠️ {shipment.delivery.attempts} delivery attempt(s)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication & Actions */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Communication</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">📱 {shipment.communication.smsStatus}</div>
                      {shipment.communication.creatorResponse && (
                        <div className="text-xs text-green-400 bg-green-600/10 p-2 rounded">
                          💬 "{shipment.communication.creatorResponse}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Send SMS Update
                    </Button>
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Refresh
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call Carrier
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Full Tracking
                    </Button>
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
