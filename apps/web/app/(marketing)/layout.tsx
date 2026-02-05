import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export const dynamic = "force-static";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header user={null} />
      {children}
      <Footer />
    </>
  );
}
