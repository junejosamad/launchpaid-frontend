// hooks/useApplications.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { campaignServiceClient } from '@/lib/api/client'
import { API_CONFIG } from '@/lib/api/config'

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
  rejection_reason?: string
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

export interface ReviewData {
  status: 'approved' | 'rejected'
  rejection_reason?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface ApplicationsResponse {
  applications?: Application[]
  data?: Application[]
  [key: string]: any
}

interface CampaignsResponse {
  campaigns?: Array<{id: string, name: string, status: string}>
  data?: Array<{id: string, name: string, status: string}>
  [key: string]: any
}

// Get the auth token
const getAuthToken = () => {
  // Check multiple possible storage locations
  const token = localStorage.getItem('auth_token') || 
                localStorage.getItem('access_token') ||
                sessionStorage.getItem('auth_token') ||
                sessionStorage.getItem('access_token')
  return token
}

// API functions using campaignServiceClient
const api = {
  // Get applications for campaign (agency/brand view)
  getCampaignApplications: async (campaignId: string, filters?: ApplicationFilters): Promise<Application[]> => {
    const params: Record<string, string> = {}
    if (filters?.status && filters.status !== 'All') params.status_filter = filters.status
    if (filters?.limit) params.limit = filters.limit.toString()
    if (filters?.offset) params.offset = filters.offset.toString()
    
    const response = await campaignServiceClient.get<ApplicationsResponse>(`/api/v1/applications/campaign/${campaignId}`, params)
    
    if (response.success && response.data) {
      const data = response.data as ApplicationsResponse
      // Handle different response formats
      if (Array.isArray(data)) {
        return data
      } else if (data.applications && Array.isArray(data.applications)) {
        return data.applications
      } else if (data.data && Array.isArray(data.data)) {
        return data.data
      }
      return []
    }
    
    throw new Error(response.error || 'Failed to fetch applications')
  },

  // Review application (approve/reject)
  reviewApplication: async (applicationId: string, reviewData: ReviewData): Promise<Application> => {
    const response = await campaignServiceClient.put<Application>(
      `/api/v1/applications/${applicationId}/review`, 
      reviewData
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.error || 'Failed to review application')
  },

  // Get campaigns for applications page
  getCampaigns: async (): Promise<Array<{id: string, name: string, status: string}>> => {
    const response = await campaignServiceClient.get<CampaignsResponse>('/api/v1/campaigns/', {
      status: 'active',
      limit: 100
    })
    
    if (response.success && response.data) {
      const data = response.data as CampaignsResponse
      // Handle different response formats
      if (Array.isArray(data)) {
        return data
      } else if (data.campaigns && Array.isArray(data.campaigns)) {
        return data.campaigns
      } else if (data.data && Array.isArray(data.data)) {
        return data.data
      }
      return []
    }
    
    throw new Error(response.error || 'Failed to fetch campaigns')
  },

  // Get creator's own applications
  getMyApplications: async (): Promise<Application[]> => {
    const response = await campaignServiceClient.get<ApplicationsResponse>('/api/v1/applications/my-applications')
    
    if (response.success && response.data) {
      const data = response.data as ApplicationsResponse
      if (Array.isArray(data)) {
        return data
      } else if (data.applications && Array.isArray(data.applications)) {
        return data.applications
      } else if (data.data && Array.isArray(data.data)) {
        return data.data
      }
      return []
    }
    
    throw new Error(response.error || 'Failed to fetch my applications')
  },

  // Apply to campaign (creator action)
  applyToCampaign: async (applicationData: {
    campaign_id: string
    application_message?: string
    previous_gmv?: number
    engagement_rate?: number
  }): Promise<Application> => {
    const response = await campaignServiceClient.post<Application>('/api/v1/applications/', {
      campaign_id: applicationData.campaign_id,
      application_data: {
        message: applicationData.application_message,
        previous_gmv: applicationData.previous_gmv,
        engagement_rate: applicationData.engagement_rate
      }
    })
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.error || 'Failed to apply to campaign')
  },
}

// Custom hooks
export function useCampaignApplications(campaignId: string, filters?: ApplicationFilters) {
  return useQuery({
    queryKey: ['applications', 'campaign', campaignId, filters],
    queryFn: () => api.getCampaignApplications(campaignId, filters),
    enabled: !!campaignId,
    staleTime: 30000, // Consider data stale after 30 seconds
    gcTime: 300000, // Keep in cache for 5 minutes (formerly cacheTime)
  })
}

export function useMyApplications() {
  return useQuery({
    queryKey: ['applications', 'my'],
    queryFn: api.getMyApplications,
    staleTime: 30000,
    gcTime: 300000,
  })
}

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: api.getCampaigns,
    staleTime: 60000, // Consider campaigns stale after 1 minute
    gcTime: 600000, // Keep in cache for 10 minutes
  })
}

export function useReviewApplication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ applicationId, reviewData }: {
      applicationId: string
      reviewData: ReviewData
    }) => api.reviewApplication(applicationId, reviewData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch applications
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      
      // Optionally update the cache directly for immediate UI update
      queryClient.setQueryData(
        ['applications', 'campaign', data.campaign_id],
        (oldData: Application[] | undefined) => {
          if (!oldData) return oldData
          return oldData.map(app => 
            app.id === data.id ? data : app
          )
        }
      )
    },
    onError: (error) => {
      console.error('Failed to review application:', error)
    }
  })
}

export function useApplyToCampaign() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: api.applyToCampaign,
    onSuccess: () => {
      // Invalidate and refetch applications
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
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
      // Process applications in parallel but with a limit to avoid overwhelming the server
      const batchSize = 5
      const results = []
      
      for (let i = 0; i < applicationIds.length; i += batchSize) {
        const batch = applicationIds.slice(i, i + batchSize)
        const batchPromises = batch.map(id => 
          api.reviewApplication(id, { 
            status: action, 
            rejection_reason: action === 'rejected' ? notes : undefined 
          })
        )
        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults)
      }
      
      return results
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onError: (error) => {
      console.error('Failed to bulk review applications:', error)
    }
  })
}

// Statistics hook (if you have a stats endpoint)
export function useApplicationStats(campaignId?: string) {
  return useQuery({
    queryKey: ['applications', 'stats', campaignId],
    queryFn: async () => {
      // If you don't have a dedicated stats endpoint, calculate from applications
      if (campaignId) {
        const applications = await api.getCampaignApplications(campaignId)
        return {
          total: applications.length,
          pending: applications.filter(a => a.status === 'pending').length,
          approved: applications.filter(a => a.status === 'approved').length,
          rejected: applications.filter(a => a.status === 'rejected').length,
          approvalRate: applications.length > 0 
            ? (applications.filter(a => a.status === 'approved').length / applications.length) * 100
            : 0
        }
      }
      
      // Return empty stats if no campaign selected
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        approvalRate: 0
      }
    },
    enabled: !!campaignId,
    staleTime: 30000,
  })
}

// Add this debug version to your useApplications.ts temporarily

// Review application (approve/reject) - DEBUG VERSION
reviewApplication: async (applicationId: string, reviewData: ReviewData): Promise<Application> => {
  console.log('🔍 DEBUG: Starting review application', {
    applicationId,
    reviewData,
    campaignServiceURL: API_CONFIG.SERVICES.CAMPAIGN_SERVICE
  })

  const endpoint = `/api/v1/applications/${applicationId}/review`
  const fullUrl = `${API_CONFIG.SERVICES.CAMPAIGN_SERVICE}${endpoint}`
  
  console.log('🔍 DEBUG: Making request to:', fullUrl)
  
  const response = await campaignServiceClient.put<Application>(
    endpoint, 
    reviewData
  )
  
  console.log('🔍 DEBUG: Response received:', response)
  
  if (response.success && response.data) {
    console.log('✅ DEBUG: Review successful')
    return response.data
  }
  
  console.error('❌ DEBUG: Review failed:', response.error)
  throw new Error(response.error || 'Failed to review application')
}