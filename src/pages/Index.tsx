import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { QuickStrip } from "@/components/site/QuickStrip";
import { Categories } from "@/components/site/Categories";
import { Trending } from "@/components/site/Trending";
import { Featured } from "@/components/site/Featured";
import { Trust } from "@/components/site/Trust";
import { SeoContent } from "@/components/site/SeoContent";
import { Popular } from "@/components/site/Popular";
import { ExploreTools } from "@/components/site/ExploreTools";
import { PlannerCTA } from "@/components/site/PlannerCTA";
import { EmailCapture } from "@/components/site/EmailCapture";
import { Footer } from "@/components/site/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Hero />
      <QuickStrip />
      <Categories />
      <Popular />
      <ExploreTools />
      <Trending />
      <Featured />
      <PlannerCTA />
      <Trust />
      <SeoContent />
      <EmailCapture />
    </main>
    <Footer />
  </div>
);

export default Index;
