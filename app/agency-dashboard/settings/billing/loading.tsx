import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BillingLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
          <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
          <Skeleton className="h-4 w-96 bg-gray-800" />
        </div>

        <div className="space-y-8">
          {/* Current Subscription Skeleton */}
          <section>
            <div className="mb-6">
              <Skeleton className="h-6 w-32 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-80 bg-gray-800" />
            </div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 bg-gray-800" />
                    <div>
                      <Skeleton className="h-6 w-40 mb-2 bg-gray-800" />
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-8 w-24 mb-1 bg-gray-800" />
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20 bg-gray-800" />
                        <Skeleton className="h-4 w-12 bg-gray-800" />
                      </div>
                      <Skeleton className="h-2 w-full bg-gray-800" />
                      <Skeleton className="h-3 w-16 bg-gray-800" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-32 bg-gray-800" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Payment Methods Skeleton */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-40 bg-gray-800" />
              <Skeleton className="h-10 w-40 bg-gray-800" />
            </div>
            <div className="grid gap-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1 bg-gray-800" />
                          <Skeleton className="h-4 w-24 bg-gray-800" />
                        </div>
                        <Skeleton className="h-6 w-16 bg-gray-800" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Usage Analytics Skeleton */}
          <section>
            <div className="mb-6">
              <Skeleton className="h-6 w-40 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-80 bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-5 w-32 bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2 bg-gray-800" />
                    <Skeleton className="h-4 w-20 mb-3 bg-gray-800" />
                    <Skeleton className="h-2 w-full mb-3 bg-gray-800" />
                    <Skeleton className="h-3 w-24 bg-gray-800" />
                    <Skeleton className="h-8 w-full mt-3 bg-gray-800" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Plan Comparison Skeleton */}
          <section>
            <div className="mb-6">
              <Skeleton className="h-6 w-32 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-80 bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-20 bg-gray-800" />
                      <div className="text-right">
                        <Skeleton className="h-8 w-16 mb-1 bg-gray-800" />
                        <Skeleton className="h-4 w-12 bg-gray-800" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 bg-gray-800" />
                          <Skeleton className="h-4 w-32 bg-gray-800" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full bg-gray-800" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
