// components/debug/ServiceHealthCheck.tsx - Component to check backend service health
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { checkAllServicesHealth, getServiceStatus } from "@/lib/api/client"

interface ServiceHealth {
  name: string
  url: string
  status: boolean | null
  responseTime?: number
  lastChecked?: Date
}

export function ServiceHealthCheck() {
  const [services, setServices] = useState<ServiceHealth[]>([])
  const [loading, setLoading] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    
    try {
      const serviceUrls = getServiceStatus()
      const startTime = Date.now()
      
      // Initialize services
      const serviceList: ServiceHealth[] = Object.entries(serviceUrls).map(([name, url]) => ({
        name: name.replace('Service', '').toLowerCase(),
        url,
        status: null,
        lastChecked: new Date()
      }))
      
      setServices(serviceList)

      // Check health of all services
      const healthResults = await checkAllServicesHealth()
      const endTime = Date.now()

      // Update services with results
      const updatedServices = serviceList.map(service => ({
        ...service,
        status: healthResults[service.name] || false,
        responseTime: endTime - startTime,
        lastChecked: new Date()
      }))

      setServices(updatedServices)
      setLastCheck(new Date())
    } catch (error) {
      console.error("Health check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <AlertCircle className="h-4 w-4 text-yellow-500" />
    if (status) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusBadge = (status: boolean | null) => {
    if (status === null) {
      return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Checking</Badge>
    }
    if (status) {
      return <Badge variant="outline" className="text-green-500 border-green-500">Online</Badge>
    }
    return <Badge variant="outline" className="text-red-500 border-red-500">Offline</Badge>
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Backend Services Status</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkHealth}
          disabled={loading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.length === 0 ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-6 w-16 bg-gray-800" />
              </div>
            ))}
          </div>
        ) : (
          services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <div>
                  <p className="text-sm font-medium capitalize">
                    {service.name} Service
                  </p>
                  <p className="text-xs text-gray-400">
                    {service.url}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {service.responseTime && (
                  <span className="text-xs text-gray-400">
                    {service.responseTime}ms
                  </span>
                )}
                {getStatusBadge(service.status)}
              </div>
            </div>
          ))
        )}
        
        {lastCheck && (
          <div className="pt-2 border-t border-gray-800">
            <p className="text-xs text-gray-400">
              Last checked: {lastCheck.toLocaleTimeString()}
            </p>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-800">
          <p className="text-xs text-gray-400">
            💡 Make sure your backend services are running:
          </p>
          <ul className="text-xs text-gray-500 mt-1 space-y-1">
            <li>• Campaign Service: <code>uvicorn app.main:app --host 0.0.0.0 --port 8002</code></li>
            <li>• User Service: <code>uvicorn app.main:app --host 0.0.0.0 --port 8000</code></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}