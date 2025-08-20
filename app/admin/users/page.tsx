import { Navigation } from "@/components/navigation"
import { UserManagement } from "@/components/user-management"

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <UserManagement />
      </main>
    </div>
  )
}
