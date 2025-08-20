import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Trophy, Award } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    questionsAsked: number
    answersGiven: number
    votesReceived: number
    acceptedAnswers: number
    badges: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      title: "Questions Asked",
      value: stats.questionsAsked,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Answers Given",
      value: stats.answersGiven,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Votes Received",
      value: stats.votesReceived,
      icon: ThumbsUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Accepted Answers",
      value: stats.acceptedAnswers,
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Badges Earned",
      value: stats.badges,
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
