// app/test-review/page.tsx
"use client"

import { QuickReviewTest } from '@/components/tests/QuickReviewTest'

export default function TestReviewPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Application Review API Test</h1>
        <QuickReviewTest />
        
        <div className="mt-8 p-4 bg-gray-900 rounded space-y-4">
          <h2 className="font-bold text-lg">Testing Instructions:</h2>
          
          <div className="space-y-2 text-sm text-gray-400">
            <p className="font-semibold text-white">1. Prerequisites:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Make sure your campaign service is running on port 8002</li>
              <li>You must be logged in as an agency or brand user</li>
              <li>Get valid Application and Campaign IDs from your database</li>
            </ul>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="font-semibold text-white">2. Test Steps:</p>
            <ol className="list-decimal list-inside ml-4">
              <li>Click "Check Auth Status" to verify you're logged in</li>
              <li>Enter a Campaign ID and click "Test GET Applications" to list applications</li>
              <li>Enter an Application ID and click "Test Approve" or "Test Reject"</li>
              <li>Check the response for success or error messages</li>
            </ol>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="font-semibold text-white">3. Common Issues:</p>
            <ul className="list-disc list-inside ml-4">
              <li><span className="text-yellow-400">401 Error:</span> You're not logged in or token expired</li>
              <li><span className="text-yellow-400">403 Error:</span> Your user doesn't have agency/brand role</li>
              <li><span className="text-yellow-400">404 Error:</span> The application ID doesn't exist</li>
              <li><span className="text-yellow-400">CORS Error:</span> Backend needs to allow http://localhost:3000</li>
              <li><span className="text-yellow-400">Network Error:</span> Backend service is not running on port 8002</li>
            </ul>
          </div>

          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> Open browser DevTools (F12) → Network tab to see the actual API requests and responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}