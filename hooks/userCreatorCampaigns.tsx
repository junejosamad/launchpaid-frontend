// hooks/useCreatorCampaigns.ts
import { useState, useEffect } from 'react'
import { campaignServiceClient } from '@/lib/api/client'
import type { ApiResponse } from '@/lib/api/client'

export interface CreatorCampaign {
  id: string
  applicationId: string
  campaign: {
    id: string
    name: string
    description: string
    brand_name?: string
    thumbnail_url?: string
    status: string
    start_date: string
    end_date: string
    target_gmv?: number
    current_gmv?: number
    min_deliverables_per_creator?: number
    current_posts?: number
    total_views?: number
    total_engagement?: number
  }
  deliverables: any[]
  status: string
  applied_at: string
}

export function useCreatorCampaigns() {
  const [campaigns, setCampaigns] = useState<CreatorCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreatorCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get creator's applications with campaign data
      const response: ApiResponse<any[]> = await campaignServiceClient.get(
        '/api/v1/applications/my-applications'
      )

      if (response.success && response.data) {
        // Transform to expected format
        const transformedCampaigns = response.data
          .filter((app: any) => app.status === 'approved')
          .map((app: any) => ({
            id: app.campaign_id,
            applicationId: app.id,
            campaign: app.campaign || {},
            deliverables: app.deliverables || [],
            status: app.status,
            applied_at: app.applied_at
          }))
        
        setCampaigns(transformedCampaigns)
      } else {
        setError(response.error || 'Failed to fetch your campaigns')
      }
    } catch (err: any) {
      console.error('Error fetching creator campaigns:', err)
      setError(err.message || 'Failed to load campaigns')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCreatorCampaigns()
  }, [])

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCreatorCampaigns
  }
}