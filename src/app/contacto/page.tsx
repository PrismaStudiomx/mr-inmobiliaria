import type { Metadata } from "next";
import {
  Home,
  KeyRound,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a MR Inmobiliaria para comprar, vender o rentar propiedades en Nuevo León, Tamaulipas, Yucatán, Campeche y Quintana Roo.",
};

const intentionCards = [
  {
    title: "Comprar una propiedad",
    text: "Cuéntanos qué tipo de propiedad buscas y en qué zona te interesa comprar.",
    button: "Busco comprar",
    href: buildWhatsAppUrl({ type: "comprar" }),
    icon: Home,
  },
  {
    title: "Rentar una propiedad",
    text: "Solicita información sobre opciones disponibles para renta.",
    button: "Busco rentar",
    href: buildWhatsAppUrl({ type: "rentar" }),
    icon: KeyRound,
  },
  {
    title: "Vender o rentar mi propiedad",
    text: "Comparte los datos principales de tu propiedad para revisar cómo trabajarla con MR.",
    button: "Tengo una propiedad",
    href: buildWhatsAppUrl({ type: "vender-rentar" }),
    icon: Send,
  },
];

export default function ContactPage() {
  const generalWhatsAppUrl = buildWhatsAppUrl({ type: "general" });

  const secondaryWhatsAppUrl = buildWhatsAppUrl({
    type: "general",
    phone: siteConfig.whatsappSecundario,
  });

  return (
    <>
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 text-[#FFFDF8] sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <Container className="relative">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
                Contacto
              </p>

              <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
                Hablemos de tu próxima propiedad
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#F7F3EA]/80 sm:text-lg">
                Ya sea que quieras comprar, vender o rentar, en MR Inmobiliaria
                estamos a tus órdenes para ayudarte a dar el siguiente paso.
              </p>

              <p className="mt-6 border-l border-[#C9A24A] pl-4 text-base font-semibold text-white">
                {siteConfig.slogan}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={generalWhatsAppUrl} external>
                  <MessageCircle size={18} />
                  Contactar por WhatsApp
                </Button>

                <Button
                  href="/propiedades"
                  variant="secondary"
                  className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
                >
                  Ver propiedades disponibles
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Intención rápida
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                ¿Qué necesitas hacer?
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Selecciona la opción que mejor se ajuste a lo que estás buscando
                y contáctanos de forma directa.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {intentionCards.map((card, index) => {
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

      <section className="bg-[#FFFDF8] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Atención directa
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  Atención directa de MR Inmobiliaria
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#6F6A60]">
                  Cuéntanos si buscas comprar, vender o rentar. Mary podrá
                  ayudarte a revisar opciones disponibles o a trabajar la
                  publicación de tu propiedad.
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#F7F3EA] p-5 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
                  >
                    <MessageCircle size={20} className="text-[#C9A24A]" />
                    WhatsApp principal
                  </a>

                  <a
                    href={secondaryWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#F7F3EA] p-5 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
                  >
                    <MessageCircle size={20} className="text-[#C9A24A]" />
                    WhatsApp secundario
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#F7F3EA] p-5 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
                  >
                    <Mail size={20} className="text-[#C9A24A]" />
                    {siteConfig.email}
                  </a>
                </div>

                <p className="mt-6 border-l border-[#C9A24A] pl-4 text-sm font-semibold text-[#252525]">
                  Si necesitas una respuesta más rápida, te recomendamos escribir
                  por WhatsApp.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Cobertura
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Zonas de atención
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                MR Inmobiliaria atiende operaciones de compra, venta y renta en
                distintas zonas del país.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.areas.map((area, index) => (
              <Reveal key={area} delay={index * 0.05}>
                <div className="rounded-[1.5rem] border border-black/10 bg-[#FFFDF8] p-5">
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

      <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8] sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              MR Inmobiliaria
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              ¿Quieres comprar, vender o rentar?
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
              Estamos a tus órdenes para ayudarte a encontrar una propiedad o
              trabajar la venta o renta de la tuya.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={generalWhatsAppUrl} external>
                <MessageCircle size={18} />
                Contactar por WhatsApp
              </Button>

              <Button
                href="/propiedades"
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Ver propiedades
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}