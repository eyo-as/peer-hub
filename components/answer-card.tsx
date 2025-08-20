"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, CheckCircle, Flag, Edit, MessageSquare, Award } from "lucide-react"

interface Answer {
  id: string
  content: string
  author: {
    name: string
    role: string
    avatar: string
    reputation: number
  }
  votes: number
  timeAgo: string
  isAccepted: boolean
  isEdited: boolean
}

interface AnswerCardProps {
  answer: Answer
  questionAuthor: string
  onVote: (answerId: string, voteType: "up" | "down") => void
  onAccept: (answerId: string) => void
}

export function AnswerCard({ answer, questionAuthor, onVote, onAccept }: AnswerCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [showComments, setShowComments] = useState(false)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null)
    } else {
      setUserVote(type)
    }
    onVote(answer.id, type)
  }

  const isQuestionAuthor = questionAuthor === "Current User" // Mock check

  return (
    <Card className={`${answer.isAccepted ? "border-green-200 bg-green-50/50" : ""}`}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Voting Column */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <Button
              variant={userVote === "up" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("up")}
              className="w-10 h-10 p-0"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold text-foreground">{answer.votes}</span>
            <Button
              variant={userVote === "down" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleVote("down")}
              className="w-10 h-10 p-0"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>

            {/* Accept Answer Button (only for question author) */}
            {isQuestionAuthor && (
              <Button
                variant={answer.isAccepted ? "default" : "outline"}
                size="sm"
                onClick={() => onAccept(answer.id)}
                className={`w-10 h-10 p-0 ${
                  answer.isAccepted
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Answer Content */}
          <div className="flex-1">
            {/* Accepted Badge */}
            {answer.isAccepted && (
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-green-600 hover:bg-green-600 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  Accepted Answer
                </Badge>
              </div>
            )}

            {/* Answer Text */}
            <div className="prose prose-sm max-w-none mb-6">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{answer.content}</div>
            </div>

            {/* Answer Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Add comment
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {answer.isEdited && "edited "}
                    {answer.timeAgo}
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={answer.author.avatar || "/placeholder.svg"} alt={answer.author.name} />
                      <AvatarFallback className="text-xs">
                        {answer.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{answer.author.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={answer.author.role === "teacher" ? "default" : "secondary"} className="text-xs">
                          {answer.author.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{answer.author.reputation} rep</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section (placeholder) */}
            {showComments && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Comments functionality will be added here.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
