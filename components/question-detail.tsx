"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnswerList } from "@/components/answer-list"
import { ThumbsUp, ThumbsDown, Eye, CheckCircle, Flag, Bookmark } from "lucide-react"

interface QuestionDetailProps {
  questionId: string
}

// Mock data for a detailed question
const mockQuestion = {
  id: "1",
  title: "How do I solve quadratic equations using the quadratic formula?",
  content: `I'm struggling with understanding when and how to use the quadratic formula. I know the formula is x = (-b ± √(b²-4ac)) / 2a, but I'm having trouble with:

1. When should I use this formula vs other methods?
2. How do I handle the discriminant (b²-4ac)?
3. What does it mean when the discriminant is negative?

Can someone explain the steps and provide an example? I have a test coming up and really need to understand this concept.

Here's an example problem I'm stuck on: 2x² + 5x - 3 = 0`,
  author: {
    name: "Sarah M.",
    role: "student",
    avatar: "/student-avatar.png",
    reputation: 125,
  },
  subject: "Mathematics",
  tags: ["algebra", "equations", "quadratic", "homework"],
  votes: 12,
  views: 89,
  timeAgo: "2 hours ago",
  isAnswered: true,
}

export function QuestionDetail({ questionId }: QuestionDetailProps) {
  const [question] = useState(mockQuestion)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null)
    } else {
      setUserVote(type)
    }
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        <span>Questions</span> / <span className="text-foreground">{question.title}</span>
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{question.subject}</Badge>
                  {question.isAnswered && (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Answered
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-4 font-serif">{question.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{question.views} views</span>
                  </div>
                  <span>Asked {question.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex gap-6">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-2">
              <Button variant={userVote === "up" ? "default" : "outline"} size="sm" onClick={() => handleVote("up")}>
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold">{question.votes}</span>
              <Button
                variant={userVote === "down" ? "destructive" : "outline"}
                size="sm"
                onClick={() => handleVote("down")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="mt-2"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <div className="prose prose-sm max-w-none mb-6">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">{question.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                    <AvatarFallback>
                      {question.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{question.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {question.author.role} • {question.author.reputation} reputation
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnswerList questionId={questionId} questionAuthor={question.author.name} />
    </div>
  )
}
