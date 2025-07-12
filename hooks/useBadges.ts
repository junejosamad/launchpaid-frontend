// hooks/useBadges.ts

import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiError } from '@/lib/api/config';
import { 
  Badge, 
  BadgeProgress, 
  BadgeHistory, 
  BadgeShowcase, 
  BadgeStats,
  BadgePaceEstimate,
  BadgeLeaderboard 
} from '@/lib/types/badge.types';

// Helper to get current user ID
const getCurrentUserId = async (): Promise<string> => {
  try {
    const response = await apiClient.get('/api/v1/auth/profile');
    return response.data.id;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    throw error;
  }
};

// Hook to fetch all badges
export const useBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBadges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/v1/badges/');
      setBadges(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch badges',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  return { badges, loading, error, refetch: fetchBadges };
};

// Hook to fetch creator badges for current user
export const useCreatorBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCreatorBadges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await getCurrentUserId();
      const response = await apiClient.get(`/api/v1/badges/creator/${userId}`);
      setBadges(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch your badges',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCreatorBadges();
  }, [fetchCreatorBadges]);

  return { badges, loading, error, refetch: fetchCreatorBadges };
};

// Hook to fetch specific creator's badges by ID
export const useCreatorBadgesById = (creatorId: string) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCreatorBadges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/api/v1/badges/creator/${creatorId}`);
      setBadges(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch creator badges',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, [creatorId]);

  useEffect(() => {
    fetchCreatorBadges();
  }, [fetchCreatorBadges]);

  return { badges, loading, error, refetch: fetchCreatorBadges };
};

// Hook to fetch badge progress for current user
export const useBadgeProgress = () => {
  const [progress, setProgress] = useState<BadgeProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await getCurrentUserId();
      const response = await apiClient.get(`/api/v1/badges/creator/${userId}/progress`);
      setProgress(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch badge progress',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
};

// Hook to fetch badge history for current user
export const useBadgeHistory = () => {
  const [history, setHistory] = useState<BadgeHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await getCurrentUserId();
      const response = await apiClient.get(`/api/v1/badges/creator/${userId}/history`);
      setHistory(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch badge history',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};

// Hook to fetch badge showcase for current user
export const useBadgeShowcase = () => {
  const [showcase, setShowcase] = useState<BadgeShowcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchShowcase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await getCurrentUserId();
      const response = await apiClient.get(`/api/v1/badges/creator/${userId}/showcase`);
      setShowcase(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch badge showcase',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShowcase();
  }, [fetchShowcase]);

  return { showcase, loading, error, refetch: fetchShowcase };
};

// Hook to fetch badge stats
export const useBadgeStats = () => {
  const [stats, setStats] = useState<BadgeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/v1/badges/stats');
      setStats(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch badge stats',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

// Hook to fetch badge leaderboard
export const useBadgeLeaderboard = (limit: number = 10) => {
  const [leaderboard, setLeaderboard] = useState<BadgeLeaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/v1/badges/leaderboard', {
        params: { limit }
      });
      setLeaderboard(response.data);
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || 'Failed to fetch leaderboard',
        status: err.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
};