"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "./dashboard-stats"
import { RecentActivity } from "./recent-activity"
import { QuestionCard } from "@/components/question-card"
import { MessageSquare, Plus, Settings } from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUser = {
  id: "current-user",
  name: "Alex Johnson",
  email: "alex.johnson@school.edu",
  role: "student",
  avatar: "/current-user-avatar.png",
  reputation: 1250,
  joinDate: "September 2023",
  bio: "High school senior passionate about mathematics and science. Always eager to help fellow students!",
  stats: {
    questionsAsked: 15,
    answersGiven: 42,
    votesReceived: 89,
    acceptedAnswers: 18,
    badges: 7,
  },
  badges: [
    { name: "Helpful", description: "Received 10 upvotes on answers", icon: "👍" },
    { name: "Scholar", description: "Asked 10 well-received questions", icon: "🎓" },
    { name: "Teacher", description: "Answer accepted 5 times", icon: "🏆" },
  ],
}

// Mock recent questions
const mockRecentQuestions = [
  {
    id: "1",
    title: "How to solve systems of linear equations?",
    content: "I need help understanding different methods for solving systems of linear equations...",
    author: {
      name: "Alex Johnson",
      role: "student",
      avatar: "/current-user-avatar.png",
    },
    subject: "Mathematics",
    tags: ["algebra", "systems", "equations"],
    answers: 3,
    votes: 8,
    views: 45,
    timeAgo: "2 days ago",
    isAnswered: true,
  },
  {
    id: "2",
    title: "What is the difference between mitosis and meiosis?",
    content: "I'm confused about the key differences between these two types of cell division...",
    author: {
      name: "Alex Johnson",
      role: "student",
      avatar: "/current-user-avatar.png",
    },
    subject: "Biology",
    tags: ["biology", "cell-division", "mitosis", "meiosis"],
    answers: 5,
    votes: 12,
    views: 78,
    timeAgo: "1 week ago",
    isAnswered: true,
  },
]

export function UserDashboard() {
  const [user] = useState(mockUser)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/questions/ask">
              <Plus className="mr-2 h-4 w-4" />
              Ask Question
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile/edit">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* User Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                  <span className="text-sm text-muted-foreground">{user.reputation} reputation</span>
                </div>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <DashboardStats stats={user.stats} />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">My Questions</TabsTrigger>
          <TabsTrigger value="answers">My Answers</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <RecentActivity />
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Your Questions ({user.stats.questionsAsked})</h3>
            <Button asChild>
              <Link href="/questions/ask">Ask New Question</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {mockRecentQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="answers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Your Answers ({user.stats.answersGiven})</h3>
          </div>
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Your recent answers will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Your Badges ({user.badges.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.badges.map((badge, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-foreground mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
