import { Header, Footer, ModernLanding } from "../components/landing";

// Static generation for better build performance
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header user={null} />
      <ModernLanding />
      <Footer />
    </>
  );
}
