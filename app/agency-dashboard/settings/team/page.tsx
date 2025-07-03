"use client"

import { useState } from "react"
import { AgencyHeader } from "@/components/agency/navigation/agency-header"
import { AgencySidebar } from "@/components/agency/navigation/agency-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Crown,
  Users,
  Plus,
  Mail,
  Eye,
  Edit,
  DollarSign,
  MoreHorizontal,
  Building2,
  Shield,
  ChevronRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TeamManagementPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [createPodModalOpen, setCreatePodModalOpen] = useState(false)

  // Mock data
  const workspaces = [
    {
      id: "main",
      name: "Main Agency",
      type: "main",
      description: "Primary workspace with full administrative access",
      members: 8,
      clients: 12,
      maxClients: 15,
      gmv: 124350,
      growth: 25,
      campaigns: 12,
      efficiency: 94,
      memberAvatars: [
        "/placeholder.svg?height=32&width=32&text=JD",
        "/placeholder.svg?height=32&width=32&text=SM",
        "/placeholder.svg?height=32&width=32&text=AL",
        "/placeholder.svg?height=32&width=32&text=MK",
      ],
    },
    {
      id: "marketing",
      name: "Marketing Team",
      type: "pod",
      description: "Specialized pod for marketing campaigns",
      members: 4,
      clients: 8,
      maxClients: 10,
      gmv: 45230,
      growth: 18,
      campaigns: 8,
      efficiency: 87,
      memberAvatars: [
        "/placeholder.svg?height=32&width=32&text=RH",
        "/placeholder.svg?height=32&width=32&text=LM",
        "/placeholder.svg?height=32&width=32&text=TK",
        "/placeholder.svg?height=32&width=32&text=NS",
      ],
    },
    {
      id: "ecommerce",
      name: "E-commerce Pod",
      type: "pod",
      description: "Focused on e-commerce and retail campaigns",
      members: 3,
      clients: 6,
      maxClients: 10,
      gmv: 32100,
      growth: 12,
      campaigns: 6,
      efficiency: 91,
      memberAvatars: [
        "/placeholder.svg?height=32&width=32&text=BW",
        "/placeholder.svg?height=32&width=32&text=CL",
        "/placeholder.svg?height=32&width=32&text=DM",
      ],
    },
  ]

  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@agency.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      workspace: "Main Agency",
      role: "Owner",
      permissions: ["view", "edit", "finance", "admin"],
      lastActive: "2 minutes ago",
      status: "active",
      performance: 95,
    },
    {
      id: "2",
      name: "Sarah Miller",
      email: "sarah@agency.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      workspace: "Marketing Team",
      role: "Admin",
      permissions: ["view", "edit"],
      lastActive: "1 hour ago",
      status: "active",
      performance: 88,
    },
    {
      id: "3",
      name: "Alex Lee",
      email: "alex@agency.com",
      avatar: "/placeholder.svg?height=40&width=40&text=AL",
      workspace: "E-commerce Pod",
      role: "Manager",
      permissions: ["view", "edit"],
      lastActive: "3 hours ago",
      status: "active",
      performance: 92,
    },
    {
      id: "4",
      name: "Mike Kim",
      email: "mike@agency.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MK",
      workspace: "Marketing Team",
      role: "Member",
      permissions: ["view"],
      lastActive: "1 day ago",
      status: "invited",
      performance: null,
    },
  ]

  const podPerformance = [
    {
      workspace: "Main Agency",
      members: 8,
      clients: "12/15",
      gmv: 124350,
      growth: 25,
      successRate: 94,
      satisfaction: 4.8,
      efficiency: 94,
      trend: "hot",
    },
    {
      workspace: "Marketing Team",
      members: 4,
      clients: "8/10",
      gmv: 45230,
      growth: 18,
      successRate: 87,
      satisfaction: 4.6,
      efficiency: 87,
      trend: "growing",
    },
    {
      workspace: "E-commerce Pod",
      members: 3,
      clients: "6/10",
      gmv: 32100,
      growth: 12,
      successRate: 91,
      satisfaction: 4.7,
      efficiency: 91,
      trend: "stable",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "hot":
        return "🔥"
      case "growing":
        return "📈"
      case "declining":
        return "📉"
      default:
        return "➡️"
    }
  }

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "view":
        return <Eye className="h-4 w-4" />
      case "edit":
        return <Edit className="h-4 w-4" />
      case "finance":
        return <DollarSign className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <AgencySidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />

      <div className="lg:pl-60">
        <AgencyHeader onMobileMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-6 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <span>Settings</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-purple-400">Team</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Team & Workspace Management</h1>
              <p className="text-gray-400 mt-1">Manage team members, workspaces, and performance tracking</p>
            </div>
          </div>

          {/* Workspace Overview */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Agency Workspaces</h2>
              <p className="text-gray-400 text-sm">
                Organize your team into pods that cap at 10 clients each to avoid overwhelming dashboards
              </p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Main Agency Workspace
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Members</span>
                    <span className="text-white font-medium">8 team members</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Clients</span>
                    <span className="text-white font-medium">12 campaigns</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-green-400 font-medium">+25% this month</span>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-green-600/20 text-green-400 border-green-600/30">All features enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-purple-400" />
                    Team Pods Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Pods</span>
                    <span className="text-white font-medium">3 active workspaces</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Members</span>
                    <span className="text-white font-medium">15 across all pods</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Avg Performance</span>
                    <span className="text-green-400 font-medium">+18% growth</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Pod Utilization</span>
                    <span className="text-white font-medium">8.3/10 avg clients</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="h-5 w-5 text-blue-400" />
                    Shared Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Creator Database</span>
                    <span className="text-white font-medium">247 creators</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Integrations</span>
                    <span className="text-green-400 font-medium">Connected to all pods</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Billing</span>
                    <span className="text-white font-medium">Unified billing system</span>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Shared across all pods</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Workspace Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Manage Workspaces (Pods)</h2>
              </div>
              <Dialog open={createPodModalOpen} onOpenChange={setCreatePodModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Pod
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Pod</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Set up a new workspace pod for your team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="podName" className="text-white">
                          Pod Name
                        </Label>
                        <Input
                          id="podName"
                          placeholder="e.g., Fashion Team"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialization" className="text-white">
                          Specialization
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the purpose and focus of this pod"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-white">
                          Client Capacity
                        </Label>
                        <Input
                          id="capacity"
                          type="number"
                          defaultValue="10"
                          max="10"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="initialMembers" className="text-white">
                          Initial Members
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select members" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="sarah">Sarah Miller</SelectItem>
                            <SelectItem value="alex">Alex Lee</SelectItem>
                            <SelectItem value="mike">Mike Kim</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => setCreatePodModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Create Pod</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Workspace Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <Card key={workspace.id} className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        {workspace.type === "main" ? (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Users className="h-5 w-5 text-purple-400" />
                        )}
                        {workspace.name}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-white">Manage Members</DropdownMenuItem>
                          <DropdownMenuItem className="text-white">View Analytics</DropdownMenuItem>
                          {workspace.type !== "main" && (
                            <>
                              <DropdownMenuItem className="text-white">Transfer Clients</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">Archive Pod</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-gray-400">{workspace.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Members */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Members</span>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {workspace.memberAvatars.slice(0, 3).map((avatar, index) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-gray-900">
                              <AvatarImage src={avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-purple-600 text-white text-xs">
                                {avatar.split("text=")[1]}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {workspace.members > 3 && (
                            <div className="h-6 w-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center">
                              <span className="text-xs text-gray-300">+{workspace.members - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Client Load */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Client Load</span>
                        <span className="text-white">
                          {workspace.clients}/{workspace.maxClients} clients
                        </span>
                      </div>
                      <Progress value={(workspace.clients / workspace.maxClients) * 100} className="h-2" />
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white">${(workspace.gmv / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-400">Monthly GMV</div>
                        <div className="text-xs text-green-400">+{workspace.growth}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white">{workspace.campaigns}</div>
                        <div className="text-xs text-gray-400">Active Campaigns</div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <div className="text-sm text-gray-400">Team Efficiency</div>
                      <div className="text-lg font-semibold text-purple-400">{workspace.efficiency}%</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Members Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Team Members</h2>
              </div>
              <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Invite Team Member</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Send an invitation to join your agency team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="colleague@example.com"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-white">
                          Role
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workspace" className="text-white">
                          Workspace Assignment
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select workspace" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="main">Main Agency</SelectItem>
                            <SelectItem value="marketing">Marketing Team</SelectItem>
                            <SelectItem value="ecommerce">E-commerce Pod</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Custom Welcome Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Welcome to our team! We're excited to have you join us..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => setInviteModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Send Invitation</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Members Table */}
            <Card className="bg-gray-900 border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Member</TableHead>
                    <TableHead className="text-gray-400">Workspace</TableHead>
                    <TableHead className="text-gray-400">Role</TableHead>
                    <TableHead className="text-gray-400">Permissions</TableHead>
                    <TableHead className="text-gray-400">Last Active</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} className="border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-purple-600/30 text-purple-400">
                          {member.workspace}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.role === "Owner"
                              ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                              : member.role === "Admin"
                                ? "bg-purple-600/20 text-purple-400 border-purple-600/30"
                                : member.role === "Manager"
                                  ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                                  : "bg-gray-600/20 text-gray-400 border-gray-600/30"
                          }
                        >
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {member.permissions.map((permission) => (
                            <div key={permission} className="p-1 rounded bg-gray-800 text-gray-400" title={permission}>
                              {getPermissionIcon(permission)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{member.lastActive}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.status === "active"
                              ? "bg-green-600/20 text-green-400 border-green-600/30"
                              : member.status === "invited"
                                ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                                : "bg-red-600/20 text-red-400 border-red-600/30"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-white">Edit Role</DropdownMenuItem>
                            <DropdownMenuItem className="text-white">Transfer Pod</DropdownMenuItem>
                            <DropdownMenuItem className="text-white">Send Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Pod Performance Comparison */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Pod Performance Comparison</h2>
              <p className="text-gray-400 text-sm">Track which team is performing best with detailed analytics</p>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Workspace</TableHead>
                    <TableHead className="text-gray-400">Active Clients</TableHead>
                    <TableHead className="text-gray-400">Monthly GMV</TableHead>
                    <TableHead className="text-gray-400">Success Rate</TableHead>
                    <TableHead className="text-gray-400">Satisfaction</TableHead>
                    <TableHead className="text-gray-400">Efficiency</TableHead>
                    <TableHead className="text-gray-400">Trending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {podPerformance.map((pod, index) => (
                    <TableRow key={index} className="border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{pod.workspace}</span>
                          <Badge variant="outline" className="text-xs">
                            {pod.members} members
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{pod.clients}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">${(pod.gmv / 1000).toFixed(1)}K</div>
                          <div className="text-sm text-green-400">+{pod.growth}%</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{pod.successRate}%</TableCell>
                      <TableCell className="text-white">{pod.satisfaction}/5.0</TableCell>
                      <TableCell className="text-white">{pod.efficiency}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTrendIcon(pod.trend)}</span>
                          <span className="text-sm text-gray-400 capitalize">{pod.trend}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
