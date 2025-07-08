// hooks/useApplications.ts
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types matching your backend schemas
export interface Application {
  id: string
  creator_id: string
  campaign_id: string
  status: 'pending' | 'approved' | 'rejected'
  previous_gmv?: number
  engagement_rate?: number
  application_message?: string
  applied_at: string
  reviewed_at?: string
  reviewer_id?: string
  review_notes?: string
  creator?: {
    id: string
    username: string
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    avatar?: string
    profile_completion?: number
    total_followers?: number
    tiktok_handle?: string
    tiktok_followers?: number
    instagram_handle?: string
    instagram_followers?: number
    youtube_handle?: string
    youtube_followers?: number
    audience_gender?: { male: number; female: number }
    primary_age?: string
    location?: string
    age?: number
    ethnicity?: string
    niche?: string
    shipping_address?: string
  }
  campaign?: {
    id: string
    name: string
    status: string
    description?: string
  }
}

export interface ApplicationFilters {
  status?: string
  campaign_id?: string
  search?: string
  limit?: number
  offset?: number
}

// API functions
const api = {
  // Get applications for campaign (agency/brand view)
  getCampaignApplications: async (campaignId: string, filters?: ApplicationFilters): Promise<Application[]> => {
    const params = new URLSearchParams()
    if (filters?.status && filters.status !== 'All') params.append('status_filter', filters.status)
    if (filters?.limit) params.append('limit', filters.limit.toString())
    if (filters?.offset) params.append('offset', filters.offset.toString())
    
    const url = `/api/v1/applications/campaign/${campaignId}${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications')
    }
    
    return response.json()
  },

  // Get creator's own applications
  getMyApplications: async (): Promise<Application[]> => {
    const response = await fetch('/api/v1/applications/my-applications', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch my applications')
    }
    
    return response.json()
  },

  // Review application (approve/reject)
  reviewApplication: async (applicationId: string, reviewData: {
    status: 'approved' | 'rejected'
    review_notes?: string
  }): Promise<Application> => {
    const response = await fetch(`/api/v1/applications/${applicationId}/review`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to review application')
    }
    
    return response.json()
  },

  // Apply to campaign (creator action)
  applyToCampaign: async (applicationData: {
    campaign_id: string
    application_message?: string
    previous_gmv?: number
    engagement_rate?: number
  }): Promise<Application> => {
    const response = await fetch('/api/v1/applications/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to apply to campaign')
    }
    
    return response.json()
  },

  // Get campaigns for applications page
  getCampaigns: async (): Promise<Array<{id: string, name: string, status: string}>> => {
    const response = await fetch('/api/v1/campaigns/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns')
    }
    
    const data = await response.json()
    return data.campaigns || data
  }
}

// Custom hooks
export function useCampaignApplications(campaignId: string, filters?: ApplicationFilters) {
  return useQuery({
    queryKey: ['applications', 'campaign', campaignId, filters],
    queryFn: () => api.getCampaignApplications(campaignId, filters),
    enabled: !!campaignId,
  })
}

export function useMyApplications() {
  return useQuery({
    queryKey: ['applications', 'my'],
    queryFn: api.getMyApplications,
  })
}

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: api.getCampaigns,
  })
}

export function useReviewApplication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ applicationId, reviewData }: {
      applicationId: string
      reviewData: { status: 'approved' | 'rejected'; review_notes?: string }
    }) => api.reviewApplication(applicationId, reviewData),
    onSuccess: () => {
      // Invalidate and refetch applications
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })
}

export function useApplyToCampaign() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: api.applyToCampaign,
    onSuccess: () => {
      // Invalidate and refetch applications
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })
}

// Bulk operations hook
export function useBulkReviewApplications() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ applicationIds, action, notes }: {
      applicationIds: string[]
      action: 'approved' | 'rejected'
      notes?: string
    }) => {
      const promises = applicationIds.map(id => 
        api.reviewApplication(id, { status: action, review_notes: notes })
      )
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })
}

// Statistics hook
export function useApplicationStats(campaignId?: string) {
  return useQuery({
    queryKey: ['applications', 'stats', campaignId],
    queryFn: async () => {
      // This would call your dashboard analytics endpoint
      const response = await fetch('/api/v1/dashboard/analytics', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      
      return response.json()
    },
  })
}