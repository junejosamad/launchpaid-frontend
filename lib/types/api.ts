// Core API Types
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: "creator" | "agency" | "brand" | "admin"
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
  profile?: CreatorProfile | AgencyProfile | BrandProfile
}

export interface CreatorProfile {
  id: string
  userId: string
  bio: string
  socialMediaHandles: {
    tiktok?: string
    instagram?: string
    youtube?: string
    twitter?: string
  }
  followerCounts: {
    tiktok?: number
    instagram?: number
    youtube?: number
    twitter?: number
  }
  categories: string[]
  location: string
  languages: string[]
  averageEngagementRate: number
  totalGMV: number
  completedCampaigns: number
  rating: number
  isAvailable: boolean
  portfolioItems: PortfolioItem[]
}

export interface AgencyProfile {
  id: string
  userId: string
  companyName: string
  description: string
  website?: string
  logo?: string
  teamSize: number
  establishedYear: number
  specializations: string[]
  totalCreators: number
  totalCampaigns: number
  totalGMV: number
}

export interface BrandProfile {
  id: string
  userId: string
  companyName: string
  industry: string
  website: string
  logo?: string
  description: string
  targetAudience: string[]
  averageCampaignBudget: number
  totalCampaigns: number
  totalSpent: number
}

export interface PortfolioItem {
  id: string
  creatorId: string
  title: string
  description: string
  mediaUrl: string
  mediaType: "image" | "video"
  platform: string
  metrics: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
    engagementRate?: number
  }
  createdAt: string
}

// Campaign Types
export interface Campaign {
  id: string
  title: string
  description: string
  brand: {
    id: string
    name: string
    logo?: string
  }
  agency?: {
    id: string
    name: string
  }
  status: "draft" | "active" | "paused" | "completed" | "cancelled"
  category: string
  startDate: string
  endDate: string
  applicationDeadline: string
  budget: number
  currency: string
  payoutStructure: {
    type: "per-post" | "gmv" | "hybrid"
    baseRate?: number
    commissionRate?: number
    bonusTiers?: BonusTier[]
  }
  requirements: {
    deliverables: Deliverable[]
    targetAudience: string[]
    contentGuidelines: string
    hashtags: string[]
    mentions: string[]
    minimumFollowers?: number
    minimumEngagementRate?: number
    allowedPlatforms: string[]
  }
  capacity: {
    total: number
    filled: number
    pending: number
  }
  metrics: {
    totalApplications: number
    approvedCreators: number
    totalPosts: number
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    totalGMV: number
    averageEngagementRate: number
  }
  createdAt: string
  updatedAt: string
}

export interface BonusTier {
  id: string
  name: string
  threshold: number
  thresholdType: "gmv" | "views" | "engagement"
  reward: number
  rewardType: "fixed" | "percentage"
}

export interface Deliverable {
  id: string
  type: "post" | "story" | "reel" | "video"
  platform: string
  quantity: number
  description: string
  dueDate?: string
  requirements: string[]
}

// Application Types
export interface Application {
  id: string
  campaignId: string
  creatorId: string
  status: "pending" | "approved" | "rejected" | "withdrawn"
  appliedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
  proposedContent: {
    description: string
    mediaUrls: string[]
    estimatedReach: number
    estimatedEngagement: number
  }
  creator: {
    id: string
    username: string
    firstName: string
    lastName: string
    avatar?: string
    followerCount: number
    engagementRate: number
    categories: string[]
  }
  campaign: {
    id: string
    title: string
    brand: string
    budget: number
  }
}

// Analytics Types
export interface DashboardAnalytics {
  overview: {
    totalCampaigns: number
    activeCampaigns: number
    totalCreators: number
    totalGMV: number
    totalViews: number
    totalEngagement: number
    averageEngagementRate: number
    totalPayouts: number
  }
  trends: {
    gmvGrowth: number
    creatorGrowth: number
    campaignGrowth: number
    engagementGrowth: number
  }
  topPerformers: {
    campaigns: TopCampaign[]
    creators: TopCreator[]
  }
  recentActivity: ActivityItem[]
}

export interface TopCampaign {
  id: string
  title: string
  brand: string
  gmv: number
  engagement: number
  creators: number
}

export interface TopCreator {
  id: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  gmv: number
  engagement: number
  campaigns: number
}

export interface ActivityItem {
  id: string
  type: "campaign_created" | "application_submitted" | "creator_approved" | "payout_processed"
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface CampaignAnalytics {
  campaignId: string
  overview: {
    totalCreators: number
    totalPosts: number
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    totalGMV: number
    averageEngagementRate: number
    conversionRate: number
  }
  performance: {
    dailyMetrics: DailyMetric[]
    topPosts: TopPost[]
    creatorPerformance: CreatorPerformance[]
  }
  demographics: {
    ageGroups: AgeGroup[]
    genderDistribution: GenderDistribution
    locationDistribution: LocationDistribution[]
  }
}

export interface DailyMetric {
  date: string
  views: number
  likes: number
  comments: number
  shares: number
  gmv: number
  posts: number
}

export interface TopPost {
  id: string
  creatorId: string
  creatorUsername: string
  mediaUrl: string
  caption: string
  views: number
  likes: number
  comments: number
  shares: number
  gmv: number
  engagementRate: number
  postedAt: string
}

export interface CreatorPerformance {
  creatorId: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  posts: number
  views: number
  likes: number
  comments: number
  shares: number
  gmv: number
  engagementRate: number
  conversionRate: number
}

export interface AgeGroup {
  range: string
  percentage: number
  count: number
}

export interface GenderDistribution {
  male: number
  female: number
  other: number
}

export interface LocationDistribution {
  country: string
  percentage: number
  count: number
}

// Payment Types
export interface PaymentOverview {
  totalEarnings: number
  pendingPayouts: number
  processedPayouts: number
  nextPayoutDate: string
  paymentMethods: PaymentMethod[]
  recentTransactions: Transaction[]
}

export interface PaymentMethod {
  id: string
  type: "bank_account" | "paypal" | "stripe"
  isDefault: boolean
  details: {
    accountNumber?: string
    routingNumber?: string
    email?: string
    last4?: string
  }
  isVerified: boolean
}

export interface Transaction {
  id: string
  type: "payout" | "bonus" | "refund" | "fee"
  amount: number
  currency: string
  status: "pending" | "processing" | "completed" | "failed"
  description: string
  campaignId?: string
  campaignTitle?: string
  createdAt: string
  processedAt?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: "campaign_invite" | "application_status" | "payout_processed" | "system_announcement"
  title: string
  message: string
  isRead: boolean
  actionUrl?: string
  metadata?: Record<string, any>
  createdAt: string
}

// WebSocket Types
export interface WebSocketMessage {
  type: "notification" | "metric_update" | "status_change" | "real_time_data"
  payload: any
  timestamp: string
}

export interface RealTimeMetric {
  campaignId?: string
  creatorId?: string
  metric: string
  value: number
  change: number
  timestamp: string
}

// Filter and Search Types
export interface CampaignFilters {
  status?: Campaign["status"][]
  category?: string[]
  budgetRange?: [number, number]
  dateRange?: [string, string]
  search?: string
  agencyId?: string
  brandId?: string
}

export interface CreatorFilters {
  categories?: string[]
  followerRange?: [number, number]
  engagementRange?: [number, number]
  location?: string[]
  languages?: string[]
  availability?: boolean
  search?: string
}

export interface ApplicationFilters {
  status?: Application["status"][]
  campaignId?: string
  creatorId?: string
  dateRange?: [string, string]
  search?: string
}

// Pagination Types
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form Types
export interface CampaignFormData {
  title: string
  description: string
  category: string
  startDate: string
  endDate: string
  applicationDeadline: string
  budget: number
  payoutStructure: Campaign["payoutStructure"]
  requirements: Campaign["requirements"]
  capacity: number
}

export interface CreatorApplicationData {
  campaignId: string
  proposedContent: Application["proposedContent"]
  additionalNotes?: string
}

export interface ProfileUpdateData {
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: File
  socialMediaHandles?: Record<string, string>
  categories?: string[]
  location?: string
  languages?: string[]
}
