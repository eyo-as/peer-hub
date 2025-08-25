import { AskQuestionForm } from "@/components/ask-question-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask",
  description: "Draft what's on your mind",
};

export default function AskQuestionPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
            Ask a Question
          </h1>
          <p className="text-muted-foreground">
            Get help from your peers and teachers by asking a clear, detailed
            question
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share your question</CardTitle>
            <CardDescription>
              Be specific and provide context to help others understand and
              answer your question effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AskQuestionForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
