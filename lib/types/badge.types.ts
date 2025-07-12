// types/badge.types.ts

export interface Badge {
  id: string;
  badge_type: string;
  name: string;
  description: string;
  tier: string;
  gmv_requirement: number;
  status: 'earned' | 'in-progress' | 'locked';
  progress: number;
  earned_date: string | null;
  icon: string;
  color: string;
  bg_color: string;
}

export interface BadgeProgress {
  creator_id: string;
  current_gmv: number;
  total_badges_earned: number;
  total_badges_available: number;
  next_badge_type: string | null;
  next_badge_name: string | null;
  next_badge_threshold: number | null;
  progress_percentage: number;
  remaining_gmv: number;
  current_badge_type: string | null;
  current_badge_name: string | null;
}

export interface BadgeHistory {
  date: string;
  badge_name: string;
  badge_type: string;
  gmv_at_time: number;
  message: string;
  icon: string;
  color: string;
}

export interface BadgeShowcase {
  featured_badges: Badge[];
  total_earned: number;
  highest_tier: string | null;
  recent_achievement: BadgeHistory | null;
}

export interface BadgeStats {
  total_badges_earned: number;
  creators_with_badges: number;
  badge_distribution: {
    [key: string]: {
      count: number;
      percentage: number;
      name: string;
    };
  };
}

export interface BadgePaceEstimate {
  badge_type: string;
  badge_name: string;
  is_achieved: boolean;
  current_gmv: number;
  target_gmv: number;
  remaining_gmv: number | null;
  days_to_achieve: number | null;
  estimated_date: string | null;
  daily_average_needed: number;
  current_daily_average: number;
  confidence_level: string;
  pace_breakdown: {
    [key: string]: number;
  } | null;
}

export interface BadgeLeaderboard {
  creator_id: string;
  username: string;
  total_gmv: number;
  badges_earned: number;
  highest_badge: string | null;
  badges: string[];
}