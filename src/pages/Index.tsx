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
import { EmailCapture } from "@/components/site/EmailCapture";
import { Footer } from "@/components/site/Footer";
import { AdSlot } from "@/components/site/AdSlot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Hero />
      <QuickStrip />
      <AdSlot label="Ad · Below Hero" />
      <Categories />
      <Popular />
      <AdSlot label="Ad · After Popular Tools" />
      <ExploreTools />
      <Trending />
      <AdSlot label="Ad · Inline" />
      <Featured />
      <Trust />
      <AdSlot label="Ad · Mid Content" />
      <SeoContent />
      <AdSlot label="Ad · Before Email Capture" />
      <EmailCapture />
    </main>
    <Footer />
  </div>
);

export default Index;
