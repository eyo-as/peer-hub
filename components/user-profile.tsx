"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, MapPin, Mail, Edit } from "lucide-react"
import Link from "next/link"

interface UserProfileProps {
  userId: string
}

// Mock user profile data
const mockUserProfile = {
  id: "user-123",
  name: "Sarah Martinez",
  email: "sarah.martinez@school.edu",
  role: "student",
  avatar: "/student-avatar.png",
  reputation: 850,
  joinDate: "March 2023",
  location: "California, USA",
  bio: "Junior year student with a passion for mathematics and physics. I love helping others understand complex concepts and learning from the community.",
  stats: {
    questionsAsked: 23,
    answersGiven: 67,
    votesReceived: 145,
    acceptedAnswers: 28,
    badges: 12,
  },
  badges: [
    { name: "Helpful", description: "Received 25 upvotes on answers", icon: "👍", earned: "2 months ago" },
    { name: "Scholar", description: "Asked 20 well-received questions", icon: "🎓", earned: "1 month ago" },
    { name: "Teacher", description: "Answer accepted 25 times", icon: "🏆", earned: "3 weeks ago" },
    { name: "Popular", description: "Question viewed 1000+ times", icon: "⭐", earned: "2 weeks ago" },
  ],
  recentQuestions: [
    {
      id: "1",
      title: "Understanding derivatives in calculus",
      votes: 15,
      answers: 8,
      timeAgo: "3 days ago",
    },
    {
      id: "2",
      title: "How to balance chemical equations?",
      votes: 12,
      answers: 5,
      timeAgo: "1 week ago",
    },
  ],
  topAnswers: [
    {
      id: "1",
      questionTitle: "What is the quadratic formula?",
      votes: 25,
      isAccepted: true,
      timeAgo: "2 weeks ago",
    },
    {
      id: "2",
      questionTitle: "Explain photosynthesis process",
      votes: 18,
      isAccepted: false,
      timeAgo: "3 weeks ago",
    },
  ],
}

export function UserProfile({ userId }: UserProfileProps) {
  const [user] = useState(mockUserProfile)
  const [activeTab, setActiveTab] = useState("overview")
  const isOwnProfile = userId === "current-user" // Mock check

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        <span>Users</span> / <span className="text-foreground">{user.name}</span>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">{user.name}</h1>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                    <span className="text-lg font-semibold text-accent">{user.reputation} reputation</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{user.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                {isOwnProfile && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{user.stats.questionsAsked}</div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{user.stats.answersGiven}</div>
            <div className="text-sm text-muted-foreground">Answers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{user.stats.votesReceived}</div>
            <div className="text-sm text-muted-foreground">Votes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{user.stats.acceptedAnswers}</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{user.stats.badges}</div>
            <div className="text-sm text-muted-foreground">Badges</div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.recentQuestions.map((question) => (
                  <div key={question.id} className="border-b pb-3 last:border-b-0">
                    <h4 className="font-medium text-foreground hover:text-accent cursor-pointer mb-2">
                      {question.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                      <span>{question.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Answers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.topAnswers.map((answer) => (
                  <div key={answer.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground hover:text-accent cursor-pointer">
                        {answer.questionTitle}
                      </h4>
                      {answer.isAccepted && <Trophy className="h-4 w-4 text-green-600 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{answer.votes} votes</span>
                      <span>{answer.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badges ({user.badges.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.earned}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Questions ({user.stats.questionsAsked})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User's questions will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Answers ({user.stats.answersGiven})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User's answers will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
