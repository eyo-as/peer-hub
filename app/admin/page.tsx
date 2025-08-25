import { AdminDashboard } from "@/components/admin-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage and monitor the Peer-Hub platform",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}
