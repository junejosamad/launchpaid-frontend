// components/debug/ApiDebug.tsx - Simple debug component
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { campaignServiceClient, testConnection } from "@/lib/api/client"

export function ApiDebug() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const testResults: any = {}

    try {
      console.log('🧪 Starting API tests...')

      // Test 1: Health check
      console.log('1️⃣ Testing health endpoint...')
      const health = await campaignServiceClient.get('/health')
      testResults.health = health

      // Test 2: Test endpoint
      console.log('2️⃣ Testing test endpoint...')
      const test = await campaignServiceClient.get('/api/v1/test')
      testResults.test = test

      // Test 3: Dashboard analytics
      console.log('3️⃣ Testing analytics endpoint...')
      const analytics = await campaignServiceClient.get('/api/v1/dashboard/analytics')
      testResults.analytics = analytics

      // Test 4: Dashboard campaigns
      console.log('4️⃣ Testing campaigns endpoint...')
      const campaigns = await campaignServiceClient.get('/api/v1/dashboard/campaigns')
      testResults.campaigns = campaigns

      console.log('✅ All tests completed!')

    } catch (error) {
      console.error('❌ Test failed:', error)
      testResults.error = {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }
    }

    setResults(testResults)
    setLoading(false)
  }

  const getStatusIcon = (result: any) => {
    if (!result) return "⏳"
    if (result.success) return "✅"
    return "❌"
  }

  const getStatusColor = (result: any) => {
    if (!result) return "text-gray-400"
    if (result.success) return "text-green-400"
    return "text-red-400"
  }

  return (
    <Card className="mb-6 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 API Connection Debug
          {loading && <span className="text-sm text-yellow-400">Testing...</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTests} 
          disabled={loading} 
          className="mb-4 bg-purple-600 hover:bg-purple-700"
        >
          {loading ? '🔄 Testing APIs...' : '🧪 Run API Tests'}
        </Button>
        
        {Object.keys(results).length > 0 && (
          <div className="space-y-4">
            {/* Quick Status Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <div className={`p-2 rounded text-center text-sm ${getStatusColor(results.health)}`}>
                {getStatusIcon(results.health)} Health
              </div>
              <div className={`p-2 rounded text-center text-sm ${getStatusColor(results.test)}`}>
                {getStatusIcon(results.test)} Test
              </div>
              <div className={`p-2 rounded text-center text-sm ${getStatusColor(results.analytics)}`}>
                {getStatusIcon(results.analytics)} Analytics
              </div>
              <div className={`p-2 rounded text-center text-sm ${getStatusColor(results.campaigns)}`}>
                {getStatusIcon(results.campaigns)} Campaigns
              </div>
            </div>

            {/* Detailed Results */}
            {Object.entries(results).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-800 rounded">
                <h4 className={`font-bold mb-2 flex items-center gap-2 ${getStatusColor(value)}`}>
                  {getStatusIcon(value)} {key.toUpperCase()}
                </h4>
                <div className="max-h-32 overflow-auto">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open('http://localhost:8002/api/docs', '_blank')}
          >
            📚 API Docs
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setResults({})}
          >
            🗑️ Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}