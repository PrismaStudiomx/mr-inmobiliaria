import { FileText, MessageCircle, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    title: "Información ordenada",
    text: "Cada propiedad muestra fotografías, ubicación general, características principales y datos relevantes.",
    icon: FileText,
  },
  {
    title: "Contacto directo",
    text: "Puedes solicitar información o preguntar por una propiedad directamente por WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "Acompañamiento",
    text: "Recibes atención durante el proceso de compra, venta o renta de una propiedad.",
    icon: ShieldCheck,
  },
];

export function TrustBlock() {
  return (
    <section className="bg-[#F7F3EA] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Confianza
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              Un proceso claro para tomar mejores decisiones inmobiliarias
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
              MR Inmobiliaria busca que cada propiedad se presente con información
              útil, contacto directo y atención personalizada.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7 text-center">
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0B0B] text-[#C9A24A]">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}