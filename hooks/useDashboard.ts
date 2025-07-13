// hooks/useDashboard.ts - Fixed version without const assignment errors
"use client"

import { useState, useEffect } from "react"
import { campaignServiceClient, type ApiResponse } from "@/lib/api/client"

// Types for the dashboard data
export interface DashboardKPIs {
  total_gmv: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  total_views: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  total_engagement: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  active_campaigns: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  active_creators: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  avg_engagement_rate: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  conversion_rate: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
  roi: {
    value: number
    growth: number
    trend: "up" | "down" | "stable"
  }
}

export interface CampaignSummary {
  id: string
  name: string
  status: "draft" | "active" | "paused" | "completed" | "cancelled"
  progress: number
  target_gmv?: number
  current_gmv?: number
  target_creators?: number
  current_creators?: number
  start_date?: string
  end_date?: string
}

export interface CreatorSummary {
  id: string
  first_name: string
  last_name: string
  username?: string
  avatar_url?: string
  total_gmv?: number
  total_posts?: number
  engagement_rate?: number
  consistency_score?: number
  rank?: number
  rank_change?: number
}

export interface DashboardAnalytics {
  kpis: DashboardKPIs
  recent_campaigns: CampaignSummary[]
  top_creators: CreatorSummary[]
  period_start: string
  period_end: string
  last_updated: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  status: "draft" | "active" | "paused" | "completed" | "cancelled"
  type: string
  budget?: number
  target_gmv?: number
  current_gmv?: number
  target_creators?: number
  current_creators?: number
  target_posts?: number
  current_posts?: number
  total_views?: number
  total_engagement?: number
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface CreatorPerformance {
  creator_id: string
  campaign_id?: string
  total_posts: number
  total_gmv: number
  total_views: number
  total_engagement: number
  engagement_rate: number
  conversion_rate: number
  consistency_score: number
  gmv_rank?: number
  engagement_rank?: number
  period_start?: string
  period_end?: string
  last_calculated: string
  creator: CreatorSummary
}

export interface Deliverable {
  id: string
  campaign_id: string
  creator_id: string
  application_id: string
  deliverable_number: number
  title?: string
  description?: string
  status: "pending" | "submitted" | "approved" | "rejected" | "overdue"
  content_url?: string
  content_type?: string
  tiktok_post_url?: string
  post_caption?: string
  hashtags_used?: string[]
  due_date?: string
  submitted_at?: string
  approved_at?: string
  published_at?: string
  feedback?: string
  agency_feedback?: string
  revision_requested?: boolean
  revision_notes?: string
  views?: number
  likes?: number
  comments?: number
  shares?: number
  gmv_generated?: number
  created_at: string
  updated_at: string
  creator: CreatorSummary
  campaign: CampaignSummary
}

// Hook for dashboard analytics
export function useDashboardAnalytics(
  timeframe: string = "last_30_days",
  startDate?: string,
  endDate?: string
) {
  const [data, setData] = useState<DashboardAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('📊 Fetching dashboard analytics...')

      // Build params object
      const params: Record<string, string> = {
        timeframe,
      }

      if (startDate) params.start_date = startDate
      if (endDate) params.end_date = endDate

      console.log('📋 Request params:', params)

      const response: ApiResponse<DashboardAnalytics> = await campaignServiceClient.get(
        '/api/v1/dashboard/analytics',
        params
      )

      console.log('📡 Analytics response:', response)

      if (response.success && response.data) {
        console.log('✅ Successfully fetched analytics:', response.data)
        setData(response.data)
      } else {
        const errorMsg = response.error || 'Failed to fetch analytics'
        console.error('❌ Analytics fetch failed:', errorMsg)
        setError(errorMsg)
      }
    } catch (err: any) {
      console.error("❌ Analytics fetch error:", err)
      setError(err.message || 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeframe, startDate, endDate])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  }
}

export function useCampaigns(
  status?: string,
  limit: number = 20,
  offset: number = 0
) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('🚀 Fetching campaigns from dashboard...')

      // Build params object - ensure proper types
      const params: Record<string, string | number> = { 
        limit, 
        offset 
      }
      
      // Validate status parameter
      if (status && typeof status === 'string' && status !== 'all') {
        params.status = status
      }

      console.log('📋 Request params:', params)

      // Try the dashboard endpoint first, fall back to regular campaigns endpoint
      let response: ApiResponse<any> = await campaignServiceClient.get(
        '/api/v1/dashboard/campaigns',
        params
      )

      // If dashboard endpoint doesn't exist, try regular campaigns endpoint
      if (!response.success && response.statusCode === 404) {
        console.log('Dashboard endpoint not found, trying regular campaigns endpoint...')
        response = await campaignServiceClient.get('/api/v1/campaigns', params)
      }

      console.log('📡 Campaigns response:', response)

      if (response.success && response.data) {
        let campaignData: Campaign[] = []
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          campaignData = response.data
        } else if (response.data.campaigns && Array.isArray(response.data.campaigns)) {
          campaignData = response.data.campaigns
        } else if (response.data.data && Array.isArray(response.data.data)) {
          campaignData = response.data.data
        }
        
        console.log('✅ Successfully fetched campaigns:', campaignData)
        setCampaigns(campaignData)
      } else {
        const errorMsg = response.error || 'Failed to fetch campaigns'
        console.error('❌ Campaigns fetch failed:', errorMsg)
        setError(errorMsg)
        setCampaigns([])
      }
    } catch (err: any) {
      console.error("❌ Campaigns fetch error:", err)
      setError(err.message || 'Unknown error occurred')
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [status, limit, offset])

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns,
  }
}


// Hook for creator performance
export function useCreatorPerformance(
  campaignId?: string,
  timeframe: string = "last_30_days",
  limit: number = 10
) {
  const [performance, setPerformance] = useState<CreatorPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerformance = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('👥 Fetching creator performance...')

      // Build params object
      const params: Record<string, string | number> = {
        timeframe,
        limit
      }
      
      if (campaignId) params.campaign_id = campaignId

      console.log('📋 Request params:', params)

      const response: ApiResponse<CreatorPerformance[]> = await campaignServiceClient.get(
        '/api/v1/dashboard/creator-performance',
        params
      )

      console.log('📡 Creator performance response:', response)

      if (response.success && response.data) {
        console.log('✅ Successfully fetched creator performance:', response.data)
        setPerformance(response.data)
      } else {
        const errorMsg = response.error || 'Failed to fetch creator performance'
        console.error('❌ Creator performance fetch failed:', errorMsg)
        setError(errorMsg)
        setPerformance([])
      }
    } catch (err: any) {
      console.error("❌ Creator performance fetch error:", err)
      setError(err.message || 'Unknown error occurred')
      setPerformance([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPerformance()
  }, [campaignId, timeframe, limit])

  return {
    performance,
    loading,
    error,
    refetch: fetchPerformance,
  }
}

// Placeholder hooks for applications and deliverables
export function useApplications() {
  return {
    applications: [],
    loading: false,
    error: null,
    refetch: () => {},
    reviewApplication: () => {},
  }
}



// Hook for deliverables
export function useDeliverables(
  campaignId?: string,
  statusFilter?: string,
  creatorId?: string
) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeliverables = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('📦 Fetching deliverables...')

      // Build params object
      const params: Record<string, string> = {}
      
      if (campaignId) {
        // Fetch deliverables for a specific campaign
        const response: ApiResponse<Deliverable[]> = await campaignServiceClient.get(
          `/api/v1/deliverables/campaign/${campaignId}`,
          statusFilter ? { status_filter: statusFilter } : {}
        )
        
        console.log('📡 Deliverables response:', response)

        if (response.success && response.data) {
          console.log('✅ Successfully fetched deliverables:', response.data)
          setDeliverables(response.data)
        } else {
          const errorMsg = response.error || 'Failed to fetch deliverables'
          console.error('❌ Deliverables fetch failed:', errorMsg)
          setError(errorMsg)
          setDeliverables([])
        }
      } else if (creatorId) {
        // Fetch deliverables for a specific creator
        const response: ApiResponse<Deliverable[]> = await campaignServiceClient.get(
          `/api/v1/deliverables/creator/${creatorId}`,
          campaignId ? { campaign_id: campaignId } : {}
        )
        
        console.log('📡 Creator deliverables response:', response)

        if (response.success && response.data) {
          console.log('✅ Successfully fetched creator deliverables:', response.data)
          setDeliverables(response.data)
        } else {
          const errorMsg = response.error || 'Failed to fetch creator deliverables'
          console.error('❌ Creator deliverables fetch failed:', errorMsg)
          setError(errorMsg)
          setDeliverables([])
        }
      } else {
        // No campaign or creator specified
        setDeliverables([])
      }
    } catch (err: any) {
      console.error("❌ Deliverables fetch error:", err)
      setError(err.message || 'Unknown error occurred')
      setDeliverables([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeliverables()
  }, [campaignId, statusFilter, creatorId])

  const submitContent = async (deliverableData: any) => {
    try {
      console.log('📤 Submitting deliverable content...')
      
      const response: ApiResponse<Deliverable> = await campaignServiceClient.post(
        '/api/v1/deliverables/submit',
        deliverableData
      )

      if (response.success && response.data) {
        console.log('✅ Successfully submitted deliverable:', response.data)
        // Refresh deliverables list
        await fetchDeliverables()
        return response.data
      } else {
        const errorMsg = response.error || 'Failed to submit deliverable'
        console.error('❌ Deliverable submission failed:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (err: any) {
      console.error("❌ Deliverable submission error:", err)
      throw err
    }
  }

  const reviewContent = async (deliverableId: string, reviewData: any) => {
    try {
      console.log('📝 Reviewing deliverable content...')
      
      const response: ApiResponse<Deliverable> = await campaignServiceClient.put(
        `/api/v1/deliverables/${deliverableId}/review`,
        reviewData
      )

      if (response.success && response.data) {
        console.log('✅ Successfully reviewed deliverable:', response.data)
        // Refresh deliverables list
        await fetchDeliverables()
        return response.data
      } else {
        const errorMsg = response.error || 'Failed to review deliverable'
        console.error('❌ Deliverable review failed:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (err: any) {
      console.error("❌ Deliverable review error:", err)
      throw err
    }
  }

  return {
    deliverables,
    loading,
    error,
    refetch: fetchDeliverables,
    submitContent,
    reviewContent,
  }
}
