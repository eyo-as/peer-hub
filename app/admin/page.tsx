import { Navigation } from "@/components/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
