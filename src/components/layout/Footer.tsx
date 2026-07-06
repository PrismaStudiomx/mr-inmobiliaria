import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <footer className="bg-[#0B0B0B] text-[#F7F3EA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold text-white">
            MR Inmobiliaria
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#D8C6A3]">
            Compra, venta y renta de propiedades con asesoría profesional.
          </p>
          <p className="mt-6 border-l border-[#C9A24A] pl-4 text-sm font-medium text-white">
            {siteConfig.slogan}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24A]">
            Navegación
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#F7F3EA]/80 transition hover:text-[#C9A24A]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24A]">
            Contacto
          </p>
          <div className="mt-5 flex flex-col gap-4 text-sm text-[#F7F3EA]/80">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition hover:text-[#C9A24A]"
            >
              <MessageCircle size={18} />
              WhatsApp principal
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 transition hover:text-[#C9A24A]"
            >
              <Mail size={18} />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24A]">
            Zonas de atención
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#F7F3EA]/80">
            {siteConfig.areas.map((area) => (
              <div key={area} className="flex items-center gap-3">
                <MapPin size={17} className="text-[#C9A24A]" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-[#F7F3EA]/60">
        © {new Date().getFullYear()} MR Inmobiliaria. Todos los derechos reservados.
      </div>
    </footer>
  );
}