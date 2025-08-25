import { UserProfile } from "@/components/user-profile";
import { Metadata } from "next";

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export const metadata: Metadata = {
  title: "Profile",
  description: "Review your account",
};

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <UserProfile userId={params.userId} />
      </main>
    </div>
  );
}
