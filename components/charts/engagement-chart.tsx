"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Week 1", likes: 4000, comments: 2400, views: 24000 },
  { name: "Week 2", likes: 3000, comments: 1398, views: 22100 },
  { name: "Week 3", likes: 2000, comments: 9800, views: 22900 },
  { name: "Week 4", likes: 2780, comments: 3908, views: 20000 },
]

export function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            color: "#fff",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line type="monotone" dataKey="likes" stroke="#8884d8" />
        <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
        <Line type="monotone" dataKey="views" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}
