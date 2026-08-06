import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FoundingCustomersSection } from "@/components/sections/FoundingCustomersSection";
import { Hero } from "@/components/sections/Hero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PilotSection } from "@/components/sections/PilotSection";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { WorkloadComparisonSection } from "@/components/sections/WorkloadComparisonSection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-control)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text-primary)] focus:shadow-[var(--shadow-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <PlatformStrip />
        <ProblemSection />
        <WorkflowSection />
        <ProductDemo />
        <FeaturesSection />
        <WorkloadComparisonSection />
        <DashboardSection />
        <IndustriesSection />
        <PricingSection />
        <PilotSection />
        <FoundingCustomersSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
