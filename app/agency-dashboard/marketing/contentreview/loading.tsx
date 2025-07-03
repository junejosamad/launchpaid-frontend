import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"

export default function ContentReviewLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AgencySidebar />

      <div className="lg:ml-60">
        <AgencyHeader />

        <main className="p-6">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-48 mb-2 bg-gray-800" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Skeleton className="h-8 w-80 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-96 bg-gray-800" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32 bg-gray-800" />
                <Skeleton className="h-10 w-32 bg-gray-800" />
                <Skeleton className="h-10 w-32 bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
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

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 bg-gray-800" />
              ))}
            </div>

            {/* Filters Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 bg-gray-800" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <div className="space-y-4">
                    <Skeleton className="h-48 w-full bg-gray-800" />
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24 bg-gray-800" />
                          <Skeleton className="h-3 w-20 bg-gray-800" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-32 bg-gray-800" />
                      <div className="grid grid-cols-2 gap-2">
                        {[...Array(4)].map((_, j) => (
                          <Skeleton key={j} className="h-4 w-16 bg-gray-800" />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 flex-1 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
