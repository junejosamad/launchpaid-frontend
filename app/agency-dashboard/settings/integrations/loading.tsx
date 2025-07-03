import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function IntegrationsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <AgencySidebar />

      <div className="lg:pl-60">
        <AgencyHeader />

        <main className="p-6 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-gray-800" />
            <Skeleton className="h-8 w-48 bg-gray-800" />
            <Skeleton className="h-4 w-96 bg-gray-800" />
          </div>

          {/* Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-gray-800" />
                      <Skeleton className="h-8 w-16 bg-gray-800" />
                      <Skeleton className="h-3 w-20 bg-gray-800" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-lg bg-gray-800" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48 bg-gray-800" />
              <Skeleton className="h-9 w-32 bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-24 bg-gray-800" />
                          <Skeleton className="h-4 w-32 bg-gray-800" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full bg-gray-800" />
                      ))}
                    </div>
                    <Skeleton className="h-20 w-full bg-gray-800" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 flex-1 bg-gray-800" />
                      <Skeleton className="h-8 w-16 bg-gray-800" />
                      <Skeleton className="h-8 w-16 bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
