"use client"

import { useState, useEffect, useCallback } from "react"
import { integrationServiceClient } from "@/lib/api/client"
import { API_CONFIG } from "@/lib/api/config"
import type { Integration, IntegrationStatus } from "@/lib/types/api"

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIntegrations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await integrationServiceClient.get<Integration[]>(API_CONFIG.ENDPOINTS.INTEGRATIONS.GET_ALL)

      if (response.success && response.data) {
        setIntegrations(response.data)
      } else {
        throw new Error(response.message || "Failed to fetch integrations")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch integrations")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIntegrations()
  }, [fetchIntegrations])

  const connectIntegration = useCallback(async (integrationId: string, config: Record<string, any>) => {
    try {
      const response = await integrationServiceClient.post(
        API_CONFIG.ENDPOINTS.INTEGRATIONS.CONNECT.replace("{id}", integrationId),
        config,
      )

      if (response.success) {
        setIntegrations((prev) =>
          prev.map((integration) =>
            integration.id === integrationId ? { ...integration, status: "connected", config } : integration,
          ),
        )
        return { success: true }
      }

      throw new Error(response.message || "Connection failed")
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Connection failed",
      }
    }
  }, [])

  const disconnectIntegration = useCallback(async (integrationId: string) => {
    try {
      const response = await integrationServiceClient.post(
        API_CONFIG.ENDPOINTS.INTEGRATIONS.DISCONNECT.replace("{id}", integrationId),
      )

      if (response.success) {
        setIntegrations((prev) =>
          prev.map((integration) =>
            integration.id === integrationId ? { ...integration, status: "disconnected" } : integration,
          ),
        )
        return { success: true }
      }

      throw new Error(response.message || "Disconnection failed")
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Disconnection failed",
      }
    }
  }, [])

  const syncIntegration = useCallback(async (integrationId: string) => {
    try {
      const response = await integrationServiceClient.post(
        API_CONFIG.ENDPOINTS.INTEGRATIONS.SYNC_DATA.replace("{id}", integrationId),
      )

      if (response.success) {
        // Update last sync time
        setIntegrations((prev) =>
          prev.map((integration) =>
            integration.id === integrationId ? { ...integration, lastSync: new Date().toISOString() } : integration,
          ),
        )
        return { success: true }
      }

      throw new Error(response.message || "Sync failed")
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Sync failed",
      }
    }
  }, [])

  const getIntegrationStatus = useCallback(async (integrationId: string) => {
    try {
      const response = await integrationServiceClient.get<IntegrationStatus>(
        API_CONFIG.ENDPOINTS.INTEGRATIONS.GET_STATUS.replace("{id}", integrationId),
      )

      if (response.success && response.data) {
        return { success: true, data: response.data }
      }

      throw new Error(response.message || "Failed to get status")
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to get status",
      }
    }
  }, [])

  return {
    integrations,
    loading,
    error,
    connectIntegration,
    disconnectIntegration,
    syncIntegration,
    getIntegrationStatus,
    refetch: fetchIntegrations,
  }
}
