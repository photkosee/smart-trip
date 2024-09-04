import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import PromoteSection from "./components/PromoteSection";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-7 bg-white">
      <HeroSection />
      <FeatureSection />
      <PromoteSection />
    </main>
  );
}
