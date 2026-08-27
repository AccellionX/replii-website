import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
