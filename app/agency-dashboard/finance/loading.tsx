import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FinanceLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="lg:ml-60">
        <div className="h-16 border-b border-gray-800 bg-gray-900/50" />

        <main className="p-6">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-20 mb-2 bg-gray-800" />
            <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-96 bg-gray-800" />
          </div>

          {/* Filter Panel Skeleton */}
          <Card className="bg-gray-900/50 border-gray-800 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-32 bg-gray-800" />
                <Skeleton className="h-8 w-40 bg-gray-800" />
                <Skeleton className="h-8 w-32 bg-gray-800" />
                <div className="ml-auto flex gap-2">
                  <Skeleton className="h-8 w-32 bg-gray-800" />
                  <Skeleton className="h-8 w-36 bg-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 bg-gray-800" />
              ))}
            </div>

            {/* KPI Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-32 mb-2 bg-gray-800" />
                    <Skeleton className="h-4 w-28 bg-gray-800" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <Skeleton className="h-6 w-40 bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <Skeleton className="h-4 w-32 bg-gray-800" />
                          <Skeleton className="h-4 w-20 bg-gray-800" />
                        </div>
                      ))}
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
