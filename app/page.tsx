import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { RecentActivity } from "@/components/recent-activity";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <RecentActivity />
      </main>
    </div>
  );
}
