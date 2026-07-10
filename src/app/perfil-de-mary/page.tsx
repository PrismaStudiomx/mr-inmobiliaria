import type { Metadata } from "next";
import {
  Building2,
  HeartHandshake,
  Home,
  KeyRound,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Perfil de Mary",
  description:
    "Conoce a Mary de MR Inmobiliaria. Asesoría inmobiliaria cercana, clara y profesional para compra, venta y renta de propiedades.",
};

const workApproach = [
  {
    title: "Escucha y orientación",
    text: "Mary busca entender qué tipo de propiedad necesitas o qué propiedad deseas vender o rentar.",
    icon: HeartHandshake,
  },
  {
    title: "Información ordenada",
    text: "Cada propiedad se presenta con datos clave, fotografías, ubicación general y características importantes.",
    icon: ShieldCheck,
  },
  {
    title: "Comunicación directa",
    text: "El contacto por WhatsApp facilita resolver dudas, compartir información y avanzar de forma más ágil.",
    icon: MessageCircle,
  },
  {
    title: "Acompañamiento profesional",
    text: "MR Inmobiliaria acompaña el proceso para que puedas tomar decisiones con mayor claridad.",
    icon: KeyRound,
  },
];

const services = [
  {
    title: "Compra de propiedades",
    text: "Atención para revisar opciones disponibles según ubicación, presupuesto y necesidades.",
    icon: Home,
  },
  {
    title: "Venta de propiedades",
    text: "Apoyo para presentar una propiedad de forma clara y facilitar el contacto con personas interesadas.",
    icon: HeartHandshake,
  },
  {
    title: "Renta de propiedades",
    text: "Acompañamiento para conectar propietarios e interesados mediante información ordenada.",
    icon: KeyRound,
  },
  {
    title: "Asesoría inmobiliaria",
    text: "Comunicación directa para resolver dudas y avanzar con mayor seguridad.",
    icon: Building2,
  },
];

export default function MaryProfilePage() {
  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <>
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 text-[#FFFDF8] sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
                  Perfil de Mary
                </p>

                <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
                  Asesoría inmobiliaria cercana, clara y profesional
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#F7F3EA]/80 sm:text-lg">
                  Mary acompaña a personas que buscan comprar, vender o rentar
                  una propiedad, ofreciendo atención personalizada y comunicación
                  directa durante cada etapa del proceso.
                </p>

                <p className="mt-6 border-l border-[#C9A24A] pl-4 text-base font-semibold text-white">
                  {siteConfig.slogan}
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Button href={whatsappUrl} external>
                    <MessageCircle size={18} />
                    Hablar con Mary por WhatsApp
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

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#0B0B0B]">
  <Image
    src="/mary.jpeg"
    alt="Mary de MR Inmobiliaria"
    fill
    priority
    className="object-cover"
    sizes="(min-width: 1024px) 40vw, 100vw"
  />
</div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#FFFDF8] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Quién es Mary
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  Una atención inmobiliaria basada en confianza
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-5 text-base leading-8 text-[#6F6A60]">
                <p>
                  Mary brinda acompañamiento personalizado a personas que desean
                  comprar, vender o rentar una propiedad, cuidando que la
                  información sea clara, el proceso sea ordenado y la comunicación
                  sea directa.
                </p>

                <p>
                  Su enfoque está en escuchar las necesidades de cada cliente,
                  presentar opciones de forma profesional y facilitar el contacto
                  para avanzar con mayor seguridad en cada operación inmobiliaria.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Forma de trabajo
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Una forma de trabajo clara y personalizada
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Cada cliente recibe atención según lo que necesita: comprar,
                vender, rentar o publicar una propiedad.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workApproach.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0B0B] text-[#C9A24A]">
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
                MR Inmobiliaria atiende operaciones de compra, venta y renta en
                distintas zonas del país.
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

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Acompañamiento
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Acompañamiento para comprar, vender o rentar
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={index * 0.06}>
                  <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7">
                    <Icon className="text-[#C9A24A]" size={28} />

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#0B0B0B]">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                      {service.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8] sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                MR Inmobiliaria
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                {siteConfig.slogan}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
                En MR Inmobiliaria podemos ayudarte a encontrar una propiedad o
                trabajar la venta o renta de la tuya.
              </p>

              <div className="mt-8">
                <Button href={whatsappUrl} external>
                  <MessageCircle size={18} />
                  Contactar por WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#FFFDF8] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Contacto directo
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  Hablemos de tu próxima propiedad
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#6F6A60]">
                  Si buscas comprar, vender o rentar, Mary puede ayudarte a
                  revisar el siguiente paso.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-7">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-[#252525] transition hover:text-[#C9A24A]"
                >
                  <Mail size={19} className="text-[#C9A24A]" />
                  {siteConfig.email}
                </a>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Button href={whatsappUrl} external>
                    Hablar por WhatsApp
                  </Button>

                  <Button href="/propiedades" variant="secondary">
                    Ver propiedades
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}