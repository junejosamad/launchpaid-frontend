// components/debug/AuthDebug.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { campaignServiceClient, userServiceClient } from "@/lib/api/client"
import { useAuth } from "@/hooks/useAuth"
import { ChevronDown, ChevronUp, Shield, Key, RefreshCw } from "lucide-react"

export function AuthDebug() {
  const { user, isAuthenticated } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runAuthTests = async () => {
    setIsLoading(true)
    const results: any = {
      timestamp: new Date().toISOString(),
      user: user,
      tokens: {},
      tests: []
    }

    try {
      // Check tokens
      const authToken = localStorage.getItem("auth_token")
      const accessToken = localStorage.getItem("access_token")
      const refreshToken = localStorage.getItem("refresh_token")

      results.tokens = {
        authToken: authToken ? `${authToken.substring(0, 30)}...` : null,
        accessToken: accessToken ? `${accessToken.substring(0, 30)}...` : null,
        refreshToken: refreshToken ? "Present" : null,
        hasValidToken: !!(authToken || accessToken)
      }

      // Test 1: User Service Profile
      try {
        const profileResponse = await userServiceClient.get("/api/v1/users/me")
        results.tests.push({
          name: "User Service Profile",
          endpoint: "/api/v1/users/me",
          success: profileResponse.success,
          data: profileResponse.data,
          error: profileResponse.error
        })
      } catch (error: any) {
        results.tests.push({
          name: "User Service Profile",
          endpoint: "/api/v1/users/me",
          success: false,
          error: error.message
        })
      }

      // Test 2: Campaign Service Health
      try {
        const healthResponse = await campaignServiceClient.get("/health")
        results.tests.push({
          name: "Campaign Service Health",
          endpoint: "/health",
          success: healthResponse.success,
          data: healthResponse.data,
          error: healthResponse.error
        })
      } catch (error: any) {
        results.tests.push({
          name: "Campaign Service Health",
          endpoint: "/health",
          success: false,
          error: error.message
        })
      }

      // Test 3: Campaign Service Auth Verify
      try {
        const verifyResponse = await campaignServiceClient.get("/api/v1/auth/verify")
        results.tests.push({
          name: "Campaign Service Auth Verify",
          endpoint: "/api/v1/auth/verify",
          success: verifyResponse.success,
          data: verifyResponse.data,
          error: verifyResponse.error
        })
      } catch (error: any) {
        results.tests.push({
          name: "Campaign Service Auth Verify",
          endpoint: "/api/v1/auth/verify",
          success: false,
          error: error.message
        })
      }

      // Test 4: Create Test Token
      try {
        const testTokenResponse = await campaignServiceClient.post("/api/v1/auth/test-token")
        results.tests.push({
          name: "Create Test Token",
          endpoint: "/api/v1/auth/test-token",
          success: testTokenResponse.success,
          data: testTokenResponse.data,
          error: testTokenResponse.error
        })
        
        // Store test tokens for use
        if (testTokenResponse.success && testTokenResponse.data?.tokens) {
          results.testTokens = testTokenResponse.data.tokens
        }
      } catch (error: any) {
        results.tests.push({
          name: "Create Test Token",
          endpoint: "/api/v1/auth/test-token",
          success: false,
          error: error.message
        })
      }

      // Test 5: Campaign List
      try {
        const campaignsResponse = await campaignServiceClient.get("/api/v1/campaigns/")
        results.tests.push({
          name: "List Campaigns",
          endpoint: "/api/v1/campaigns/",
          success: campaignsResponse.success,
          data: campaignsResponse.data ? `${campaignsResponse.data.length} campaigns` : null,
          error: campaignsResponse.error
        })
      } catch (error: any) {
        results.tests.push({
          name: "List Campaigns",
          endpoint: "/api/v1/campaigns/",
          success: false,
          error: error.message
        })
      }

      setTestResults(results)
    } catch (error: any) {
      results.error = error.message
      setTestResults(results)
    } finally {
      setIsLoading(false)
    }
  }

  const applyTestToken = (role: string) => {
    if (!testResults?.testTokens?.[role]) {
      alert("Test token not available. Run auth tests first.")
      return
    }

    const token = testResults.testTokens[role]
    localStorage.setItem("auth_token", token)
    localStorage.setItem("access_token", token)
    campaignServiceClient.setAuthTokens(token)
    
    alert(`Test ${role} token applied! Refresh the page to use it.`)
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Card className="bg-gray-900 border-gray-800 mb-6">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <span>Authentication Debug Panel</span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <span className="text-sm text-green-400">Authenticated</span>
            ) : (
              <span className="text-sm text-red-400">Not Authenticated</span>
            )}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400">Current User</h4>
              <div className="bg-gray-800 rounded p-3 text-sm">
                {user ? (
                  <>
                    <div>ID: {user.id}</div>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
                    <div>Username: {user.username}</div>
                  </>
                ) : (
                  <div className="text-gray-400">No user logged in</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400">Quick Actions</h4>
              <div className="space-y-2">
                <Button
                  onClick={runAuthTests}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4 mr-2" />
                      Run Auth Tests
                    </>
                  )}
                </Button>
                
                {testResults?.testTokens && (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Apply Test Token:</p>
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        onClick={() => applyTestToken('agency')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Agency
                      </Button>
                      <Button
                        onClick={() => applyTestToken('brand')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Brand
                      </Button>
                      <Button
                        onClick={() => applyTestToken('creator')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Creator
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {testResults && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400">Test Results</h4>
              <div className="bg-gray-800 rounded p-3 space-y-2">
                <div className="text-xs text-gray-400">
                  Timestamp: {testResults.timestamp}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Token Status:</p>
                  <div className="text-xs space-y-1 pl-4">
                    <div className={testResults.tokens.hasValidToken ? "text-green-400" : "text-red-400"}>
                      {testResults.tokens.hasValidToken ? "✓" : "✗"} Valid Token Present
                    </div>
                    {testResults.tokens.authToken && (
                      <div className="text-gray-400">
                        Auth Token: {testResults.tokens.authToken}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">API Tests:</p>
                  <div className="space-y-1 pl-4">
                    {testResults.tests.map((test: any, index: number) => (
                      <div key={index} className="text-xs">
                        <span className={test.success ? "text-green-400" : "text-red-400"}>
                          {test.success ? "✓" : "✗"}
                        </span>
                        {" "}
                        <span className="text-gray-300">{test.name}</span>
                        {test.error && (
                          <div className="text-red-400 pl-4 mt-1">
                            Error: {test.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {testResults.testTokens && (
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      Test tokens generated! Use the buttons above to apply them.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}