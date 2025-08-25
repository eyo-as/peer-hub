import { UserManagement } from "@/components/user-management";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage user accounts and permissions",
};

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <UserManagement />
      </main>
    </div>
  );
}
