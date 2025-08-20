import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, Clock, ArrowRight } from "lucide-react"

export function RecentActivity() {
  const recentQuestions = [
    {
      id: 1,
      title: "How do I solve quadratic equations using the quadratic formula?",
      author: "Sarah M.",
      subject: "Mathematics",
      answers: 5,
      votes: 12,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "What are the main causes of World War I?",
      author: "Mike R.",
      subject: "History",
      answers: 3,
      votes: 8,
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "Can someone explain photosynthesis in simple terms?",
      author: "Emma L.",
      subject: "Biology",
      answers: 7,
      votes: 15,
      timeAgo: "6 hours ago",
    },
  ]

  const trendingTopics = [
    { name: "Calculus", questions: 24 },
    { name: "Chemistry", questions: 18 },
    { name: "Literature", questions: 15 },
    { name: "Physics", questions: 12 },
  ]

  const quickStats = [
    { label: "Questions Today", value: "47" },
    { label: "Active Students", value: "156" },
    { label: "Answers Given", value: "89" },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">Recent Activity</h2>
          <p className="text-lg text-muted-foreground">See what your peers are discussing and learning about</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Questions Column */}
          <div className="lg:col-span-2 space-y-4">
            {recentQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {question.subject}
                        </Badge>
                        <span className="text-sm text-muted-foreground">by {question.author}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-accent cursor-pointer">
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{question.answers} answers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{question.votes} votes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{question.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      View Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Today's Activity</h3>
                <div className="space-y-3">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-lg font-bold text-accent">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground hover:text-accent cursor-pointer">
                        {topic.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {topic.questions}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Topics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Questions
          </Button>
        </div>
      </div>
    </section>
  )
}
