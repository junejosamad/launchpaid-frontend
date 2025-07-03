import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GeneralSettingsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="lg:pl-60">
        <div className="h-16 border-b border-gray-800 bg-black" />

        <main className="p-6">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
            <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-96 bg-gray-800" />
          </div>

          {/* Tabs Skeleton */}
          <div className="mb-6">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 bg-gray-800" />
              ))}
            </div>
          </div>

          {/* Content Cards Skeleton */}
          <div className="space-y-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <Skeleton className="h-6 w-48 bg-gray-800" />
                  <Skeleton className="h-4 w-96 bg-gray-800" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 bg-gray-800" />
                    <Skeleton className="h-10 bg-gray-800" />
                  </div>
                  <Skeleton className="h-20 bg-gray-800" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-32 bg-gray-800" />
                    <Skeleton className="h-10 w-32 bg-gray-800" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
