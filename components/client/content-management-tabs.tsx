"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentGalleryTab } from "./content-gallery-tab"
import { PerformanceAnalyticsTab } from "./performance-analytics-tab"
import { ContentReviewTab } from "./content-review-tab"
import { ContentCalendarTab } from "./content-calendar-tab"

export function ContentManagementTabs() {
  return (
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
        <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600">
          Content Gallery
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
          Performance Analytics
        </TabsTrigger>
        <TabsTrigger value="review" className="data-[state=active]:bg-purple-600">
          Content Review & Feedback
        </TabsTrigger>
        <TabsTrigger value="calendar" className="data-[state=active]:bg-purple-600">
          Content Calendar & Scheduling
        </TabsTrigger>
      </TabsList>

      <TabsContent value="gallery" className="mt-6">
        <ContentGalleryTab />
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <PerformanceAnalyticsTab />
      </TabsContent>

      <TabsContent value="review" className="mt-6">
        <ContentReviewTab />
      </TabsContent>

      <TabsContent value="calendar" className="mt-6">
        <ContentCalendarTab />
      </TabsContent>
    </Tabs>
  )
}
