import type { Metadata } from "next";

import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HomeHero } from "@/components/home/HomeHero";
import { IntentCards } from "@/components/home/IntentCards";
import { MaryPreview } from "@/components/home/MaryPreview";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { SellPropertyBlock } from "@/components/home/SellPropertyBlock";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustBlock } from "@/components/home/TrustBlock";
import { demoProperties } from "@/data/demo-properties";

export const metadata: Metadata = {
  title: "MR Inmobiliaria | Compra, venta y renta de propiedades",
  description:
    "Compra, venta y renta de propiedades con asesoría profesional en Nuevo León, Tamaulipas, Yucatán, Campeche y Quintana Roo.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <IntentCards />
      <PropertyCategories />
      <FeaturedProperties properties={demoProperties} />
      <SellPropertyBlock />
      <ServicesSection />
      <MaryPreview />
      <TrustBlock />
      <ServiceAreas />
      <FinalCTA />
    </>
  );
}