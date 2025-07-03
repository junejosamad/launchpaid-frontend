"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { campaignServiceClient } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/config"
import type { Campaign, Application, CampaignFilters, PaginatedResult, CampaignFormData } from "@/lib/types/api"

interface UseCampaignsOptions extends CampaignFilters {
  page?: number
  limit?: number
  enabled?: boolean
}

export function useCampaigns(options: UseCampaignsOptions = {}) {
  const {
    status,
    category,
    budgetRange,
    dateRange,
    search,
    agencyId,
    brandId,
    page = 1,
    limit = 12,
    enabled = true,
  } = options

  const queryKey = ["campaigns", { status, category, budgetRange, dateRange, search, agencyId, brandId, page, limit }]

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, any> = {
        page,
        limit,
      }

      if (status?.length) params.status = status.join(",")
      if (category?.length) params.category = category.join(",")
      if (budgetRange) {
        params.min_budget = budgetRange[0]
        params.max_budget = budgetRange[1]
      }
      if (dateRange) {
        params.start_date = dateRange[0]
        params.end_date = dateRange[1]
      }
      if (search) params.search = search
      if (agencyId) params.agency_id = agencyId
      if (brandId) params.brand_id = brandId

      const response = await campaignServiceClient.get<PaginatedResult<Campaign>>(ENDPOINTS.CAMPAIGNS.LIST, params)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch campaigns")
      }

      return response.data!
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    campaigns: data?.data || [],
    pagination: data?.pagination,
    loading: isLoading,
    fetching: isFetching,
    error: error?.message,
    refetch,
  }
}

export function useCampaign(campaignId: string, enabled = true) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: async () => {
      const response = await campaignServiceClient.get<Campaign>(ENDPOINTS.CAMPAIGNS.GET(campaignId))

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch campaign")
      }

      return response.data!
    },
    enabled: enabled && !!campaignId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  return {
    campaign: data,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function useCampaignApplications(campaignId: string, enabled = true) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["campaign-applications", campaignId],
    queryFn: async () => {
      const response = await campaignServiceClient.get<Application[]>(ENDPOINTS.CAMPAIGNS.APPLICATIONS(campaignId))

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch applications")
      }

      return response.data!
    },
    enabled: enabled && !!campaignId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })

  return {
    applications: data || [],
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function useCampaignMutations() {
  const queryClient = useQueryClient()

  const createCampaign = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      const response = await campaignServiceClient.post<Campaign>(ENDPOINTS.CAMPAIGNS.CREATE, data)

      if (!response.success) {
        throw new Error(response.error || "Failed to create campaign")
      }

      return response.data!
    },
    onSuccess: (newCampaign) => {
      // Invalidate campaigns list
      queryClient.invalidateQueries({ queryKey: ["campaigns"] })

      // Add to cache
      queryClient.setQueryData(["campaign", newCampaign.id], newCampaign)
    },
  })

  const updateCampaign = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CampaignFormData> }) => {
      const response = await campaignServiceClient.put<Campaign>(ENDPOINTS.CAMPAIGNS.UPDATE(id), data)

      if (!response.success) {
        throw new Error(response.error || "Failed to update campaign")
      }

      return response.data!
    },
    onSuccess: (updatedCampaign) => {
      // Update cache
      queryClient.setQueryData(["campaign", updatedCampaign.id], updatedCampaign)

      // Invalidate campaigns list
      queryClient.invalidateQueries({ queryKey: ["campaigns"] })
    },
  })

  const deleteCampaign = useMutation({
    mutationFn: async (campaignId: string) => {
      const response = await campaignServiceClient.delete(ENDPOINTS.CAMPAIGNS.DELETE(campaignId))

      if (!response.success) {
        throw new Error(response.error || "Failed to delete campaign")
      }

      return campaignId
    },
    onSuccess: (campaignId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ["campaign", campaignId] })

      // Invalidate campaigns list
      queryClient.invalidateQueries({ queryKey: ["campaigns"] })
    },
  })

  const applyCampaign = useMutation({
    mutationFn: async (data: { campaignId: string; proposedContent: any }) => {
      const response = await campaignServiceClient.post<Application>(ENDPOINTS.CAMPAIGNS.APPLY, data)

      if (!response.success) {
        throw new Error(response.error || "Failed to apply to campaign")
      }

      return response.data!
    },
    onSuccess: (application) => {
      // Invalidate campaign applications
      queryClient.invalidateQueries({
        queryKey: ["campaign-applications", application.campaignId],
      })

      // Invalidate user applications
      queryClient.invalidateQueries({ queryKey: ["user-applications"] })
    },
  })

  const reviewApplication = useMutation({
    mutationFn: async ({
      applicationId,
      status,
      rejectionReason,
    }: {
      applicationId: string
      status: "approved" | "rejected"
      rejectionReason?: string
    }) => {
      const response = await campaignServiceClient.put<Application>(
        ENDPOINTS.CAMPAIGNS.REVIEW_APPLICATION(applicationId),
        { status, rejectionReason },
      )

      if (!response.success) {
        throw new Error(response.error || "Failed to review application")
      }

      return response.data!
    },
    onSuccess: (application) => {
      // Invalidate campaign applications
      queryClient.invalidateQueries({
        queryKey: ["campaign-applications", application.campaignId],
      })

      // Update individual application cache
      queryClient.setQueryData(["application", application.id], application)
    },
  })

  return {
    createCampaign: {
      mutate: createCampaign.mutate,
      mutateAsync: createCampaign.mutateAsync,
      isLoading: createCampaign.isPending,
      error: createCampaign.error?.message,
      isSuccess: createCampaign.isSuccess,
      reset: createCampaign.reset,
    },
    updateCampaign: {
      mutate: updateCampaign.mutate,
      mutateAsync: updateCampaign.mutateAsync,
      isLoading: updateCampaign.isPending,
      error: updateCampaign.error?.message,
      isSuccess: updateCampaign.isSuccess,
      reset: updateCampaign.reset,
    },
    deleteCampaign: {
      mutate: deleteCampaign.mutate,
      mutateAsync: deleteCampaign.mutateAsync,
      isLoading: deleteCampaign.isPending,
      error: deleteCampaign.error?.message,
      isSuccess: deleteCampaign.isSuccess,
      reset: deleteCampaign.reset,
    },
    applyCampaign: {
      mutate: applyCampaign.mutate,
      mutateAsync: applyCampaign.mutateAsync,
      isLoading: applyCampaign.isPending,
      error: applyCampaign.error?.message,
      isSuccess: applyCampaign.isSuccess,
      reset: applyCampaign.reset,
    },
    reviewApplication: {
      mutate: reviewApplication.mutate,
      mutateAsync: reviewApplication.mutateAsync,
      isLoading: reviewApplication.isPending,
      error: reviewApplication.error?.message,
      isSuccess: reviewApplication.isSuccess,
      reset: reviewApplication.reset,
    },
  }
}

// Hook for real-time campaign updates
export function useRealTimeCampaigns(campaignIds: string[]) {
  const queryClient = useQueryClient()
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    if (!campaignIds.length) return

    const ws = new WebSocket(`ws://localhost:8002/ws/campaigns`)

    ws.onopen = () => {
      console.log("Connected to campaign updates")
      // Subscribe to specific campaigns
      ws.send(
        JSON.stringify({
          type: "subscribe",
          campaigns: campaignIds,
        }),
      )
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.type === "campaign_update") {
        // Update campaign cache
        queryClient.setQueryData(["campaign", message.campaignId], message.data)

        // Invalidate campaigns list to trigger refetch
        queryClient.invalidateQueries({ queryKey: ["campaigns"] })
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    ws.onclose = () => {
      console.log("Disconnected from campaign updates")
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [campaignIds, queryClient])

  return socket
}
