import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeamManagementLoading() {
  return (
    <div className="min-h-screen bg-black">
      <AgencySidebar />

      <div className="lg:pl-60">
        <AgencyHeader />

        <main className="p-6 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-gray-800" />
            <Skeleton className="h-8 w-80 bg-gray-800" />
            <Skeleton className="h-4 w-96 bg-gray-800" />
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <Skeleton className="h-6 w-48 bg-gray-800" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-6 w-32 bg-gray-800" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Workspace Cards */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-64 bg-gray-800" />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <Skeleton className="h-6 w-48 bg-gray-800" />
                    <Skeleton className="h-4 w-full bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-2 w-full bg-gray-800" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-12 w-full bg-gray-800" />
                      <Skeleton className="h-12 w-full bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Members Table */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-48 bg-gray-800" />
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48 bg-gray-800" />
                        <Skeleton className="h-3 w-32 bg-gray-800" />
                      </div>
                      <Skeleton className="h-6 w-20 bg-gray-800" />
                      <Skeleton className="h-6 w-16 bg-gray-800" />
                      <Skeleton className="h-8 w-8 bg-gray-800" />
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
