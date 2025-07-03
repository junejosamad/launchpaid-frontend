import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { paymentServiceClient } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/config"
import type { PaymentOverview, Transaction, PaymentMethod } from "@/lib/types/api"

export function usePaymentOverview(enabled = true) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["payment-overview"],
    queryFn: async () => {
      const response = await paymentServiceClient.get<PaymentOverview>(ENDPOINTS.PAYMENTS.OVERVIEW)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch payment overview")
      }

      return response.data!
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  return {
    paymentOverview: data,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function usePaymentHistory(
  params: {
    page?: number
    limit?: number
    startDate?: string
    endDate?: string
    type?: string
    enabled?: boolean
  } = {},
) {
  const { page = 1, limit = 20, startDate, endDate, type, enabled = true } = params

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["payment-history", { page, limit, startDate, endDate, type }],
    queryFn: async () => {
      const queryParams: Record<string, any> = {
        page,
        limit,
      }

      if (startDate) queryParams.start_date = startDate
      if (endDate) queryParams.end_date = endDate
      if (type) queryParams.type = type

      const response = await paymentServiceClient.get<{
        transactions: Transaction[]
        pagination: any
      }>(ENDPOINTS.PAYMENTS.HISTORY, queryParams)

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch payment history")
      }

      return response.data!
    },
    enabled,
    staleTime: 1 * 60 * 1000, // 1 minute
  })

  return {
    transactions: data?.transactions || [],
    pagination: data?.pagination,
    loading: isLoading,
    error: error?.message,
    refetch,
  }
}

export function usePaymentMutations() {
  const queryClient = useQueryClient()

  const processPayouts = useMutation({
    mutationFn: async (data: {
      creatorIds: string[]
      campaignId?: string
      amount?: number
    }) => {
      const response = await paymentServiceClient.post(ENDPOINTS.PAYMENTS.PROCESS, data)

      if (!response.success) {
        throw new Error(response.error || "Failed to process payouts")
      }

      return response.data!
    },
    onSuccess: () => {
      // Invalidate payment-related queries
      queryClient.invalidateQueries({ queryKey: ["payment-overview"] })
      queryClient.invalidateQueries({ queryKey: ["payment-history"] })
    },
  })

  const addPaymentMethod = useMutation({
    mutationFn: async (data: Omit<PaymentMethod, "id" | "isVerified">) => {
      const response = await paymentServiceClient.post("/payment-methods", data)

      if (!response.success) {
        throw new Error(response.error || "Failed to add payment method")
      }

      return response.data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-overview"] })
    },
  })

  const updatePaymentMethod = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<PaymentMethod>
    }) => {
      const response = await paymentServiceClient.put(`/payment-methods/${id}`, data)

      if (!response.success) {
        throw new Error(response.error || "Failed to update payment method")
      }

      return response.data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-overview"] })
    },
  })

  const deletePaymentMethod = useMutation({
    mutationFn: async (id: string) => {
      const response = await paymentServiceClient.delete(`/payment-methods/${id}`)

      if (!response.success) {
        throw new Error(response.error || "Failed to delete payment method")
      }

      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-overview"] })
    },
  })

  return {
    processPayouts: {
      mutate: processPayouts.mutate,
      mutateAsync: processPayouts.mutateAsync,
      isLoading: processPayouts.isPending,
      error: processPayouts.error?.message,
      isSuccess: processPayouts.isSuccess,
      reset: processPayouts.reset,
    },
    addPaymentMethod: {
      mutate: addPaymentMethod.mutate,
      mutateAsync: addPaymentMethod.mutateAsync,
      isLoading: addPaymentMethod.isPending,
      error: addPaymentMethod.error?.message,
      isSuccess: addPaymentMethod.isSuccess,
      reset: addPaymentMethod.reset,
    },
    updatePaymentMethod: {
      mutate: updatePaymentMethod.mutate,
      mutateAsync: updatePaymentMethod.mutateAsync,
      isLoading: updatePaymentMethod.isPending,
      error: updatePaymentMethod.error?.message,
      isSuccess: updatePaymentMethod.isSuccess,
      reset: updatePaymentMethod.reset,
    },
    deletePaymentMethod: {
      mutate: deletePaymentMethod.mutate,
      mutateAsync: deletePaymentMethod.mutateAsync,
      isLoading: deletePaymentMethod.isPending,
      error: deletePaymentMethod.error?.message,
      isSuccess: deletePaymentMethod.isSuccess,
      reset: deletePaymentMethod.reset,
    },
  }
}
