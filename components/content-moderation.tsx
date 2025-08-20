"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, MessageSquare, MessageCircle, Eye, Check, X, AlertTriangle } from "lucide-react"

// Mock content data
const mockReportedContent = {
  questions: [
    {
      id: "1",
      title: "How to cheat on math tests?",
      content: "Looking for ways to cheat on upcoming math exam...",
      author: {
        name: "Anonymous User",
        avatar: "/student-avatar.png",
      },
      reports: 5,
      reason: "Academic dishonesty",
      timeAgo: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      title: "Inappropriate question with offensive language",
      content: "This question contains inappropriate language and content...",
      author: {
        name: "Mike R.",
        avatar: "/student-avatar.png",
      },
      reports: 3,
      reason: "Inappropriate content",
      timeAgo: "4 hours ago",
      status: "pending",
    },
  ],
  answers: [
    {
      id: "1",
      questionTitle: "What is photosynthesis?",
      content: "This is spam content with external links to inappropriate sites...",
      author: {
        name: "Spam User",
        avatar: "/student-avatar.png",
      },
      reports: 8,
      reason: "Spam",
      timeAgo: "1 hour ago",
      status: "pending",
    },
    {
      id: "2",
      questionTitle: "How to solve quadratic equations?",
      content: "Completely wrong answer that misleads students...",
      author: {
        name: "John D.",
        avatar: "/student-avatar.png",
      },
      reports: 2,
      reason: "Misinformation",
      timeAgo: "3 hours ago",
      status: "pending",
    },
  ],
}

export function ContentModeration() {
  const [reportedContent, setReportedContent] = useState(mockReportedContent)

  const handleContentAction = (type: "questions" | "answers", id: string, action: "approve" | "remove") => {
    setReportedContent((prev) => ({
      ...prev,
      [type]: prev[type].map((item) =>
        item.id === id ? { ...item, status: action === "approve" ? "approved" : "removed" } : item,
      ),
    }))
  }

  const getSeverityColor = (reports: number) => {
    if (reports >= 5) return "destructive"
    if (reports >= 3) return "secondary"
    return "outline"
  }

  const ContentCard = ({
    item,
    type,
    onAction,
  }: {
    item: any
    type: "questions" | "answers"
    onAction: (id: string, action: "approve" | "remove") => void
  }) => (
    <Card className="border-red-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getSeverityColor(item.reports) as any} className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {item.reports} reports
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.reason}
                </Badge>
              </div>

              {type === "questions" ? (
                <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
              ) : (
                <h4 className="font-medium text-foreground mb-2">Answer to: {item.questionTitle}</h4>
              )}

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.content}</p>

              <div className="flex items-center gap-2 text-sm">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                  <AvatarFallback className="text-xs">
                    {item.author.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{item.author.name}</span>
                <span className="text-muted-foreground">• {item.timeAgo}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t">
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-1" />
              View Full Content
            </Button>
            <Button size="sm" onClick={() => onAction(item.id, "approve")} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onAction(item.id, "remove")}>
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-serif flex items-center gap-2">
            <Flag className="h-8 w-8 text-accent" />
            Content Moderation
          </h1>
          <p className="text-muted-foreground">Review and moderate reported content</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">
            {reportedContent.questions.filter((q) => q.status === "pending").length +
              reportedContent.answers.filter((a) => a.status === "pending").length}{" "}
            pending
          </Badge>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reported Questions ({reportedContent.questions.filter((q) => q.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="answers" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Reported Answers ({reportedContent.answers.filter((a) => a.status === "pending").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          {reportedContent.questions
            .filter((q) => q.status === "pending")
            .map((question) => (
              <ContentCard
                key={question.id}
                item={question}
                type="questions"
                onAction={(id, action) => handleContentAction("questions", id, action)}
              />
            ))}

          {reportedContent.questions.filter((q) => q.status === "pending").length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No reported questions</h3>
                <p className="text-muted-foreground">All reported questions have been reviewed.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="answers" className="space-y-4">
          {reportedContent.answers
            .filter((a) => a.status === "pending")
            .map((answer) => (
              <ContentCard
                key={answer.id}
                item={answer}
                type="answers"
                onAction={(id, action) => handleContentAction("answers", id, action)}
              />
            ))}

          {reportedContent.answers.filter((a) => a.status === "pending").length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No reported answers</h3>
                <p className="text-muted-foreground">All reported answers have been reviewed.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
