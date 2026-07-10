import { PlusCircle } from "lucide-react";

import { AdminPropertyCard } from "@/components/admin/AdminPropertyCard";
import { Button } from "@/components/ui/Button";
import { getAdminProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div className="pb-24 lg:pb-0">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Propiedades
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
            Lista de propiedades
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
            Revisa las propiedades cargadas, cambia su disponibilidad o edita su
            información.
          </p>
        </div>

        <Button href="/admin/propiedades/nueva">
          <PlusCircle size={18} />
          Agregar propiedad
        </Button>
      </div>

      {properties.length > 0 ? (
        <div className="mt-8 grid gap-5">
          {properties.map((property) => (
            <AdminPropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-8">
          <h2 className="font-serif text-3xl font-semibold text-[#0B0B0B]">
            Aún no hay propiedades cargadas.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
            Agrega la primera propiedad desde el panel.
          </p>

          <div className="mt-6">
            <Button href="/admin/propiedades/nueva">
              Agregar propiedad
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}