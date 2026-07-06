import type { Metadata } from "next";
import {
  Building2,
  Camera,
  FileText,
  Handshake,
  Home,
  Map,
  MessageCircle,
  Store,
} from "lucide-react";

import { SellPropertyForm } from "@/components/forms/SellPropertyForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Vende o renta tu propiedad",
  description:
    "Comparte tu propiedad con MR Inmobiliaria para venta o renta. Atención en Nuevo León, Tamaulipas, Yucatán, Campeche y Quintana Roo.",
};

const valueCards = [
  {
    title: "Presentación profesional",
    text: "Organizamos la información clave de tu propiedad para mostrarla de forma atractiva y fácil de consultar.",
    icon: FileText,
  },
  {
    title: "Fotografías e información ordenada",
    text: "Mostramos imágenes, ubicación general, características y detalles relevantes en una ficha clara.",
    icon: Camera,
  },
  {
    title: "Contacto directo con interesados",
    text: "Cada propiedad puede recibir solicitudes por WhatsApp desde su ficha individual.",
    icon: MessageCircle,
  },
  {
    title: "Acompañamiento personalizado",
    text: "MR Inmobiliaria te acompaña para avanzar con mayor claridad durante el proceso de venta o renta.",
    icon: Handshake,
  },
];

const propertyTypes = [
  {
    title: "Casas",
    text: "Propiedades residenciales para venta o renta.",
    icon: Home,
  },
  {
    title: "Departamentos",
    text: "Opciones para vivir, rentar o invertir.",
    icon: Building2,
  },
  {
    title: "Terrenos",
    text: "Espacios para construcción, inversión o desarrollo.",
    icon: Map,
  },
  {
    title: "Comerciales",
    text: "Locales, oficinas o espacios para negocio.",
    icon: Store,
  },
];

const workStages = [
  {
    title: "Información inicial",
    text: "Nos compartes los datos principales de tu propiedad: ubicación, tipo, operación, precio, características y fotografías.",
  },
  {
    title: "Revisión de la propiedad",
    text: "Organizamos la información para que sea clara y útil para las personas interesadas.",
  },
  {
    title: "Presentación profesional",
    text: "Creamos una ficha con fotografías, descripción, características principales y contacto directo.",
  },
  {
    title: "Contacto con interesados",
    text: "Las personas pueden consultar la propiedad por WhatsApp o formulario.",
  },
  {
    title: "Acompañamiento",
    text: "MR Inmobiliaria da seguimiento para avanzar hacia visita, llamada, venta o renta.",
  },
];

const requiredInfo = [
  "Tipo de propiedad: casa, departamento, terreno o comercial.",
  "Operación: venta, renta o ambas.",
  "Estado, ciudad o zona.",
  "Colonia o referencia.",
  "Precio o preferencia por mostrar “Solicitar información”.",
  "Fotografías de la propiedad.",
  "Recámaras, baños, estacionamientos y metros, si aplica.",
  "Características importantes.",
  "Disponibilidad para contacto o visitas.",
];

export default function SellPropertyPage() {
  const whatsappUrl = buildWhatsAppUrl({ type: "vender-rentar" });
  const publishUrl = buildWhatsAppUrl({ type: "publicar" });

  return (
    <>
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 text-[#FFFDF8] sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <Container className="relative">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
                Para propietarios
              </p>

              <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
                Vende o renta tu propiedad con asesoría profesional
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#F7F3EA]/80 sm:text-lg">
                En MR Inmobiliaria te ayudamos a presentar tu propiedad de forma
                clara, ordenada y atractiva para conectar con personas interesadas.
              </p>

              <p className="mt-6 border-l border-[#C9A24A] pl-4 text-base font-semibold text-white">
                {siteConfig.slogan}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={publishUrl} external>
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
        </Container>
      </section>

      <section className="bg-[#FFFDF8] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Valor
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Tu propiedad merece una presentación clara y profesional
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Una buena presentación ayuda a que las personas interesadas
                entiendan mejor tu propiedad y puedan contactarte con mayor
                confianza.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Reveal key={card.title} delay={index * 0.06}>
                  <div className="h-full rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-7">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0B0B] text-[#C9A24A]">
                      <Icon size={22} />
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
                      {card.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                      {card.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Propiedades
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Trabajamos distintos tipos de propiedades
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Puedes compartirnos propiedades residenciales, terrenos o espacios
                comerciales disponibles para venta o renta.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;

              return (
                <Reveal key={type.title} delay={index * 0.06}>
                  <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7">
                    <Icon className="text-[#C9A24A]" size={28} />

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#0B0B0B]">
                      {type.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                      {type.text}
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
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Forma de trabajo
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  Así trabajamos tu propiedad
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                  El proceso se mantiene claro y ordenado para que puedas
                  compartir la información necesaria sin complicaciones.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {workStages.map((stage, index) => (
                <Reveal key={stage.title} delay={index * 0.05}>
                  <div className="rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-6">
                    <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
                      {stage.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#6F6A60]">
                      {stage.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Información necesaria
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  Datos que ayudan a publicar tu propiedad
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                  Mientras más clara sea la información, mejor podrá presentarse
                  tu propiedad en el catálogo.
                </p>

                <div className="mt-7 grid gap-3">
                  {requiredInfo.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-[#FFFDF8] px-5 py-4 text-sm text-[#252525]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 border-l border-[#C9A24A] pl-4 text-sm font-semibold text-[#252525]">
                  Si todavía no tienes toda la información completa, puedes
                  escribirnos por WhatsApp y platicarnos los detalles.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <SellPropertyForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8] sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Siguiente paso
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              ¿Listo para vender o rentar tu propiedad?
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
              En MR Inmobiliaria estamos a tus órdenes para ayudarte a presentar
              tu propiedad con claridad y atención profesional.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={publishUrl} external>
                Publicar mi propiedad con MR
              </Button>

              <Button
                href={whatsappUrl}
                external
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}