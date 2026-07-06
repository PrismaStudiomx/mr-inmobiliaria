import { Home, KeyRound, Landmark } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const intentCards = [
  {
    title: "Comprar una propiedad",
    text: "Encuentra opciones disponibles para compra con información clara, fotografías y contacto directo.",
    button: "Busco comprar",
    href: buildWhatsAppUrl({ type: "comprar" }),
    icon: Home,
  },
  {
    title: "Rentar una propiedad",
    text: "Explora propiedades disponibles para renta y solicita información de forma rápida por WhatsApp.",
    button: "Busco rentar",
    href: buildWhatsAppUrl({ type: "rentar" }),
    icon: KeyRound,
  },
  {
    title: "Vender o rentar mi propiedad",
    text: "Comparte tu propiedad con MR Inmobiliaria y recibe atención personalizada para trabajarla de forma profesional.",
    button: "Quiero vender o rentar",
    href: buildWhatsAppUrl({ type: "vender-rentar" }),
    icon: Landmark,
  },
];

export function IntentCards() {
  return (
    <section className="bg-[#F7F3EA] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mb-9 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Inicio
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              ¿Qué estás buscando?
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {intentCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0B0B] text-[#C9A24A]">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                    {card.text}
                  </p>

                  <div className="mt-7">
                    <Button href={card.href} external className="w-full">
                      {card.button}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}