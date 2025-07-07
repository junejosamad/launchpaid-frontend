"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Edit, Pause, Play, Link, BarChart3, MessageCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { campaignServiceClient } from "@/lib/api/client"

interface CampaignActionsDropdownProps {
  campaign: {
    id: string
    name: string
    status: "active" | "paused" | "completed" | "overdue"
  }
  onEdit?: (campaignId: string) => void
  onToggleStatus?: (campaignId: string) => void
  onViewAnalytics?: (campaignId: string) => void
  onMessageCreators?: (campaignId: string) => void
  onDelete?: (campaignId: string) => void
  onRefresh?: () => void // Add this to refresh the campaigns list after actions
}

export function CampaignActionsDropdown({
  campaign,
  onEdit,
  onToggleStatus,
  onViewAnalytics,
  onMessageCreators,
  onDelete,
  onRefresh,
}: CampaignActionsDropdownProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleCopyLink = async () => {
    const campaignUrl = `https://launchpaid.com/apply/${campaign.id}`

    try {
      await navigator.clipboard.writeText(campaignUrl)
      toast({
        title: "Campaign link copied!",
        description: "The creator application link has been copied to your clipboard.",
        duration: 3000,
      })
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = campaignUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)

      toast({
        title: "Campaign link copied!",
        description: "The creator application link has been copied to your clipboard.",
        duration: 3000,
      })
    }
  }

  const handleEdit = () => {
    // Navigate to edit page or open edit modal
    // For now, let's navigate to an edit page
    router.push(`/agency-dashboard/campaigns/${campaign.id}/edit`)
    
    // If you prefer a modal, you can call the onEdit callback
    // onEdit?.(campaign.id)
  }

  const handleToggleStatus = async () => {
    setIsUpdating(true)
    
    try {
      const newStatus = campaign.status === "paused" ? "active" : "paused"
      
      const response = await campaignServiceClient.put(
        `/api/v1/campaigns/${campaign.id}`,
        { status: newStatus }
      )

      if (response.success) {
        toast({
          title: "Campaign status updated",
          description: `${campaign.name} has been ${newStatus === "active" ? "resumed" : "paused"}.`,
          duration: 3000,
        })
        
        // Trigger refresh or callback
        onToggleStatus?.(campaign.id)
        onRefresh?.()
      } else {
        throw new Error(response.error || "Failed to update campaign status")
      }
    } catch (error: any) {
      console.error("Error updating campaign status:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update campaign status. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const response = await campaignServiceClient.delete(
        `/api/v1/campaigns/${campaign.id}`
      )

      if (response.success) {
        toast({
          title: "Campaign deleted",
          description: `${campaign.name} has been permanently deleted.`,
          duration: 3000,
        })
        
        setShowDeleteDialog(false)
        
        // Trigger refresh or callback
        onDelete?.(campaign.id)
        onRefresh?.()
      } else {
        throw new Error(response.error || "Failed to delete campaign")
      }
    } catch (error: any) {
      console.error("Error deleting campaign:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete campaign. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const isPaused = campaign.status === "paused"
  const isCompleted = campaign.status === "completed"

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-gray-800 data-[state=open]:bg-gray-800"
            disabled={isUpdating || isDeleting}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open campaign actions menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800">
          <DropdownMenuItem
            onClick={handleEdit}
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Campaign
          </DropdownMenuItem>

          {!isCompleted && (
            <DropdownMenuItem
              onClick={handleToggleStatus}
              className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
              disabled={isUpdating}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Campaign
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Campaign
                </>
              )}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
            <Link className="h-4 w-4 mr-2" />
            Copy Application Link
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onViewAnalytics?.(campaign.id)}
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onMessageCreators?.(campaign.id)}
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message All Creators
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-800" />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="cursor-pointer hover:bg-red-900/20 focus:bg-red-900/20 text-red-400"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Campaign
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{campaign.name}"? This action cannot be undone and will permanently
              remove all campaign data, creator assignments, and analytics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Deleting...
                </>
              ) : (
                "Delete Campaign"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}