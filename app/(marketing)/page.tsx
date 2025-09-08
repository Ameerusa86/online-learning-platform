import { CTA } from "@/components/marketing/cta";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Navbar } from "@/components/marketing/navbar";
import { Stats } from "@/components/marketing/stats";

export default function MarketingHomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
