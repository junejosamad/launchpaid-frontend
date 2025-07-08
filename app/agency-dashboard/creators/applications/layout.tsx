import { Suspense } from "react"
import ApplicationsLoading from "./loading"
import QueryProvider from "@/providers/QueryProvider"
import { Toaster } from "@/components/ui/toaster"

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <Suspense fallback={<ApplicationsLoading />}>
        {children}
      </Suspense>
      <Toaster />
    </QueryProvider>
  )
}