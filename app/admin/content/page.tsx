import { Navigation } from "@/components/navigation";
import { ContentModeration } from "@/components/content-moderation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Moderation",
  description: "Review and moderate reported content",
};

export default function AdminContentPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <ContentModeration />
      </main>
    </div>
  );
}
