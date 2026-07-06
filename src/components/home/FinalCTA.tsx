import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCTA() {
  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8] sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Contacto
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Hablemos de tu próxima propiedad
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
            {siteConfig.slogan}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={whatsappUrl} external>
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </Button>

            <Button
              href="/contacto"
              variant="secondary"
              className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
            >
              Llenar formulario
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}