import { Mail, MessageCircle, Settings } from "lucide-react";

import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
        Configuración
      </p>

      <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
        Configuración del sitio
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
        Esta sección queda preparada para modificar datos generales del sitio más
        adelante.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <Settings className="text-[#C9A24A]" size={26} />

          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#0B0B0B]">
            Datos generales
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#6F6A60]">
            Nombre del sitio, frase institucional, zonas de atención y textos
            generales.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <MessageCircle className="text-[#C9A24A]" size={26} />

          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#0B0B0B]">
            WhatsApp
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#6F6A60]">
            Número principal, número secundario y mensajes automáticos.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <Mail className="text-[#C9A24A]" size={26} />

          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#0B0B0B]">
            Correo
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#6F6A60]">
            Correo actual para formularios:
          </p>

          <p className="mt-3 text-sm font-semibold text-[#252525]">
            {siteConfig.email}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
        <h2 className="font-serif text-3xl font-semibold text-[#0B0B0B]">
          Pendiente técnico
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
          La configuración editable se conectará después de guardar propiedades y
          formularios. Por ahora los datos globales siguen controlados desde
          archivos de configuración del proyecto.
        </p>
      </div>
    </div>
  );
}