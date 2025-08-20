import { Navigation } from "@/components/navigation"
import { UserProfile } from "@/components/user-profile"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <UserProfile userId={params.userId} />
      </main>
    </div>
  )
}
