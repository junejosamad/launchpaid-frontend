// components/test/QuickReviewTest.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'

export function QuickReviewTest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [applicationId, setApplicationId] = useState('')
  const [campaignId, setCampaignId] = useState('')

  const testDirectApprove = async () => {
    if (!applicationId) {
      setResult({ success: false, error: 'Please enter an Application ID' })
      return
    }

    setLoading(true)
    setResult(null)
    
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
      
      console.log('Testing approve with:', {
        applicationId,
        token: token ? 'Token found' : 'No token found',
        url: `http://localhost:8002/api/v1/applications/${applicationId}/review`
      })
      
      const response = await fetch(
        `http://localhost:8002/api/v1/applications/${applicationId}/review`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            status: 'approved'
          })
        }
      )
      
      const data = await response.json()
      
      setResult({
        success: response.ok,
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries())
      })
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const testDirectReject = async () => {
    if (!applicationId) {
      setResult({ success: false, error: 'Please enter an Application ID' })
      return
    }

    setLoading(true)
    setResult(null)
    
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
      
      const response = await fetch(
        `http://localhost:8002/api/v1/applications/${applicationId}/review`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            status: 'rejected',
            rejection_reason: 'Test rejection from frontend'
          })
        }
      )
      
      const data = await response.json()
      
      setResult({
        success: response.ok,
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries())
      })
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const testGetApplications = async () => {
    if (!campaignId) {
      setResult({ success: false, error: 'Please enter a Campaign ID' })
      return
    }

    setLoading(true)
    setResult(null)
    
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
      
      console.log('Testing get applications with:', {
        campaignId,
        token: token ? 'Token found' : 'No token found',
        url: `http://localhost:8002/api/v1/applications/campaign/${campaignId}`
      })
      
      const response = await fetch(
        `http://localhost:8002/api/v1/applications/campaign/${campaignId}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        }
      )
      
      const data = await response.json()
      
      setResult({
        success: response.ok,
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries())
      })
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
    setResult({
      authCheck: {
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 30)}...` : 'No token found',
        localStorage: {
          auth_token: !!localStorage.getItem('auth_token'),
          access_token: !!localStorage.getItem('access_token'),
          refresh_token: !!localStorage.getItem('refresh_token')
        }
      }
    })
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Direct API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-gray-800 border-gray-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-gray-300">
            <strong>Important:</strong> Make sure you're logged in as an agency or brand user!
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Application ID</Label>
            <Input
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Enter application ID (e.g., 1c57a288-9f3a-4252-8f9a-2e537ba916e3)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300">Campaign ID</Label>
            <Input
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              placeholder="Enter campaign ID (e.g., 7eee88b9-6e53-4a34-8749-329c74f52b7a)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={checkAuth}
            variant="outline"
            className="border-gray-700"
          >
            Check Auth Status
          </Button>
          <Button
            onClick={testGetApplications}
            disabled={loading || !campaignId}
            variant="outline"
            className="border-gray-700"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Test GET Applications
          </Button>
          <Button
            onClick={testDirectApprove}
            disabled={loading || !applicationId}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Test Approve
          </Button>
          <Button
            onClick={testDirectReject}
            disabled={loading || !applicationId}
            variant="destructive"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Test Reject
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            {result.success !== undefined && (
              <div className="flex items-center gap-2 mb-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                  {result.success ? 'Success' : 'Failed'} 
                  {result.status && ` - Status: ${result.status}`}
                </span>
              </div>
            )}
            <pre className="text-xs text-gray-300 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}