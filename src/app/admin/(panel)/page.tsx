import {
  Building2,
  Eye,
  PauseCircle,
  PlusCircle,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { demoProperties } from "@/data/demo-properties";

export default function AdminDashboardPage() {
  const available = demoProperties.filter(
    (property) => property.publicationStatus === "Disponible"
  ).length;

  const featured = demoProperties.filter((property) => property.featured).length;

  return (
    <div className="pb-24 lg:pb-0">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Panel privado
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
            Panel de MR Inmobiliaria
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
            Administra propiedades, fotografías, precios y disponibilidad desde
            un panel sencillo.
          </p>
        </div>

        <Button href="/admin/propiedades/nueva">
          <PlusCircle size={18} />
          Agregar propiedad
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <Building2 className="text-[#C9A24A]" size={26} />
          <p className="mt-5 text-sm font-semibold text-[#6F6A60]">
            Total propiedades
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">
            {demoProperties.length}
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <Eye className="text-[#C9A24A]" size={26} />
          <p className="mt-5 text-sm font-semibold text-[#6F6A60]">
            Disponibles
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">
            {available}
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <Star className="text-[#C9A24A]" size={26} />
          <p className="mt-5 text-sm font-semibold text-[#6F6A60]">
            Destacadas
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">
            {featured}
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
          <PauseCircle className="text-[#C9A24A]" size={26} />
          <p className="mt-5 text-sm font-semibold text-[#6F6A60]">
            Pausadas
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">
            0
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Button href="/admin/propiedades" className="min-h-16">
          Ver propiedades
        </Button>

        <Button href="/admin/propiedades/nueva" className="min-h-16">
          Agregar propiedad
        </Button>

        <Button href="/" variant="secondary" className="min-h-16">
          Ver sitio público
        </Button>
      </div>

      <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6">
        <h2 className="font-serif text-3xl font-semibold text-[#0B0B0B]">
          Siguiente pendiente
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
          Este panel todavía usa propiedades demo. Más adelante conectaremos
          Supabase para guardar propiedades reales, fotos, disponibilidad y login
          privado.
        </p>
      </div>
    </div>
  );
}