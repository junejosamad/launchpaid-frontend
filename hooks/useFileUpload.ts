"use client"

import { useState, useCallback } from "react"
import { sharedServiceClient } from "@/lib/api/client"
import { API_CONFIG } from "@/lib/api/config"
import type { FileUpload } from "@/lib/types/api"

interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(
    async (
      file: File,
      options: {
        folder?: string
        maxSize?: number
        allowedTypes?: string[]
      } = {},
    ) => {
      try {
        setUploading(true)
        setError(null)
        setProgress({ loaded: 0, total: file.size, percentage: 0 })

        // Validate file size
        if (options.maxSize && file.size > options.maxSize) {
          throw new Error(`File size exceeds ${options.maxSize / 1024 / 1024}MB limit`)
        }

        // Validate file type
        if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
          throw new Error(`File type ${file.type} is not allowed`)
        }

        const formData = new FormData()
        formData.append("file", file)
        if (options.folder) {
          formData.append("folder", options.folder)
        }

        const response = await sharedServiceClient.upload<FileUpload>(API_CONFIG.ENDPOINTS.SHARED.UPLOAD_FILE, formData)

        if (response.success && response.data) {
          setProgress({ loaded: file.size, total: file.size, percentage: 100 })
          return { success: true, data: response.data }
        }

        throw new Error(response.message || "Upload failed")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed")
        return {
          success: false,
          error: err instanceof Error ? err.message : "Upload failed",
        }
      } finally {
        setUploading(false)
      }
    },
    [],
  )

  const uploadMultipleFiles = useCallback(
    async (
      files: File[],
      options: {
        folder?: string
        maxSize?: number
        allowedTypes?: string[]
      } = {},
    ) => {
      try {
        setUploading(true)
        setError(null)

        const results = await Promise.all(files.map((file) => uploadFile(file, options)))

        const successful = results.filter((result) => result.success)
        const failed = results.filter((result) => !result.success)

        return {
          success: failed.length === 0,
          successful: successful.map((result) => result.data).filter(Boolean),
          failed: failed.map((result) => result.error).filter(Boolean),
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed")
        return {
          success: false,
          error: err instanceof Error ? err.message : "Upload failed",
        }
      } finally {
        setUploading(false)
      }
    },
    [uploadFile],
  )

  const deleteFile = useCallback(async (fileId: string) => {
    try {
      const response = await sharedServiceClient.delete(API_CONFIG.ENDPOINTS.SHARED.DELETE_FILE.replace("{id}", fileId))

      if (response.success) {
        return { success: true }
      }

      throw new Error(response.message || "Delete failed")
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Delete failed",
      }
    }
  }, [])

  const reset = useCallback(() => {
    setUploading(false)
    setProgress(null)
    setError(null)
  }, [])

  return {
    uploading,
    progress,
    error,
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    reset,
  }
}
