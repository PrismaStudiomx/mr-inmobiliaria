import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const benefits = [
  {
    title: "Presentación clara",
    text: "Organizamos la información clave de tu propiedad para mostrarla de forma atractiva.",
  },
  {
    title: "Contacto directo",
    text: "Las personas interesadas pueden escribir por WhatsApp desde la ficha de la propiedad.",
  },
  {
    title: "Acompañamiento personalizado",
    text: "Te damos seguimiento durante el proceso de venta o renta.",
  },
];

export function SellPropertyBlock() {
  const whatsappUrl = buildWhatsAppUrl({ type: "vender-rentar" });

  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2.2rem] bg-[#0B0B0B] p-8 text-[#FFFDF8] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Para propietarios
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                  ¿Quieres vender o rentar tu propiedad?
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
                  En MR Inmobiliaria te ayudamos a presentar tu propiedad de forma
                  clara, ordenada y profesional para conectar con personas interesadas.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="/vende-tu-propiedad">
                    Publicar mi propiedad con MR
                  </Button>

                  <Button
                    href={whatsappUrl}
                    external
                    variant="secondary"
                    className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
                  >
                    <MessageCircle size={18} />
                    Hablar por WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 0.08}>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="font-serif text-2xl font-semibold text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#F7F3EA]/70">
                      {benefit.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}