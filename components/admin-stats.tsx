import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, MessageCircle, Flag, UserCheck, UserPlus } from "lucide-react"

interface AdminStatsProps {
  stats: {
    totalUsers: number
    totalQuestions: number
    totalAnswers: number
    pendingReports: number
    activeUsers: number
    newUsersToday: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statItems = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
    },
    {
      title: "Questions",
      value: stats.totalQuestions.toLocaleString(),
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+8%",
    },
    {
      title: "Answers",
      value: stats.totalAnswers.toLocaleString(),
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+15%",
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports.toString(),
      icon: Flag,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: "-3%",
      urgent: true,
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toString(),
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+5%",
    },
    {
      title: "New Today",
      value: stats.newUsersToday.toString(),
      icon: UserPlus,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      change: "+18%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className={item.urgent ? "border-red-200" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span
                  className={`text-xs font-medium ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
