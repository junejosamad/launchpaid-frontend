// components/campaign-card.tsx - Fixed version with null checks

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  ChevronRight 
} from 'lucide-react'

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    description?: string
    thumbnail_url?: string
    status: string
    start_date: string
    end_date: string
    current_gmv?: number
    target_gmv?: number
    current_creators?: number
    max_creators?: number
    payout_model: string
    base_payout_per_post?: number
    gmv_commission_rate?: number
  }
  onViewDetails?: (campaignId: string) => void
  onApply?: (campaignId: string) => void
}

export function CampaignCard({ campaign, onViewDetails, onApply }: CampaignCardProps) {
  // Debug log to see what data we're receiving
  console.log('CampaignCard received:', campaign)
  
  // Check if campaign exists
  if (!campaign) {
    console.error('CampaignCard received undefined campaign')
    return null
  }

  // Safely handle GMV values with defaults
  const gmv = campaign?.current_gmv || 0
  const target = campaign?.target_gmv || 0
  const gmvProgress = target > 0 ? (gmv / target) * 100 : 0

  // Safely handle creator counts
  const currentCreators = campaign.current_creators || 0
  const maxCreators = campaign.max_creators || 0
  const creatorProgress = maxCreators > 0 ? (currentCreators / maxCreators) * 100 : 0

  // Format dates safely
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Invalid date'
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    const lowerStatus = status?.toLowerCase() || 'unknown'
    switch (lowerStatus) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Format payout display
  const formatPayout = () => {
    if (!campaign.payout_model) {
      return 'Payout model not specified'
    }
    
    if (campaign.payout_model === 'fixed_per_post' && campaign.base_payout_per_post) {
      return `${campaign.base_payout_per_post.toFixed(2)} per post`
    } else if (campaign.payout_model === 'gmv_commission' && campaign.gmv_commission_rate) {
      return `${campaign.gmv_commission_rate}% commission`
    } else if (campaign.payout_model === 'hybrid') {
      const parts = []
      if (campaign.base_payout_per_post) {
        parts.push(`${campaign.base_payout_per_post.toFixed(2)}/post`)
      }
      if (campaign.gmv_commission_rate) {
        parts.push(`${campaign.gmv_commission_rate}% GMV`)
      }
      return parts.join(' + ') || 'Hybrid model'
    }
    return campaign.payout_model.replace(/_/g, ' ')
  }

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{campaign.name}</h3>
            {campaign.description && (
              <p className="text-sm text-gray-400 line-clamp-2">{campaign.description}</p>
            )}
          </div>
          <Badge className={getStatusColor(campaign.status)}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* GMV Progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-sm font-medium flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              GMV Generated
            </div>
            <div className="text-lg font-bold text-purple-400">
              ${gmv.toLocaleString()}
            </div>
          </div>
          {target > 0 && (
            <>
              <Progress value={gmvProgress} className="h-2 mb-1" />
              <div className="text-xs text-gray-400">
                Target: ${target.toLocaleString()} ({gmvProgress.toFixed(1)}%)
              </div>
            </>
          )}
        </div>

        {/* Creator Progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-sm font-medium flex items-center gap-1.5">
              <Users className="h-4 w-4 text-blue-400" />
              Creators
            </div>
            <div className="text-sm font-medium">
              {currentCreators}/{maxCreators || '∞'}
            </div>
          </div>
          {maxCreators > 0 && (
            <Progress value={creatorProgress} className="h-2" />
          )}
        </div>

        {/* Campaign Timeline */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(campaign.start_date)} - {formatDate(campaign.end_date)}</span>
        </div>

        {/* Payout Info */}
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-green-400" />
          <span className="text-gray-300">{formatPayout()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-700 hover:bg-gray-800"
              onClick={() => onViewDetails(campaign.id)}
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
          {onApply && campaign.status === 'active' && (
            <Button
              size="sm"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => onApply(campaign.id)}
            >
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}