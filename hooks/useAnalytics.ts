import { useQuery } from "@tanstack/react-query"
import { analyticsServiceClient } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/config"
import type { DashboardAnalytics, CampaignAnalytics } from "@/lib/types/api"

interface UseDashboardAnalyticsOptions {
  startDate: string
  endDate: string
  agencyId?: string
  campaignId?: string
  enabled?: boolean
}

export function useDashboardAnalytics(options: UseDashboardAnalyticsOptions) {
  const { startDate, endDate, agencyId, campaignId, enabled = true } = options

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard-analytics", { startDate, endDate, agencyId, campaignId }],
    queryFn: async () => {
      const params: Record<string, any> = {
        start_date: startDate,
        end_date: endDate,
      }

      if (agencyId) params.agency_id = agencyId
      if (campaignId) params.campaign_id = campaignId

      const response = await analyticsServiceClient.get<DashboardAnalytics>(ENDPOINTS.ANALYTICS.DASHBOARD, params)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch analytics")
      }

      return response.data!
    },
    enabled: enabled && !!startDate && !!endDate,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })

  return {
    analytics: data,
    loading: isLoading,
    fetching: isFetching,
    error: error?.message,
    refetch,
  }
}

export function useCampaignAnalytics(campaignId: string, enabled = true) {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["campaign-analytics", campaignId],
    queryFn: async () => {
      const response = await analyticsServiceClient.get<CampaignAnalytics>(ENDPOINTS.ANALYTICS.CAMPAIGN(campaignId))

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch campaign analytics")
      }

      return response.data!
    },
    enabled: enabled && !!campaignId,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  })

  return {
    analytics: data,
    loading: isLoading,
    fetching: isFetching,
    error: error?.message,
    refetch,
  }
}

export function useCreatorAnalytics(creatorId: string, enabled = true) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["creator-analytics", creatorId],
    queryFn: async () => {
      const response = await analyticsServiceClient.get(ENDPOINTS.ANALYTICS.CREATOR(creatorId))

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch creator analytics")
      }

      return response.data!
    },
    enabled: enabled && !!creatorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    analytics: data,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function useGMVAnalytics(params: {
  startDate: string
  endDate: string
  campaignId?: string
  creatorId?: string
  enabled?: boolean
}) {
  const { startDate, endDate, campaignId, creatorId, enabled = true } = params

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gmv-analytics", { startDate, endDate, campaignId, creatorId }],
    queryFn: async () => {
      const queryParams: Record<string, any> = {
        start_date: startDate,
        end_date: endDate,
      }

      if (campaignId) queryParams.campaign_id = campaignId
      if (creatorId) queryParams.creator_id = creatorId

      const response = await analyticsServiceClient.get(ENDPOINTS.ANALYTICS.GMV, queryParams)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch GMV analytics")
      }

      return response.data!
    },
    enabled: enabled && !!startDate && !!endDate,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time GMV
  })

  return {
    gmvData: data,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

// Real-time analytics hook using WebSocket
export function useRealTimeAnalytics(campaignId?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["real-time-analytics", campaignId],
    queryFn: async () => {
      const params = campaignId ? { campaign_id: campaignId } : {}

      const response = await analyticsServiceClient.get(ENDPOINTS.ANALYTICS.REAL_TIME, params)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch real-time analytics")
      }

      return response.data!
    },
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
    staleTime: 0, // Always consider stale for real-time data
  })

  return {
    realTimeData: data,
    loading: isLoading,
    error: error?.message,
  }
}
