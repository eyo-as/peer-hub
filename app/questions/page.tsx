import { QuestionsList } from "@/components/questions-list";
import { QuestionFilters } from "@/components/question-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
  description: "Browse and search through community questions",
};

export default function QuestionsPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
              Questions
            </h1>
            <p className="text-muted-foreground">
              Browse and search through community questions
            </p>
          </div>
          <Button asChild>
            <Link href="/questions/ask">
              <Plus className="mr-2 h-4 w-4" />
              Ask Question
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <QuestionFilters />
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <QuestionsList />
          </div>
        </div>
      </main>
    </div>
  );
}
