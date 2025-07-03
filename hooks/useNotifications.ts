"use client"

import { useState, useEffect, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userServiceClient } from "@/lib/api/client"
import type { Notification, WebSocketMessage } from "@/lib/types/api"

export function useNotifications(enabled = true) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await userServiceClient.get<{
        notifications: Notification[]
        unreadCount: number
      }>("/notifications")

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch notifications")
      }

      return response.data!
    },
    enabled,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  })

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function useNotificationMutations() {
  const queryClient = useQueryClient()

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await userServiceClient.patch(`/notifications/${notificationId}/read`)

      if (!response.success) {
        throw new Error(response.error || "Failed to mark notification as read")
      }

      return notificationId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const response = await userServiceClient.patch("/notifications/read-all")

      if (!response.success) {
        throw new Error(response.error || "Failed to mark all notifications as read")
      }

      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })

  const deleteNotification = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await userServiceClient.delete(`/notifications/${notificationId}`)

      if (!response.success) {
        throw new Error(response.error || "Failed to delete notification")
      }

      return notificationId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })

  return {
    markAsRead: {
      mutate: markAsRead.mutate,
      isLoading: markAsRead.isPending,
      error: markAsRead.error?.message,
    },
    markAllAsRead: {
      mutate: markAllAsRead.mutate,
      isLoading: markAllAsRead.isPending,
      error: markAllAsRead.error?.message,
    },
    deleteNotification: {
      mutate: deleteNotification.mutate,
      isLoading: deleteNotification.isPending,
      error: deleteNotification.error?.message,
    },
  }
}

// Real-time notifications using WebSocket
export function useRealTimeNotifications() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const queryClient = useQueryClient()

  const connect = useCallback(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    const ws = new WebSocket(`ws://localhost:8000/ws/notifications?token=${token}`)

    ws.onopen = () => {
      console.log("Connected to notification service")
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data)

      if (message.type === "notification") {
        // Add new notification to cache
        queryClient.setQueryData(["notifications"], (old: any) => {
          if (!old) return old

          return {
            ...old,
            notifications: [message.payload, ...old.notifications],
            unreadCount: old.unreadCount + 1,
          }
        })

        // Show browser notification if permission granted
        if (Notification.permission === "granted") {
          new Notification(message.payload.title, {
            body: message.payload.message,
            icon: "/logo.png",
          })
        }
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      setIsConnected(false)
    }

    ws.onclose = () => {
      console.log("Disconnected from notification service")
      setIsConnected(false)

      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (socket?.readyState === WebSocket.CLOSED) {
          connect()
        }
      }, 5000)
    }

    setSocket(ws)
  }, [queryClient, socket])

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close()
      setSocket(null)
      setIsConnected(false)
    }
  }, [socket])

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    isConnected,
    connect,
    disconnect,
  }
}
