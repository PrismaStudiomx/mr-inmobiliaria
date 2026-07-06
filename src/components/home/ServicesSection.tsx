import { Handshake, Home, KeyRound, MessageSquareText } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    title: "Compra de propiedades",
    text: "Te ayudamos a revisar opciones disponibles según tus necesidades, ubicación y presupuesto.",
    icon: Home,
  },
  {
    title: "Venta de propiedades",
    text: "Presentamos tu propiedad con información ordenada para facilitar el contacto con personas interesadas.",
    icon: Handshake,
  },
  {
    title: "Renta de propiedades",
    text: "Conectamos propietarios e interesados mediante un proceso claro, directo y personalizado.",
    icon: KeyRound,
  },
  {
    title: "Asesoría inmobiliaria",
    text: "Te acompañamos para que puedas avanzar con mayor seguridad durante el proceso.",
    icon: MessageSquareText,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-[#F7F3EA] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Servicios
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              Servicios inmobiliarios para cada etapa
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
              Ya sea que busques comprar, vender o rentar, MR Inmobiliaria te
              acompaña con atención clara y profesional.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <div className="h-full rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C9A24A]">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
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
  );
}