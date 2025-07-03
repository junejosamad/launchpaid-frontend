import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SetupLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="lg:pl-60">
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Skeleton className="h-8 w-64 bg-gray-800" />
              <Skeleton className="h-4 w-96 bg-gray-800" />
            </div>

            {/* Setup Progress Tracker Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32 bg-gray-800" />
                    <Skeleton className="h-4 w-48 bg-gray-800" />
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-8 w-16 bg-gray-800" />
                    <Skeleton className="h-4 w-20 bg-gray-800" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-3 w-full bg-gray-800" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24 bg-gray-700" />
                            <Skeleton className="h-3 w-32 bg-gray-700" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-full bg-gray-700" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Start Wizard Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-gray-800" />
                <Skeleton className="h-4 w-48 bg-gray-800" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
                        <Skeleton className="h-4 w-20 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-10 w-40 bg-gray-800" />
                </div>
              </CardContent>
            </Card>

            {/* Onboarding Checklist Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-40 bg-gray-800" />
                <Skeleton className="h-4 w-64 bg-gray-800" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-32 bg-gray-700" />
                            <Skeleton className="h-4 w-12 bg-gray-700" />
                            <Skeleton className="h-4 w-16 bg-gray-700" />
                          </div>
                          <Skeleton className="h-4 w-48 bg-gray-700" />
                          <Skeleton className="h-3 w-40 bg-gray-700" />
                        </div>
                        <Skeleton className="h-8 w-20 bg-gray-700" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Integration Health Dashboard Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-gray-800" />
                <Skeleton className="h-4 w-48 bg-gray-800" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-24 bg-gray-700" />
                          <Skeleton className="h-5 w-16 bg-gray-700" />
                        </div>
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32 bg-gray-700" />
                          <Skeleton className="h-4 w-28 bg-gray-700" />
                        </div>
                        <Skeleton className="h-8 w-full bg-gray-700" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help & Documentation Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-gray-800" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((section) => (
                    <div key={section} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 bg-gray-800" />
                        <Skeleton className="h-5 w-32 bg-gray-800" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map((item) => (
                          <Skeleton key={item} className="h-8 w-full bg-gray-800" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Section Skeleton */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-24 bg-gray-800" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center space-y-3">
                        <Skeleton className="h-8 w-8 mx-auto bg-gray-700" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-24 mx-auto bg-gray-700" />
                          <Skeleton className="h-4 w-32 mx-auto bg-gray-700" />
                        </div>
                        <Skeleton className="h-8 w-full bg-gray-700" />
                      </CardContent>
                    </Card>
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
