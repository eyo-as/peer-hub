"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminStats } from "./admin-stats"
import { RecentReports } from "./recent-reports"
import { PlatformActivity } from "./platform-activity"
import { Users, Flag, TrendingUp, Settings, Shield } from "lucide-react"
import Link from "next/link"

// Mock admin data
const mockAdminData = {
  stats: {
    totalUsers: 1247,
    totalQuestions: 3892,
    totalAnswers: 8456,
    pendingReports: 12,
    activeUsers: 342,
    newUsersToday: 23,
  },
  recentActivity: [
    {
      id: "1",
      type: "user_registered",
      description: "New user Sarah M. registered",
      timeAgo: "5 minutes ago",
      status: "info",
    },
    {
      id: "2",
      type: "question_reported",
      description: "Question reported for inappropriate content",
      timeAgo: "15 minutes ago",
      status: "warning",
    },
    {
      id: "3",
      type: "answer_flagged",
      description: "Answer flagged by multiple users",
      timeAgo: "1 hour ago",
      status: "error",
    },
    {
      id: "4",
      type: "user_banned",
      description: "User temporarily suspended for violations",
      timeAgo: "2 hours ago",
      status: "error",
    },
  ],
  quickActions: [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/admin/users",
      icon: Users,
      count: 1247,
    },
    {
      title: "Content Moderation",
      description: "Review reported content",
      href: "/admin/content",
      icon: Flag,
      count: 12,
      urgent: true,
    },
    {
      title: "Platform Analytics",
      description: "View detailed statistics",
      href: "/admin/analytics",
      icon: TrendingUp,
      count: null,
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      href: "/admin/settings",
      icon: Settings,
      count: null,
    },
  ],
}

export function AdminDashboard() {
  const [adminData] = useState(mockAdminData)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-serif flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage and monitor the Peer-Hub platform</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Administrator
        </Badge>
      </div>

      {/* Stats Overview */}
      <AdminStats stats={adminData.stats} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminData.quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${action.urgent ? "bg-red-100" : "bg-accent/10"}`}>
                    <Icon className={`h-5 w-5 ${action.urgent ? "text-red-600" : "text-accent"}`} />
                  </div>
                  {action.count !== null && (
                    <Badge variant={action.urgent ? "destructive" : "secondary"}>
                      {action.count}
                      {action.urgent && " pending"}
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <Button asChild size="sm" variant={action.urgent ? "destructive" : "outline"} className="w-full">
                  <Link href={action.href}>{action.urgent ? "Review Now" : "Manage"}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="reports">Pending Reports</TabsTrigger>
          <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <PlatformActivity activities={adminData.recentActivity} />
        </TabsContent>

        <TabsContent value="reports">
          <RecentReports />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics and charts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
