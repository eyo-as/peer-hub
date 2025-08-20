import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Eye, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  subject: string;
  tags: string[];
  answers: number;
  votes: number;
  views: number;
  timeAgo: string;
  isAnswered: boolean;
}

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow box-border overflow-x-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {question.subject}
                </Badge>
                {question.isAnswered && (
                  <Badge
                    variant="default"
                    className="text-xs bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Answered
                  </Badge>
                )}
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link href={`/questions/${question.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-accent cursor-pointer mb-2">
                  {question.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {question.content}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={question.author.avatar || "/placeholder.svg"}
                  alt={question.author.name}
                />
                <AvatarFallback className="text-xs">
                  {question.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {question.author.name} • {question.timeAgo}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{question.answers}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{question.votes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{question.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
