"use client";

import { useState } from "react";
import { QuestionCard } from "./question-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock data for questions
const mockQuestions = [
  {
    id: "1",
    title: "How do I solve quadratic equations using the quadratic formula?",
    content:
      "I'm struggling with understanding when and how to use the quadratic formula. Can someone explain the steps and provide an example?",
    author: {
      name: "Sarah M.",
      role: "student",
      avatar: "/student-avatar.png",
    },
    subject: "Mathematics",
    tags: ["algebra", "equations", "quadratic"],
    answers: 5,
    votes: 12,
    views: 89,
    timeAgo: "2 hours ago",
    isAnswered: true,
  },
  {
    id: "2",
    title: "What are the main causes of World War I?",
    content:
      "I need to understand the primary factors that led to the outbreak of World War I for my history essay. What were the most significant causes?",
    author: {
      name: "Mike R.",
      role: "student",
      avatar: "/student-avatar.png",
    },
    subject: "History",
    tags: ["world-war-1", "causes", "history"],
    answers: 3,
    votes: 8,
    views: 45,
    timeAgo: "4 hours ago",
    isAnswered: false,
  },
  {
    id: "3",
    title: "Can someone explain photosynthesis in simple terms?",
    content:
      "I'm having trouble understanding the process of photosynthesis. Could someone break it down into simple steps?",
    author: {
      name: "Emma L.",
      role: "student",
      avatar: "/student-avatar.png",
    },
    subject: "Biology",
    tags: ["photosynthesis", "biology", "plants"],
    answers: 7,
    votes: 15,
    views: 123,
    timeAgo: "6 hours ago",
    isAnswered: true,
  },
  {
    id: "4",
    title: "How to write a compelling thesis statement?",
    content:
      "I'm working on my English essay and struggling to create a strong thesis statement. What makes a thesis statement effective?",
    author: {
      name: "Alex K.",
      role: "student",
      avatar: "/student-avatar.png",
    },
    subject: "English",
    tags: ["writing", "thesis", "essay"],
    answers: 2,
    votes: 6,
    views: 34,
    timeAgo: "1 day ago",
    isAnswered: false,
  },
];

export function QuestionsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [questions] = useState(mockQuestions);

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "answers":
        return b.answers - a.answers;
      case "views":
        return b.views - a.views;
      default:
        return 0; // Keep original order for "recent"
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="votes">Most Votes</SelectItem>
            <SelectItem value="answers">Most Answers</SelectItem>
            <SelectItem value="views">Most Views</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredQuestions.length} question
        {filteredQuestions.length !== 1 ? "s" : ""} found
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {sortedQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No questions found matching your search.
          </p>
          <Button variant="outline">Clear Search</Button>
        </div>
      )}
    </div>
  );
}
