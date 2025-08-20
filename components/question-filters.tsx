"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function QuestionFilters() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const subjects = ["Mathematics", "Science", "History", "English", "Biology", "Chemistry", "Physics", "Geography"]

  const popularTags = ["algebra", "equations", "essay", "biology", "chemistry", "history", "writing", "homework"]

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject])
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    }
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag])
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    }
  }

  const clearFilters = () => {
    setSelectedSubjects([])
    setSelectedTags([])
  }

  return (
    <div className="space-y-6">
      {/* Filter Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Question Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="answered" />
            <label htmlFor="answered" className="text-sm">
              Answered
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="unanswered" />
            <label htmlFor="unanswered" className="text-sm">
              Unanswered
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Filter by Subject */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Subjects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
              />
              <label htmlFor={subject} className="text-sm">
                {subject}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => handleTagChange(tag, !selectedTags.includes(tag))}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {(selectedSubjects.length > 0 || selectedTags.length > 0) && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          Clear Filters
        </Button>
      )}
    </div>
  )
}
