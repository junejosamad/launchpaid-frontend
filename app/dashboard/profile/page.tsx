// app/profile/page.tsx

"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useProfile } from "@/hooks/useProfile"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Settings,
  Shield,
  Bell,
  Link,
  Star,
  Target,
  Calendar,
  Upload,
  Camera,
  Loader2,
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const {
    loading,
    saving,
    uploadingAvatar,
    profileData,
    setProfileData,
    completionPercentage,
    user,
    authLoading,
    isAuthenticated,
    saveProfile,
    handleAvatarUpload,
    toggleSecondaryNiche,
    toggleContentStyle,
    addLocation,
    removeLocation,
    NICHES,
    CONTENT_STYLES
  } = useProfile()

  // Show loading state while auth is being checked
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Don't render the full page if not authenticated
  if (!user || !isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar />
      <div className="ml-[250px]">
        <DashboardHeader />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="text-gray-400">Fill in your information to start earning with campaigns</p>
            </div>

            {/* Profile Completion Progress */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">{completionPercentage}% Profile Complete</h3>
                    <p className="text-gray-300">
                      {completionPercentage === 100 
                        ? "Your profile is complete!" 
                        : `${Math.ceil((100 - completionPercentage) / 10)} more sections to complete`}
                    </p>
                  </div>
                  <Button 
                    onClick={saveProfile}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
                <Progress value={completionPercentage} className="h-3 bg-gray-800" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Avatar Upload */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {profileData.avatar_url ? (
                          <img 
                            src={profileData.avatar_url} 
                            alt="Avatar" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                          <Upload className="h-4 w-4" />
                          Upload new photo
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                      />
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="email" 
                          value={profileData.email} 
                          className="bg-gray-800 border-gray-700" 
                          disabled 
                        />
                        {user?.isVerified && (
                          <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={profileData.gender}
                        onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Select 
                        value={profileData.ethnicity}
                        onValueChange={(value) => setProfileData({ ...profileData, ethnicity: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select ethnicity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="black">Black/African American</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="native">Native American</SelectItem>
                          <SelectItem value="pacific">Pacific Islander</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Tell brands about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Shipping */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Shipping
                    {!profileData.shipping_address && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shipping_address">Street Address</Label>
                    <Input
                      id="shipping_address"
                      placeholder="123 Main St"
                      value={profileData.shipping_address}
                      onChange={(e) => setProfileData({ ...profileData, shipping_address: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Los Angeles"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="CA"
                        value={profileData.state}
                        onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input
                        id="zip_code"
                        placeholder="90210"
                        value={profileData.zip_code}
                        onChange={(e) => setProfileData({ ...profileData, zip_code: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={profileData.country}
                        onValueChange={(value) => setProfileData({ ...profileData, country: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Required for shipping product samples</p>
                </CardContent>
              </Card>

              {/* Social Media Handles */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Social Media Handles
                    {!profileData.tiktok_handle && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        TikTok Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tiktok_handle">TikTok Username</Label>
                    <Input
                      id="tiktok_handle"
                      value={profileData.tiktok_handle}
                      onChange={(e) => setProfileData({ ...profileData, tiktok_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourtiktok"
                    />
                    <p className="text-sm text-gray-400 mt-1">Required for campaign participation</p>
                  </div>
                  <div>
                    <Label htmlFor="instagram_handle">Instagram Username</Label>
                    <Input
                      id="instagram_handle"
                      value={profileData.instagram_handle}
                      onChange={(e) => setProfileData({ ...profileData, instagram_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourinstagram"
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube_handle">YouTube Channel</Label>
                    <Input
                      id="youtube_handle"
                      value={profileData.youtube_handle}
                      onChange={(e) => setProfileData({ ...profileData, youtube_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="@yourchannel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discord_handle">Discord Username</Label>
                    <Input
                      id="discord_handle"
                      value={profileData.discord_handle}
                      onChange={(e) => setProfileData({ ...profileData, discord_handle: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="username#1234"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Niche Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Content Niche Preferences
                    {!profileData.primary_niche && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary_niche">Primary Niche</Label>
                    <Select 
                      value={profileData.primary_niche}
                      onValueChange={(value) => setProfileData({ ...profileData, primary_niche: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select your primary niche" />
                      </SelectTrigger>
                      <SelectContent>
                        {NICHES.map(niche => (
                          <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Secondary Niches</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {NICHES.filter(n => n !== profileData.primary_niche).map((niche) => (
                        <Badge 
                          key={niche} 
                          variant={profileData.secondary_niches.includes(niche) ? "default" : "outline"}
                          className={profileData.secondary_niches.includes(niche) 
                            ? "bg-purple-600/20 text-purple-400 cursor-pointer" 
                            : "cursor-pointer hover:bg-gray-800"
                          }
                          onClick={() => toggleSecondaryNiche(niche)}
                        >
                          {niche}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Content Style</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {CONTENT_STYLES.map((style) => (
                        <Badge 
                          key={style} 
                          variant={profileData.content_style.includes(style) ? "default" : "outline"}
                          className={profileData.content_style.includes(style) 
                            ? "bg-purple-600/20 text-purple-400 cursor-pointer" 
                            : "cursor-pointer hover:bg-gray-800"
                          }
                          onClick={() => toggleContentStyle(style)}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Demographics */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Audience Demographics
                    {profileData.audience_top_locations.length === 0 && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Gender Distribution (%)</Label>
                      <span className="text-xs text-gray-400">
                        Total: {Object.values(profileData.audience_gender_split).reduce((sum, val) => sum + val, 0).toFixed(1)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="gender_male" className="text-xs">Male</Label>
                        <Input
                          id="gender_male"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={profileData.audience_gender_split.male}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              male: parseFloat(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender_female" className="text-xs">Female</Label>
                        <Input
                          id="gender_female"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={profileData.audience_gender_split.female}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              female: parseFloat(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender_other" className="text-xs">Other</Label>
                        <Input
                          id="gender_other"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={profileData.audience_gender_split.other}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            audience_gender_split: {
                              ...prev.audience_gender_split,
                              other: parseFloat(e.target.value) || 0
                            }
                          }))}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Age Distribution (%)</Label>
                      <span className="text-xs text-gray-400">
                        Total: {Object.values(profileData.audience_age_groups).reduce((sum, val) => sum + val, 0).toFixed(1)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(profileData.audience_age_groups).map(([range, percentage]) => (
                        <div key={range}>
                          <Label htmlFor={`age_${range}`} className="text-xs">{range}</Label>
                          <Input
                            id={`age_${range}`}
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={percentage}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              audience_age_groups: {
                                ...prev.audience_age_groups,
                                [range]: parseFloat(e.target.value) || 0
                              }
                            }))}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Top Audience Locations</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="add-location"
                          placeholder="Add a country (e.g., United States)"
                          className="bg-gray-800 border-gray-700"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement
                              addLocation(input.value)
                              input.value = ''
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById('add-location') as HTMLInputElement
                            if (input) {
                              addLocation(input.value)
                              input.value = ''
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.audience_top_locations.map(location => (
                          <Badge 
                            key={location} 
                            variant="secondary" 
                            className="bg-purple-600/20 text-purple-400"
                          >
                            {location}
                            <button
                              onClick={() => removeLocation(location)}
                              className="ml-2 hover:text-red-400"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Helper text */}
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Gender and age percentages should each total 100%</p>
                    <p>• These demographics help match you with relevant campaigns</p>
                    <p>• Data is synced with our analytics service</p>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-400">Receive text messages for urgent updates</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive email updates and summaries</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>In-app Notifications</Label>
                        <p className="text-sm text-gray-400">Show notifications within the app</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.in_app}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, in_app: checked }
                        }))}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Notification Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Campaign opportunities</span>
                        <Switch
                          checked={profileData.notifications.campaigns}
                          onCheckedChange={(checked) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, campaigns: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment confirmations</span>
                        <Switch
                          checked={profileData.notifications.payments}
                          onCheckedChange={(checked) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, payments: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New opportunities</span>
                        <Switch
                          checked={profileData.notifications.opportunities}
                          onCheckedChange={(checked) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, opportunities: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Performance updates</span>
                        <Switch
                          checked={profileData.notifications.performance}
                          onCheckedChange={(checked) => setProfileData(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, performance: checked }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Profile Completion Checklist */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    {profileData.first_name && profileData.last_name ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Basic Information</div>
                      <div className="text-xs text-gray-400">Name, age, contact details</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.shipping_address && profileData.city && profileData.state && profileData.zip_code ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Shipping Address</div>
                      <div className="text-xs text-gray-400">Required for product samples</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.tiktok_handle ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">TikTok Handle</div>
                      <div className="text-xs text-gray-400">Main platform for campaigns</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.primary_niche ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Content Niche</div>
                      <div className="text-xs text-gray-400">For campaign matching</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {profileData.audience_top_locations.length > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">Audience Demographics</div>
                      <div className="text-xs text-gray-400">Help brands understand your reach</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/campaigns')}
                    disabled={completionPercentage < 100}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Browse Campaigns
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/integrations')}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Connect TikTok Shop
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/help')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Tips */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-400">
                  <p>• Use a clear profile picture that shows your face</p>
                  <p>• Be specific about your content niches to get matched with relevant campaigns</p>
                  <p>• Keep your audience demographics updated for better campaign opportunities</p>
                  <p>• Connect all your social media accounts to show your full reach</p>
                  <p>• Write a compelling bio that showcases your unique value</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}