"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { date: "Jun 05", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 06", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 07", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 08", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 09", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 10", posts: Math.floor(Math.random() * 400) + 50 },
  { date: "Jun 11", posts: Math.floor(Math.random() * 400) + 50 },
]

export function PostsPerDayChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            color: "#fff",
          }}
        />
        <Bar dataKey="posts" fill="hsl(263.4 70% 50.4%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
