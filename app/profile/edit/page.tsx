import { Navigation } from "@/components/navigation";
import { EditProfile } from "@/components/edit-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your profile information and preferences",
};

export default function EditProfilePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <EditProfile />
      </main>
    </div>
  );
}
