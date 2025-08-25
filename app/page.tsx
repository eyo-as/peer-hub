import { HeroSection } from "@/components/hero-section";
import { RecentActivity } from "@/components/recent-activity";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <RecentActivity />
      </main>
    </div>
  );
}
