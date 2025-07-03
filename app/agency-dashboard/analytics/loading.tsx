import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar />

      <div className="lg:ml-60">
        <AgencyHeader />

        <main className="p-6 space-y-6">
          {/* Page Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-gray-800" />
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64 bg-gray-800" />
                <Skeleton className="h-4 w-96 bg-gray-800" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-32 bg-gray-800" />
                <Skeleton className="h-9 w-24 bg-gray-800" />
                <Skeleton className="h-9 w-20 bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Filters Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12 bg-gray-800" />
                <Skeleton className="h-9 w-48 bg-gray-800" />
                <Skeleton className="h-9 w-32 bg-gray-800" />
                <Skeleton className="h-9 w-40 bg-gray-800" />
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-800" />
                      <Skeleton className="h-8 w-24 bg-gray-800" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-lg bg-gray-800" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 bg-gray-800" />
                    <Skeleton className="h-4 w-12 bg-gray-800" />
                    <Skeleton className="h-4 w-20 bg-gray-800" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary KPIs Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-5 w-32 bg-gray-800" />
                    <Skeleton className="h-5 w-5 bg-gray-800" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-16 bg-gray-800" />
                      <Skeleton className="h-6 w-20 bg-gray-800" />
                    </div>
                    <Skeleton className="h-2 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Analytics Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32 bg-gray-800" />
                  <Skeleton className="h-9 w-32 bg-gray-800" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full bg-gray-800 rounded-lg" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-gray-800" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-8 bg-gray-800" />
                    </div>
                    <Skeleton className="h-2 w-full bg-gray-800" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
