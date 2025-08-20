import { Navigation } from "@/components/navigation"
import { QuestionDetail } from "@/components/question-detail"

interface QuestionPageProps {
  params: {
    id: string
  }
}

export default function QuestionPage({ params }: QuestionPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <QuestionDetail questionId={params.id} />
      </main>
    </div>
  )
}
