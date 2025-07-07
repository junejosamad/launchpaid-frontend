
import { useState, useEffect } from "react"
import { userServiceClient } from '@/lib/api/client'

// hooks/useCampaigns.ts
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

      const params: Record<string, any> = { limit, offset }
      if (status) params.status = status

      const response = await userServiceClient.get<Campaign[]>(
        "/api/v1/dashboard/campaigns",
        params
      )

      if (response.success && response.data) {
        setCampaigns(response.data)
      } else {
        throw new Error(response.error || "Failed to fetch campaigns")
      }
    } catch (err: any) {
      setError(err.message)
      console.error("Campaigns fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const createCampaign = async (campaignData: {
    name: string
    description?: string
    type?: string
    budget?: number
    target_gmv?: number
    target_creators?: number
    target_posts?: number
    start_date?: string
    end_date?: string
  }) => {
    try {
      const response = await userServiceClient.post<Campaign>(
        "/api/v1/dashboard/campaigns",
        campaignData
      )

      if (response.success && response.data) {
        setCampaigns(prev => [response.data!, ...prev])
        return response.data
      } else {
        throw new Error(response.error || "Failed to create campaign")
      }
    } catch (err: any) {
      setError(err.message)
      throw err
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
    createCampaign,
  }
}
