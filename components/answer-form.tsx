"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, Edit } from "lucide-react"

interface AnswerFormProps {
  questionId: string
  onSubmit: (content: string) => void
  onCancel: () => void
}

export function AnswerForm({ questionId, onSubmit, onCancel }: AnswerFormProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!content.trim()) {
      setError("Please write your answer before submitting")
      setIsLoading(false)
      return
    }

    if (content.trim().length < 30) {
      setError("Please provide a more detailed answer (at least 30 characters)")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit(content.trim())
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Answer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Editor Tabs */}
          <div className="flex items-center gap-2 border-b">
            <Button
              type="button"
              variant={!isPreview ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsPreview(false)}
              className="rounded-b-none"
            >
              <Edit className="h-4 w-4 mr-1" />
              Write
            </Button>
            <Button
              type="button"
              variant={isPreview ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsPreview(true)}
              className="rounded-b-none"
              disabled={!content.trim()}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>

          {/* Content Area */}
          {!isPreview ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Write your answer here... Be specific and helpful. Include examples, steps, or explanations that will help the person asking the question."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                rows={8}
                className="min-h-[200px]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {content.length < 30
                    ? `${30 - content.length} more characters needed`
                    : `${content.length} characters`}
                </span>
                <span>Use clear explanations and examples</span>
              </div>
            </div>
          ) : (
            <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {content || "Nothing to preview yet..."}
                </div>
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="bg-muted/50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-foreground mb-2">Writing a good answer:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be specific and provide step-by-step explanations</li>
              <li>• Include examples or worked solutions when possible</li>
              <li>• Explain the reasoning behind your answer</li>
              <li>• Use clear, simple language that's easy to understand</li>
              <li>• Stay focused on answering the specific question asked</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading || !content.trim() || content.trim().length < 30}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Answer
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
