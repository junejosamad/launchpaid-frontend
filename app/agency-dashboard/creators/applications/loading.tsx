import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ApplicationsLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar placeholder */}
      <div className="hidden lg:block w-60 bg-gray-900 border-r border-gray-800" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-60">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-4 w-4 bg-gray-800" />
              <Skeleton className="h-4 w-4 bg-gray-800" />
              <Skeleton className="h-4 w-20 bg-gray-800" />
              <Skeleton className="h-4 w-4 bg-gray-800" />
              <Skeleton className="h-4 w-24 bg-gray-800" />
            </div>

            {/* Title skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Skeleton className="h-8 w-48 bg-gray-800 mb-2" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-20 bg-gray-800" />
                <Skeleton className="h-9 w-32 bg-gray-800" />
                <Skeleton className="h-9 w-24 bg-gray-800" />
              </div>
            </div>

            {/* Statistics cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-24 bg-gray-800 mb-2" />
                        <Skeleton className="h-8 w-16 bg-gray-800" />
                      </div>
                      <Skeleton className="h-8 w-8 bg-gray-800 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and controls skeleton */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-10 w-80 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-40 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-28 bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="p-6">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              {/* Table header skeleton */}
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-4 w-4 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-4 w-40 bg-gray-800" />
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-4 w-20 bg-gray-800" />
                <Skeleton className="h-4 w-24 bg-gray-800" />
              </div>

              {/* Table rows skeleton */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-800 last:border-b-0">
                  <Skeleton className="h-4 w-4 bg-gray-800" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 bg-gray-800 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 bg-gray-800 mb-1" />
                      <Skeleton className="h-3 w-20 bg-gray-800" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-40 bg-gray-800" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-32 bg-gray-800" />
                    <Skeleton className="h-3 w-28 bg-gray-800" />
                    <Skeleton className="h-3 w-24 bg-gray-800" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16 bg-gray-800" />
                    <Skeleton className="h-3 w-12 bg-gray-800" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                    <Skeleton className="h-4 w-12 bg-gray-800" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 bg-gray-800" />
                    <Skeleton className="h-8 w-8 bg-gray-800" />
                    <Skeleton className="h-8 w-8 bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
