import { Navigation } from "@/components/navigation"
import { UserDashboard } from "@/components/user-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <UserDashboard />
      </main>
    </div>
  )
}
