import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function MaryPreview() {
  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-6">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.32),transparent_35%),linear-gradient(135deg,#252525,#0B0B0B)] text-center text-[#FFFDF8]">
                <div>
                  <p className="font-serif text-5xl font-semibold text-[#C9A24A]">
                    Mary
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[#F7F3EA]/70">
                    MR Inmobiliaria
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Perfil de Mary
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#0B0B0B] sm:text-5xl">
                Atención inmobiliaria cercana y profesional
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#6F6A60]">
                Mary brinda acompañamiento personalizado a personas que buscan
                comprar, vender o rentar una propiedad, cuidando que cada etapa
                sea clara, ordenada y confiable.
              </p>

              <p className="mt-5 border-l border-[#C9A24A] pl-4 text-sm font-semibold text-[#252525]">
                MR Inmobiliaria atiende propiedades en Nuevo León, Tamaulipas,
                Yucatán, Campeche y Quintana Roo.
              </p>

              <p className="mt-4 text-sm font-semibold text-[#C9A24A]">
                {siteConfig.slogan}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/perfil-de-mary">Conocer más sobre Mary</Button>

                <Button href={whatsappUrl} external variant="secondary">
                  <MessageCircle size={18} />
                  Hablar por WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}