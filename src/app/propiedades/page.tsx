import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PropertiesCatalog } from "@/components/properties/PropertiesCatalog";
import { demoProperties } from "@/data/demo-properties";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Propiedades disponibles",
  description:
    "Explora casas, departamentos, terrenos y espacios comerciales disponibles en venta o renta con MR Inmobiliaria.",
  openGraph: {
    title: "Propiedades disponibles | MR Inmobiliaria",
    description:
      "Catálogo de propiedades en Nuevo León, Tamaulipas, Yucatán, Campeche y Quintana Roo.",
  },
};

export default function PropertiesPage() {
  const whatsappUrl = buildWhatsAppUrl({ type: "comprar" });

  return (
    <>
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 text-[#FFFDF8] sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
              Propiedades
            </p>

            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              Propiedades disponibles
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#F7F3EA]/80 sm:text-lg">
              Explora casas, departamentos, terrenos y espacios comerciales
              disponibles en venta o renta con atención personalizada de MR
              Inmobiliaria.
            </p>

            <p className="mt-6 border-l border-[#C9A24A] pl-4 text-base font-medium text-white">
              Encuentra opciones en Nuevo León, Tamaulipas, Yucatán, Campeche y
              Quintana Roo.
            </p>

            <p className="mt-4 text-sm text-[#E6C875]">
              {siteConfig.slogan}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="#catalogo">Ver catálogo</Button>

              <Button
                href={whatsappUrl}
                external
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                <MessageCircle size={18} />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <div id="catalogo">
        <PropertiesCatalog properties={demoProperties} />
      </div>

      <section className="bg-[#F7F3EA] py-16">
        <Container>
          <div className="rounded-[2rem] bg-[#0B0B0B] p-8 text-center text-[#FFFDF8] sm:p-12">
            <h2 className="font-serif text-4xl font-semibold">
              ¿No encontraste la propiedad que buscabas?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F7F3EA]/75">
              Cuéntanos qué tipo de propiedad necesitas y MR Inmobiliaria te
              ayudará a revisar opciones disponibles.
            </p>

            <p className="mt-5 text-[#E6C875]">{siteConfig.slogan}</p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={buildWhatsAppUrl({ type: "general" })} external>
                Hablar por WhatsApp
              </Button>

              <Button
                href="/vende-tu-propiedad"
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Vender mi propiedad
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}