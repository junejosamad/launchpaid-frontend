import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SMSBroadcastsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="lg:ml-60">
        <div className="h-16 border-b border-gray-800 bg-black"></div>

        <main className="p-6">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-48 mb-2 bg-gray-800" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-96 bg-gray-800" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32 bg-gray-800" />
                <Skeleton className="h-10 w-32 bg-gray-800" />
                <Skeleton className="h-10 w-32 bg-gray-800" />
                <Skeleton className="h-10 w-40 bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <Skeleton className="h-4 w-32 bg-gray-800" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-24 mb-1 bg-gray-800" />
                  <Skeleton className="h-3 w-32 bg-gray-800" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg w-fit">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 bg-gray-800" />
              ))}
            </div>

            {/* Content Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-48 bg-gray-800" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-64 bg-gray-800" />
                    <Skeleton className="h-10 w-32 bg-gray-800" />
                    <Skeleton className="h-10 w-24 bg-gray-800" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
                          <Skeleton className="h-3 w-48 bg-gray-800" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
