"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, AlertTriangle } from "lucide-react"

export function ShippingOverview() {
  const overviewData = [
    {
      title: "To Ship",
      count: "12",
      subtitle: "creators awaiting samples",
      detail: "3 urgent (>3 days)",
      value: "$1,240 in samples",
      icon: Package,
      color: "text-orange-400",
      bgColor: "bg-orange-600/20",
      borderColor: "border-orange-600/30",
      action: "Prepare Shipments",
      actionColor: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "In Transit",
      count: "17",
      subtitle: "packages shipped",
      detail: "15 with tracking numbers",
      value: "Avg 3 days delivery",
      icon: Truck,
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-600/30",
      action: "Track All",
      actionColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Delivered",
      count: "8",
      subtitle: "packages delivered",
      detail: "6 creators confirmed receipt",
      value: "Content starting in 2 days",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-600/30",
      action: "View Delivered",
      actionColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Overdue Shipping",
      count: "3",
      subtitle: "creators >5 days",
      detail: "Sample delay risk",
      value: "Content timeline at risk",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-600/20",
      borderColor: "border-red-600/30",
      action: "Send Alerts",
      actionColor: "bg-red-600 hover:bg-red-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${item.bgColor} ${item.borderColor} border`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <Badge className={`${item.bgColor} ${item.color} ${item.borderColor} border`}>{item.count}</Badge>
              </div>
              <CardTitle className="text-white text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">{item.subtitle}</p>
                <p className="text-sm font-medium text-gray-300">{item.detail}</p>
                <p className="text-xs text-gray-500 mt-1">{item.value}</p>
              </div>

              <Button size="sm" className={`w-full ${item.actionColor} text-white`}>
                {item.action}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
