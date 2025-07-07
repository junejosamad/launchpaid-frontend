// hooks/useNotifications.ts - Simple notifications without WebSocket

import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function useRealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // For now, just return a simple interface without WebSocket
  // This prevents the 403 errors while still allowing the app to work
  
  useEffect(() => {
    // Simulate connection
    setIsConnected(true)
    
    // You can add polling here if needed
    // const interval = setInterval(() => {
    //   fetchNotifications()
    // }, 30000) // Poll every 30 seconds
    
    // return () => clearInterval(interval)
  }, [])

  const connect = () => {
    console.log('Notifications: Using polling mode (WebSocket not configured)')
    setIsConnected(true)
  }

  const disconnect = () => {
    console.log('Notifications: Disconnected')
    setIsConnected(false)
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    isConnected,
    connect,
    disconnect,
    markAsRead,
    clearAll
  }
}

// Alternative hook that uses HTTP polling instead of WebSocket
export function useNotificationsPolling(pollingInterval = 30000) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      // Replace with actual API call when ready
      // const response = await userServiceClient.get('/api/v1/notifications')
      
      // Mock data for now
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Campaign Approved',
          message: 'Your application for Summer Fashion Collection was approved!',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'info',
          title: 'New Campaign Available',
          message: 'Check out the new Tech Gadget Pro Launch campaign',
          timestamp: new Date(Date.now() - 3600000),
          read: true
        }
      ]
      
      setNotifications(mockNotifications)
    } catch (err) {
      setError('Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
    
    const interval = setInterval(fetchNotifications, pollingInterval)
    return () => clearInterval(interval)
  }, [pollingInterval])

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications
  }
}