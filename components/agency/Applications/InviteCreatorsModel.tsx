import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface InviteCreatorsModalProps {
  isOpen: boolean
  onClose: () => void
  campaigns: Array<{ id: string; name: string; status: string }>
  inviteEmails: string
  onEmailsChange: (emails: string) => void
  selectedCampaign: string
  onCampaignChange: (campaign: string) => void
  onSendInvites: () => void
}

export function InviteCreatorsModal({
  isOpen,
  onClose,
  campaigns,
  inviteEmails,
  onEmailsChange,
  selectedCampaign,
  onCampaignChange,
  onSendInvites,
}: InviteCreatorsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Invite Affiliates or Creators</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send invitations to potential creators to join your campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Selection */}
          <div>
            <Label className="text-sm font-medium text-white mb-2 block">Select Campaign</Label>
            <Select value={selectedCampaign} onValueChange={onCampaignChange}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id} className="text-gray-300 hover:text-white">
                    {campaign.name} ({campaign.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email Invitation */}
          <div>
            <Label className="text-sm font-medium text-white mb-2 block">Email Addresses</Label>
            <Textarea
              placeholder="Enter comma-separated email addresses (e.g., creator1@email.com, creator2@email.com)"
              value={inviteEmails}
              onChange={(e) => onEmailsChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
            />
            <p className="text-xs text-gray-400 mt-2">
              Provide a list of emails separated by commas to invite multiple users at once
            </p>
          </div>

          {/* Invitation Settings */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-assign" className="border-gray-600" />
              <Label htmlFor="auto-assign" className="text-sm text-gray-300 cursor-pointer">
                Auto-assign to campaign when they join
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="discord-invite" className="border-gray-600" />
              <Label htmlFor="discord-invite" className="text-sm text-gray-300 cursor-pointer">
                Include Discord server invitation
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-approve" className="border-gray-600" />
              <Label htmlFor="auto-approve" className="text-sm text-gray-300 cursor-pointer">
                Enable auto-approval for invited creators
              </Label>
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <Label className="text-sm font-medium text-white mb-2 block">Custom Message (Optional)</Label>
            <Textarea
              placeholder="Add a personalized message to your invitation..."
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[100px]"
            />
            <p className="text-xs text-gray-400 mt-2">
              This message will be included in the invitation email to creators
            </p>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-white mb-2">Invitation Preview</h4>
            <div className="text-sm text-gray-400">
              <p className="mb-1">
                <span className="text-gray-500">To:</span>{" "}
                {inviteEmails.split(',').filter(e => e.trim()).length > 0
                  ? `${inviteEmails.split(',').filter(e => e.trim()).length} creators`
                  : 'No recipients'}
              </p>
              <p className="mb-1">
                <span className="text-gray-500">Campaign:</span>{" "}
                {campaigns.find(c => c.id === selectedCampaign)?.name || 'No campaign selected'}
              </p>
              <p>
                <span className="text-gray-500">Status:</span>{" "}
                <span className="text-green-400">Ready to send</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={onSendInvites}
              disabled={!selectedCampaign || !inviteEmails.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Invitations
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 bg-gray-800 hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}