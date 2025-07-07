// hooks/useCampaigns.ts - Complete campaigns hook

import { useState, useEffect } from 'react'
import { campaignServiceClient } from '@/lib/api/client'
import type { ApiResponse } from '@/lib/api/client'

// Campaign type definition
export interface Campaign {
  id: string
  name: string
  description?: string
  brand_id: string
  brand_name?: string
  brand_logo?: string
  agency_id: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  start_date: string
  end_date: string
  budget?: number
  category?: string
  visibility?: string
  min_followers?: number
  current_gmv?: number
  gmv_target?: number
  completed_deliverables?: number
  total_deliverables?: number
  created_at: string
  updated_at: string
}

// Main hook for fetching campaigns
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

      console.log('🚀 Fetching campaigns...')

      // Build params object
      const params: Record<string, string | number> = { 
        limit, 
        offset 
      }
      
      if (status) params.status = status

      console.log('📋 Request params:', params)

      // Use the correct endpoint
      const response: ApiResponse<Campaign[]> = await campaignServiceClient.get(
        '/api/v1/campaigns',
        params
      )

      console.log('📡 Campaigns response:', response)

      if (response.success && response.data) {
        console.log('✅ Successfully fetched campaigns:', response.data)
        setCampaigns(response.data)
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

  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      const response: ApiResponse<Campaign> = await campaignServiceClient.post(
        '/api/v1/campaigns',
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

// Hook for fetching a single campaign
export function useCampaign(campaignId: string | null) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaign = async () => {
    if (!campaignId) return

    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<Campaign> = await campaignServiceClient.get(
        `/api/v1/campaigns/${campaignId}`
      )

      if (response.success && response.data) {
        setCampaign(response.data)
      } else {
        setError(response.error || 'Failed to fetch campaign')
        setCampaign(null)
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred')
      setCampaign(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
    }
  }, [campaignId])

  return {
    campaign,
    loading,
    error,
    refetch: fetchCampaign
  }
}

// Hook for campaign applications
export function useCampaignApplications(campaignId?: string) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)

      const endpoint = campaignId 
        ? `/api/v1/applications/campaign/${campaignId}`
        : '/api/v1/applications'

      const response: ApiResponse<any[]> = await campaignServiceClient.get(endpoint)

      if (response.success && response.data) {
        setApplications(response.data)
      } else {
        setError(response.error || 'Failed to fetch applications')
        setApplications([])
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred')
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [campaignId])

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications
  }
}

// Hook for creator's campaigns
export function useCreatorCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreatorCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      // This endpoint should return campaigns the creator is part of
      const response: ApiResponse<Campaign[]> = await campaignServiceClient.get(
        '/api/v1/campaigns/my-campaigns'
      )

      if (response.success && response.data) {
        setCampaigns(response.data)
      } else {
        setError(response.error || 'Failed to fetch your campaigns')
        setCampaigns([])
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred')
      setCampaigns([])
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