import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LeaderboardsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="lg:ml-60 flex flex-col min-h-screen">
        <div className="h-16 border-b border-gray-800 bg-gray-900" />

        <main className="flex-1 p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-gray-800" />
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64 bg-gray-800" />
                <Skeleton className="h-4 w-48 bg-gray-800" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 bg-gray-800" />
                <Skeleton className="h-9 w-20 bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Filter Controls Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-48 bg-gray-800" />
                  <Skeleton className="h-10 w-32 bg-gray-800" />
                  <Skeleton className="h-10 w-40 bg-gray-800" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-64 bg-gray-800" />
                  <Skeleton className="h-10 w-32 bg-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-gray-800" />
                      <Skeleton className="h-8 w-16 bg-gray-800" />
                      <Skeleton className="h-4 w-20 bg-gray-800" />
                    </div>
                    <Skeleton className="h-8 w-8 bg-gray-800 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Performers Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-gray-800" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-16 w-16 rounded-full bg-gray-700" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32 bg-gray-700" />
                          <Skeleton className="h-4 w-24 bg-gray-700" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-center space-y-2">
                          <Skeleton className="h-8 w-24 mx-auto bg-gray-700" />
                          <Skeleton className="h-4 w-20 mx-auto bg-gray-700" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <div key={j} className="space-y-1">
                              <Skeleton className="h-3 w-12 bg-gray-700" />
                              <Skeleton className="h-4 w-8 bg-gray-700" />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 flex-1 bg-gray-700" />
                          <Skeleton className="h-8 w-8 bg-gray-700" />
                          <Skeleton className="h-8 w-8 bg-gray-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Table Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32 bg-gray-800" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 bg-gray-800" />
                  <Skeleton className="h-8 w-8 bg-gray-800" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3">
                    <Skeleton className="h-4 w-8 bg-gray-800" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                        <Skeleton className="h-3 w-24 bg-gray-800" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-20 bg-gray-800" />
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                    <Skeleton className="h-4 w-12 bg-gray-800" />
                    <div className="flex gap-1">
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
