import {
  Header,
  Footer,
  LiteHero,
  LiteFeatures,
  LiteTechStack,
  LiteCTA,
} from "@/components/landing";

// Static generation for better build performance
export const dynamic = "force-static";

export default function LitePage() {
  return (
    <>
      <Header user={null} />
      <main className="overflow-x-hidden w-full">
        {/* 1. Hero Section */}
        <LiteHero />

        {/* 2. Features Section */}
        <LiteFeatures />

        {/* 3. Tech Stack Section */}
        <LiteTechStack />

        {/* 4. CTA Section */}
        <LiteCTA />
      </main>
      <Footer />
    </>
  );
}
