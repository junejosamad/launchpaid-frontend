// hooks/useRewardsData.ts

import { useCallback, useEffect, useState } from 'react';
import { 
  useBadges, 
  useCreatorBadges,
  useBadgeProgress, 
  useBadgeHistory, 
  useBadgeShowcase,
  useBadgeLeaderboard 
} from './useBadges';

// Combined hook for rewards page data
export const useRewardsData = () => {
  const badges = useBadges();  // All available badges
  const creatorBadges = useCreatorBadges();  // Current user's badges
  const progress = useBadgeProgress();
  const history = useBadgeHistory();
  const showcase = useBadgeShowcase();
  const leaderboard = useBadgeLeaderboard(10);

  // Combined loading state
  const isLoading = 
    badges.loading || 
    creatorBadges.loading ||
    progress.loading || 
    history.loading || 
    showcase.loading ||
    leaderboard.loading;

  // Combined error state
  const hasError = 
    badges.error || 
    creatorBadges.error ||
    progress.error || 
    history.error || 
    showcase.error ||
    leaderboard.error;

  // Refetch all data
  const refetchAll = useCallback(async () => {
    await Promise.all([
      badges.refetch(),
      creatorBadges.refetch(),
      progress.refetch(),
      history.refetch(),
      showcase.refetch(),
      leaderboard.refetch()
    ]);
  }, [badges, creatorBadges, progress, history, showcase, leaderboard]);

  // Merge all badges with creator's earned status
  const mergedBadges = badges.badges.map(badge => {
    const earnedBadge = creatorBadges.badges.find(cb => cb.badge_type === badge.badge_type);
    if (earnedBadge) {
      return earnedBadge;
    }
    return {
      ...badge,
      status: 'locked' as const,
      progress: 0
    };
  });

  // Transform data for the UI
  const transformedData = {
    // All badges with progress
    allBadges: mergedBadges,
    
    // Current user progress
    currentGMV: progress.progress?.current_gmv || 0,
    totalEarned: progress.progress?.total_badges_earned || 0,
    nextBadge: progress.progress?.next_badge_name || null,
    progressToNext: progress.progress?.progress_percentage || 0,
    remainingGMV: progress.progress?.remaining_gmv || 0,
    
    // Achievement history
    achievements: history.history || [],
    
    // Featured badges
    featuredBadges: showcase.showcase?.featured_badges || [],
    highestTier: showcase.showcase?.highest_tier || null,
    recentAchievement: showcase.showcase?.recent_achievement || null,
    
    // Leaderboard
    topCreators: leaderboard.leaderboard || []
  };

  return {
    data: transformedData,
    isLoading,
    hasError,
    errors: {
      badges: badges.error,
      creatorBadges: creatorBadges.error,
      progress: progress.error,
      history: history.error,
      showcase: showcase.error,
      leaderboard: leaderboard.error
    },
    refetchAll
  };
};

// Hook for individual badge details
export const useBadgeDetails = (badgeType: string) => {
  const [badgeDetails, setBadgeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This would fetch specific badge details if needed
    // For now, we can derive this from the badges list
  }, [badgeType]);

  return { badgeDetails, loading, error };
};