import { MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function ServiceAreas() {
  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Zonas de atención
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              Zonas donde trabaja MR Inmobiliaria
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
              Atendemos operaciones de compra, venta y renta en distintas zonas
              del país.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.areas.map((area, index) => (
            <Reveal key={area} delay={index * 0.05}>
              <div className="rounded-[1.5rem] border border-black/10 bg-[#F7F3EA] p-5">
                <MapPin className="text-[#C9A24A]" size={22} />

                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#0B0B0B]">
                  {area}
                </h3>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A60]">
                  Compra · Venta · Renta
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}