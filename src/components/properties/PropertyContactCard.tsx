import { Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  getPropertyWhatsAppType,
} from "@/lib/property-format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Property } from "@/types/property";

type PropertyContactCardProps = {
  property: Property;
};

export function PropertyContactCard({ property }: PropertyContactCardProps) {
  const whatsappUrl = buildWhatsAppUrl({
    type: getPropertyWhatsAppType(property),
    propertyName: property.title,
  });

  return (
    <aside className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6 shadow-xl shadow-black/5 lg:sticky lg:top-28">
      <p className="font-serif text-3xl font-semibold text-[#0B0B0B]">
        ¿Te interesa esta propiedad?
      </p>

      <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
        Escríbenos por WhatsApp y conoce más detalles sobre disponibilidad,
        precio o visita.
      </p>

      <div className="mt-6 space-y-3">
        <Button href={whatsappUrl} external className="w-full">
          <MessageCircle size={18} />
          Consultar por WhatsApp
        </Button>

        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#0B0B0B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
        >
          <Mail size={18} />
          Enviar correo
        </a>
      </div>

      <p className="mt-6 border-l border-[#C9A24A] pl-4 text-sm font-semibold text-[#252525]">
        {siteConfig.slogan}
      </p>
    </aside>
  );
}