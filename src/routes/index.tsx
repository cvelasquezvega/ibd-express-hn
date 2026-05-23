import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Categories } from "@/components/site/Categories";
import { FeaturedGrid } from "@/components/site/FeaturedGrid";
import { Collections } from "@/components/site/Collections";
import { Promo } from "@/components/site/Promo";
import { HowItWorks } from "@/components/site/HowItWorks";
import { SocialProof } from "@/components/site/SocialProof";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";
import { CategoryCircles } from "@/components/site/CategoryCircles";
import { BigSaleBanner } from "@/components/site/BigSaleBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Folio & Press — Libros impresos bajo demanda · marketplace internacional" },
      { name: "description", content: "1,2M de títulos de 320 editoriales en 14 idiomas. Impresión bajo demanda con envío internacional en 5–7 días." },
      { property: "og:title", content: "Folio & Press — Libros impresos bajo demanda" },
      { property: "og:description", content: "Marketplace internacional de libros impresos bajo demanda. Universitario, editorial e independiente." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustStrip />
      <CategoryCircles />
      <Promo />
      <FeaturedGrid />
      <BigSaleBanner />
      <FeaturedGrid heading="Nuestras novedades" eyebrow="Recién impresos" />
      <Collections />
      <Categories />
      <HowItWorks />
      <SocialProof />
      <Newsletter />
      <Footer />
    </main>
  );
}
