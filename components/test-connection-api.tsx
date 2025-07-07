// components/test-campaign-api.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { campaignServiceClient } from "@/lib/api/client"

export function TestCampaignAPI() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runTests = async () => {
    setTesting(true)
    const testResults: any = {}

    // Test 1: Check auth token
    const token = localStorage.getItem("auth_token") || 
                 localStorage.getItem("access_token") ||
                 sessionStorage.getItem("auth_token") ||
                 sessionStorage.getItem("access_token")
    
    testResults.hasToken = !!token
    testResults.tokenPreview = token ? token.substring(0, 20) + "..." : "No token"

    // Test 2: Health check
    try {
      const healthResponse = await campaignServiceClient.get("/health")
      testResults.healthCheck = {
        success: healthResponse.success,
        data: healthResponse.data,
        error: healthResponse.error
      }
    } catch (error) {
      testResults.healthCheck = { error: error.message }
    }

    // Test 3: Get campaigns (should work if authenticated)
    try {
      const campaignsResponse = await campaignServiceClient.get("/api/v1/campaigns/")
      testResults.getCampaigns = {
        success: campaignsResponse.success,
        dataReceived: !!campaignsResponse.data,
        error: campaignsResponse.error
      }
    } catch (error) {
      testResults.getCampaigns = { error: error.message }
    }

    // Test 4: Test creating a minimal campaign
    try {
      const testCampaign = {
        name: "Test Campaign " + Date.now(),
        description: "Test",
        payout_model: "fixed_per_post",
        tracking_method: "hashtag",
        type: "performance",
        max_creators: 10,
        min_deliverables_per_creator: 1,
        base_payout_per_post: 50,
        budget: 1000,
        total_budget: 1000,
        target_creators: 10,
        hashtag: "#test"
      }
      
      console.log("Testing campaign creation with:", testCampaign)
      
      const createResponse = await campaignServiceClient.post("/api/v1/campaigns/", testCampaign)
      testResults.createCampaign = {
        success: createResponse.success,
        data: createResponse.data,
        error: createResponse.error
      }
    } catch (error) {
      testResults.createCampaign = { error: error.message }
    }

    setResults(testResults)
    setTesting(false)
  }

  return (
    <div className="fixed bottom-20 right-4 bg-gray-800 p-4 rounded-lg max-w-md">
      <h3 className="font-bold mb-2 text-white">Campaign API Test</h3>
      
      <Button 
        onClick={runTests} 
        disabled={testing}
        className="mb-3 w-full"
      >
        {testing ? "Testing..." : "Run API Tests"}
      </Button>

      {results && (
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-gray-900 rounded">
            <strong>Auth Token:</strong>
            <pre className="text-green-400">{results.hasToken ? "✓ Present" : "✗ Missing"}</pre>
            <pre className="text-gray-400">{results.tokenPreview}</pre>
          </div>

          <div className="p-2 bg-gray-900 rounded">
            <strong>Health Check:</strong>
            <pre className={results.healthCheck?.success ? "text-green-400" : "text-red-400"}>
              {JSON.stringify(results.healthCheck, null, 2)}
            </pre>
          </div>

          <div className="p-2 bg-gray-900 rounded">
            <strong>Get Campaigns:</strong>
            <pre className={results.getCampaigns?.success ? "text-green-400" : "text-red-400"}>
              {JSON.stringify(results.getCampaigns, null, 2)}
            </pre>
          </div>

          <div className="p-2 bg-gray-900 rounded">
            <strong>Create Campaign:</strong>
            <pre className={results.createCampaign?.success ? "text-green-400" : "text-red-400"}>
              {JSON.stringify(results.createCampaign, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}