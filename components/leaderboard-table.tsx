import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

export function LeaderboardTable() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      gmv: 4250,
      badge: "$5K-$10K",
      isCurrentUser: true,
    },
    {
      rank: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      gmv: 3950,
      badge: "$1K-$5K",
    },
    {
      rank: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      gmv: 3700,
      badge: "$1K-$5K",
    },
    {
      rank: 4,
      name: "Jessica Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      gmv: 3200,
      badge: "$1K-$5K",
    },
    {
      rank: 5,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      gmv: 2800,
      badge: "$1K-$5K",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left font-medium text-gray-400 py-3 px-4">Rank</th>
            <th className="text-left font-medium text-gray-400 py-3 px-4">Creator</th>
            <th className="text-left font-medium text-gray-400 py-3 px-4">Badge</th>
            <th className="text-right font-medium text-gray-400 py-3 px-4">GMV</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((creator) => (
            <tr
              key={creator.rank}
              className={`border-b border-gray-800 ${creator.isCurrentUser ? "bg-purple-900/20" : ""}`}
            >
              <td className="py-3 px-4">
                {creator.rank === 1 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-500/20">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
                {creator.rank === 2 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-400/20">
                    <Trophy className="h-4 w-4 text-gray-400" />
                  </div>
                )}
                {creator.rank === 3 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-700/20">
                    <Trophy className="h-4 w-4 text-amber-700" />
                  </div>
                )}
                {creator.rank > 3 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800">
                    <span className="text-sm font-medium">{creator.rank}</span>
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                    <Image
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{creator.name}</div>
                    {creator.isCurrentUser && <div className="text-xs text-purple-400">You</div>}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">{creator.badge}</Badge>
              </td>
              <td className="py-3 px-4 text-right font-medium">${creator.gmv.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
