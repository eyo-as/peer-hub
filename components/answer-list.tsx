"use client"

import { useState } from "react"
import { AnswerCard } from "./answer-card"
import { AnswerForm } from "./answer-form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, TrendingUp, Clock } from "lucide-react"

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

interface AnswerListProps {
  questionId: string
  questionAuthor: string
}

// Mock answers data
const mockAnswers: Answer[] = [
  {
    id: "1",
    content: `Great question! The quadratic formula is one of the most reliable methods for solving quadratic equations. Let me break this down step by step:

**When to use the quadratic formula:**
- When factoring is difficult or impossible
- When completing the square seems too complex
- When you want a guaranteed method that always works

**Understanding the discriminant (b²-4ac):**
- If discriminant > 0: Two real solutions
- If discriminant = 0: One real solution (repeated root)
- If discriminant < 0: No real solutions (complex solutions)

**For your example: 2x² + 5x - 3 = 0**
- a = 2, b = 5, c = -3
- Discriminant = 5² - 4(2)(-3) = 25 + 24 = 49
- Since 49 > 0, we have two real solutions
- x = (-5 ± √49) / (2×2) = (-5 ± 7) / 4
- x₁ = (-5 + 7) / 4 = 2/4 = 1/2
- x₂ = (-5 - 7) / 4 = -12/4 = -3

So the solutions are x = 1/2 and x = -3.`,
    author: {
      name: "Dr. Johnson",
      role: "teacher",
      avatar: "/teacher-avatar.png",
      reputation: 2450,
    },
    votes: 15,
    timeAgo: "1 hour ago",
    isAccepted: true,
    isEdited: false,
  },
  {
    id: "2",
    content: `I had the same struggle! Here's how I remember it:

Think of the discriminant as a "decision maker":
- Positive discriminant = 2 different answers
- Zero discriminant = 1 answer (the parabola just touches the x-axis)
- Negative discriminant = no real answers (the parabola doesn't touch the x-axis)

For practice, try graphing the equation y = 2x² + 5x - 3 and see where it crosses the x-axis. You'll see it crosses at x = 1/2 and x = -3, which matches Dr. Johnson's answer!`,
    author: {
      name: "Alex K.",
      role: "student",
      avatar: "/student-avatar.png",
      reputation: 340,
    },
    votes: 8,
    timeAgo: "45 minutes ago",
    isAccepted: false,
    isEdited: true,
  },
  {
    id: "3",
    content: `Here's a quick tip for remembering the formula: "x equals negative b, plus or minus the square root of b squared minus 4ac, all over 2a"

I like to sing it to a tune - it helps me remember during tests! Also, always double-check your arithmetic with the discriminant calculation, that's where most mistakes happen.`,
    author: {
      name: "Emma L.",
      role: "student",
      avatar: "/student-avatar.png",
      reputation: 180,
    },
    votes: 3,
    timeAgo: "30 minutes ago",
    isAccepted: false,
    isEdited: false,
  },
]

export function AnswerList({ questionId, questionAuthor }: AnswerListProps) {
  const [answers, setAnswers] = useState(mockAnswers)
  const [sortBy, setSortBy] = useState("votes")
  const [showAnswerForm, setShowAnswerForm] = useState(false)

  const sortedAnswers = [...answers].sort((a, b) => {
    // Always show accepted answer first
    if (a.isAccepted && !b.isAccepted) return -1
    if (!a.isAccepted && b.isAccepted) return 1

    switch (sortBy) {
      case "votes":
        return b.votes - a.votes
      case "newest":
        return 0 // Keep original order for newest
      case "oldest":
        return 0 // Would reverse order for oldest
      default:
        return b.votes - a.votes
    }
  })

  const handleNewAnswer = (content: string) => {
    const newAnswer: Answer = {
      id: Date.now().toString(),
      content,
      author: {
        name: "Current User",
        role: "student",
        avatar: "/current-user-avatar.png",
        reputation: 50,
      },
      votes: 0,
      timeAgo: "just now",
      isAccepted: false,
      isEdited: false,
    }
    setAnswers([...answers, newAnswer])
    setShowAnswerForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {answers.length} Answer{answers.length !== 1 ? "s" : ""}
          </h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Most Votes
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Oldest
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowAnswerForm(!showAnswerForm)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          {showAnswerForm ? "Cancel" : "Write Answer"}
        </Button>
      </div>

      {/* Answer Form */}
      {showAnswerForm && (
        <AnswerForm questionId={questionId} onSubmit={handleNewAnswer} onCancel={() => setShowAnswerForm(false)} />
      )}

      {/* Answers */}
      <div className="space-y-6">
        {sortedAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            questionAuthor={questionAuthor}
            onVote={(answerId, voteType) => {
              // Handle voting logic
              console.log(`Vote ${voteType} on answer ${answerId}`)
            }}
            onAccept={(answerId) => {
              // Handle accept logic
              setAnswers(
                answers.map(
                  (a) => (a.id === answerId ? { ...a, isAccepted: !a.isAccepted } : { ...a, isAccepted: false }), // Only one accepted answer
                ),
              )
            }}
          />
        ))}
      </div>

      {answers.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No answers yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to help by writing an answer!</p>
          <Button onClick={() => setShowAnswerForm(true)}>Write the first answer</Button>
        </div>
      )}
    </div>
  )
}
