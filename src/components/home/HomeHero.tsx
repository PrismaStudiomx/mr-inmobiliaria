import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-24 text-[#FFFDF8] sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

      <Container className="relative">
        <Reveal>
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
              MR Inmobiliaria
            </p>

            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              Compra, vende o renta tu propiedad con asesoría profesional
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#F7F3EA]/80 sm:text-lg">
              En MR Inmobiliaria te acompañamos con atención clara y personalizada
              para encontrar, vender o rentar propiedades en Nuevo León,
              Tamaulipas, Yucatán, Campeche y Quintana Roo.
            </p>

            <p className="mt-6 border-l border-[#C9A24A] pl-4 text-lg font-semibold text-white">
              {siteConfig.slogan}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/propiedades">Ver propiedades</Button>

              <Button
                href="/vende-tu-propiedad"
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Vender mi propiedad
              </Button>
            </div>

            <a
              href="/propiedades"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E6C875] transition hover:text-white"
            >
              Explorar catálogo completo
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}