"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { WebSocketMessage } from "@/lib/types/api"

interface UseWebSocketOptions {
  url: string
  protocols?: string[]
  onMessage?: (message: WebSocketMessage) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  reconnectAttempts?: number
  reconnectInterval?: number
  enabled?: boolean
}

export function useWebSocket(options: UseWebSocketOptions) {
  const {
    url,
    protocols,
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    enabled = true,
  } = options

  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )

  const reconnectCount = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    if (!enabled || socket?.readyState === WebSocket.OPEN) return

    setConnectionStatus("connecting")

    try {
      const ws = new WebSocket(url, protocols)

      ws.onopen = () => {
        console.log(`WebSocket connected to ${url}`)
        setIsConnected(true)
        setConnectionStatus("connected")
        reconnectCount.current = 0
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          onMessage?.(message)
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      ws.onclose = (event) => {
        console.log(`WebSocket disconnected from ${url}`, event.code, event.reason)
        setIsConnected(false)
        setConnectionStatus("disconnected")
        onClose?.()

        // Attempt to reconnect if not manually closed
        if (event.code !== 1000 && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++
          console.log(`Attempting to reconnect (${reconnectCount.current}/${reconnectAttempts})`)

          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      }

      ws.onerror = (error) => {
        console.error(`WebSocket error on ${url}:`, error)
        setConnectionStatus("error")
        onError?.(error)
      }

      setSocket(ws)
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error)
      setConnectionStatus("error")
    }
  }, [url, protocols, onMessage, onOpen, onClose, onError, reconnectAttempts, reconnectInterval, enabled, socket])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (socket) {
      socket.close(1000, "Manual disconnect")
      setSocket(null)
      setIsConnected(false)
      setConnectionStatus("disconnected")
    }
  }, [socket])

  const sendMessage = useCallback(
    (message: any) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message))
        return true
      }
      return false
    },
    [socket],
  )

  useEffect(() => {
    if (enabled) {
      connect()
    } else {
      disconnect()
    }

    return () => {
      disconnect()
    }
  }, [enabled, connect, disconnect])

  return {
    socket,
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
  }
}
